using System;
using Abp.Dependency;
using Abp.Web;
using Castle.Facilities.Logging;
using Oracle.ManagedDataAccess.Client;
using System.Data;


namespace TestApp.Web
{
    public class MvcApplication : AbpWebApplication
    {
        protected override void Application_Start(object sender, EventArgs e)
        {
            IocManager.Instance.IocContainer.AddFacility<LoggingFacility>(f => f.UseLog4Net().WithConfig("log4net.config"));
            base.Application_Start(sender, e);

            /*string connectionString = "DATA SOURCE=192.168.36.135:1521/DEV; PASSWORD=pw;PERSIST SECURITY INFO=True;USER ID=MDM";
            OracleConnection _connection = new OracleConnection();
            _connection.ConnectionString = connectionString;
            DataTable dataTable = new DataTable();
            _connection.Open();
            string sql = "select * from test_sa";
            OracleCommand command = new OracleCommand(sql, _connection);
            GridView1.DataSource = command.ExecuteReader();
            GridView1.DataBind();
            _connection.Close();*/
        }
    }
}
