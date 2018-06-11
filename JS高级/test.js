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
