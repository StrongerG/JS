## new 关键字的模拟实现
要模拟一个 new 关键字的实现，大致需要：
1. 新建一个空对象；
2. 使其 __proto__ 指向 构造函数的 prototype 属性；
3. 使构造函数中的 this 指向新建的对象，运行并返回该对象
代码如下：
```js
function objectFactory() {
  var obj = {};

  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;

  Constructor.apply(obj, arguments);

  return obj;
}

// test
function test(name, age) {
  this.name = name;
  this.age = age;
}

test.prototype.school = 'swjtu';
test.prototype.printName = function() {
  console.log('My name is Orwell');
}
```

### 还需要考虑的是，当构造函数有返回值时的特殊处理
在 new 关键字下：
- 构造函数返回了一个对象，在实例中只能访问到返回的对象中的属性；
- 如果只是返回一个基本类型的值，则当于没有返回值进行处理。

所以最终的代码为：
```js
function objectFactory() {
  var obj = {};

  Constructor = [].shift.call(arguments);
  obj.__proto__ = Constructor.prototype;

  var ret = Constructor.apply(obj, arguments);

  return typeof ret === 'object' ? ret : obj;
}

// test
function test(name age) {
  this.name = name;
  this.age = age;

  return {
    name: 'Orwell',
    age: age
  }
}

Test = objectFactory(test, 'Luo', 19);
```
