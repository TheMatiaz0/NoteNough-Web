using Microsoft.Extensions.Options;
using NoteNough.NET.Data;
using NoteNough.NET.Models;
using System.ComponentModel.DataAnnotations;

namespace NoteNough.NET.Services
{
    public class NoteValidator
    {
        private readonly AppConfigurationData _config;

        public NoteValidator(IOptionsSnapshot<AppConfigurationData> options)
        {
            _config = options.Value;
        }

        public IEnumerable<ValidationResult> Validate(NoteDto noteDto)
        {
            if (noteDto.Updated.HasValue && noteDto.Updated < noteDto.Created)
            {
                yield return new ValidationResult(
                    "Updated date cannot be earlier than Created date!",
                    new[] { nameof(noteDto.Updated) }
                );
            }

            if (!string.IsNullOrEmpty(noteDto.Text) && noteDto.Text.Length > _config.NoteTextLength)
            {
                yield return new ValidationResult(
                    $"Text is above the limit. Expected: {_config.NoteTextLength}",
                    new[] { nameof(NoteDto.Text) }
                );
            }
        }
    }
}