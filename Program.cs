using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using NoteNough.NET.Data;
using NoteNough.NET.Services;
using System.Text;

namespace NoteNough.NET
{
    public class Program
    {
        public const string JWTCookieKey = "Authorization";
        public const string JWTSecurityKey = "This is a very secure and I tell you... very secure key to be honest!";
        public const string JWTAudience = "localhost:8080";
        public const string JWTIssuer = "http://localhost:8080";

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

            builder.Services.AddRouting();
            builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                options.SaveToken = true;
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = JWTIssuer,
                    ValidAudience = JWTAudience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(JWTSecurityKey))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies[JWTCookieKey];
                        return Task.CompletedTask;
                    }
                };
            });
            builder.Services.AddAuthorization();
            builder.Services.AddControllers();

            builder.Services.AddDbContext<AppDBContext>(opt => opt.UseNpgsql(builder.Configuration.GetConnectionString("Postgres_Db")));
            builder.Services.AddScoped<JwtService>();

            var app = builder.Build();
            app.UseCors(MyAllowSpecificOrigins);

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

            app.UseRouting();
            app.UseHttpsRedirection();
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(app =>
            {
                app.MapControllers();
            });

            // FixMigration();
            app.Run();
        }

        private static void FixMigration(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<AppDBContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}