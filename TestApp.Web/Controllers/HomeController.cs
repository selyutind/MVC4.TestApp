using Oracle.ManagedDataAccess.Client;
using System.Data;
using System.Data.Entity;
using System.Web.Mvc;



using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.HtmlControls;
using System.Web.UI.WebControls;
using TestApp.Web.Models;
using System.Data.SqlClient;


namespace TestApp.Web.Controllers
{
    public class HomeController : TestAppControllerBase
    {
        //public UsersContext _db = new UsersContext();
        public Entities db = new Entities();
        public ActionResult Index()
        {
            //var users = _db.GetUsers().ToArray(); 
            var users = db.TEST_USERS.ToArray();
             
            TempData["Greeting"] = users; 
            return View("~/App/Main/views/layout/layout.cshtml");            
        }       
       

	}
}