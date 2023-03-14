## .NET CORE Advanced Interview Questions & Answers

### Questions
- [How do we inject the service into the controller rather than constructor?](#how-do-we-inject-the-service-into-the-controller-rather-than-constructor)
- [How to ensure that Web API returns only JSON data?](#how-to-ensure-that-web-api-returns-only-json-data)
- [How to register multiple implementations of the same interface?](#)
- [Difference between assembly and library?](#)
- [What is right way to use Http Client?](#)
- [What is ETag in ASP.NET Core?](#)
- [What Are Idempotent and Safe Methods and How to Use Them?](#)
- [Difference between patch and put?](#)
- [How do you know your APIs are RESTful?](#)
- [How will we Authorize for deamon application?](#)
- [Different Authentication flows?](#)
- [Explain CRUD methods?](#)
- [What is JWT authentication?](#)
- [Authorization scopes in JWT?](#)
- [How do you achieve Authorization and Authentication?](#)
- [What is connect and disconnected architecture in ADO.Net?](#)
- [How do we configure KeyVaults?](#)
- [What is IAuthenticationFilter?](#)
- [Different types of loading in Entity framework? when to use what?](#)

***

### How do we inject the service into the controller rather than constructor?

The FromServicesAttribute enables injecting a service directly into an action method without using constructor injection

```csharp
public interface IDateTime
{
    DateTime Now { get; }
}

public class SystemDateTime : IDateTime
{
    public DateTime Now
    {
        get { return DateTime.Now; }
    }
}

public void ConfigureServices(IServiceCollection services)
{
    services.AddSingleton<IDateTime, SystemDateTime>();
    services.AddControllersWithViews();
}

public IActionResult About([FromServices] IDateTime dateTime)
{
    return Content( $"Current server time: {dateTime.Now}");
}
```
***

### How to ensure that Web API returns only JSON data?

To ensure that the data return only JSON. Asp.net web API will  serialize the returning object to JSON and as the application/json is added in the header so the browser will understand that the WebAPI is returning only JSON result.

In the in WebApiConfig.cs class in MVC Web API project we need to add

```csharp
config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
```

***

### How to register multiple implementations of the same interface?

**Multiple implementations with generic**

```csharp
public interface IMoviment<T> where T : class 
{ 
    string Walk(); 
}
```

One friendly approach could be using an Enum for the generic T
```csharp 
public interface IMoviment<T> where T : MovimentEnum{string Walk();} 
```

This interface has three implementations, Cat, Dog, and Human class.
```csharp
public class Dog : IMoviment<Dog> { public string Walk() { return “Im a Dog, walking!”; } }
public class Cat : IMoviment<Cat> { public string Walk(){return “Im a Cat, walking!”; } }
public class Human : IMoviment<Human> { public string Walk() {return “Im a human, walking!”; } }
```

To register, add this code.
```csharp
builder.Services.AddScoped<IMoviment<Cat>,Cat>();builder.Services.AddScoped<IMoviment<Dog>, Dog>();builder.Services.AddScoped<IMoviment<Human>, Human>();
```

```csharp
public class MovimentController : ControllerBase
{
    private readonly IMoviment<Dog> _dogMoviment;
    public MovimentController(IMoviment<Dog> dogMoviment)
    {
        _dogMoviment = dogMoviment;
    }
}
```

This approach is ok, but technically you are not using the same interface. You are using the same interface name with a generic type.

**Multiple implementations with Func<>**

```csharp
public enum MovimentEnum { Cat, Dog, Human }
```

The Dog class
```csharp
public class Dog : IMoviment
{
    public string Walk() { return “Im a Dog, walking!”; }
}
```

To register first, you need to register the classes like this.

```csharp
builder.Services.AddScoped<Dog>();
builder.Services.AddScoped<Human>();
builder.Services.AddScoped<Cat>();
```

And then register the Func<> with the Enum and the Interface. To choose between each class, I use a switch with the Enum.

```csharp
builder.Services.AddTransient<Func<MovimentEnum, IMoviment>>(movimentProvider => key => {
    switch (key){
        case MovimentEnum.Cat:return movimentProvider.GetService<Cat>();case MovimentEnum.Dog:return movimentProvider.GetService<Dog>();case MovimentEnum.Human:return movimentProvider.GetService<Human>();default:return null;
        }
    });
```

To use this in your controller, inject the Func<> like this.

```csharp
public class MovimentController: ControllerBase
{
    private readonly IMoviment _dogMoviment;
    public MovimentController(Func<MovimentEnum, IMoviment> serviceResolver)
    {
        _dogMoviment = serviceResolver(MovimentEnum.Dog);
    }
}
```

**Multiple implementations with an IEnumerable**

This is approach is by far more tricky. Some articles refer to this approach as only valid if you use a pipeline to use the Chain of Responsibility pattern.

The reason to be tricky is to do simple stuff. You will need to play with indexes. Or using types to figure out the class you want.

```csharp
builder.Services.AddScoped<IMoviment,Dog> ();
builder.Services.AddScoped<IMoviment,Human>();
builder.Services.AddScoped<IMoviment,Cat>();
```

The injection
```csharp
public class MovimentController : ControllerBase
{
    private readonly IMoviment _dogMoviment;
    public MovimentController(IEnumerable<IMoviment> moviments)
    {
        _dogMoviment = moviments.SingleOrDefault(s => s.GetType() == typeof(Dog));
    }

}
```