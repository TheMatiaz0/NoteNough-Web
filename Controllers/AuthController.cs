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
        private const string CredentialsError = "Invalid credentials!";
        
        private readonly AppDbContext _dbContext;
        private readonly JwtService _jwtService;

        public AuthController(AppDbContext context, JwtService jwtService)
        {
            _dbContext = context;
            _jwtService = jwtService;
        }

        [HttpPost("register")]
        public async Task<ActionResult> PostRegister(LoginDto loginDto)
        {
            var hashedUser = new User
            {
                Email = loginDto.Email, 
                Password = HashPassword(loginDto.Password) 
            };

            if (UserExists(hashedUser.Email))
            {
                return BadRequest("User with that email already exists!");
            }

            _dbContext.SavedUsers.Add(hashedUser);
            await _dbContext.SaveChangesAsync();

            var loginResult = PostLogin(loginDto);

            return loginResult;
        }

        [HttpPost("login")]
        [ActionName("login")]
        public ActionResult PostLogin(LoginDto loginDto)
        {
            var existingUser = _dbContext.SavedUsers.FirstOrDefault(u => u.Email == loginDto.Email);
            if (existingUser == null)
            {
                return BadRequest(CredentialsError);
            }

            if (Verify(loginDto.Password, existingUser.Password))
            {
                var jwt = _jwtService.Generate(existingUser.Id);
                var cookieExpiration = loginDto.RememberMe ? DateTimeOffset.UtcNow.AddDays(30) : DateTimeOffset.UtcNow.AddMinutes(15);
                Response.Cookies.Append(Program.JWTConfig.CookieHeader, jwt, new CookieOptions
                {
                    Expires = cookieExpiration,
                    Domain = "localhost",
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Lax,
                    IsEssential = true,
                });

                return Ok();
            }
            else
            {
                return BadRequest(CredentialsError);
            }
        }

        [HttpGet("user")]
        [Authorize]
        public ActionResult GetUser()
        {
            var currentUser = GetCurrentUser();
            return Ok(currentUser);
        }

        [HttpPost("logout")]
        [Authorize]
        public ActionResult PostLogout()
        {
            var user = User;
            var identity = user.Identity as ClaimsIdentity;

            Response.Cookies.Delete(Program.JWTConfig.CookieHeader);
            var currentClaims = user.Claims.ToArray();
            foreach (var claim in currentClaims)
            {
                identity?.RemoveClaim(claim);
            }

            return Ok();
        }

        [HttpDelete("delete")]
        [Authorize]
        public async Task<ActionResult> DeleteUser()
        {
            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound();
            }

            _dbContext.SavedUsers.Remove(user);
            await _dbContext.SaveChangesAsync();

            return Ok();
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
