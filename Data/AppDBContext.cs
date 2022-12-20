using Microsoft.EntityFrameworkCore;
using NoteNough.NET.Models;

namespace NoteNough.NET.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<Note> SavedNotes { get; set; }

        public DbSet<User> SavedUsers { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
