
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.OracleClient;

namespace TestApp.Web.Models
{
    public class UsersContext : DbContext
    {
        public UsersContext()
            : base("Oracle")
        {

        }


        public DbSet<UsersEntry> Entries { get; set; }

        public IEnumerable<UsersEntry> GetUsers()
        {
            using (var conn = new OracleConnection("DATA SOURCE=192.168.36.135:1521/DEV; PASSWORD=pw;PERSIST SECURITY INFO=True;USER ID=MDM"))
            using (var cmd = conn.CreateCommand())
            {
                conn.Open();
                cmd.CommandText = "SELECT * FROM test_users";
                using (var reader = cmd.ExecuteReader())
                {
                    while (reader.Read())
                    {
                        yield return new UsersEntry
                        {
                            name = reader.GetString(reader.GetOrdinal("name")),
                            login = reader.GetString(reader.GetOrdinal("login")),
                            password = reader.GetString(reader.GetOrdinal("password")),
                            email = reader.GetString(reader.GetOrdinal("email"))
                        };
                    }
                }
            }
        }
    }
}