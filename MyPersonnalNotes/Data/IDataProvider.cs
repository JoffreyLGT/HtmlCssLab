using System.Collections.Generic;
using System.Threading.Tasks;
using MyPersonnalNotes.Models.Entities;

namespace MyPersonnalNotes.Data
{
  public interface IDataProvider
  {
    Task<IEnumerable<NoteEntity>> ReadAllNotes();
    Task<NoteEntity> ReadNote(int id);
    Task<NoteEntity> CreateNote(NoteEntity note);
    Task<NoteEntity> UpdateNote(NoteEntity note);
    Task<bool> DeleteNote(int id);
  }
}