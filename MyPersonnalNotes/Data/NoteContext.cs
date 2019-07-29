using Microsoft.EntityFrameworkCore;
using MyPersonnalNotes.Models.Entities;

namespace MyPersonnalNotes.Data
{
  public class NoteContext : DbContext
  {
    public NoteContext(DbContextOptions<NoteContext> options) : base(options) { }
    public DbSet<NoteEntity> Notes { get; set; }
  }
}