using Microsoft.EntityFrameworkCore;
using WebAppGokay.Entities;

namespace WebAppGokay.Helpers
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<User> Users { get; set; }
    }
}