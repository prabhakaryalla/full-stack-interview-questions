## .NET CORE Advanced Interview Questions & Answers

### Questions
- [How do we inject the service into the controller rather than constructor?](#how-do-we-inject-the-service-into-the-controller-rather-than-constructor)
- [How to ensure that Web API returns only JSON data?](#how-to-ensure-that-web-api-returns-only-json-data)
- [Difference between assembly and library?](#)
- [Multiple Implementations of same interface in dotnet core?](#)
- [What is right way to use Http Client?](#)
- [What is ETag in ASP.NET Core?](#)
- [What Are Idempotent and Safe Methods and How to Use Them?](#)

***

### How do we inject the service into the controller rather than constructor?

The FromServicesAttribute enables injecting a service directly into an action method without using constructor injection

```c#
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
```C# 
config.Formatters.JsonFormatter.SupportedMediaTypes.Add(new MediaTypeHeaderValue("application/json"));
```
