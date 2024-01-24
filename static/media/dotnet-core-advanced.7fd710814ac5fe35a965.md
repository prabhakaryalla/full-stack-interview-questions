## .NET CORE Advanced Interview Questions & Answers

### Questions
- [How do we inject the service into the controller rather than constructor?](#how-do-we-inject-the-service-into-the-controller-rather-than-constructor)
- [How to ensure that Web API returns only JSON data?](#how-to-ensure-that-web-api-returns-only-json-data)
- [How to register multiple implementations of the same interface?](#how-to-register-multiple-implementations-of-the-same-interface)
- [What are Idempotent and Safe methods and how to use them?](#what-are-idempotent-and-safe-methods-and-how-to-use-them)
- [Difference between PUT and PATCH?](#difference-between-put-and-patch)
- [What are the different http response status codes?](#what-are-the-different-http-response-status-codes)
- [What is right way to use Http Client?](#what-is-right-way-to-use-http-client)
  // output of netstat is penidng
- [What are the multiple ways to use IHttpClientFactory?](#what-are-the-multiple-ways-to-use-ihttpclientfactory)
- [What is ETag](#what-is-etag)
- [How does Resource caching work with ETag?](#how-does-resource-caching-work-with-etag)
- [How do we configure KeyVaults?](#how-do-we-configure-keyvaults)
- [What is connect and disconnected architecture?](#what-is-connect-and-disconnected-architecture)
- [What are the different types of loading in Entity framework? when to use what?](#what-are-the-different-types-of-loading-in-entity-framework-when-to-use-what)
- [How to connect App Service with Azure SQL Database with Managed Identity?](#how-to-connect-app-service-with-azure-sql-database-with-managed-identity)



- [How to implement clean architecture in .Net 6?]
- [Difference between assembly and library?](#)
- [How do you know your APIs are RESTful?](#)
- [How will we Authorize for deamon application?](#)
- [Different Authentication flows?](#)
- [What is JWT authentication?](#)
- [Authorization scopes in JWT?](#)
- [How do you achieve Authorization and Authentication?](#)
- [What is IAuthenticationFilter?](#)

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
public interface IMoviment<T> where T : MovimentEnum 
{ 
    string Walk(); 
} 
```

This interface has three implementations, Cat, Dog, and Human class.
```csharp
public class Dog : IMoviment<Dog> { public string Walk() { return “Im a Dog, walking!”; } }
public class Cat : IMoviment<Cat> { public string Walk(){return “Im a Cat, walking!”; } }
public class Human : IMoviment<Human> { public string Walk() {return “Im a human, walking!”; } }
```

To register, add this code.
```csharp
builder.Services.AddScoped<IMoviment<Cat>,Cat>();
builder.Services.AddScoped<IMoviment<Dog>, Dog>();
builder.Services.AddScoped<IMoviment<Human>, Human>();
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
        case MovimentEnum.Cat:
            return movimentProvider.GetService<Cat>();
        case MovimentEnum.Dog:
            return movimentProvider.GetService<Dog>();
        case MovimentEnum.Human:
            return movimentProvider.GetService<Human>();
        default:
            return null;
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

***
### What are Idempotent and Safe methods and how to use them?

**Safe Methods:** 
 Safe methods aren’t expected to cause any side effects. These operations are read-only. E.g. querying a database.

**Idempotent Methods**
Idempotent methods guarantee that repeating a request has the same effect as making the request once.

Consider the following examples:

`` a = 4 ``

`` a++ ``

The first example is idempotent: no matter how many times we execute this statement, a will always be 4. The second example is not idempotent. Executing this 10 times will result in a different outcome as when running 5 times. Since both examples are changing the value of a, both are non-safe methods.

|HTTP Method|Idempotent|Safe|Operation|
|--|--|--|--|
|OPTIONS|yes|yes||
|GET|yes|yes|Retrieval or query.|
|HEAD|yes|yes||
|PUT|yes|no|Create or update resources. Partial updates are not allowed.|
|POST|no|no|Create or update resources. Partial updates are allowed.|
|DELETE|yes|no|Delete resources.|
|PATCH|no|no|For partial updates.|

**GET: Idempotent & Safe**
GET requests are used for retrieving information. These requests must be idempotent and safe: any operation invoked using GET must not alter the state of any resource.

```rest 
GET /books
```

To get a specific book,

```rest
GET /books/<title>
```

**POST: Non-Idempotent**
POST requests are not idempotent. They are used for creating new resources or updating existing ones. For example, suppose we have a resource called Student with the following attributes: name, college, major and gpa. To enroll a new student, we can use POST to create a new resource:

```rest
POST /students/ // Create a new student
{
  "name": "Michael Scarn",
  "college": "Stanford",
  "major": "computer science"
}
```

POST requests are allowed to perform partial updates. For example, to update the GPA of a student, we’ll make the POST request on the specific record (given by the student_id) and only supply the attribute we want to update:

```rest
POST /students/<student_id>
{
  "gpa": "3.9"
}
```
In the above example, if the student_id doesn’t exist, the application should return HTTP 404: Not Found error.

**PUT: Idempotent**
PUT requests are idempotent. This means that identical requests can be repeated multiple times, and the state of the resource on the server doesn’t change any further after the first request. PUT can be used to create a new resource or update an existing one. For updates, PUT requests must contain all the attributes of the resource, unlike POST requests which can have partial attributes. Here’s a PUT request to update a student’s GPA:

```rest
PUT /students/<student_id>
{
  "name": "Michael Scarn",
  "college": "Stanford",
  "major": "computer science",
  "gpa": "3.9"
}
```
In the above example, if the student_id in the PUT request doesn’t exist, the application may create a new record and assign it the student_id.

If you are wondering why PUT requests must have all the attributes and not just the one we want to update, consider the following hypothetical situation in which we allow partial updates in the PUT request. Suppose that a student is switching majors. The client issues two PUT requests: the first one to update student’s GPA for the existing major and a second request to update the major and reset the GPA. The PUT requests are made in the right order:

```rest
PUT /students/<student_id> //Partial update: Violates idempotency contract
{
  "gpa": "3.85"
}
```
```rest
PUT /students/<student_id> //Partial update: Violates idempotency contract
{
  "major": "engineering",
  "gpa": "0.0"
}
```

Assume that the request for the second requests arrives before the first one which is lost due to a network error. Because the client thinks that PUT requests are idempotent, it may retry the first request a second time, that will incorrectly update the student’s GPA to 3.85 for the new major, leaving the resource in an inconsistent state. It could be very hard to trace and breaks the idempotency contract: multiple invocation result in different states.

```rest
PUT /students/<student_id>
{
  "name": "Michael Scarn",
  "college": "Stanford",
  "major": "engineering",
  "gpa": "3.85" // GPA updated for the wrong major!
}
```

**DELETE: Idempotent**
DELETE requests are idempotent and are used for deleting a resource. One common confusion people have with DELETE calls is what type of HTTP status code to return on repeat calls. Some people assume that because DELETE is idempotent, it must always return the same HTTP status e.g. HTTP 200. This assumption is wrong. Although there is no harm in returning the same status code, if your use case requires it, returning a different status code like the HTTP 404: Not Found doesn’t violate the idempotency contract. Idempotency doesn’t concern itself with what is returned to the client. It refers to the state of some resource on the server. So it is perfectly valid to return HTTP 200: OK on the first delete call, and HTTP 404: Not Found on subsequent ones, since in both cases, the resource is deleted and its state isn’t changed on the server side. You might also use HTTP 204: No Content if the response body is empty.

**PATCH: Non-Idempotent**
I like to think of PATCH as the non-idempotent cousin of the PUT request. Because it is non-idempotent, it could be used partial updates:

```rest
PATCH /students/<student_id> //Partial update: OK
{
  "gpa": "3.85"
}
```

It is up to you whether you want to adopt PATCH for partial updates or use POST.

***
### Difference between PUT and PATCH?

PUT and PATCH both perform modifications on existing data, but they do so differently because of idempotency. PUT modifies a record's information and creates a new record if one is not available, and PATCH updates a resource without sending the entire body in the request.

***

### What are the different http response status codes?

**HTTP response status codes**
- Informational responses (100 – 199)
- Successful responses (200 – 299)
- Redirection messages (300 – 399)
- Client error responses (400 – 499)
- Server error responses (500 – 599)

Important Status Codes

|Status Code| Description|
|--|--|
|200 OK|Indicates that the request has succeeded.|
|201 Created|Indicates that the request has succeeded and a new resource has been created as a result.|
|202 Accepted|Indicates that the request has been received but not completed yet. It is typically used in log running requests and batch processing.|
|204 No Content|The server has fulfilled the request but does not need to return a response body. The server may return the updated meta information.|
|301 Moved Permanently|The URL of the requested resource has been changed permanently. The new URL is given by the Location header field in the response. This response is cacheable unless indicated otherwise.|
|302 Found|The URL of the requested resource has been changed temporarily. The new URL is given by the Location field in the response. This response is only cacheable if indicated by a Cache-Control or Expires header field.|
|304 Not Modified|Indicates the client that the response has not been modified, so the client can continue to use the same cached version of the response.|
|400 Bad Request|The request could not be understood by the server due to incorrect syntax. The client SHOULD NOT repeat the request without modifications.|
|401 Unauthorized|Indicates that the request requires user authentication information. The client MAY repeat the request with a suitable Authorization header field|
|403 Forbidden|Unauthorized request. The client does not have access rights to the content. Unlike 401, the client’s identity is known to the server.|
|404 Not Found|The server can not find the requested resource.|
|405 Method Not Allowed|The request HTTP method is known by the server but has been disabled and cannot be used for that resource.|
|500 Internal Server Error|The server encountered an unexpected condition that prevented it from fulfilling the request.|
|501 Not Implemented|The HTTP method is not supported by the server and cannot be handled.|

***
### What is right way to use Http Client?

**Common Issues When Using C# HttpClient**
Before we go any further, let's first understand the common issues when using HttpClient and how to uncover them even when running on your local machine without any load.

Below I have a code sample used to talk to an external API, in this case, a weather api, to fetch weather details for a given city. The code instantiates a new instance of HttpClient, makes a GET request to the external API and returns the JSON response.

```csharp
using(var httpClient = new HttpClient())
{
    string APIURL = $"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={cityName}";
    var response =  await httpClient.GetAsync(APIURL);
    return await response.Content.ReadAsStringAsync();
}
```
It works fine; happy days. Let's move on to the next feature!

**Socket Exhaustion**
But wait, let's take a second and fire up the command line. Let's see what's happening behind the scenes with the HttpClient and every execution of the above code.
We will use a popular command-line utility, netstat, to look at the network statistics.
Running ping api.weather.com returns the IP address we want - 185.190.83.2
Let’s use that to filter the records returned using the netstat command - netstat -ano | findstr 185.190.83.2

//image of the netstat 

Every request to the API endpoint opens a new connection to the external API. As shown in the image above, you can see more network connections when running the netstat command after making requests to our API endpoint. Even after the HttpClient connection is disposed, it leaves the network connections in a TIME_WAIT state.

The TIME_WAIT state means the connection is closed on one side (ours), but we''re still waiting to see if any additional packets come in because of a delay in the network connection.

These connections will eventually get closed after a timeout. However, as you can see, if there are many requests to the API, we can soon run of sockets to create (one per connection), and the application will throw an exception. The worst thing is such issues rarely happen in local development or testing unless you perform a load test on the application.

**DNS Changes Not Reflecting**
If creating a new instance for every request is bad, the first solution that comes to our mind is the Singleton Pattern.

```csharp
private static HttpClient _httpClient;

public WeatherForecastController(ILogger<WeatherForecastController> logger)
{
    _logger = logger;
    if(_httpClient == null)
        _httpClient =  new HttpClient();
}
```
We can create a new instance of HttpClient and not dispose of for the application lifetime. In this case, we reuse the HttpClient instance, and so only one connection is maintained. It works fine as long as there are no DNS or other network-level changes to the external API's connection. If it happens, we will have to restart our API application to create a new HttpClient instance.


**Use IHttpClientFactory To Create HttpClient**
Now that we know the issues let’s see how to fix this. The simplest way is to inject the IHttpClient Factory and create a new HttpClient instance from it.

```csharp
private readonly IHttpClientFactory _httpClientFactory;
public WeatherForecastController(IHttpClientFactory httpClientFactory)
{
     _httpClientFactory = httpClientFactory;
}

[HttpGet]
public async Task<string> Get(string cityName)
{
  var httpClient = _httpClientFactory.CreateClient();
    string APIURL = $"http://api.weatherapi.com/v1/current.json?key={API_KEY}&q={cityName}";
    ...
}
```
To enable Dependency Injection of the IHttpClientFactory instance we need to make sure to call services.AddHttpClient() method in ConfigureServices method of Startup.cs.

Using the IHttpClientFactory has several benefits, including managing the lifetime of the network connections. Using the factory to create the client reuses connection from a connection pool, thereby not creating too many sockets. The connections are reused and automatically disposed to avoid DNS level issues.


[Read More](#https://www.rahulpnath.com/blog/are-you-using-httpclient-in-the-right-way/)

***
### What are the multiple ways to use IHttpClientFactory?

There are several ways that you can use IHttpClientFactory in your application:
- Basic usage
- Named Clients
- Typed Clients
- Generated Clients

**Basic usage**
In Basic usage, IHttpClientFactory is directly injected into the controller or class that requires an HttpClient instance. It works perfectly fine.
However, often when we need to make connections to external services, we also need a set of associated configuration details like URL, secret keys, special request headers, etc. While you can inject the configuration setting and other information into the Controller, the container soon starts violating the Single Responsibility Principle (SRP).

**Named Clients**
When using Named clients, the HttpClient instance configurations can be specified while registering the service with the Dependency Injection container.Instead of just calling the services.AddHttpClient() method in Startup.cs, we can add a client with a name and associated configuration.

Below we have a client with the name 'weather,' and it also configures the BaseAddress to use for the client.

```csharp
services.AddHttpClient("weather", c =>
{
    c.BaseAddress = new Uri("http://api.weatherapi.com/v1/current.json");
})
```
In the Controller class, when we need to create a new HttpClient, we can use the name to create a specific client.

```csharp
var httpClient = _httpClientFactory.CreateClient("weather");
```
**Typed clients**
In the above code, we still need to hardcode the 'weather' string in the Controller and manually create a HttpClient ourselves.
To avoid calling the CreateClient method explicitly, we can use the Typed client pattern.
The external API calls are refactored into a separate class (WeatherService) for this pattern. This new class takes a dependency on the HttpClient directly, as shown below.

```csharp
public interface IWeatherService
{
    Task < string > Get(string cityName);
}

public class WeatherService: IWeatherService
{
    private HttpClient _httpClient;

    public WeatherService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task < string > Get(string cityName)
    {
        string APIURL = $ "?key={API_KEY}&q={cityName}";
        var response = await _httpClient.GetAsync(APIURL);
        return await response.Content.ReadAsStringAsync();
    }
}
```

When adding the new class, WeatherService to the Dependency Injection container, we can apply the relevant configuration, as shown below.

```csharp
services.AddHttpClient<IWeatherService,WeatherService>(c => {
      c.BaseAddress = new Uri("http://api.weatherapi.com/v1/current.json");
})
```
The Controller class can now use the WeatherService and call it to get back the relevant data, as shown below.

```csharp
public WeatherForecastController(IWeatherService weatherService)
{
    _weatherService = weatherService;
}

[HttpGet]
public async Task<string> Get(string cityName)
{
    return await _weatherService.Get(cityName);
}

```
By using IHttpClientFactory, we can solve all the initial issues that we saw with instantiating the HttpClient instance directly. After refactoring it to the Typed client consumption pattern, it is also well separated and easier to maintain. It drives us to write cleaner, loosely coupled code.

**Generated clients**
IHttpClientFactory can be used in combination with third-party libraries such as Refit. Refit is a REST library for .NET. It converts REST APIs into live interfaces. Call AddRefitClient to generate a dynamic implementation of an interface, which uses HttpClient to make the external HTTP calls.

***

### What is ETag?

ETag or an “Entity Tag” is a string which represents the “version” information of the data that the client has. The client passes this ETag to the server along with the request, so that the server knows what data the client currently holds.

If the Server finds that there is no new “version” of the data other than the one the client already has, it simply returns a status code “304 Not Modified”

On the other hand, if there is a new “version” of the data available, the server returns the updated data to the client. It also returns a new ETag which represents this new “version”, which the client then updates on its side. This cycle continues, thereby avoiding unnecessary response bandwidth for the API, which can improve server efficiency.

ETag solves two problems:

1. Unchanged resource caching
2. Mid-air edit collision detection

***
### How does Resource caching work with ETag?

The entire flow can be sequenced as below:

1. Client sends a request to the server for some data
2. Server returns an ETag for a specific version of a resource in the response header “ETag”
3. Client stores the ETag value and
4. Client passes ETag for the successive API calls for the same resource under the request header “If-None-Match”
5. Server extracts the ETag from the request and it matches this with the computed value from the resource that is currently available
    - 6a. If both the tags match, the data is unchanged – server sends an empty response with StatusCode 304 (Not Modified) 
    - 7a. Client can then use the same data for a little longer duration
    - 6b. If the tags don’t match, the data is changed – server sends the new data with a new ETag computed in the response header.    
    - 7b. Client updates its ETag and uses the new data it received.

[Source](#https://referbruv.com/blog/implementing-a-simple-etag-for-response-caching-efficiency-in-an-aspnet-core-api/)

***
### How do we configure KeyVaults?

To enable the use of Azure Key Vault you need to install below packages.

```cmd
PM> Install-Package Microsoft.Extensions.Configuration.AzureKeyVault
```

Implementation

1. Register a service inside the Program class

```cSharp
using Microsoft.Extensions.Configuration.AzureKeyVault;
var builder = WebApplication.CreateBuilder(args);
// Add services to the container.
builder.Host.ConfigureAppConfiguration((context, config) => {
    var settings = config.Build();
    var keyVaultURL = settings["KeyVaultConfiguration:KeyVaultURL"];
    var keyVaultClientId = settings["KeyVaultConfiguration:ClientId"];
    var keyVaultClientSecret = settings["KeyVaultConfiguration:ClientSecret"];
    config.AddAzureKeyVault(keyVaultURL, keyVaultClientId, keyVaultClientSecret, new DefaultKeyVaultSecretManager());
});
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment()) {
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();
```

2. Save Key Vault settings in the appsettings.json file
```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Information",
            "Microsoft.AspNetCore": "Warning"
        }
    },
    "AllowedHosts": "*",
    "KeyVaultConfiguration": {
        "KeyVaultURL": "",
        "ClientId": "",
        "ClientSecret": ""
    }
}
```
3. Read settings in Controller

[Source](#https://www.c-sharpcorner.com/article/azure-key-vault-configuration-and-implementation-using-net-core-7-web-api/)

***

### What is connect and disconnected architecture?

In C#, we work in two different ways with database connectivity. We use two C# objects, first one is DataSet and other one is DataReader. 

**DataSet**

It is a type of disconnected architecture. Disconnected architecture means, you don’t need to connect always when you want to get data from the database. You can get data from dataset; basically DataSet is a collection of datatables. We can store the database table, view data in the DataSet and can also store the xml value in dataset and get it if required.

To achieve this you need to use DataAdapter which work as a mediator between Database and DataSet.

Example:
```csharp
public DataSet GetEmployeeData()  
{  
    SqlConnection conString = new SqlConnection("myconnection");  
    conString.Open();  
    SqlCommand cmdQuery = new SqlCommand("Select * from Employee", conString);  
    SqlDataAdapter sda = new SqlDataAdapter(cmdQuery);  
    DataSet dsData = new DataSet();  
    sda.Fill(dsData);  
    return dsData;  
} 
```

**DataReader**
It is a connected architecture, which means when you require  data from the database you need to connect with database and fetch the data from there. You can use if you need updated data from the database in a faster manner. DataReader is Read/Forward only that means we can only get the data using this but we cannot update or insert the data into the database. It fetches the record one by one.

Example:
```csharp
static void HasRows(SqlConnection connection)  
{  
    using (connection)  
    {  
        SqlCommand command = new SqlCommand("SELECT CategoryID, CategoryName FROM Categories;",connection);  
        connection.Open();  
        SqlDataReader reader = command.ExecuteReader();  
        if (reader.HasRows)  
        {  
            while (reader.Read())  
            {  
                Console.WriteLine("{0}\t{1}", reader.GetInt32(0),reader.GetString(1));  
            }  
        }  
        else  
        {  
            Console.WriteLine("No rows found.");  
        }  
        reader.Close();  
    }  
}
```
***

### What are the different types of loading in Entity framework? when to use what?
**Eager Loading**
Eager Loading helps you to load all your needed entities at once; i.e., all your child entities will be loaded at single database call.
```csharp
    User usr = dbContext.Users.Include(a => a.UserDetails).FirstOrDefault(a => a.UserId == userId);   
```
If you have multiple level of child entities, then you can load, using the query given below. 
```csharp
    User usr = dbContext.Users.Include(a => a.UserDetails.Select(ud => ud.Address))
                  .FirstOrDefault(a => a.UserId == userId);   
```
**Lazy Loading**
It is the default behavior of an Entity Framework, where a child entity is loaded only when it is accessed for the first time. It simply delays the loading of the related data, until you ask for it.

```csharp
User usr = dbContext.Users.FirstOrDefault(a => a.UserId == userId);  
```

It will only be loaded when you explicitly call for it, as shown below. 
```csharp
UserDeatils ud = usr.UserDetails; // UserDetails are loaded here 
```

**Explicit Loading**
here are options to disable Lazy Loading in an Entity Framework. After turning Lazy Loading off, you can still load the entities by explicitly calling the Load method for the related entities. There are two ways to use Load method Reference (to load single navigation property) and Collection (to load collections), as shown below. 

```csharp
User usr = dbContext.Users.FirstOrDefault(a => a.UserId == userId);  
dbContext.Entry(usr).Reference(usr => usr.UserDetails).Load();  
```

**When to use what**
1. Use Eager Loading when the relations are not too much. Thus, Eager Loading is a good practice to reduce further queries on the Server.
2. Use Eager Loading when you are sure that you will be using related entities with the main entity everywhere.
3. Use Lazy Loading when you are using one-to-many collections.
4. Use Lazy Loading when you are sure that you are not using related entities instantly.
5. When you have turned off Lazy Loading, use Explicit loading when you are not sure whether or not you will be using an entity beforehand.

***

### How to connect App Service with Azure SQL Database with Managed Identity?

A managed identity from Azure Active Directory (Azure AD) allows your app to easily access other Azure AD-protected resources such as Azure Key Vault or Azure SQL. The identity is managed by the Azure platform and does not require you to provision or rotate any secrets.

We have two types of Managed Identities:
 - System-assigned Identity
 - User-assigned Identity


**1.**  You can create an App Service or an Azure Function and use the code example below to retrieve the token using the Azure Identity client library via System-assigned identity

```csharp
var conn = (System.Data.SqlClient.SqlConnection)Database.Connection;
var credential = new Azure.Identity.DefaultAzureCredential();
var token = credential.GetToken(new Azure.Core.TokenRequestContext(new[] { "https://database.windows.net/.default" }));
conn.AccessToken = token.Token;
```

If you are using User-assigned Identity you would need to tweak the code as below. You can read about DefaultAzureCredential()

```csharp
string userAssignedClientId = ""; //Give Client ID of User Managed Identity
var conn = new SqlConnection(connectionString);
var credential = new Azure.Identity.DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = userAssignedClientId });
var token = credential.GetToken(new Azure.Core.TokenRequestContext(new[] { "https://database.windows.net/.default"}));
conn.AccessToken = token.Token;
```

**2.** You can remove the User ID / Password from the connection string:

```csharp
Server=tcp:<AzSQLDBName>.database.windows.net,1433;Initial Catalog=<DBName>
```

**3.** Create a System Identity or User-Managed Identity and assign it to app service as per requirement.

**4.** Create a System Identity or User-Managed Identity and assign it to app service as per requirement.

- If the identity is system-assigned, the name is always the same as the name of your App Service app.
- If the identity is user-assigned the name is the Managed Identity resource rather than the site name.

```sql
CREATE USER [<identity-name>] FROM EXTERNAL PROVIDER;
ALTER ROLE db_datareader ADD MEMBER [<identity-name>];
ALTER ROLE db_datawriter ADD MEMBER [<identity-name>];
ALTER ROLE db_ddladmin ADD MEMBER [<identity-name>];
GO
```

**5.** You can fetch the token and connect to the database using managed identity.


**Detailed steps for MVC application**

1. create a new project and install a few packages.

```cmd
mkdir PLSQLManagedIdentity
cd PLSQLManagedIdentity
dotnet new mvc
dotnet add package Microsoft.EntityFrameworkCore.SqlServer
dotnet add package Azure.Identity
dotnet add package Microsoft.Data.SqlClient
```

2. Next add the class CustomAzureSqlAuthProvider to your project

```csharp
 public class CustomAzureSqlAuthProvider : SqlAuthenticationProvider
    {

        private static readonly string[] AzureSqlScopes =
        {
            "https://database.windows.net/.default"
        };

        private static readonly TokenCredential Credential = new DefaultAzureCredential(new DefaultAzureCredentialOptions { ManagedIdentityClientId = "23370fac-49ba-4aeb-b457-96fd4ef87456" });
        // Here ManagedIdentityClientId is Appid of User Managed Identity
        // We can get it by using below CloudShell commands
        //Connect-AzureAD
        // Get-AzureADServicePrincipal -SearchString <nameofUserManagedIdn=enity>


        public override async Task<SqlAuthenticationToken> AcquireTokenAsync(SqlAuthenticationParameters parameters)
        {
            var tokenRequestContext = new TokenRequestContext(AzureSqlScopes);
            var tokenResult = await Credential.GetTokenAsync(tokenRequestContext, default);

            return new SqlAuthenticationToken(tokenResult.Token, tokenResult.ExpiresOn);
        }

        public override bool IsSupported(SqlAuthenticationMethod authenticationMethod)
        {
            return authenticationMethod.Equals(SqlAuthenticationMethod.ActiveDirectoryManagedIdentity);
        }
    }
```

3. Add CustomerContext, Customer Classes

```csharp
    public class CustomerContext : DbContext
    {
        public CustomerContext()
        {
        }

        public CustomerContext(DbContextOptions<CustomerContext> options)
            : base(options)
        {
            var customers = new[]
            {
                new Customer
                {
                    Id = Guid.Parse("9f35b48d-cb87-4783-bfdb-21e36012930a"),
                    FirstName = "Wolfgang",
                    LastName = "Ofner",
                    Birthday = new DateTime(1989, 11, 23),
                    Age = 30
                },
                new Customer
                {
                    Id = Guid.Parse("654b7573-9501-436a-ad36-94c5696ac28f"),
                    FirstName = "Darth",
                    LastName = "Vader",
                    Birthday = new DateTime(1977, 05, 25),
                    Age = 43
                },
                new Customer
                {
                    Id = Guid.Parse("971316e1-4966-4426-b1ea-a36c9dde1066"),
                    FirstName = "Son",
                    LastName = "Goku",
                    Birthday = new DateTime(1937, 04, 16),
                    Age = 83
                }
            };

            Customer.AddRange(customers);
            SaveChanges();
        }

        public DbSet<Customer> Customer { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("ProductVersion", "2.2.6-servicing-10079");

            modelBuilder.Entity<Customer>(entity =>
            {
                entity.Property(e => e.Id);

                entity.Property(e => e.Birthday);

                entity.Property(e => e.FirstName).IsRequired();

                entity.Property(e => e.LastName).IsRequired();
            });
        }
    }

    public class Customer
    {
        public Guid Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime? Birthday { get; set; }

        public int? Age { get; set; }
    }

```

4. Add dbcontext in Program.cs 

```csharp
builder.Services.AddDbContext<CustomerContext>(options =>
{
    SqlAuthenticationProvider.SetProvider(
        SqlAuthenticationMethod.ActiveDirectoryManagedIdentity,
        new CustomAzureSqlAuthProvider());
    var sqlConnection = new SqlConnection(builder.Configuration.GetConnectionString("CustomerDatabase"));
    options.UseSqlServer(sqlConnection);
});

```
5. Add connection string in appsettings

```json
{
"ConnectionStrings": {
    "CustomerDatabase": "Server=tcp:eydemo01.database.windows.net,1433;Database=testdb;Authentication=Active Directory Managed Identity"
  }
}
```

6. Call the CustomerContext in any controller. on CustomerContext constructor we are adding sample records in sql.

----

