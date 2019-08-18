using api.Models;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class AttendeeDbContext : DbContext
    {
        public AttendeeDbContext(DbContextOptions<AttendeeDbContext> options)
    : base(options)
        { }
        public DbSet<Attendee> Attendees { get; set; }
    }
}