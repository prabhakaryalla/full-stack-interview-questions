## React JS Interview Questions & Answers

### Table of Contents
- [What is React JS?](#what-is-react-js)
- [Benefits of React JS?](#benefits-of-react-js)
- [What is JSX?](#what-is-jsx)
- [What is Server Side Rendering?](#what-is-server-side-rendering)
- [How Server-side Rendering (SSR) Works?](#how-server-side-rendering-ssr-works)
- [What is the difference between Element and Component?](#what-is-the-difference-between-element-and-component)
- [How to create components in React?](#how-to-create-components-in-react)
- [When to use a Class Component over a Function Component?](#when-to-use-a-class-component-over-a-function-component)
- [What are Pure Components?](#what-are-pure-components)
- [What is state in React?](#what-is-state-in-react)
- [What are props in React?](#what-are-props-in-react)
- [What is the difference between state and props?](#what-is-the-difference-between-state-and-props)
-[How to pass a parameter to an event handler or callback?](#how-to-pass-a-parameter-to-an-event-handler-or-callback)
- [What are synthetic events in React?](#what-are-synthetic-events-in-react)
- [What are inline conditional expressions?](#what-are-inline-conditional-expressions)
- [What is key prop and what is the benefit of using it in arrays of elements](#what-is-key-prop-and-what-is-the-benefit-of-using-it-in-arrays-of-elements)
- [What is the use of refs?](#what-is-the-use-of-refs)
- [How to create refs?](#how-to-create-refs)
- [What are forward refs?](#what-are-forward-refs)
- [Which is preferred option with in callback refs and findDOMNode()?](#which-is-preferred-option-with-in-callback-refs-and-finddomnode)
- [What is Virtual DOM?](#what-is-virtual-dom)
- [How Virtual DOM works?](#how-virtual-dom-works)
- [What is the difference between Shadow DOM and Virtual DOM?](#what-is-the-difference-between-shadow-dom-and-virtual-dom)
- [What is React Fiber?](#what-is-react-fiber)
- [What is the main goal of React Fiber?](#what-is-the-main-goal-of-react-fiber))
- [What are controlled components?](#what-are-controlled-components)
- [What are uncontrolled components?](#what-are-uncontrolled-components)
- [What is the difference between createElement and cloneElement?](#what-is-the-difference-between-createelement-and-cloneelement)
- [What are the different phases of component lifecycle?](#what-are-the-different-phases-of-component-lifecycle)
- [What are the lifecycle methods of React?](#what-are-the-lifecycle-methods-of-react)
- [What are Higher-Order Components?](#what-are-higher-order-components)
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()
- []()






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




#### What is React JS?
React JS is a javascript library for building user interfaces, especially for single-page applications.
It's an open-source JavaScript framework and library developed by Facebook.
***
#### Benefits of React JS?
* Easy to Learn and Use
* Reusable Components
* Performance Enhancement
* Uses JSX syntax, a syntax extension of JS that allows developers to write HTML in their JS code.
* It uses Virtual DOM instead of Real DOM considering that Real DOM manipulations are expensive.
* Known to be SEO Friendly
* Supports server-side rendering which is useful for Search Engine Optimizations(SEO).
* Follows Unidirectional or one-way data flow or data binding.
* The Benefit of Having JavaScript Library
* Scope for Testing the Codes

[Read More](https://www.javatpoint.com/pros-and-cons-of-react)
***
### What is JSX?
JSX stands for JavaScript XML and it is an XML-like syntax extension to ECMAScript. Basically it just provides the syntactic sugar for the ```React.createElement(type, props, ...children)``` function, giving us expressiveness  of JavaScript along with HTML like template syntax.

In the example below, the text inside h1 tag is returned as JavaScript function to the render function

```jsx
export default function App() {
  return (
      <h1 className="greeting">{"Hello, this is a JSX Code!"}</h1>
  );
}
```

If you don't use JSX syntax then the respective JavaScript code should be written as below,

```js
import { createElement } from 'react';

export default function App() {
  return createElement(
    'h1',
    { className: 'greeting' },
    'Hello, this is a JSX Code!'
  );
}
```
***

### What is Server Side Rendering?
With server-side rendering (SSR), the page is rendered on the server. This ensures that the page is available to users even before it loads on their browser.

Server−side rendering in React is an excellent option for rendering web pages to improve initial page load speed, distribution of content, SEO, and user experience.

---
### How Server-side Rendering (SSR) Works?
It is the process of rendering a webpage on the server before sending it to the browser. So, when the server returns a ready-to-render HTML page and the necessary JS scripts, all static elements are rendered immediately in the HTML.

Meanwhile, the browser downloads and executes the JS code, which causes the page to become interactive. The browser now handles the client-side interactions on this page. The browser sends a request to the server via APIs for any new content or data; only the newly required information is fetched.
***

### What is the difference between Element and Component?
An Element is a plain object describing what you want to appear on the screen in terms of the DOM nodes or other components.

```js
  <div id="login-btn">Login</div>
```
The above React.createElement() function returns an object as below:

```json
{
  type: 'div',
  props: {
    children: 'Login',
    id: 'login-btn'
  }
}
```
Finally, this element renders to the DOM using ReactDOM.render().

Whereas a component can be declared in several different ways. It can be a class with a render() method or it can be defined as a function. In either case, it takes props as an input, and returns a JSX tree as the output:

```js
const Button = ({ handleLogin }) => (
  <div id={"login-btn"} onClick={handleLogin}>
    Login
  </div>
);
```
***

### How to create components in React?
Components are the building blocks of creating User Interfaces(UI) in React. There are two possible ways to create a component.

i. **Function Components**: This is the simplest way to create a component. Those are pure JavaScript functions that accept props object as the first parameter and return React elements to render the output:

```js
function Greeting({ message }) {
  return <h1>{`Hello, ${message}`}</h1>;
}
```

ii. **Class Components**: You can also use ES6 class to define a component. The above function component can be written as a class component:

```js
class Greeting extends React.Component {
  render() {
    return <h1>{`Hello, ${this.props.message}`}</h1>;
  }
}
```
***
### When to use a Class Component over a Function Component?

After the addition of Hooks(i.e. React 16.8 onwards) it is always recommended to use Function components over Class components in React. Because you could use state, lifecycle methods and other features that were only available in class component present in function component too.

But even there are two reasons to use Class components over Function components.

* If you need a React functionality whose Function component equivalent is not present yet, like Error Boundaries.
* In older versions, If the component needs state or lifecycle methods then you need to use class component.

***
### What are Pure Components?

Pure components are the components which render the same output for the same state and props. In function components, you can achieve these pure components through memoized React.memo() API wrapping around the component. This API prevents unnecessary re-renders by comparing the previous props and new props using shallow comparison. So it will be helpful for performance optimizations.

But at the same time, it won't compare the previous state with the current state because function component itself prevents the unnecessary rendering by default when you set the same state again.

The syntactic representation of memoized components looks like below,

```js
const MemoizedComponent = memo(SomeComponent, arePropsEqual?);
```

Below is the example of how child component(i.e., EmployeeProfile) prevents re-renders for the same props passed by parent component(i.e.,EmployeeRegForm).

```js
  import { memo, useState } from 'react';

  const EmployeeProfile = memo(function EmployeeProfile({ name, email }) {
    return (<>
          <p>Name:{name}</p>
          <p>Email: {email}</p>
          </>);
  });
  export default function EmployeeRegForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    return (
      <>
        <label>Name: <input value={name} onChange={e => setName(e.target.alue)} /></label>
        <label> Email: <input value={email} onChange={e => setEmail(e.target.value)} /></label>
        <hr/>
        <EmployeeProfile name={name}/>
      </>
    );
  }
```

In class components, the components extending React.PureComponent instead of React.Component become the pure components. When props or state changes, PureComponent will do a shallow comparison on both props and state by invoking shouldComponentUpdate() lifecycle method.

**Note**: React.memo() is a higher-order component.
***

### What is state in React?
State of a component is an object that holds some information that may change over the lifetime of the component. The important point is whenever the state object changes, the component re-renders. It is always recommended to make our state as simple as possible and minimize the number of stateful components.

```js
const [message, setMessage] = useState("Welcome to React world");
```
***

### What are props in React?
Props are inputs to components. The primary purpose of props in React is to provide following component functionality:
* Pass custom data to your component.
* Trigger state changes
* Use via this.props.reactProp inside component's render() method.

***

### What is the difference between state and props?
state is managed by the component itself and can be updated using the setState() function. Unlike props, state can be modified by the component and is used to manage the internal state of the component. Changes in the state trigger a re-render of the component and its children. props (short for "properties") are passed to a component by its parent component and are read-only, meaning that they cannot be modified by the component itself. props can be used to configure the behavior of a component and to pass data between components.

***

### Why should we not update the state directly?

If you try to update the state directly then it won't re-render the component.

```js
//Wrong
this.state.message = "Hello world";
```

Instead use setState() method. It schedules an update to a component's state object. When state changes, the component responds by re-rendering.

```js
//Correct
this.setState({ message: "Hello World" });
```
**Note**: You can directly assign to the state object either in constructor or using latest javascript's class field declaration syntax.
***

### How to pass a parameter to an event handler or callback?

You can use an arrow function to wrap around an event handler and pass parameters:

```js
<button onClick={() => this.handleClick(id)} />
```
 you can also pass arguments to a function which is defined as arrow function

 ```js
 <button onClick={this.handleClick(id)} />;
handleClick = (id) => () => {
  console.log("Hello, your ticket number is", id);
};
```

***
### What are synthetic events in React?
SyntheticEvent is a cross-browser wrapper around the browser's native event.Its API is same as the browser's native event, including stopPropagation() and preventDefault(), except the events work identically across all browsers. The native events can be accessed directly from synthetic events using nativeEvent attribute.

```js
function BookStore() {
  handleTitleChange(e) {
    console.log('The new title is:', e.target.value);
    // 'e' represents synthetic event
    const nativeEvent = e.nativeEvent;
    console.log(nativeEvent);
    e.stopPropogation();
    e.preventDefault();
  }

  return <input name="title" onChange={handleTitleChange} />
}
```
***

### What are inline conditional expressions?

You can use either if statements or ternary expressions which are available from JS to conditionally render expressions. Apart from these approaches, you can also embed any expressions in JSX by wrapping them in curly braces and then followed by JS logical operator &&.

```js
<h1>Hello!</h1>;
{
  messages.length > 0 && !isLogin ? (
    <h2>You have {messages.length} unread messages.</h2>
  ) : (
    <h2>You don't have unread messages.</h2>
  );
}
```
***

### What is "key" prop and what is the benefit of using it in arrays of elements?
A key is a special attribute you should include when creating arrays of elements. Key prop helps React identify which items have changed, are added, or are removed.

Keys should be unique among its siblings. Most often we use ID from our data as key:

```js
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```
***

### What is the use of refs?
The ref is used to return a reference to the element. They should be avoided in most cases, however, they can be useful when you need a direct access to the DOM element or an instance of a component.

***

### How to create refs?
There are two approaches

1. This is a recently added approach. Refs are created using React.createRef() method and attached to React elements via the ref attribute. In order to use refs throughout the component, just assign the ref to the instance property within constructor.

```js
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
2. You can also use ref callbacks approach regardless of React version. For example, the search bar component's input element is accessed as follows,

```js
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.txtSearch = null;
    this.state = { term: "" };
    this.setInputSearchRef = (e) => {
      this.txtSearch = e;
    };
  }
  onInputChange(event) {
    this.setState({ term: this.txtSearch.value });
  }
  render() {
    return (
      <input
        value={this.state.term}
        onChange={this.onInputChange.bind(this)}
        ref={this.setInputSearchRef}
      />
    );
  }
}

```
***
### What are forward refs?

Ref forwarding is a feature that lets some components take a ref they receive, and pass it further down to a child.

```js
const ButtonElement = React.forwardRef((props, ref) => (
  <button ref={ref} className="CustomButton">
    {props.children}
  </button>
));

// Create ref to the DOM button:
const ref = React.createRef();
<ButtonElement ref={ref}>{"Forward Ref"}</ButtonElement>;
```
***

### Which is preferred option with in callback refs and findDOMNode()?
It is preferred to use callback refs over findDOMNode() API. Because findDOMNode() prevents certain improvements in React in the future.

```js
class MyComponent extends Component {
  constructor(props) {
    super(props);
    this.node = createRef();
  }
  componentDidMount() {
    this.node.current.scrollIntoView();
  }

  render() {
    return <div ref={this.node} />;
  }
}
```
***

### What is Virtual DOM?

The Virtual DOM (VDOM) is an in-memory representation of Real DOM. The representation of a UI is kept in memory and synced with the "real" DOM. It's a step that happens between the render function being called and the displaying of elements on the screen. This entire process is called reconciliation.

***

### How Virtual DOM works?
The Virtual DOM works in three simple steps.

1. Whenever any underlying data changes, the entire UI is re-rendered in Virtual DOM representation.
2. Then the difference between the previous DOM representation and the new one is calculated.
3. Once the calculations are done, the real DOM will be updated with only the things that have actually changed.

***

### What is the difference between Shadow DOM and Virtual DOM?

The Shadow DOM is a browser technology designed primarily for scoping variables and CSS in web components. The Virtual DOM is a concept implemented by libraries in JavaScript on top of browser APIs.

***

### What is React Fiber?
Fiber is the new reconciliation engine or reimplementation of core algorithm in React v16. The goal of React Fiber is to increase its suitability for areas like animation, layout, gestures, ability to pause, abort, or reuse work and assign priority to different types of updates; and new concurrency primitives.

### What is the main goal of React Fiber?

The goal of React Fiber is to increase its suitability for areas like animation, layout, and gestures. Its headline feature is incremental rendering: the ability to split rendering work into chunks and spread it out over multiple frames.

Its main goals are:

 - Ability to split interruptible work in chunks.
 - Ability to prioritize, rebase and reuse work in progress.
 - Ability to yield back and forth between parents and children to support layout in React.
 - Ability to return multiple elements from render().
 - Better support for error boundaries.

***

### What are controlled components?

A component that controls the input elements within the forms on subsequent user input is called Controlled Component, i.e, every state mutation will have an associated handler function.

For example, to write all the names in uppercase letters, we use handleChange as below,

```js
handleChange(event) {
  this.setState({value: event.target.value.toUpperCase()})
}
```
***

### What are uncontrolled components?

The Uncontrolled Components are the ones that store their own state internally, and you query the DOM using a ref to find its current value when you need it. This is a bit more like traditional HTML.

In the below UserProfile component, the name input is accessed using ref.

```js
class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>{"Name:"}<input type="text" ref={this.input} /></label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```

In most cases, it's recommend to use controlled components to implement forms. In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself.

***

### What is the difference between createElement and cloneElement?

JSX elements will be transpiled to React.createElement() functions to create React elements which are going to be used for the object representation of UI. Whereas cloneElement is used to clone an element and pass it new props.

***

### What are the different phases of component lifecycle?

The component lifecycle has three distinct lifecycle phases:

1. **Mounting**: The component is ready to mount in the browser DOM. This phase covers initialization from constructor(), getDerivedStateFromProps(), render(), and componentDidMount() lifecycle methods.

2. **Updating**: In this phase, the component gets updated in two ways, sending the new props and updating the state either from setState() or forceUpdate(). This phase covers getDerivedStateFromProps(), shouldComponentUpdate(), render(), getSnapshotBeforeUpdate() and componentDidUpdate() lifecycle methods.

3. **Unmounting**: In this last phase, the component is not needed and gets unmounted from the browser DOM. This phase includes componentWillUnmount() lifecycle method.

***

### What are the lifecycle methods of React?

React 16.3+

  - getDerivedStateFromProps: Invoked right before calling render() and is invoked on every render. This exists for rare use cases where you need a derived state. Worth reading if you need derived state.
  - componentDidMount: Executed after first rendering and where all AJAX requests, DOM or state updates, and set up event listeners should occur.
  - shouldComponentUpdate: Determines if the component will be updated or not. By default, it returns true. If you are sure that the component doesn't need to render after the state or props are updated, you can return a false value. It is a great place to improve performance as it allows you to prevent a re-render if component receives a new prop.
  - getSnapshotBeforeUpdate: Executed right before rendered output is committed to the DOM. Any value returned by this will be passed into componentDidUpdate(). This is useful to capture information from the DOM i.e. scroll position.
  - componentDidUpdate: Mostly it is used to update the DOM in response to prop or state changes. This will not fire if shouldComponentUpdate() returns false.
  - componentWillUnmount It will be used to cancel any outgoing network requests, or remove all event listeners associated with the component.

***

### What are Higher-Order Components?

A higher-order component (HOC) is a function that takes a component and returns a new component. Basically, it's a pattern that is derived from React's compositional nature.




















































































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


