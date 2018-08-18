# HTML
- 网页的 head 标签的一般配置 ：字符集、关键字、标题、页面描述、IE适配、Viewport...

- \<!DOCTYPE> ：告知浏览器的解析器用什么文档标准解析这个文档。浏览器解析的标准模式和兼容模式

- 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？
  - 行内元素：`a b span img input select strong`...
  - 块级元素：`div ul ol li p h1 h2` ...
  - 常见空元素：`br hr img input link meta`

- link 和 @import 有什么区别:
  - 页面被加载的时，link 会同时被加载，而 @import 引用的CSS会等到页面被加载完再加载
  - link 支持使用 js 控制 DOM 去改变样式，而 @import 不支持

- HTML 标签语义化：用正确的标签做正确的事情。html 语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析，如：`article、footer、header、nav、section` 等(H5)标签，即使在没有样式 CSS 情况下也以一种文档格式显示，并且是容易阅读的；

- 如何实现浏览器内多个标签页之间的通信? 
  - 调用 localstorge、cookies 等本地存储方式；localstorge 另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信；
  - 或使用 `WebSocket、SharedWorker；`

# CSS

- 媒体查询
  - \<link rel=”stylesheet” type=”text/css” href=”xxx.css” media=”only screen and (max-device-width:480px)”>
  - @media only screen and (max-device-width:480px) {/css样式/}

- 浏览器是怎样解析 CSS 选择器的：样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素，只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。

- CSS 优化、提高性能的方法有哪些？
  - 合理的使用 id，一般情况下 id 不应该被用于样式；尽量使用缩写属性，如 font  background；
  -  关键选择器（`key selector`）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）
  - 如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）
  - 提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性
  -  使用预处理工具或构建工具(`webpack` 对 css 进行语法检查、自动补前缀、打包压缩、自动优雅降级)



# JS

# HTTP

- 规定了应用进程间通信的准则
  - 效率高：无连接、无状态、格式简单
  - 可靠性保证：基于 TCP 、 灵活性高、兼容性

- 请求/响应 的工作方式
  1. 服务器保持监听状态，等待客户端发出的连接请求
  2. 客户端发送 连接建立 请求
  3. 双方建立TCP连接（三次握手）
  4. 客户端发送页面请求（形式：HTTP请求报文）
  5. 服务器返回页面请求的响应（HTTP响应报文）
  6. 请求结束，关闭TCP连接（四次挥手）

- HTTP报文
  - 请求报文
    - 请求行：声明 请求方法、资源路径、协议版本等 eg：GET /china/wang.html HTTP/1.1
    - 请求头：声明客户端报文的部分信息  如：Host 主机域名、User-Agent 用户标识，OS 和浏览器的类型和版本
    - 请求体：存放需要发送给服务器的数据信息
  - 响应报文
    - 状态行：声明 协议版本，状态码，状态码描述  eg：HTTP/1.1 202 Accepted
    - 响应头 & 响应体：与请求报文大致相同，特别是 头部 有很多通用的 如Content-Type（请求、响应体的类型，如：text/plain、application/json 等）、Accept 说明接收的类型 等
  - 状态码
    - 2XX : 成功 200: OK  204: success, but no content
    - 3XX : 重定向  301: 永久 302: 临时  304: not modified 有缓存情况下服务端的一种响应
    - 4XX : 400 bad request存在语法错误  401 未认证   403 拒绝   404 not found
    - 5XX : 服务器错误，503 service unavailable

- Cookie
  - Cookie会根据响应报文中的 Set-Cookie 字段来通知客户端自动保存 Cookie。下次请求时会自动发送 Cookie
  - 可以使用Cookie来管理Session（会话），以弥补 HTTP 协议中不存在的状态管理功能
  - 认证步骤
    - 客户端把用户的ID和密码等相关信息放入报文的实体部分，然后通常以POST请求的方式发送给服务器
    - 服务器会发放用以识别用户的Session ID。通过验证从客户端发送过来的登录信息进行身份认证，将用户的认证状态和Session ID绑定后记录在服务器端
    - 客户端接收到Session ID后，会将其作为Cookie保存在本地。下次向服务器发送请求时，浏览器自动发送Cookie，Session ID会随之发送到服务器。服务端通过验证接收到的Session ID识别用户和其认证状态，然后用户就能执行特定的操作了

# React

# Vue


# 浏览器相关

### 跨域

### 性能优化

- **减少 http 请求次数**：CSS Sprites, JS、CSS源码压缩、图片大小控制合适；网页Gzip，CDN托管，data缓存 ，图片服务器...

- 用 innerHTML 代替 DOM 操作，**减少DOM操作次数**，优化javascript性能

- 少用全局变量、缓存 DOM 节点查找的结果，**减少IO读取操作**

- 避免使用内联 style 、 CSS Expression（又称Dynamic properties 动态属性）等，最好统一为 class

- 图片预加载，将样式表放在顶部，将脚本放在底部

### 兼容问题

- 浏览器默认的 margin 和 padding 不同，解决方案，如：加一个全局的 `*{margin:0;padding:0;}` 来统一, 或者使用标准化的 `Normalize.css`

- 解决 ie9 以下浏览器对 html5 新增标签不识别的问题:
  ```
  <!--[if lt IE 9]>
    <script type="text/javascript"   src="https://cdn.bootcss.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <![endif]-->

  // 解决 ie9 以下浏览器不支持 CSS3 Media Query 的问题。
  <script src="https://cdn.bootcss.com/respond.js/1.4.2/respond.min.js"></script>
  ```

- 浮动ie产生的双倍距离
  - 这种情况之下IE会产生20px的距离，解决方案是在float的标签样式控制中加入 ——_display:inline;将其转化为行内属性。(_这个符号只有ie6会识别)
  - 以及对 IE 渐进识别的方式，从总体中逐渐排除局部：
    - 首先，巧妙的使用“\9”这一标记，将IE游览器从所有情况中分离出来
    - 接着，再次使用“+”将IE8和IE7、IE6分离开来，这样IE8已经独立识别
  ```js
  .bb{
    background-color:red; /*所有识别*/
    background-color:#00deff\9;   /*IE6、7、8识别*/
    +background-color:#a200ff;  /*IE6、7识别*/
    _background-color:#1e0bd1;  /*IE6识别*/
  }
  ```

- IE下, even 对象有 x, y 属性,但是没有 pageX, pageY 属性; Firefox下,event 对象有 pageX,pageY 属性,但是没有x,y属性。 解决方法：条件注释

-  IE下,可以使用获取常规属性的方法和`getAttribute()`来获取自定义属性, Firefox下,只能使用`getAttribute()`获取自定义属性, 解决方法:统一通过`getAttribute()`获取自定义属性。

- Chrome 中文界面下默认会将小于 12px 的文本强制按照 12px 显示, 可通过加入 CSS 属性 `-webkit-text-size-adjust: none; `解决。

- 超链接访问过后 `hover` 样式就不出现了 被点击访问过的超链接样式不在具有 `hover` 和 `active` 了解决方法是改变CSS属性的排列顺序: L-V-H-A :  `a:link {} a:visited {} a:hover {} a:active {}`


- 清楚浮动的最佳实践
  ```js
  .fl { float: left; ...}
  .fr { float: right; ...}
  .clearfix:after { display: block; clear: both; content: ""; visibility: hidden; height: 0; }
  .clearfix { zoom: 1; }
  ```

- 窗口大小兼容写法
  ```
  // 浏览器窗口可视区域大小（不包括工具栏和滚动条等边线）
  // 1600 * 525
  var client_w = document.documentElement.clientWidth || document.body.clientWidth;
  var client_h = document.documentElement.clientHeight || document.body.clientHeight;

  // 网页内容实际宽高（包括工具栏和滚动条等边线）
  // 1600 * 8
  var scroll_w = document.documentElement.scrollWidth || document.body.scrollWidth;
  var scroll_h = document.documentElement.scrollHeight || document.body.scrollHeight;

  // 网页内容实际宽高 (不包括工具栏和滚动条等边线）
  // 1600 * 8
  var offset_w = document.documentElement.offsetWidth || document.body.offsetWidth;
  var offset_h = document.documentElement.offsetHeight || document.body.offsetHeight;

  // 滚动的高度
  var scroll_Top = document.documentElement.scrollTop||document.body.scrollTop;
  ```

- DOM 事件处理程序的兼容写法
  ```
  var eventshiv = {
    // event兼容
    getEvent: function(event) {
        return event ? event : window.event;
    },

    // type兼容
    getType: function(event) {
        return event.type;
    },

    // target兼容
    getTarget: function(event) {
        return event.target ? event.target : event.srcelem;
    },

    // 添加事件句柄
    addHandler: function(elem, type, listener) {
        if (elem.addEventListener) {
            elem.addEventListener(type, listener, false);
        } else if (elem.attachEvent) {
            elem.attachEvent('on' + type, listener);
        } else {
            // 在这里由于.与'on'字符串不能链接，只能用 []
            elem['on' + type] = listener;
        }
    },

    // 移除事件句柄
    removeHandler: function(elem, type, listener) {
        if (elem.removeEventListener) {
            elem.removeEventListener(type, listener, false);
        } else if (elem.detachEvent) {
            elem.detachEvent('on' + type, listener);
        } else {
            elem['on' + type] = null;
        }
    },

    // 添加事件代理
    addAgent: function (elem, type, agent, listener) {
        elem.addEventListener(type, function (e) {
            if (e.target.matches(agent)) {
                listener.call(e.target, e); // this 指向 e.target
            }
        });
    },

    // 取消默认行为
    preventDefault: function(event) {
        if (event.preventDefault) {
            event.preventDefault();
        } else {
            event.returnValue = false;
        }
    },

    // 阻止事件冒泡
    stopPropagation: function(event) {
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    }
  };  
  ```

