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
