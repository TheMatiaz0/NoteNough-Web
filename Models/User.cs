using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    [Index(nameof(User.Email), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; } = default(int);

        [Required]
        [MaxLength(500)]
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        [MaxLength(500)]
        public string Password { get; set; }

        public ICollection<Note>? Notes { get; set; }
    }
}
