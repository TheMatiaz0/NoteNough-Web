using Microsoft.EntityFrameworkCore;
using Newtonsoft.Json;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Models
{
    public class LoginDTO : IValidatableObject
    {
        [Required]
        public string Email { get; set; } = string.Empty;

        [JsonIgnore]
        public string Password { get; set; }

        public bool RememberMe { get; set; } = true;

        // Replacement of RequiredAttribute that doesn't work properly with JsonIgnore
        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (string.IsNullOrEmpty(Password))
            {
                yield return new ValidationResult("The password cannot be empty!", new[] { nameof(Password) });
            }
        }
    }
}
