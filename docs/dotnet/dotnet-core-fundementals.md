## .NET CORE Interview Questions & Answers

### Questions
- [What are the advantages of ASP.NET Core over ASP.NET?](#what-are-the-advantages-of-aspnet-core-over-aspnet)
- [What does CreateDefaultBuilder() do?](#what-does-createdefaultbuilder-do)
- [What is the purpose of the Startup class?](#what-is-the-purpose-of-the-startup-class)
- [Can we have different name for "Startup"?](#can-we-have-different-name-for-startup)
- [What is *IApplicationBuilder*?](#what-is-iapplicationbuilder)
- [What is *IHostingEnvironment*?](#what-is-ihostingenvironment)
- [What is *IloggerFactory*?](#what-is-iloggerfactory)
- [What is ConfigureServices method and Configure method?](#what-is-configureservices-method-and-configure-method)
- [Is ConfigureServices method is mandatory?](#is-configureservices-method-is-mandatory)
- [What are service lifetime?](#what-are-service-lifetime)
- [What are Services?](#what-are-services)
- [What is middleware?](#what-is-middleware)
- [Difference between IApplicationBuilder.Use() and IApplicationBuilder.Run()?](#difference-between-iapplicationbuilderuse-and-iapplicationbuilderrun)
- [Explain the execution order of Middleware?](#explain-the-execution-order-of-middleware)
- [What is the use of "Map" extension while adding middleware?](#what-is-the-use-of-map-extension-while-adding-middleware)
- [Can maps be nested while adding middleware?](#can-maps-be-nested-while-adding-middleware)
- [How to add Custom Middleware?](#how-to-add-custom-middleware)
- [How to access Configuration during startup?](#how-to-access-configuration-during-startup)
- [How to access Configuration in Controller?](#how-to-access-configuration-in-controller)
- [How do we enable Session in ASP.NET Core?](#how-do-we-enable-session-in-aspnet-core)
- [What are the types of Routing?](#what-are-the-types-of-routing)
- [What are Route Constraints?](#what-are-route-constraints)
- [How do we implement Global Exception Handling?](#how-do-we-implement-global-exception-handling)
- [What is Unit Testing?](#what-is-unit-testing)
- [What is xUnit?](#what-is-xunit)
- [What are the attributes([Fact],[Theory]) of xUnit?](#what-are-the-attributesfacttheory-of-xunit)
- [What is the test pattern?](#what-is-the-test-pattern)
- [What is Stub and Mock?](#what-is-stub-and-mock)
- [What is Moq?](#what-is-moq)
- [What are benefits of Moq?](#what-are-benefits-of-moq)
- [How to use Moq?](#how-to-use-moq)
- [What is the difference between swagger and postman?](#what-is-the-difference-between-swagger-and-postman))

***

### What are the advantages of ASP.NET Core over ASP.NET?

* **Fast** - It is a lightweight, high-performance web framework.
* **Integration of Modern UI Framework** - ASP.NET Core support modern, a Client-side framework like AngularJs, ReactJs and React with Redux etc. ASP.NET framework supports client-side framework templates like AngularJs, ReactJs and React with Redux etc.
* **Hosting** - It has the ability to host on IIS, Apache, Docker or Self Hosting.
* **Cross Platform** - ASP.NET Core web application can run on Windows, Mac, Linux development tools.
* **Support Built-In Dependency Injection** - It supports built-in Dependency Injection.
* **Supports Modular** - It support modular HTTP request.
* **Open-Source** - It is an open-source and community-focused web framework.
* **Side-by-side app versioning** - ASP.NET Core runs on .NET Core which supports the simultaneous running of multiple versions of applications.
* A unified story for building web UI and web APIs.
***

### What does CreateDefaultBuilder() do?

When we use the CreateDefaultBuilder method, out of the box we get :

- Sets the “Content Root” to be the current directory
- Allows Command Line args to be pushed into your configuration object
- Adds both appsettings.json and appsettings.{Environment}.json to be loaded into the configuration object
- Adds environment variables to the configuration object
- If in Development, allows the loading of secrets.
- Adds Console/Debug loggers
- Tells the app to use Kestrel and to load Kestrel configuration from the loaded config
- Adds Routing
- Adds IIS Integration

```csharp
var host = new WebHostBuilder()
	.UseKestrel()
	.UseContentRoot(Directory.GetCurrentDirectory())
	.UseIISIntegration()
	.UseStartup<Startup>()
	.Build();
```

***

### What is the purpose of the Startup class?

The Startup class is mandatory and it is the entry point of the application. With the help of this class we can configure the environment in our ASP.net Core application. We can use Constructor and two different methods: ConfigureServices and Configure for setting up the environment.

***

### Can we have different name for "Startup"?

Yes, it is not necessary that the class name be "Startup". The ASP.net core application is a Console app and we have to configure a web host to start listening. The "Program" class does this configuration.

```csharp
public class Program  
{  
    public static void Main(string[] args)  
    {  
            var host = new WebHostBuilder()  
            .UseKestrel()  
            .UseContentRoot(Directory.GetCurrentDirectory())  
            .UseStartup<Startup>()  
            .Build();  
            host.Run();  
    }  
}
```

***

### What is *IApplicationBuilder*?

*IApplicationBuilder* is an interface that contains properties and methods related to current environment. It is used to get the environment variables in application. 

***

### What is *IHostingEnvironment*?

*IHostingEnvironment* is an interface that contains information related to the web hosting environment on which application is running. Using this interface method, we can change behavior of application.

***
### What is *IloggerFactory*?

*IloggerFactory* is an interface that provides configuration for the logging system in Asp.net Core. It also creates the instance of logging system.

***


### What is ConfigureServices method and Configure method?

**ConfigureServices()**: Registers the services that your application will need. When the application is requested for the first time, it calls ConfigureServices method. This method must be declared with a public access modifier, so that environment will be able to read the content from metadata.

ASP.net core has built-in support for Dependency Injection. We can add services to DI container using this method. Following are ways to define ConfigureServices method in startup class.

```csharp
public void ConfigureServices(IServiceCollection services)  
{  
        services.AddMvc();  
}
```

**Configure()**: Configures the middleware pipeline that controls how the application processes the HTTP requests and sends the response. This method is also used to configure middleware in HTTP pipeline. This method accept IApplicationBuilder as a parameter. This method may accept some optional parameter such as IHostingEnvironment and ILoggerFactory. Whenever any service is added to ConfigureServices method, it is available to use in this method.

```csharp
public void Configure(IApplicationBuilder app)  
{  
    app.UseMvc();  
  
    app.Run(context => {  
        return context.Response.WriteAsync("Hello Readers!");  
    });  
} 
```

***

### Is ConfigureServices method is mandatory?

Declaration of this method is not mandatory in startup class.

***

### What are service lifetime?

The lifetime of the service is specified when registering the service in the container. There are three service lifetimes implemented by .NET 6

* **Transient:** Dependencies declared with the transient service lifetime will have a new instance created by the container every time they are injected into another object 

    Transient is considered the "default" service lifetime in .NET 6. This means that you should make all dependencies transient unless they truly need to use one of the other service lifetimes.
* **Scoped** Dependencies declared as scoped are created once per application request. "Application request" differs in different kinds of apps; in ASP.NET web apps, "application request" is an HTTP web request.

  The dependency instance is created at the beginning of the request, injected into all dependencies that need it during the request, and disposed of by the container at the end of the request.

   Example: We might want to be a scoped dependency would be information about the HTTP request itself, such as cookies. This information must exist for the duration of the request, but must also be usable for each subsequent request.

* **Singleton** A singleton is a dependency that is created once by the container on application startup and then injected into every dependent class that needs an instance of it. That instance will exist until the application is shut down or restarted 

    In the real world, one example of a singleton dependency might be a cache service, which maintains a memory cache and accessors for that cache.

Conclusion:
* Transient services are created every time they are injected. This is the default service lifetime.
* Scoped services are created once per request.
* Singleton services are created only once, the same instance gets injected to every dependent class.



***

### What are Services?
Services are modular, loosely coupled components that focus on accomplishing one task, such as caching, authentication, etc. In ASP.NET Core, services are simply C# classes that provide specific functionality to an application. 

You can use services provided by third-party Nuget libraries, or you can write them yourself. Wherever they are created, they have to be configured in the ConfigureServices() method.

The Startup class uses an IServiceCollection that holds all the services that your application will need. It also configures the dependency injection (DI). So these services are automatically injected by the DI container into your code.

***
### What is middleware?

Middleware defines how the application will handle the incoming HTTP requests. It also deals with the HTTP response on its way out.

Middleware consists of small modules executing in sequence to transform the incoming request or the outgoing response. The middleware can perform various tasks, including logging, authentication and authorization, service static files, error handling, etc.

One important thing to note is that the order of the middleware is important. The ASP.NET Core framework executes the middleware code in the same order in which you define it.

Code to add Middleware into Request Pipeline
```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseMyMiddleware();
    app.Run(async (context) =>
    {
        await context.Response.WriteAsync("Hello World!");
    });
}
```

***

### Difference between IApplicationBuilder.Use() and IApplicationBuilder.Run()?

We can configure middleware in the Configure method of the Startup class using IApplicationBuilder instance.

**Run()**

Run() is an extension method on IApplicationBuilder instance which adds a terminal middleware to the application's request pipeline.

The Run method is an extension method on IApplicationBuilder and accepts a parameter of RequestDelegate.

**signature of the Run method**

``public static void Run(this IApplicationBuilder app, RequestDelegate handler)``

**signature of RequestDelegate**

``public delegate Task RequestDelegate(HttpContext context);``

**Example**
```csharp
public class Startup{
   public Startup(){  }
   public void Configure(IApplicationBuilder app, IHostingEnvironment env,
   ILoggerFactory loggerFactory){
      //configure middleware using IApplicationBuilder here..
      app.Run(async (context) =>{
         await context.Response.WriteAsync("Hello World!");
      });
      // other code removed for clarity..
   }
}
```
The above MyMiddleware function is not asynchronous and so will block the thread till the time it completes the execution. So, make it asynchronous by using async and await to improve performance and scalability.

```csharp
public class Startup{
   public Startup() { }
   public void Configure(IApplicationBuilder app, IHostingEnvironment env)
   {
      app.Run(MyMiddleware);
   }
   private async Task MyMiddleware(HttpContext context){
      await context.Response.WriteAsync("Hello World! ");
   }
}
```
**Configure Multiple Middleware using Run()**

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env){
   app.Run(async (context) =>{
      await context.Response.WriteAsync("1st Middleware");
   });
   // the following will never be executed
   app.Run(async (context) =>{
      await context.Response.WriteAsync(" 2nd Middleware");
   });
}
```

**Use()**

To configure multiple middleware, use Use() extension method. It is similar to Run() method except that it includes next parameter to invoke next middleware in the sequence

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
   app.Use(async (context, next) =>{
      await context.Response.WriteAsync("1st Middleware!");
      await next();
   });
   app.Run(async (context) =>{
      await context.Response.WriteAsync("2nd Middleware");
   });
}
```
***

### Explain the execution order of Middleware?

 Lets consider the below example

```csharp
public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
{
    app.Use(async (context, next) =>
    {
        await context.Response.WriteAsync("Use Middleware1 Incoming Request \n");
        await next();
        await context.Response.WriteAsync("Use Middleware1 Outgoing Response \n");
    });

    app.Use(async (context, next) =>
    {
        await context.Response.WriteAsync("Use Middleware2 Incoming Request \n");
        await next();
        await context.Response.WriteAsync("Use Middleware2 Outgoing Response \n");
    });

    app.Run(async context => {
        await context.Response.WriteAsync("Run Middleware3 Req Handled & Res Generated\n");
    });
} 
```
 *output*
 
 ```
 Use Middleware1 Incoming Request
 Use Middleware2 Incoming Request
 Run Middleware3 Req Handled & Res Generated
 Use Middleware2 Outgoing Response
 Use Middleware1 Outgoing Response
 ```

 [Read More](#https://dotnettutorials.net/lesson/run-next-use-methods-in-asp-net-core/)

 ***

### What is the use of "Map" extension while adding middleware?
Map extensions are used as convention for branching the pipeline.

The Map extension method is used to match request delegates based on a request’s path. Map simply accepts a path and a function that configures a separate middleware pipeline.

In the following example, any request with the base path of /maptest will be handled by the pipeline configured in the HandleMapTest method.

```csharp
private static void HandleMapTest(IApplicationBuilder app){
   app.Run(async context =>{
      await context.Response.WriteAsync("Map Test Successful");
   });
}
public void ConfigureMapping(IApplicationBuilder app){
   app.Map("/maptest", HandleMapTest);
}
```

In addition to path-based mapping, the MapWhen method supports predicate-based middleware branching, allowing separate pipelines to be constructed in a very flexible fashion

Any predicate of type Func<HttpContext, bool> can be used to map requests to a new branch of the pipeline.

```csharp
private static void HandleBranch(IApplicationBuilder app){
   app.Run(async context =>{
      await context.Response.WriteAsync("Branch used.");
   });
}
public void ConfigureMapWhen(IApplicationBuilder app){
   app.MapWhen(context => {
      return context.Request.Query.ContainsKey("branch");
   }, HandleBranch);
      app.Run(async context =>{
         await context.Response.WriteAsync("Hello from " + _environment);
   });
}
```
***

### Can maps be nested while adding middleware?
Maps can also be nested

```csharp
app.Map("/level1", level1App => {
   level1App.Map("/level2a", level2AApp => {
      // "/level1/level2a"
      //...
   });
   level1App.Map("/level2b", level2BApp => {
      // "/level1/level2b"
      //...
   });
});
```

***

### How to add Custom Middleware?

The custom middleware component is like any other .NET class with Invoke() method. However, in order to execute next middleware in a sequence, it should have RequestDelegate type parameter in the constructor. 

```csharp
public class MyMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger _logger;

    public MyMiddleware(RequestDelegate next, ILoggerFactory logFactory)
    {
        _next = next;
        _logger = logFactory.CreateLogger("MyMiddleware");
    }

    public async Task Invoke(HttpContext httpContext)
    {
        _logger.LogInformation("MyMiddleware executing..");
        await _next(httpContext); // calling next middleware
    }
}

// Extension() used to add the middleware to the HTTP request pipeline.
public static class MyMiddlewareExtensions
{
   public static IApplicationBuilder UseMyMiddleware(this IApplicationBuilder builder)
   {
     return builder.UseMiddleware<MyMiddleware>();
   }
}
```

***

### How to access Configuration during startup?

WebApplicationBuilder returned by WebApplication.CreateBuilder(args) exposes **Configuration** and **Environment** properties:

```csharp
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
...
ConfigurationManager configuration = builder.Configuration; // allows both to access and to set up the config
IWebHostEnvironment environment = builder.Environment;
```

WebApplicationBuilder returned by WebApplication.CreateBuilder(args) exposes Configuration and Environment properties:

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
...
ConfigurationManager configuration = builder.Configuration; // allows both to access and to set up the config
IWebHostEnvironment environment = builder.Environment;

WebApplication returned by WebApplicationBuilder.Build() also exposes **Configuration** and **Environment**:

```csharp
var app = builder.Build();
IConfiguration configuration = app.Configuration;
IWebHostEnvironment environment = app.Environment;
```

***

### How to access Configuration in Controller?
We can directly inject IConfigurationService into the controller as below:

```csharp
public class HomeController: Controller {
 private IConfiguration _configuration;

 public HomeController(IConfiguration Configuration) {
  _configuration = Configuration;
 }
}
```

***

### How do we enable Session in ASP.NET Core?

Install the stable version of “Microsoft.AspNetCore.Session” from the NuGet Package Manager.
Add the session service to the container so that we can add the services in the “configureServices” function.
```csharp
public void ConfigureServices(IServiceCollection services)  
{  
     
    services.AddDistributedMemoryCache();  
    services.AddSession(options => {  
        options.IdleTimeout = TimeSpan.FromMinutes(1);//You can set Time   
    });  
    services.AddMvc();  
}
```

Configure the HTTP Request Pipeline
We add “app.Usersession()” inside the “configure” function so that it gets called by the runtime.

```csharp
public void Configure(IApplicationBuilder app, IHostingEnvironment env)  
{  
    app.UseStaticFiles();    
    app.UseSession(); 
} 
```

Let us set “one” minute as the Session TimeOut in the “ConfigureServices” function of the “Startup.cs” class.

```csharp
services.AddSession(options => {  
    options.IdleTimeout = TimeSpan.FromMinutes(1);//You can set Time   
}); 
``

Example of a session sharing in ASP.NET Core.

```csharp
public class HomeController : Controller  
{
   const string SessionName = "_Name";  
   const string SessionAge = "_Age";  
   
   public IActionResult Index()  
   {  
      HttpContext.Session.SetString(SessionName, "Prabhakar");  
      HttpContext.Session.SetInt32(SessionAge, 33);  
      return View();  
   }  
      
   public IActionResult About()  
   {  
      ViewBag.Name = HttpContext.Session.GetString(SessionName);  
      ViewBag.Age = HttpContext.Session.GetInt32(SessionAge);  
      ViewData["Message"] = "Asp.Net Core !!!.";
      return View();  
   }  
}  
```

***

### What are the types of Routing?

There are two main ways to define routes in ASP.NET Core:
1. **Convention-based Routing:** It creates routes based on a series of conventions which represent all the possible routes in your system. Convention-based are defined in the Startup.cs file.

```csharp
routes.MapRoute(name: "default", template: "{controller=Home}/{action=Index}/{id?}");
```

2. **Attribute Routing:** It creates routes based on attributes placed on controller or action level. Attribute routing provides us more control over the URLs generation patterns which helps us in SEO. 

```csharp
[Route("Home")]
public class HomeController: Controller
{
   [Route("")]  // "Home"
   [Route("Home/Index/")]  // "Home/Index"
   [Route("")] / ""
   public IActionResult Index()  
   {  
      return View();  
   }

   [Route("About")] // "Home/About"
   public IActionResult About()  
   {  
      return View();  
   }
}
```

**Attribute Routing Tokens**
One of the cool thing about ASP.NET Core routing is it's more flexible as compared to ASP.NET MVC5 routing since it provides tokens for [area], [controller], and [action]. These tokens get replaced by their values in the route table.

```csharp
[Route("[controller]/[action]")]
public class ProductsController: Controller
{
   [HttpGet] // matches '/Products/List'
   public IActionResult List()  
   {  
      return View();  
   }

   [HttpGet("id")] // "/Products/Edit/{id}"
   public IActionResult Edit(int id)  
   {  
      return View();  
   }
}
```

**Mixed Routing**
You can use Convention-based Routing and Attribute routing together. Even you should use both together since it's not possible to define attribute route for each and every action or controller. In that case, Convention-based Routing will help you.

***

### What are Route Constraints?

Routing constraints let you restrict how the parameters in the route template are matched. It helps to filter out the input parameter and action method it can accept.

For example, if the URL Parameter is restricted to have int value, the route engine will match the controller action having integer value in the parameter or restrict it.

How Route Constraints are applied:
1. Using constraint parameter in the MapControllerRoute at the application startup where the endpoints are defined; i.e. Inline Constraint
2. Route attribute at the controller or action method 

**Inline Constraint**
Inline constraint are added after the URL parameter and sperated by : (colon) with the primitive type and also defined if the parameter can be nullable. Below code see – {id:int?}

```csharp
app.UseEndpoints(endpoints =>
{  
 endpoints.MapControllerRoute(  
 name: "default",  
 pattern: "{controller=Home}/{action=Index}/{id:int?}");  
});  
```

The int constraints checks if the parameter value sent is integer and allows you to execute the action method by passing the parameter value to the matching method.

**Constraints in route attribute**
You can also define the constraints in route attribute as follows,
```csharp
[Route("Home/Index/{id:int?}")]  
public IActionResult Index(int? id)  
{  
   return View();  
}
```  
***

### How do we implement Global Exception Handling?
Global exception handling allows us to organize all exception handling logic in one place. Thus, we can improve the readability of the action methods and the maintainability of the error handling process.

It’s a block of code that can be added to the ASP.NET Core pipeline as middleware and holds our custom error handling mechanism. This pipeline is capable of catching a wide range of exceptions.

Create a separate folder named CustomMiddlewares and add a class file named ExceptionHandlingMiddleware.cs within it.

```csharp
using System.Net;
using System.Text.Json;
using ExceptionHandling.Models.Responses;

namespace ExceptionHandling.CustomMiddlewares;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate _next;
    private readonly ILogger<ExceptionHandlingMiddleware> _logger;

    public ExceptionHandlingMiddleware(RequestDelegate next, ILogger<ExceptionHandlingMiddleware> logger)
    {
        _next = next;
        _logger = logger;
    }
    
    public async Task InvokeAsync(HttpContext httpContext)
    {
        try
        {
            await _next(httpContext);
        }
        catch (Exception ex)
        {
            await HandleExceptionAsync(httpContext, ex);
        }
    }

    private async Task HandleExceptionAsync(HttpContext context, Exception exception)
    {
        context.Response.ContentType = "application/json";
        var response = context.Response;

        var errorResponse = new ErrorResponse
        {
            Success = false
        };
        switch (exception)
        {
            case ApplicationException ex:
                if (ex.Message.Contains("Invalid Token"))
                {
                    response.StatusCode = (int) HttpStatusCode.Forbidden;
                    errorResponse.Message = ex.Message;
                    break;
                }
                response.StatusCode = (int) HttpStatusCode.BadRequest;
                errorResponse.Message = ex.Message;
                break;
            default:
                response.StatusCode = (int) HttpStatusCode.InternalServerError;
                errorResponse.Message = "Internal server error!";
                break;
        }
        _logger.LogError(exception.Message);
        var result = JsonSerializer.Serialize(errorResponse);
        await context.Response.WriteAsync(result);
    }
}
```

The custom middleware must be included in the Program.cs file.

```csharp 
app.UseMiddleware<ExceptionHandlingMiddleware>(); 
```

***

### What is Unit Testing?
* Unit Testing is a software design pattern that is used to test the smallest components in the software development phase.
* Unit Testing is used to validate the functionality which is to create expected output before going to the production environment and QA Team.
* It helps to detect issues at the early phase of the software development cycle
* There are many unit test tools that are already present while using .NET Framework like xUnit, NUnit, and many more.

***

### What is xUnit?

* xUnit is a free and open-source Unit testing framework for .NET development
* xUnit has many features which provide for writing a clean and good unit test case.
* It has many attributes like Fact, Theory, and many more to write test cases effectively and cleanly and also provides a mechanism to create our own attribute

***
### What are the attributes([Fact],[Theory]) of xUnit? 

[Fact] attribute is used by xUnit in .NET which identifies the method for unit test

```csharp
[Fact]
public void EvenNumberTest() {
    //Arrange
    var num = 6;
    //Act
    bool result = Mathematics.IsEvenNumber(num);
    //Assert
    Assert.True(result);
}
```

[Theory] attribute is used to supply parameters to the test method

```csharp
[Theory]
[InlineData(5)]
public void OddNumberTest(int num) {
    //Act
    bool result = Mathematics.IsOddNumber(num);
    //Assert
    Assert.True(result);
}
```

### What is the test pattern?

Arrange-Act-Assert is a great way to write clean and more readable unit test cases

**Arrange:** In the arrange section we setup and declare some inputs and configuration variable

**Act** In the Act section, we put main things and functionality like method calls, API calls, and something like that

**Assert** Assert checks expected outputs and check whether they will match our functional requirement or not

***
### What is Stub and Mock?
**Stub:** A stub object is a fake object used to test some unit of code without using a real object.
**Mock:** A mock object goes a bit further. When you use it in your unit test case, it checks that the system under test interacts with other objects as expected. It can check that a dependency was called with specific arguments or that a certain call didn’t happen.
The outcome of the unit test is then checked against the mock object.

***

### What is Moq?
Moq is a mocking framework for C#/.NET. The Moq framework is a set of interfaces that allow you to stub or mock your code for unit testing purposes.

### What are benefits of Moq?
* It is easy to set up a system under test 
* It is easier to unit test more complicated objects 
* It is easy to use and understand
* You can use it early in the development

***

### How to use Moq?

```csharp
public interface IBookService
{
    string GetISBNFor(string bookTitle);
    IEnumerable<string> GetBooksForCategory(string categoryId);
}

public interface IEmailSender
{
    public void SendEmail(string to, string subject, string body);
}

public class AccountService
{
    private IBookService _bookService;
    private IEmailSender _emailSender;
    public AccountService(IBookService bookService, IEmailSender emailSender)
    {
        _bookService = bookService;
        _emailSender = emailSender;
    }
    public IEnumerable<string> GetAllBooksForCategory(string categoryId)
    {
        var allBooks = _bookService.GetBooksForCategory(categoryId);
        return allBooks;
    }
    public string GetBookISBN(string categoryId, string searchTerm)
    {
        var allBooks = _bookService.GetBooksForCategory(categoryId);
        var foundBook = allBooks
                        .Where(x => x.ToUpper().Contains(searchTerm.ToUpper()))
                        .FirstOrDefault();
        if (foundBook == null)
        {
            return string.Empty;
        }
        return _bookService.GetISBNFor(foundBook);
    }
    public void SendEmail(string emailAddress, string bookTitle)
    {
        string subject = "Awesome Book";
        string body = $"Hi,\n\nThis book is awesome: {bookTitle}.\nCheck it out.";
        _emailSender.SendEmail(emailAddress, subject, body);
    }
}
```

We want to test these three methods, GetAllBooksForCategory, GetBookISBN, and SendEmail. The methods use the IBookService and IEmailSender dependency.

```csharp
public void GetAllBooksForCategory_returns_list_of_available_books()
{
    //1 Start by creating a new fake object using a generic Mock class.
    var bookServiceStub = new Mock<IBookService>();
    //2 We need to set up this mock instance to return a list of books when the GetBooksForCategory() 
    // is called  with the “UnitTesting” parameter.
    bookServiceStub
        .Setup(x => x.GetBooksForCategory("UnitTesting"))
        .Returns(new List<string>
        {
            "The Art of Unit Testing",
            "Test-Driven Development",
            "Working Effectively with Legacy Code"
        });
    //3 Pass the fake instance to the AccountService’s constructor by calling the Object property.
    var accountService = new AccountService(bookServiceStub.Object, null);
    IEnumerable<string> result = accountService.GetAllBooksForCategory("UnitTesting");
    Assert.Equal(3, result.Count());
}
```

***
### What is the difference between swagger and postman?

There are many differences between Postman and Swagger. Postman is a complete API development environment that helps you manage your APIs, while Swagger is just an API documentation tool. Postman has a built-in editor that lets you write tests and scripts for your APIs, while Swagger does not.

Postman also has a built-in console that lets you view your API request and response data in real-time, while Swagger does not. Finally, Postman has a paid version that gives you access to additional features, while Swagger does not.

***