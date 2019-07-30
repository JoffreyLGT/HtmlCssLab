using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using MyPersonnalNotes.Models.Entities;

namespace MyPersonnalNotes.Data
{
  public class DbDataProvider : IDataProvider
  {
    private readonly NoteContext _context;

    public DbDataProvider(NoteContext context)
    {
      this._context = context;
    }

    public async Task<NoteEntity> CreateNote(NoteEntity note)
    {
      note.Title = note.Title ?? "New note";
      note.CreatedOn = note.CreatedOn ?? DateTime.Now;
      note.UpdatedOn = DateTime.Now;

      await _context.Notes.AddAsync(note);
      return await _context.SaveChangesAsync() > 0 ? note : null;
    }

    public async Task<IEnumerable<NoteEntity>> ReadAllNotes()
    {
      return await _context.Notes.ToListAsync();
    }

    public async Task<NoteEntity> ReadNote(int id)
    {
      return await _context.Notes.FindAsync(id);
    }

    public async Task<NoteEntity> UpdateNote(NoteEntity note)
    {
      NoteEntity noteToUpdate = await ReadNote((int)note.Id);
      noteToUpdate.UpdateFrom(note);
      _context.Update(noteToUpdate);
      return await _context.SaveChangesAsync() > 0 ? noteToUpdate : null;
    }
    public async Task<bool> DeleteNote(int id)
    {
      var note = await ReadNote(id);
      if (note == null)
      {
        return false;
      }
      _context.Notes.Remove(note);
      return (await _context.SaveChangesAsync()) > 0;
    }
  }
}