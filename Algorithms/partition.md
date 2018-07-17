### 总结一下快排用到的partition方法
快速排序中用到的 partition 算法思想很简单，首先从无序数组中选出枢轴点 pivot，然后通过一趟扫描，以 pivot 为分界线将数组中其他元素分为两部分，使得左边部分的数小于（或等于）枢轴，右边部分的数大于（或等于）枢轴（左部分或者右部分都可能为空），最后返回枢轴在新的数组中的位置。

### 除了之前用到的双指针方法还可以有单指针
```js
function partition(arr, begin, end) {
  // 选择第一个元素为pivot, begin为开始位置，end为数组长度
  var pivot = arr[begin],
      pos = begin;
  for (var i = begin + 1; i != end; i++) {
    // 这里是小于等于，则pos左边是小于等于pivot，右边是大于pivot
    if (arr[i] <= pivot) {
      pos++;
      if (i != pos) {
        swap(arr[pos], arr[i]); // [arr[pos], arr[i]] = [arr[i], arr[pos]]
      }
    }
  }
  swap(arr[begin], arr[pos]); // [arr[begin], arr[pos]] = [arr[pos], arr[begin]];
  return pos;
}
```
### 应用
除快排外，partition 还可以用 O(N) 的平均时间复杂度从无序数组中寻找第K大的值
```js
function findKthNumber(arr, k) {
  var begin = 0,
      targetNum = 0,
      end = arr.length;
  while (begin < end) {
    var pos = partition(arr, begin, end);
    if (pos === k - 1) {
      targetNum = arr[pos];
      break;
    } 
    else if (pos > k - 1) {
      end = pos;
    }
    else {
      begin = pos + 1;
    }
  }
  return targetNum;
}
```
### 双指针
```js
// 这里的left, right 都是数组下标，与单指针的end区分开来...
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
      right--;
    }
  }
  return left;
}
```
