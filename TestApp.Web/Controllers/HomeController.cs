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
        
        public ActionResult Index()
        {
            //return View("~/App/Main/views/layout/layout.cshtml", ); //Layout of the angular application.
            return View("~/App/Main/views/layout/layout.cshtml");
            
        }       
       

	}
}