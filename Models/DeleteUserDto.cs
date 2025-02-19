using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class DeleteUserDto
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;
    }
}
