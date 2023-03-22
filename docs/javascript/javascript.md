## Javascript Interview Questions & Answers

### Questions

- [Built-in Functions?]()

- [What is the use of Window object?](#)
- [What are different data types available in javascript?](#)
- [What is the difference between undefined and null value?](#)
- [What is this [[[]]]?](#)
- [What are classes in ES6?](#)
- [What is difference between cookie, local storage and session storage?](#)
- [What is the difference between setInterval and setTimeout ?](#)
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
- [Difference between var and let?](#)
- [Difference between call, apply and bind?](#)
- [What is weakMap and weakSet?](#)
- [What is function execution context and global exeution context?](#)
- [What is scope in js?](#)
- [How to create array? List some of array methods?](#)
- [What is hoisting?](#)
- [](#)
- [](#)
- [](#)

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
What is Destruction?

```js
obj = {name: "Prabhakara" , ...}
{name} = obj; // name = "Prabhakara"
{name:n1} = obj; // n1 = "Prabhakara"
{age= 33} = obj; // age = 23 (if age doesnt exist in obj)
{name, ...rest} = obj; // rest will store the rest of the obj paramerers
```
***