using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using NoteNough.NET.Data;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NoteNough.NET.Services
{
    public class JwtService
    {
        private readonly JwtConfigurationData _jwtConfig;

        public JwtService(IOptionsSnapshot<JwtConfigurationData> jwtConfig)
        {
            _jwtConfig = jwtConfig.Value;
        }

        public string Generate(int userId)
        {
            var tokenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_jwtConfig.SecurityKey));
            var credentials = new SigningCredentials(tokenKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString())
            };
            var token = new JwtSecurityToken(_jwtConfig.Issuer,
                _jwtConfig.Audience, 
                claims, 
                expires: DateTime.UtcNow.Add(_jwtConfig.ExpirationTime), 
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(_jwtConfig.SecurityKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = _jwtConfig.Issuer,
                ValidAudience = _jwtConfig.Audience,
            }, out var validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
