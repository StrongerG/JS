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
### mergeSort
时间复杂度为 O(nlogn)
```js
function mergeSort(arr) {
  if (arr.length === 1) return arr;

  let middleIndex = Math.floor(arr.length / 2),
      leftArray = arr.slice(0, middleIndex),
      rightArray = arr.slice(middleIndex);
  
  let leftSortedArray = mergeSort(leftArray),
      rightSortedArray = mergeSort(rightArray);

  return merge(leftSortedArray, rightSortedArray);
}

function merge(leftArray, rightArray) {
  let leftIndex = 0,
      rightIndex = 0,
      sortedArray = [];
  
  while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
    // 从小到大排列 放入新数组
    if (leftArray[leftIndex] < rightArray[rightIndex]) {
      sortedArray.push(leftArray[leftIndex++]);
    } else {
      sortedArray.push(rightArray[rightIndex++]);
    }
  }
  return sortedArray.concat(leftArray.slice(leftIndex)).concat(rightArray.slice(rightIndex));
}
```
### quickSort
- In place.
```js
function quickSortInPlace(arr) {
  let left = 0,
      right = arr.length - 1;
  
  sort(arr, left, right);
  return arr;

  function sort(arr, left, right) {
    if (arr.length === 1) {
      return;
    }
    let index = partition(arr, left, right);
    if (left < index - 1) {
      sort(arr, left, index - 1);
    }
    if (index < right) {
      sort(arr, index, right);
    }
  }

  function partition(arr, left, right) {
    let pivot = arr[Math.floor((left + right) / 2)];

    while (left <= right) {

      while (arr[left] < pivot) {
        left++;
      }
      while (arr[right] > pivot) {
        right--;
      }
      if (left <= right) {
        [arr[left], arr[right]] = [arr[right], arr[left]];
        left++;
        right++;
      }
    }
    return left;
  }
}
```
- 直接递归，缺点空间消耗大
```js
function quickSort(arr) {
  if (arr.length < 2) {
    return arr;
  }
  const pivot = arr.shift(),
        left = [];
        right = [];
  
  arr.forEach((num) => {
    num < pivot ? left.push(num) : right.push(num);
  })
  return quickSort(left).concat([pivot], quickSort(right));
}
```