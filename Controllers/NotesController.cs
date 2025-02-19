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
        private readonly AppDbContext _context;

        public NotesController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Notes
        [HttpGet]
        public ActionResult GetNotes()
        {
            int userId = GetLoggedInUserId();
            var notes = GetUserNotes(userId);
            return Ok(notes);
        }

        private int GetLoggedInUserId()
        {
            return int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
        }

        private IEnumerable<Note> GetUserNotes(int userId)
        {
            return _context.SavedNotes.Where(note => note.UserId == userId);
        }

        // POST: api/Notes
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Note>> PostNote(NoteDto noteDto)
        {
            int userId = GetLoggedInUserId();
            var user = _context.SavedUsers.Find(userId);
            if (user == null)
            {
                return NotFound(ErrorStatus.UserDoesNotExistError);
            }

            var note = new Note 
            {
                Text = noteDto.Text,
                User = user,
                UserId = userId,
                Created = DateTime.UtcNow
            };

            _context.SavedNotes.Add(note);
            await _context.SaveChangesAsync();
            noteDto.Created = note.Created;
            noteDto.Key = note.Key;

            return CreatedAtAction(nameof(GetNote), new { id = noteDto.Key}, noteDto);
        }

        // GET: api/Notes/5
        [HttpGet("{id}")]
        public ActionResult GetNote(int id)
        {
            int userId = GetLoggedInUserId();
            var note = GetUserNotes(userId).FirstOrDefault(x => x.Key == id);

            if (note == null)
            {
                return NotFound(ErrorStatus.NoteDoesNotExistError);
            }

            return Ok(note);
        }

        // PUT: api/Notes/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<ActionResult> PutNote(int id, NoteDto noteDto)
        {
            int userId = GetLoggedInUserId();
            var existingNote = _context.SavedNotes.Find(id);
            if (existingNote == null || existingNote.UserId != userId)
            {
                return NotFound(ErrorStatus.NoteDoesNotExistError);
            }

            existingNote.Text = noteDto.Text;
            existingNote.Updated = noteDto.Updated = DateTime.UtcNow;

            _context.Entry(existingNote).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NoteExists(id))
                {
                    return NotFound(ErrorStatus.NoteDoesNotExistError);
                }
                else
                {
                    throw;
                }
            }

            return Ok(noteDto);
        }

        private bool NoteExists(int id)
        {
            return (_context.SavedNotes?.Any(e => e.Key == id)).GetValueOrDefault();
        }

        // DELETE: api/Notes/5
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNote(int id)
        {
            int userId = GetLoggedInUserId();
            var note = GetUserNotes(userId).FirstOrDefault(x => x.Key == id);
            if (note == null)
            {
                return NotFound(ErrorStatus.NoteDoesNotExistError);
            }

            _context.SavedNotes.Remove(note);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
