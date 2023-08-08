## C# Interview Questions & Answers

### Questions

- [What is private constructor and what is its purpose?](#what-is-private-constructor-and-what-is-its-purpose)
- [What is difference between Private and Static Constructor?](#what-is-difference-between-private-and-static-constructor)
- [Can abstract class have constructor?](#can-abstract-class-have-constructor)
- [Why does abstract class needs a constructor?](#why-does-abstract-class-needs-a-constructor)
- [What is Constructor Chaining?](#what-is-constructor-chaining)
- [What is Static Keyword?](#what-is-static-keyword)
- [Why use a singleton instead of static methods?](#why-use-a-singleton-instead-of-static-methods)
- [Singleton Vs Static Classes?](#singleton-vs-static-classes)
- [Real-world Examples of Singleton Class](#real-world-examples-of-singleton-class)-
- [Garbage Collection - Dispose Vs Finalize And IDisposable Pattern](#garbage-collection---dispose-vs-finalize-and-idisposable-pattern)
- [What is Method Overloading and Overriding?](#what-is-method-overloading-and-overriding)
- [What are Events?](#what-are-events)
- [What are Delegates?](#what-are-delegates)
- [What is record type?](#what-is-record-type)
- [What is Inheritance?](#what-is-inheritance)
- [What is Abstraction and Encapsulation?](#)
- [What are ref and out keywords?](#what-are-ref-and-out-keywords)
- [What is Boxing and Unboxing?](#what-is-boxing-and-unboxing)
- [What are Value Types and Reference Types?](#what-are-value-types-and-reference-types)
- [What are Generics?](#what-are-generics)
- [Difference between ArrayList and Generic List?](#difference-between-arrayList-and-generic-list)
- [Difference between “is” and “as” operator?](#)
- [Difference between IEnumerable and IQuerable?](#difference-between-ienumerable-and-iquerable)
- [Access Modifiers of Interface?](#access-modifiers-of-interface)
- [What is Friend Assembly?](#what-is-friend-assembly)
- [Why Properties ?, private set](#)
- [Interfaces with same methods](#)
- [Exentension Methods](#)
- [What are SOLID Principles](#what-are-solid-principles)
- [ArrayList and List](#)
- [StringBuilder](#)
- [Can we store different types in a array?](#)
- [how to return different values from a method without using ref and out?](#)
- [Can I pass ref and out in async methods?](#)
- [How to do equality comparison for an object?](#)
- [What are three virtual functions in an Object ?](#)
- [Difference between process, task and thread](#)
- [Async Prommaing](#)
- [Return types of async](#)
- [Task.ConfigurateAwait(boolean)](#)
- [Deffered and Immediate Execution](#)
- [Can Multiple Catch Blocks executed?](#)
- [Difference between Throw Exception and Throw Clause?](#)
- [Difference between the System.Array.CopyTo() and System.Array.Clone()? ](#)
- [Difference between Equality Operator (==) and Equals() Method?](#)
- [What is Serialization?](#)
- [What is Multithreading with .NET? ](#)
- [Explain Anonymous type?](#)
- [Explain Hashtable? ](#)
- [What is Reflection?](#)
- [What are threads?](#)
- [What is the use of Task and Async?](#)
- [Explain Solid Principles?](#)
- [](#)
- [](#)
- [](#)

### What is private constructor and what is its purpose?

Private constructor is a special instance constructor which is used in a class that contains static member only.

If a class has one or more private constructor and no public constructor then other classes are not allowed to create instance of this class; this means you can neither create the object of the class nor can it be inherited by other classes.

The main purpose of creating private constructor is to restrict the class from being instantiated when it contains every member as static.

#### Example

```csharp
    public class SingletonDemo
    {
        private static string CreatedOn;
        private static SingletonDemo instance = null;

        private SingletonDemo()
        {
            CreatedOn = DateTime.Now.ToLongTimeString();
        }

        public static SingletonDemo getInstance()
        {
            if (instance == null)
            {
                instance = new SingletonDemo();
            }
            Console.WriteLine(CreatedOn);
            return instance;
        }
    }
```
****
### What is difference between Private and Static Constructor?

1. A static constructor is called before the first instance is created. i.e. global initializer whereas Private constructor is called after the instance of the class is created. 
2. Static constructor will be called first time when the class is referenced. Static constructor is used to initialize static members of the class. It is called by CLR, not by creating instance of the class. As it is called by CLR, it is not certain when it is called. But it is called when class is loaded. <br/> Static members will not be initialized either by private or public constructor.
3. The static constructor will only be executed once. The private constructor will be executed each time it is called.

****

### Can abstract class have constructor?

Yes, an abstract class can have a constructor, even though an abstract class cannot be instantiated.

***

### Why does abstract class needs a constructor?
#### or
### What is Constructor Chaining?
<br/>

Constructor Chaining is a concept when a constructor calls another constructor in the same class or its base class.

[Example on Abstract class constructor](#https://www.c-sharpcorner.com/article/why-does-abstract-class-needs-a-constructor/)

***

### What is Static Keyword?

The static keyword in C# language is used to declare static classes and static class members. The static classes and static class members such as constructors, fields, properties, methods, and events are useful when only one copy of the object (class or class members) are needed and shared among all instances (objects) of a type (and members)

[Read More](#https://www.c-sharpcorner.com/UploadFile/36bc15/static-keyword-in-C-Sharp/)

***
### Why use a singleton instead of static methods?
### Singleton Vs Static Classes?

Static classes are basically used when you want to store a single instance, data which should be accessed globally throughout your application. The class will be initialized at any time but mostly it is initialized lazily. Lazy initialization means it is initialized at the last possible moment of time. There is a disadvantage of using static classes. You never can change how it behaves after the class is decorated with the static keyword.

Singleton Class instance can be passed as a parameter to another method whereas static class cannot

Thread safe for singleton class instantiation

Multithreaded Singleton

[Read More](#https://www.c-sharpcorner.com/UploadFile/akkiraju/singleton-vs-static-classes/)

***
### Real-world Examples of Singleton Class


* Managing Service Proxies
* Managing Database Connections
* Logging
* Caching
* Data Sharing
* Application Configuration Management


***


### Garbage Collection - Dispose Vs Finalize And IDisposable Pattern

#### Garbage Collection:
The Garbage Collector removes objects from the heap when they are unreachable by any part of your codebase. The .Net garbage collector will compact empty blocks of memory for the purpose of optimization. 

The heap is categorized into three generations so it can handle long-lived and short-lived objects. Garbage collection primarily occurs with the reclamation of short-lived objects that typically occupy only a small part of the heap.

- Generation 0: Newly created objects are in Generation 0. These objects on Generation 0 are collected frequently to ensure that short-lived objects are quickly collected and the memory is released. Objects that survive Generation 0, the collections are promoted to Generation 1. Most objects are reclaimed for garbage collection in Generation 0 and do not survive to the next generation. 

- Generation 1: Objects that are collected less frequently than Generation 0 and contains longer-lived objects that were promoted from Generation 0. Objects that survive Generation 1, collection are promoted to Generation 2. 

- Generation 2: Objects promoted from Generation 1 that are the longest-lived objects and collected infrequently. The overall strategy of the garbage collector is to collect and move longer-lived objects less frequently.

#### Finalize:  
This is used to release the unmanaged resources.

#### IDisposable Interface:
IDisposable has only one method that is Dispose method. We can use the dispose method for the same purpose to clean up the unmanaged resources. So when you are done with your object then simply call the dispose method.



[Read More on Object Lifetime](#https://www.c-sharpcorner.com/UploadFile/b08196/object-lifetime-in-net-framework/)

[Examples on Dispose vs Finalize and IDisposable](#https://www.c-sharpcorner.com/article/garbage-collection-dispose-vs-finalize-and-idisposable-pattern/)

[Read More on IDiposable Interface](#https://www.c-sharpcorner.com/UploadFile/b08196/idisposable-interface-in-C-Sharp/)

****
#### What is Method Overloading and Overriding?
##### Method Overloading
Method Overloading is a type of polymorphism. It has several names like “Compile Time Polymorphism” or “Static Polymorphism,” and sometimes it is called “Early Binding”.

Method Overloading means creating multiple methods in a class with the same names but different signatures (Parameters). It permits a class, struct, or interface to declare multiple methods with the same name with unique signatures.

##### Method Overriding
Method Overriding is a type of polymorphism. It has several names like “Run Time Polymorphism” or “Dynamic Polymorphism,” and sometimes it is called “Late Binding”. 

Method Overriding means having two methods with the same name and same signatures [parameters]; one should be in the base class, and another method should be in a derived class [child class]. You can override the functionality of a base class method to create the same name method with the same signature in a derived class. You can achieve method overriding using inheritance. Virtual and Override keywords are used to achieve method overriding.

[Read More](https://www.c-sharpcorner.com/UploadFile/8a67c0/method-overloading-and-method-overriding-in-C-Sharp/)
****
#### What are Events?

An event is a notification sent by an object to signal the occurrence of an action

[Read More](https://www.tutorialsteacher.com/csharp/csharp-event)

****
#### What are Delegates?

- It is a reference type.
- It is a function pointer or it holds a reference (pointer) to a function (method).
- It is type safe.
- Delegates are mainly used for the event handling and the callback methods.

[Real Time Example on Delegate](https://www.c-sharpcorner.com/blogs/delegates-with-real-time-example-in-c-sharp)

[Practicle Example on Delegate](https://www.codeproject.com/Articles/71154/C-Delegates-101-A-Practical-Example)
****
#### What is record type?

Record type is a lightweight, immutable data type (or lightweight class) with primarily read-only properties. A record type is thread-safe, and because it is immutable, you cannot change it after it is created. Note that record types can only be initialized inside constructors.

```csharp
public record Member
{
    public int ID { get; init; }
    public string FirstName { get; init; }
    public string LastName { get; init; }
    public string Address { get; init; }
}
```

```csharp
var member = new Member
{
    Id=1,
    FirstName="Prabhakara",
    LastName="Yalla",
    Address = "Kakinada"
};

var newMember = new Member
{
    Id = member.Id,
    FirstName = member.FirstName,
    LastName = member.LastName,
    Address = "Bangalore"
};
```

```csharp
var member = new Member
{
    Id=1,
    FirstName="Prabhakara",
    LastName="Rao",
    Address = "Yalla"
};

var newMember = member with { Address = "Bangalore" };
```
[Read More](https://www.c-sharpcorner.com/article/c-sharp-9-0-introduction-to-record-types/)
[Read More](https://www.codeguru.com/csharp/record-types-c-sharp/)

----

#### What is Inheritance?
Inheritance is a fundamental concept in object-oriented programming that allows us to define a new class based on an existing class. 


Inheritance is a process in which one object acquires all the properties and behaviors of its parent object automatically.

---


#### What are SOLID principles?

SOLID principles are the design principles that enable us to manage several software design problems.  These principles provide us with ways to move from tightly coupled code and little encapsulation to the desired results of loosely coupled and encapsulated real business needs properly. SOLID is an acronym for the following.

- S: Single Responsibility Principle (SRP)
- O: Open-closed Principle (OCP)
- L: Liskov substitution Principle (LSP)
- I: Interface Segregation Principle (ISP)
- D: Dependency Inversion Principle (DIP)

[Read More](https://www.c-sharpcorner.com/UploadFile/damubetha/solid-principles-in-C-Sharp/)



---








