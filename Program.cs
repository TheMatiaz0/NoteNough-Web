using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using NoteNough.NET.Data;
using NoteNough.NET.Services;

namespace NoteNough.NET
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: MyAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:8080", "http://localhost", "https://localhost", "https://localhost:8080", "http://localhost:3000", "https://localhost:3000")
                                      .AllowAnyMethod()
                                      .AllowAnyHeader()
                                      .AllowCredentials();
                                  });
            });

            builder.Services.AddAuthorization();

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Microsoft.OpenApi.Models.OpenApiInfo { Title = "NoteNoughAPI", Version = "v1", Description = "NoteNough!" });
            });

            builder.Services.AddControllers();
            builder.Services.AddDbContext<AppDBContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("Postgres_Db")));
            builder.Services.AddScoped<JwtService>();

            var app = builder.Build();
            app.UseCors(MyAllowSpecificOrigins);
            app.MapControllers();

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "NoteNoughAPI V1");
            });
            if (app.Environment.IsDevelopment())
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "clientapp";
                    spa.Options.DevServerPort = 3000;
                    spa.UseReactDevelopmentServer(npmScript: "start");
                });
            }
            else
            {
                app.UseStaticFiles();
                app.MapFallbackToFile("index.html");
            }

            app.UseHttpsRedirection();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<AppDBContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }
            app.Run();
        }
    }
}