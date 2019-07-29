using System;

namespace MyPersonnalNotes.Models.Entities
{
  public class NoteEntity
  {
    public int Id { get; set; }
    public string Title { get; set; }
    public string Content { get; set; }
    public DateTime CreatedOn { get; set; }
    public DateTime? UpdatedOn { get; set; }
  }
}