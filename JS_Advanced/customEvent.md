### 模拟实现 JavaScript 自定义事件

```js
function CustomEvent() {
  var eventMap = {};

  this.addEvent = function(type, handler) {
    if (typeof eventMap[type] === 'undefined') {
      eventMap[type] = [];
    }
    eventMap[type].push(handler);
  };

  this.removeEvent = function(type, handler) {
    if (typeof eventMap[type] !== 'undefined') {
      for (var i=0; i<eventMap[type].length; i++) {
        if (eventMap[type][i] === handler) {
          eventMap[type].splice(i, 1);
          break;
        }
      }
    }
  }

  this.triggerEvent = function(event) {
    var type = event.type;
    if (eventMap && eventMap[type]) {
      for (var i=0; i<eventMap[type].length; i++) {
        eventMap[type][i](event);
      }
    }
  };
}

// test
var custom = new CustomEvent();
var eventA = function(event) {
  console.log('eventA', event.data.name);
};
var eventB = function(event) {
  console.log('eventB', event.data.name);
};

custom.addEvent("Click", eventA);
custom.addEvent("Click", eventB);
var eventObj = { type: "Click", data: {name: "Hello World"} };
custom.triggerEvent(eventObj);
custom.removeEvent(eventB);
```

### 实现DOM兼容浏览器的自定义事件

```js
var domEvent = {
  addEvent: function (element, event, handler) {
    if (element.addEventListener) {
      element.addEventListener(event, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent("on" + event, handler);
    } else {
      element["on" + event] = handler;
    }
  },
  removeEvent: function (element, event, handler) {
    if (element.removeEventListener) {
      element.removeEventListener(event, handler, false);
    } else if (element.detachEvent) {
      element.detachEvent("on" + event, handler);
    } else {
      element["on" + event] = null;
    }
  },
  stopPropagation: function (event) {
    if (event.stopPropagation) {
      event.stopPropagation();
    } else {
      event.cancelBubble = true;
    }
  },
  preventDefault: function (event) {
    if (event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }
  },
  getElement: function (event) {
    return event.target || event.srcElement;
  },
  getEvent: function (event) {
    return event ? event : window.evnet;
  },
  getType: function () {
    return event.type;
  }
};
```