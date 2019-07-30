using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MyPersonnalNotes.Data;
using MyPersonnalNotes.Models.Entities;

namespace MyPersonnalNotes.Controllers.Api
{
  [Route("api/notes")]
  [ApiController]
  public class NotesApiController : ControllerBase
  {
    private readonly IDataProvider _data;

    public NotesApiController(IDataProvider data)
    {
      this._data = data;
    }

    [HttpPost]
    public async Task<ActionResult<NoteEntity>> CreateNote([FromBody] NoteEntity note)
    {
      note.Id = null; // To ensure we create a new note
      await _data.CreateNote(note);
      if (note.Id == null)
      {
        return BadRequest();
      }
      return CreatedAtAction(nameof(GetNote), new { id = note.Id }, note);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoteEntity>>> GetNotes()
    {
      var notes = await _data.ReadAllNotes();
      if (notes == null)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
      return Ok(notes);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<IEnumerable<NoteEntity>>> GetNote(int id)
    {
      var note = await _data.ReadNote(id);
      if (note == null)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
      return Ok(note);
    }

    [HttpPut]
    public async Task<ActionResult<IEnumerable<NoteEntity>>> UpdateNote(NoteEntity note)
    {
      if (note.Id == null)
      {
        return BadRequest();
      }
      var updatedNote = await _data.UpdateNote(note);
      if (updatedNote == null)
      {
        return StatusCode(StatusCodes.Status500InternalServerError);
      }
      return Ok(updatedNote);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteNote(int id)
    {
      if (await _data.DeleteNote(id))
      {
        return Ok();
      }
      return NotFound();
    }
  }
}