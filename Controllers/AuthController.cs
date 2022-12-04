using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using NoteNough.NET.Data;
using NoteNough.NET.Models;
using NoteNough.NET.Services;
using System.Security.Claims;
using static BCrypt.Net.BCrypt;

namespace NoteNough.NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private const string JWTCookieKey = "Bearer";

        private readonly AppDBContext _dbContext;
        private readonly JwtService _jwtService;

        public AuthController(AppDBContext context, JwtService jwtService)
        {
            _dbContext = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public IActionResult PostRegister(User user)
        {
            if (_dbContext.SavedUsers == null)
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

            _dbContext.SavedUsers.Add(hashedUser);
            hashedUser.Id = _dbContext.SaveChanges();

            return Created(nameof(PostRegister), hashedUser);
        }

        [HttpPost("login")]
        public IActionResult PostLogin(User user)
        {
            if (_dbContext.SavedUsers == null)
            {
                return Problem("Entity set 'AppDBContext.Notes' is null.");
            }

            var existingUser = _dbContext.SavedUsers.FirstOrDefault(u => u.Email == user.Email);
            string credentialsError = "Invalid credentials!";
            if (existingUser == null)
            {
                return BadRequest(credentialsError);
            }
            if (!Verify(user.Password, existingUser.Password))
            {
                return BadRequest(credentialsError);
            }

            var jwt = _jwtService.Generate(existingUser.Id, existingUser.Email);
            if (jwt == null)
            {
                return Unauthorized();
            }

            Response.Cookies.Append("Authorization", jwt, new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddMinutes(15),
            });

            return Ok(jwt);
        }

        [HttpGet("user")]
        [Authorize]
        public IActionResult GetUser()
        {
            var currentUser = GetCurrentUser();
            return Ok(currentUser);
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
            if (_dbContext.SavedUsers == null)
            {
                return NotFound();
            }
            var user = _dbContext.SavedUsers.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.SavedUsers.Remove(user);
            _dbContext.SaveChanges();

            return NoContent();
        }

        private bool UserExists(string email)
        {
            return (_dbContext.SavedUsers?.Any(e => e.Email == email)).GetValueOrDefault();
        }

        private User? GetCurrentUser()
        {
            if (HttpContext.User.Identity is ClaimsIdentity identity)
            {
                var userClaims = identity.Claims;
                return new User
                {
                    Email = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Email)?.Value,
                };
            }
            return null;
        }

        /*
        [HttpGet("user")]
        public IActionResult GetUser()
        {
            try
            {
                var jwt = Request.Cookies[JWTCookieKey];
                var token = _jwtService.Verify(jwt);
                int userId = int.Parse(token.Issuer);
                var existingUser = _dbContext.SavedUsers.FirstOrDefault(u => u.Id == userId);
                return Ok(existingUser);
            }
            catch
            {
                return Unauthorized();
            }
        }
        */
    }
}
