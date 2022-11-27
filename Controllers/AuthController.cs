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
        private const string JWTCookieKey = "jwt";

        private readonly AppDBContext _dbContext;
        private readonly JwtService _jwtService;

        public AuthController(AppDBContext context, JwtService jwtService)
        {
            _dbContext = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult PostRegistration(User user)
        {
            if (_dbContext.Users == null)
            {
                return Problem("Entity set 'AppDBContext.Notes' is null.");
            }

            var hashedUser = new User
            { 
                Email = user.Email, 
                Password = HashPassword(user.Password) 
            };

            if (UserExists(hashedUser.Email))
            {
                return BadRequest("User with that email already exists!");
            }

            _dbContext.Users.Add(hashedUser);
            hashedUser.Id = _dbContext.SaveChanges();

            return Created("Register", hashedUser);
        }

        [HttpPost("login")]
        public IActionResult PostLogin(User user)
        {
            if (_dbContext.Users == null)
            {
                return Problem("Entity set 'AppDBContext.Notes'  is null.");
            }

            var existingUser = _dbContext.Users.FirstOrDefault(u => u.Email == user.Email);
            string credentialsError = "Invalid credentials!";
            if (existingUser == null)
            {
                return BadRequest(credentialsError);
            }

            if (!Verify(user.Password, existingUser.Password))
            {
                return BadRequest(credentialsError);
            }

            var jwt = _jwtService.Generate(existingUser.Id);

            Response.Cookies.Append(JWTCookieKey, jwt, new CookieOptions
            {
                HttpOnly = true
            });

            return Ok("Logged in!");
        }

        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies[JWTCookieKey];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var existingUser = _dbContext.Users.FirstOrDefault(u => u.Id == userId);
                return Ok(existingUser);
            }
            catch
            {
                return Unauthorized();
            }
        }

        [HttpPost("logout")]
        public IActionResult PostLogout()
        {
            Response.Cookies.Delete(JWTCookieKey);
            return Ok("Success!");
        }


        [HttpDelete("delete")]
        public IActionResult DeleteUser(int id)
        {
            if (_dbContext.Users == null)
            {
                return NotFound();
            }
            var user = _dbContext.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();

            return NoContent();
        }

        private bool UserExists(string email)
        {
            return (_dbContext.Users?.Any(e => e.Email == email)).GetValueOrDefault();
        }
    }
}
