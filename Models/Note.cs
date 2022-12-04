using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteNough.NET.Models
{
    public class Note
    {
        [Key]
        public int Key { get; set; }

        [Required]
        [MaxLength(200)]
        public string Text { get; set; } = string.Empty;

        [Required]
        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        [Required]
        public User Owner { get; set; }

        [Required]
        public int OwnerId { get; set; } = default(int);
    }
}
