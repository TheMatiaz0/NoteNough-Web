using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class UpdateUserDto : IValidatableObject
    {
        [Required]
        public string CurrentPassword { get; set; } = string.Empty;

        public string? NewEmail { get; set; }

        public string? NewPassword { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(NewEmail) && string.IsNullOrEmpty(NewPassword))
            {
                yield return new ValidationResult("Either a new email or a new password must be provided.", new[] { nameof(NewEmail), nameof(NewPassword) });
            }

            if (!string.IsNullOrEmpty(NewEmail) && !new EmailAddressAttribute().IsValid(NewEmail))
            {
                yield return new ValidationResult("Invalid email format.", new[] { nameof(NewEmail) });
            }

            if (!string.IsNullOrEmpty(NewPassword) && NewPassword.Length < 8)
            {
                yield return new ValidationResult("New password must be at least 8 characters long.", new[] { nameof(NewPassword) });
            }
        }
    }
}