using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class AddNoteDTO
    {
        [Key]
        public int Key { get; set; }

        [Required]
        [MaxLength(200)]
        public string Text { get; set; } = string.Empty;

        public DateTime? Updated { get; set; }
    }
}
