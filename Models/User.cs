using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NoteNough.NET.Models
{
    [Index(nameof(User.Email), IsUnique = true)]
    public class User
    {
        [Key]
        [JsonIgnore]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        public string Password { get; set; } = string.Empty;

        public ICollection<Note>? Notes { get; set; }
    }
}
