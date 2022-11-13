using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    [Index(nameof(User.Email), IsUnique = true)]
    public class User
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string Email { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;

        public ICollection<Note>? Notes { get; set; }
    }
}
