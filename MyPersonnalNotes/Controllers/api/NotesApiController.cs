using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
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
    private readonly NoteContext _context;

    public NotesApiController(NoteContext context)
    {
      this._context = context;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<NoteEntity>>> GetNotes()
    {
      return await _context.Notes.ToListAsync();
    }

  }
}