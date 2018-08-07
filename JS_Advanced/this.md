### this总结
- this 是什么

 this 是在运行时进行绑定的，并不是在编写时绑定，它的上下文取决于函数调用时的各种条件。 this 的绑定和函数声明的位置没有任何关系，只取决于函数的调用方式。

当一个函数被调用时，会创建一个活动记录（有时候也称为执行上下文）。这个记录会包含函数在哪里被调用（调用栈）、函数的调用方法、传入的参数等信息。 this 就是记录的其中一个属性，会在函数执行的过程中用到。

- 绑定规则
1. new（优先级最高，之后依次降低）   
2. 隐式  通过对象调用方法   
3. 显示 call apply bind  
4. 默认绑定  非严格模式绑定到全局  

除此之外：箭头函数，根据外层（函数或者全局）作用域来决定 this

### 箭头函数的 this 指向问题总结

与一般 function 定义的函数不同的是箭头函数中的 this 是在定义函数的时候绑定，也就是根据外层（函数或者全局）作用域来决定 this，具体看下面的例子：

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
