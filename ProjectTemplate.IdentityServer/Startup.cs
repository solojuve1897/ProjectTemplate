// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using ProjectTemplate.IdentityServer.Data;
using ProjectTemplate.IdentityServer.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System.Reflection;
using IdentityServer4.EntityFramework.Mappers;
using IdentityServer4.EntityFramework.DbContexts;
using System.Linq;
using System;
using IdentityServer4.EntityFramework.Entities;

namespace ProjectTemplate.IdentityServer
{
    public class Startup
    {
        public IWebHostEnvironment Environment { get; }
        public IConfiguration Configuration { get; }

        public Startup(IWebHostEnvironment environment, IConfiguration configuration)
        {
            Environment = environment;
            Configuration = configuration;
        }

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddControllersWithViews();

            services.AddDatabaseDeveloperPageExceptionFilter();

            services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(Configuration.GetConnectionString("DefaultConnection")));

            services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<ApplicationDbContext>()
                .AddDefaultTokenProviders();

            var migrationsAssembly = typeof(Startup).GetTypeInfo().Assembly.GetName().Name;
            var builder = services.AddIdentityServer(options =>
            {
                options.Events.RaiseErrorEvents = true;
                options.Events.RaiseInformationEvents = true;
                options.Events.RaiseFailureEvents = true;
                options.Events.RaiseSuccessEvents = true;

                // see https://identityserver4.readthedocs.io/en/latest/topics/resources.html
                options.EmitStaticAudienceClaim = true;
            })
                .AddAspNetIdentity<ApplicationUser>()
                .AddConfigurationStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                          sql => sql.MigrationsAssembly(migrationsAssembly));
                })
                .AddOperationalStore(options =>
                {
                    options.ConfigureDbContext = b =>
                        b.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"),
                            sql => sql.MigrationsAssembly(migrationsAssembly));

                    options.EnableTokenCleanup = true;
                    options.TokenCleanupInterval = 30;
                });

            if (Environment.IsProduction())
            {
                try
                {
                    // For production. Read cert from external storage, e.g. Azure Keyvault.

                    // Azure Keyvault code
                    //var secretClient = new SecretClient(new Uri("https://...keyvault.vault.azure.net/"), new DefaultAzureCredential());
                    //var certData = secretClient.GetSecretAsync("identityserver").GetAwaiter().GetResult();
                    //var certificate = new X509Certificate2(Convert.FromBase64String(certData.Value.Value), (string)null, X509KeyStorageFlags.MachineKeySet);

                    //builder.AddSigningCredential(certificate, "RS256");
                }
                catch (Exception)
                {
                    // Todo: return relevant exception
                }
            }
            else
            {
                builder.AddDeveloperSigningCredential();
            }

            services.AddAuthentication();
        }

        public void Configure(IApplicationBuilder app)
        {
            //InitializeDatabase(app);

            if (Environment.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseStaticFiles();

            app.UseRouting();
            app.UseIdentityServer();
            app.UseAuthorization();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapDefaultControllerRoute();
            });
        }

        private void InitializeDatabase(IApplicationBuilder app)
        {
            using (var serviceScope = app.ApplicationServices.GetService<IServiceScopeFactory>().CreateScope())
            {
                var context = serviceScope.ServiceProvider.GetRequiredService<ConfigurationDbContext>();
                
                if (context.Clients.Any())
                {
                    context.Clients.RemoveRange(context.Clients);
                    context.SaveChanges();
                    foreach (var client in Config.Clients)
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }
                else
                {
                    foreach (var client in Config.Clients)
                    {
                        context.Clients.Add(client.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (context.IdentityResources.Any())
                {
                    context.IdentityResources.RemoveRange(context.IdentityResources);
                    context.SaveChanges();
                    foreach (var resource in Config.IdentityResources)
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
                else
                {
                    foreach (var resource in Config.IdentityResources)
                    {
                        context.IdentityResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (context.ApiResources.Any())
                {
                    context.ApiResources.RemoveRange(context.ApiResources);
                    context.SaveChanges();
                    foreach (var resource in Config.ApiResources)
                    {
                        var entity = resource.ToEntity();
                        entity.Scopes.Add(new ApiResourceScope { Scope = entity.Name });
                        context.ApiResources.Add(entity);
                    }
                    context.SaveChanges();
                }
                else
                {
                    foreach (var resource in Config.ApiResources)
                    {
                        context.ApiResources.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }

                if (context.ApiScopes.Any())
                {
                    context.ApiScopes.RemoveRange(context.ApiScopes);
                    context.SaveChanges();
                    foreach (var resource in Config.ApiScopes)
                    {
                        context.ApiScopes.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
                else
                {
                    foreach (var resource in Config.ApiScopes)
                    {
                        context.ApiScopes.Add(resource.ToEntity());
                    }
                    context.SaveChanges();
                }
            }
        }
    }
}