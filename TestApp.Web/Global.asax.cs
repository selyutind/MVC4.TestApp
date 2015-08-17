using System;
using Abp.Dependency;
using Abp.Web;
using Castle.Facilities.Logging;
using Oracle.ManagedDataAccess.Client;
using System.Data;
using System.Data.Entity;


namespace TestApp.Web
{
    public class MvcApplication : AbpWebApplication
    {
        protected override void Application_Start(object sender, EventArgs e)
        {
            
            IocManager.Instance.IocContainer.AddFacility<LoggingFacility>(f => f.UseLog4Net().WithConfig("log4net.config"));
            base.Application_Start(sender, e);
            Database.SetInitializer(new CreateDatabaseIfNotExists<Entities>());
         
        }
    }
}
