using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NoteNough.NET.Data;
using NoteNough.NET.Models;
using NoteNough.NET.Services;
using static BCrypt.Net.BCrypt;

namespace NoteNough.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly AppDBContext _dbContext;
        private readonly JwtService _jwtService;

        public AuthController(AppDBContext context, JwtService jwtService)
        {
            _dbContext = context;
            _jwtService = jwtService;
        }

        public async Task<ActionResult<User>> GetUser(string email)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }

            var user = await _dbContext.Users.FindAsync(email);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        [HttpPost("register")]
        public async Task<ActionResult<User>> PostRegistration(User user)
        {
            if (_dbContext.Users == null)
            {
                return Problem("Entity set 'AppDBContext.Notes'  is null.");
            }

            user.Password = HashPassword(user.Password);

            _dbContext.Users.Add(user);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction("Register", new { id = user.Id }, user);
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> PostLogin(User user)
        {
            if (_dbContext.Users == null)
            {
                return Problem("Entity set 'AppDBContext.Notes'  is null.");
            }

            var verifiedUser = await _dbContext.Users.FindAsync(user.Email);

            if (verifiedUser != null || !Verify(user.Password, verifiedUser.Password))
            {
                return BadRequest("Invalid credentials!");
            }

            var jwt = _jwtService.Generate(verifiedUser.Id);

            Response.Cookies.Append("jwt", jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok("Logged in!");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }
            var user = await _dbContext.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.Users.Remove(user);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return (_dbContext.Users?.Any(e => e.Id == id)).GetValueOrDefault();
        }

        private bool UserExists(string email)
        {
            return (_dbContext.Users?.Any(e => e.Email == email)).GetValueOrDefault();
        }
    }
}
