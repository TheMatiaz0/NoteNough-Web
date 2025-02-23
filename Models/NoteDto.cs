using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class NoteDto : IValidatableObject
    {
        [Key]
        public int Key { get; set; }

        [Required]
        public string Text { get; set; } = string.Empty;

        public DateTime? Created { get; set; }

        public DateTime? Updated { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (Updated.HasValue && Updated < Created)
            {
                yield return new ValidationResult(
                    "Updated date cannot be earlier than Created date!",
                    new[] { nameof(Updated) }
                );
            }
        }
    }
}
