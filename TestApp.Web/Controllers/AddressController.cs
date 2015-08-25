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
    public class AddressController : ApiController
    {
        private Entities db = new Entities();

        // GET: api/Address
        public IQueryable<TEST_SA_TT> GetTEST_SA_TT()
        {
            return db.TEST_SA_TT;
        }
        // GET: api/Address/GetPaginationAddress
        public IQueryable<TEST_SA_TT> GetPaginationAddress(int currentPage = 1, int itemsPerPage = 10, string search = null)
        {

            IQueryable<TEST_SA_TT> query;

            query = db.TEST_SA_TT.OrderBy(c => c.TEXT_ADDR);

            //Поиск v1

            if (!String.IsNullOrEmpty(search))
            {
                string[] searchElements = search.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string searchElement in searchElements)
                {
                    string element = searchElement;
                    query = query.Where(c => c.TEXT_ADDR.Contains(element) || c.TEXT_ADDR_NRM.Contains(element));
                }
            }


            var totalCount = query.Count();
            var totalPages = (int)Math.Ceiling((double)totalCount / itemsPerPage);

            var urlHelper = new UrlHelper(Request);
            //var prevLink = page > 0 ? urlHelper.Link("Students", new { page = page - 1, pageSize = pageSize }) : "";
            //var nextLink = page < totalPages - 1 ? urlHelper.Link("Students", new { page = page + 1, pageSize = pageSize }) : "";            


            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Current-Page", Newtonsoft.Json.JsonConvert.SerializeObject(currentPage - 1));
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Page-Count", Newtonsoft.Json.JsonConvert.SerializeObject(totalPages));
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Per-Page", Newtonsoft.Json.JsonConvert.SerializeObject(itemsPerPage));
            System.Web.HttpContext.Current.Response.Headers.Add("X-Pagination-Total-Count", Newtonsoft.Json.JsonConvert.SerializeObject(totalCount));

            IQueryable<TEST_SA_TT> results = query
                .Skip(itemsPerPage * (currentPage - 1))
                .Take(itemsPerPage);            
            return results;
        }


        // GET: api/Address/5
        [ResponseType(typeof(TEST_SA_TT))]
        public IHttpActionResult GetTEST_SA_TT(decimal id)
        {
            TEST_SA_TT tEST_SA_TT = db.TEST_SA_TT.Find(id);
            if (tEST_SA_TT == null)
            {
                return NotFound();
            }

            return Ok(tEST_SA_TT);
        }

        // PUT: api/Address/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTEST_SA_TT(decimal id, TEST_SA_TT tEST_SA_TT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tEST_SA_TT.ID)
            {
                return BadRequest();
            }

            db.Entry(tEST_SA_TT).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TEST_SA_TTExists(id))
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

        // POST: api/Address
        [ResponseType(typeof(TEST_SA_TT))]
        public IHttpActionResult PostTEST_SA_TT(TEST_SA_TT tEST_SA_TT)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TEST_SA_TT.Add(tEST_SA_TT);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (TEST_SA_TTExists(tEST_SA_TT.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tEST_SA_TT.ID }, tEST_SA_TT);
        }

        // DELETE: api/Address/5
        [ResponseType(typeof(TEST_SA_TT))]
        public IHttpActionResult DeleteTEST_SA_TT(decimal id)
        {
            TEST_SA_TT tEST_SA_TT = db.TEST_SA_TT.Find(id);
            if (tEST_SA_TT == null)
            {
                return NotFound();
            }

            db.TEST_SA_TT.Remove(tEST_SA_TT);
            db.SaveChanges();

            return Ok(tEST_SA_TT);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TEST_SA_TTExists(decimal id)
        {
            return db.TEST_SA_TT.Count(e => e.ID == id) > 0;
        }
    }
}