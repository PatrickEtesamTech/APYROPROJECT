using APYROPROJECT.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


var builder = WebApplication.CreateBuilder(args);


//Dependency Injection
builder.Services.AddDbContext<ApplicationDBContext>(options =>  
options.UseSqlServer(builder.Configuration.GetConnectionString("DevConnection")));


    
//Register Syncfusion license
Syncfusion.Licensing.SyncfusionLicenseProvider.RegisterLicense("Mgo+DSMBMAY9C3t2V1hhQlJAfV5AQmBIYVp/TGpJfl96cVxMZVVBJAtUQF1hSn5UdkJjXn9XdHBTRmJc");


// Add services to the container.
builder.Services.AddControllersWithViews();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();

app.UseRouting();
app.UseAuthentication();;

app.UseAuthorization();


app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Homepage}/{action=Index}/{id?}");



app.Run();
