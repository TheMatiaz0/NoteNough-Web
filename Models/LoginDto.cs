using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class LoginDto : IUserDto
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        public string Password { get; set; }

        public bool RememberMe { get; set; } = true;
    }
}
