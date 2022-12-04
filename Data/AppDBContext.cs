using Microsoft.EntityFrameworkCore;
using NoteNough.NET.Models;

namespace NoteNough.NET.Data
{
    public class AppDBContext : DbContext
    {
        public DbSet<Note> SavedNotes { get; set; }

        public DbSet<User> SavedUsers { get; set; }

        public AppDBContext(DbContextOptions<AppDBContext> options) : base(options)
        {
        }
    }
}
