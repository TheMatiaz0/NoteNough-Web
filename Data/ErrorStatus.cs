namespace NoteNough.NET.Data
{
    public class ErrorStatus
    {
        public const string CredentialsError = "Incorrect password.";
        public const string UserDoesNotExistError = "User does not exist.";
        public const string UserAlreadyExistsError = "Email is already in use.";
        public const string NoteDoesNotExistError = "Note does not exist.";
    }
}