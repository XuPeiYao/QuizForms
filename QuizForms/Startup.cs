using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using QuizForms.Quiz.Models;
using QuizForms.Models;
using QuizForms.Quiz.Factories;
using MySQL.Data.Entity.Extensions;
using QuizForms.Quiz;
using EzCoreKit.AspNetCore;
using EzCoreKit.AspNetCore.Http;

namespace QuizForms {
    public class Startup : StartupRoot{
        public Startup(IHostingEnvironment env) {
            var builder = new ConfigurationBuilder()
                .SetBasePath(env.ContentRootPath)
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddJsonFile($"appsettings.{env.EnvironmentName}.json", optional: true)
                .AddEnvironmentVariables();
            Configuration = builder.Build();

            QuizFactory.ParseIdTypeFunc = (value) => {
                return Guid.Parse(value);
            };
        } 

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services) {
            services.AddScoped<IAuthorizationProvider, AuthSampleProvider>();
            // Adds a default in-memory implementation of IDistributedCache.
            services.AddDistributedMemoryCache();

            //services.AddTransient<AppExceptionFilterAttribute>();

            services.AddSession(options => {
                options.IdleTimeout = TimeSpan.FromMinutes(30);
                options.CookieHttpOnly = true;
            });
            
            services.AddDbContext<QuizDbContext<Guid,Form,Question,Record>>(options => options.UseMySQL(
                Configuration["connectionString"]
            ));
            //services.AddMvc();
            // Add framework services.
            services.AddMvc(options => {
                options.ModelBinderProviders.Insert(0, new AppModelBinderProvider());
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, ILoggerFactory loggerFactory) {
            loggerFactory.AddConsole(Configuration.GetSection("logging"));
            loggerFactory.AddDebug();

            ConfigureDefaultFiles(app);
            ConfigureErrorPages(app, env);

            app.UseStaticFiles(new StaticFileOptions() {
                ServeUnknownFileTypes = true
            });

            app.UseSession();
            app.UseCurrentHttpContext();
            app.UseCors(builder => {
                builder.AllowCredentials();
                builder.AllowAnyHeader();
                builder.AllowAnyMethod();
                builder.AllowAnyOrigin();
            });

            app.UseMvc();
        }
    }
}
