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
using System.Data.SqlClient;


namespace TestApp.Web.Controllers
{
    public class HomeController : TestAppControllerBase
    {
        //public UsersContext _db = new UsersContext();
        public Entities db = new Entities();
        public ActionResult Index()        {
            
            //var users = db.TEST_USERS.ToArray();             
            //TempData["Greeting"] = users; 
            return View("~/App/Main/views/layout/layout.cshtml");            
        }
        public JsonResult Users()
        {
            //Entities db = new Entities();
            var users = db.TEST_USERS.ToArray();

            return Json(users, JsonRequestBehavior.AllowGet);

        }
        /*public JsonResult Users(int id)
        {
            Entities db = new Entities();
            var user = db.TEST_USERS.Find(id);
            return Json(user, JsonRequestBehavior.AllowGet);

        }*/
        [HttpPost]
        public ActionResult CreateUser(TEST_USERS user)
        {
            //Entities db = new Entities();
            db.TEST_USERS.Add(user);
            db.SaveChanges();
            return View("~/App/Main/views/layout/layout.cshtml");
        }
       

	}
}