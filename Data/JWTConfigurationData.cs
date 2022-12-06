namespace NoteNough.NET.Data
{
    public class JWTConfigurationData
    {
        public string SecurityKey { get; private set; }
        public string Issuer { get; private set; }
        public string Audience { get; private set; }
        public string CookieHeader { get; private set; }
    }
}
