<details><summary><b>Async, Parallel, Thread</b></summary>
<details><summary><b>Explain the internals of the C# async/await mechanism. How does the compiler transform async methods? </b></summary>
The C# async/await mechanism is a way to write asynchronous code that looks like synchronous code. When you mark a method with
async
and use
await
inside it, the compiler transforms the method into a state machine. This state machine manages the method's execution, allowing it to pause at
await
points without blocking the thread and resume when the awaited task completes.

Key points:

* The compiler generates a private nested struct or class called a state machine.
* The state machine implements the
IAsyncStateMachine
interface.
* The method's code is split into multiple states, each representing a point where the method can pause and resume.
* When an awaited task is not completed, the state machine saves the current state and returns control to the caller.
* When the awaited task completes, the state machine resumes execution from the saved state.
* This transformation allows asynchronous programming without explicit callbacks or complex thread management.
<details><summary><em>Example</em></summary>


``` csharp
public async Task<int> GetDataAsync()
{
    // Simulate asynchronous operation
    await Task.Delay(1000);
    return 42;
}
```


Steps of Compiler Transformation:

1. State Machine Creation:
The compiler creates a private struct/class implementing IAsyncStateMachine to represent the method's execution states.


2. State Variable:
A state variable tracks the current execution point (e.g., before await, after await).


3. MoveNext Method:
The method's logic is moved into the MoveNext method of the state machine, split into states around await points.


4. Task Builder:
The compiler uses an AsyncTaskMethodBuilder<int> to manage the task's lifecycle and result.


5. Awaiter Handling:
For each await, the compiler gets the awaiter from the awaited task. If the task is not completed, it sets the state, schedules the continuation, and returns.


6. Resuming Execution:
When the awaited task completes, the continuation calls MoveNext again, resuming from the saved state.


7. Completion:
When the method finishes, the builder sets the task result or exception.

</details>

<details><summary><em>Conceptual Generated Code Snippet (Simplified):</em></summary>

``` csharp
private struct <GetDataAsync>d__0 : IAsyncStateMachine
{
    public int state;
    public AsyncTaskMethodBuilder<int> builder;
    private TaskAwaiter awaiter;

    void IAsyncStateMachine.MoveNext()
    {
        int result = 0;
        try
        {
            if (state == -1)
            {
                awaiter = Task.Delay(1000).GetAwaiter();
                if (!awaiter.IsCompleted)
                {
                    state = 0;
                    builder.AwaitOnCompleted(ref awaiter, ref this);
                    return;
                }
            }
            if (state == 0)
            {
                awaiter.GetResult();
            }

            // After await, throw exception
            throw new InvalidOperationException("Something went wrong");

            // Normally set result if no exception
            // builder.SetResult(result);
        }
        catch (Exception ex)
        {
            // Capture exception and mark task as faulted
            builder.SetException(ex);
            return;
        }

        // If no exception, mark task as completed
        builder.SetResult(result);
    }

    void IAsyncStateMachine.SetStateMachine(IAsyncStateMachine stateMachine) { }
}
```
<b> Key Points:</b>
* The try-catch ensures exceptions are caught inside the async method.
* SetException stores the exception in the task.
* The task transitions to a faulted state.
* Awaiting the task re-throws the exception for the caller to handle.
</details>
<hr/>
</details>

<details><summary><b>What happens if you await a task that is already completed?</b></summary>
When you await a task that is already completed, the await operation does not cause the method to pause or yield control. Instead, the compiler-generated state machine continues executing synchronously after the await because the awaited task's result is immediately available. This behavior helps optimize performance by avoiding unnecessary context switches or continuations.

**Key points:**

* If the awaited task is completed successfully, the method proceeds immediately.
* If the awaited task is faulted or canceled, the exception or cancellation is propagated immediately.
* No asynchronous suspension or continuation scheduling occurs in this case.
<details><summary><em>Example</em></summary>

``` csharp
public async Task ExampleAsync()
{
    Task<int> completedTask = Task.FromResult(42); // Already completed task
    int result = await completedTask; // Awaits a completed task
    Console.WriteLine(result); // Prints 42 immediately without delay
}
```
</details>
<hr/>
</details>

<details><summary><b>Explain the role of the SynchronizationContext in async programming.</b></summary>
SynchronizationContext is a .NET abstraction that manages how and where code continuations after await are executed. In async programming, when an awaited task completes, the continuation (the code after await) is posted back to the captured SynchronizationContext. This ensures that the continuation runs on the appropriate thread or context, such as the UI thread in desktop applications or a request context in ASP.NET.

**Key points:**
* It helps maintain thread affinity, especially important for UI applications where updates must happen on the UI thread.
* By default, await captures the current SynchronizationContext and posts the continuation back to it.
* Using ConfigureAwait(false) tells the compiler not to capture the context, allowing continuations to run on any thread, improving performance in non-UI scenarios.

<details><summary><em>Example</em></summary>

``` csharp
public async Task UpdateUIAsync()
{
    // Assume this runs on the UI thread with a SynchronizationContext
    await Task.Delay(1000); // Simulate async work

    // Continuation runs back on the UI thread due to SynchronizationContext
    Console.WriteLine("Update UI safely here");
}
```
**Steps:**
1. Capture SynchronizationContext:
When await Task.Delay(1000) is reached, the current SynchronizationContext (e.g., UI thread context) is captured.

2. Async Work:
The method asynchronously waits for the delay to complete without blocking the UI thread.

3. Post Continuation:
After the delay, the continuation (code after await) is posted back to the captured SynchronizationContext.

4. Safe UI Update:
The continuation runs on the UI thread, allowing safe interaction with UI elements.
</details>
<hr/>
</details>

<details><summary><b>How does ConfigureAwait(false) affect the behavior of SynchronizationContext?</b></summary>
By default, when you await a task in an async method, the current SynchronizationContext is captured, and the continuation after the await is posted back to that context. This ensures, for example, that UI updates happen on the UI thread.

Using ConfigureAwait(false) tells the compiler not to capture the current SynchronizationContext. As a result, the continuation after the await can run on any thread, typically a thread pool thread. This can improve performance and avoid potential deadlocks in non-UI or library code where resuming on the original context is unnecessary.

**Key Effects of ConfigureAwait(false):**
* No context capture: The continuation does not resume on the original synchronization context.
* Potential thread switch: The continuation may run on a different thread, often from the thread pool.
* Improved performance: Avoids overhead of marshaling back to the original context.
* Avoids deadlocks: Helps prevent common deadlock scenarios in UI or ASP.NET applications.
* Not suitable for UI code: Since UI updates require the UI thread, ConfigureAwait(false) should not be used when you need interact with UI elements after awaiting.
<details><summary><em>Example</em></summary>

``` csharp
public async Task ExampleAsync()
{
    // Runs on UI thread or original context
    await Task.Delay(1000).ConfigureAwait(false);
    
    // Continuation may run on a thread pool thread, not the UI thread
    Console.WriteLine("Continuation without synchronization context");
}
```
**Steps:**
1. Await with ConfigureAwait(false):
The current SynchronizationContext is not captured.
2. Async Work:
The method asynchronously waits for the delay to complete.
3. Continuation Execution:
After the awaited task completes, the continuation runs on a thread pool thread or any available thread, not necessarily the original context.
4. Implications:
Code after the await should not assume it runs on the UI thread or original context.
</details>
<hr/>
</details>


<details><summary><b>What happens if there is no SynchronizationContext present when you await a task?</b></summary>
If there is no SynchronizationContext present (i.e., the current context is null) when you await a task, the continuation after the await is scheduled to run on the default TaskScheduler, which typically means it runs on a thread pool thread. This is common in console applications, background threads, or environments without a synchronization context.

**Key points:**
* No context is captured because none exists.
* Continuations run on thread pool threads.
* There is no guarantee of running on the original thread.
* This behavior is similar to using ConfigureAwait(false) in a context-aware environment.
<details><summary><em>Example</em></summary>

```csharp
public async Task ExampleAsync()
{
    Console.WriteLine($"Before await: Thread {Thread.CurrentThread.ManagedThreadId}");

    await Task.Delay(1000);

    Console.WriteLine($"After await: Thread {Thread.CurrentThread.ManagedThreadId}");
}
```

If you run this in a console app (which has no SynchronizationContext), the output might show different thread IDs before and after the await, indicating the continuation runs on a thread pool thread.

**Steps:**

1.No SynchronizationContext:
The environment (e.g., console app) does not have a SynchronizationContext.
2. Await Task:
When await Task.Delay(1000) is reached, no context is captured.
3. Continuation Scheduling:
The continuation is scheduled on the default TaskScheduler, usually a thread pool thread.
4. Continuation Execution:
The code after the await runs on a thread pool thread, not necessarily the original thread.
</details>
<hr/>
</details>

<details><summary><b>How does SynchronizationContext differ in UI applications (WPF, WinForms) versus ASP.NET applications? </b></summary>
SynchronizationContext provides a way to control where asynchronous continuations run, but its implementation and behavior differ between UI applications (like WPF and WinForms) and ASP.NET applications due to their threading and execution models.

Certainly! Here's the explanation of how SynchronizationContext differs between UI applications (WPF, WinForms) and ASP.NET applications in a descriptive format instead of a table:

**Differences Between SynchronizationContext in UI Applications and ASP.NET Applications**

***Type of SynchronizationContext:***  
In UI applications like WPF and WinForms, the SynchronizationContext is implemented as DispatcherSynchronizationContext (for WPF) or WindowsFormsSynchronizationContext (for WinForms). These are designed to marshal continuations back to the UI thread.  
In ASP.NET applications, the SynchronizationContext is implemented as AspNetSynchronizationContext in classic ASP.NET or AspNetCoreSynchronizationContext in ASP.NET Core. These contexts manage the execution within the HTTP request lifecycle.

***Thread Affinity:***  
UI applications have strong thread affinity. The continuations after await are posted back to the UI thread, ensuring that UI updates happen safely on the same thread that created the UI elements.  
ASP.NET applications do not have a single UI thread. Instead, continuations resume within the context of the HTTP request, which may run on different thread pool threads. The context preserves request-specific data rather than thread affinity.

***Purpose:***  
In UI applications, the primary purpose of the SynchronizationContext is to ensure that code interacting with UI elements runs on the UI thread to avoid threading issues.  
In ASP.NET applications, the SynchronizationContext ensures that asynchronous continuations run within the scope of the HTTP request context, preserving important information like HttpContext and culture settings.

***Continuation Behavior:***  
In UI applications, the SynchronizationContext posts continuations back to the UI thread’s message loop, maintaining a consistent thread for UI operations.  
In ASP.NET applications, the SynchronizationContext posts continuations to the request context, which may switch between different threads but keeps the logical context of the request intact.

***Effect of ConfigureAwait(false):***  
In UI applications, using ConfigureAwait(false) prevents the continuation from being marshaled back to the UI thread, allowing it to run on any thread. This can improve performance but requires care because UI updates must happen on the UI thread.  
In ASP.NET applications, ConfigureAwait(false) prevents the continuation from capturing the request context, meaning the continuation can run on any thread without access to HttpContext or other request-specific data.

***Typical Use Cases:***  
UI applications use SynchronizationContext primarily in event handlers, user interactions, and animations where thread affinity is critical.  
ASP.NET applications use it to manage asynchronous web request processing, middleware execution, and controller actions, ensuring the request context is preserved across awaits.

***Summary of Impact:***  
* In UI apps, SynchronizationContext ensures thread affinity for UI safety.
* In ASP.NET, it preserves request context for consistent web request processing.
* In both, ConfigureAwait(false) can be used to avoid capturing the context when it's not needed, improving performance.
<hr/>
</details>

<details><summary><b>Can you create a custom SynchronizationContext? If so, why and how?</b></summary>
Yes, you can create a custom SynchronizationContext in .NET.

**Why Create a Custom SynchronizationContext?**

***Control Execution Context:*** You may want to control how and where asynchronous continuations run, especially in specialized environments or frameworks.  
***Custom Threading Models:*** For example, in game engines, embedded systems, or custom UI frameworks, you might need to marshal continuations to a specific thread or queue.  
***Testing:*** To simulate or control synchronization behavior in unit tests.  
***Performance Optimization:*** To implement more efficient scheduling or batching of continuations.  
***Integration:*** To integrate async code with legacy or non-standard threading models.

**How to Create a Custom SynchronizationContext?**

1. Subclass SynchronizationContext:  
Create a class that inherits from SynchronizationContext.

2. Override Key Methods:  
Typically, you override:

3. Post(SendOrPostCallback d, object state): To schedule asynchronous work.  
`Send(SendOrPostCallback d, object state) To schedule synchronous work (usually blocking).  
Optionally, OperationStarted and OperationCompleted to track outstanding operations.

4. Implement Your Scheduling Logic:
Inside Post, decide how to queue or execute the callback d. For example, you might post it to a dedicated thread, a message loop, or a custom queue.

5. Set Your Custom Context:  
Use SynchronizationContext.SetSynchronizationContext to install your custom context on the current thread.


<details><summary><em>Example</em></summary>

```csharp
public class SimpleSynchronizationContext : SynchronizationContext
{
    private readonly Queue<(SendOrPostCallback, object)> _workItems = new Queue<(SendOrPostCallback, object)>();

    public override void Post(SendOrPostCallback d, state)
    {
        lock (_workItems)
        {
            _workItems.Enqueue((d, state));
        }
        // For demo, immediately process work items (in real use, process on a dedicated thread)
        ProcessWorkItems();
    }

    private void ProcessWorkItems()
    {
        while (true)
        {
            (SendOrPostCallback, object) workItem;
            lock (_workItems)
            {
                if (_workItems.Count == 0) break;
                workItem = _workItems.Dequeue();
            }
            workItem.Item1(workItem.Item2);
        }
    }
}

// Usage:
var customContext = new SimpleSynchronizationContext();
SynchronizationContext.SetSynchronizationContext(customContext);
```
**Notes:**  
Real implementations often run the work items on a dedicated thread or integrate with an event loop.  
Be careful with thread safety and potential deadlocks.  
Custom contexts can be combined with async/await to control where continuations run.  
</details>
<hr/>
</details>

<details><summary><b> What is the difference between SynchronizationContext and TaskScheduler?</b></summary>
Both SynchronizationContext and TaskScheduler are abstractions used to control where and how asynchronous work is executed, but they serve different purposes and operate at different levels in the .NET asynchronous programming model.

**Differences:**

***Purpose and Role:***

****SynchronizationContext:**** 
Primarily designed to manage the execution context for asynchronous continuations, especially in environments with specific threading requirements (e.g., UI threads). It controls how and where the continuation after an await resumes.
****TaskScheduler:****  
Responsible for scheduling and executing Task instances. It manages the queuing and execution of tasks, typically on threads from the thread pool or custom threads.  

***Level of Operation:***

****SynchronizationContext:**** 
Works at a higher logical level, abstracting the synchronization model of the environment (e.g., UI thread, ASP.NET request context).
TaskScheduler:
Works at the task scheduling and execution level, deciding which thread runs a task.



***Typical Usage:***

****SynchronizationContext:****
Used by await to capture and marshal continuations back to the appropriate context (e.g., UI thread).  
****TaskScheduler:****
Used by the Task infrastructure to schedule tasks for execution.  

***Default Implementations:***   
****SynchronizationContext:**** 
Default is null in console apps; UI apps have specialized contexts like DispatcherSynchronizationContext.  
****TaskScheduler:****
Default is ThreadPoolTaskScheduler, which schedules tasks on the .NET thread pool.  

***Customization:***  
****SynchronizationContext:**** 
You can create and set a custom SynchronizationContext to control continuation behavior.  
****TaskScheduler:**** 
You can create custom TaskScheduler implementations to control task execution policies.  

***Interaction:***  
When you await a task, the current SynchronizationContext is captured to resume the continuation appropriately.  
When a Task is started or scheduled, the TaskScheduler determines how and where the task runs.  

***Analogy:***  
Think of SynchronizationContext as the "where should the continuation run?" controller (e.g., UI thread).  
Think of TaskScheduler as the "how and when should this task be executed?" scheduler (e.g., thread pool).  

<details><summary><em>Example</em></summary>
<b>Scenario:</b>
</details>
<hr/>
</details>



<details><summary><b>What is the difference between async void and async Task methods in terms of state machine generation and error handling?  </b></summary>
Both async void and async Task methods are transformed by the compiler into state machines to support asynchronous execution. However, they differ significantly in how their completion and exceptions are handled, which affects error propagation and usage scenarios.

**Differences:**

1. Return Type and Usage:  
***async Task:***
Returns a Task that represents the asynchronous operation. This allows callers to await the method, chain continuations, and handle exceptions.  
***async void:***
Does not return a Task. It is primarily used for event handlers where the method signature cannot be changed. Callers cannot await or catch exceptions from these methods.

2. State Machine Generation:  
Both generate similar state machines to handle asynchronous execution.  
The difference lies in how the state machine interacts with the task builder:  

***async Task*** methods use AsyncTaskMethodBuilder to create and manage a Task.
***async void*** methods use AsyncVoidMethodBuilder, which does not expose a Task.

3. Error Handling:

***async Task:***
Exceptions thrown inside the method are captured and stored in the returned Task. Callers can observe these exceptions by awaiting the task or checking its status.  
***async void:***
Exceptions are not captured in a task and instead are raised directly on the SynchronizationContext or thread pool. This often results in unhandled exceptions that crash the application if not caught globally.  

4. Caller Control:

***async Task:***
Callers have control to await the method, handle exceptions, and compose asynchronous operations.  
***async void:***
Callers have no control over completion or exceptions, making it harder to manage errors and coordinate asynchronous flows.




If you want, I can provide more details on best practices or how to handle exceptions in async void methods. Would you like that?Regenerate
<details><summary><em>Example</em></summary>

``` csharp
// async Task method
public async Task DoWorkAsync()
{
    await Task.Delay(1000);
    throw new Exception("Error in async Task");
}

// async void method
public async void DoWorkVoid()
{
    await Task.Delay(1000);
    throw new Exception("Error in async void");
}
```

Calling DoWorkAsync() and awaiting it allows catching the exception.  
Calling DoWorkVoid() will raise the exception on the synchronization context, potentially crashing the app if unhandled.  


**Best Practices for async void Methods**


1. Limit Usage to Event Handlers:  
Use async void only for event handlers where the method signature is fixed by the framework (e.g., button click events). For all other asynchronous methods, prefer async Task to enable proper error handling and awaiting.

2. Avoid async void in Library Code:
Library methods should return Task or Task<T> to allow callers to await and handle exceptions.

3. Global Exception Handling:
Since exceptions in async void methods cannot be awaited or caught directly, ensure you have global exception handlers in place:

For UI apps, handle Application.DispatcherUnhandledException (WPF) or Application.ThreadException (WinForms).
For console apps, handle AppDomain.CurrentDomain.UnhandledException.
For ASP.NET apps, use middleware or global error handlers.

4. Try-Catch Inside async void:
Wrap the method body in a try-catch block to handle exceptions locally and prevent unhandled exceptions from crashing the app.

**Additional Details:**

***Why async void Exceptions Are Dangerous:***
Because the caller cannot await or catch exceptions, unhandled exceptions in async void methods propagate to the synchronization context and often crash the application.

***How AsyncVoidMethodBuilder Works:***
Unlike AsyncTaskMethodBuilder, AsyncVoidMethodBuilder does not expose a Task. It reports exceptions directly to the synchronization context’s unhandled exception handler.

***Debugging Tips:***
When debugging, unhandled exceptions in async void methods may appear as application crashes or silent fail
</details>
<hr/>
</details>

<details><summary><b>What is the difference between a thread and a task?</b></summary>

**Thread:**
A thread is a low-level operating system construct representing a single sequence of execution within a process. You create and manage threads explicitly, and each thread has its own stack and execution context. Threads are relatively heavy-weight and consume more system resources.

**Task:**
A task is a higher-level abstraction provided by .NET’s Task Parallel Library (TPL) that represents an asynchronous operation or unit of work. Tasks are scheduled and managed by the runtime, often running on threads from the thread pool. Tasks are lightweight, support continuations, cancellation, and exception handling, and are the preferred way to write asynchronous and parallel code in modern .NET.

<details><summary><em>Example</em></summary>

``` csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        // Example using Thread
        Thread thread = new Thread(() =>
        {
            Console.WriteLine($"Thread: Running on thread {Thread.CurrentThread.ManagedThreadId}");
        });
        thread.Start();
        thread.Join(); // Wait for thread to finish

        // Example using Task
        Task task = Task.Run(() =>
        {
            Console.WriteLine($"Task: Running on thread {Thread.CurrentThread.ManagedThreadId}");
        });
        task.Wait(); // Wait for task to complete
    }
}
```

***Thread Example:***  
A new Thread is created with a delegate that prints the current thread ID.  
The thread is started explicitly with thread.Start().  
The main thread waits for the new thread to finish using thread.Join().  

***Task Example:***  
A Task is created and started using Task.Run, which schedules the work on a thread pool thread.  
The main thread waits for the task to complete using task.Wait().

**Key Points:**  
Threads are manually created and managed; tasks are scheduled and managed by the runtime.  
Tasks are generally preferred for asynchronous and parallel programming due to better scalability and easier error handling.  
Threads are heavier and more resource-intensive compared to tasks.  
</details>
<hr/>
</details>
<details><summary><b>What is thread pooling, and why is it important?</b></summary>
Thread pooling is a technique where a pool of pre-created, reusable threads is maintained by the system (such as the .NET ThreadPool) to execute multiple tasks efficiently. Instead of creating a new thread for each task, tasks are assigned to existing threads in the pool. This reduces the overhead of thread creation and destruction, improves resource management, and enhances application performance and scalability.

<details><summary><em>Example</em></summary>

``` csharp
using System;
using System.Threading;

class Program
{
    static void Main()
    {
        // Queue a task to the thread pool
        ThreadPool.QueueUserWorkItem(state =>
        {
            Console.WriteLine($"Task running on thread {Thread.CurrentThread.ManagedThreadId}");
        });

        // Prevent the application from exiting immediately
        Console.ReadLine();
    }
}
```

***Queue Work Item:***
The method ThreadPool.QueueUserWorkItem is called with a delegate representing the work to be done. This schedules the work to run on a thread pool thread.

***Thread Pool Management:***
The thread pool manages a set of worker threads. It assigns the queued work to an available thread from the pool.

***Task Execution:***
The queued task runs on a thread pool thread, printing the current thread ID.

***Thread Reuse:***
After completing the task, the thread returns to the pool, ready to execute other queued tasks, avoiding the overhead of creating new threads.

**Why Thread Pooling Is Important:**  
***Reduces Overhead:*** Avoids the cost of creating and destroying threads repeatedly.  
***Improves Performance:*** Threads are reused, leading to faster task execution.  
***Manages Resources:*** Limits the number of concurrent threads to prevent resource exhaustion.  
***Enhances Scalability:*** Supports handling many concurrent tasks efficiently.  
***Simplifies Development:*** Developers can queue work without managing thread lifecycle explicitly.  

</details>
<hr/>
</details>

<details><summary><b>What is the difference between Parallel.For and Task.Run?</b></summary>

**Parallel.For:**
Designed for parallelizing loops where iterations can run concurrently. It divides the loop iterations across multiple threads to execute them in parallel, optimizing CPU-bound work that can be split into independent chunks.

**Task.Run:**
Used to run a single operation asynchronously on a thread pool thread. It wraps a delegate or method call into a Task and schedules it for execution, useful for offloading work from the main thread or running asynchronous operations.
<details><summary><em>Example</em></summary>

``` csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        Console.WriteLine("Parallel.For example:");
        ParallelForExample();

        Console.WriteLine("\nTask.Run example:");
        TaskRunExample().Wait();

        Console.ReadLine();
    }

    // Parallel.For example: parallelizing loop iterations
    static void ParallelForExample()
    {
        Parallel.For(0, 5, i =>
        {
            Console.WriteLine($"Parallel.For iteration {i} running on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(500); // Simulate work
        });
    }

    // Task.Run example: running a single task asynchronously
    static async Task TaskRunExample()
    {
        await Task.Run(() =>
        {
            Console.WriteLine($"Task.Run running on thread {Thread.CurrentThread.ManagedThreadId}");
            Thread.Sleep(1000); // Simulate work
        });
    }
}
```

***Parallel.For Example:***  
The Parallel.For method executes iterations of a loop concurrently.  
Each iteration runs on a thread pool thread.  
The example prints the iteration number and thread ID, showing multiple iterations running in parallel.  

***Task.Run Example:***  
Task.Run schedules a single delegate to run asynchronously on a thread pool thread.  
The example runs a single task that prints the thread ID and simulates work.  
The main method waits for the task to complete using Wait().  

**Key Points:**  
Use Parallel.For when you have a loop with independent iterations that can be processed in parallel.  
Use Task.Run to run a single operation asynchronously, often to offload work from the UI thread or start background processing.  
Parallel.For is optimized for parallel loops, while Task.Run is more general-purpose for asynchronous execution.
</details>
<hr/>
</details>
<details><summary><b>What happens if an exception is thrown inside a Parallel.For loop? How do you handle it?</b></summary>
If an exception is thrown inside any iteration of a Parallel.For loop, the loop stops executing further iterations, and the exceptions from all faulted iterations are aggregated into an AggregateException. This exception is then thrown by the Parallel.For method. To handle exceptions, you catch the AggregateException and inspect its InnerExceptions collection.

***What Happens When an Exception Is Thrown:***  
The Parallel.For loop monitors all iterations for exceptions.  
If one or more iterations throw exceptions, the loop halts as soon as possible.  
All exceptions thrown by iterations are collected into an AggregateException.  
The Parallel.For method throws this AggregateException after stopping.  

***How to Handle Exceptions:***  
Wrap the Parallel.For call in a try-catch block.  
Catch the AggregateException.  
Iterate through the InnerExceptions to handle or log each exception.  
<details><summary><em>Example</em></summary>

``` csharp
using System;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        try
        {
            Parallel.For(0, 10, i =>
            {
                if (i == 5)
                {
                    throw new InvalidOperationException("Error at iteration 5");
                }
                Console.WriteLine($"Iteration {i} completed successfully.");
            });
        }
        catch (AggregateException ae)
        {
            Console.WriteLine("Exceptions caught in Parallel.For:");
            foreach (var ex in ae.InnerExceptions)
            {
                Console.WriteLine($" - {ex.GetType().Name}: {ex.Message}");
            }
        }
    }
}
```

The loop runs iterations from 0 to 9.  
When iteration 5 throws an exception, the loop stops further iterations.  
The AggregateException contains the exception from iteration 5 (and any others if multiple iterations faulted).  
The catch block processes all exceptions.  

**Key Points:**  
Parallel.For aggregates exceptions from all faulted iterations.  
The loop stops as soon as an exception is detected but may have already started other iterations.  
Always catch AggregateException when using Parallel.For to handle exceptions properly.  
You can inspect or log individual exceptions from InnerExceptions.  
</details>
<hr/>
</details>

<details><summary><b>Can you cancel a Parallel.For loop? If so, how?</b></summary>
Yes, you can cancel a Parallel.For loop by using a CancellationToken in combination with a ParallelOptions object. The loop periodically checks the token’s cancellation state and stops execution when cancellation is requested.

***How to Cancel a Parallel.For Loop:***  
Create a CancellationTokenSource.  
Pass a ParallelOptions object with the CancellationToken to Parallel.For.  
Inside the loop body, periodically check for cancellation by calling token.ThrowIfCancellationRequested().  
Request cancellation by calling CancellationTokenSource.Cancel() from another thread or event.  
Handle the OperationCanceledException thrown when cancellation occurs.  
<details><summary><em>Example</em></summary>

``` csharp
using System;
using System.Threading;
using System.Threading.Tasks;

class Program
{
    static void Main()
    {
        var cts = new CancellationTokenSource();
        var options = new ParallelOptions { CancellationToken = cts.Token };

        // Start a task to cancel after 1 second
        Task.Run(() =>
        {
            Thread.Sleep(1000);
            Console.WriteLine("Requesting cancellation...");
            cts.Cancel();
        });

        try
        {
            Parallel.For(0, 10, options, i =>
            {
                Console.WriteLine($"Iteration {i} started.");
                Thread.Sleep(500); // Simulate work

                // Check for cancellation
                options.CancellationToken.ThrowIfCancellationRequested();

                Console.WriteLine($"Iteration {i} completed.");
            });
        }
        catch (OperationCanceledException)
        {
            Console.WriteLine("Parallel.For loop was canceled.");
        }
    }
}
```
</details>
<hr/>
</details>
<details><summary><b>What is the difference between Task.WaitAll and Task.WhenAll?</b></summary>

**Task.WaitAll:**
A blocking method that waits synchronously for all provided tasks to complete. It blocks the calling thread until all tasks finish, which can lead to thread starvation or deadlocks if used improperly, especially in UI or async contexts.

**Task.WhenAll:**
An asynchronous method that returns a task which completes when all the provided tasks complete. It allows you to await the completion of multiple tasks without blocking the calling thread, making it suitable for async programming.

<details><summary><em>Example</em></summary>

``` csharp
using System;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        Task task1 = Task.Delay(1000);
        Task task2 = Task.Delay(1500);

        // Using Task.WaitAll (blocks the thread)
        Console.WriteLine("Starting Task.WaitAll...");
        Task.WaitAll(task1, task2);
        Console.WriteLine("Task.WaitAll completed.");

        // Using Task.WhenAll (awaits asynchronously)
        Console.WriteLine("Starting Task.WhenAll...");
        await Task.WhenAll(Task.Delay(1000), Task.Delay(1500));
        Console.WriteLine("Task.WhenAll completed.");
    }
}
```

***Task.WaitAll:***  
Called with multiple tasks.  
Blocks the current thread until all tasks complete.  
Suitable for synchronous code but can cause blocking issues in async contexts.

***Task.WhenAll:***  
Called with multiple tasks.  
Returns a task that completes when all tasks complete.  
Can be awaited asynchronously, allowing the calling thread to continue other work.  

**Key Points:**  
Use Task.WaitAll when you need to block synchronously and wait for tasks to finish (e.g., in console apps or synchronous code).  
Use Task.WhenAll in asynchronous methods to await multiple tasks without blocking.  
Task.WhenAll integrates better with async/await and avoids blocking threads. 
Both methods aggregate exceptions from all tasks.  
</details>
<hr/>
</details>
</details>


<hr/>


<details><summary><b>Can a static class have constructors? If yes, what kind?</b></summary>
Yes, a static class can have a constructor, but it can only have a static constructor (also called a type initializer).  

**Explanation:**  
Static constructors are special constructors used to initialize static data or perform actions that need to be done once per type.  
They have no access modifiers (always private), no parameters, and cannot be called explicitly.  
The runtime calls the static constructor automatically before the first use of any static member or before creating any instance (though static classes cannot be instantiated).  
Static classes cannot have instance constructors because you cannot create instances of static classes.  

<details><summary><em>Example</em></summary>

```csharp
static class Utility
{
    static Utility()
    {
        Console.WriteLine("Static constructor called.");
        // Initialization code here
    }

    public static void DoWork()
    {
        Console.WriteLine("Doing work.");
    }
}

// Usage
Utility.DoWork();
// Output:
// Static constructor called.
// Doing work.
```

**Key Points:**  
Static classes can only have static constructors.  
Static constructors are called once automatically by the runtime.  
No parameters or access modifiers allowed on static constructors.  
Useful for initializing static fields or performing setup.  

</details>
<hr/>
</details>

<details><summary><b></b></summary>

<details><summary><em>Example</em></summary>

</details>
<hr/>
</details>


