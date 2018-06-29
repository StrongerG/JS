# Summary Of [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react#table-of-contents)

### Basic Rules
- Only include one React component per file.
  - However, multiple Stateless, or Pure, Components are allowed per file.
- Always use JSX syntax. Do not use React.createElement unless you're initializing the app from a file that is not JSX.

### Class vs React.createClass vs stateless
- If you have internal state and/or refs, prefer class extends React.Component over React.createClass.
- And if you don't have state or refs, prefer normal functions (not arrow functions) over classes:
```js
class Listing extends React.Component {
  // ...
  render() {
    return <div></div>
  }
}


