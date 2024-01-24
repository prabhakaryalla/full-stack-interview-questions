## Javascript Interview Questions & Answers

### Questions
- [What's the difference between var, const and let?](#whats-the-difference-between-var-const-and-let)
- [What is the difference between undefined and null value?](#)

- [Built-in Functions?]()

- [What is the use of Window object?](#)
- [What are different data types available in javascript?](#)

- [What is this [[[]]]?](#)
- [What are classes in ES6?](#)
- [What is difference between cookie, local storage and session storage?](#)
- [What is the difference between setInterval and setTimeout?](#)
- [What are arrow function? How they are different from normal functions?](#)
- [What is this keyword?](#)
- [What are promises? How do you call promises?](#)
- [What is difference between promises and observables?](#)
- [What is callback hell?](#)
- [Explain closures?](#)
- [What are pure functions?](#)
- [Difference between == and ===?](#)
- [How to access DOM elements using js?](#)
- [What are higher order functions?](#)
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