## SQL Interview Questions & Answers

### Questions

- [What is stored procedure?](#what-is-stored-procedure)
- [Why we need the stored procedure?](#why-we-need-the-stored-procedure)
- [How to execute a stored procedure?](#how-to-execute-a-stored-procedure)
- [How to Delete or Drop stored procedure?](#how-to-delete-or-drop-stored-procedure)
- [How to get stored procedure text in the SQL server?](#how-to-get-stored-procedure-text-in-the-sql-server)
- [How to encrypt the text of a stored procedure?](#how-to-encrypt-the-text-of-a-stored-procedure)
- [What are the different procedure attributes in SQL Server?](#what-are-the-different-procedure-attributes-in-sql-server)
- [How to alter stored procedures in the SQL server?](#how-to-alter-stored-procedures-in-the-sql-server)
- [How to Create Paramatrize stored Procedure in SQL server?](#how-to-create-paramatrize-stored-procedure-in-sql-server)
- [How to call a stored procedure which returns the output parameter?](#how-to-call-a-stored-procedure-which-returns-the-output-parameter)
- [Can we have multiple output parameters in stored procedures?](#can-we-have-multiple-output-parameters-in-stored-procedures)
- [What is Return Value in SQL Server Stored Procedure?](#what-is-return-value-in-sql-server-stored-procedure)
- [What are the Disadvantages of Return Status Value in SQL Server?](#what-are-the-disadvantages-of-return-status-value-in-sql-server)
- [What are the differences between Return Status Value and Output Parameters in SQL Server Stored Procedure?](#what-are-the-differences-between-return-status-value-and-output-parameters-in-sql-server-stored-procedure)
- [What are advantages of Stored Procedure?](#what-are-advantages-of-stored-procedure)
- [What is the temporary stored procedure?](#what-is-the-temporary-stored-procedure)
- [What is a Private/Local Temporary Stored Procedure?](#what-is-a-privatelocal-temporary-stored-procedure)
- [What are Public/Global Temporary Stored Procedures?](#what-are-publicglobal-temporary-stored-procedures)
- [What is the use of Temporary Stored Procedure?](#what-is-the-use-of-temporary-stored-procedure)
- [What is deferred name resolution in SQL Server?](#what-is-deferred-name-resolution-in-sql-server)
- [Can a stored procedure call itself or recursive stored procedure? How many level SP nesting possible?](#can-a-stored-procedure-call-itself-or-recursive-stored-procedure-how-many-level-sp-nesting-possible)
- [Differences between Inline Table-Valued functions and Multi-statement Table-Valued functions.]
- [What are the differences between a table and a view in SQL Server?]
- [How many types of views are there in SQL Server?]
- [What is a simple view or Updatable view?]
- [What are the advantages of using views? OR when do you usually use views?]
- [What are the limitations of a View in SQL Server?]
- [What are the differences between a table and a view in SQL Server?]
- [Can we drop a table that has dependent views on it?]
- [Can we create a view based on other views?]
- [Can we update the views in SQL Server?]
- [What is normalization and explain normalization forms?](#)
- [What are Indexes ? Clustered and Non Clustered Indexes](#)
- [What are different types of contraints?](#)
- [Exception Handling](#)
- [WITH clause](#)
- [Should we use Cursors? How can Cursors be avoided](#)
- [Transaction Concurrency and isolation levels](#)
- [SQL Joins](#)
- [What is persistent vs non persistent in SQL Server](#)
- [What does ACID mean in SQL?](#)
- [System versioning the table?](#)
- [Can we have multiple select statement in a stored procedure?](#)
- [Can a sql function return multiple values?](#)
- [Can we use try and catch in user defined functions?](#)
- [Difference between Stored procedure and function?](#)
- [What are views? Can we create index in views?](#)
- [Why we are having only one clustered index and many non-clustered index in a table?](#)
- [What is temporary table and table variable in sql?](#)
- [CTE in sql?](#)
- [what is Partition by in SQL?](#)
- [Difference between inner join and Left join?](#)
- [Difference between selfjoin and cross join?](#)
- [What is SQL Profiler?](#)
- [In SQL, from where can we see which query is taking how much time?](#)
- [](#)


### Answers

### What is stored procedure?
A stored procedure is a precompiled set of Structured Query Language (SQL) statements with an assigned name and directly saved in the database.

Example:
```sql
create procedure GetAllEmployee    --Create stored procedure syntax
as 
begin
select * from Employee;
end
```
***

### Why we need the stored procedure?
Whenever we want to execute a SQL query from an application the SQL query (statement) what we send from an application will be first compiled(parsed) for execution, where the process of compiling(parsing) is time-consuming because compilation occurs each time when we execute the query or statements.

To overcome the above problem, we write SQL statements or query under the stored procedure and execute because a stored procedure is a pre-compiled block of code, without compiling(parsing) the statements get executed whenever the procedures are called which can increase the performance of database server which ultimately increases the performance of the application.

If we have a situation where we write the same query again and again, we can save that specific query as a stored procedure and call it’s just by its name whenever required that query to execute.

***

### How to execute a stored procedure?
There are different ways to call procedures in that we have the following way.
1. Stored_procedure_name and press F5 to run on SQL server management studio
2. Exec Stored_procedure_name
3. Execute Stored_procedure_name

***

### How to Delete or Drop stored procedure?

You can use a drop procedure keyword with the stored procedure name.

```sql
drop procedure GetAllEmployee; -- drop the store procedure
```
***

### How to get stored procedure text in the SQL server?
Use sp_helptext in-built procedure and pass the procedure name then you will get all stored procedure syntax.

```sql
sp_helptext GetAllEmployee  -- get the text of stored procedure
```
***

### How to encrypt the text of a stored procedure?
To encrypt the text of a stored procedure we use WITH ENCRYPTION option. For example

```sql
CREATE PROCEDURE SPWELCOME
WITH ENCRYPTION
AS
BEGIN
     PRINT 'WELCOME TO PROCEDURE'
END
```

***

### What are the different procedure attributes in SQL Server?
There are two types of attributes
1. With Encryption
2. With Recompile

**With Encryption Attribute:**
If this attribute is used on the procedure the text of this procedure is encrypted and will not be shown in the text column of the syscomments table so no one will be having an option to view the content of it.

**Note:** When an application is developed for a client at the time of installing this application on the client system we will be using the encryption option on all the views, procedures, functions, triggers, etc. and install on the client machine. So that they will not have the chance of viewing the source code or altering the source code.

**With Recompiled Attribute:**

1. Whenever a procedure is compiled for the first time it prepares the best query plan according to the current state of the database and executes the query plan when the procedure is called.
2. The compilation of the procedure and preparing a query plan is prepared not only at the time of procedure creation but each and every time the server is restarted (Implicitly occurs).
3. If the procedure is created by using with Recompile procedure attribute, it is forced to be compiled each time it is executed and whenever it compiles it prepares the query plan.
4. Forcing a procedure for recompilation and prepared a query plan is required when the database undergoes significant changes to its data or structure.
5. Another reason to force a procedure to recompile is if at all the tables is added with new indexes from which the procedure might be benefited forcing for recompilation is very important because we cannot wait until the server is restarted for preparing a new query plan.

**Note:** Even if the With Recompile option is available it is not suggested to be used if at all there are no significant changes in the structure of the databases.

***

### How to alter stored procedures in the SQL server?
You can use alter keyword along with procedure name and change the SQL statement which you want to change and run that statement your procedure will be altered.

```sql
alter procedure GetAllEmployee  -- alter a stored procedure
as 
begin
select top 10 * from Employee;
end
```
***

### How to Create Paramatrize stored Procedure in SQL server?

```sql
create proc GetEmpBasedOnParameter -- create parametrize stored procedure
@departmentid int,
@gender varchar(10)
as
begin
select * from Employee where DepartmentID=@departmentid and Gender=@gender;
end
```

```sql
exec GetEmpBasedOnParameter @gender='female',@departmentid=10      
--run stored procedure syntax with parameters position not required
```

**Stored Procedure with Output Parameter**
```sql
create procedure GetGenderwisecount  -- procedure with an output parameter
@gender varchar(10),
@empCount int out
as
begin
select @empCount = count(empid) from Employee where Gender=@gender
end;
```

***

### How to call a stored procedure which returns the output parameter?

```sql
declare @empcount int
exec GetGenderwisecount 'feMale',@empcount out
print(@empcount)
```

***

### Can we have multiple output parameters in stored procedures?

We can have multiple output parameters in stored procedures.

***

### What is Return Value in SQL Server Stored Procedure?
Whenever we execute a stored procedure in SQL Server, it always returns an integer status variable indicating the status, usually, zero indicates success, and non-zero indicates the failure.

Example:
Create a procedure that will count the total number of employees in the Employee table using return status

```sql
CREATE PROCEDURE spGetTotalCountOfEmployee2
AS
BEGIN
  RETURN (SELECT COUNT(ID) FROM Employee)
END
-- For calling the procedure:
DECLARE @EmployeeTotal INT
EXECUTE @EmployeeTotal = spGetTotalCountOfEmployee2
PRINT @EmployeeTotal
```
When we execute the above SP, it returns 6.

Example:

```sql
CREATE PROCEDURE spGetEmplloyeeNameById2
  @ID INT
AS
BEGIN
  RETURN (SELECT Name FROM Employee WHERE ID = @ID)
END
GO

-- For calling the procedure:
DECLARE @EmployeeName VARCHAR(30)
EXECUTE @EmployeeName = spGetEmplloyeeNameById2 3
PRINT @EmployeeName
```

When we execute the spGetEmplloyeeNameById2 Stored Procedure it returns an error stating ‘Conversion failed when converting the nvarchar value to data type int.‘. The return status variable is an integer, and hence when we select the Name of an employee and try to return that we get a conversion error. 

***
### What are the Disadvantages of Return Status Value in SQL Server?

Following are the things that we can’t achieve using the Return Value in SQL Server.

1. We cannot return more than one value.
2. We cannot return values other than an integer.

But these two can possible with output parameters.

***
### What are the differences between Return Status Value and Output Parameters in SQL Server Stored Procedure?

|Return Status Variable|Output parameters|
|--|--|
|Only integer data type it can return|Any data type value it can return|
|Only one value|More than one value|
|Use to indicate success or failure|Use to return values like name, age, salary, count, etc.|

***

### What are advantages of Stored Procedure?
1. The best benefit of a stored procedure is that they are capable of reusing the execution plan. Execution plan means when you fire a query SQL server first checks the syntax of a query, after that it will compile that query and last it generates an execution plan. In simple words, an execution plan is for getting data from the database which is the best way to retrieve that data.
2. It resides on a server so any application wants to use that procedure they can use it. So maintainability and reusability achieve.
3. It provides good security.
4. It avoids SQL injection attacks.

***

### What is the temporary stored procedure?

The stored procedures which are created temporarily in a database i.e. the stored procedures which are not stored permanently in a database are called temporary stored procedures. The SQL Server Temporary Stored Procedures are of two types such as

1. Private/Local Temporary Stored Procedure
2. Public/Global Temporary Stored Procedure.

***

### What is a Private/Local Temporary Stored Procedure?
When we created the stored procedure by using the # prefix before the stored procedure name then it is called Local or Private Temporary Stored Procedure. The most important point that you need to keep in mind is that the Private/Local stored procedures are executed by the connection which has created it. These are automatically deleted when the connection created is closed.

Example: Creating a Local Temporary Stored Procedure in SQL Server.

```sql
CREATE PROCEDURE #LocalProcedure
AS
BEGIN
  PRINT 'This is Local Temporary Procedure'
END

-- Calling the Local Temporary Procedure
EXEC #LocalProcedue
```

### What are Public/Global Temporary Stored Procedures?
Whenever the stored procedure is created by using the ## prefix then it is called Global Temporary Procedure in SQL Server. The Global temporary stored procedures are accessed by other connections in SQL Server. The most key point that you need to remember is the Global Temporary Stored Procedure can access by any connection until the connection which has created the procedure is not closed.

Once the connection that created the global temporary stored procedure is closed, then no further execution of the Global Temporary Stored Procedure is allowed. Only those connections who have already started executing the Global temporary stored procedure are allowed to complete in SQL Server. 

```sql
CREATE PROCEDURE ##GlobalProcedue
AS
BEGIN
  PRINT 'This is Global Temporary Procedure'
END

-- Calling the Global Temporary Procedure
EXEC ##GlobalProcedue
```
***

### What is the use of Temporary Stored Procedure?

The Temporary Stored Procedures are useful when you are connecting to the earlier versions of SQL Server that do not support the reuse of execution plans for Transact-SQL statements or batches.

***

### What is deferred name resolution in SQL Server?

Consider the stored procedure shown below.

```sql
Create procedure spGetCustomers
As
Begin
  Select * from Customers
End
```

Customers table does not exist. When we execute the above SQL code, the stored procedure spGetCustomers will be successfully created without errors. But when you try to call or execute the stored procedure using Execute spGetCustomers, we will get a runtime error stating Invalid object name ‘Customers’.

So, at the time of creating stored procedures, only the syntax of the SQL code is checked. The objects used in the stored procedure are not checked for their existence. Only when we try to run the procedure, the existence of the objects is checked. So, the process of postponing, the checking of the physical existence of the objects until runtime, is called deferred name resolution in the SQL Server.

**Functions** in SQL server does not support deferred name resolution. If we try to create an inline table-valued function as shown below, we get an error stating Invalid object name ‘Customers’ at the time of the creation of the function itself.

```sql
Create function fnGetCustomers()
returns table
as
return Select * from Customers
```

So, this proves that stored procedures support deferred name resolution, whereas function does not. In fact, this is one of the major differences between functions and stored procedures in SQL Server.

### Can a stored procedure call itself or recursive stored procedure? How many level SP nesting possible?
Yes. Because Transact-SQL supports recursion, you can write stored procedures that call themselves. We can nest stored procedures and managed code references up to 32 levels.

***








 