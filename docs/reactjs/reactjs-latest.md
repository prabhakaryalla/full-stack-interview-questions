<details><summary><b>How Error Boundaries Work Internally in React?</b></summary>

Error boundaries are special React class components that catch JavaScript errors anywhere in their child component tree during rendering, lifecycle methods, and constructors of the whole subtree.  
When an error occurs, React unwinds the component tree to find the nearest error boundary.  
The error boundary then updates its state (via getDerivedStateFromError) to render a fallback UI instead of the broken component tree.  
React also calls componentDidCatch on the error boundary to allow logging or side effects.
This mechanism prevents the entire React app from crashing and provides a graceful way to handle errors locally.  
Errors in event handlers or async code are not caught by error boundaries and must be handled separately.  

<details><summary><em>Example</em></summary>

```jsx
import React from 'react';

// Step 1: Create an Error Boundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  // Step 2: Update state when an error is caught during rendering or lifecycle
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  // Step 3: Log error details (optional)
  componentDidCatch(error, errorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  // Step 4: Render fallback UI if error occurred, else render children
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Step 5: Use ErrorBoundary to wrap components that may throw errors
function BuggyComponent() {
  throw new Error("I crashed!");
  return <div>This will never render</div>;
}

function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;
```

***Explanation of Steps***

Create an Error Boundary class component that maintains an error state.  
getDerivedStateFromError is a static lifecycle method React calls when a child throws an error during rendering or lifecycle. It updates the state to indicate an error happened.  
componentDidCatch is called with the error and info, allowing you to log or report the error.  
In the render method, if an error occurred, render a fallback UI; otherwise, render the child components normally.  
Wrap any component that might throw errors with the error boundary to catch errors and prevent the entire app from crashing.  

This is how React internally uses error boundaries to catch errors during rendering and lifecycle methods, providing a robust error handling mechanism
</details>
<hr/>
</details>

<details><summary><b>What types of errors can error boundaries catch, and what types can they not catch? Why?</b></summary>

***Error boundaries in React can catch errors that occur during:***  

Rendering of components  
Lifecycle methods (e.g., componentDidMount, componentDidUpdate)  
Constructors of the whole tree below them

***Error boundaries cannot catch errors that occur:***

Inside event handlers (e.g., onClick handlers)  
In asynchronous code (e.g., setTimeout, fetch callbacks, promises)  
During server-side rendering  
Inside error boundary components themselves  

Why?

React’s error boundary mechanism is designed to catch errors during the rendering phase and lifecycle methods because React controls this process and can "unwind" the component tree to find the nearest boundary.  
Errors in event handlers or async code happen outside React’s rendering lifecycle, so React cannot catch them automatically. Developers must handle those errors manually (e.g., try/catch inside event handlers).
Server-side rendering does not support error boundaries because it’s a different rendering environment.  

<details><summary><em>Example</em></summary>

``` jsx
import React from 'react';

// Step 1: Define an Error Boundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Step 2: Component that throws error during rendering (caught by error boundary)
function RenderErrorComponent() {
  throw new Error("Error during render!");
  return <div>This will not render</div>;
}

// Step 3: Component with error in event handler (NOT caught by error boundary)
function EventErrorComponent() {
  const handleClick = () => {
    throw new Error("Error in event handler!");
  };

  return <button onClick={handleClick}>Click me</button>;
}

// Step 4: App demonstrating both cases
function App() {
  return (
    <div>
      <ErrorBoundary>
        <RenderErrorComponent /> {/* This error will be caught */}
      </ErrorBoundary>

      <ErrorBoundary>
        <EventErrorComponent /> {/* This error will NOT be caught */}
      </ErrorBoundary>
    </div>
  );
}

export default App;
```

***Explanation of Steps***

Create an error boundary that catches errors during rendering and lifecycle.  
RenderErrorComponent throws an error during rendering, which is caught by the error boundary and fallback UI is shown.  
EventErrorComponent throws an error inside an event handler, which is not caught by the error boundary. This will cause the error to propagate and potentially crash the app unless handled manually.  
Wrap components with error boundaries to catch render-time errors but remember event handler errors require manual try/catch or error handling.  


***Handling Errors in Event Handlers***  
To handle errors in event handlers, use try/catch:
``` jsx
const handleClick = () => {
  try {
    // code that might throw
  } catch (error) {
    // handle error, e.g., show message or log
  }
};
```

This distinction is important for robust React error handling strategies.
</details>
<hr/>
</details>

<details><summary><b>Can You Implement an Error Boundary Using Functional Components and Hooks?</b></summary>

Currently, React does NOT support implementing error boundaries using functional components and hooks.  
Error boundaries rely on special lifecycle methods (getDerivedStateFromError and componentDidCatch) that are only available in class components.  
There is no hook equivalent for these lifecycle methods yet.  

Workarounds exist but are limited:  

You can create a class-based error boundary and wrap your functional components inside it.  
Some third-party libraries provide hooks or components that simulate error boundaries, but under the hood, they still use class components.  
You can use try/catch inside event handlers or async functions in functional components to handle errors locally, but this is not a full error boundary.  

***Why Functional Components Cannot Be Error Boundaries (Currently)***

Error boundaries require React to catch errors during rendering and lifecycle phases.  
Functional components do not have lifecycle methods.  
Hooks like useEffect run after rendering, so they cannot catch errors thrown during render.  
React’s error boundary mechanism is tightly coupled with class lifecycle methods.  


<details><summary><em>Example</em></summary>

```jsx
import React, { useState } from 'react';

// Step 1: Class-based Error Boundary (required)
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}

// Step 2: Functional component that may throw an error
function BuggyComponent() {
  const [throwError, setThrowError] = useState(false);

  if (throwError) {
    throw new Error("I crashed!");
  }

  return (
    <div>
      <button onClick={() => setThrowError(true)}>Crash</button>
      <p>Click the button to crash this component.</p>
    </div>
  );
}

// Step 3: Wrap functional component with ErrorBoundary
function App() {
  return (
    <ErrorBoundary>
      <BuggyComponent />
    </ErrorBoundary>
  );
}

export default App;
```

***Explanation of Steps***  
Create a class-based ErrorBoundary component implementing getDerivedStateFromError and componentDidCatch.  
Create a functional component that throws an error conditionally.  
Wrap the functional component inside the error boundary to catch errors during rendering.  

***Summary***  
You cannot create a true error boundary with just functional components and hooks today.  
Use class components for error boundaries and wrap functional components inside them.  
For error handling inside functional components (e.g., event handlers), use try/catch blocks.  
The React team may add hook-based error boundary support in the future, but it is not available yet.  

</details>
<hr/>
</details>

<details><summary><b>How would you create a custom hook to manage complex state logic or side effects? Can you provide an example? </b></summary>
 
Creating a custom hook to manage complex state logic or side effects allows you to encapsulate and reuse logic cleanly across components. Custom hooks are JavaScript functions whose names start with "use" and can call other hooks inside them.  

***How to create a custom hook for complex state or side effects:***

Identify the reusable logic or side effects you want to encapsulate.  
Create a function starting with use.  
Use built-in hooks like useState, useEffect, useReducer, etc., inside your custom hook.  
Return the state and any functions needed to interact with the state.  


<details><summary><em>Example</em></summary>

``` jsx
import { useState, useEffect } from 'react';

function useFormInput(initialValue, validate) {
  const [value, setValue] = useState(initialValue);
  const [error, setError] = useState(null);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    if (touched) {
      const validationError = validate(value);
      setError(validationError);
    }
  }, [value, touched, validate]);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = () => {
    setTouched(true);
  };

  return {
    value,
    onChange,
    onBlur,
    error,
    touched,
  };
}
```
***Usage in a component:***  
``` jsx
function validateEmail(email) {
  if (!email.includes('@')) {
    return 'Invalid email address';
  }
  return null;
}

function EmailInput() {
  const email = useFormInput('', validateEmail);

  return (
    <div>
      <input
        type="email"
        value={email.value}
        onChange={email.onChange}
        onBlur={email.onBlur}
      />
      {email.touched && email.error && <span>{email.error}</span>}
    </div>
  );
}
```
***Explanation:***

The custom hook useFormInput manages the input value, validation error, and touched state.  
It uses useEffect to run validation whenever the value changes after the input has been touched.  
The hook returns the current value, event handlers, and validation state, making the component code clean and reusable.  
</details>
<hr/>
</details>

<details><summary><b>What is the difference between CSS and SCSS?</b></summary>

| Feature                | CSS                              | SCSS                              |
|------------------------|---------------------------------|----------------------------------|
| Full Name              | Cascading Style Sheets           | Sassy CSS (a syntax of Sass)      |
| Type                   | Stylesheet language              | CSS preprocessor syntax           |
| Syntax                 | Standard CSS syntax              | Superset of CSS with extra features|
| Variables              | Not supported                   | Supported                        |
| Nesting                | Not supported                   | Supported                        |
| Mixins & Functions     | Not supported                   | Supported                        |
| Compilation            | No compilation needed           | Requires compilation to CSS       |
| Browser Support        | Directly supported by browsers  | Browsers only support compiled CSS|
| Code Reusability       | Limited                        | High, due to features like mixins |
| File Extension         | .css                           | .scss                           |

<details><summary><em>Example</em></summary>

Here's a summary of the difference between CSS and SCSS:
Summary:

CSS (Cascading Style Sheets) is the standard stylesheet language used to style HTML elements on web pages.
SCSS (Sassy CSS) is a syntax of Sass (Syntactically Awesome Stylesheets), which is a CSS preprocessor that extends CSS with additional features like variables, nested rules, mixins, and functions.
SCSS files are compiled into standard CSS files that browsers can understand.
SCSS helps write more maintainable, reusable, and organized stylesheets compared to plain CSS.


Simple Code Example with Steps:

***CSS Example:***

``` css
/* style.css */
body {
  background-color: lightblue;
}

h1 {
  color: navy;
  font-size: 24px;
}
```

***SCSS Example:***

``` scss
// style.scss
$bg-color: lightblue;
$font-color: navy;
$font-size: 24px;

body {
  background-color: $bg-color;
}

h1 {
  color: $font-color;
  font-size: $font-size;
}
```

***Steps to use SCSS:***

Write your styles in a .scss file using SCSS syntax.  
Use a Sass compiler (like Dart Sass, node-sass, or tools integrated in build systems) to compile the .scss file into a .css file.  
Link the compiled .css file in your HTML.  
The browser reads the compiled CSS and applies the styles.  

</details>
<hr/>
</details>

<details><summary><b>How does CSS specificity work, and how can you manage specificity conflicts in large-scale projects?</b></summary>

CSS Specificity is a set of rules browsers use to determine which CSS rule applies when multiple rules target the same element.  
Specificity is calculated based on the types of selectors used: inline styles, IDs, classes, attributes, pseudo-classes, and element selectors.  


***The specificity hierarchy (from highest to lowest) is:***  
Inline styles (e.g., style="...")  
IDs (#id)  
Classes (.class), attributes ([type="text"]), and pseudo-classes (:hover)  
Elements (div, p, h1) and pseudo-elements (::before)  

When specificity is equal, the last declared rule in the CSS file wins (source order).

***Managing specificity conflicts in large projects involves:***
Using consistent naming conventions (e.g., BEM methodology).  
Avoiding overly specific selectors.  
Using CSS preprocessors (like SCSS) to organize styles.  
Using utility classes and component-based styling.  
Avoiding inline styles and !important declarations unless necessary.  
Reviewing and refactoring CSS regularly.  


<details><summary><em>Example</em></summary>

***Example of specificity conflict:***

``` css
/* style.css */
#header {
  color: blue; /* ID selector */
}

.header {
  color: red; /* Class selector */
}

div {
  color: green; /* Element selector */
}
```

***HTML:***

``` html
<div id="header" class="header">Hello World</div>
```

***Result:***

The text color will be blue because the ID selector (#header) has higher specificity than the class (.header) and element (div) selectors.  


***Steps to manage specificity:***

Use class selectors consistently instead of mixing IDs and classes.-  
Use naming conventions like BEM to keep selectors clear and manageable.  

***Example with BEM:***

``` css
/* BEM style */
.header {
  color: red;
}

.header__title {
  color: black;
}
```

Use SCSS nesting carefully to avoid deep selector chains that increase specificity unnecessarily.
</details>
<hr/>
</details>

<details><summary><b>Explain the differences between CSS variables (custom properties) and SCSS variables. When would you use each?</b></summary>

***CSS variables (custom properties)*** are defined in CSS using the --variable-name syntax and accessed with var(--variable-name). They are part of the CSS language itself and can be changed dynamically at runtime, for example, via JavaScript. This makes them useful for themes or styles that need to adapt without recompiling CSS. They have scope within the DOM, meaning they can be inherited and overridden in different parts of the document.


***SCSS variables*** are defined in SCSS files using the $variable-name syntax. They are static and resolved during the SCSS compilation process into plain CSS. SCSS variables cannot be changed at runtime but support powerful preprocessing features like calculations, functions, and mixins, which help write modular and maintainable stylesheets.


You would use CSS variables when you need dynamic styling that can change after the page loads, such as user themes or responsive designs that adjust with JavaScript. SCSS variables are best when you want to leverage preprocessing capabilities for complex style logic and maintain consistency during development.


<details><summary><em>Example</em></summary>

***CSS Variables Example:***

``` css
/* Define CSS variable in :root for global scope */
:root {
  --main-color: blue;
}

/* Use CSS variable */
body {
  background-color: var(--main-color);
}
```

You can dynamically change --main-color with JavaScript if needed:

``` js
document.documentElement.style.setProperty('--main-color', 'green');
```


SCSS Variables Example:

``` scss
// Define SCSS variable
$main-color: blue;

// Use SCSS variable
body {
  background-color: $main-color;
}
```

Compile the SCSS file to CSS before using it in your project.


**Steps to use each:**


***For CSS variables:***  
Define variables in CSS (commonly in :root).  
Use var(--variable-name) in your CSS rules.  
Optionally, update variables dynamically with JavaScript.  


***For SCSS variables:***  
Define variables in .scss files.  
Use variables in your SCSS code.  
Compile SCSS to CSS using a compiler.  
Link the compiled CSS in your HTML.  

</details>
<hr/>
</details>


<details><summary><b></b></summary>

<details><summary><em>Example</em></summary>

</details>
<hr/>
</details>