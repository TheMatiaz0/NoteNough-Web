namespace NoteNough.NET.Data
{
    public class AppConfigurationData
    {
        public const string Header = "App";

        public int RequiredPasswordLength { get; set; }
        public TimeSpan SessionTimeWithoutCookie { get; set; }
        public TimeSpan SessionTimeWithCookie { get; set; }
        public int NoteTextLength { get; set; }
    }
}