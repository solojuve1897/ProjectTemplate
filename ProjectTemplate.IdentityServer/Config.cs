// Copyright (c) Brock Allen & Dominick Baier. All rights reserved.
// Licensed under the Apache License, Version 2.0. See LICENSE in the project root for license information.


using IdentityServer4.Models;
using System.Collections.Generic;

namespace ProjectTemplate.IdentityServer
{
    public static class Config
    {
        public static IEnumerable<IdentityResource> IdentityResources =>
                   new IdentityResource[]
                   {
                        new IdentityResources.OpenId(),
                        new IdentityResources.Profile(),
                        new IdentityResources.Email(),
                        new IdentityResource
                        {
                          Name = "extra",
                          UserClaims = new List<string> {"role", "location"}
                        }
                   };

        public static IEnumerable<ApiResource> ApiResources =>
            new ApiResource[]
            {
                new ApiResource("webapi", "ProjectTemplate.WebAPI")
                {
                    Scopes = new List<string> {"webapi.read", "webapi.write"},
                },
            };

        public static IEnumerable<ApiScope> ApiScopes =>
            new ApiScope[]
            {
                new ApiScope("webapi.read", "ProjectTemplate.WebAPI Read"),
                new ApiScope("webapi.write", "ProjectTemplate.WebAPI Write"),
            };

        public static IEnumerable<Client> Clients =>
            new Client[]
            {
                new Client
                {
                    // unique ID for this client
                    ClientId = "webapp", 
                    // human-friendly name displayed in IS
                    ClientName = "ProjectTemplate.WebApp", 
                    // URL of client
                    ClientUri = "http://localhost:3000", 
                    // how client will interact with our identity server (Implicit is basic flow for web apps)
                    AllowedGrantTypes = GrantTypes.Implicit,
                    // can redirect here after login     
                    RedirectUris = { "http://localhost:3000/signin-oidc" },
                    // can redirect here after logout
                    PostLogoutRedirectUris = { "http://localhost:3000/signout-oidc" },
                    // builds CORS policy for javascript clients
                    AllowedCorsOrigins = { "http://localhost:3000" }, 
                    // what resources this client can access
                    AllowedScopes = { "openid", "profile", "email", "extra", "webapi.read", "webapi.write" }, 
                    // client is allowed to receive tokens via browser
                    AllowAccessTokensViaBrowser = true
                },
            };
    }
}