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



- [How to ensure that Web API returns only JSON data?](#)

- [What is IAuthenticationFilter?](#)
- [How can we access configuration file in the project?](#)
- [How do we configure KeyVaults?](#)
- [How will we Authorize for deamon application?](#)
- [Different Authentication flows?](#)
- [How do we implement Global Exception Handling In ASP.NET Core Application](#)
- [Routing in ASP.NET Core](#)
- [How do we enable Session in ASP.NET Core](#)

- [Difference between patch and put?](#)
- [How do you know your APIs are RESTful?](#)

- [Different types of loading in Entity framework? when to use what?](#)
- [What are the types of Routing?](#)


- [Explain CRUD methods?](#)
- [What is JWT authentication?](#)
- [Authorization scopes in JWT?](#)
- [Where do we configure session?](#)
- [How do you achieve Authorization and Authentication?](#)
- [What is connect and disconnected architecture in ADO.Net?](#)
- [](#)
- [](#)
- [Difference between swagger and postman](#)
- [Unit Testing ](#)
- [What is the use of Moq?](#)



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

```C#
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

```C#
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

```C#
public void ConfigureServices(IServiceCollection services)  
{  
        services.AddMvc();  
}
```

**Configure()**: Configures the middleware pipeline that controls how the application processes the HTTP requests and sends the response. This method is also used to configure middleware in HTTP pipeline. This method accept IApplicationBuilder as a parameter. This method may accept some optional parameter such as IHostingEnvironment and ILoggerFactory. Whenever any service is added to ConfigureServices method, it is available to use in this method.

```C#
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

<details>
<summary>Code to add Middleware into Request Pipeline</summary>

```C#
public void Configure(IApplicationBuilder app, IHostingEnvironment env)
{
    app.UseMyMiddleware();
    app.Run(async (context) =>
    {
        await context.Response.WriteAsync("Hello World!");
    });
}
```
</details>


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
```C#
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

```C#
public class Startup{
   public Startup() { }
   public void Configure(IApplicationBuilder app, IHostingEnvironment env){
      app.Run(MyMiddleware);
   }
   private async Task MyMiddleware(HttpContext context){
      await context.Response.WriteAsync("Hello World! ");
   }
}
```
**Configure Multiple Middleware using Run()**

```C#
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

```C#
public void Configure(IApplicationBuilder app, IHostingEnvironment env){
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

```C#
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
        await context.Response.WriteAsync("Run Middleware3 Request Handled and Response Generated\n");
    });
} 
```
 *output*

 ```
 Use Middleware1 Incoming Request
 Use Middleware2 Incoming Request
 Run Middleware3 Request Handled and Response Generated
 Use Middleware2 Outgoing Response
 Use Middleware1 Outgoing Response
 ```

 [Read More](#https://dotnettutorials.net/lesson/run-next-use-methods-in-asp-net-core/)

 ***

### What is the use of "Map" extension while adding middleware?
Map extensions are used as convention for branching the pipeline.

The Map extension method is used to match request delegates based on a request’s path. Map simply accepts a path and a function that configures a separate middleware pipeline.

In the following example, any request with the base path of /maptest will be handled by the pipeline configured in the HandleMapTest method.

```C#
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

```C#
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

```C#
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

```C#
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

// Extension method used to add the middleware to the HTTP request pipeline.
public static class MyMiddlewareExtensions
{
    public static IApplicationBuilder UseMyMiddleware(this IApplicationBuilder builder)
    {
        return builder.UseMiddleware<MyMiddleware>();
    }
}
```

***
