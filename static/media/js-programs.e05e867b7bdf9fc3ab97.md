### What is the ouput of below?
```js
console.log(1+2+'3'+4+5)
```
**Output**
```js
3345
```
***

### What is the ouput of below?
```js
console.log([1,2,3] + 'a')
```
**Output**
```js
1,2,3a
```
***

### What is the ouput of below?
```js
console.log([1,2,3] + 4)
```
**Output**
```js
1,2,34
```
***

### What is the ouput of below?
```js
console.log(test);
var test;
```
**Output**
```js
undefined
```
***

### What is the ouput of below?
```js
console.log(test);
let test;
```
**Output**
Just like var, let & const declarations are hoisted to the top. Unlike var which is initialized as undefined, the let keyword is not initialized.
```js
ReferenceError: Cannot access 'test' before initialization
```
***

### What is the output of below?
```js
console.log(10 == "10")
console.log(10 === "10");
console.log(10 === 10);
```

**Output**
```js
true
false
true
```
***

### What's the result of the equality check?

```js
console.log(0.1 + 0.2 === 0.3 )
```

**Output**
```js
false
```
**Explanation**

First, let's look at the value of 0.1 + 0.2:

```js
0.1 + 0.2; // => 0.30000000000000004
```
The sum of 0.1 and 0.2 numbers is not exactly 0.3, but slightly above 0.3.

Due to how floating point numbers are encoded in binary, operations like addition of floating point numbers are subject to rounding errors.

Simply put, comparing floats directly is not precise.

Thus 0.1 + 0.2 === 0.3 is false.

[Read More](https://0.30000000000000004.com/)

***

### What is the output of below code?

```js
function foo() {
  let a = b = 0;
  a++;
  return a;
}

foo();
console.log(typeof a);
console.log(typeof b); 
```

**Output**
```js
undefined
number
```

**Explanation**

 #### Accidental global variable

 Let's look at the line 2: let a = b = 0. This statement declares a local variable a. However, it does declare a global variable b.

 No variable b is declared neither in the foo() scope or global scope. So JavaScript interprets b = 0 expression as window.b = 0. In other words, b is a global variable created accidentally.

```js
function foo() {
  let a;
  window.b = 0;
  a = window.b;
  a++;
  return a;
}

foo();
typeof a;        // => 'undefined'
typeof window.b; // => 'number'
```
***

### What is the value of clothes[0]?

```js
const clothes = ['jacket', 't-shirt'];
clothes.length = 0;

console.log(clothes[0]);
```

**Output**
```js
undefined
```

**Explanation**

length property of the array object has a special behavior: 

Reducing the value of the length property has the side-effect of deleting own array elements whose array index is between the old and new length values.

As result when JavaScript executes clothes.length = 0, all clothes items are deleted.

clothes[0] is undefined, because clothes array has been emptied.

***

### What is the content of numbers array?

```js
const length = 4;
const numbers = [];
for (var i = 0; i < length; i++);{
  numbers.push(i + 1);
}

console.log(numbers);
```

**Output**
```js
[ 5 ]
```

**Explanation**

Let's take a closer look at the semicolon ; that appears right before the opening curly brace {:

***

### What value is returned by arrayFromValue()?

```js
function arrayFromValue(item) {
  return
    [item];
}

console.log(arrayFromValue(10));
```

**Output**
```js
undefined
```

**Explanation**

It's easy to miss the new line between the return keyword and [item] expression.

However, this newline makes the JavaScript automatically insert a semicolon between return and [item] expression.

Here's an equivalent code with the semicolon inserted after return:

```js
function arrayFromValue(item) {
  return;
  [item];
}
```

***

### What is the output of below?

```js
var vehicle = {
    type: 'tata',
    logInfo: function() {
        var THIS = this;
        console.log('1. this.type', this.type);
        console.log('1. THIS.type', THIS.type);

        (function () {
            console.log('2. this.type', this.type);
            console.log('2. THIS.type', THIS.type);
        })();
    }
};

vehicle.logInfo();
```

**Output**

```js
1. this.type tata
1. THIS.type tata
2. this.type undefined
2. THIS.type tata
```

**Explanation**

``var THIS = this;`` this creates a variable reference to the original this object as it exists within the logInfo.

Now, since the logInfo is both a function expression and member of vehicle, this this object is going to represent the owner of the vehicle object itself, which means that both of the next console logs for this.type is tata.

Now we have that anonymous inner function. First it does console.log of this.type. The anonymous inner function doesn't actually create this object that is bound to the owner object, even though it happens to be a function that is within the method itself. It has to be a method of the object. so this.type is going to be that global window object or its the global object which was blocked for the security reasons, which means this.type should be undefined because this.type hasn't been set yet, just like this element was undefined in the global object.

THIS.type hasn't changed in between getting to this log and the log that came before, that means THIS is still representation of that original this object, which means THIS.type shoud be still tata.

***

### Write the function sum 

```js
sum(1)(2)(3)(4)(5)(result => console.log('result', result))
```
such that the above function should log "result 15"

**Answer**

Currying is when you break down a function that takes multiple arguments into a series of functions that take part of the arguments.

```js
function sum(a) {
    return function (b) {
        return function (c) {
            return function (d) {
                return function (e) {
                    const total = a + b + c + d + e;
                    return function (callback) {
                        callback(total);
                    }
                }
            }
        }
    }
}
```

```js
// higher-order function
// 1. it returns a function itself
// OR
// 2. takes another argument as function

```
---

### What do each of the below lines evaluate to?

```js
typeof typeof 1

"1" + "2"
1 + "2"
1 + +"2"
true + 1

1 < 2 < 3
3 > 2 > 1

type of []
```

**Output**

```js
'string'

'12'
'12'
3
2

true
false

'object'
```

**Explanation**

typeof 1 return "number" which is a string. so typeof typeof 1 is "string".

"1" + "2" here string concatination is applied which joins the two string together as one word which results in "12"

1 + "2"  Javascript in addition to dynamically typed, is also a weakly typed (which values can be converted into different datatypes when used in operations and the conversion is implicit).
For example 
```js
foreach(var i =0; i< 3; i++)
{
    console.log('step-', i);
}
```
In the above console.log i is implicitly converted to string and appended to "step-"

Similarly in 1 + "2", 1 is implicitly converted to string, so the output is "12".

1 + +"2" --> Here +"2" is converted to number 2 explicitly. so the output is 3

true + 1  --> Again here javascript is going to do implicit conversion. Here true means 1 and we are adding 1 + 1. so the output will be 2.

1 < 2 < 3 --> Here first (1 < 2) returns true. Next true < 3 which converts true to 1 which means 1 < 3 which results true

3 > 2 > 1 --> here first 3 > 2 return true. Next true > 1 which implicitly converts true to 1 which means 1 > 1 which reults in false.

typeof [] --> The underlying implementation of array itself is an object. 
we can do a property test to confirm whether it is an object

for example 
```js
var map = {}
map.test = "foo";

// when we access map.test we get "foo"; so we know this map is an object

var list = [];
list.test = "foo";

// so when we access with list.test we get "foo";

var count = 5;
count.test = "foo";

// when we access count.test we get undefined. this will not work for the primitive datatypes like 
//string, numbers, booleans, undefined and null aren't objects under the hood
```

Also functions are objects under the hood

```js
var info = function() { }
info.test = "foo";

// when we try to retieve info.test we get foo;

typeof info // 'function'
```

Array and function has propert test, but array return object whereas function returns different type othen than object ("function"). We need to dig into prototypes in Javascript

---

### What is the output of below code?

```js
let x = 'red';

{
    let x = 'green';
    console.log('1: ', x);

    (function() {
        console.log('2: ', x);
        var x = 'blue';
        console.log('3: ', x);
    })();
}

console.log('4: ', x);
```

**Output**
```js
1:  green
2:  undefined
3:  blue
4:  red
```
The code between { } is scoped differently.

Inside anonmous function, x is created with var. var's created with a var keyword behave differently than let variables and constants variables. var do hoisting, which means their values are hosied to the top of the function scope.

the cod will be something like

```js
(function() {
        var x;
        console.log('2: ', x); // undefned
        x = 'blue';
        console.log('3: ', x);
    })();
```

if we use let  in anonymous function instead of var , we get the below exception

``Uncaught ReferenceError: Cannot access 'x' before initialization``

---

### what is the output?

```js
const prabhakar = {
     surname: 'Yalla',
     age: 33,
     family: {
        father: 'Satynarayana',
        mother: 'Ammaji',
        siblings: ['Rajesh', 'Yamini']
     },
     quote: function() {
        console.log('Make today better than yesterday.')
     }
}

const assignClone = Object.assign({}, prabhakar);
const spreadClone = {...prabhakar};
const jsonClone = JSON.parse(JSON.stringify(prabhakar));

assignClone.age = 35;
assignClone.family.father = "Satyanarayana Yalla";

console.log('prabhakar', prabhakar);
console.log('assignClone', assignClone);
console.log('spreadClone', spreadClone);
console.log('jsonClone', jsonClone);
```
**Output**
```js
prabhakar {surname: 'Yalla', age: 33, family: {…}, quote: ƒ}
age: 33family: {father: 'Satyanarayana Yalla', mother: 'Ammaji', siblings: Array(2)}
quote: ƒ ()surname: "Yalla"[[Prototype]]: Object

assignClone {surname: 'Yalla', age: 35, family: {…}, quote: ƒ}
age: 35family: {father: 'Satyanarayana Yalla', mother: 'Ammaji', siblings: Array(2)}
quote: ƒ ()surname: "Yalla"[[Prototype]]: Object

spreadClone {surname: 'Yalla', age: 33, family: {…}, quote: ƒ}
age: 33family: {father: 'Satyanarayana Yalla', mother: 'Ammaji', siblings: Array(2)}
quote: ƒ ()surname: "Yalla"[[Prototype]]: Object

jsonClone {surname: 'Yalla', age: 33, family: {…}}
age: 33family: {father: 'Satynarayana', mother: 'Ammaji', siblings: Array(2)}
surname: "Yalla"[[Prototype]]: Object
```
**Explanation**

Object.assign(target, source) - First is target and then source object to copy all those properties from and paste them into the target object.

Note that in assigned clone, family is actually a nested object. Object.assign only copies of the most immediate properties from the source to the target. so the implication is that object assign only creates a shallow clone of the object. If one of the properties is an object reference, then only that reference is copied, not the entire inner object itself.

Consider the below

```js
const family = {
    father: 'Satynarayana',
    mother: 'Ammaji',
    siblings: ['Rajesh', 'Yamini']
 }

const prabhakar = {
     surname: 'Yalla',
     age: 33,
     family,
     quote: function() {
        console.log('Make today better than yesterday.')
     }
}

const assignClone = Object.assign({}, prabhakar);

Object.is(assignClone.family, family)
```
Here the output is true. Now here in prabhakar object, family object is actually a reference to this objected created above, in which means that assign.clone family is also going to be that reference. So Object.is returns true when two references are pointing to the same underlying references. So any changes done to the assignClone family father is actually making a change to that original object.

The spread clone have the same vulnerability and indeed it does it does because the spread clone is an alias for object.assign syntax. It created a clone of the source object into target object but only copies the immediate properties.

Json Clone doesnt create a shallow clone, it makes a deep clone. The wa this Json clone works, first its strings off that entre object into a JSOn string. so even the inner nested objects gets converted into JSON string form. And then its reparsed back into a regular object using JSON.parse method. But only certain datatypes are supported in JSON that would be strings, numbers, nulls, and arrays and objects that consist of those values. Note Prabhakar object has quote method. so functions are not supported in JSON, which means in the JSON Clone, the quote method is going to disappear.

---

### How would you do a true deep clone?
Assignclone and Spread clone only copy the shallow reference. We need something which also copies deep references. The problem with JSON clone is that only it supports few data types.

We can always point to the loadash module as a solution.

```js
import _ from 'lodash';

const prabhakar = {
    surname: 'Yalla',
    age: 33,
    family: {
       father: 'Satynarayana',
       mother: 'Ammaji',
       siblings: ['Rajesh', 'Yamini']
    },
    quote: function() {
       console.log('Make today better than yesterday.')
    }
}

const assignClone = Object.assign({}, prabhakar);
const lodashClone = _.cloneDeep(prabhakar);

assignClone.age = 35;
assignClone.family.father = "Satyanarayana Yalla";

console.log('lodashClone', lodashClone);
```

**Output**

```js
lodashClone {surname: 'Yalla', age: 33, family: {…}, quote: ƒ}
age: 33family: {father: 'Satyanarayana', mother: 'Ammaji', siblings: Array(2)}
quote: ƒ ()surname: "Yalla"[[Prototype]]: Object
```
***

### What is the output ?

```js
function Artist (name, talent)
{
    this.name = name;
    this.talent = talent;
}

class Musician extends Artist {
    constructor(name, talent, instrument)
    {
        super(name, talent);
        this.instrument = instrument;
    }
}

const res = new Musician('Prabhakar', 'singer', 'voice');

Object.prototype.info = function() {
    console.log('this', this);
}

res.info();
```

**Output**

```js
this Musician {name: 'Prabhakar', talent: 'singer', instrument: 'voice'}
```

**Explanation**

Using the class keyword is the syntatic sugar around the existing contructor function pattern in javascript. Now its telling that even there is an special contructor function within the class itself. It calls super which invokes the parent constructor and it attaches the instrument argument to a property onto this object.

```js 
const res = new Musician('Prabhakar', 'singer', 'voice');
console.log('result',  res);
```
the output would be 

``result Musician {name: 'Prabhakar', talent: 'singer', instrument: 'voice'}``

Now lets try to add the info method in the Musician and add the console.log

```js
class Musician extends Artist {
    constructor(name, talent, instrument)
    {
        super(name, talent);
        this.instrument = instrument;
    }
    info()
    {
        console.log('this', this);
    }
}

const res = new Musician('Prabhakar', 'singer', 'voice');
res.info();
```

The output would be 

``this Musician {name: 'Prabhakar', talent: 'singer', instrument: 'voice'}``

We can the info method even in the artist function

```js
function Artist (name, talent)
{
    this.name = name;
    this.talent = talent;

    this.info = function() {
        console.log('this', this);
    }
}

class Musician extends Artist {
    constructor(name, talent, instrument)
    {
        super(name, talent);
        this.instrument = instrument;
    }
}

const res = new Musician('Prabhakar', 'singer', 'voice');
res.info();
```

The output would be as below

``this Musician {name: 'Prabhakar', talent: 'singer', instrument: 'voice', info: ƒ}``

Here we have info part because info property is directly attached as a property of the object itself.

Now lets move to Object.Prototype

```js
function Artist (name, talent)
{
    this.name = name;
    this.talent = talent;
}
Artist.prototype
```
The output would be

```js
{constructor: ƒ}
constructor: ƒ Artist(name, talent)
arguments: null
caller: null
length: 2
name: "Artist"
prototype: {constructor: ƒ}
[[FunctionLocation]]: VM88:1
[[Prototype]]: ƒ ()
[[Scopes]]: Scopes[2]
[[Prototype]]: Object
```

Now consider creating new artist using this prototype constructor

```js
const ramesh = new Artist.prototype.constructor('ramesh','painter');
console.log('ramesh', ramesh)
```

The output would be 

``ramesh Artist {name: 'ramesh', talent: 'painter'}``

The prototype is a special property within javascript object because all the descendents and instances of the object itself will receive whatever it contained within that prototype which means ramesh has now access to its constructor. if we can type ramesh.contrcutor it will gives us the contructor for the artist function.

What it means is we can create instances of artist object using an instance itself.

for example

```js
const akhil = new ramesh.constructor('akhil','photographer');
console.log('akhil', akhil);
```
o/p: ``akhil Artist {name: 'akhil', talent: 'photographer'}``

This proptotype is dynamic. we can add new propertis and methods to it.

For example

```js
Artist.prototype.fans = 100;
akhil.fans
```
o/p: ``100``

This shows how prototype based inheritance is works in Javascript. The methods aren't copied from the parent prototype to its descendants and instances when the instance is created. Instead Javascript does a lookup process to see if the method is available. So when we type akhil.fans first it checks whether its directly attached on the instance. so then its looks in the prototype for its constructor and its contructor is Artist.prototype, it finds that fans is defined there on the artist prototype.

If i wanted to see the parent prototype of this akhil object for that i use the below

```js
akhil.__proto__
```
``{name: 'ramesh', talent: 'painter', fans: 100, constructor: ƒ}``

Artist also has a prototype. To get that

```js
ramesh.__proto__.__proto__
```

```js
{constructor: ƒ, __defineGetter__: ƒ, __defineSetter__: ƒ, hasOwnProperty: ƒ, __lookupGetter__: ƒ, …}
constructor: ƒ Object()
hasOwnProperty:ƒ hasOwnProperty()
----
---
```

If you notice the Artist constructor is an object.

Now coming the question , first its going to try to find info is present on the musician class, but info isn't there. So it looks at the parent, which is artist, but info isnt attached there either. So its looks at the Artist prototype and then info isnt defined there. So then it tries one last time at the object prototype and it should find that info is now defined. 

----------

### What is the output of below?

```js
console.log(1);
setTimeout(() => { console.log(2) }, 1000);
setTimeout(() => { console.log(3) }, 0);
console.log(4);
```

**Output**
```js
1
4
3
2
```

**Explanation**
setTimeout is an asynchronous. Javascript is actually non blocking asynchronous code like setTimeout. It goes to the next line. In line three also we have non blocking set timeout. In this case the delay is 0 milliseconds, but its still plays into background queue and in the meantime the javascript going to continue complete the rest of the code before it tries to pull off any synchronous functionality from that queue.

***

### What is the output of below?

```js
let i;
for (i = 0; i < 3; i++) {
  const log = () => {
    console.log(i);
  }
  setTimeout(log, 100);
}
```
**Output**
```js
3
3
3
```

**Explanation**

There are 2 phases behind executing this snippet.

#### Phase 1
- for() iterating 3 times. During each iteration a new function log() is created, which captures the variable i. Then setTimout() schedules an execution of log().
- When for() cycle completes, i variable has value 3.

#### Phase 2

- The 3 scheduled log() callbacks are called by setTimeout(). log() reads the current value of variable i, which is 3, and logs to console 3.

***

### What is the output of below?

```js
const x = {}
const y = { key: "y"}
const z = { key: "z"}
x[y] = 123;
x[z] = 456;
console.log(x[y]);
```

**Output**

```js
456
```

--------












