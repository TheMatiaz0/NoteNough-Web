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
        private readonly AppDbContext _dbContext;
        private readonly JwtService _jwtService;
        private readonly AppConfigurationData _appConfigurationData;
        private readonly UserValidator _validator;

        public AuthController(AppDbContext context, 
            JwtService jwtService, 
            IOptionsSnapshot<AppConfigurationData> appData,
            UserValidator validator)
        {
            _dbContext = context;
            _jwtService = jwtService;
            _appConfigurationData = appData.Value;
            _validator = validator;
        }

        [HttpPost("register")]
        public async Task<ActionResult> PostRegister(LoginDto loginDto)
        {
            if (UserExists(loginDto.Email))
            {
                return BadRequest(ErrorStatus.UserAlreadyExistsError);
            }

            var result = _validator.Validate(loginDto);
            if (result.Any())
            {
                return BadRequest(result);
            }

            var hashedUser = new User
            {
                Email = loginDto.Email, 
                Password = HashPassword(loginDto.Password) 
            };

            _dbContext.SavedUsers.Add(hashedUser);
            await _dbContext.SaveChangesAsync();

            ForceLogin(loginDto, hashedUser);

            return NoContent();
        }

        [HttpPost("login")]
        [ActionName("login")]
        public ActionResult PostLogin(LoginDto loginDto)
        {
            var result = _validator.Validate(loginDto);
            if (result.Any())
            {
                return BadRequest(result);
            }
            var existingUser = _dbContext.SavedUsers.FirstOrDefault(u => u.Email == loginDto.Email);
            if (existingUser == null)
            {
                return NotFound(ErrorStatus.UserDoesNotExistError);
            }

            if (Verify(loginDto.Password, existingUser.Password))
            {
                ForceLogin(loginDto, existingUser);
                return NoContent();
            }
            else
            {
                return BadRequest(ErrorStatus.CredentialsError);
            }
        }

        private void ForceLogin(LoginDto loginDto, User user)
        {
            var jwt = _jwtService.Generate(user.Id);
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
                return NotFound(ErrorStatus.UserDoesNotExistError);
            }

            if (!Verify(deleteUserDto.CurrentPassword, user.Password))
            {
                return BadRequest(ErrorStatus.CredentialsError);
            }

            _dbContext.SavedUsers.Remove(user);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        [HttpPut("update")]
        [Authorize]
        public async Task<ActionResult> UpdateUser([FromBody] UpdateUserDto updateUserDto)
        {
            var result = _validator.Validate(updateUserDto);
            if (result.Any())
            {
                return BadRequest(result);
            }

            var user = GetCurrentUser();
            if (user == null)
            {
                return NotFound(ErrorStatus.UserDoesNotExistError);
            }

            if (!Verify(updateUserDto.CurrentPassword, user.Password))
            {
                return BadRequest(ErrorStatus.CredentialsError);
            }

            if (!string.IsNullOrEmpty(updateUserDto.Email))
            {
                if (UserExists(updateUserDto.Email))
                {
                    return BadRequest(ErrorStatus.UserAlreadyExistsError);
                }
                user.Email = updateUserDto.Email;
            }

            if (!string.IsNullOrEmpty(updateUserDto.Password))
            {
                user.Password = HashPassword(updateUserDto.Password);
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
