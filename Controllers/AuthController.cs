using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
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
        private const string CredentialsError = "Incorrect password.";
        private const string UserDoesNotExistError = "User does not exist.";
        private const string UserAlreadyExistsError = "Email is already in use.";
        
        private readonly AppDbContext _dbContext;
        private readonly JwtService _jwtService;
        private readonly AppConfigurationData _appConfigurationData;

        public AuthController(AppDbContext context, JwtService jwtService, IOptionsSnapshot<AppConfigurationData> appData)
        {
            _dbContext = context;
            _jwtService = jwtService;
            _appConfigurationData = appData.Value;
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
                return BadRequest(UserAlreadyExistsError);
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
                return NotFound(UserDoesNotExistError);
            }

            if (Verify(loginDto.Password, existingUser.Password))
            {
                var jwt = _jwtService.Generate(existingUser.Id);
                var expirationTime = loginDto.RememberMe ? 
                    DateTimeOffset.UtcNow.Add(_appConfigurationData.SessionTimeWithCookie) 
                    : DateTimeOffset.UtcNow.Add(_appConfigurationData.SessionTimeWithoutCookie);

                Response.Cookies.Append(Program.JWTConfig.CookieHeader, jwt, new CookieOptions
                {
                    Expires = expirationTime,
                    Domain = Program.JWTConfig.Audience,
                    HttpOnly = true,
                    Secure = false,
                    SameSite = SameSiteMode.Lax,
                    IsEssential = true,
                });

                return NoContent();
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

            return NoContent();
        }

        [HttpDelete("delete")]
        [Authorize]
        public async Task<ActionResult> DeleteUser([FromBody] DeleteUserDto deleteUserDto)
        {
            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound(UserDoesNotExistError);
            }

            if (!Verify(deleteUserDto.CurrentPassword, user.Password))
            {
                return BadRequest(CredentialsError);
            }

            _dbContext.SavedUsers.Remove(user);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("update")]
        [Authorize]
        public async Task<ActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound(UserDoesNotExistError);
            }

            if (!Verify(updateUserDto.CurrentPassword, user.Password))
            {
                return BadRequest(CredentialsError);
            }

            if (!string.IsNullOrEmpty(updateUserDto.NewEmail))
            {
                if (UserExists(updateUserDto.NewEmail))
                {
                    return BadRequest(UserAlreadyExistsError);
                }
                user.Email = updateUserDto.NewEmail;
            }

            if (!string.IsNullOrEmpty(updateUserDto.NewPassword))
            {
                user.Password = HashPassword(updateUserDto.NewPassword);
            }

            await _dbContext.SaveChangesAsync();
            PostLogout();

            return NoContent();
        }

        private bool UserExists(string email)
        {
            return (_dbContext.SavedUsers?.Any(e => e.Email == email)).GetValueOrDefault();
        }

        private User? GetCurrentUser()
        {
            int userId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier)?.Value!);
            var user = _dbContext.SavedUsers.Find(userId);
            return user;
        }
    }
}
