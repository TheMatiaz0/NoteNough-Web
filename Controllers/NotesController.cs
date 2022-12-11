using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteNough.NET.Data;
using NoteNough.NET.Models;
using System.Security.Claims;

namespace NoteNough.NET.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class NotesController : ControllerBase
    {
        private readonly AppDBContext _context;

        public NotesController(AppDBContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public ActionResult GetNotes()
        {
            if (_context.SavedNotes == null)
            {
                return NotFound();
            }

            int userId = GetLoggedInUserId();
            var notes = GetUserNotes(userId);
            return Ok(notes);
        }

        private int GetLoggedInUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
        }

        private IEnumerable<Note> GetUserNotes(int userId)
        {
            return _context.SavedNotes.Where(note => note.UserId == userId);
        }

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(NoteDTO noteDTO)
        {
            if (_context.SavedNotes == null)
            {
                return Problem("Entity set 'AppDBContext.Notes' is null.");
            }

            int userId = GetLoggedInUserId();
            var user = _context.SavedUsers.Find(userId);
            if (user == null)
            {
                return NotFound();
            }

            var note = new Note 
            {
                Text = noteDTO.Text,
                User = user,
                UserId = userId,
                Created = DateTime.UtcNow
            };

            noteDTO.Created = note.Created;

            _context.SavedNotes.Add(note);
            await _context.SaveChangesAsync();
            noteDTO.Key = note.Key;

            return CreatedAtAction("GetNote", new { id = noteDTO.Key}, noteDTO);
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public ActionResult GetNote(int id)
        {
            if (_context.SavedNotes == null)
            {
                return NotFound();
            }

            int userId = GetLoggedInUserId();
            var note = GetUserNotes(userId).FirstOrDefault(x => x.Key == id);

            if (note == null)
            {
                return NotFound();
            }

            return Ok(note);
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult> PutNote(int id, NoteDTO noteDTO)
        {
            int userId = GetLoggedInUserId();
            var existingNote = _context.SavedNotes.Find(id);
            if (existingNote == null)
            {
                return NotFound();
            }

            if (existingNote.UserId != userId)
            {
                return NotFound();
            }

            existingNote.Text = noteDTO.Text;
            existingNote.Updated = noteDTO.Updated = DateTime.UtcNow;

            _context.Entry(existingNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(noteDTO);
        }

        private bool NoteExists(int id)
        {
            return (_context.SavedNotes?.Any(e => e.Key == id)).GetValueOrDefault();
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNote(int id)
        {
            if (_context.SavedNotes == null)
            {
                return NotFound();
            }

            int userId = GetLoggedInUserId();
            var note = GetUserNotes(userId).FirstOrDefault(x => x.Key == id);
            if (note == null)
            {
                return NotFound();
            }

            _context.SavedNotes.Remove(note);
            await _context.SaveChangesAsync();

            return Ok();
        }
    }
}
