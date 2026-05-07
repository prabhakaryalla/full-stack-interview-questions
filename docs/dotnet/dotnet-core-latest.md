<details>
<summary><b>Can you explain how multiple authorization policies can be combined or chained in ASP.NET Core?</b></summary><pre><b>
Approach                                 Logic Type      Description</b>
<hr />
Single policy with multiple requirements    AND             All requirements must succeed
Multiple [Authorize] attributes             OR              Any policy success grants access
Custom requirement & handler                AND/OR          Custom complex logic
Programmatic checks                         AND/OR          Fine-grained control in code
</pre>
</details>

<details>
<summary><b>How do you pass parameters to authorization policies dynamically at runtime?</b></summary>
To pass parameters dynamically to authorization policies at runtime, define the policy to accept parameters and provide those parameters when invoking the authorization check, typically by passing them through a custom requirement or resource context evaluated by the policy handler.
<details>
<summary><b>Example: Dynamic Minimum Age Policy</b></summary>
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
</details>

<details>
<summary><b>What is the difference between resource-based authorization and policy-based authorization?</b></summary>
<b>Policy-based authorization</b> uses predefined policies with fixed requirements configured in advance and applied globally or by name.

<b>Resource-based authorization</b> evaluates permissions dynamically based on the specific resource being accessed, allowing parameters and context to influence the decision at runtime.

<details>
<summary><b>Example with Steps:</b></summary>
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

</details>



