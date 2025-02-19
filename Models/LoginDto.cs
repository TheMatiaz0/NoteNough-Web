using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class LoginDto : IValidatableObject
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        public string Password { get; set; }

        public bool RememberMe { get; set; } = true;

        // Replacement of RequiredAttribute that doesn't work properly with JsonIgnore
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!string.IsNullOrEmpty(Email) && !new EmailAddressAttribute().IsValid(Email))
            {
                yield return new ValidationResult("Invalid email format.", new[] { nameof(Email) });
            }

            if (!string.IsNullOrEmpty(Password) && Password.Length < 8)
            {
                yield return new ValidationResult("New password must be at least 8 characters long.", new[] { nameof(Password) });
            }
        }
    }
}
