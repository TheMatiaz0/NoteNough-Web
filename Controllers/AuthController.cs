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
        private readonly AppDBContext _dbContext;
        private readonly JwtService _jwtService;

        public AuthController(AppDBContext context, JwtService jwtService)
        {
            _dbContext = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> PostRegister(LoginDTO loginDTO)
        {
            if (_dbContext.SavedUsers == null)
            {
                return Problem("Entity set 'AppDBContext.Notes' is null.");
            }

            var hashedUser = new User
            {
                Email = loginDTO.Email, 
                Password = HashPassword(loginDTO.Password) 
            };

            if (UserExists(hashedUser.Email))
            {
                return BadRequest("User with that email already exists!");
            }

            _dbContext.SavedUsers.Add(hashedUser);
            await _dbContext.SaveChangesAsync();

            return Created("register", hashedUser);
        }

        [HttpPost("login")]
        public IActionResult PostLogin(LoginDTO loginDTO)
        {
            if (_dbContext.SavedUsers == null)
            {
                return Problem("Entity set 'AppDBContext.Notes' is null.");
            }

            var existingUser = _dbContext.SavedUsers.FirstOrDefault(u => u.Email == loginDTO.Email);
            string credentialsError = "Invalid credentials!";
            if (existingUser == null)
            {
                return BadRequest(credentialsError);
            }
            if (!Verify(loginDTO.Password, existingUser.Password))
            {
                return BadRequest(credentialsError);
            }

            var jwt = _jwtService.Generate(existingUser.Id);
            if (jwt == null)
            {
                return Unauthorized();
            }

            var cookieExpiration = loginDTO.RememberMe ? DateTimeOffset.UtcNow.AddDays(30) : DateTimeOffset.UtcNow.AddMinutes(15);
            Response.Cookies.Append(Program.JWTConfig.CookieHeader, jwt, new CookieOptions
            {
                Expires = cookieExpiration,
                Domain = "localhost",
                HttpOnly = true,
                Secure = false,
                SameSite = SameSiteMode.Lax,
                IsEssential = true
            });

            return Ok();
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
            var user = User as ClaimsPrincipal;
            var identity = user.Identity as ClaimsIdentity;

            Response.Cookies.Delete(Program.JWTConfig.CookieHeader);
            var currentClaims = user.Claims.ToArray();
            foreach (var claim in currentClaims)
            {
                identity?.RemoveClaim(claim);
            }

            return Ok("Success!");
        }

        [HttpDelete("delete")]
        [Authorize]
        public async Task<ActionResult> DeleteUser()
        {
            if (_dbContext.SavedUsers == null)
            {
                return NotFound();
            }

            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.SavedUsers.Remove(user);
            await _dbContext.SaveChangesAsync();

            return Ok("Success!");
        }

        private bool UserExists(string email)
        {
            return (_dbContext.SavedUsers?.Any(e => e.Email == email)).GetValueOrDefault();
        }

        private User? GetCurrentUser()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value);
            var user = _dbContext.SavedUsers.Find(userId);
            return user;
        }
    }
}
