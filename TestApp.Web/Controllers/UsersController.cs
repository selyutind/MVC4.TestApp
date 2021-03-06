﻿using System;
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
    public class UsersController : ApiController
    {
        private Entities db = new Entities();
        // GET: api/Users
        public IQueryable<TEST_USERS> GetUsers()
        {
            return db.TEST_USERS;
        }
        public IQueryable<TEST_USERS> GetPaginationUsers(int currentPage = 1, int itemsPerPage = 10, string search = null)
        {
               
            IQueryable<TEST_USERS> query;

            query = db.TEST_USERS.OrderBy(c => c.NAME);

            //Поиск v1

            if (!String.IsNullOrEmpty(search))
            {
                string[] searchElements = search.Split(new char[] { ' ' }, StringSplitOptions.RemoveEmptyEntries);
                foreach (string searchElement in searchElements)
                {
                    string element = searchElement;
                    query = query.Where(c => c.NAME.Contains(element) || c.LOGIN.Contains(element) || c.EMAIL.Contains(element));
                }
            }


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

        // POST: api/Users
        [ResponseType(typeof(TEST_USERS))]
        public IHttpActionResult PostUser(TEST_USERS tEST_USERS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TEST_USERS.Add(tEST_USERS);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(tEST_USERS.ID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = tEST_USERS.ID }, tEST_USERS);
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
        }
    }
}