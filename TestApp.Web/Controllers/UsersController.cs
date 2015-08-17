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
        public IHttpActionResult PutUsers(decimal id, TEST_USERS tEST_USERS)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tEST_USERS.ID)
            {
                return BadRequest();
            }

            db.Entry(tEST_USERS).State = EntityState.Modified;

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