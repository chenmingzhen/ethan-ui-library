(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[22],{215:function(e,n,t){"use strict";var r=t(12),l=t.n(r),u=t(1),f=t.n(u),m=t(34),d=t(27),p=t(42),h=t(44);n.a=function(c){return function(e){var n=Object(u.useState)(""),n=l()(n,2),r=n[0],o=n[1],n=Object(u.useState)([]),a=l()(n,1)[0],t=e.location.hash,s=Object(d.useUpdate)(),n=Object(u.useCallback)(function(e){e.forEach(function(e){a.push(e)}),s()},[]),i=Object(u.useCallback)(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);Object(u.useEffect)(function(){i();function e(){var t,r=document.documentElement.scrollTop,e=a.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#".concat(e.id));n&&n.offsetTop<=r&&(t=e.id)}),o(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return f.a.createElement("div",{className:Object(p.f)("_")},f.a.createElement(c,{onHeadingSetted:n}),!e.noNav&&f.a.createElement(m.G,{className:Object(p.f)("sticky"),top:50},f.a.createElement("div",{className:Object(p.f)("nav")},a.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return f.a.createElement("a",{key:n,className:Object(p.f)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===h.a.location.search.indexOf("?example=")?h.a.push("".concat(h.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(h.a.push("".concat(h.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},216:function(e,n,t){"use strict";var r=t(8),c=t.n(r),d=t(1),p=t.n(d),r=t(12),h=t.n(r),r=t(0),o=t.n(r),r=t(25),l=t.n(r),r=t(23),u=t.n(r),r=t(217),f=t.n(r),m=t(49),g=t(14),v=t(42),b=t(35),r=t(10),a=t.n(r),r=t(218),s=t.n(r),E=(t(219),function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=Object(d.useRef)(null);return Object(d.useEffect)(function(){var e=r.current;s.a.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),p.a.createElement("pre",{ref:r,className:a()(n||"lang-jsx",Object(v.a)("pre"))},p.a.createElement("code",null,e))}),r=t(74),y=t.n(r),w=t(34),C=t(72),M=t(44),x=p.a.createElement("div",{className:Object(v.a)("placeholder")},p.a.createElement(w.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function k(e){var n=e.component,t=e.id,r=e.name,o=e.rawText,a=e.title,s=Object(d.useRef)(null),i=Object(d.useState)(!1),c=h()(i,2),l=c[0],u=c[1],e=Object(d.useState)(Object(d.createElement)(n)),i=h()(e,1)[0],c=Object(d.useState)(),n=h()(c,2),f=n[0],m=n[1],e=Object(d.useState)(),c=(h()(e,1)[0],o.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(d.useEffect)(function(){s.current&&(s.current.style.height=l?"".concat(f,"px"):"0")},[l]);n=function(e){return p.a.createElement("a",{className:Object(v.a)("toggle"),onClick:function(e){u(!l)}.bind(null,e)},p.a.createElement(C.a,{name:l?"code-close":"code"}))},e=M.a.location.search,o="?example=";if(0===e.indexOf(o)&&(e=e.replace(o,""),r.indexOf(e)<0))return null;r=a.split("\n"),e=y()(r),r=e[0],e=e.slice(1),r=r&&r.trim();return p.a.createElement(d.Fragment,null,r&&p.a.createElement("h3",{key:"0",id:t},r),p.a.createElement(w.r,{placeholder:x},p.a.createElement("div",{className:Object(v.a)("_",l&&"showcode")},p.a.createElement("div",{className:Object(v.a)("body")},i),0<a.length&&p.a.createElement("div",{className:Object(v.a)("desc")},e.map(function(e,n){return p.a.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),p.a.createElement("div",{ref:s,className:Object(v.a)("code")},p.a.createElement(E,{onHighLight:function(e){m(e)},value:c}),n(!0)))))}k.propTypes={component:o.a.func.isRequired,id:o.a.string,name:o.a.string,rawText:o.a.string,title:o.a.string.isRequired},k.defaultProps={rawText:""};r=function(e){var n=e.children,e=Object(d.useState)(!1),e=h()(e,2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return p.a.createElement("div",{onClick:function(){r(!t)},className:Object(v.e)("console")},p.a.createElement(n,null,e))};r.propTypes={children:o.a.array},r.defaultProps={children:[]};var O=r;function i(e){var e=e.children,n=u()(e[1].props.children);try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return p.a.createElement("div",{style:{overflow:"auto"}},p.a.createElement("table",{className:"doc-api-table"},e[0],p.a.cloneElement(e[1],{children:n})))}i.propTypes={children:o.a.any},i.defaultProps={};var j=i,S=/^<code name="([\w|-]+)" /,T=/^<example name="([\w|-]+)"/;function B(e){var n=e.onHeadingSetted,o=e.codes,a=e.examples,t=e.source,e=Object(d.useState)([]),r=h()(e,1)[0],e=Object(d.useState)({}),s=h()(e,1)[0];Object(d.useEffect)(function(){n&&n(r)},[]);function i(e){r.push(e)}return p.a.createElement(f.a,{className:Object(v.e)("_"),source:t,renderers:{code:E,heading:function(e){var n,t=e.level,r=e.children,o="".concat(t,"-").concat(r[0]),a="h".concat(t);return"object"===l()(r[0])?p.a.createElement(a,null,r):(s[o]||(e="heading-".concat((n=t,e=r[0],4===n?Object(g.c)():"".concat(n,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==t&&3!==t||i({id:e,level:t,children:r}),s[o]=p.a.createElement(a,{id:e},r)),s[o])},html:function(e){if("<example />"===e.value)return function(){if(s.examples)return s.examples;if(!a)return p.a.createElement("div",null);var e=Object(b.b)("示例","Example"),n="heading-example-h";return i({id:n,level:2,children:[e]}),s.examples=[p.a.createElement("h2",{key:"h",id:n},e)].concat(u()(a.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),r=e.title.split("\n"),r=h()(r,1)[0];return i({id:t,level:3,children:[r]}),p.a.createElement(k,c()({key:n,id:t},e))}}))),s.examples}();var n,t=e.value.match(T);if(t)return n=t[1],e.value.indexOf("noExpand"),r="example-".concat(n),s[r]||(t=(a||[]).find(function(e){return e.name===n}),s[r]=t?p.a.createElement(k,t):null),s[r];if("<br>"===e.value||"<br />"===e.value)return p.a.createElement("br",null);var r=e.value.match(S);return r?(e=r[1],(r=o[e])?[p.a.createElement(E,{key:"cb",value:r.text})].concat(u()(r.log.map(function(e,n){return p.a.createElement(O,{key:n},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:j,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?p.a.createElement("a",{href:e.href,target:n},e.children):p.a.createElement(m.a,{to:e.href,target:n},e.children)}}})}B.propTypes={children:o.a.oneOfType([o.a.element,o.a.array]),codes:o.a.object,examples:o.a.array,onHeadingSetted:o.a.func,source:o.a.string.isRequired},B.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var N=t(73),R=(t(215),D.propTypes={loader:o.a.func,source:o.a.string},D.defaultProps={loader:void 0,source:void 0},Object(d.memo)(D));function D(e){var n=Object(d.useState)(e.source),t=h()(n,2),n=t[0],r=t[1];return Object(d.useEffect)(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?p.a.createElement(B,c()({},e,{source:n})):p.a.createElement(N.a,{style:{minHeight:200}})}n.a=R},800:function(e,n){e.exports="# Message 消息\r\n\r\n可用来展示操作反馈信息。\r\n\r\n- 为**成功**、**警告**、**错误**和**常规**信息展示。\r\n- 是一种轻量级、多位置展示和可自定义时间消失，且带有沉浸式交互体验的组件。\r\n\r\n<example />\r\n\r\n## API \r\n\r\n### Message\r\n\r\nMessage 提供了一组方法供全局调用\r\n\r\nMessage.show(content, \\[duration], \\[options])  // 不带有icon，纯 Message 展示\r\n\r\nMessage.info(content, \\[duration], \\[options])    // 带有基础样式和icon\r\n\r\nMessage.success(content, \\[duration], \\[options])\r\n\r\nMessage.warn(content, \\[duration], \\[options])\r\n\r\nMessage.error(content, \\[duration], \\[options])\r\n\r\nMessage.close() // 关闭所有消息\r\n\r\nMessage.closeAll() // 关闭所有消息(带动画)\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| content | ReactNode | 必填 | 消息内容 |\r\n| duration | number | 3 | 消息持续时间，单位秒；如果设置为 0，必须手动关闭 |\r\n\r\n\r\n### MessageOptions\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| onClose | function | 无 | 关闭后回调事件 |\r\n| position | string | top | 消息显示的位置，可选值 \\['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] |\r\n| title | string | - | 标题文字 |\r\n| className | string | 无 | 类名 |\r\n"},801:function(e,n){e.exports="# Message\r\n\r\nDisplay message about operational feedback.\r\n\r\n- Displays **success**, **warnings**, **errors**, and **general** information\r\n- It is an immersive interactive experience that is lightweight, multi-location, and customizable.\r\n\r\n<example />\r\n\r\n## API \r\n\r\n### Message\r\n\r\nMessage provides a set of methods for global calls\r\n\r\nMessage.show(content, \\[duration], \\[options]) // No icon, pure message display\r\n\r\nMessage.info(content, \\[duration], \\[options])  // With basic style and icon\r\n\r\nMessage.success(content, \\[duration], \\[options])\r\n\r\nMessage.warn(content, \\[duration], \\[options])\r\n\r\nMessage.error(content, \\[duration], \\[options])\r\n\r\nMessage.close() // Close all messages\r\n\r\nMessage.closeAll() // Close all messages(With Animation)\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| content | ReactNode | required | The message content |\r\n| duration | number | 3 | Message duration, unit: s; If it is set to 0, it must be manually closed. |\r\n\r\n\r\n### MessageOptions\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| onClose | function | none | The callback function when the message is closed. |\r\n| position | string | 'top' | The position where the message display, options: \\['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right'] |\r\n| title | string | | title |\r\n| className | string | none | class name |\r\n"},802:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement("div",null,o.a.createElement(a.f,{onClick:function(){a.u.show("Some message.")}},"Show"),o.a.createElement(a.f,{onClick:function(){a.u.info("This is a message of info.")}},"Info"),o.a.createElement(a.f,{onClick:function(){a.u.success("This is a message of success.")}},"Success"),o.a.createElement(a.f,{onClick:function(){a.u.warn("This is a message of warning.")}},"Warn"),o.a.createElement(a.f,{onClick:function(){a.u.error("This is a message of error.")}},"Error"),o.a.createElement(a.f,{onClick:function(){var e=a.u.loading("Loading",0);setTimeout(function(){e.then(function(e){return e()})},2e3)}},"Loading"),o.a.createElement(a.f,{onClick:function(){a.u.close()}},"Close All"),o.a.createElement(a.f,{onClick:function(){a.u.closeAll()}},"Close All With Animation"))}},803:function(e,n){e.exports="/**\r\n * cn - 基本用法\r\n *    -- Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒。\r\n * en - Base\r\n *    -- Message has 6 static functions that are convenient to call anywhere, includes normal(with/without icon)、success、warn、error and close all messages\r\n */\r\nimport React from 'react'\r\nimport { Button, Message } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button\r\n        onClick={() => {\r\n          Message.show('Some message.')\r\n        }}\r\n      >\r\n        Show\r\n      </Button>\r\n      <Button\r\n        onClick={() => {\r\n          Message.info('This is a message of info.')\r\n        }}\r\n      >\r\n        Info\r\n      </Button>\r\n      <Button\r\n        onClick={() => {\r\n          Message.success('This is a message of success.')\r\n        }}\r\n      >\r\n        Success\r\n      </Button>\r\n      <Button\r\n        onClick={() => {\r\n          Message.warn('This is a message of warning.')\r\n        }}\r\n      >\r\n        Warn\r\n      </Button>\r\n      <Button\r\n        onClick={() => {\r\n          Message.error('This is a message of error.')\r\n        }}\r\n      >\r\n        Error\r\n      </Button>\r\n      <Button\r\n        onClick={() => {\r\n          const hide = Message.loading('Loading', 0)\r\n          setTimeout(() => {\r\n            hide.then(close => close())\r\n          }, 2000)\r\n        }}\r\n      >\r\n        Loading\r\n      </Button>\r\n\r\n      <Button\r\n        onClick={() => {\r\n          Message.close()\r\n        }}\r\n      >\r\n        Close All\r\n      </Button>\r\n      <Button\r\n        onClick={() => {\r\n          Message.closeAll()\r\n        }}\r\n      >\r\n        Close All With Animation\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n"},804:function(e,n,t){"use strict";t.r(n);function r(){return i.u.info("This message will close after 10 seconds.",10)}function o(){return i.u.error("This message will not close utill click the close icon.",0)}var a=t(1),s=t.n(a),i=t(34);n.default=function(){return s.a.createElement("div",null,s.a.createElement(i.f,{onClick:r},"Duration 10 s."),s.a.createElement(i.f,{onClick:o},"Manually close"))}},805:function(e,n){e.exports="/**\r\n * cn - 显示时长\r\n *    -- 通过 duration 属性可以控制消息显示的时长，默认为3秒；当设定为 0s 时，则需要用户手动关闭 Message\r\n * en - Duration\r\n *    -- Set duration property to control the duration of the message display. The default value is 3 seconds.\r\n *    -- When duration is set to 0, the message will not hide automatically.\r\n */\r\nimport React from 'react'\r\nimport { Button, Message } from 'ethan/index'\r\n\r\nconst s10 = () => Message.info('This message will close after 10 seconds.', 10)\r\nconst s0 = () => Message.error('This message will not close utill click the close icon.', 0)\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button onClick={s10}>Duration 10 s.</Button>\r\n      <Button onClick={s0}>Manually close</Button>\r\n    </div>\r\n  )\r\n}\r\n"},806:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return r});var n=t(4),o=t.n(n),n=t(5),a=t.n(n),n=t(2),s=t.n(n),n=t(6),i=t.n(n),n=t(7),c=t.n(n),n=t(3),l=t.n(n),n=t(9),u=t.n(n),n=t(1),f=t.n(n),m=t(34);function d(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,n=l()(t);return n=r?(e=l()(this).constructor,Reflect.construct(n,arguments,e)):n.apply(this,arguments),c()(this,n)}}var r=function(e){i()(r,e);var t=d(r);function r(e){var n;return o()(this,r),n=t.call(this,e),u()(s()(n),"setPosition",function(e){return n.setState({position:e})}),u()(s()(n),"show",function(){m.u.info(f.a.createElement("div",{style:{width:240}},"some message."),3,{position:n.state.position,title:"notify title"})}),n.state={position:"top-right"},n}return a()(r,[{key:"render",value:function(){return f.a.createElement("div",null,"position:",f.a.createElement(m.C,{keygen:!0,data:["top","middle","top-left","top-right","bottom-left","bottom-right"],onChange:this.setPosition,value:this.state.position,width:200,style:{margin:"0 20px"}}),f.a.createElement(m.f,{onClick:this.show},"Show message."))}}]),r}(f.a.Component)},807:function(e,n){e.exports="/**\r\n * cn - 弹出位置\r\n *    -- 设置 position 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right。\r\n * en - Notification\r\n *    -- Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right.\r\n */\r\nimport React from 'react'\r\nimport { Button, Message, Select } from 'ethan/index'\r\n\r\nexport default class extends React.Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = { position: 'top-right' }\r\n  }\r\n\r\n  setPosition = position => this.setState({ position })\r\n\r\n  show = () => {\r\n    Message.info(<div style={{ width: 240 }}>some message.</div>, 3, {\r\n      position: this.state.position,\r\n      title: 'notify title',\r\n    })\r\n  }\r\n\r\n  render() {\r\n    return (\r\n      <div>\r\n        position:\r\n        <Select\r\n          keygen\r\n          data={['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right']}\r\n          onChange={this.setPosition}\r\n          value={this.state.position}\r\n          width={200}\r\n          style={{ margin: '0 20px' }}\r\n        />\r\n        <Button onClick={this.show}>Show message.</Button>\r\n      </div>\r\n    )\r\n  }\r\n}\r\n"},808:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,{onClick:function(){a.u.warn("Close this message will display another message.",0,{onClose:function(){a.u.info("You can close the message now.")}})}},"Close callback")}},809:function(e,n){e.exports="/**\r\n * cn - 关闭回调\r\n *    -- 通过第三个参数[options]的 onClose 属性处理消息关闭回调。以下用例将在 Message 关闭后弹出新的 Message。\r\n * en - Close\r\n *    -- Set onClose to handle close event.\r\n */\r\nimport React from 'react'\r\nimport { Button, Message } from 'ethan/index'\r\n\r\nexport default function() {\r\n  const close = () => {\r\n    Message.warn('Close this message will display another message.', 0, {\r\n      onClose: () => {\r\n        Message.info('You can close the message now.')\r\n      },\r\n    })\r\n  }\r\n\r\n  return <Button onClick={close}>Close callback</Button>\r\n}\r\n"},810:function(e,n,t){"use strict";t.r(n);var r=t(68),o=t.n(r),r=t(89),a=t.n(r),r=t(1),s=t.n(r),i=t(34);n.default=function(){var e=function(){var e=a()(o.a.mark(function e(){var n;return o.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,i.u.success(s.a.createElement("div",null,"I will always show until",s.a.createElement("a",{onClick:function(){return n()}}," manually closed")),0);case 2:n=e.sent;case 3:case"end":return e.stop()}},e)}));return function(){return e.apply(this,arguments)}}();return s.a.createElement(i.f,{onClick:e},"Manual Close")}},811:function(e,n){e.exports="/**\r\n * cn - 手动关闭\r\n *    -- Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage\r\n * en - Close\r\n *    -- Message return close func async\r\n */\r\nimport React from 'react'\r\nimport { Button, Message } from 'ethan/index'\r\n\r\nexport default () => {\r\n  const msg = async () => {\r\n    const close = await Message.success(\r\n      <div>\r\n        I will always show until\r\n        <a onClick={() => close()}> manually closed</a>\r\n      </div>,\r\n      0\r\n    )\r\n  }\r\n  return <Button onClick={msg}>Manual Close</Button>\r\n}\r\n"},907:function(e,n,t){"use strict";t.r(n);var r=t(8),o=t.n(r),a=t(1),s=t.n(a),i=t(215),c=t(216),l=t(35),r=t(800),a=t.n(r),r=t(801),r=t.n(r),u=Object(l.b)(a.a,r.a),f=[{name:"1-base",title:Object(l.b)("基本用法 \n Message 封装了一组全局函数，方便在任意地方调用，包括常规（不带/带icon）、Success、Warn、Error和关闭所有消息提醒。","Base \n Message has 6 static functions that are convenient to call anywhere, includes normal(with/without icon)、success、warn、error and close all messages"),component:t(802).default,rawText:t(803)},{name:"2-duration",title:Object(l.b)("显示时长 \n 通过 duration 属性可以控制消息显示的时长，默认为3秒；当设定为 0s 时，则需要用户手动关闭 Message","Duration \n Set duration property to control the duration of the message display. The default value is 3 seconds. \n When duration is set to 0, the message will not hide automatically."),component:t(804).default,rawText:t(805)},{name:"3-position",title:Object(l.b)("弹出位置 \n 设置 position 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right。","Notification \n Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right."),component:t(806).default,rawText:t(807)},{name:"4-close",title:Object(l.b)("关闭回调 \n 通过第三个参数[options]的 onClose 属性处理消息关闭回调。以下用例将在 Message 关闭后弹出新的 Message。","Close \n Set onClose to handle close event."),component:t(808).default,rawText:t(809)},{name:"5-manual-close",title:Object(l.b)("手动关闭 \n Message 会异步返回一个关闭函数，调用它来关闭当前 Messsage","Close \n Message return close func async"),component:t(810).default,rawText:t(811)}];n.default=Object(i.a)(function(e){return s.a.createElement(c.a,o()({},e,{codes:void 0,source:u,examples:f}))})}}]);