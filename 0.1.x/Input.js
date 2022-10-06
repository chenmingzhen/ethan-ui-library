(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[19],{215:function(e,n,t){"use strict";var r=t(12),u=t.n(r),s=t(1),p=t.n(s),d=t(34),m=t(27),f=t(42),h=t(44);n.a=function(c){return function(e){var n=Object(s.useState)(""),n=u()(n,2),r=n[0],a=n[1],n=Object(s.useState)([]),l=u()(n,1)[0],t=e.location.hash,o=Object(m.useUpdate)(),n=Object(s.useCallback)(function(e){e.forEach(function(e){l.push(e)}),o()},[]),i=Object(s.useCallback)(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);Object(s.useEffect)(function(){i();function e(){var t,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#".concat(e.id));n&&n.offsetTop<=r&&(t=e.id)}),a(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return p.a.createElement("div",{className:Object(f.f)("_")},p.a.createElement(c,{onHeadingSetted:n}),!e.noNav&&p.a.createElement(d.G,{className:Object(f.f)("sticky"),top:50},p.a.createElement("div",{className:Object(f.f)("nav")},l.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return p.a.createElement("a",{key:n,className:Object(f.f)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===h.a.location.search.indexOf("?example=")?h.a.push("".concat(h.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(h.a.push("".concat(h.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},216:function(e,n,t){"use strict";var r=t(8),c=t.n(r),m=t(1),f=t.n(m),r=t(12),h=t.n(r),r=t(0),a=t.n(r),r=t(25),u=t.n(r),r=t(23),s=t.n(r),r=t(217),p=t.n(r),d=t(49),b=t(14),y=t(42),v=t(35),r=t(10),l=t.n(r),r=t(218),o=t.n(r),g=(t(219),function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=Object(m.useRef)(null);return Object(m.useEffect)(function(){var e=r.current;o.a.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),f.a.createElement("pre",{ref:r,className:l()(n||"lang-jsx",Object(y.a)("pre"))},f.a.createElement("code",null,e))}),r=t(74),E=t.n(r),x=t(34),w=t(72),I=t(44),j=f.a.createElement("div",{className:Object(y.a)("placeholder")},f.a.createElement(x.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function O(e){var n=e.component,t=e.id,r=e.name,a=e.rawText,l=e.title,o=Object(m.useRef)(null),i=Object(m.useState)(!1),c=h()(i,2),u=c[0],s=c[1],e=Object(m.useState)(Object(m.createElement)(n)),i=h()(e,1)[0],c=Object(m.useState)(),n=h()(c,2),p=n[0],d=n[1],e=Object(m.useState)(),c=(h()(e,1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(m.useEffect)(function(){o.current&&(o.current.style.height=u?"".concat(p,"px"):"0")},[u]);n=function(e){return f.a.createElement("a",{className:Object(y.a)("toggle"),onClick:function(e){s(!u)}.bind(null,e)},f.a.createElement(w.a,{name:u?"code-close":"code"}))},e=I.a.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=l.split("\n"),e=E()(r),r=e[0],e=e.slice(1),r=r&&r.trim();return f.a.createElement(m.Fragment,null,r&&f.a.createElement("h3",{key:"0",id:t},r),f.a.createElement(x.r,{placeholder:j},f.a.createElement("div",{className:Object(y.a)("_",u&&"showcode")},f.a.createElement("div",{className:Object(y.a)("body")},i),0<l.length&&f.a.createElement("div",{className:Object(y.a)("desc")},e.map(function(e,n){return f.a.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),f.a.createElement("div",{ref:o,className:Object(y.a)("code")},f.a.createElement(g,{onHighLight:function(e){d(e)},value:c}),n(!0)))))}O.propTypes={component:a.a.func.isRequired,id:a.a.string,name:a.a.string,rawText:a.a.string,title:a.a.string.isRequired},O.defaultProps={rawText:""};r=function(e){var n=e.children,e=Object(m.useState)(!1),e=h()(e,2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return f.a.createElement("div",{onClick:function(){r(!t)},className:Object(y.e)("console")},f.a.createElement(n,null,e))};r.propTypes={children:a.a.array},r.defaultProps={children:[]};var q=r;function i(e){var e=e.children,n=s()(e[1].props.children);try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return f.a.createElement("div",{style:{overflow:"auto"}},f.a.createElement("table",{className:"doc-api-table"},e[0],f.a.cloneElement(e[1],{children:n})))}i.propTypes={children:a.a.any},i.defaultProps={};var T=i,k=/^<code name="([\w|-]+)" /,G=/^<example name="([\w|-]+)"/;function N(e){var n=e.onHeadingSetted,a=e.codes,l=e.examples,t=e.source,e=Object(m.useState)([]),r=h()(e,1)[0],e=Object(m.useState)({}),o=h()(e,1)[0];Object(m.useEffect)(function(){n&&n(r)},[]);function i(e){r.push(e)}return f.a.createElement(p.a,{className:Object(y.e)("_"),source:t,renderers:{code:g,heading:function(e){var n,t=e.level,r=e.children,a="".concat(t,"-").concat(r[0]),l="h".concat(t);return"object"===u()(r[0])?f.a.createElement(l,null,r):(o[a]||(e="heading-".concat((n=t,e=r[0],4===n?Object(b.c)():"".concat(n,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==t&&3!==t||i({id:e,level:t,children:r}),o[a]=f.a.createElement(l,{id:e},r)),o[a])},html:function(e){if("<example />"===e.value)return function(){if(o.examples)return o.examples;if(!l)return f.a.createElement("div",null);var e=Object(v.b)("示例","Example"),n="heading-example-h";return i({id:n,level:2,children:[e]}),o.examples=[f.a.createElement("h2",{key:"h",id:n},e)].concat(s()(l.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),r=e.title.split("\n"),r=h()(r,1)[0];return i({id:t,level:3,children:[r]}),f.a.createElement(O,c()({key:n,id:t},e))}}))),o.examples}();var n,t=e.value.match(G);if(t)return n=t[1],e.value.indexOf("noExpand"),r="example-".concat(n),o[r]||(t=(l||[]).find(function(e){return e.name===n}),o[r]=t?f.a.createElement(O,t):null),o[r];if("<br>"===e.value||"<br />"===e.value)return f.a.createElement("br",null);var r=e.value.match(k);return r?(e=r[1],(r=a[e])?[f.a.createElement(g,{key:"cb",value:r.text})].concat(s()(r.log.map(function(e,n){return f.a.createElement(q,{key:n},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:T,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?f.a.createElement("a",{href:e.href,target:n},e.children):f.a.createElement(d.a,{to:e.href,target:n},e.children)}}})}N.propTypes={children:a.a.oneOfType([a.a.element,a.a.array]),codes:a.a.object,examples:a.a.array,onHeadingSetted:a.a.func,source:a.a.string.isRequired},N.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var P=t(73),S=(t(215),R.propTypes={loader:a.a.func,source:a.a.string},R.defaultProps={loader:void 0,source:void 0},Object(m.memo)(R));function R(e){var n=Object(m.useState)(e.source),t=h()(n,2),n=t[0],r=t[1];return Object(m.useEffect)(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?f.a.createElement(N,c()({},e,{source:n})):f.a.createElement(P.a,{style:{minHeight:200}})}n.a=S},496:function(e,n){e.exports="# Input *输入框*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | string \\| number | 无 | 默认值 |\r\n| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒。|\r\n| name | string | 无 | Form 存取数据的名称 |\r\n| onChange | (value: string) => void | 无 | 值改变回调函数 |\r\n| onEnterPress | (value: string) => void | 无| 回车键回调函数 |\r\n| placeholder | string | 无 | 同原生 input 标签的 placeholder |\r\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | 无| 信息弹出位置 |\r\n| size | 'large' \\| 'default' \\| 'small' | 'default' | 尺寸 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n| tip | ReactNode | 无 | 提示信息 |\r\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |\r\n| type | string | 'text' | 同原生 input 标签的 type |\r\n| value | string \\| number | 无 | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |\r\n| clearable | () => void \\| boolean | 无 | 可点击清空图标删除输入框内容，为函数式表示清空回调 |\r\n| coin | boolean | false | 以千位分隔符展示,仅当type为number时有效 |\r\n| info | (value: string) => string \\| number | 无 | 提示信息 |\r\n| popoverProps | object | 无 | 校验弹框接受的属性，具体属性参考Popover组件说明 |\r\n| maxLength | number | 无 | 可输入最大长度 |\r\n\r\n### Input.Number\r\n\r\n基本 API 和上表相同，特定的 API 如下：\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| max | number | 无 | 最大值 |\r\n| min | number | 无 | 最小值 |\r\n| step | number | 1 | 改变数字跨度，可为小数 |\r\n| digits | number | 无 | 数值的精度 |\r\n| allowNull | boolean | false | 允许空值 |\r\n| hideArrow | boolean | false | 是否展示增减按钮 |\r\n| coin | boolean | false | 以千位分隔符展示 | \r\n\r\n"},497:function(e,n){e.exports="# Input\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Input\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| defaultValue | string \\| number | - | Default value |\r\n| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms.|\r\n| name | string | none | The name of Form which access data |\r\n| onChange | (value: string) => void | - | The callback function when the value is changing |\r\n| onEnterPress | (value: string) => void | - | The callback function for enter key |\r\n| placeholder | string | - | Same as the native input tag |\r\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | none | The position where the text pop up |\r\n| size | 'large' \\| 'default' \\| 'small' | 'default' | size of input |\r\n| style | object | - | Container element style |\r\n| tip | ReactNode | none | Prompt information |\r\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |\r\n| type | string | 'text' | Same as the type of the native input tag |\r\n| value | string \\| number | - | The defaultValue and value can be set at the same time and defaultValue will be overridden by value<br />In the Form, the value will be taken over by the form and the value will lose efficacy. |\r\n| clearable | () => void \\| boolean | false | Remove content of the input when clicking the clear icon, clear event function |\r\n| coin | boolean | false | Show as thousands separator, valid only when type is 'number' |\r\n| info | (value: string) => string \\| number | - | Infomation |\r\n| popoverProps | object | none | Vilidate popup properties, specific properties refer to Popover component description |\r\n| maxLength | number | none | input max length |\r\n\r\n### Input.Number\r\n\r\nThe basic API is the same as the above table, and the specific API is as follows:\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| max | number | - | The maximum value |\r\n| min | number | - | The minimum value|\r\n| step | number | 1 | Change the digital span. It can be decimal. |\r\n| digits | number | - | the digits of number |\r\n| allowNull | boolean | false | allow value is null |\r\n| hideArrow | boolean | false | Whether to show increase/decrease buttons |\r\n| coin | boolean | false | Show as thousands separator |\r\n"},498:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34);n.default=function(){return a.a.createElement(l.q,{placeholder:"input something"})}},499:function(e,n){e.exports="/**\r\n * cn - 基本用法\r\n *    -- Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block\r\n *    -- 如果设置了 style.width，默认 display 为 inline-flex\r\n * en - Base\r\n *    -- Input usually needs to be used with other components, so the default width is 100% and the default display is block.\r\n *    -- If the style.width is set, the default display is inline-flex.\r\n */\r\nimport React from 'react'\r\nimport { Input } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Input placeholder=\"input something\" />\r\n}\r\n"},500:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34);n.default=function(){return a.a.createElement(l.q,{clearable:!0,placeholder:"input something"})}},501:function(e,n){e.exports="/**\r\n * cn - 允许删除\r\n *    -- Input 允许删除\r\n * en -  allow clear\r\n *    -- Input allow clear\r\n */\r\nimport React from 'react'\r\nimport { Input } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Input clearable placeholder=\"input something\" />\r\n}\r\n"},502:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34),o={width:120,marginRight:12};n.default=function(){return a.a.createElement("div",null,a.a.createElement(l.q,{size:"small",style:o,placeholder:"small size"}),a.a.createElement(l.q,{style:o,placeholder:"default size"}),a.a.createElement(l.q,{size:"large",style:o,placeholder:"large size"}))}},503:function(e,n){e.exports='/**\r\n * cn - 大小\r\n *    -- 提供了三种尺寸的输入框，small、default、large\r\n * en - Size\r\n *    -- There are three size of input, small, default, large.\r\n */\r\nimport React from \'react\'\r\nimport { Input } from \'ethan/index\'\r\n\r\nconst style = { width: 120, marginRight: 12 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Input size="small" style={style} placeholder="small size" />\r\n      <Input style={style} placeholder="default size" />\r\n      <Input size="large" style={style} placeholder="large size" />\r\n    </div>\r\n  )\r\n}\r\n'},504:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34),o={marginBottom:12};n.default=function(){return a.a.createElement("div",{style:{width:300}},a.a.createElement(l.q,{style:o,type:"number",placeholder:"digits undefined"}),a.a.createElement(l.q,{style:o,digits:0,type:"number",placeholder:"digits 0"}),a.a.createElement(l.q,{style:o,digits:1,type:"number",placeholder:"digits 1"}),a.a.createElement(l.q,{style:o,digits:2,type:"number",placeholder:"digits 2"}),a.a.createElement(l.q,{style:o,digits:3,type:"number",placeholder:"digits 3"}))}},505:function(e,n){e.exports='/**\r\n * cn - 数字\r\n *    -- type 为 number 时，输入时会做一次校验，禁止输入非数字类型字符，并且根据 digits 属性限制小数位数\r\n * en - Number\r\n *    -- When type is number, it is forbidden to input non-numeric characters, and the number of decimal places is limited according to the digits property\r\n */\r\nimport React from \'react\'\r\nimport { Input } from \'ethan/index\'\r\n\r\nconst style = { marginBottom: 12 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div style={{ width: 300 }}>\r\n      <Input style={style} type="number" placeholder="digits undefined" />\r\n      <Input style={style} digits={0} type="number" placeholder="digits 0" />\r\n      <Input style={style} digits={1} type="number" placeholder="digits 1" />\r\n      <Input style={style} digits={2} type="number" placeholder="digits 2" />\r\n      <Input style={style} digits={3} type="number" placeholder="digits 3" />\r\n    </div>\r\n  )\r\n}\r\n'},506:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34);n.default=function(){return a.a.createElement(l.q.Number,{width:120,min:23,max:100,digits:0})}},507:function(e,n){e.exports="/**\r\n * cn -\r\n *  . -- Input.Number 组件，可以通过鼠标和上下键辅助输入\r\n * en -\r\n *  . -- Input.Number component can be assisted by mouse and up and down keyboard.\r\n */\r\nimport React from 'react'\r\nimport { Input } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Input.Number width={120} min={23} max={100} digits={0} />\r\n}\r\n"},508:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34),o={width:300,marginBottom:12};n.default=function(){return a.a.createElement("div",null,a.a.createElement(l.q.Group,{style:o},a.a.createElement(l.m,{name:"user"}),a.a.createElement(l.q,{placeholder:"first name"}),"-",a.a.createElement(l.q,{placeholder:"last name"})),a.a.createElement(l.q.Group,{style:o},a.a.createElement(l.q,{placeholder:"search text"}),a.a.createElement(l.f,{text:!0},a.a.createElement(l.m,{name:"search"}))),a.a.createElement(l.q.Group,{style:o},a.a.createElement(l.q,{style:{flex:1},placeholder:"flex 1"}),a.a.createElement(l.q,{style:{flex:3},placeholder:"flex 3"})),a.a.createElement(l.q.Group,{style:o},a.a.createElement(l.q,{placeholder:"search text"}),a.a.createElement(l.f,{type:"primary"},"Search")),a.a.createElement(l.q.Group,{size:"small",style:o},a.a.createElement("b",null,a.a.createElement(l.m,{name:"envelope"})),a.a.createElement(l.q,{placeholder:"email"}),a.a.createElement("b",null,".com")))}},509:function(e,n){e.exports='/**\r\n * cn - 组合\r\n *  . -- Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。\r\n * en - Group\r\n *  . -- The Icon, span, string and Button types can be placed directly into the Input.Group. Use b tag can change the background color.\r\n */\r\nimport React from \'react\'\r\nimport { Input, Button, FontAwesome } from \'ethan/index\'\r\n\r\nconst style = { width: 300, marginBottom: 12 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Input.Group style={style}>\r\n        <FontAwesome name="user" />\r\n        <Input placeholder="first name" />\r\n        -\r\n        <Input placeholder="last name" />\r\n      </Input.Group>\r\n\r\n      <Input.Group style={style}>\r\n        <Input placeholder="search text" />\r\n        <Button text>\r\n          <FontAwesome name="search" />\r\n        </Button>\r\n      </Input.Group>\r\n\r\n      <Input.Group style={style}>\r\n        <Input style={{ flex: 1 }} placeholder="flex 1" />\r\n        <Input style={{ flex: 3 }} placeholder="flex 3" />\r\n      </Input.Group>\r\n\r\n      <Input.Group style={style}>\r\n        <Input placeholder="search text" />\r\n        <Button type="primary">Search</Button>\r\n      </Input.Group>\r\n\r\n      <Input.Group size="small" style={style}>\r\n        <b>\r\n          <FontAwesome name="envelope" />\r\n        </b>\r\n        <Input placeholder="email" />\r\n        <b>.com</b>\r\n      </Input.Group>\r\n    </div>\r\n  )\r\n}\r\n'},510:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34),o={marginBottom:12};n.default=function(){return a.a.createElement("div",{style:{width:300}},a.a.createElement(l.q,{style:o,placeholder:"email",tip:"enter you email.",popover:"top-left"}),a.a.createElement(l.q.Group,{style:o,tip:"enter you email."},a.a.createElement(l.m,{name:"envelope"}),a.a.createElement(l.q,{placeholder:"email"})),a.a.createElement(l.q.Group,{style:o},a.a.createElement(l.m,{name:"envelope"}),a.a.createElement(l.q,{tip:"enter you email.",placeholder:"email"})))}},511:function(e,n){e.exports='/**\r\n * cn - 提示文字\r\n *    -- 在 input 上设置的 tip 在 focus 时弹出\r\n * en - Tip\r\n *    -- The tip set on input pops up when it is focused.\r\n */\r\nimport React from \'react\'\r\nimport { Input, FontAwesome } from \'ethan/index\'\r\n\r\nconst style = { marginBottom: 12 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div style={{ width: 300 }}>\r\n      <Input style={style} placeholder="email" tip="enter you email." popover="top-left" />\r\n\r\n      <Input.Group style={style} tip="enter you email.">\r\n        <FontAwesome name="envelope" />\r\n        <Input placeholder="email" />\r\n      </Input.Group>\r\n\r\n      <Input.Group style={style}>\r\n        <FontAwesome name="envelope" />\r\n        <Input tip="enter you email." placeholder="email" />\r\n      </Input.Group>\r\n    </div>\r\n  )\r\n}\r\n'},512:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34),o=new l.B;n.default=function(){return a.a.createElement(l.q,{placeholder:"email",rules:[o.required],tip:"Email, required",popover:"top-left",width:300})}},513:function(e,n){e.exports='/**\r\n * cn - 校验\r\n *    -- 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出\r\n *    -- 如果没有设置 popover，不会弹出错误提示。\r\n *    -- 有错误时，提示框不会隐藏。\r\n * en - Validate\r\n *    -- When the rules property is set, it will automatically verify the input data. When the popover property is set, it will pop up at the specified location.\r\n *    -- If the popover property is not set, no error message will pop up.\r\n *    -- If input is invalid, the message will not be hidden.\r\n */\r\nimport React from \'react\'\r\nimport { Input, Rule } from \'ethan/index\'\r\n\r\nconst rules = new Rule()\r\n\r\nexport default function() {\r\n  return <Input placeholder="email" rules={[rules.required]} tip="Email, required" popover="top-left" width={300} />\r\n}\r\n'},514:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34),o={width:300,marginBottom:12};n.default=function(){return a.a.createElement("div",null,a.a.createElement(l.q.Group,{disabled:!0,style:o},a.a.createElement(l.q,{placeholder:"first name"}),"-",a.a.createElement(l.q,{placeholder:"last name"})),a.a.createElement(l.q,{disabled:!0,style:o,placeholder:"disabled input"}))}},515:function(e,n){e.exports='/**\r\n * cn - 禁用\r\n *    -- 设置 disabled 属性禁用组件\r\n * en - Disabled\r\n *    -- Set the disabled property to disable the component.\r\n */\r\nimport React from \'react\'\r\nimport { Input } from \'ethan/index\'\r\n\r\nconst style = { width: 300, marginBottom: 12 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Input.Group disabled style={style}>\r\n        <Input placeholder="first name" />\r\n        -\r\n        <Input placeholder="last name" />\r\n      </Input.Group>\r\n\r\n      <Input disabled style={style} placeholder="disabled input" />\r\n    </div>\r\n  )\r\n}\r\n'},516:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),l=t(34);n.default=function(){return a.a.createElement(l.q.Password,{placeholder:"input password"})}},517:function(e,n){e.exports="/**\r\n * cn - 密码\r\n *    -- Input.Password 模拟密码输入框，用来阻止 Chrome 提示记住密码。\r\n * en - Password\r\n *    -- Input.Password is a mock input of type 'password', used for disable Chrome autofill.\r\n */\r\nimport React from 'react'\r\nimport { Input } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Input.Password placeholder=\"input password\" />\r\n}\r\n"},890:function(e,n,t){"use strict";t.r(n);var r=t(8),a=t.n(r),l=t(1),o=t.n(l),i=t(215),c=t(216),u=t(35),r=t(496),l=t.n(r),r=t(497),r=t.n(r),s=Object(u.b)(l.a,r.a),p=[{name:"1-base",title:Object(u.b)("基本用法 \n Input 通常需要和其他的组件配合使用，所以默认的宽度是 100%，默认 display 为 block \n 如果设置了 style.width，默认 display 为 inline-flex","Base \n Input usually needs to be used with other components, so the default width is 100% and the default display is block. \n If the style.width is set, the default display is inline-flex."),component:t(498).default,rawText:t(499)},{name:"1-clearable",title:Object(u.b)("允许删除 \n Input 允许删除","allow clear \n Input allow clear"),component:t(500).default,rawText:t(501)},{name:"2-size",title:Object(u.b)("大小 \n 提供了三种尺寸的输入框，small、default、large","Size \n There are three size of input, small, default, large."),component:t(502).default,rawText:t(503)},{name:"3-number",title:Object(u.b)("数字 \n type 为 number 时，输入时会做一次校验，禁止输入非数字类型字符，并且根据 digits 属性限制小数位数","Number \n When type is number, it is forbidden to input non-numeric characters, and the number of decimal places is limited according to the digits property"),component:t(504).default,rawText:t(505)},{name:"4-number",title:Object(u.b)(" \n Input.Number 组件，可以通过鼠标和上下键辅助输入"," \n Input.Number component can be assisted by mouse and up and down keyboard."),component:t(506).default,rawText:t(507)},{name:"5-group",title:Object(u.b)("组合 \n Icon, span, string, Button 类型可以直接放入 Input.Group 中。需要背景色可以放在 b 标签中。","Group \n The Icon, span, string and Button types can be placed directly into the Input.Group. Use b tag can change the background color."),component:t(508).default,rawText:t(509)},{name:"6-tip",title:Object(u.b)("提示文字 \n 在 input 上设置的 tip 在 focus 时弹出","Tip \n The tip set on input pops up when it is focused."),component:t(510).default,rawText:t(511)},{name:"7-validate",title:Object(u.b)("校验 \n 设置了 rules，会自动校验输入数据，设置了 popover 会在指定位置弹出 \n 如果没有设置 popover，不会弹出错误提示。 \n 有错误时，提示框不会隐藏。","Validate \n When the rules property is set, it will automatically verify the input data. When the popover property is set, it will pop up at the specified location. \n If the popover property is not set, no error message will pop up. \n If input is invalid, the message will not be hidden."),component:t(512).default,rawText:t(513)},{name:"8-disabled",title:Object(u.b)("禁用 \n 设置 disabled 属性禁用组件","Disabled \n Set the disabled property to disable the component."),component:t(514).default,rawText:t(515)},{name:"9-password",title:Object(u.b)("密码 \n Input.Password 模拟密码输入框，用来阻止 Chrome 提示记住密码。","Password \n Input.Password is a mock input of type 'password', used for disable Chrome autofill."),component:t(516).default,rawText:t(517)}];n.default=Object(i.a)(function(e){return o.a.createElement(c.a,a()({},e,{codes:void 0,source:s,examples:p}))})}}]);