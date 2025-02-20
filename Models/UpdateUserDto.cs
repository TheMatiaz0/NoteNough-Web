using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class UpdateUserDto : IValidatableObject, IUserDto
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;

        public string? Email { get; set; }

        public string? Password { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Email) && string.IsNullOrEmpty(Password))
            {
                yield return new ValidationResult("Either a new email or a new password must be provided.", new[] { nameof(Email), nameof(Password) });
            }
        }
    }
}