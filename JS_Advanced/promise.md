### Promise 的模拟实现
根据 Promise A+ (Promise的官方标准)实现所有 Promise 的大致功能，详细解释见注释。
[参考文章来源](https://mp.weixin.qq.com/s/rLwO1D7Rsc0pMxfLAMkNYA)

#### 实现 resolve, reject, then 以及状态机制
根据 Promise 的使用可以知道，Promise 是一个需要执行器的构造函数，执行器需要resolve、reject两个方法，内部还有状态机制，then等方法位于原型链上。
```js
function Promise(executor) {
  let _this = this  // 缓存this，避免指针混乱
  _this.status = 'pending'   // 默认状态为等待
  _this.value = undefined  // 成功时传递出去的数据
  _this.reason = undefined  // 失败时传递给失败回调的失败原因
  //实现resolve、reject连个内部方法
  function resolve(value) {
    // promise 只有在状态为pending时才能装换为其他状态，所以先进行判断
    if (_this.status === 'pending') {
      _this.status = 'resolved'
      _this.value = value 
    }
  }
  function reject(reason) {
    if (_this.status === 'pending') {
      _this.status = 'rejected'
      _this.reason = reason
    }
  }
  executor(resolve, reject)  // 执行执行器函数，默认传入上述两个方法
}

Promise.prototype.then = function(onFulfilled, onRejected) {
  let _this = this
  if (_this.status === 'resolved') {
    onFulfilled(_this.value)
  }
  if (_this.status === 'rejected') {
    onRejected(_this.reason)
  }
}

module.exports = Promise
```
可以进行测试，但是只有在执行器是同步运算的前提下。
当执行器的操作是异步时，如：
```js
let p = new Promise(function (resolve, reject) {
  setTimeout(function () {
    resolve(100)
  }, 1000)
})
p.then(function (data) {
  console.log('成功', data)
}, function (err) {
  console.log('失败', err)
})
// 不会输出任何代码
```
原因是我们在then函数中只对成功态和失败态进行了判断，而实例被new时，执行器中的代码会立即执行，但setTimeout中的代码将稍后执行，也就是说，then方法执行时，Promise的状态没有被改变依然是pending态，所以要对pending态也做判断，而由于代码可能是异步的，那么我们就要想办法把回调函数进行缓存，并且，then方法是可以多次使用的，所以要能存多个回调，选择用一个数组来缓存。

#### 异步实现

```js
// 在构造函数中注册(加上)异步的回调队列：
_this.onResolvedCallbacks = []
_this.onRejectedCallbacks = []

// then 方法中修改
if (_this.status === 'pending') {
  // 每一次then时，如果是等待态，就把回调函数push进数组中，什么时候改变状态什么时候再执行
  _this.onResolvedCallbacks.push(function() { // 这里用一个函数包起来，是为了后面加入新的逻辑进去
    onFulfilled(_this.value)
  })
  _this.onRejectedCallbacks.push(function() {
    onRejected(_this.reason)
  })
}

// 修改resolve 和 reject
function resolve(value) {
  if (_this.status === 'pending') {
    _this.status = 'resolved'
    _this.value = value
    _this.onResolvedCallbacks.forEach(funciton(fn) { // 成功时，一一调用成功回调
      fn()
    })
  }
}
function reject(reason) {
  if (_this.status === 'pending') {
    _this.status = 'rejected'
    _this.reason = reason
    _this.onRejectedCallbacks.forEach(function(fn) {
      fn()
    })
  }
}
```
现在实现的 Promise 可以执行异步任务，也可以多次调用 then 方法，但还是需要很多其他的处理，以及 then 的链式调用还没有实现...

#### 错误处理
Promise 如果在实例中抛出错误，应该走reject，如：
```js
new Promise(function(resolve, reject) {
  throw new Error('error')
}).then(function() {

}, function(err) {
  console.log("错误: ", err)
})
// 错误：
```

#### then 的链式调用，原理：返回一个新的Promise

