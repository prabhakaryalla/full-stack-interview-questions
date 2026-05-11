<details><summary><b>You need to execute a stored procedure that returns multiple result sets. How can you handle this in Entity Framework?</b></summary>
Entity Framework Core does not provide built-in support to directly map multiple result sets from a stored procedure to entities or DTOs. To handle stored procedures returning multiple result sets, you need to use the underlying ADO.NET DbDataReader by accessing the database connection from the EF Core DbContext. This allows you to execute the stored procedure, read each result set sequentially, and manually map the data to your entity or DTO classes.

**Steps to Handle Multiple Result Sets in EF Core**

Obtain the database connection from the EF Core DbContext.  
Create a DbCommand to execute the stored procedure.  
Open the connection if it is not already open.  
Execute the command using ExecuteReaderAsync() to get a DbDataReader.  
Read the first result set and map it to a list of entities or DTOs.  
Call NextResultAsync() on the reader to move to the next result set.  
Read the second result set and map it similarly.  
Close the reader and connection when done.  
<details><summary><em>Example</em></summary>

``` csharp
using (var context = new YourDbContext())
{
    var connection = context.Database.GetDbConnection();
    await connection.OpenAsync();

    using (var command = connection.CreateCommand())
    {
        command.CommandText = "GetCustomersAndOrders"; // Stored procedure name
        command.CommandType = System.Data.CommandType.StoredProcedure;

        using (var reader = await command.ExecuteReaderAsync())
        {
            // Read first result set: Customers
            var customers = new List<Customer>();
            while (await reader.ReadAsync())
            {
                customers.Add(new Customer
                {
                    CustomerId = reader.GetInt32(0),
                    CustomerName = reader.GetString(1),
                    City = reader.GetString(2)
                });
            }

            // Move to second result set: Orders
            await reader.NextResultAsync();

            var orders = new List<Order>();
            while (await reader.ReadAsync())
            {
                orders.Add(new Order
                {
                    OrderId = reader.GetInt32(0),
                    CustomerId = reader.GetInt32(1),
                    OrderDate = reader.GetDateTime(2),
                    TotalAmount = reader.GetDecimal(3)
                });
            }

            // Use customers and orders lists as needed
        }
    }
}
```
***Notes***

Replace YourDbContext, Customer, and Order with your actual context and entity/DTO classes.
The stored procedure GetCustomersAndOrders should return two result sets, e.g., customers and orders.  
Manual mapping is required for each result set.  
Ensure proper connection and reader disposal.  
</details>
<hr/>
</details>

<details><summary><b>You want to implement a soft delete mechanism in your EF Core application. How would you design this, and how would you ensure queries exclude soft-deleted records by default?</b></summary>
Soft delete is a technique where instead of physically deleting a record from the database, you mark it as deleted using a flag (e.g., IsDeleted boolean column). This allows you to retain the data for auditing or recovery purposes. In EF Core, you can implement soft delete by adding an IsDeleted property to your entities and configuring a global query filter to automatically exclude soft-deleted records from all queries by default. Additionally, you override the SaveChanges method to intercept delete operations and convert them into updates that set the IsDeleted flag to true.

**Steps to Implement Soft Delete in EF Core**

Add an IsDeleted property to your entity classes.  
Configure a global query filter in your DbContext to exclude entities where IsDeleted is true. 
Override the SaveChanges and SaveChangesAsync methods to intercept delete operations and set IsDeleted = true instead of physically deleting the record.  
Optionally, provide a way to query including soft-deleted records by disabling the global filter.  
<details><summary><em>Example</em></summary>

``` csharp
// 1. Entity with IsDeleted property
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
    public bool IsDeleted { get; set; }  // Soft delete flag
}

// 2. DbContext with global query filter and override SaveChanges
public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Global query filter to exclude soft-deleted records
        modelBuilder.Entity<Product>().HasQueryFilter(p => !p.IsDeleted);
    }

    public override int SaveChanges()
    {
        foreach (var entry in ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Deleted && e.Entity is Product))
        {
            // Convert delete operation to update IsDeleted flag
            entry.State = EntityState.Modified;
            ((Product)entry.Entity).IsDeleted = true;
        }

        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        foreach (var entry in ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Deleted && e.Entity is Product))
        {
            entry.State = EntityState.Modified;
            ((Product)entry.Entity).IsDeleted = true;
        }

        return await base.SaveChangesAsync(cancellationToken);
    }
}
```

**Notes**

The global query filter ensures that all queries exclude soft-deleted records by default. 
Overriding SaveChanges intercepts delete operations and marks the entity as deleted instead. 
You can extend this pattern to a base entity class or interface if multiple entities require soft delete.  
To query including soft-deleted records, use .IgnoreQueryFilters() in your LINQ queries.  
</details>
<details><summary><em>Global soft delete Example</em></summary>

``` csharp
//1. Define a Soft Delete Interface
public interface ISoftDelete
{
    bool IsDeleted { get; set; }
}

//2. Implement the Interface in Your Entities
public class Product : ISoftDelete
{
    public int Id { get; set; }
    public string Name { get; set; }
    bool IsDeleted { get; set; }
}

public class Customer : ISoftDelete
{
    public int Id { get; set; }
    public string FullName { get; set; }
    public bool IsDeleted { get; set; }
}

//3. Configure Global Query Filters in DbContext
public class AppDbContext : DbContext
{
    public DbSet<Product> Products { get; set; }
    public DbSet<Customer> Customers { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        // Apply global query filter for all entities implementing ISoftDelete
        foreach (var entityType in modelBuilder.Model.GetEntityTypes())
        {
            if (typeof(ISoftDelete).IsAssignableFrom(entityType.ClrType))
            {
                var parameter = Expression.Parameter(entityType.ClrType, "e");
                var propertyMethodInfo = typeof(EF).GetMethod("Property").MakeGenericMethod(typeof(bool));
                var isDeletedProperty = Expression.Call(propertyMethodInfo, parameter, Expression.Constant("IsDeleted"));
                var compareExpression = Expression.Equal(isDeletedProperty, Expression.Constant(false));
                var lambda = Expression.Lambda(compareExpression, parameter);

                modelBuilder.Entity(entityType.ClrType).HasQueryFilter(lambda);
            }
        }
    }

    public override int SaveChanges()
    {
        SoftDeleteEntities();
        return base.SaveChanges();
    }

    public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
    {
        SoftDeleteEntities();
        return await base.SaveChangesAsync(cancellationToken);
    }

    private void SoftDeleteEntities()
    {
        foreach (var entry in ChangeTracker.Entries()
            .Where(e => e.State == EntityState.Deleted && e.Entity is ISoftDelete))
        {
            entry.State = EntityState.Modified;
            ((ISoftDelete)entry.Entity).IsDeleted = true;
        }
    }
}
```

***Explanation***

The global query filter excludes all entities where IsDeleted is true.  
The overridden SaveChanges methods intercept delete operations and mark entities as soft deleted instead.  
This approach works for all entities implementing ISoftDelete without needing to configure each entity individually.
</details>
<hr/>
</details>

<details><summary><b>Explain the difference between Include() and ThenInclude() in EF Core. Provide an example of when to use each.
</b></summary>
In Entity Framework Core, Include() and ThenInclude() are used for eager loading of related entities to avoid lazy loading or multiple queries.

Include() is used to specify the first level of related data to include in the query result.
ThenInclude() is used to specify additional levels of related data after an Include(), enabling you to load nested related entities.

Use Include() to load a direct navigation property, and use ThenInclude() to load further related entities from the previously included navigation.

**When to Use**

Use Include() when you want to load a related entity or collection directly related to the main entity.  
Use ThenInclude() when you want to load entities related to the entities loaded by the previous Include().  

<details><summary><em>Example</em></summary>

``` csharp
public class Order
{
    public int Id { get; set; }
    public Customer Customer { get; set; }
    public ICollection<OrderItem> OrderItems { get; set; }
}

public class Customer
{
    public int Id { get; set; }
    public Address Address { get; set; }
}

public class OrderItem
{
    public int Id { get; set; }
    public Product Product { get; set; }
}

public class Address
{
    public int Id { get; set; }
    public string City { get; set; }
}

public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }
}


Example Usage
csharpvar orders = context.Orders
    // Include Customer (first level)
    .Include(o => o.Customer)
        // ThenInclude Customer's Address (second level)
        .ThenInclude(c => c.Address)
    // Include OrderItems (first level)
    .Include(o => o.OrderItems)
        // ThenInclude Product of each OrderItem (second level)
        .ThenInclude(oi => oi.Product)
    .ToList();
```

***Explanation***

Include(o => o.Customer) loads the Customer related to each Order.  
ThenInclude(c => c.Address) loads the Address related to each Customer.  
Include(o => o.OrderItems) loads the collection of OrderItems for each Order.  
ThenInclude(oi => oi.Product) loads the Product related to each OrderItem.  

This way, you eagerly load multiple levels of related data in a single query.
</details>
<hr/>
</details>

<details><summary><b>Explain the difference between AsNoTracking() and the default tracking behavior in EF. What are the implications for performance and change tracking?</b></summary>
In Entity Framework (EF), tracking refers to the context's ability to keep track of changes made to entities after they are retrieved from the database. By default, EF tracks entities, which enables features like automatic change detection and updates when SaveChanges() is called.

***Default Tracking Behavior***: EF tracks all entities retrieved via queries, monitoring their state (Added, Modified, Deleted, Unchanged). This allows EF to detect changes and persist them back to the database.  
***AsNoTracking() Behavior***: When you use AsNoTracking(), EF does not track the entities returned by the query. These entities are read-only from EF’s perspective and are not monitored for changes.

**When to Use**

Use default tracking when you plan to modify entities and save changes back to the database.  
Use AsNoTracking() for read-only queries, reporting, or scenarios where you do not need to update the entities, to improve query performance and reduce memory usage.  


<details><summary><em>Example</em></summary>

``` csharp
// Default tracking (entities tracked)
var trackedProducts = context.Products
    .Where(p => p.IsActive)
    .ToList();

// No tracking (entities not tracked)
var readOnlyProducts = context.Products
    .AsNoTracking()
    .Where(p => p.IsActive)
    .ToList();
```

***Summary***
Using AsNoTracking() can significantly improve performance for read-only queries by avoiding the overhead of change tracking, especially when dealing with large result sets or complex queries. However, if you need to update entities, tracking is necessary to detect and persist changes.
Would you like me to provide examples of scenarios where AsNoTracking() is particularly beneficial?Regenerate
</details>
<hr/>
</details>

<details><summary><b>What are shadow properties in Entity Framework Core? Give an example of when you might use them.</b></summary>
Shadow properties in Entity Framework Core are properties that are not defined in your entity class but are defined directly in the EF Core model. These properties exist only in the EF Core change tracker and the database schema but are invisible in your CLR classes. Shadow properties are useful when you want to store additional data in the database related to an entity without cluttering your domain classes with extra properties.

**When to Use Shadow Properties**

To store metadata such as timestamps, user IDs, or soft delete flags without modifying the entity class.  
When you want to keep your domain model clean and free from persistence concerns.  
To track audit information like CreatedBy, CreatedDate, ModifiedBy, ModifiedDate without adding these to every entity class.  


<details><summary><em>Example</em></summary>

Simple Code Example

```csharp
//1. Define an entity without the shadow property
public class Blog
{
    public int BlogId { get; set; }
    public string Url { get; set; }
}

//2. Configure the shadow property in OnModelCreating
protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Blog>()
        .Property<DateTime>("LastUpdated"); // Shadow property
}

//3. Use the shadow property in code
using (var context = new BloggingContext())
{
    var blog = new Blog { Url = "https://example.com" };
    context.Blogs.Add(blog);

    // Set shadow property value
    context.Entry(blog).Property("LastUpdated").CurrentValue = DateTime.UtcNow;

    context.SaveChanges();
}

//4. Query using shadow property
var recentBlogs = context.Blogs
    .Where(b => EF.Property<DateTime>(b, "LastUpdated") > DateTime.UtcNow.AddDays(-7))
    .ToList();
```

***Explanation***

The LastUpdated property is not part of the Blog class but exists in the EF Core model.  
You set and get the shadow property value via the Entry API or EF.Property<T>() method.  
The shadow property is mapped to a column in the database and can be used in queries and updates.

</details>
<hr/>
</details>

<details><summary><b>How does Entity Framework handle concurrency conflicts? What strategies can you use to resolve them?</b></summary>
Entity Framework (EF) handles concurrency conflicts when multiple users or processes attempt to update the same data in the database simultaneously. EF uses optimistic concurrency control by default, which means it assumes conflicts are rare and checks for conflicts only when saving changes.  
When a concurrency conflict occurs (i.e., the data in the database has changed since it was loaded), EF throws a DbUpdateConcurrencyException. To resolve concurrency conflicts, you can use several strategies:

* **Client Wins (Overwrite)**: The client’s changes overwrite the database values.  
* **Store Wins (Discard)**: The client discards changes and reloads the current database values.  
* **Merge**: Manually merge client and database values.  
* **Retry**: Retry the operation after resolving conflicts.  


***How EF Detects Concurrency Conflicts***

Use a concurrency token property in your entity, typically a RowVersion or Timestamp column.
EF includes this token in the WHERE clause of the UPDATE or DELETE statement.
If no rows are affected (because the token changed), EF detects a concurrency conflict.
<details><summary><em>Example</em></summary>

```csharp
//1. Define an entity with a concurrency token
public class Product
{
    public int Id { get; set; }
    public string Name { get; set; }

    [Timestamp] // Concurrency token attribute
    public byte[] RowVersion { get; set; }
}

//2. Handling concurrency conflict in code
try
{
    using (var context = new AppDbContext())
    {
        var product = await context.Products.FindAsync(1);
        product.Name = "Updated Name";

        await context.SaveChangesAsync();
    }
}
catch (DbUpdateConcurrencyException ex)
{
    foreach (var entry in ex.Entries)
    {
        if (entry.Entity is Product)
        {
            var databaseValues = await entry.GetDatabaseValuesAsync();
            if (databaseValues == null)
            {
                Console.WriteLine("The entity was deleted by another user.");
            }
            else
            {
                var databaseProduct = (Product)databaseValues.ToObject();

                // Example: Client Wins strategy
                entry.OriginalValues.SetValues(databaseValues);
                await context.SaveChangesAsync();

                // Or: Store Wins strategy - refresh client values
                // entry.CurrentValues.SetValues(databaseValues);
            }
        }
    }
}
```

***Explanation***

The [Timestamp] attribute marks RowVersion as a concurrency token.  
EF includes RowVersion in the WHERE clause to detect conflicts.  
When a conflict occurs, DbUpdateConcurrencyException is thrown.  
You can retrieve the current database values and decide how to resolve the conflict.  
The example shows how to implement Client Wins by updating the original values and retrying save.  

</details>
<hr/>
</details>
<details><summary><b>Can you explain the concept of query splitting in EF Core and when it might be beneficial?</b></summary>
Query splitting in EF Core is a technique where a query with multiple related entities (Include calls) is executed as multiple separate SQL queries instead of one large join query. This helps avoid the "cartesian explosion" problem caused by joining multiple collections, improving performance and reducing memory usage when loading complex object graphs.
You enable query splitting by using the .AsSplitQuery() method on your query.
<details><summary><em>Example</em></summary>

```csharp
var blogs = context.Blogs
    .Include(b => b.Posts)
    .Include(b => b.Authors)
    .AsSplitQuery()  // Enables query splitting
    .ToList();
```

***Steps***

* Write your query with multiple Include() calls to load related data.
* Add .AsSplitQuery() to instruct EF Core to execute separate queries for each included navigation.
* Execute the query as usual (ToList(), ToListAsync(), etc.).
* EF Core combines the results in memory, avoiding large join queries.


***When to Use***

When loading multiple collections or complex related data causes performance issues due to large join queries.  
When you want to reduce data duplication and memory overhead from cartesian product results.  
Useful for large data sets with multiple includes.  
</details>
<hr/>
</details>