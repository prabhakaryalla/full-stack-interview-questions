## Javascript Interview Questions & Answers

### Questions
- [What are different data types available in javascript?](#what-are-different-data-types-available-in-javascript)
- [What's the difference between var, const and let?](#whats-the-difference-between-var-const-and-let)
- [What is the difference between undefined and null value?](#what-is-the-difference-between-undefined-and-null-value)
- [What is the use of Window object?](#what-is-the-use-of-window-object)
- [How to access elements in the DOM](#how-to-access-elements-in-the-dom)
- [What are classes in ES6?](#what-are-classes-in-es6)
- [What is difference between cookie, local storage and session storage?](#what-is-difference-between-cookie-local-storage-and-session-storage)
- [What is the difference between setInterval and setTimeout?](#what-is-the-difference-between-setinterval-and-settimeout)
- [What is the difference between document.onload and window.onload?](#what-is-the-difference-between-documentonload-and-windowonload)
- [What are arrow function? How they are different from normal functions?](#what-are-arrow-function-how-they-are-different-from-normal-functions)
- [What is Higher Order Function?](#what-is-higher-order-function)


- [Built-in Functions?]()




- [What is this [[[]]]?](#)




- [What is this keyword?](#)
- [What are promises? How do you call promises?](#)
- [What is difference between promises and observables?](#)
- [What is callback hell?](#)
- [Explain closures?](#)
- [What are pure functions?](#)
- [Difference between == and ===?](#)


- [Explain destruction in javascript?](#)
- [What are spread and rest operators?](#)
- [What is event propogation, event capturing and event bubling?](#)
- [What is function currying?](#)
- [Difference between call, apply and bind?](#)
- [What is weakMap and weakSet?](#)
- [What is function execution context and global exeution context?](#)
- [What is scope in js?](#)
- [How to create array? List some of array methods?](#)
- [What is hoisting?](#)
- [What is Destruction?](#)
- [](#)
- [](#)

***

### What are different data types available in javascript?

JavaScript has 8 Datatypes
- String
- Number
- Bigint
- Boolean
- Undefined
- Null
- Symbol
- Object

The object data type can contain:
- An object
- An array
- A date

***

### What's the difference between var, const and let?

#### Var
* var declarations are globally scoped or function/locally scoped.
```js
    var tester = "hey hi";    
    function newFunction() {
        var hello = "hello";
    }
    console.log(hello); // error: hello is not defined
```
* var variables can be re-declared and updated.
* var variables are hoisted to the top of their scope and initialized with a value of undefined.

#### Problems with Var
```js
    var greeter = "hey hi";
    var times = 4;
    if (times > 3) {
        var greeter = "say Hello instead"; 
    }    
    console.log(greeter) // "say Hello instead"
```
If you have used greeter in other parts of your code, you might be surprised at the output you might get. 

#### Let
* let is block scoped
* let can be updated but not re-declared.

```js
    let greeting = "say Hi";
    let greeting = "say Hello instead"; // error: Identifier 'greeting' has already been declared
```
However, if the same variable is defined in different scopes, there will be no error

```js
    let greeting = "say Hi";
    if (true) {
        let greeting = "say Hello instead";
        console.log(greeting); // "say Hello instead"
    }
    console.log(greeting); // "say Hi"
```
* Hoisting of let: Just like var, let declarations are hoisted to the top. Unlike var which is initialized as undefined, the let keyword is not initialized. So if you try to use a let variable before declaration, you'll get a Reference Error.

#### Const
Variables declared with the const maintain constant values. const declarations share some similarities with let declarations.
* const declarations are block scoped
* const cannot be updated or re-declared

This behavior is somehow different when it comes to objects declared with const. While a const object cannot be updated, the properties of this objects can be updated.
```js
    const greeting = {
        message: "say Hi",
        times: 4
    }
```
while we cannot do this:
```js
    greeting = {
        words: "Hello",
        number: "five"
    } // error:  Assignment to constant variable.
```
we can do this:

```js
    greeting.message = "say Hello instead";
```
* Hoisting of const: Just like let, const declarations are hoisted to the top but are not initialized.

***

### What is the difference between undefined and null value?

**undefined** means a variable has been declared but has not yet been assigned a value
```js
var testVar;
console.log(testVar); //shows undefined
console.log(typeof testVar); //shows undefined
```
**null** is an assignment value. It can be assigned to a variable as a representation of no value
```js
var testVar = null;
console.log(testVar); //shows null
console.log(typeof testVar); //shows object
```
From the preceding examples, it is clear that undefined and null are two distinct types: undefined is a type itself (undefined) while null is an object
```js
console.log(null === undefined) // false (not the same type)
console.log(null == undefined) // true (but the "same value")
console.log(null === null) // true (both type and value are the same)
```
***

### What is the use of Window object?

The window object is supported by all browsers. It represents the browser's window.

All global JavaScript objects, functions, and variables automatically become members of the window object.

Global variables are properties of the window object.

Global functions are methods of the window object.

Even the document object (of the HTML DOM) is a property of the window object:
```js
window.document.getElementById("header");
```

is the same as:
```js
document.getElementById("header");
```

***

### How to access elements in the DOM?
Usually when we access content in the DOM, it will be through an HTML element node.
Here is a table overview of the five methods

Gets|Selector Syntax|Method|
---|---|---|
ID|#demo|getElementById()|
Class|.demo|getElementsByClassName()|
Tag|demo|getElementsByTagName()|
Selector (single)||querySelector()|
Selector (all)||querySelectorAll()|
***

### What are classes in ES6?

Classes are used to define the blueprint for real-world object modeling and organize the code into reusable and logical parts.

Before ES6, it was hard to create a class in JavaScript. But in ES6, we can create the class by using the class keyword. We can include classes in our code either by class expression or by using a class declaration.

A class definition can only include constructors and functions. These components are together called as the data members of a class. The classes contain constructors that allocates the memory to the objects of a class. Classes contain functions that are responsible for performing the actions to the objects.

***

### What is difference between cookie, local storage and session storage?

The HTTP protocol is one of the most important protocols for smooth communication between the server and the client. The main disadvantage of the HTTP protocol is that it is a stateless protocol, which means it does not track any kind of response or request by the server or the client. So in order to resolve this problem, there are three ways to track useful information.

#### Local Storage
Local storage is a storage mechanism that allows web applications to store data persistently in the user’s browser. It is composed of key-value pairs and can be stored without an expiration date. Local storage is typically used to store user preferences, application settings, and cached data. Most modern web browsers provide a local storage limit of around 5–10MB per origin.

There are four commonly used methods to manage data in local storage:
- **setItem(key, value)** to add the key and value to the storage or update the value if the key already exists.
- **getItem(key)** to get the value based on the key.
- **removeItem(key)** to remove the specific local storage item based on the key.
- **clear()** to remove all the data in the local storage.

#### Session Storage
Session storage is similar to local storage but limited to the current session or tab. It is commonly used for maintaining state during a user’s interaction with a web application.

Session storage is useful for storing data that needs to be available as long as the session is active but does not need to persist across multiple sessions or browser restarts. The size limit for session storage is generally around 5–10MB, similar to local storage.

Similar to local storage, there are four commonly used methods to manage data in session storage
- **setItem(key, value)** to add the key and value to the storage or update the value if the key already exists.
- **getItem(key)** to get the value based on the key.
- **removeItem(key)** to remove the specific session storage item based on the key.
- **clear()** to remove all the data in session storage.

#### Cookies
Before HTML5 was introduced, cookies were the only option to store data on the client side. Cookies are also sent to the server with every HTTP request. With this behavior, the server also has access to the cookies, allowing websites to personalize content, remember user preferences, and user authentication.

Similar to local storage and session storage, cookies also can be created, updated, or read through JavaScript with document.cookies, and we can restrict its access with the HttpOnly flag to mitigate a few security issues, such as cross-site scripting.

There are two categories of cookies, persistent cookies and session cookies. The main difference between them lies in their lifespan and persistence.

**Persistent Cookies**
Persistent cookies have an expiration date that is specified in Expires or Max-Age attributes and persist across different browsing sessions. Even if the user closes the browser and returns to the website later, the persistent cookies can be accessed to personalize the experience or restore previous values. They remain on the user’s browser until their expiration date is reached or until the user manually deletes them.

**Session Cookies**
Session cookies have no specific expiration time set. They are created and stored on the user’s browser only for the duration of the session and are not accessible across different sessions. Session cookies are typically cleared automatically once the user closes the browser or tab.

```js
document.cookie = "language=en";
document.cookie = "currency=IN";
console.log(document.cookie); //language=en; currency=IN;
document.cookie = "currency=;Max-Age=0"; //Delete currency cookie
console.log(document.cookie); // language=en;
```

***

### What is the difference between setInterval and setTimeout?

#### setTimeout() 
**setTimeout(function, duration)** − This function calls function after duration milliseconds from now.
```js
setTimeout(function() { alert('Hello');}, 2000);
```
It waits for 2000 milliseconds, and then runs the callback function alert('Hello')

#### setInterval()
**setInterval(function, duration)** − This function calls function after every duration milliseconds. This goes for unlimited times.
```js
setInterval(function() { alert('Hello');}, 2000);
```
It triggers the alert('Hello') after every 2000 milliseconds, not only once

*** 

### What is the difference between document.onload and window.onload?

**document.onload**: It gets fired prior to loading of images and other external content. document.onload event is fired before the window.onload.
**window.onload** : It gets fired when the complete page loads, which includes images, scripts, css, etc.

***

### What are arrow function? How they are different from normal functions?

Both regular and arrow functions work in a similar manner, there are certain interesting differences between them, as discussed below.
**Regular function**
```js
let square = function(x){
      return (x*x);
    };
console.log(square(9));
```
**Arrow function**
```js
var square = (x) => {
        return (x*x);
    };
console.log(square(9));
```

**Use of this keyword:** Unlike regular functions, arrow functions do not have their own this. 
```js
    let user = {
        name: "GFG",
        gfg1:() => {
            console.log("hello " + this.name); // no 'this' binding here
        },
        gfg2(){    
            console.log("Welcome to " + this.name); // 'this' binding works here
        }
    };
    user.gfg1();
    user.gfg2();
```
**Output**
```js
hello undefined
Welcome to GFG
```
**Availability of arguments objects:**  Arguments objects are not available in arrow functions, but are available in regular functions
```js
    let user = {    
        show(){
            console.log(arguments);
        }
    };
    user.show(1, 2, 3);
```

**Output**
```js
(3) {0: 1, 1: 2, 2: 3}
```

```js
    let user = {    
            show_ar : () => {
            console.log(...arguments);
        }
    };
    user.show_ar(1, 2, 3);
```

**Output**
ReferenceError: arguments is not defined
    at Object.show_ar (<anonymous>:4:20)
    at <anonymous>:7:6
    at mn (<anonymous>:16:5455)
```

**Using new keyword:** Regular functions created using function declarations or expressions are ‘constructible’ and ‘callable’. Since regular functions are constructible, they can be called using the ‘new’ keyword. However, the arrow functions are only ‘callable’ and not constructible. Thus, we will get a run-time error on trying to construct a non-constructible arrow function using the new keyword.
```js
    let x = function(){
    console.log(arguments);
    };
    var y= new x(1,2,3);
```
**Output**
```js
(3) {0: 1, 1: 2, 2: 3}
```
```js
    let x = ()=> {
        console.log(arguments);
    };
    new x(1,2,3);
```

**Output**
```js
TypeError: x is not a constructor
    at <anonymous>:11:1
    at mn (<anonymous>:16:5455)
```
***

### What is Higher Order Function?
Higher Orders Functions are functions that perform operations on other functions.

Without a higher order function, if I want to add one to each number in an array and display it in the console, I can do the following:
```js
const numbers = [1, 2, 3, 4, 5];

function addOne(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i] + 1);
  }
}

addOne(numbers);
```

However, using what may be the most common higher order function, forEach(), we can simplify this process:
```js
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((number) => console.log(number + 1));
```

Without a higher order function, if I wanted to create a new array that only has the odd numbers from the numbers array, I could do the following:
```js
const numbers = [1, 2, 3, 4, 5];

function isOdd(array, oddArr = []) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] % 2 !== 0) {
      oddArr.push(array[i]);
    }
  }
  return oddArr;
}

const oddArray = isOdd(numbers);
console.log(oddArray);
```

If we use the higher order function, filter(), we can abstract so much:
```js
const numbers = [1, 2, 3, 4, 5];
const oddArray = numbers.filter((number) => number % 2 !== 0);
console.log(oddArray);
```

***


### 

***

### 

***

### Array methods

```js
[4,5,6,7].at(1)                                   // 5
[4,5,6,7].push(8)                                 // [4,5,6,7,8]
[4,5,6,7].pop()                                   // [4,5,6]
[4,5,6,7].fill(1)                                 // [1,1,1,1]
[4,5,6,7].join(' ')                               // 4 5 6 7 (string)
[4,5,6,7].shift()                                 // [5,6,7]
[4,5,6,7].reverse()                               // [7,6,5,4]
[4,5,6,7].unshift(3)                              // [3,4,5,6,7]
[4,5,6,7].includes(6)                             // true
[4,5,6,7].map(item => item*2)                     // [8,10,12,14]
[4,5,6,7].filter(item => item > 5)                // [6,7]
[4,5,6,7].find(item => item > 5)                  // 6 (first match)
[4,5,6,7].every(item => item > 0)                 // true
[4,5,6,7].findIndex(item => item = 5)             // 1
[4,5,6,7].reduce((prev, curr) => prev + curr, 0)  // 22
```
***

### What is 'THIS' Keyword?

```js
const obj = {
    name: "Prabhakar",
    showName: function() { return this.name; }
}

console.log(obj.showName()) // "Prabhakar"

```
***

### What is Rest operator?
The rest parameter syntax allows a function to accept infinite number of argumenets as an array

```js
function sum(...args)
{
    let total = 0;
    for(const arg of args)
    {
        total += arg;
    }
    return total;
}

sum(1,1) //2
sum(1,2,3) //6
sum(2,4,6,8,10) //30
```
***

### What is Destruction?

```js
obj = {name: "Prabhakara" , ...}
{name} = obj; // name = "Prabhakara"
{name:n1} = obj; // n1 = "Prabhakara"
{age= 33} = obj; // age = 23 (if age doesnt exist in obj)
{name, ...rest} = obj; // rest will store the rest of the obj paramerers
```
***