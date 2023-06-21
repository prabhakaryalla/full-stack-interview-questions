## React JS Interview Questions & Answers

### Questions
- [What is React JS?](#what-is-react-js)
- [Benefits of React JS?](#benefits-of-react-js)
- [What is Server Side Rendering?](#what-is-server-side-rendering)
- [How Server-side Rendering (SSR) Works?](#how-server-side-rendering-ssr-works)
- [What is Code-Splitting?](#what-is-code-splitting)
- [What is Error Boundary?](#)
- [What is Context?](#)
- [What are Forwarding Ref?](#)
- [What are Fragments?](#)
- [What are Higher-Order Components?](#)
- [What is Reconciliation?](#)
- [What are Web Components?](#)
- [What are Uncontrolled Components?](#)
- [What are Hooks?](#)
- [How to use State Hook?](#)
- [How to use Effect Hook?](#)
- [What are the Rules of Hooks?](#)
- [How to build custom Hook?](#)
- [Do Hooks replace render props and higher-order components?](#)
- [How can I make an AJAX call?](#)
- [Where in the component lifecycle should I make an AJAX call? ](#)
- [What is Babel?](#)
- [Why is my function being called every time the component renders?](#)
- [throttling, debouncing, requestAnimationFrame throttling](#)
- [What is the difference between state and props? ](#)
- [Why is setState giving me the wrong value?](#)
- [How do I update state with values that depend on the current state?](#)
- [What is the difference between passing an object or a function in setState?](#)
- [When is setState asynchronous?](#)
- [Should I use a state management library like Redux or MobX?](#)
- [Are inline styles bad?](#)
- [What is the Virtual DOM?](#)
- [Is the Shadow DOM the same as the Virtual DOM?](#)
- [What is “React Fiber”?](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)
- [](#)


#### What is React JS?
React JS is a javascript library for building user interfaces.
It's an open-source JavaScript framework and library developed by Facebook.
***
#### Benefits of React JS?
* Easy to Learn and Use
* Creating Dynamic Web Applications Becomes Easier
* Reusable Components
* Performance Enhancement
* Use of Virtual DOM to improve efficiency
* Known to be SEO Friendly
* The Benefit of Having JavaScript Library
* Scope for Testing the Codes

[Read More](https://www.javatpoint.com/pros-and-cons-of-react)
***
### What is Server Side Rendering?
With server-side rendering (SSR), the page is rendered on the server. This ensures that the page is available to users even before it loads on their browser.

Server−side rendering in React is an excellent option for rendering web pages to improve initial page load speed, distribution of content, SEO, and user experience.

---
### How Server-side Rendering (SSR) Works?
It is the process of rendering a webpage on the server before sending it to the browser. So, when the server returns a ready-to-render HTML page and the necessary JS scripts, all static elements are rendered immediately in the HTML.

Meanwhile, the browser downloads and executes the JS code, which causes the page to become interactive. The browser now handles the client-side interactions on this page. The browser sends a request to the server via APIs for any new content or data; only the newly required information is fetched.

---

### What is Code-Splitting?

Code-Splitting is a feature supported by bundlers like Webpack, Rollup, and Browserify which can create multiple bundles that can be dynamically loaded at runtime.

Code-splitting your app can help you “lazy-load” just the things that are currently needed by the user, which can dramatically improve the performance of your app. While you haven’t reduced the overall amount of code in your app, you’ve avoided loading code that the user may never need, and reduced the amount of code needed during the initial load.

**import()**
The best way to introduce code-splitting into your app is through the dynamic import() syntax.

***Before:***
```js
import { add } from './math';
console.log(add(16, 26));
```
***After:***
```js
import("./math").then(math => {
  console.log(math.add(16, 26));
});
```

**React.lazy**
The React.lazy function lets you render a dynamic import as a regular component.
***Before:***
```js
import OtherComponent from './OtherComponent';
```
***After:***
```js
const OtherComponent = React.lazy(() => import('./OtherComponent'));
```
This will automatically load the bundle containing the OtherComponent when this component is first rendered.

The lazy component should then be rendered inside a Suspense component, which allows us to show some fallback content (such as a loading indicator) while we’re waiting for the lazy component to load.

```js
import React, { Suspense } from 'react';

const OtherComponent = React.lazy(() => import('./OtherComponent'));

function MyComponent() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <OtherComponent />
      </Suspense>
    </div>
  );
}
```
---

### What is Error Boundary?

Error Boundaries are React components that help when some modules fail to load due to any issue, an error will be triggered. These errors can be handled properly and provide a good experience to the user by the use of a suitable error page.

```js
import React, { Suspense } from 'react';
import MyErrorBoundary from './MyErrorBoundary';

const OtherComponent = React.lazy(() => import('./OtherComponent'));
const AnotherComponent = React.lazy(() => import('./AnotherComponent'));

const MyComponent = () => (
  <div>
    <MyErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <section>
          <OtherComponent />
          <AnotherComponent />
        </section>
      </Suspense>
    </MyErrorBoundary>
  </div>
);
```
----

### What is Context?

Usually, you will pass information from a parent component to a child component via props. But passing props can become verbose and inconvenient if you have to pass them through many components in the middle, or if many components in your app need the same information. Context lets the parent component make some information available to any component in the tree below it—no matter how deep—without passing it explicitly through props.

----

### What are Hooks?

A Hook is a special function that lets you “hook into” React features. For example, useState is a Hook that lets you add React state to function components. We’ll learn other Hooks later.

***
### How to use State Hook?

Example:

```jsx
function App() {

  const [userQuery, setUserQuery] = useState('');

  const updateUserQuery = (event) => {
    setUserQuery(event.target.value)
  }

 const handleKeyPress = (event) => {
  if(event.key == 'Enter')
    searchQuery();
 }

  const searchQuery = () => {
    window.open(`https://google.com/search?q=${userQuery}`, "_blank");
  }

  return (
    <div className="App">
      <h1>Hello Prabhakar</h1>
      <div className='form'>
        <input value={userQuery} onKeyPress={handleKeyPress}
         onChange={updateUserQuery} />
        <button onClick={searchQuery}>Search</button>
      </div>
    </div>
  );
}
```
***

### How to use Effect Hook?

useEffect lets us express different kinds of side effects after a component renders. Some effects might require cleanup so they return a function. Other effects might not have a cleanup phase, and don’t return anything.

Examples:

```jsx
 useEffect(() => {    document.title = `You clicked ${count} times`;  });
 ```

```jsx
 useEffect(() => {
    function handleStatusChange(status) {
      setIsOnline(status.isOnline);
    }

    ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange);
    return () => {
      ChatAPI.unsubscribeFromFriendStatus(props.friend.id, handleStatusChange);
    };
  });
```
***

### Custom Hook Example

```js
export const useFetch = (url, initialData) =>
{
    const [result, setResult] = useState(initialData);
    useEffect(() => {
        fetch(url)
        .then(response => response.json())
        .then(json => setResult(json));
    }, [])

    return result;
}
```



***
### What are the Rules of Hooks?
Hooks are JavaScript functions, but you need to follow two rules when using them. We provide a linter plugin to enforce these rules automatically:

**Only Call Hooks at the Top Level**

Don’t call Hooks inside loops, conditions, or nested functions. Instead, always use Hooks at the top level of your React function, before any early returns. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple useState and useEffect calls. 

**Only Call Hooks from React Functions**

Don’t call Hooks from regular JavaScript functions. Instead, you can:

    ✅ Call Hooks from React function components.
    ✅ Call Hooks from custom Hooks.


