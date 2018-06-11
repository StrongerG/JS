Function.prototype.call 和 Function.prototype.apply 是ECAMScript 3给 Function 的原型定义了两个方法, 它们都是非常常用的方法。它们的作用一模一样，区别仅在于传入参数形式的不同。

它们的主要用法：
- 动态地改变传入函数的 this；
   很常见的用法, 不多说...
- 借用其他对象的方法
  - 如：构造函数的组合继承；
  - Math.max.apply(null, [1, 2, 5, 3, 4])  // 输出5
  - 在操作 arguments 的时候（以及其他对象），会非常频繁地找 Array.prototype 对象间接借用方法；

话不多说，直接上代码，模拟实现call、apply、bind的基本功能（省略一些错误处理等），具体解释看注释：
- call
```js
Function.prototype.call = function (context) {
  var context = context || window;  // 若传入对象为空（null） 则取为window
  context.fn = this;    // 保存当前调动call的函数对象，并实在context的环境下调用，达到改变this的效果

  var args = [];     // 参数处理
  for(var i = 1, len = arguments.length; i < len; i++) {
    args.push('arguments[' + i + ']');
  }

  var result = eval('context.fn(' + args +')');  // args会自动调用 Array.toString()方法，使用eval达到正确传入参数的效果

  delete context.fn   // 清除创建的fn
  return result;   // 若函数有返回值则返回结果
}

// test
var value = 2;

var obj = {
  value: 1
}

function bar(name, age) {
  console.log(this.value);
  return {
    value: this.value,
    name: name,
    age: age
  }
}

bar.call(null); // 2

console.log(bar.call2(obj, 'kevin', 18));
/* 1
Object {
  value: 1,
  name: 'kevin',
  age: 18
} */
```

- apply 类似，不再详细叙述
```js
Function.prototype.apply = function (context, arr) {
    var context = context || window;
    context.fn = this;

    var args = []; // 将arr内的参数处理为字符串，方便eval的调用
    for (var i = 0, len = arr.length; i < len; i++) {
      args.push('arr[' + i + ']');
    }

    var  result = eval('context.fn(' + args + ')')
    
    delete context.fn
    return result;
}
```

- bind  
```js
Function.prototype.bind = function () {
  var self = this, // 保存原函数
    context = [].shift.call(arguments), // 需要绑定的 this 上下文
    args = [].slice.call(arguments); // 剩余的参数转成数组

  return function () { // 返回一个新的函数
    return self.apply(context, [].concat.call(args, [].slice.call(arguments)));
    // 执行新的函数的时候，会把之前传入的 context 当作新函数体内的 this
    // 并且组合两次分别传入的参数，作为新函数的参数
  }
};

// test
var obj = {
  name: 'sven'
};

var func = function(a, b, c, d){
  alert (this.name); // 输出：sven
  alert ([a, b, c, d]) // 输出：[1, 2, 3, 4]
}.bind(obj, 1, 2);

func(3, 4);
```
