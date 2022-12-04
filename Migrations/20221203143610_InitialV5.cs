using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NoteNough.NET.Migrations
{
    public partial class InitialV5 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedNotes_SavedUsers_OwnerId",
                table: "SavedNotes");

            migrationBuilder.DropIndex(
                name: "IX_SavedNotes_OwnerId",
                table: "SavedNotes");

            migrationBuilder.DropColumn(
                name: "OwnerId",
                table: "SavedNotes");

            migrationBuilder.AddColumn<int>(
                name: "UserId",
                table: "SavedNotes",
                type: "integer",
                nullable: true);

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

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SavedNotes_SavedUsers_UserId",
                table: "SavedNotes");

            migrationBuilder.DropIndex(
                name: "IX_SavedNotes_UserId",
                table: "SavedNotes");

            migrationBuilder.DropColumn(
                name: "UserId",
                table: "SavedNotes");

            migrationBuilder.AddColumn<int>(
                name: "OwnerId",
                table: "SavedNotes",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_SavedNotes_OwnerId",
                table: "SavedNotes",
                column: "OwnerId");

            migrationBuilder.AddForeignKey(
                name: "FK_SavedNotes_SavedUsers_OwnerId",
                table: "SavedNotes",
                column: "OwnerId",
                principalTable: "SavedUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
