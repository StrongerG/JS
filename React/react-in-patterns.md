## Summary Of [React-In-Patterns](https://github.com/krasimir/react-in-patterns)

### Props
- React is not defining strictly what should be passed as a prop. It may be whatever we want. It could even be another component:
```js
function SomethingElse({ answer }) {
  return <div>The answer is { answer }</div>;
}
function Answer() {
  return <span>23</span>;
}
// use in somewhere
<SomethingElse answer={<Answer />} />
```

- There is also a props.children property that gives us access to the child components passed by the owner of the component which is useful:
```js
function Title({ text, children }) {
  return (
    <h1>
      { text }
  // obviously child could be a component!!!
      { children }
    </h1>
  );
}
function App() {
  return (
    <Title text="Hello React">
      <span>community</span>
    </Title>
  );
}
```

- Function as a children

Refer to example when we have some knowledge in the parent
component and don't necessary want to send it down to
children.

The example below prints a list of TODOs. The
App component has all the data and knows how to
determine whether a TODO is completed or not. The
TodoList component simply encapsulate the needed
HTML markup.
```js
function App() {
  const todos = [
    {label: 'write tests', status: 'done'},
    {label: 'sent report', status: 'progress'},
    {label: 'answer emails', status: 'done'}
  ];
  const isCompleted = todo => todo.status === 'done';

  return (
    <TodoList todos={todos}>
      {
        todo => isCompleted(todo) ?
          <b>{ todo.label }</b> : { todo.label }
      }
    </TodoList>
  );
}

function TodoList({ todos, children }) {
  return (
    <section >
      <ul>
        {
          todos.map((todo, i) => (
            <li key={i}>{ children(todo) }</li>
          ))
        }
      </ul>
    </section>
  );
}
```
**Notice** how the App component doesn't expose the
structure of the data. TodoList has no idea that there is
label or status properties.

- render prop pattern

The so called render prop pattern is almost the same
except that we use the render prop and not children
for rendering the todo.
```js
function App() {
  const todos = [
    {label: 'write tests', status: 'done'},
    {label: 'sent report', status: 'progress'},
    {label: 'answer emails', status: 'done'}
  ];
  const isCompleted = todo => todo.status === 'done';

  return (
    <TodoList 
      todos={todos} 
      render={
        todo => isCompleted(todo) ?
          <b>{ todo.label }</b> : { todo.label }
      }
    />
  );
}

function TodoList({ todos, render }) {
  return (
    <section >
      <ul>
        {
          todos.map((todo, i) => (
            <li key={i}>{ render(todo) }</li>
          ))
        }
      </ul>
    </section>
  );
}
```

### Styling

- clssName

JSX syntax is pretty close to HTML syntax. As such we
have almost the same tag attributes and we may still style
using CSS classes. Classes which are defined in an
external .css file. The only caveat is using className
and not class . For example:
```js
<h1 className="title">Styling</h1>
```

- Inline styling

The inline styling works just fine. Similarly to HTML we are
free to pass styles directly via a style attribute.
However, while in HTML the value is a string, in JSX it
must be an object.
```js
const inlineStyles = {
  color: 'red',
  fontSize: '10px',
  marginTop: '2em',
  'border-top': 'solid 1px #000'
};

<h2 style={ inlineStyles }>Inline styling</h2>
```

- CSS modules

That is not possible by default but with CSS modules we
may import directly a plain CSS file and use the classes
inside.

```js
/* style.css */
.title {
  color: green;
}
// App.jsx
import styles from "./style.css";

function App() {
  return <h1 style={ styles.title }>Hello world</h1>;
}
```

- Styled-components

Instead of
inlining styles the library provides a React component. We
then use this component to represent a specific look and
feel. For example, we may create a Link component that
has certain styling and use that instead of the <a> tag.
Abosolutely, <a> can be the component that we create.
```js
import styled from 'styled-components';

const Link = styled.a`
  text-decoration: none;
  padding: 4px;
  border: solid 1px #999;
  color: black;
`;

<Link href='http://google.com'>Google</Link>
```
We may still use the Link component but change the text
color like so:
```js
const AnotherLink = styled(Link)`
  color: blue;
`;

<AnotherLink href='http://facebook.com'>Facebook</AnotherLink>
```