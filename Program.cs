using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection;
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
        public static void Main(string[] args)
        {
            var myAllowSpecificOrigins = "_myAllowSpecificOrigins";
            var builder = WebApplication.CreateBuilder(args);
            var jwtConfigSection = builder.Configuration.GetSection(JwtConfigurationData.Header);
            var jwtConfig = jwtConfigSection.Get<JwtConfigurationData>();

            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: myAllowSpecificOrigins,
                                  policy =>
                                  {
                                      policy.WithOrigins(jwtConfig.Issuer, jwtConfig.Audience)
                                      .AllowAnyMethod()
                                      .AllowAnyHeader()
                                      .AllowCredentials();
                                  });
            });

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
                    ValidIssuer = jwtConfig.Issuer,
                    ValidAudience = jwtConfig.Audience,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtConfig.SecurityKey))
                };
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        context.Token = context.Request.Cookies[jwtConfig.CookieHeader];
                        return Task.CompletedTask;
                    }
                };
            });
            builder.Services.AddAuthorization();
            builder.Services.AddDbContext<AppDbContext>(options => options.UseNpgsql(builder.Configuration.GetConnectionString("Postgres_Db")));
            builder.Services.AddDataProtection()
                .PersistKeysToDbContext<AppDbContext>()
                .SetApplicationName("NoteNough");

            builder.Services.Configure<AppConfigurationData>(
                builder.Configuration.GetSection(AppConfigurationData.Header));
            builder.Services.Configure<JwtConfigurationData>(jwtConfigSection);

            builder.Services.AddControllers();
            builder.Services.AddScoped<JwtService>()
                            .AddScoped<UserValidator>()
                            .AddScoped<NoteValidator>();

            var app = builder.Build();
            app.UseCors(myAllowSpecificOrigins);

            if (app.Environment.IsDevelopment())
            {
                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "clientapp";
                    spa.Options.DevServerPort = 3000;
                    spa.UseReactDevelopmentServer(npmScript: "start");
                });

                app.UseHttpsRedirection();
            }
            else
            {
                app.UseStaticFiles();
                app.MapFallbackToFile("index.html");
            }

            app.UseRouting();
            app.UseCookiePolicy();
            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            FixMigration(app);
            app.Run();
        }

        private static void FixMigration(WebApplication app)
        {
            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                var context = services.GetRequiredService<AppDbContext>();
                if (context.Database.GetPendingMigrations().Any())
                {
                    context.Database.Migrate();
                }
            }
        }
    }
}