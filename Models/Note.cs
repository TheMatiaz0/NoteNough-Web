using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class Note
    {
        [Key]
        public int Key { get; set; }

        [Required]
        [MaxLength(100000)]
        public string Text { get; set; } = string.Empty;

        [Required]
        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }
    }
}
