<details> <summary><strong>Authentication, Authorization & Policies</strong></summary>

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



