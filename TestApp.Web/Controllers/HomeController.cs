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

namespace TestApp.Web.Controllers
{
    public class HomeController : TestAppControllerBase
    {
        public ActionResult Index()
        {
            string connectionString = "DATA SOURCE=192.168.36.135:1521/DEV; PASSWORD=pw;PERSIST SECURITY INFO=True;USER ID=MDM";
            OracleConnection _connection = new OracleConnection();
            _connection.ConnectionString = connectionString;
            DataTable dataTable = new DataTable();
            _connection.Open();
            string sql = "select * from test_sa";
            OracleCommand command = new OracleCommand(sql, _connection);
            command.ExecuteReader();
            //var test = command.ExecuteReader();
            //ViewBag.Table = command.ExecuteReader();
            //GridView1.DataSource = command.ExecuteReader();
            //GridView1.DataBind();
            _connection.Close();

            return View("~/App/Main/views/layout/layout.cshtml"); //Layout of the angular application.
           
        }
	}
}