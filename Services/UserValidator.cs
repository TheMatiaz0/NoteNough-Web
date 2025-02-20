using Microsoft.Extensions.Options;
using NoteNough.NET.Data;
using NoteNough.NET.Models;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Services
{
    public class UserValidator
    {
        private readonly AppConfigurationData _config;

        public UserValidator(IOptionsSnapshot<AppConfigurationData> options)
        {
            _config = options.Value;
        }

        public IEnumerable<ValidationResult> Validate(IUserDto userDto)
        {
            if (!string.IsNullOrEmpty(userDto.Email) && !new EmailAddressAttribute().IsValid(userDto.Email))
            {
                yield return new ValidationResult("Invalid email format.",
                    new[] { nameof(userDto.Email) });
            }

            if (!string.IsNullOrEmpty(userDto.Password) && userDto.Password.Length < _config.RequiredPasswordLength)
            {
                yield return new ValidationResult(
                    $"Password must be at least {_config.RequiredPasswordLength} characters long.",
                    new[] { nameof(LoginDto.Password) }
                );
            }
        }
    }
}