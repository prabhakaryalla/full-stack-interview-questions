<details> <summary><mark>📌Authentication, Authorization & Policies</mark></summary>

<details><summary><b>How does policy-based authorization work internally in ASP.NET Core?</b></summary>
In ASP.NET Core, policy-based authorization works by defining authorization policies that consist of one or more requirements. When a user attempts to access a protected resource, the authorization system evaluates these policies by invoking registered authorization handlers for each requirement. Handlers inspect the user's claims and context to determine if the requirements are met. If all requirements succeed, access is granted; otherwise, it is denied. This process is integrated into the middleware pipeline and can be applied declaratively via attributes or programmatically.
<details><summary><em>Example</em></summary>
<b>Scenario:</b>  
You want to understand how a simple policy with a claim requirement is evaluated internally.

<b>Step 1: Define a Policy with a Claim Requirement</b>

``` csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("EmployeeOnly", policy =>
        policy.RequireClaim("IsEmployee", "true"));
});
```

<b>Step 2: Protect a Controller or Action with the Policy</b>

``` csharp
[Authorize(Policy = "EmployeeOnly")]
public class EmployeeController : ControllerBase
{
    public IActionResult Get()
    {
        return Ok("Access granted to employee.");
    }
}
```

<b>Step 3: Internal Authorization Flow (Conceptual Code)</b>

``` csharp
public async Task<bool> AuthorizeUserAsync(ClaimsPrincipal user, string policyName)
{
    // 1. Retrieve the policy by name
    var policy = await _authorizationPolicyProvider.GetPolicyAsync(policyName);

    // 2. Create an AuthorizationHandlerContext with the user and policy requirements
    var context = new AuthorizationHandlerContext(policy.Requirements, user, resource: null);

    // 3. Invoke all registered handlers for the requirements
    foreach (var handler in _authorizationHandlers)
    {
        await handler.HandleAsync(context);
    }

    // 4. Check if all requirements succeeded
    return context.HasSucceeded;
}
```

<b>How it works internally:</b>  
The system fetches the policy by name.  
It creates a context containing the user and the policy's requirements.  
All registered handlers that can handle the requirements are invoked.  
Handlers check claims or other conditions and call context.Succeed(requirement) if passed.  
After all handlers run, if all requirements are satisfied, access is granted.  
</details>
<hr/>
</details>

<details><summary><b>How do you create custom authorization requirements and handlers in policy-based authorization?</b></summary>
In policy-based authorization, custom authorization requirements and handlers allow you to implement complex or specific authorization logic beyond simple claim checks. A custom requirement is a class that represents a specific condition to be met, and a handler contains the logic to evaluate whether the requirement is satisfied for a given user. You register these with the authorization system and use them in policies to enforce custom rules.
<details><summary><em>Example:</em></summary>
<b>Scenario:</b>  
Create a custom requirement that checks if a user has been employed for more than a certain number of years.

<b>Step 1: Define the Custom Requirement</b>

``` csharp
using Microsoft.AspNetCore.Authorization;

public class MinimumEmploymentDurationRequirement : IAuthorizationRequirement
{
    public int MinimumYears { get; }

    public MinimumEmploymentDurationRequirement(int minimumYears)
    {
        MinimumYears = minimumYears;
    }
}
```  
<b>Step 2: Implement the Authorization Handler</b>

``` csharp
using System;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;

public class MinimumEmploymentDurationHandler : AuthorizationHandler<MinimumEmploymentDurationRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, MinimumEmploymentDurationRequirement requirement)
    {
        var employmentDateClaim = context.User.FindFirst("EmploymentDate");
        if (employmentDateClaim != null && DateTime.TryParse(employmentDateClaim.Value, out var employmentDate))
        {
            var yearsEmployed = DateTime.Now.Year - employmentDate.Year;
            if (yearsEmployed >= requirement.MinimumYears)
            {
                context.Succeed(requirement);
            }
        }

        return Task.CompletedTask;
    }
}
```

<b>Step 3: Register the Requirement and Handler in Startup.cs</b>

``` csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthorization(options =>
    {
        options.AddPolicy("MinimumEmploymentDuration", policy =>
            policy.Requirements.Add(new MinimumEmploymentDurationRequirement(3)));
    });

    services.AddSingleton<IAuthorizationHandler, MinimumEmploymentDurationHandler>();

    services.AddControllers();
}
```

<b>Step 4: Apply the Policy to a Controller or Action </b>

``` csharp
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize(Policy = "MinimumEmploymentDuration")]
[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Access granted based on employment duration.");
    }
}
```
<b>How it works:</b>  
The custom requirement specifies a minimum number of years employed.
The handler checks the user's EmploymentDate claim and calculates years employed.  
If the user meets the requirement, the handler calls context.Succeed.
The policy uses this requirement to authorize access.  
</details>
<hr/>
</details>
<details>
<summary><b>Can you explain how multiple authorization policies can be combined or chained in ASP.NET Core?</b></summary><pre><b>
Approach                                 Logic Type      Description</b>
<hr />
Single policy with multiple requirements    AND             All requirements must succeed
Multiple [Authorize] attributes             OR              Any policy success grants access
Custom requirement & handler                AND/OR          Custom complex logic
Programmatic checks                         AND/OR          Fine-grained control in code
</pre><hr/></details>
<details>
<summary><b>How do you pass parameters to authorization policies dynamically at runtime?</b></summary>
To pass parameters dynamically to authorization policies at runtime, define the policy to accept parameters and provide those parameters when invoking the authorization check, typically by passing them through a custom requirement or resource context evaluated by the policy handler.
<details>
<summary><em>Example: Dynamic Minimum Age Policy</em></summary>
<b>Step 1: Define a requirement class with a parameter</b>

``` csharp
public class MinimumAgeRequirement : IAuthorizationRequirement
{
    public int MinimumAge { get; }
    public MinimumAgeRequirement(int minimumAge)
    {
        MinimumAge = minimumAge;
    }
}
```
<b>Step 2: Create a handler that checks the requirement</b>

``` csharp
public class MinimumAgeHandler : AuthorizationHandler<MinimumAgeRequirement>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   MinimumAgeRequirement requirement)
    {
        if (!context.User.HasClaim(c => c.Type == ClaimTypes.DateOfBirth))
            return Task.CompletedTask;

        var dob = Convert.ToDateTime(context.User.FindFirst(c => c.Type == ClaimTypes.DateOfBirth).Value);
        int age = DateTime.Today.Year - dob.Year;

        if (age >= requirement.MinimumAge)
            context.Succeed(requirement);

        return Task.CompletedTask;
    }
}
```
<b>Step 3: Register the handler </b>

``` csharp
services.AddSingleton<IAuthorizationHandler, MinimumAgeHandler>();

```
<b>Step 4: Use resource-based authorization to pass the parameter dynamically</b>
``` csharp
var requirement = new MinimumAgeRequirement(18); // dynamic parameter
var authorizationResult = await authorizationService.AuthorizeAsync(user, resource: null, requirement);
```
</details>
<hr/>
</details>

<details>
<summary><b>What is the difference between resource-based authorization and policy-based authorization?</b></summary>
<b>Policy-based authorization</b> uses predefined policies with fixed requirements configured in advance and applied globally or by name.  </br>
<b>Resource-based authorization</b> evaluates permissions dynamically based on the specific resource being accessed, allowing parameters and context to influence the decision at runtime.

<details>
<summary><em>Example with Steps:</em></summary>
<b>Policy-Based Authorization

Step 1: Define a policy in startup
``` csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("AdminOnly", policy => policy.RequireRole("Admin"));
});
```

Step 2: Apply policy to controller or action
``` csharp
[Authorize(Policy = "AdminOnly")]
public IActionResult AdminDashboard()
{
    return View();
}
```

Resource-Based Authorization

Step 1: Define a requirement
``` csharp
public class DocumentOwnerRequirement : IAuthorizationRequirement { }
```
Step 2: Create a handler that checks if user owns the resource
``` csharp
public class DocumentOwnerHandler : AuthorizationHandler<DocumentOwnerRequirement, Document>
{
    protected override Task HandleRequirementAsync(AuthorizationHandlerContext context,
                                                   DocumentOwnerRequirement requirement,
                                                   Document resource)
    {
        if (resource.OwnerId == context.User.FindFirst(ClaimTypes.NameIdentifier)?.Value)
        {
            context.Succeed(requirement);
        }
        return Task.CompletedTask;
    }
}
```
Step 3: Register the handler
``` csharp
services.AddSingleton<IAuthorizationHandler, DocumentOwnerHandler>();
```
Step 4: Use resource-based authorization in code
```csharp
var document = GetDocument(id);
var authorizationResult = await authorizationService.AuthorizeAsync(user, document, new DocumentOwnerRequirement());

if (authorizationResult.Succeeded)
{
    // Allow access
}
else
{
    // Deny access
}
```
</b>
</details>
<hr/>
</details>
<details>
<summary><b>How can you use claims transformation in conjunction with policy-based authorization?</b></summary>
Claims transformation is a process where you modify or add claims to a user's identity after they have been authenticated but before authorization decisions are made. When used with policy-based authorization, claims transformation allows you to enrich the user's claims with additional information or roles that policies can then evaluate to grant or deny access. This combination provides a flexible and dynamic way to control access based on customized claims.

<details>
<summary><em>Example: Adding a Custom Claim "IsEmployee" and Using Policy-Based Authorization</em></summary>
<b>Step 1: Implement Claims Transformation</b><br/>
Create a class that implements IClaimsTransformation to add the custom claim based on some logic (e.g., department check).

``` csharp
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;

public class CustomClaimsTransformation : IClaimsTransformation
{
    public Task<ClaimsPrincipal> TransformAsync(ClaimsPrincipal principal)
    {
        var identity = (ClaimsIdentity)principal.Identity;

        // Example condition: if user belongs to "HR" department, add IsEmployee claim
        var departmentClaim = identity.FindFirst("Department");
        if (departmentClaim != null && departmentClaim.Value == "HR")
        {
            if (!identity.HasClaim(c => c.Type == "IsEmployee"))
            {
                identity.AddClaim(new Claim("IsEmployee", "true"));
            }
        }

        return Task.FromResult(principal);
    }
}
```
<b>Step 2: Register Claims Transformation in Startup.cs </b>

``` csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication(/* your auth config */);
    services.AddAuthorization(options =>
    {
        options.AddPolicy("EmployeeOnly", policy =>
            policy.RequireClaim("IsEmployee", "true"));
    });

    // Register the claims transformation service
    services.AddTransient<IClaimsTransformation, CustomClaimsTransformation>();

    services.AddControllersWithViews();
}
```

<b>Step 3: Protect a Controller or Action with the Policy</b>

```csharp 
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Authorize(Policy = "EmployeeOnly")]
public class EmployeeController : Controller
{
    public IActionResult Index()
    {
        return Content("Welcome, Employee!");
    }
}
```

<b>How it works:</b>

When a user logs in, their claims are loaded (including a "Department" claim).
The CustomClaimsTransformation checks if the user is in the "HR" department.
If yes, it adds the IsEmployee claim.
The authorization policy "EmployeeOnly" requires the IsEmployee claim.
Only users with that claim can access the EmployeeController.
</details>
<hr />
</details>


<details><summary><b>How do you test policy-based authorization logic effectively in unit and integration tests?</b></summary>
To test policy-based authorization effectively, you should isolate and verify the authorization logic in unit tests by mocking user claims and evaluating policies directly. For integration tests, simulate real authentication flows and apply policies to protected resources to ensure end-to-end behavior. Use test users with different claims to cover various authorization scenarios, and verify both allowed and denied access cases.
<details><summary><em>Simple Example with Steps:</em></summary>
<b>Scenario:</b>
You want to unit test a policy that requires the claim IsEmployee = true.

<b>Step 1: Define the Authorization Policy (for context)</b>

```csharp
services.AddAuthorization(options =>
{
    options.AddPolicy("EmployeeOnly", policy =>
        policy.RequireClaim("IsEmployee", "true"));
});
```

<b>Step 2: Unit Test the Policy Logic</b>

``` csharp
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Policy;
using Microsoft.Extensions.DependencyInjection;
using System.Threading.Tasks;
using Xunit;

public class AuthorizationPolicyTests
{
    private AuthorizationService BuildAuthorizationService()
    {
        var services = new ServiceCollection();
        services.AddLogging();
        services.AddAuthorization(options =>
        {
            options.AddPolicy("EmployeeOnly", policy =>
                policy.RequireClaim("IsEmployee", "true"));
        });
        return services.BuildServiceProvider().GetRequiredService<IAuthorizationService>() as AuthorizationService;
    }

    [Fact]
    public async Task EmployeeOnlyPolicy_AllowsUserWithIsEmployeeClaim()
    {
        var authorizationService = BuildAuthorizationService();

        var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
            new Claim("IsEmployee", "true")
        }, "TestAuth"));

        var result = await authorizationService.AuthorizeAsync(user, null, "EmployeeOnly");

        Assert.True(result.Succeeded);
    }

    [Fact]
    public async Task EmployeeOnlyPolicy_DeniesUserWithoutIsEmployeeClaim()
    {
        var authorizationService = BuildAuthorizationService();

        var user = new ClaimsPrincipal(new ClaimsIdentity(new[]
        {
            new Claim("IsEmployee", "false")
        }, "TestAuth"));

        var result = await authorizationService.AuthorizeAsync(user, null, "EmployeeOnly");

        Assert.False(result.Succeeded);
    }
}
```

<b>How it works:</b><br/>

The test builds an authorization service with the policy.<br/>
It creates test users with or without the required claim.<br/>
It calls AuthorizeAsync to check if the user meets the policy.<br/>
It asserts the expected outcome (allowed or denied).<br/>
</details>
<hr/>
</details>

<details><summary><b>How do you handle authorization failures and customize the response in ASP.NET Core?</b></summary>
In ASP.NET Core, authorization failures can be handled and customized by configuring the authorization middleware and using custom handlers or events. You can customize the response by intercepting the authorization failure event and returning a tailored HTTP status code, message, or redirect. This improves user experience by providing clear feedback or redirecting users to appropriate pages when access is denied.
<details><summary><em>Simple Example with Steps:</em></summary>
<b>Scenario:</b>
Customize the response to return a JSON message with a 403 status code when authorization fails.

<b>Step 1: Configure Authorization and Authentication in Startup.cs</b>

``` csharp
public void ConfigureServices(IServiceCollection services)
{
    services.AddAuthentication("Bearer")
        .AddJwtBearer("Bearer", options =>
        {
            // JWT configuration here
        });

    services.AddAuthorization(options =>
    {
        options.AddPolicy("EmployeeOnly", policy =>
            policy.RequireClaim("IsEmployee", "true"));
    });

    services.AddControllers();

    // Customize the authorization failure response
    services.Configure<AuthorizationOptions>(options =>
    {
        // No direct failure response here, handled in middleware below
    });
}
```

<b>Step 2: Customize Authorization Failure Response in Middleware</b><br/>
In Startup.cs or Program.cs (depending on ASP.NET Core version), add middleware to handle authorization failures:

``` csharp
public void Configure(IApplicationBuilder app)
{
    app.UseRouting();

    app.UseAuthentication();
    app.UseAuthorization();

    app.UseStatusCodePages(async context =>
    {
        var response = context.HttpContext.Response;

        if (response.StatusCode == 403) // Forbidden
        {
            response.ContentType = "application/json";
            await response.WriteAsync("{\"error\":\"Access denied. You do not have permission to access this resource.\"}");
        }
    });

    app.UseEndpoints(endpoints =>
    {
        endpoints.MapControllers();
    });
}
```

<b>Step 3: Protect Controller or Action with Policy</b>

``` csharp
[Authorize(Policy = "EmployeeOnly")]
[ApiController]
[Route("[controller]")]
public class EmployeeController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        return Ok("Welcome, Employee!");
    }
}
```

<b>How it works:</b>  
When a user fails authorization (e.g., missing IsEmployee claim), the response status is set to 403.  
The UseStatusCodePages middleware intercepts the 403 response.  
It returns a custom JSON message instead of the default response.  
This approach can be extended to handle other status codes or redirect users.  

</details>
<hr/>
</details>

<hr/>
</details>


<details><summary><mark>📌Dependency Injection</mark></summary>

<details><summary><b>What are the differences between Singleton, Scoped, and Transient lifetimes in Dependency Injection?</b></summary>
**Singleton**: A single instance is created and shared throughout the application's lifetime. All requests get the same instance.  
**Scoped**: A new instance is created per scope, typically per web request in ASP.NET Core. All services within the same scope share the instance.  
**Transient**: A new instance is created every time the service is requested. No sharing occurs.
<details><summary><em>Example</em></summary>

**Scenario**: Logging service with different lifetimes to demonstrate behavior in a web request.

1. Define a logging service interface and implementation

``` csharp
public interface IOperationLogger
{
    Guid OperationId { get; }
}

public class OperationLogger : IOperationLogger
{
    public Guid OperationId { get; }

    public OperationLogger()
    {
        OperationId = Guid.NewGuid();
    }
}
```

2. Register services with different lifetimes in Program.cs (ASP.NET Core 6+)
``` csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IOperationLogger, OperationLogger>(); // Singleton
builder.Services.AddScoped<IOperationLogger, OperationLogger>();    // Scoped
builder.Services.AddTransient<IOperationLogger, OperationLogger>(); // Transient

builder.Services.AddControllers();

var app = builder.Build();

app.MapControllers();

app.Run();
```
Note: For demonstration, register each lifetime with a different interface or use named registrations in a real project. Here, assume you comment/uncomment one registration at a time.

3. Create a controller to inject and display the operation IDs

```csharp
[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly IOperationLogger _logger1;
    private readonly IOperationLogger _logger2;

    public TestController(IOperationLogger logger1, IOperationLogger logger2)
    {
        _logger1 = logger1;
        _logger2 = logger2;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok(new
        {
            Logger1 = _logger1.OperationId,
            Logger2 = _logger2.OperationId
        });
    }
}
```

***Explanation***

**Singleton**: Both Logger1 and Logger2 will have the same OperationId across all requests.
**Scoped**: Both will have the same OperationId within a single request, but different requests get different IDs.
**Transient**: Each will have a different OperationId even within the same request because new instances are created every time.
</details>
<hr/>
</details>

<details><summary><b>Examples of DI lifetime?</b></summary>
Certainly! Here is one clear example for each DI lifetime (Singleton, Scoped, Transient) with explanation and code snippets:

1. Singleton Example: Configuration Service

Use case: Application-wide configuration data that rarely changes.  
Behavior: One instance shared across the entire application lifetime.  

``` csharp
public interface IAppConfig
{
    string GetSetting(string key);
}

public class AppConfig : IAppConfig
{
    private readonly Dictionary<string, string> _settings;

    public AppConfig()
    {
        // Load settings once
        _settings = new Dictionary<string, string>
        {
            { "AppName", "MyApp" },
            { "Version", "1.0" }
        };
    }

    public string GetSetting(string key) => _settings.TryGetValue(key, out var value) ? value : null;
}

// Registration
services.AddSingleton<IAppConfig, AppConfig>();
```

2. Scoped Example: Entity Framework Core DbContext

Use case: Database context that should be unique per web request.  
Behavior: One instance per HTTP request scope.  

``` csharp
public class AppDbContext : DbContext
{
    public DbSet<User> Users { get; set; }
}

// Registration in ASP.NET Core
services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer("YourConnectionString")); // DbContext is Scoped by default
```

3. Transient Example: Email Sending Service

Use case: Stateless service to send emails; new instance per use.  
Behavior: New instance created every time requested.  

``` csharp
public interface IEmailSender
{
    Task SendEmailAsync(string to, string subject, string body);
}

public class EmailSender : IEmailSender
{
    public Task SendEmailAsync(string to, string subject, string body)
    {
        // Send email logic here
        return Task.CompletedTask;
    }
}

// Registration
services.AddTransient<IEmailSender, EmailSender>();
```
</details>
<details><summary><b>How does the DI container manage object disposal for different lifetimes?</b></summary>
The Dependency Injection (DI) container in .NET manages the disposal of services that implement IDisposable based on their lifetimes:

**Singleton**: Disposed when the container itself is disposed, typically at application shutdown.  
**Scoped**: Disposed at the end of the scope, such as the end of an HTTP request in web applications.  
**Transient**: Disposed immediately after use only if the container created the instance; otherwise, disposal is the caller's responsibility.  
</details>
<details><summary><b>Can you inject a Scoped service into a Singleton? Why or why not?</b></summary>
Injecting a Scoped service into a Singleton is generally not recommended because the Singleton lives for the entire application lifetime, while Scoped services are created per scope (e.g., per HTTP request). This mismatch can cause the Scoped service to behave like a Singleton, leading to incorrect state sharing, potential memory leaks, or runtime errors.
If you need to use a Scoped service inside a Singleton, you should inject an IServiceProvider or IServiceScopeFactory to create scopes manually and resolve the Scoped service within those scopes.

<details><summary><em>Example</em></summary>

Avoid Direct Injection of Scoped into Singleton

1. Define services

``` csharp
public interface IScopedService
{
    Guid GetOperationId();
}

public class ScopedService : IScopedService
{
    private readonly Guid _operationId = Guid.NewGuid();

    public Guid GetOperationId() => _operationId;
}

public interface ISingletonService
{
    Guid GetScopedOperationId();
}

public class SingletonService : ISingletonService
{
    private readonly IServiceProvider _serviceProvider;

    public SingletonService(IServiceProvider serviceProvider)
    {
        _serviceProvider = serviceProvider;
    }

    public Guid GetScopedOperationId()
    {
        // Create a scope to resolve the scoped service properly
        using (var scope = _serviceProvider.CreateScope())
        {
            var scopedService = scope.ServiceProvider.GetRequiredService<IScopedService>();
            return scopedService.GetOperationId();
        }
    }
}
```

2. Register services in Program.cs

``` csharp
services.AddScoped<IScopedService, ScopedService>();
services.AddSingleton<ISingletonService, SingletonService>();
```
3. Use in a controller

``` csharp 
[ApiController]
[Route("[controller]")]
public class TestController : ControllerBase
{
    private readonly ISingletonService _singletonService;

    public TestController(ISingletonService singletonService)
    {
        _singletonService = singletonService;
    }

    [HttpGet]
    public IActionResult Get()
    {
        var scopedId = _singletonService.GetScopedOperationId();
        return Ok(new { ScopedOperationId = scopedId });
    }
}
```

***Explanation**

The Singleton service does not directly inject the Scoped service.  
Instead, it uses IServiceProvider.CreateScope() to create a new scope and resolve the Scoped service within that scope.  
This ensures the Scoped service behaves correctly and avoids lifetime conflicts.  

</details>
<hr/>
</details>
<details><summary><b>What happens if you register the same service with multiple lifetimes?</b></summary>
If you register the same service type multiple times with different lifetimes in the .NET Dependency Injection container, the last registration wins by default. This means the DI container will use the lifetime and implementation from the last registration for that service type when resolving dependencies.

This can lead to unexpected behavior if you unintentionally register the same service multiple times with different lifetimes.
<details><summary><em>Example</em></summary>

1. Define a simple service interface and implementation
``` csharp
public interface IMessageService
{
    Guid GetOperationId();
}

public class MessageService : IMessageService
{
    private readonly Guid _operationId;

    public MessageService()
    {
        _operationId = Guid.NewGuid();
    }

    public Guid GetOperationId() => _operationId;
}
```

2. Register the same service multiple times with different lifetimes in Program.cs
``` csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<IMessageService, MessageService>();  // First registration
builder.Services.AddScoped<IMessageService, MessageService>();     // Second registration (overwrites Singleton)
builder.Services.AddTransient<IMessageService, MessageService>();  // Third registration (overwrites Scoped)

var app = builder.Build();

app.MapGet("/", (IMessageService messageService1, IMessageService messageService2) =>
{
    // Both injected instances will be Transient (last registration)
    return new
    {
        Id1 = messageService1.GetOperationId(),
        Id2 = messageService2.GetOperationId()
    };
});

app.Run();
```

3. Test behavior

Both messageService1 and messageService2 will be different instances because the last registration is Transient.  
The Singleton and Scoped registrations are effectively ignored.


**Explanation**

The DI container uses the last registered lifetime for the service type.  
Previous registrations for the same service type are overridden.  
To register multiple implementations, use named registrations or different interfaces.  
</details>
<hr/>
</details>
<details><summary><b>How to register multiple implementations of the same interface properly</b></summary>
To register multiple implementations of the same interface in .NET Dependency Injection, you register each implementation separately with the same interface. When you inject IEnumerable<T>, the DI container provides all registered implementations. This allows you to work with all or select specific implementations at runtime.


<details><summary><em>Example</em></summary>

1. Define the interface and implementations
``` csharp
public interface INotificationService
{
    string Notify();
}

public class EmailNotificationService : INotificationService
{
    public string Notify() => "Email notification sent.";
}

public class SmsNotificationService : INotificationService
{
    public string Notify() => "SMS notification sent.";
}
```
2. Register services in Program.cs
``` csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<INotificationService, EmailNotificationService>();
builder.Services.AddTransient<INotificationService, SmsNotificationService>();

var app = builder.Build();
```

3. Inject and use all implementations in a controller or endpoint
``` csharp
app.MapGet("/notify", (IEnumerable<INotificationService> notificationServices) =>
{
    var results = notificationServices.Select(service => service.Notify()).ToList();
    return results;
});

app.Run();
```

***Explanation***

Both EmailNotificationService and SmsNotificationService are registered as INotificationService.  
Injecting IEnumerable<INotificationService> gives access to all implementations.  
You can iterate through them and invoke methods on each.  

**Selecting Specific Implementation Based on Condition**
1. Define interface and implementations (same as before)
```csharp
public interface INotificationService
{
    string Notify();
    string NotificationType { get; }
}

public class EmailNotificationService : INotificationService
{
    public string NotificationType => "Email";
    public string Notify() => "Email notification sent.";
}

public class SmsNotificationService : INotificationService
{
    public string NotificationType => "SMS";
    public string Notify() => "SMS notification sent.";
}
```
2. Register services in Program.cs
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddTransient<INotificationService, EmailNotificationService>();
builder.Services.AddTransient<INotificationService, SmsNotificationService>();

builder.Services.AddTransient<NotificationServiceFactory>();

var app = builder.Build();
```
3. Create a factory to select implementation
```csharp
public class NotificationServiceFactory
{
    private readonly IEnumerable<INotificationService> _services;

    public NotificationServiceFactory(IEnumerable<INotificationService> services)
    {
        _services = services;
    }

    public INotificationService GetNotificationService(string type)
    {
        return _services.FirstOrDefault(s => s.NotificationType.Equals(type, StringComparison.OrdinalIgnoreCase));
    }
}
```

4. Use factory in controller or endpoint
``` csharp
app.MapGet("/notify/{type}", (string type, NotificationServiceFactory factory) =>
{
    var service = factory.GetNotificationService(type);
    if (service == null)
        return Results.NotFound($"Notification type '{type}' not found.");

    return Results.Ok(service.Notify());
});

app.Run();
```

***Explanation***

All implementations are registered and injected as IEnumerable<INotificationService>.  
The factory selects the appropriate implementation based on the type parameter.  
The endpoint calls the factory to get the correct service and executes it.  
</details>
<hr/>
</details>
<details><summary><b>How do lifetimes affect thread safety of services?</b></summary>
Lifetimes affect thread safety because:

* Singleton services are shared across all threads and requests, so they must be thread-safe to avoid race conditions and data corruption.
* Scoped services are created per scope (e.g., per HTTP request), so they are generally accessed by a single thread and have less thread safety concern.
* Transient services are created every time they are requested, usually used briefly and by a single thread, so thread safety is less critical but still important if shared state exists.

In summary, Singletons require careful thread-safe design, while Scoped and Transient services typically have fewer thread safety issues due to their shorter lifetimes and limited sharing.
<details><summary><em>Example</em></summary>

**Demonstrating Thread Safety Concerns with Singleton**
1. Define a thread-unsafe Singleton service
``` csharp
public interface ICounterService
{
    int Increment();
    int GetCount();
}

public class CounterService : ICounterService
{
    private int _count = 0;

    public int Increment()
    {
        // Not thread-safe increment
        _count++;
        return _count;
    }

    public int GetCount() => _count;
}
```
2. Register as Singleton in Program.cs
``` csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddSingleton<ICounterService, CounterService>();

var app = builder.Build();
```
3. Create an endpoint to test concurrent access
```csharp
app.MapGet("/increment", (ICounterService counterService) =>
{
    var results = new List<int>();

    // Simulate concurrent increments
   .For(0, 1000, i =>
    {
        var newCount = counterService.Increment();
        lock (results)
        {
            results.Add(newCount);
        }
    });

    return Results.Ok(new { FinalCount = counterService.GetCount(), AllCounts = results });
});

app.Run();
```

***Explanation***

The CounterService is a Singleton shared by all requests and threads.  
The Increment method is not thread-safe, so concurrent calls can cause race conditions.  
The final count may be less than expected due to lost updates.  
To fix, use thread-safe constructs like Interlocked.Increment.  


**Thread-Safe Version of Increment**
``` csharp
public int Increment()
{
    return Interlocked.Increment(ref _count);
}
```
</details>
<hr/>
</details>
<details><summary><b>If you resolve a Scoped service outside of an HTTP request scope, what happens?</b></summary>
Short Summary
If you resolve a Scoped service outside of an HTTP request scope (i.e., a valid DI scope), the .NET Dependency Injection container will throw an exception because there is no active scope to create or manage the Scoped service instance. Scoped services require a scope boundary (like an HTTP request) to manage their lifetime properly.
<details><summary><em>Example</em></summary>

1. Define a Scoped service
``` csharp
public interface IScopedService
{
    Guid GetOperationId();
}

public class ScopedService : IScopedService
{
    private readonly Guid _operationId = Guid.NewGuid();

    public Guid GetOperationId() => _operationId;
}
```
2. Register the service as Scoped in Program.cs
```csharp
var builder = WebApplication.CreateBuilder(args);

builder.Services.AddScoped<IScopedService, ScopedService>();

var app = builder.Build();
```
3. Attempt to resolve Scoped service outside HTTP request scope (e.g., in Main or background task)
``` csharp
// This code runs outside of any HTTP request scope
try
{
    var scopedService = app.Services.GetRequiredService<IScopedService>();
    Console.WriteLine($"Scoped service ID: {scopedService.GetOperationId()}");
}
catch (Exception ex)
{
    Console.WriteLine($"Exception: {ex.Message}");
}
```

***Expected Behavior***

The above code will throw an exception similar to:  
csharpInvalidOperationException: Cannot resolve scoped service 'IScopedService' from root provider.

This happens because the root service provider does not have an active scope to create the Scoped service.

***How to Properly Resolve Scoped Service Outside HTTP Request***  
Use IServiceScopeFactory to create a scope manually:  
``` csharp
using (var scope = app.Services.CreateScope())
{
    var scopedService = scope.ServiceProvider.GetRequiredService<IScopedService>();
    Console.WriteLine($"Scoped service ID: {scopedService.GetOperationId()}");
}
```
</details>
<hr/>
</details>

</details>




