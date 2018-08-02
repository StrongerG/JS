# Summary Of [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react#table-of-contents)

### Basic Rules
- Only include one React component per file.
  - However, multiple Stateless, or Pure, Components are allowed per file.
- Always use JSX syntax. Do not use React.createElement unless you're initializing the app from a file that is not JSX.
- Do not use Mixins.

### Class vs React.createClass vs stateless
- If you have internal state and/or refs, prefer class extends React.Component over React.createClass.
- And if you don't have state or refs, prefer normal functions (not arrow functions) over classes:
```js
class Listing extends React.Component {
  // ...
  render() {
    return <div>{ this.state.hello }</div>;
  }
}
// not arrow functions best
function Listing({ hello }) {
  return <div>{ hello }</div>;
}
```

### Nameing
- Extensions: Use .jsx extension for React.components.
- Filename: Use PascalCase for filenames. eg: ReservationCard.jsx.
- Reference Naming: Use PascalCase for React components and camelCase for their instances. 
```js
// good
import ReservationCard from './Reservation';
// bad
import ReservationCard from './ReservationCard';

// good
const reservationItem = <ReservationCard />;
// bad
const ReservationItem = <ReservationCard />;
```
- Component Naming: Use the filename as the component name. 
```js
// bad
import Footer from './Footer/Footer';
// bad
import Footer from './Footer/index';
// good
import Footer from './Footer';
```
- Props Naming: Avoid using DOM component prop names for different purposes.
- Higher-order Component Naming ...

### Alignment
- Follow these alignment styles for JSX syntax. 
```js
// bad
<Foo superLongParam="bar"
     anotherSuperLongParam="baz" />

// good
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
/>

// if props fit in one line then keep it on the same line
<Foo bar="bar" />

// children get indented normally
<Foo
  superLongParam="bar"
  anotherSuperLongParam="baz"
>
  <Quux />
</Foo>
```

### Quotes
- Always use double quotes (") for JSX attributes, but single quotes (') for all other JS. 
```js
// bad
<Foo bar='bar' />

// good
<Foo bar="bar" />

// bad
<Foo style={{ left: "20px" }} />

// good
<Foo style={{ left: '20px' }} />
```

### Spacing
- Always include a single space in your self-closing tag. 
```js
// bad
<Foo/>

// very bad
<Foo                 />

// bad
<Foo
 />

// good
<Foo />
```
- Do not pad JSX curly braces with spaces. 
```js
// bad
<Foo bar={ baz } />

// good
<Foo bar={baz} />
```

### Props
- Always use camelCase for prop names.
```js
// bad
<Foo
  UserName="hello"
  phone_number={12345678}
/>

// good
<Foo
  userName="hello"
  phoneNumber={12345678}
/>
```
- Omit the value of the prop when it is explicitly true.
```js
// bad
<Foo
  hidden={true}
/>

// good
<Foo
  hidden
/>

// good
<Foo hidden />
```
- Always include an alt prop on <img> tags. If the image is presentational, alt can be an empty string or the <img> must have role="presentation".
```js
// bad
<img src="hello.jpg" />

// good
<img src="hello.jpg" alt="Me waving hello" />

// good
<img src="hello.jpg" alt="" />

// good
<img src="hello.jpg" role="presentation" />
```
- **Avoid using an array index as key prop, prefer a unique ID.** (Why?)
```js
// bad
{todos.map((todo, index) =>
  <Todo
    {...todo}
    key={index}
  />
)}

// good
{todos.map(todo => (
  <Todo
    {...todo}
    key={todo.id}
  />
))}
```

### Refs
- Always use ref callbacks.
```js
// bad
<Foo
  ref="myRef"
/>

// good
<Foo
  ref={(ref) => { this.myRef = ref; }}
/>
```

### Parentheses
- Wrap JSX tags in parentheses when they span more than one line.
```js
// bad
render() {
  return <MyComponent variant="long body" foo="bar">
           <MyChild />
         </MyComponent>;
}

// good
render() {
  return (
    <MyComponent variant="long body" foo="bar">
      <MyChild />
    </MyComponent>
  );
}

// good, when single line
render() {
  const body = <div>hello</div>;
  return <MyComponent>{body}</MyComponent>;
}
```

### Tags
- Always self-close tags that have no children.
- If your component has multi-line properties, close its tag on a new line. 

### Methods
- Use arrow functions to close over local variables.
```js
function ItemList(props) {
  return (
    <ul>
      {props.items.map((item, index) => (
        <Item
          key={item.key}
          onClick={() => doSomethingWith(item.name, index)}
        />
      ))}
    </ul>
  );
}
```
- Bind event handlers for the render method in the constructor. 
```js
// bad
class extends React.Component {
  onClickDiv() {
    // do stuff
  }
// A bind call in the render path creates a brand new function on every single render.
  render() {
    return <div onClick={this.onClickDiv.bind(this)} />;
  }
}

// good
class extends React.Component {
  constructor(props) {
    super(props);

    this.onClickDiv = this.onClickDiv.bind(this);
  }

  onClickDiv() {
    // do stuff
  }

  render() {
    return <div onClick={this.onClickDiv} />;
  }
}
```

### Ordering
- Ordering for class extends React.Component:
1. optional static methods
2. constructor
3. getChildContext
4. componentWillMount
5. componentDidMount
6. componentWillReceiveProps
7. shouldComponentUpdate
8. componentWillUpdate
9. componentDidUpdate
10. componentWillUnmount
11. clickHandlers or eventHandlers like onClickSubmit() or onChangeDescription()
12. getter methods for render like getSelectReason() or getFooterContent()
13. optional render methods like renderNavigation() or renderProfilePicture()
14. render
- How to define propTypes, defaultProps, contextTypes, etc...
```js
import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  id: PropTypes.number.isRequired,
  url: PropTypes.string.isRequired,
  text: PropTypes.string,
};

const defaultProps = {
  text: 'Hello World',
};

class Link extends React.Component {
  static methodsAreOk() {
    return true;
  }

  render() {
    return <a href={this.props.url} data-id={this.props.id}>{this.props.text}</a>;
  }
}

Link.propTypes = propTypes;
Link.defaultProps = defaultProps;

export default Link;
```
