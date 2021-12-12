using System;
using Ctrip.API.Database;
using Ctrip.API.Models;
using Ctrip.API.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Serialization;
using Npgsql;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using System.Linq;
using Microsoft.AspNetCore.Mvc.Formatters;


namespace Ctrip.API
{
    public class Startup
    {
        private IConfiguration Configuration { get; }

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        // This method gets called by the runtime. Use this method to add services to the container.
        // For more information on how to configure your application, visit https://go.microsoft.com/fwlink/?LinkID=398940
        public void ConfigureServices(IServiceCollection services)
        {

            services.AddCors(setupAction =>
            {
                // 指定跨域请求域名
                setupAction.AddDefaultPolicy(builder =>
                {
                    builder
                        .WithOrigins("http://localhost:3000")
                        .AllowAnyHeader();
                });
            });
            services.AddControllers(setupAction =>
            {
                setupAction.ReturnHttpNotAcceptable = true;
            })
            .AddNewtonsoftJson(setupAction =>
            {
                // 设置返回的json key格式为小写字符加下划线，需要安装Microsoft.AspNetCore.Mvc.NewtonsoftJson
                setupAction.SerializerSettings.ContractResolver =
                new DefaultContractResolver
                {
                    NamingStrategy = new SnakeCaseNamingStrategy(
                        processDictionaryKeys: true, // 同样处理字典对象的字段
                        overrideSpecifiedNames: false // 如果object的属性上有JsonPropertyAttribute，就采用属性的字段名
                    )
                };
                setupAction.SerializerSettings.DateFormatString = "yyyy-MM-dd HH:mm:ss";
            })
            .ConfigureApiBehaviorOptions(setupAction =>
            {
                setupAction.InvalidModelStateResponseFactory = context =>
                {
                    var problemDetail = new ValidationProblemDetails(context.ModelState)
                    {
                        Type = "校验",
                        Title = "数据验证失败",
                        Status = StatusCodes.Status422UnprocessableEntity,
                        Detail = " 请看详细说明",
                        Instance = context.HttpContext.Request.Path
                    };
                    problemDetail.Extensions.Add("traceId", context.HttpContext.TraceIdentifier);
                    return new UnprocessableEntityObjectResult(problemDetail)
                    {
                        ContentTypes = { "application/problem+json" }
                    };
                };
            });

            // 添加认证服务
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                var secretByte = Encoding.UTF8.GetBytes(Configuration["Authentication:SecretKey"]);
                options.TokenValidationParameters = new TokenValidationParameters()
                {
                    ValidateIssuer = true,
                    ValidIssuer = Configuration["Authentication:Issuer"],

                    ValidateAudience = true,
                    ValidAudience = Configuration["Authentication:Audience"],

                    ValidateLifetime = true,
                    IssuerSigningKey = new SymmetricSecurityKey(secretByte)
                };
            });

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>();
            services.AddTransient<ITouristRouteRepository, TouristRouteRepository>();

            var builder = new NpgsqlConnectionStringBuilder();
            builder.ConnectionString = Configuration["DbContext:ConnectionString"];
            // builder.UserID = Configuration["UserID"];
            // builder.Password = Configuration["Password"];
            // builder.DataSource = Configuration["DataSource"];
            services.AddDbContext<AppDbContext>(options =>
            {
                // options.UseSqlServer(builder.ConnectionString);
                options.UseNpgsql(builder.ConnectionString)
                    .UseSnakeCaseNamingConvention();
            });

            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            // 导航上下文必须为单例模式
            services.AddSingleton<IActionContextAccessor, ActionContextAccessor>();
            services.AddTransient<IPropertyMappingService, PropertyMappingService>();

            // 添加自定义媒体类型
            services.Configure<MvcOptions>(config =>
            {
                var outputFormatter = config.OutputFormatters
                    .OfType<NewtonsoftJsonOutputFormatter>()?.FirstOrDefault();
                if (outputFormatter != null)
                {
                    outputFormatter.SupportedMediaTypes.Add("application/vnd.ctrip.hateoas+json");
                }
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            // 你在哪里
            app.UseRouting();
            // 你是谁
            app.UseAuthentication();
            // 你可以干啥(有啥权限)
            app.UseAuthorization();

            app.UseCors();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}