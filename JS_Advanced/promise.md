## Promise 的模拟实现
根据 Promise A+ (Promise的官方标准)实现所有 Promise 的大致功能，详细解释见注释。
[参考文章来源](https://mp.weixin.qq.com/s/rLwO1D7Rsc0pMxfLAMkNYA)

### 实现 resolve, reject, then 以及状态机制
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
  setTimeout(function() {
    resolve(100)
  }, 1000)
})
p.then(function(data) {
  console.log('成功', data)
}, function (err) {
  console.log('失败', err)
})
// 不会输出任何代码
```
原因是我们在then函数中只对成功态和失败态进行了判断，而实例被new时，执行器中的代码会立即执行，但setTimeout中的代码将稍后执行，也就是说，then方法执行时，Promise的状态没有被改变依然是pending态，所以要对pending态也做判断，而由于代码可能是异步的，那么我们就要想办法把回调函数进行缓存，并且，then方法是可以多次使用的，所以要能存多个回调，选择用一个数组来缓存。

### 异步实现

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

### 错误处理
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
实现也很简单，在执行器执行时进行try catch：
```js
try {
  executor(resolve, reject)
} catch(e) {
  reject(e)
}
```

### then 的链式调用，原理：返回一个新的Promise
then 方法修改如下：
```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  let _this = this
  let promise2
  if (_this.status === 'resolved') {
    promise2 = new Promise(function(resolve, reject) {
      try {   // then 回调的onFulfilled就相当于新promise成功时的执行器，整个代码也就也需要放入try catch中， 下同
        let x = onFulfilled(_this.value)
        resolve(x)
      } catch(e) {
        reject(e)
      }
    })
  }
  if (_this.status === 'rejected') {
    promise2 = new Promise(function(resolve, reject) {
      try {  // 看上面
        let x = onRejected(_this.reason)
        resolve(x)
      } catch(e) {
        reject(e)
      }
    })
  }
  if (_this.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(funciton() {
        try {   //异步代码也要放入try catch块中（另加了一层try catch 与同步try catch也不冲突
          let x = onFulfilled(_this.value)
          resolve(x)
        } catch(e) {
          reject(e)
        }
      })
      _this.onRejectedCallbacks.push(function() {
        try {
          let x = onRejected(_this.reason)
          resolve(x)
        } catch (e) {
          reject(e)
        }
      })
    })
  }
  return promise2
}
```
解释：在then方法中先定义一个新的Promise，取名为promise2（官方规定的），然后在三种状态下分别用promise2包装一下，在调用onFulfilled时用一个变量x（规定的）接收返回值，try catch一下代码，没错就调resolve传入x，有错就调reject传入错误，最后再把promise2给return出去，就可以进行链式调用了。
如：
```js
let p = new Promise(function(resolve, reject) {
  resolve(date)
})
p.then(function(data) {
  return data   // 源码中的x就是用来接收该值
}, function() {

}).then(function(data) {
  console.log(data)
}, function() {

})
```
可以测试，链式调用确实实现了，但是别高兴的太早...还要考虑一堆奇葩的情况...
- 前一次then返回一个普通值，字符串数组对象这些东西，都没问题，只需传给下一个then，刚才的方法就够用；
- 前一次then返回的是一个Promise，是正常的操作，也是Promise提供的语法糖，我们要想办法判断到底返回的是啥；
- 前一次then返回的是一个Promise，其中有异步操作，也是理所当然的，那我们就要等待他的状态改变，再进行下面的处理
- 前一次then返回的是自己本身这个Promise
- 调resolve的时候再传一个Promise下去，我们还得处理这个Promise；
- 可能既调resolve又调reject，得忽略后一个
- 光then，里面啥也不写；
- 以及根据规范，onFulfilled和onRejected要异步执行；
- 等等...
上述问题，依据规范都可以顺利的解决，统一的解决方案是定义一个函数来判断和处理这一系列的情况，官方给出了一个叫做resolvePromise的函数。

**先给出最终版本的 then 方法**
```js
Promise.prototype.then = function(onFulfilled, onRejected) {
  // 先解决then什么都不传的问题
  onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : function(value) {
    return value;
  }
  onRejected = typeof onRejected === 'function' ? onRejected : function(err) {
    throw err;
  }

  let _this = this;
  let promise2;

  if (_this.status === 'resolved') {
    promise2 = new Promise(function(resolve, reject) {
      // then回调按规范异步执行
      setTimeout(function() {
        try {   // then 回调的onFulfilled就相当于新promise成功时的执行器，整个代码也就也需要放入try catch中， 下同
          let x = onFulfilled(_this.value)
          resolvePromise(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'rejected') {
    promise2 = new Promise(function(resolve, reject) {
      setTimeout(function() {
        try {  // 看上面
          let x = onRejected(_this.reason)
          resolvePromise(promise2, x, resolve, reject)
        } catch(e) {
          reject(e)
        }
      })
    })
  }
  if (_this.status === 'pending') {
    promise2 = new Promise(function (resolve, reject) {
      _this.onResolvedCallbacks.push(funciton() {
        setTimeout(function() {
          try {   //异步代码也要放入try catch块中（另加了一层try catch 与同步try catch也不冲突
            let x = onFulfilled(_this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch(e) {
            reject(e)
          }
        })
      })
      _this.onRejectedCallbacks.push(function() {
        setTimeout(function() {
          try {
            let x = onRejected(_this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (e) {
            reject(e)
          }
        })
      })
    })
  }
  return promise2;
}
```
以及resolvePromise方法：
```js
function resolvePromise(promise2, x, resolve, reject) {
  // 可能x是其他的promise等
  // 以及其他的异常处理
  if (promise2 === x) {
    return reject(new TypeError("循环引用了"))
  }
  let called
  if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
    // 返回的 x 可能是promise, 看这个对象中是否有then方法，如果有then我就认为他是promise了
    try {
      let then = x.then
      if (typeof then === 'function') {
        // 如果是 promise 
        then.call(x, function(y) {
          if (called) return;
          called = true
          // y可能还是一个promise，递归调用直到返回的是一个普通值, resolvePromise会直接resolve
          resolvePromise(promise2, y, resolve, reject) 
        }, function(err) {
          if (called) return;
          called = true
          reject(err)
        })
      } else {
        resolve(x)
      }
    } catch(e) {
      if (called) return
      called = true
      reject(e)
    }
  } else {
    resolve(x)
  }
}
```

### 其余常用方法实现
- catch 捕获错误的方法，在原型上有catch方法，返回一个没有resolve的then结果即可
```js
Promise.prototype.catch = function(callback) {
  return this.then(null, callback);
}
```
- Promise.all
解析全部方法，接收一个Promise数组promises,返回新的Promise，遍历数组，都完成再resolve
```js
Promise.all = function(promises) {
  return new Promise(function(resolve, reject) {
    let arr = [];
    let i = 0;  // 记录成功了多少次，也就是processData调用了多少次
    function processData(index, y) {
      arr[index] = y;
      if (++i === promises.length) {
        resolve(arr);
      }
    }
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(function(y) {
        processData(i, y);
      }, reject)
    }
  })
}
```
- Promise.race
只要有一个promise成功了 就算成功。如果第一个失败了就失败了
```js
Promise.race = function(promises) {
  return new Promise(resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      promises[i].then(resolve, reject);
    }
  }
}
```
- Other
```js
// 生成一个成功的promise
Promise.reject = function(value) {
  return new Promise(resolve, reject) {
    resolve(value);
  }
}
// 生成一个失败的promise
Promise.reject = function(reason) {
  return new Promise(function(resolve, reject) {
    reject(reason);
  })
}
```
### 最后
总结一下优缺点：
- 优点
  1. 跟callback相比，避免的回调地域无限嵌套，可以使用链式写法
  2. 约束了异步处理的写法
  3. 便于错误捕捉等

- 缺点
  1. Promise一旦生成就无法取消 (一些情况下可以使用Promise.race来取消promise。比如设置异步请求在三秒不成功的话取消，可以在Promise.race的第二个参数加一个三秒的定时器)
  2. 无法处理多次触发的事件
  3. 无法获取当前执行的进度信息