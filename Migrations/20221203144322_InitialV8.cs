using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteNough.NET.Migrations
{
    public partial class InitialV8 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_SavedUsers_OwnerId",
                table: "Note");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Note",
                table: "Note");

            migrationBuilder.RenameTable(
                name: "Note",
                newName: "SavedNotes");

            migrationBuilder.RenameIndex(
                name: "IX_Note_OwnerId",
                table: "SavedNotes",
                newName: "IX_SavedNotes_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavedNotes",
                table: "SavedNotes",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedNotes_SavedUsers_OwnerId",
                table: "SavedNotes",
                column: "OwnerId",
                principalTable: "SavedUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedNotes_SavedUsers_OwnerId",
                table: "SavedNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavedNotes",
                table: "SavedNotes");

            migrationBuilder.RenameTable(
                name: "SavedNotes",
                newName: "Note");

            migrationBuilder.RenameIndex(
                name: "IX_SavedNotes_OwnerId",
                table: "Note",
                newName: "IX_Note_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Note",
                table: "Note",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_SavedUsers_OwnerId",
                table: "Note",
                column: "OwnerId",
                principalTable: "SavedUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
