### currying
In mathematics and computer science, currying is the technique of translating the evaluation of a function that takes multiple arguments (or a tuple of arguments) into evaluating a sequence of functions, each with a single argument.
```js
function curryIt(fn) {
  var length = fn.length;
  var args = arguments[1] || [];

  return function() {
    for (var i = 0, len = arguments.length; i < len; i++) {
        args.push(arguments[i]);
    }
    if (_args.length === length) {
        return fn.apply(null, args);
    }
    return curryIt(fn, args);      
  }
}
```

### 