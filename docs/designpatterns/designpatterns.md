- [What are Design Patterns?](#what-are-design-patterns)
- [What are the types of Design Patterns?](#what-are-the-types-of-design-patterns)
- [What is Singleton Design Pattern?](#what-is-singleton-design-pattern)
- [Why is singleton class sealed?](#why-is-singleton-class-sealed)
- [How to handle Thread Safety in Singleton?](#how-to-handle-thread-safety-in-singleton)
- [What is the difference between Lazy and Eager Initialization?](#what-is-the-difference-between-lazy-and-eager-initialization)
- [How to implement Eager Loading in Singleton?](#how-to-implement-eager-loading-in-singleton)
- [How to implement Lazy Loading in Singleton?](#how-to-implement-lazy-loading-in-singleton)
- [What is the difference between Singleton and Static class?](#what-is-the-difference-between-singleton-and-static-class)
- [How to implement Exception Logging using Singleton Design Pattern?](#how-to-implement-exception-logging-using-singleton-design-pattern)
- [What is Factory Design Pattern?](#what-is-factory-design-pattern)
- [How to implement Factory Method Pattern?](#how-to-implement-factory-method-pattern)
- [What is Abstract Factory Design Pattern?](#what-is-abstract-factory-design-pattern)


-------------

### What are Design Patterns?

- Design Patterns are eveolved as resusable solutions to the problems that we encounter every day of programming.
- They are generally targetted at solving the problems of object generation and integration.
- These generalized patterns act as template that can be applied to the real-world problems.

----

### What are the types of Design Patterns?

There are three types of Design Patterns

- **Creational:** This type deals with the object creation and initilization. This pattern gives the program more flexibility in deciding which objects needs to be created for a given case.

Eg: Singleton, Factory, Abstract Factory etc.,

- **Structural:** This type deals with the class and object composition. This pattern focuses on decoupling interface and implementation of classes and its objects.

Eg: Adapter, Bridge, etc., 

- **Behavioural:** This type deals with the communication between classes and objects.

Eg: Chain of Responsibility, Command, Interpreter, etc.

----

### What is Singleton Design Pattern?

Singleton Design Pattern belongs to creational Type pattern.

This patten is used when we need to ensure that only one object of a particular class need to be created. All further references to the objects are referred to the same underlying instance created.

***Advantages***
- Singleton controls concurrent access to the resource.
- It ensures there is only one object available across the application in a controlled state.

```csharp
/*
 * Selaed restricts inheritance
 */
public sealed class Singleton
{
    private static Singleton instance = null;
    /* 
     * Private constructor ensures that object is not 
     * instantiated other than within the class itself
     */
    private Singleton() { }
    public static Singleton GetInstance
    {
        get
        {
            if (instance == null)
                instance = new Singleton();
            return instance;
        }          
    }
    public void PrintDetails(string message)
    {
        Console.WriteLine(message);
    }
}
```
---

### Why is singleton class sealed?

We know If a class has one or more private constructor and no public constructor then other classes are not allowed to create instance of this class; this means you can neither create the object of the class nor can it be inherited by other classes

But consider like we are having nested class inside the singleton class and that class can be inherit the singleton class if we dont declare singleton class as sealed.

```csharp
public class Singleton
{
    private static Singleton instance = null;
    private Singleton() { }
    public class DerivedSingleton : Singleton { }
    .............
}
Singleton.DerivedSingleton derivedSingleton = new Singleton.DerivedSingleton();
derivedSingleton.PrintDetails("From Derived");
```

When we create an object of DerivedSingleton another instance of Singleton class is also created first which we dont need it(which invokes the private constructor of Singleton class) . This violates the singleton design pattern. 

Private constructor helps in prevents an external instantiation of objects and Sealed will prevent the class inheritance

---

### How to handle Thread Safety in Singleton?

Consider in multi threaded environment if we are invoking the Singleton class as show below

```csharp
public static void Main(string[] args)
{
    Parallel.Invoke(
        () => PrintEmployeeDetails(),
        () => PrintStudentDetails()
       );
    Console.ReadLine();
}
private static void PrintStudentDetails()
{
    Singleton studentSingleton = Singleton.GetInstance;
    studentSingleton.PrintDetails("Student Singleton");
}
private static void PrintEmployeeDetails()
{
    Singleton employeeSingleton = Singleton.GetInstance;
    employeeSingleton.PrintDetails("Employe Singleton");
}
```

```csharp
public sealed class Singleton
{
    private static int count = 0;
    private static Singleton instance = null;
    private Singleton() 
    {
        count++;
        Console.WriteLine(count.ToString());        
    }
    --------
}
```

When we run the above application the count is printed as 2. In multithreaded environemnt, when GetInstance is invoked in parallel, we are ending up in creating two instances of Singleton class. This violates the singleton principle.


we can use lock as shown below, so that only one instance is created.

```csharp

private static readonly object obj = new object();

public static Singleton GetInstance
{
    get
    {
        if (instance == null)
        {
            lock(obj)
            {
                if (instance == null)
                    instance = new Singleton();
            }

        }               
        return instance;
    }          
}
```

locks are expensive and we should use minimal, so we are using double checked locking.

-----

### What is the difference between Lazy and Eager Initialization?

**Lazy Loading**
- Improves the performance
- Avoids unnecessary load till the point object is accessed.
- Reduces the memory footprint on the start-up.
- Faster application load

**Non-Lazy or Eager Loading**
- Pre-Instantiation of the object
- Commonly used in lower memory footprints

----

### How to implement Eager Loading in Singleton?

```csharp
private static readonly Singleton instance = new Singleton();
public static Singleton GetInstance
{
    get
    {
        return instance;
    }          
}
```

CLR take cares of variable initilization and its thread safety. Hence we dont need to write any explicit code to handle the thread safety.

---

### How to implement Lazy Loading in Singleton?

```csharp
private static readonly Lazy<Singleton> instance = new Lazy<Singleton>(() => new Singleton());
public static Singleton GetInstance
{
    get
    {
        return instance.Value;
    }          
}
```

By default Lazy objects are threadsafe.

----

### What is the difference between Singleton and Static class?

**Static vs Singleton**

- Static is a keyword and Singleton is a design pattern.
- Static classes contain only static members.
- Singleton is an object creational pattern with one instance of the class.
- Singleton can implement interfaces, inherit from other classes and it align with the OOPS concepts.
- Singleton object can be passed as a reference.
- Singleton supports object disposal.
- Singleton object is stored on heap.
- Singleton object can be cloned.

----

### How to implement Exception Logging using Singleton Design Pattern?

```csharp
public sealed class Log : Ilog
{
    private static readonly Lazy<Log> instance = new Lazy<Log>(() => new Log());
    private Log() { }
    public static Log GetInstance
    {
        get { return instance.Value; }
    }
    public void LogException(string message)
    {
        string filename = string.Format("{0}_{1}.log", "Exception", 
            DateTime.Now.ToShortDateString());
        string logfilePath = string.Format(@"{0}\{1}", 
            AppDomain.CurrentDomain.BaseDirectory, filename);
        StringBuilder sb = new StringBuilder();
        sb.AppendLine("---------------------------------------------");
        sb.AppendLine(DateTime.Now.ToString());
        sb.AppendLine(message);
        using(StreamWriter writer = new StreamWriter(logfilePath, true))
        {
            writer.WriteLine(sb.ToString());
            writer.Flush();
        }
    }
}
```

```csharp
    public class BaseController : Controller
    {
        private Ilog _ILog;

        public BaseController()
        {
            _ILog = Log.GetInstance;
        }

        protected override void OnException(ExceptionContext filterContext)
        {
            _ILog.LogException(filterContext.Exception.ToString());
            filterContext.ExceptionHandled = true;
            this.View("Error").ExecuteResult(this.ControllerContext);
        }
    }

```

--------------

### What is Factory Design Pattern?

Define an interface for creating an object, but let subclasses decide which class to instantiate. The Factory method lets a class defer instantiation it uses to subclasses.

Factory pattern creates objects without exposing the creation logic to the client and refer to newly created object using a common interface. 

***Choose Factory Pattern when***
- The Object needs to be extended to subclasses.
- The Classes doesn't know what exact sub-classes it has to create.
- The Product implementation tend to change overtime and the client remains unchanged.

**Example***

Consider we have a scenario like based on employee type HourlyPay and Bonus are decided. First lets implement without Factory Pattern

```csharp
        public ActionResult Create(Employee employee)
        {
            if (ModelState.IsValid)
            {
                if(employee.EmployeeTypeID == 1)
                {
                    employee.HourlyPay = 8;
                    employee.Bonus = 10;
                }
                else if(employee.EmployeeTypeID == 2)
                {
                    employee.HourlyPay = 12;
                    employee.Bonus = 6;
                }

                db.Employees.Add(employee);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            ViewBag.EmployeeTypeID = new SelectList(db.Employee_Type, "Id", "EmployeeType", employee.EmployeeTypeID);
            return View(employee);
        }
```

If we inspect the code, we have acheived the requirement but we have introduced few drawbacks with this code in standards. Firstly, we have introduced tightly couped business logic within Employee controller. Lets think we need add another employee type, then we need to modify the logic everytime in the controller(which is to perform only user interaction). This will introduce more maintainence efforts both in development and testing and this approach is error prone. 

```csharp
public interface IEmployeeManager
{
    decimal GetHourlyPay();
    decimal GetBonus();
}
public class PermanentEmployeeManager : IEmployeeManager
{
    public decimal GetBonus() { return 10; }
    public decimal GetHourlyPay() { return 8; }
}
public class ContractEmployeeManager : IEmployeeManager
{
    public decimal GetHourlyPay() { return 12; }
    public decimal GetBonus() { return 6; }
}

public class EmployeeManagerFactory
{
    public IEmployeeManager GetEmployeeManager(int EmployeeType)
    {
        IEmployeeManager manager = null;
        if (EmployeeType == 1) {
            manager = new PermanentEmployeeManager();
        }
        else if (EmployeeType == 2)
        {
            manager = new ContractEmployeeManager();
        }
        return manager;
    }
}

[HttpPost]
[ValidateAntiForgeryToken]
public ActionResult Create(Employee employee)
{
    if (ModelState.IsValid)
    {
        EmployeeManagerFactory employeeManagerFactory = new EmployeeManagerFactory();
        IEmployeeManager employeeManager = employeeManagerFactory.GetEmployeeManager(employee.EmployeeTypeID.Value);
        employee.HourlyPay = employeeManager.GetHourlyPay();
        employee.Bonus = employeeManager.GetBonus();
        db.Employees.Add(employee);
        db.SaveChanges();
        return RedirectToAction("Index");
    }
    ViewBag.EmployeeTypeID = new SelectList(db.Employee_Type, "Id", "EmployeeType", employee.EmployeeTypeID);
    return View(employee);
}
```

----

### How to implement Factory Method Pattern?

Consider the below business requirement

- Differentiate employees as Permanent and contract and segregate their pay scales as well as bonus based on their employee types. (Achieved this using simple factory pattern)
- Calculate Permanent employee house rent allowance
- Calculate Contract employee medical allowance.

```csharp
public abstract class BaseEmployeeFactory
{
    protected Employee _emp;
    public BaseEmployeeFactory(Employee employee)
    {
          _emp = employee;
    }
    public abstract IEmployeeManager Create();
    public Employee ApplySalary()
    {
        IEmployeeManager employeeManager = Create();
        _emp.Bonus = employeeManager.GetBonus();
        _emp.HourlyPay = employeeManager.GetHourlyPay();
        return _emp;
    }
}

public class PermanentEmployeeFactory : BaseEmployeeFactory
{
    public PermanentEmployeeFactory(Employee employee) : base(employee)
    {
    }
    public override IEmployeeManager Create()
    {
        PermanentEmployeeManager permanentEmployeeManager = new PermanentEmployeeManager();
        _emp.HouseAllowance = permanentEmployeeManager.GetHouseRentAllowance();
        return permanentEmployeeManager;
    }
}

public class ContractEmployeeFactory : BaseEmployeeFactory
{
    public ContractEmployeeFactory(Employee employee) : base(employee)
    {
    }
    public override IEmployeeManager Create()
    {
        ContractEmployeeManager contractEmployeeManager  = new ContractEmployeeManager();
        _emp.MedicalAllowance = contractEmployeeManager.GetMedicalAllowance();
        return contractEmployeeManager;
    }
}

public class EmployeeManagerFactory
{
    public BaseEmployeeFactory CreateFactory(Employee employee)
    {
        BaseEmployeeFactory baseEmployeeFactory = null;
        if (employee.EmployeeTypeID == 1)
        {
            baseEmployeeFactory = new PermanentEmployeeFactory(employee);
        }
        else if (employee.EmployeeTypeID == 2)
        {
            baseEmployeeFactory = new ContractEmployeeFactory(employee);
            
        }
        return baseEmployeeFactory;
    }
}

public ActionResult Create(Employee employee)
{
    if (ModelState.IsValid)
    {
        BaseEmployeeFactory employeeManagerFactory = new EmployeeManagerFactory().CreateFactory(employee);
        employeeManagerFactory.ApplySalary();
        db.Employees.Add(employee);
        db.SaveChanges();
        return RedirectToAction("Index");
    }
    ViewBag.EmployeeTypeID = new SelectList(db.Employee_Type, "Id", "EmployeeType", employee.EmployeeTypeID);
    return View(employee);
}

```
--------

### What is Abstract Factory Design Pattern?

The Abstract factory pattern provides a way to encapsulate a group of individual factories that have a common theme without specifying their concrete classes.

The Abstract Factory Design Pattern provides an interface for creating families of related or dependent objects without specifying their concrete classes.

Abstract Factory is super factory that creates other factories.

***Choose Abstract Factory Pattern when***
- The application needs to create multiple families of objects or products
- We need to use only one subset of families of objects at a given point of time
- We need to hide the implementation of the families of products by decoupling the implementation of each of these operations.

Consider the below business requirement
- Handout computers to contract and permanent employees based on the designation and employee type with below specifications
- Permanent Employees
  * Managerial Postion is eligible for MAC Book Laptop
  * Non Managerial Position is eligible for MAC Desktop
- Contract Employees
  * Managerial Postion is eligible for Dell Laptop
  * Non Managerial Position is eligible for Dell Desktop


