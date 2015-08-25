using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using System.Web.Http.Routing;
using TestApp.Web;

namespace TestApp.Web.Controllers
{
    public class CalendarController : ApiController
    {
        private Entities db = new Entities();



        // GET: api/Users
        public IQueryable<TEST_CALENDAR_DM> GetEvents()
        {
            return db.TEST_CALENDAR_DM;
        }

        // POST: api/Users
        [ResponseType(typeof(TEST_CALENDAR_DM))]
        public IHttpActionResult PostEvent(TEST_CALENDAR_DM CALENDAR)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TEST_CALENDAR_DM.Add(CALENDAR);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                throw;
            }

            return CreatedAtRoute("DefaultApi", new { id = CALENDAR.ID }, CALENDAR);
        }
        /*
        public IQueryable<TEST_USERS> GetPaginationUsers(int currentPage = 1, int itemsPerPage = 10)
        {
            //int currentPage = Convert.ToInt32(page);
            //int itemsPerPage = 10;
            //int currentPage = 0;
            IQueryable<TEST_USERS> query;

            query = db.TEST_USERS.OrderBy(c => c.NAME);

            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / itemsPerPage);

            var urlHelper = new UrlHelper(Request);
            //var prevLink = page > 0 ? urlHelper.Link("Students", new { page = page - 1, pageSize = pageSize }) : "";
            //var nextLink = page < totalPages - 1 ? urlHelper.Link("Students", new { page = page + 1, pageSize = pageSize }) : "";            
           

            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Current-Page", Newtonsoft.Json.JsonConvert.SerializeObject(currentPage-1));
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Page-Count", Newtonsoft.Json.JsonConvert.SerializeObject(totalPages));
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Per-Page", Newtonsoft.Json.JsonConvert.SerializeObject(itemsPerPage));
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Total-Count", Newtonsoft.Json.JsonConvert.SerializeObject(totalCount));

            IQueryable<TEST_USERS> results = query
                .Skip(itemsPerPage * (currentPage - 1))
                .Take(itemsPerPage);
            foreach (var user in query)
            {
                user.PASSWORD = null;
            }
            return results;
        }

        // GET: api/Users/5
        [ResponseType(typeof(TEST_USERS))]
        public IHttpActionResult GetUser(decimal id)
        {
            TEST_USERS tEST_USERS = db.TEST_USERS.Find(id);
            if (tEST_USERS == null)
            {
                return NotFound();
            }

            return Ok(tEST_USERS);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUsers(decimal id, TEST_USERS test_users)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != test_users.ID)
            {
                return BadRequest();
            }

            db.Entry(test_users).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        

        // DELETE: api/Users/5
        [ResponseType(typeof(TEST_USERS))]
        public IHttpActionResult DeleteUser(decimal id)
        {
            TEST_USERS tEST_USERS = db.TEST_USERS.Find(id);
            if (tEST_USERS == null)
            {
                return NotFound();
            }

            db.TEST_USERS.Remove(tEST_USERS);
            db.SaveChanges();

            return Ok(tEST_USERS);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(decimal id)
        {
            return db.TEST_USERS.Count(e => e.ID == id) > 0;
        }*/
    }
}