using Microsoft.EntityFrameworkCore;  
  
namespace WebAppGokay.Models  
{  
    public class MvcEmployeeContext : DbContext  
    {  
        public MvcEmployeeContext (DbContextOptions<MvcEmployeeContext> options)  
            : base(options)  
        {  
        }  
  
        public DbSet<WebAppGokay.Models.Employees> Employee { get; set; }  
    }  
}  