using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class NoteDto
    {
        [Key]
        public int Key { get; set; }

        [Required]
        [MaxLength(200)]
        public string Text { get; set; } = string.Empty;

        public DateTime Created { get; set; }
        public DateTime? Updated { get; set; }
    }
}
