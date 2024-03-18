using Microsoft.EntityFrameworkCore;

namespace APYROPROJECT.Models

{
    public class ApplicationDBContext:DbContext
    {
        public ApplicationDBContext(DbContextOptions options):base(options)
        {
                
        }

        public DbSet<Transaction> Transaction { get; set; }

        public DbSet<Category> Categories { get; set; }


        public DbSet<SampleData> SampleDatas { get; set; }
    }
}
