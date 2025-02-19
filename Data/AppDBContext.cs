using Microsoft.AspNetCore.DataProtection.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using NoteNough.NET.Models;

namespace NoteNough.NET.Data
{
    public class AppDbContext : DbContext, IDataProtectionKeyContext
    {
        public DbSet<Note> SavedNotes { get; set; }

        public DbSet<User> SavedUsers { get; set; }

        public DbSet<DataProtectionKey> DataProtectionKeys { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }
    }
}
