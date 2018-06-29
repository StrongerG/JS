### 箭头函数的 this 指向问题总结
与一般 function 定义的函数不同的是箭头函数中的 this 是在定义函数的时候绑定，具体看下面的例子：

#### 何为定义时绑定
例一：
```js
var x = 11;
var obj = {
  x: 22,
  say: function () {
    console.log(this.x);
  };
}
obj.say();  // 22, 当运行obj.say()时候，this指向的是obj这个对象(调用该函数的对象)
```
例二，来看箭头函数：
```js
var x = 11;
var obj = {
  x: 22,
  say: () => {
    console.log(this.x);
  };
}
obj.say();  //  11  疑问来了！！  从以下总结可知，箭头函数的this是父执行上下文中继承而来，但对象字面量创建的obj是没有自身的this的，因此this按作用域会继承自再外层，也就是window中的this，因此结果是11
```
继续看例三：
```js
var a = 11
function test1() {
  this.a = 22;
  let b = function () {
    console.log(this.a);
  };
  b();
}
var x = new test1(); // console输出 11，因为 b以函数的形式直接调用，this指向 window
```
例四：
```js
var a = 11;
function test2() {
  this.a = 22;
  let b = () => { console.log(this.a) }
  b();
}
var x = new test2(); // console输出 22  ， b的外层是一个构造函数，有自身的 this 
```
总结：箭头函数中，this指向的固定化，并不是因为箭头函数内部有绑定this的机制，实际原因是箭头函数根本没有自己的this，导致内部的this就是定义时外层代码块的this（也就是说继承的是父执行上下文里面的this）。正是因为它没有this，所以也就不能用作构造函数。
