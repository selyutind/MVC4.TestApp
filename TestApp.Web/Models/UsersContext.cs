
using System.Data.Entity;

namespace TestApp.Web.Models
{
    public class UsersContext : DbContext
    {
        public UsersContext()
        {

        }
        public DbSet<UsersEntry> Entries { get; set; }
    }
}