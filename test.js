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