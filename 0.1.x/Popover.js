(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[25],{215:function(e,n,t){"use strict";var r=t(12),s=t.n(r),u=t(1),p=t.n(u),d=t(34),m=t(27),f=t(42),v=t(44);n.a=function(c){return function(e){var n=Object(u.useState)(""),n=s()(n,2),r=n[0],o=n[1],n=Object(u.useState)([]),a=s()(n,1)[0],t=e.location.hash,i=Object(m.useUpdate)(),n=Object(u.useCallback)(function(e){e.forEach(function(e){a.push(e)}),i()},[]),l=Object(u.useCallback)(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);Object(u.useEffect)(function(){l();function e(){var t,r=document.documentElement.scrollTop,e=a.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#".concat(e.id));n&&n.offsetTop<=r&&(t=e.id)}),o(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return p.a.createElement("div",{className:Object(f.f)("_")},p.a.createElement(c,{onHeadingSetted:n}),!e.noNav&&p.a.createElement(d.G,{className:Object(f.f)("sticky"),top:50},p.a.createElement("div",{className:Object(f.f)("nav")},a.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return p.a.createElement("a",{key:n,className:Object(f.f)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===v.a.location.search.indexOf("?example=")?v.a.push("".concat(v.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(v.a.push("".concat(v.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},216:function(e,n,t){"use strict";var r=t(8),c=t.n(r),m=t(1),f=t.n(m),r=t(12),v=t.n(r),r=t(0),o=t.n(r),r=t(25),s=t.n(r),r=t(23),u=t.n(r),r=t(217),p=t.n(r),d=t(49),h=t(14),g=t(42),b=t(35),r=t(10),a=t.n(r),r=t(218),i=t.n(r),y=(t(219),function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=Object(m.useRef)(null);return Object(m.useEffect)(function(){var e=r.current;i.a.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),f.a.createElement("pre",{ref:r,className:a()(n||"lang-jsx",Object(g.a)("pre"))},f.a.createElement("code",null,e))}),r=t(74),x=t.n(r),E=t(34),P=t(72),w=t(44),O=f.a.createElement("div",{className:Object(g.a)("placeholder")},f.a.createElement(E.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function k(e){var n=e.component,t=e.id,r=e.name,o=e.rawText,a=e.title,i=Object(m.useRef)(null),l=Object(m.useState)(!1),c=v()(l,2),s=c[0],u=c[1],e=Object(m.useState)(Object(m.createElement)(n)),l=v()(e,1)[0],c=Object(m.useState)(),n=v()(c,2),p=n[0],d=n[1],e=Object(m.useState)(),c=(v()(e,1)[0],o.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(m.useEffect)(function(){i.current&&(i.current.style.height=s?"".concat(p,"px"):"0")},[s]);n=function(e){return f.a.createElement("a",{className:Object(g.a)("toggle"),onClick:function(e){u(!s)}.bind(null,e)},f.a.createElement(P.a,{name:s?"code-close":"code"}))},e=w.a.location.search,o="?example=";if(0===e.indexOf(o)&&(e=e.replace(o,""),r.indexOf(e)<0))return null;r=a.split("\n"),e=x()(r),r=e[0],e=e.slice(1),r=r&&r.trim();return f.a.createElement(m.Fragment,null,r&&f.a.createElement("h3",{key:"0",id:t},r),f.a.createElement(E.r,{placeholder:O},f.a.createElement("div",{className:Object(g.a)("_",s&&"showcode")},f.a.createElement("div",{className:Object(g.a)("body")},l),0<a.length&&f.a.createElement("div",{className:Object(g.a)("desc")},e.map(function(e,n){return f.a.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),f.a.createElement("div",{ref:i,className:Object(g.a)("code")},f.a.createElement(y,{onHighLight:function(e){d(e)},value:c}),n(!0)))))}k.propTypes={component:o.a.func.isRequired,id:o.a.string,name:o.a.string,rawText:o.a.string,title:o.a.string.isRequired},k.defaultProps={rawText:""};r=function(e){var n=e.children,e=Object(m.useState)(!1),e=v()(e,2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return f.a.createElement("div",{onClick:function(){r(!t)},className:Object(g.e)("console")},f.a.createElement(n,null,e))};r.propTypes={children:o.a.array},r.defaultProps={children:[]};var j=r;function l(e){var e=e.children,n=u()(e[1].props.children);try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return f.a.createElement("div",{style:{overflow:"auto"}},f.a.createElement("table",{className:"doc-api-table"},e[0],f.a.cloneElement(e[1],{children:n})))}l.propTypes={children:o.a.any},l.defaultProps={};var C=l,T=/^<code name="([\w|-]+)" /,S=/^<example name="([\w|-]+)"/;function B(e){var n=e.onHeadingSetted,o=e.codes,a=e.examples,t=e.source,e=Object(m.useState)([]),r=v()(e,1)[0],e=Object(m.useState)({}),i=v()(e,1)[0];Object(m.useEffect)(function(){n&&n(r)},[]);function l(e){r.push(e)}return f.a.createElement(p.a,{className:Object(g.e)("_"),source:t,renderers:{code:y,heading:function(e){var n,t=e.level,r=e.children,o="".concat(t,"-").concat(r[0]),a="h".concat(t);return"object"===s()(r[0])?f.a.createElement(a,null,r):(i[o]||(e="heading-".concat((n=t,e=r[0],4===n?Object(h.c)():"".concat(n,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==t&&3!==t||l({id:e,level:t,children:r}),i[o]=f.a.createElement(a,{id:e},r)),i[o])},html:function(e){if("<example />"===e.value)return function(){if(i.examples)return i.examples;if(!a)return f.a.createElement("div",null);var e=Object(b.b)("示例","Example"),n="heading-example-h";return l({id:n,level:2,children:[e]}),i.examples=[f.a.createElement("h2",{key:"h",id:n},e)].concat(u()(a.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),r=e.title.split("\n"),r=v()(r,1)[0];return l({id:t,level:3,children:[r]}),f.a.createElement(k,c()({key:n,id:t},e))}}))),i.examples}();var n,t=e.value.match(S);if(t)return n=t[1],e.value.indexOf("noExpand"),r="example-".concat(n),i[r]||(t=(a||[]).find(function(e){return e.name===n}),i[r]=t?f.a.createElement(k,t):null),i[r];if("<br>"===e.value||"<br />"===e.value)return f.a.createElement("br",null);var r=e.value.match(T);return r?(e=r[1],(r=o[e])?[f.a.createElement(y,{key:"cb",value:r.text})].concat(u()(r.log.map(function(e,n){return f.a.createElement(j,{key:n},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:C,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?f.a.createElement("a",{href:e.href,target:n},e.children):f.a.createElement(d.a,{to:e.href,target:n},e.children)}}})}B.propTypes={children:o.a.oneOfType([o.a.element,o.a.array]),codes:o.a.object,examples:o.a.array,onHeadingSetted:o.a.func,source:o.a.string.isRequired},B.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var D=t(73),H=(t(215),R.propTypes={loader:o.a.func,source:o.a.string},R.defaultProps={loader:void 0,source:void 0},Object(m.memo)(R));function R(e){var n=Object(m.useState)(e.source),t=v()(n,2),n=t[0],r=t[1];return Object(m.useEffect)(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?f.a.createElement(B,c()({},e,{source:n})):f.a.createElement(D.a,{style:{minHeight:200}})}n.a=H},836:function(e,n){e.exports="# Popover *气泡*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Popover\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| background | string | '#fff' | 弹出层背景色（含箭头） |\r\n| visible | boolean | 无 | 是否显示(受控) |\r\n| onVisibleChange | (visible: boolean) => void | 无 | 显示隐藏改变时事件 | \r\n| mouseEnterDelay | number | 0 | 移入显示延迟(毫秒) | \r\n| mouseLeaveDelay | number | 0 | 移除隐藏延迟(毫秒) | \r\n| border | string | '#dee2e6' | 弹出层边框颜色（含箭头） |\r\n| className | string | 无 | 扩展className |\r\n| children | ReactNode | 必填 | 弹出显示内容 |\r\n| onClose | () => void | 无 | Popover 关闭时回调事件 |\r\n| onOpen | () => void | 无 | Popover 弹出回调事件 |\r\n| position | 'top-left' \\| 'top' \\| 'top-right' \\| 'left-top' \\| 'left' \\| 'left-bottom' \\| 'right-top' \\| 'right' \\| 'right-bottom' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | 'top' | 弹出层位置 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n| trigger | 'click' \\| 'hover' | 'hover' | 触发方式 |\r\n| type | 'success' \\| 'info' \\| 'warning' \\| 'danger' | 无 | 类型 |\r\n| content | (close: () => void) => void \\| ReactNode | | 旧接口，如果content为空，父组件作为触发元素 | \r\n| priorityDirection | string | 'vertical' | 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效, 可选值\\['vertical', 'horizontal'] |\r\n| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |\r\n| scrollDismiss | () => HTMLElement \\| boolean | false | 滚动来关闭气泡框，如果需要指定滚动元素，则通过函数返回 |\r\n| showArrow | boolean | true | 是否显示箭头 |\r\n\r\n### Popover.Confirm\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| onOk | () => void | 无 | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |\r\n| onCancel | () => void | 无 | 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |\r\n| text | object | { ok: 'Ok', cancel: 'Cancel' } | 按钮文字 |\r\n| type | string | *warning* |  icon的类型，4 选 1，\\[*success*, *info*, *warning*, *danger(error)*] |\r\n\r\n\r\n## 注意\r\n请确保 Popover 的父元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。\r\n"},837:function(e,n){e.exports="# Popover\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Popover \r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| background | string | '#fff' | Pop-up background-color(with arrows) |\r\n| visible | boolean | - | is visible (controlled) |\r\n| onVisibleChange | (visible: boolean) => void | - | the event of visible change | \r\n| mouseEnterDelay | number | 0 | the show delay of mouseenter(ms) | \r\n| mouseLeaveDelay | number | 0 | the hidden delay of mouseleave (ms) | \r\n| border | string | '#dee2e6' | The color of pop-up border(with arrows) |\r\n| className | string | - | Extend className |\r\n| children | ReactNode | required | Pop-up content. |\r\n| onClose | () => void | - | Callback event when close. |\r\n| onOpen | () => void | - | Callback event when open. |\r\n| position | 'top-left' \\| 'top' \\| 'top-right' \\| 'left-top' \\| 'left' \\| 'left-bottom' \\| 'right-top' \\| 'right' \\| 'right-bottom' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | 'top' | The position of pop-up layer |\r\n| style | object | - | The pop-up container style |\r\n| trigger | 'click' \\| 'hover' | 'hover' | type of show |\r\n| type | 'success' \\| 'info' \\| 'warning' \\| 'danger' | none | type of popover |\r\n| content | (close: () => void) => void \\| ReactNode | | Old API, out of date. | \r\n| priorityDirection | string | 'vertical' | Popup location priority, default is left and right priority, only valid when position is not set, Options: \\['vertical', 'horizontal'] |\r\n| getPopupContainer | () => HTMLElement | none | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |\r\n| scrollDismiss |  () => HTMLElement \\| boolean| false | scroll to dismiss, return el to order scroller |\r\n| showArrow | boolean | true | show arrow |\r\n\r\n### Popover.Confirm\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| onOk | () => void | none | ok button click callback, will close tooltip while returned promise resolve |\r\n| onCancel | () => void | none | cancel button click callback, will close tooltip while returned promise resolve |\r\n| text | object | { ok: 'Ok', cancel: 'Cancel' } | button text |\r\n| type | string | *warning* |  icon type \\[*success*, *info*, *warning*, *danger(error)*] |\r\n\r\n\r\n### PopoverNote\r\nPlease ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.\r\n"},838:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x,{style:{padding:"4px 8px"}},"Some text"),"Hover")}},839:function(e,n){e.exports="/**\r\n * cn - 基本用法\r\n *    -- Popover 放置在一个组件内部弹出\r\n * en - Base\r\n *    -- The basic usage.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button>\r\n      <Popover style={{ padding: '4px 8px' }}>Some text</Popover>\r\n      Hover\r\n    </Button>\r\n  )\r\n}\r\n"},840:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return p});var n=t(4),r=t.n(n),n=t(5),o=t.n(n),n=t(6),a=t.n(n),n=t(7),i=t.n(n),n=t(3),l=t.n(n),n=t(1),c=t.n(n),s=t(34);function u(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,n=l()(t);return n=r?(e=l()(this).constructor,Reflect.construct(n,arguments,e)):n.apply(this,arguments),i()(this,n)}}var p=function(e){a()(t,e);var n=u(t);function t(e){return r()(this,t),(e=n.call(this,e)).state={visible:!1},e}return o()(t,[{key:"render",value:function(){var n=this,e=this.state.visible;return c.a.createElement(s.f,null,c.a.createElement(s.x,{visible:e,onVisibleChange:function(e){return n.setState({visible:e})},style:{width:200,padding:20}},"Some text"),"Hover")}}]),t}(c.a.Component)},841:function(e,n){e.exports="/**\r\n * cn - 受控\r\n *    -- 可以通过 visible 去控制\r\n * en -  controll\r\n *    -- Use cisible to controll the show/hidden\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default class extends React.Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = {\r\n      visible: false,\r\n    }\r\n  }\r\n\r\n  render() {\r\n    const { visible } = this.state\r\n    return (\r\n      <Button>\r\n        <Popover\r\n          visible={visible}\r\n          onVisibleChange={v => this.setState({ visible: v })}\r\n          style={{ width: 200, padding: 20 }}\r\n        >\r\n          Some text\r\n        </Popover>\r\n        Hover\r\n      </Button>\r\n    )\r\n  }\r\n}\r\n"},842:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement("div",{id:"popup-target",style:{height:200,overflowY:"auto",position:"relative"}},o.a.createElement(a.f,{style:{margin:"100px 0"}},"Scrollable",o.a.createElement(a.x,{trigger:"click",style:{padding:"8px 16px"},getPopupContainer:function(){return document.querySelector("#popup-target")}},"render in parent element")))}},843:function(e,n){e.exports="/**\r\n * cn - 自定义容器\r\n *    -- 使用 getPopupContainer 指定渲染的目标容器\r\n * en - Custom container\r\n *    -- use getPopupContainer return target container\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <div id=\"popup-target\" style={{ height: 200, overflowY: 'auto', position: 'relative' }}>\r\n      <Button style={{ margin: '100px 0' }}>\r\n        Scrollable\r\n        <Popover\r\n          trigger=\"click\"\r\n          style={{ padding: '8px 16px' }}\r\n          getPopupContainer={() => document.querySelector('#popup-target')}\r\n        >\r\n          render in parent element\r\n        </Popover>\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n"},844:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement("div",{style:{display:"inline-block"}},o.a.createElement(a.x,{style:{padding:"8px 16px"}},"Disabled parent"),o.a.createElement(a.f,{disabled:!0},"Disabled"))}},845:function(e,n){e.exports="/**\r\n * cn - 禁用元素\r\n *    -- 当父元素被禁用，可以将 Popver 和禁用元素置于同一层级，并用元素将他们包裹\r\n * en - Disabled\r\n *    -- When the parent element is disabled, you can place the Popver and the disabled element in the same hierarchy and wrap them with the element\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <div style={{ display: 'inline-block' }}>\r\n      <Popover style={{ padding: '8px 16px' }}>Disabled parent</Popover>\r\n      <Button disabled>Disabled</Button>\r\n    </div>\r\n  )\r\n}\r\n"},846:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x,{mouseEnterDelay:1e3,mouseLeaveDelay:1e3,style:{width:200,padding:20}},"Some text"),"Hover")}},847:function(e,n){e.exports="/**\r\n * cn - 延迟\r\n *    -- 可以设置展示延时和关闭延时\r\n * en - delay\r\n *    -- the hidden/show delay\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button>\r\n      <Popover mouseEnterDelay={1000} mouseLeaveDelay={1000} style={{ width: 200, padding: 20 }}>\r\n        Some text\r\n      </Popover>\r\n      Hover\r\n    </Button>\r\n  )\r\n}\r\n"},848:function(e,n,t){"use strict";t.r(n);var r=t(9),o=t.n(r),r=t(1),a=t.n(r),i=t(34);function l(n,e){var t,r=Object.keys(n);return Object.getOwnPropertySymbols&&(t=Object.getOwnPropertySymbols(n),e&&(t=t.filter(function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable})),r.push.apply(r,t)),r}function c(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?l(Object(t),!0).forEach(function(e){o()(n,e,t[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):l(Object(t)).forEach(function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))})}return n}var s=[[null,"bottom-left","bottom","bottom-right",null],["right-top",null,null,null,"left-top"],["right",null,null,null,"left"],["right-bottom",null,null,null,"left-bottom"],[null,"top-left","top","top-right",null]],u={width:100,textAlign:"center",lineHeight:"30px",margin:4,display:"inline-block",border:"solid 1px #eee",cursor:"pointer"};n.default=function(){return s.map(function(e,n){return a.a.createElement("div",{key:n},e.map(function(e,n){return e?a.a.createElement("div",{key:n,style:u},a.a.createElement(i.x,{trigger:"click",position:e},a.a.createElement("div",{style:{width:240,padding:30}},"Some text")),e):a.a.createElement("div",{key:n,style:c(c({},u),{},{border:0})})}))})}},849:function(e,n){e.exports="/**\r\n * cn - 弹出位置\r\n *    -- 内置了十二个弹出的位置\r\n * en - Position\r\n *    -- Twelve pop-up positions are built in.\r\n */\r\nimport React from 'react'\r\nimport { Popover } from 'ethan/index'\r\n\r\nconst positions = [\r\n  [null, 'bottom-left', 'bottom', 'bottom-right', null],\r\n  ['right-top', null, null, null, 'left-top'],\r\n  ['right', null, null, null, 'left'],\r\n  ['right-bottom', null, null, null, 'left-bottom'],\r\n  [null, 'top-left', 'top', 'top-right', null],\r\n]\r\n\r\nconst style = {\r\n  width: 100,\r\n  textAlign: 'center',\r\n  lineHeight: '30px',\r\n  margin: 4,\r\n  display: 'inline-block',\r\n  border: 'solid 1px #eee',\r\n  cursor: 'pointer',\r\n}\r\n\r\nexport default function() {\r\n  return positions.map((row, i) => (\r\n    <div key={i}>\r\n      {row.map((p, j) =>\r\n        p ? (\r\n          <div key={j} style={style}>\r\n            <Popover trigger=\"click\" position={p}>\r\n              <div style={{ width: 240, padding: 30 }}>Some text</div>\r\n            </Popover>\r\n            {p}\r\n          </div>\r\n        ) : (\r\n          <div key={j} style={{ ...style, border: 0 }} />\r\n        )\r\n      )}\r\n    </div>\r\n  ))\r\n}\r\n"},850:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x,{style:{marginRight:12},trigger:"click"},o.a.createElement(a.g,{style:{width:300,border:0,background:"transparent"}},o.a.createElement(a.g.Header,null,"Header"),o.a.createElement(a.g.Body,{style:{height:80}},"Body"))),"Click me")}},851:function(e,n){e.exports="/**\r\n * cn - 点击触发\r\n *    -- 默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发\r\n * en - Trigger\r\n *    -- Set the trigger property to change the trigger event to 'click'.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover, Card } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button>\r\n      <Popover style={{ marginRight: 12 }} trigger=\"click\">\r\n        <Card style={{ width: 300, border: 0, background: 'transparent' }}>\r\n          <Card.Header>Header</Card.Header>\r\n          <Card.Body style={{ height: 80 }}>Body</Card.Body>\r\n        </Card>\r\n      </Popover>\r\n      Click me\r\n    </Button>\r\n  )\r\n}\r\n"},852:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x.Confirm,{onCancel:function(){console.log("cancel")},onOk:function(){return new Promise(function(e){console.log("ok"),setTimeout(function(){return e(!0)},2e3)})},text:{ok:"Yes",cancel:"No"}},"Are you sure delete ?"),"Delete")}},853:function(e,n){e.exports="/**\r\n * cn - 确认\r\n *    -- Popover.Confirm 提供弹出气泡式的确认框\r\n * en - Confirm\r\n *    -- Popover.Confirm provide popover confirm.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button>\r\n      <Popover.Confirm\r\n        onCancel={() => {\r\n          console.log('cancel')\r\n        }}\r\n        onOk={() =>\r\n          new Promise(resolve => {\r\n            console.log('ok')\r\n            setTimeout(() => resolve(true), 2000)\r\n          })\r\n        }\r\n        text={{ ok: 'Yes', cancel: 'No' }}\r\n      >\r\n        Are you sure delete ?\r\n      </Popover.Confirm>\r\n      Delete\r\n    </Button>\r\n  )\r\n}\r\n"},854:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x,{trigger:"click"},function(e){return o.a.createElement("div",{style:{padding:20}},o.a.createElement("div",null,"Are you sure you want to close this panel?"),o.a.createElement("div",{style:{marginTop:30,textAlign:"right"}},o.a.createElement(a.f,{size:"small",onClick:function(){e(),a.u.success("Popover panel closed.")}},"close")))}),"Click me")}},855:function(e,n){e.exports="/**\r\n * cn - 关闭事件\r\n *    -- content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件\r\n * en - Close\r\n *    -- Set the content property to a function, you can handle the close event inside the popup panel.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover, Message } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button>\r\n      <Popover trigger=\"click\">\r\n        {close => (\r\n          <div style={{ padding: 20 }}>\r\n            <div>Are you sure you want to close this panel?</div>\r\n            <div style={{ marginTop: 30, textAlign: 'right' }}>\r\n              <Button\r\n                size=\"small\"\r\n                onClick={() => {\r\n                  close()\r\n                  Message.success('Popover panel closed.')\r\n                }}\r\n              >\r\n                close\r\n              </Button>\r\n            </div>\r\n          </div>\r\n        )}\r\n      </Popover>\r\n      Click me\r\n    </Button>\r\n  )\r\n}\r\n"},856:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34),i=["success","info","warning","danger"],l={width:100,textAlign:"center",lineHeight:"30px",margin:4,display:"inline-block",border:"solid 1px #eee"};n.default=function(){return i.map(function(e,n){return o.a.createElement("div",{style:l,key:n},o.a.createElement(a.x,{type:e,style:{width:200,padding:20}},"Some text"),e)})}},857:function(e,n){e.exports="/**\r\n * cn - 样式\r\n *    -- 内置四种样式\r\n * en - Type\r\n *    -- Four styles are built in.\r\n */\r\nimport React from 'react'\r\nimport { Popover } from 'ethan/index'\r\n\r\nconst types = ['success', 'info', 'warning', 'danger']\r\n\r\nconst style = {\r\n  width: 100,\r\n  textAlign: 'center',\r\n  lineHeight: '30px',\r\n  margin: 4,\r\n  display: 'inline-block',\r\n  border: 'solid 1px #eee',\r\n}\r\n\r\nexport default function() {\r\n  return types.map((t, i) => (\r\n    <div style={style} key={i}>\r\n      <Popover type={t} style={{ width: 200, padding: 20 }}>\r\n        Some text\r\n      </Popover>\r\n      {t}\r\n    </div>\r\n  ))\r\n}\r\n"},858:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x,{background:"#555",border:"gold",style:{width:200,padding:20,color:"gold"}},"Some text"),"Hover")}},859:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- 如果内置样式不满足需求，可以通过 background 和 border 自定义样式\r\n * en -\r\n *    -- Customize the style with background and border.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button>\r\n      <Popover background=\"#555\" border=\"gold\" style={{ width: 200, padding: 20, color: 'gold' }}>\r\n        Some text\r\n      </Popover>\r\n      Hover\r\n    </Button>\r\n  )\r\n}\r\n"},860:function(e,n,t){"use strict";t.r(n);var r=t(1),o=t.n(r),a=t(34);n.default=function(){return o.a.createElement(a.f,null,o.a.createElement(a.x,{onOpen:function(){return console.log("popover open")},onClose:function(){return console.log("popover close")},trigger:"click",style:{width:200,padding:20}},"Some text"),"Click me.")}},861:function(e,n){e.exports="/**\r\n * cn - 事件\r\n *    -- 提供了onOpen 和 onClose 事件\r\n * en - Events\r\n *    -- provider onOpen and onClose event\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan/index'\r\n\r\nexport default function() {\r\n  const open = () => console.log('popover open')\r\n  const close = () => console.log('popover close')\r\n  return (\r\n    <Button>\r\n      <Popover onOpen={open} onClose={close} trigger=\"click\" style={{ width: 200, padding: 20 }}>\r\n        Some text\r\n      </Popover>\r\n      Click me.\r\n    </Button>\r\n  )\r\n}\r\n"},909:function(e,n,t){"use strict";t.r(n);var r=t(8),o=t.n(r),a=t(1),i=t.n(a),l=t(215),c=t(216),s=t(35),r=t(836),a=t.n(r),r=t(837),r=t.n(r),u=Object(s.b)(a.a,r.a),p=[{name:"1-base",title:Object(s.b)("基本用法 \n Popover 放置在一个组件内部弹出","Base \n The basic usage."),component:t(838).default,rawText:t(839)},{name:"1-controll",title:Object(s.b)("受控 \n 可以通过 visible 去控制","controll \n Use cisible to controll the show/hidden"),component:t(840).default,rawText:t(841)},{name:"10-container",title:Object(s.b)("自定义容器 \n 使用 getPopupContainer 指定渲染的目标容器","Custom container \n use getPopupContainer return target container"),component:t(842).default,rawText:t(843)},{name:"11-disabled",title:Object(s.b)("禁用元素 \n 当父元素被禁用，可以将 Popver 和禁用元素置于同一层级，并用元素将他们包裹","Disabled \n When the parent element is disabled, you can place the Popver and the disabled element in the same hierarchy and wrap them with the element"),component:t(844).default,rawText:t(845)},{name:"2-delay",title:Object(s.b)("延迟 \n 可以设置展示延时和关闭延时","delay \n the hidden/show delay"),component:t(846).default,rawText:t(847)},{name:"2-position",title:Object(s.b)("弹出位置 \n 内置了十二个弹出的位置","Position \n Twelve pop-up positions are built in."),component:t(848).default,rawText:t(849)},{name:"3-click",title:Object(s.b)("点击触发 \n 默认是移入组件触发，设置 trigger 为 'click'，可以改为点击触发","Trigger \n Set the trigger property to change the trigger event to 'click'."),component:t(850).default,rawText:t(851)},{name:"4-confirm",title:Object(s.b)("确认 \n Popover.Confirm 提供弹出气泡式的确认框","Confirm \n Popover.Confirm provide popover confirm."),component:t(852).default,rawText:t(853)},{name:"5-func",title:Object(s.b)("关闭事件 \n content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件","Close \n Set the content property to a function, you can handle the close event inside the popup panel."),component:t(854).default,rawText:t(855)},{name:"6-type",title:Object(s.b)("样式 \n 内置四种样式","Type \n Four styles are built in."),component:t(856).default,rawText:t(857)},{name:"7-type",title:Object(s.b)(" \n 如果内置样式不满足需求，可以通过 background 和 border 自定义样式"," \n Customize the style with background and border."),component:t(858).default,rawText:t(859)},{name:"9-event",title:Object(s.b)("事件 \n 提供了onOpen 和 onClose 事件","Events \n provider onOpen and onClose event"),component:t(860).default,rawText:t(861)}];n.default=Object(l.a)(function(e){return i.a.createElement(c.a,o()({},e,{codes:void 0,source:u,examples:p}))})}}]);