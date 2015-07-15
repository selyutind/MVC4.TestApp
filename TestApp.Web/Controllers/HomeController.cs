using Oracle.ManagedDataAccess.Client;
using System.Data;
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
        public UsersContext _db = new UsersContext();
        public ActionResult Index()
        {
            //return View("~/App/Main/views/layout/layout.cshtml", ); //Layout of the angular application.
            //var users = _db.GetUsers().ToArray();            
            //ViewBag.Users = users.ToList();
            int hour = DateTime.Now.Hour; 
            ViewBag.Greeting = hour < 12 ? "Good Morning" : "Good Afternoon";
            return View("~/App/Main/views/layout/layout.cshtml");
            
        }       
       

	}
}