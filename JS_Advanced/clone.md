主要考虑数组与对象的深、浅克隆

### 技巧型
- 对数组，可以使用自带的slice、concat方法,直接调用 arr.concat()、 arr.slice() 就能实现数组的浅克隆 
- ES6 提供的 Array.from 以及 扩展运算符可以实现数组的浅克隆
- 特别地，JSON.parse(JSON.stringify(arr/obj)) 能够实现对象/数组的深克隆 (针对JSON-safe的值，即除开 undefined 、 function 、 symbol （ES6+）和包含循环引用（对象之间相互引用，形成一个无限循环）的 对象，以上都不符合 JSON 结构标准，支持 JSON 的语言无法处理它们。)

### 方法实现
- 浅
```js
var shallowCopy = function(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    newObj[key] = obj[key];
  }
  return newObj;
}
```
- 深
```js
var deepCopy = function(obj) {
  if (typeof obj !== 'object') return;
  var newObj = obj instanceof Array ? [] : {};
  for (var key in obj) {
    newObj[key] = typeof obj[key] === 'object' ? deepCopy(obj[key]) : obj[key];
  }
  return newObj;
}
```

