using System.Net;
using System.Net.Http;
using System.Reflection;
using System.Text;
using AutoMapper;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.DependencyInjection.Extensions;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using MyGroupAPI.Data;
using MyGroupAPI.Helpers;
using MyGroupAPI.Models;
using Stripe;

namespace MyGroupAPI {
    public class Startup {
        public Startup (IConfiguration configuration) {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices (IServiceCollection services) {
            services.AddControllers ().AddNewtonsoftJson (x => x.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

            services.AddDbContext<DataContext> (x => x.UseSqlite (Configuration.GetConnectionString ("DefaultConnection")));
            services.AddScoped<IAuthRepository, AuthRepository> ();

            services.AddAutoMapper (typeof (GroupRepository).Assembly);
            IdentityBuilder builder = services.AddIdentityCore<User> (opt => {
                opt.Password.RequireDigit = false;
                opt.Password.RequiredLength = 4;
                opt.Password.RequireLowercase = false;
                opt.Password.RequireNonAlphanumeric = false;
                opt.Password.RequireUppercase = false;
            });
            builder = new IdentityBuilder (builder.UserType, typeof (Role), builder.Services);
            builder.AddEntityFrameworkStores<DataContext> ();
            builder.AddRoleValidator<RoleValidator<Role>> ();
            builder.AddRoleManager<RoleManager<Role>> ();
            builder.AddSignInManager<SignInManager<User>> ();




            services.AddAuthentication (JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer (Options => {
                    Options.TokenValidationParameters = new TokenValidationParameters {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey (Encoding.ASCII.GetBytes (Configuration.GetSection ("AppSettings:Token").Value)),
                    ValidateAudience = false,
                    ValidateIssuer = false
                    };
                });

            services.TryAddSingleton<ISystemClock, SystemClock> ();
            services.AddCors ();
            services.AddScoped<IGroupRepository, GroupRepository> ();
            services.Configure<CloudinarySettings> (Configuration.GetSection ("CloudinarySettings"));
            services.AddScoped<LogUserActivity> ();
            services.AddSignalR ();
            services.Configure<StripeSettings> (Configuration.GetSection ("Stripe:Secretkey"));

            services.AddAuthorization(
                options=>{
                    options.AddPolicy("RequireAdminRole",policy=>policy.RequireRole("Admin"));
                    options.AddPolicy("ModeratorPhotoRole",policy=>policy.RequireRole("Admin","Moderator"));
                    options.AddPolicy("VipOnly",policy=>policy.RequireRole("VIP"));
                }
            );

            services.AddMvc(options=>{
                var policy = new AuthorizationPolicyBuilder()
                            .RequireAuthenticatedUser()
                            .Build();
                options.Filters.Add(new AuthorizeFilter(policy));
            }).SetCompatibilityVersion(CompatibilityVersion.Version_3_0);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure (IApplicationBuilder app, IWebHostEnvironment env) {

            StripeConfiguration.SetApiKey (Configuration.GetSection ("Stripe:SecretKey").Value);

            if (env.IsDevelopment ()) {
                app.UseDeveloperExceptionPage ();
            } else {
                app.UseExceptionHandler (BuilderExtensions => {
                    // builderEctensions  تعامل مع الخطأ داخل ال pipe line
                    BuilderExtensions.Run (async context => {
                        // HttpStstusCode يحمل كل ارقام الاخطاء -- InternalServerError يبني ال Error
                        context.Response.StatusCode = (int) HttpStatusCode.InternalServerError;
                        // features عبارة عن مجموعة من الاماكن يمدنا بها السيرفير نخده بال get
                        var error = context.Features.Get<IExceptionHandlerFeature> ();
                        // لو ظهر خطأ
                        if (error != null) {
                            // اضافة الدالة المضافة في ال Helpers للسماح لاي Origin بالدخول بعدم ظهور خطا ال cors
                            context.Response.AddApplicationError (error.Error.Message);
                            // يطلع الخطا في رساله لا تخرج الا علي شكل رقم ويظهر الرسالة الخاصة بالرقم
                            await context.Response.WriteAsync (error.Error.Message);
                        }
                    });
                });
            }

            //app.UseHttpsRedirection();

            app.UseRouting ();
            app.UseCors (x => x.SetIsOriginAllowed (options => _ = true).AllowAnyMethod ().AllowAnyHeader ().AllowCredentials ());

            app.UseAuthentication ();

            app.UseAuthorization ();

            app.UseEndpoints (endpoints => {
                endpoints.MapControllers ();

                endpoints.MapHub<ChatHub> ("/chat");

            });

        }
    }
}