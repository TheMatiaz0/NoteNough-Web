using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteNough.NET.Migrations
{
    public partial class InitialV7 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedNotes_SavedUsers_UserId",
                table: "SavedNotes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SavedNotes",
                table: "SavedNotes");

            migrationBuilder.DropIndex(
                name: "IX_SavedNotes_UserId",
                table: "SavedNotes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SavedNotes");

            migrationBuilder.RenameTable(
                name: "SavedNotes",
                newName: "Note");

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "Note",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_Note",
                table: "Note",
                column: "Key");

            migrationBuilder.CreateIndex(
                name: "IX_Note_OwnerId",
                table: "Note",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_Note_SavedUsers_OwnerId",
                table: "Note",
                column: "OwnerId",
                principalTable: "SavedUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Note_SavedUsers_OwnerId",
                table: "Note");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Note",
                table: "Note");

            migrationBuilder.DropIndex(
                name: "IX_Note_OwnerId",
                table: "Note");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "Note");

            migrationBuilder.RenameTable(
                name: "Note",
                newName: "SavedNotes");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "SavedNotes",
                type: "integer",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_SavedNotes",
                table: "SavedNotes",
                column: "Key");

            migrationBuilder.CreateIndex(
                name: "IX_SavedNotes_UserId",
                table: "SavedNotes",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedNotes_SavedUsers_UserId",
                table: "SavedNotes",
                column: "UserId",
                principalTable: "SavedUsers",
                principalColumn: "Id");
        }
    }
}
