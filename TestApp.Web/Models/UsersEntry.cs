using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestApp.Web.Models
{
    public class UsersEntry
    {
        public int  Id { get; set; }
        public string name  { get; set; }
        public string login { get; set; }
        public string password { get; set; }
        public string email { get; set; }
        public DateTime date { get; set; }
    }
}