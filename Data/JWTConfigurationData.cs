namespace NoteNough.NET.Data
{
    public class JwtConfigurationData
    {
        public const string Header = "JWT";

        public string SecurityKey { get; set; }
        public string Issuer { get; set; }
        public string Audience { get; set; }
        public string CookieHeader { get; set; }
        public TimeSpan ExpirationTime { get; set; }
    }
}
