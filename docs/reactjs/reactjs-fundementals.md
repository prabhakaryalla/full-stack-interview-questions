## React JS Interview Questions & Answers

### Questions
- [What is React JS?](#what-is-react-js)
- [Benefits of React JS?](#benefits-of-react-js)
- [What is Code-Splitting?](#)
- [What is Context?](#)
- [What is Error Boundary?](#)
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
* Known to be SEO Friendly
* The Benefit of Having JavaScript Library
* Scope for Testing the Codes

[Read More](https://www.javatpoint.com/pros-and-cons-of-react)
***

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


