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
using System.Data.Entity.Infrastructure;


namespace TestApp.Web.Controllers
{
    public class HomeController : TestAppControllerBase
    {
        //public UsersContext _db = new UsersContext();
        public Entities db = new Entities();
        public ActionResult Index()        {
            
            return View("~/App/Main/views/layout/layout.cshtml");            
        }
        public JsonResult Users()
        {            
            var users = db.TEST_USERS.ToArray();
            return Json(users, JsonRequestBehavior.AllowGet);

        }      
        [HttpPost]
        public ActionResult CreateUser(TEST_USERS user)
        {            
            db.TEST_USERS.Add(user);
            db.SaveChanges();

            return View("~/App/Main/views/layout/layout.cshtml");
        }        
        public JsonResult EditUser(string id)
        {
            int num = Convert.ToInt32( id);
            //int num = (int)sd.value;
            TEST_USERS user = db.TEST_USERS.Find(num);
            return Json(user, JsonRequestBehavior.AllowGet);  
        }
        [HttpPost]
        public ActionResult UpdateUser(TEST_USERS user)
        {          
            db.Entry(user).State = EntityState.Modified;
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {               
            }
            return View("~/App/Main/views/layout/layout.cshtml");
        }
        public ActionResult DeleteUser(string  id)
        {
            int num = Convert.ToInt32(id);            
            TEST_USERS user = db.TEST_USERS.Find(num);
            if (user != null){
                db.TEST_USERS.Remove(user);
            }
            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
            }
            return View("~/App/Main/views/layout/layout.cshtml");
        }
       

	}
}