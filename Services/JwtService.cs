using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace NoteNough.NET.Services
{
    public class JwtService
    {
        public string Generate(int userId)
        {
            var tokenKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Program.JWTConfig.SecurityKey));
            var credentials = new SigningCredentials(tokenKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier, userId.ToString())
            };
            var token = new JwtSecurityToken(Program.JWTConfig.Issuer, 
                Program.JWTConfig.Audience, 
                claims, 
                expires: DateTime.UtcNow.Add(Program.JWTConfig.ExpirationTime), 
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        public JwtSecurityToken Verify(string jwt)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            byte[] key = Encoding.UTF8.GetBytes(Program.JWTConfig.SecurityKey);

            tokenHandler.ValidateToken(jwt, new TokenValidationParameters
            {
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidIssuer = Program.JWTConfig.Issuer,
                ValidAudience = Program.JWTConfig.Audience,
            }, out var validatedToken);

            return (JwtSecurityToken)validatedToken;
        }
    }
}
