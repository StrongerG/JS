### BubbleSort
由于两层嵌套，所以时间复杂度为O(n^2)；最好的情况下对一个已经排序的数组进行冒泡排序复杂度为O(n)。
```js
function bubbleSort(arr) {
  // 默认升序排列， 下同
  let length = arr.length - 1,
      exchange = true;

  while (length > 1 && exchange) {
    exchange = false;
    for (let i = 0; i < length; i++) {
      exchange = true;
      if (arr[i] > arr[i+1]) {
        [arr[i], arr[i+1]] = [arr[i+1], arr[i]];
      }
    }
    length--;
  }
  return arr;
}
```
### selectSort
也是两层嵌套 O(n^2)
```js
function selectSort(arr) {
  let length = arr.length;

  for (let i = 0; i < length; i++) {

    let min = i;

    for (let j = i; j < length; j++) {
      if (arr[j] < arr[min]) {
        min = j;
      }
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
  return arr;
}
```
### insertSort
也是O(n^2)
```js
function insertSort(arr) {
  let length = arr.length;

  for (let i = 0; i < length; i++) {

    let position = i,
        temp = arr[i];

    while (position > 0 && arr[position-1] > temp) {
      arr[position] = arr[position-1];
      position--;
    }
    arr[position] = temp;
  }
  return arr;
}
```