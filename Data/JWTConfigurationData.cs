namespace NoteNough.NET.Data
{
    public class JWTConfigurationData
    {
        public const string Header = "JWT";

        public string SecurityKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string CookieHeader { get; set; }
    }
}
