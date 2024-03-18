using APYROPROJECT.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;
using System;

namespace APYROPROJECT.Controllers
{
    public class FaceIDController : Controller
    {
        private readonly ILogger<FaceIDController> _logger;
        private readonly IWebHostEnvironment _hostEnviroment;
        private readonly ApplicationDBContext _context;

        public FaceIDController(ApplicationDBContext context, IWebHostEnvironment hostEnvironment, ILogger<FaceIDController> logger)
        {
            _context = context;
            _hostEnviroment = hostEnvironment;
            _logger = logger;
        }

        public IActionResult UploadImage([FromBody]UploadData uploadData)
        {
            var imagesFolder = Path.Combine(_hostEnviroment.WebRootPath, "images/Verified");
            if (!Directory.Exists(imagesFolder))
            {
                Directory.CreateDirectory(imagesFolder);
            }

            // Get the number of existing image files in the folder
            int nextImageNumber = Directory.GetFiles(imagesFolder, "*.png").Length + 1;

            var fileName = $"{nextImageNumber}.png"; // Use the generated number as the filename
            var filePath = Path.Combine(imagesFolder, fileName);

            var data = Convert.FromBase64String(uploadData.ImageData.Split(',')[1]);

            // Save the image data to the specified file path
            System.IO.File.WriteAllBytes(filePath, data);

            // Save image information to the database
            var image = new SampleData
            {
                FileName = fileName,
                FilePath = filePath,
            };
            _context.SampleDatas.Add(image);
            _context.SaveChanges();

            return Json(new { success = true, imagePath = filePath });

        }



        public IActionResult Index()
        {
            return View();
        }


      

    }
}
