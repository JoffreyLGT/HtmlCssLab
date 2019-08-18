using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using api.Data;
using api.Models;

namespace api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AttendeeController : ControllerBase
    {
        private readonly AttendeeDbContext _context;

        public AttendeeController(AttendeeDbContext context)
        {
            _context = context;
        }

        // GET: api/Attendee
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Attendee>>> GetAttendees()
        {
            return await _context.Attendees.ToListAsync();
        }

        // GET: api/Attendee/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Attendee>> GetAttendee(int id)
        {
            var attendee = await _context.Attendees.FindAsync(id);

            if (attendee == null)
            {
                return NotFound();
            }

            return attendee;
        }

        // PUT: api/Attendee/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAttendee(int id, Attendee attendee)
        {
            if (id != attendee.Id)
            {
                return BadRequest();
            }

            _context.Entry(attendee).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AttendeeExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Attendee
        [HttpPost]
        public async Task<ActionResult<Attendee>> PostAttendee(Attendee attendee)
        {
            _context.Attendees.Add(attendee);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetAttendee", new { id = attendee.Id }, attendee);
        }

        // DELETE: api/Attendee/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Attendee>> DeleteAttendee(int id)
        {
            var attendee = await _context.Attendees.FindAsync(id);
            if (attendee == null)
            {
                return NotFound();
            }

            _context.Attendees.Remove(attendee);
            await _context.SaveChangesAsync();

            return attendee;
        }

        private bool AttendeeExists(int id)
        {
            return _context.Attendees.Any(e => e.Id == id);
        }
    }
}
