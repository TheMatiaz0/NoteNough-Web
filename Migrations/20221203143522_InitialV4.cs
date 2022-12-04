using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteNough.NET.Migrations
{
    public partial class InitialV4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notes_Users_OwnerId",
                table: "Notes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Notes",
                table: "Notes");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "SavedUsers");

            migrationBuilder.RenameTable(
                name: "Notes",
                newName: "SavedNotes");

            migrationBuilder.RenameIndex(
                name: "IX_Users_Email",
                table: "SavedUsers",
                newName: "IX_SavedUsers_Email");

            migrationBuilder.RenameIndex(
                name: "IX_Notes_OwnerId",
                table: "SavedNotes",
                newName: "IX_SavedNotes_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavedUsers",
                table: "SavedUsers",
                column: "Id");

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
                name: "PK_SavedUsers",
                table: "SavedUsers");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavedNotes",
                table: "SavedNotes");

            migrationBuilder.RenameTable(
                name: "SavedUsers",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "SavedNotes",
                newName: "Notes");

            migrationBuilder.RenameIndex(
                name: "IX_SavedUsers_Email",
                table: "Users",
                newName: "IX_Users_Email");

            migrationBuilder.RenameIndex(
                name: "IX_SavedNotes_OwnerId",
                table: "Notes",
                newName: "IX_Notes_OwnerId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "Id");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Notes",
                table: "Notes",
                column: "Key");

            migrationBuilder.AddForeignKey(
                name: "FK_Notes_Users_OwnerId",
                table: "Notes",
                column: "OwnerId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
