## C# Programatic Interview Questions & Answers

### Questions

- [Access Modifiers](#access-modifiers)
- [Inheritance](#inheritance)
- [Exception Handling](#exception-handling)


### Access Modifiers


#### 1. From the below code, Is Class1 accessible outside its assembly?
   
```
class class1 { } // default is internal
public class class2 { }
```

#### Answer:
    
class2 is accessible from outside its assembly; class1 is not
    
-----------

#### 2. How is the field exposed in current assembly from the below classes?

```
class A { int x;  } // x is private default
class B { internal int x; }
```
#### Answer:

B exposes field x to other types in the same assembly; A doesnot

----

#### 3. What is the output of below code?

```
internal class A { }
public class B : A { }
```

#### Answer:

Error: Inconsistent accessibility: base class 'A' is less accessible than class 'B'

---
#### 4. What is the output of below code?

```
class BaseClass1 { protected virtual void Foo() { } }
class Subclass1 : BaseClass1 { protected override void Foo() { } } 
class Subclass2 : BaseClass1 { public override void Foo() { } } 
```
#### Answer:

When overriding a base class function, accessibility must be identical on the overridden function. so Subclass1 overrides but Subclass2 throws an error as below

Error: 'Subclass2.Foo()': cannot change access modifiers when overriding 'protected' inherited member 'BaseClass1.Foo()'

---

#### 5. What is the output of below code?

```
    class BaseClass
    {
        void Foo() { }  // Foo is private (default) 
        protected void Bar() { }
    }
    class SubClass : BaseClass
    {
        void Test1() { Foo(); } 
        void Test2() { Bar(); } 
    } 
```

#### Answer:

Error: 'BaseClass.Foo()' is inaccessible due to its protection level

#### 5. What is accessibility capping?

#### Answer:

consider the below class 

``` class C { public void Foo() { } } ```

C’s (default) internal accessibility caps Foo’s accessibility. Therefore this means that even though C's Foo method is marked as public, it will be capped at internal because that's what the class's level is. 

It can still be useful to have the property marked public, because if later on you make the class C public, then Foo will also be public (otherwise you would also have to change Foo from internal to public.)

---
### Inherirance

#### 1. What is the output of below code?

```
public class Car
{
    public Car() { Console.WriteLine("Car"); }
    public virtual void DriveType() { Console.WriteLine("Car Drive Type"); }
}

public class Ford : Car
{
    public Ford() { Console.WriteLine("Ford"); }
    public override void DriveType() { Console.WriteLine("Ford Drive Type"); }
}

Car c = new Car();
c.DriveType();
Console.WriteLine("------");
c = new Ford();
c.DriveType();

```

#### Output:

```
Car
Car Drive Type
------
Car
Ford
Ford Drive Type
```

#### 2. What is the output of below code?

```
public class Car
{
    public void DriveType() { Console.WriteLine("Base Drive Type"); }
}

public class Ford : Car
{
    public void DriveType() { Console.WriteLine("Derived Drive Type"); }
}

Car c = new Car();
c.DriveType();
Console.WriteLine("------");
c = new Ford();
c.DriveType();
Console.WriteLine("------");
Ford f = new Ford();
f.DriveType();
```

#### Output:

```
Base Drive Type
------
Base Drive Type
------
Derived Drive Type
```

#### 3. What is the output of below code?

```
public class Car
{
    public void DriveType() { Console.WriteLine("Base Drive Type"); }
}

public class Ford : Car
{
    public new void DriveType() { Console.WriteLine("Derived Drive Type"); }
}

Car c = new Car();
c.DriveType();
Console.WriteLine("------");
c = new Ford();
c.DriveType();
Console.WriteLine("------");
Ford f = new Ford();
f.DriveType();
```

#### Output:

```
Base Drive Type
------
Base Drive Type
------
Derived Drive Type
```


---

### Exception Handling

#### 1. What is the output of below code?

```
try
{
    int j = 0;
    int i = 1/j;
    Console.WriteLine(i);
}
catch(DivideByZeroException) { Console.WriteLine("DivideByZeroException"); }
catch(ArithmeticException) { Console.WriteLine("ArithmeticException"); }
catch(Exception) { Console.WriteLine("Exception"); }
```

#### Output:
DivideByZeroException


#### 2. What is the output of below code?

```
try
{
    int j = 0;
    int i = 1/j;
    Console.WriteLine(i);
}
catch(ArithmeticException) { Console.WriteLine("ArithmeticException"); }
catch(DivideByZeroException) { Console.WriteLine("DivideByZeroException"); }
catch(Exception) { Console.WriteLine("Exception"); }
```

#### Output:

Compilation Failed

Error: A previous catch clause already catches all exceptions of this or of a super type ('ArithmeticException')	

#### 3. What is the output of below code?

```
try
{
    int j = 0;
    int i = 1/j;
    Console.WriteLine(i);
}
catch(ArithmeticException) { Console.WriteLine("ArithmeticException"); }
catch(Exception) { Console.WriteLine("Exception"); }
```

#### Output:
ArithmeticException


#### 4. What is the output of below code?

```
try
{
    int j = 0;
    int i = 1/j;
    Console.WriteLine(i);
}
catch(Exception) { Console.WriteLine("Exception"); }
catch (ArithmeticException) { Console.WriteLine("ArithmeticException"); }
```

#### Output:

Compilation Failed

Error A previous catch clause already catches all exceptions of this or of a super type ('Exception')

#### 5. What is the output of below code?

```
try
{
    int j = 0;
    int i = 1 / j;
    Console.WriteLine(i);
}
finally { Console.WriteLine("Finally"); }
```
#### Output:

Unhandled exception. System.DivideByZeroException: Attempted to divide by zero.
