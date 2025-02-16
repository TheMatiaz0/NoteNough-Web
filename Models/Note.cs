using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NoteNough.NET.Models
{
    public class Note
    {
        [Key]
        public int Key { get; set; }

        [Required]
        [MaxLength(100)]
        public string Text { get; set; } = string.Empty;

        public DateTime Created { get; set; }

        public DateTime? Updated { get; set; }

        public int UserId { get; set; }

        [ForeignKey("UserId"), JsonIgnore]
        public virtual User User { get; set; }
    }
}
