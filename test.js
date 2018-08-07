function getPara(url) {
  if (url.indexOf('?') > -1) {
    var ret = [],
        paraStr = url.split('?')[1],
        paraItemsList = paraStr.split('&');

    for (var i = 0, len = paraItemsList.length; i < len; i++) {
      var paraKey = paraItemsList[i].split('=')[0],
          paraValue = paraItemsList[i].split('=')[1];
      ret.push({[paraKey]: paraValue});
    }
  } else {
    console.log("该url不含参数");
  }
  
  return ret;
}

