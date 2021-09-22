(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[27],{215:function(e,n,t){"use strict";var r=t(12),c=t.n(r),d=t(1),s=t.n(d),f=t(34),m=t(27),p=t(42),b=t(44);n.a=function(u){return function(e){var n=Object(d.useState)(""),n=c()(n,2),r=n[0],a=n[1],n=Object(d.useState)([]),o=c()(n,1)[0],t=e.location.hash,l=Object(m.useUpdate)(),n=Object(d.useCallback)(function(e){e.forEach(function(e){o.push(e)}),l()},[]),i=Object(d.useCallback)(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);Object(d.useEffect)(function(){i();function e(){var t,r=document.documentElement.scrollTop,e=o.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#".concat(e.id));n&&n.offsetTop<=r&&(t=e.id)}),a(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return s.a.createElement("div",{className:Object(p.f)("_")},s.a.createElement(u,{onHeadingSetted:n}),!e.noNav&&s.a.createElement(f.G,{className:Object(p.f)("sticky"),top:50},s.a.createElement("div",{className:Object(p.f)("nav")},o.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return s.a.createElement("a",{key:n,className:Object(p.f)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===b.a.location.search.indexOf("?example=")?b.a.push("".concat(b.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(b.a.push("".concat(b.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},216:function(e,n,t){"use strict";var r=t(8),u=t.n(r),m=t(1),p=t.n(m),r=t(12),b=t.n(r),r=t(0),a=t.n(r),r=t(25),c=t.n(r),r=t(23),d=t.n(r),r=t(217),s=t.n(r),f=t(49),h=t(14),g=t(42),y=t(35),r=t(10),o=t.n(r),r=t(218),l=t.n(r),v=(t(219),function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=Object(m.useRef)(null);return Object(m.useEffect)(function(){var e=r.current;l.a.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),p.a.createElement("pre",{ref:r,className:o()(n||"lang-jsx",Object(g.a)("pre"))},p.a.createElement("code",null,e))}),r=t(74),E=t.n(r),x=t(34),k=t(72),R=t(44),w=p.a.createElement("div",{className:Object(g.a)("placeholder")},p.a.createElement(x.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function O(e){var n=e.component,t=e.id,r=e.name,a=e.rawText,o=e.title,l=Object(m.useRef)(null),i=Object(m.useState)(!1),u=b()(i,2),c=u[0],d=u[1],e=Object(m.useState)(Object(m.createElement)(n)),i=b()(e,1)[0],u=Object(m.useState)(),n=b()(u,2),s=n[0],f=n[1],e=Object(m.useState)(),u=(b()(e,1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(m.useEffect)(function(){l.current&&(l.current.style.height=c?"".concat(s,"px"):"0")},[c]);n=function(e){return p.a.createElement("a",{className:Object(g.a)("toggle"),onClick:function(e){d(!c)}.bind(null,e)},p.a.createElement(k.a,{name:c?"code-close":"code"}))},e=R.a.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=o.split("\n"),e=E()(r),r=e[0],e=e.slice(1),r=r&&r.trim();return p.a.createElement(m.Fragment,null,r&&p.a.createElement("h3",{key:"0",id:t},r),p.a.createElement(x.r,{placeholder:w},p.a.createElement("div",{className:Object(g.a)("_",c&&"showcode")},p.a.createElement("div",{className:Object(g.a)("body")},i),0<o.length&&p.a.createElement("div",{className:Object(g.a)("desc")},e.map(function(e,n){return p.a.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),p.a.createElement("div",{ref:l,className:Object(g.a)("code")},p.a.createElement(v,{onHighLight:function(e){f(e)},value:u}),n(!0)))))}O.propTypes={component:a.a.func.isRequired,id:a.a.string,name:a.a.string,rawText:a.a.string,title:a.a.string.isRequired},O.defaultProps={rawText:""};r=function(e){var n=e.children,e=Object(m.useState)(!1),e=b()(e,2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return p.a.createElement("div",{onClick:function(){r(!t)},className:Object(g.e)("console")},p.a.createElement(n,null,e))};r.propTypes={children:a.a.array},r.defaultProps={children:[]};var j=r;function i(e){var e=e.children,n=d()(e[1].props.children);try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return p.a.createElement("div",{style:{overflow:"auto"}},p.a.createElement("table",{className:"doc-api-table"},e[0],p.a.cloneElement(e[1],{children:n})))}i.propTypes={children:a.a.any},i.defaultProps={};var V=i,G=/^<code name="([\w|-]+)" /,T=/^<example name="([\w|-]+)"/;function z(e){var n=e.onHeadingSetted,a=e.codes,o=e.examples,t=e.source,e=Object(m.useState)([]),r=b()(e,1)[0],e=Object(m.useState)({}),l=b()(e,1)[0];Object(m.useEffect)(function(){n&&n(r)},[]);function i(e){r.push(e)}return p.a.createElement(s.a,{className:Object(g.e)("_"),source:t,renderers:{code:v,heading:function(e){var n,t=e.level,r=e.children,a="".concat(t,"-").concat(r[0]),o="h".concat(t);return"object"===c()(r[0])?p.a.createElement(o,null,r):(l[a]||(e="heading-".concat((n=t,e=r[0],4===n?Object(h.c)():"".concat(n,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==t&&3!==t||i({id:e,level:t,children:r}),l[a]=p.a.createElement(o,{id:e},r)),l[a])},html:function(e){if("<example />"===e.value)return function(){if(l.examples)return l.examples;if(!o)return p.a.createElement("div",null);var e=Object(y.b)("示例","Example"),n="heading-example-h";return i({id:n,level:2,children:[e]}),l.examples=[p.a.createElement("h2",{key:"h",id:n},e)].concat(d()(o.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),r=e.title.split("\n"),r=b()(r,1)[0];return i({id:t,level:3,children:[r]}),p.a.createElement(O,u()({key:n,id:t},e))}}))),l.examples}();var n,t=e.value.match(T);if(t)return n=t[1],e.value.indexOf("noExpand"),r="example-".concat(n),l[r]||(t=(o||[]).find(function(e){return e.name===n}),l[r]=t?p.a.createElement(O,t):null),l[r];if("<br>"===e.value||"<br />"===e.value)return p.a.createElement("br",null);var r=e.value.match(G);return r?(e=r[1],(r=a[e])?[p.a.createElement(v,{key:"cb",value:r.text})].concat(d()(r.log.map(function(e,n){return p.a.createElement(j,{key:n},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:V,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?p.a.createElement("a",{href:e.href,target:n},e.children):p.a.createElement(f.a,{to:e.href,target:n},e.children)}}})}z.propTypes={children:a.a.oneOfType([a.a.element,a.a.array]),codes:a.a.object,examples:a.a.array,onHeadingSetted:a.a.func,source:a.a.string.isRequired},z.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var S=t(73),C=(t(215),I.propTypes={loader:a.a.func,source:a.a.string},I.defaultProps={loader:void 0,source:void 0},Object(m.memo)(I));function I(e){var n=Object(m.useState)(e.source),t=b()(n,2),n=t[0],r=t[1];return Object(m.useEffect)(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?p.a.createElement(z,u()({},e,{source:n})):p.a.createElement(S.a,{style:{minHeight:200}})}n.a=C},518:function(e,n){e.exports="# Radio *单选框*\r\n\r\n<example />\r\n\r\n## API\r\n\r\nRadio 不能单独使用\r\n\r\n### Radio\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| checked | boolean \\| 'indeterminate' | 无 | checked 传入时为受控组件 |\r\n| disabled | boolean | false | 是否禁用 |\r\n| htmlValue | any | true | 选中时返回值 |\r\n\r\n### Radio.Group\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | any | | 默认值，设置 value 时，会覆盖 defaultValue |\r\n| data | any[] | 必填 | 数据项 |\r\n| disabled | (data: any) => boolean \\| boolean | false | 是否禁用 |\r\n| format | (data: any) => any \\| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]<br /> 为函数时，以函数返回结果作为 value |\r\n| keygen | ((data: any) => string) \\| string \\| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |\r\n| name | string | 无 | Form 存取数据的名称 |\r\n| onChange | (value: any) => void | 无 | value 为 datum.getValue() |\r\n| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |\r\n| renderItem | (data: any) => ReactNode \\| string | 必填 | 为 string 时，返回 d\\[string]<br />为 function 时，返回函数结果 |\r\n| value | any | | 在Form中，value会被表单接管，value无效 |\r\n"},519:function(e,n){e.exports="# Radio\r\n\r\n<example />\r\n\r\n## API\r\n\r\nRadio cannot be used alone.\r\n\r\n### Radio\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| checked | boolean \\| 'indeterminate' | - | if not set, use (value === htmlValue). |\r\n| disabled | boolean | false | disable checkbox |\r\n| htmlValue | any | true | Specifies the result |\r\n\r\n### Radio.Group\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| defaultValue | any | | default value. |\r\n| data | any[] | required | the data items |\r\n| disabled | (data: any) => boolean \\| boolean  | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |\r\n| format | (data: any) => any \\| string | d => d | Format value<br />Default value, return original data. <br />When it is a string, it will get the value from the original data as a key .The same as (d) => d[format]<br />When it is a function, the result returned by the function will be the value. |\r\n| keygen | ((data: any) => string) \\| string \\| true  | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |\r\n| name | string | none | The name of a Form that accesses data |\r\n| onChange | (value: any) => void | none | value is the datum.getValue() |\r\n| prediction | (value: any, data: any) => boolean | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function used to determine whether match. |\r\n| renderItem | (data: any) => ReactNode \\| string | required | When it is a string, return d\\[string]<br />When it is a function, return the result of the function. |\r\n| value | any | | In the Form, value is taken over by the Form and the value will be invalid. |\r\n"},520:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow","green","cyan","blue","violet"];function i(e){var n={borderBottom:"solid 1px ".concat(e),paddingBottom:2};return a.a.createElement("span",{style:n},e)}n.default=function(){return a.a.createElement(o.z.Group,{keygen:!0,data:l,defaultValue:"blue",renderItem:i})}},521:function(e,n){e.exports="/**\r\n * cn - 基本用法\r\n *    -- Radio.Group 通过数据来生成一组单选框。\r\n * en - Base\r\n *    -- Radio.Group generate a group of radios from an array.\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nfunction renderItem(color) {\r\n  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }\r\n  return <span style={style}>{color}</span>\r\n}\r\n\r\nexport default function() {\r\n  return <Radio.Group keygen data={data} defaultValue=\"blue\" renderItem={renderItem} />\r\n}\r\n"},522:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement(o.z.Group,{keygen:!0,defaultValue:"yellow"},l.map(function(e){return a.a.createElement(o.z,{key:e,htmlValue:e},e)}))}},523:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。\r\n * en -\r\n *    -- A series of radios group by Radio.Group.\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nexport default function() {\r\n  return (\r\n    <Radio.Group keygen defaultValue=\"yellow\">\r\n      {data.map(d => (\r\n        <Radio key={d} htmlValue={d}>\r\n          {d}\r\n        </Radio>\r\n      ))}\r\n    </Radio.Group>\r\n  )\r\n}\r\n"},524:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(o.z.Group,{keygen:"id",data:l,format:"color",defaultValue:"blue",renderItem:"color"})}},525:function(e,n){e.exports="/**\r\n * cn - 复杂数据\r\n *    -- 复杂的数据可以使用 format 处理 value\r\n * en - Complex data\r\n *    -- Complex data can use format to process value.\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = [\r\n  { id: 1, color: 'red' },\r\n  { id: 2, color: 'orange' },\r\n  { id: 3, color: 'yellow' },\r\n  { id: 4, color: 'green' },\r\n  { id: 5, color: 'cyan' },\r\n  { id: 6, color: 'blue' },\r\n  { id: 7, color: 'violet' },\r\n]\r\n\r\nexport default function() {\r\n  return <Radio.Group keygen=\"id\" data={data} format=\"color\" defaultValue=\"blue\" renderItem=\"color\" />\r\n}\r\n"},526:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(o.z.Group,{keygen:"id",block:!0,data:l,datum:{format:"id"},defaultValue:3,renderItem:"color"})}},527:function(e,n){e.exports="/**\r\n * cn - 垂直布局\r\n *    -- 默认为水平布局，设置 block 属性可以改为垂直布局\r\n * en - Vertical layout\r\n *    -- The default is horizontal layout and setting the block property can changed it to be vertical layout.\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = [\r\n  { id: 1, color: 'red' },\r\n  { id: 2, color: 'orange' },\r\n  { id: 3, color: 'yellow' },\r\n  { id: 4, color: 'green' },\r\n  { id: 5, color: 'cyan' },\r\n  { id: 6, color: 'blue' },\r\n  { id: 7, color: 'violet' },\r\n]\r\n\r\nexport default function() {\r\n  return <Radio.Group keygen=\"id\" block data={data} datum={{ format: 'id' }} defaultValue={3} renderItem=\"color\" />\r\n}\r\n"},528:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow"];n.default=function(){return a.a.createElement(o.z.Group,{button:!0,keygen:!0,data:l,defaultValue:"red"})}},529:function(e,n){e.exports="/**\r\n * cn - 按钮样式\r\n *    -- 设置 button 属性可以展示为按钮样式\r\n * en - Button\r\n *    -- set button to show button style\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow']\r\n\r\nexport default function() {\r\n  return <Radio.Group button keygen data={data} defaultValue=\"red\" />\r\n}\r\n"},530:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow"];n.default=function(){return a.a.createElement(o.z.Group,{button:"outline",keygen:!0,data:l,defaultValue:"red"})}},531:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- 设置 button 为 outline 可以展示透明背景的按钮样式\r\n * en -\r\n *    -- set button with outline to show outline button style\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow']\r\n\r\nexport default function() {\r\n  return <Radio.Group button=\"outline\" keygen data={data} defaultValue=\"red\" />\r\n}\r\n"},532:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.z.Group,{size:"small",button:!0,keygen:!0,data:l,defaultValue:"red"}),a.a.createElement(o.z.Group,{keygen:!0,button:!0,data:l,defaultValue:"red"}),a.a.createElement(o.z.Group,{size:"large",button:!0,keygen:!0,data:l,defaultValue:"red"}))}},533:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- 设置 size 可以控制按钮样式的大小\r\n * en -\r\n *    -- size to set button style size\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow']\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Radio.Group size=\"small\" button keygen data={data} defaultValue=\"red\" />\r\n      <Radio.Group keygen button data={data} defaultValue=\"red\" />\r\n      <Radio.Group size=\"large\" button keygen data={data} defaultValue=\"red\" />\r\n    </div>\r\n  )\r\n}\r\n"},534:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.z.Group,{keygen:!0,disabled:!0,data:l,defaultValue:"blue",renderItem:function(e){return e}}))}},535:function(e,n){e.exports="/**\r\n * cn - 禁用\r\n *    -- 设置 disabled 为 true 时，禁用所有选项\r\n * en - Disabled\r\n *    -- Set disabled property is set to true, all the options is disabled.\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Radio.Group keygen disabled data={data} defaultValue=\"blue\" renderItem={d => d} />\r\n    </div>\r\n  )\r\n}\r\n"},536:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),l=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.z.Group,{keygen:!0,data:l,disabled:function(e){return"yellow"===e},defaultValue:"blue",renderItem:function(e){return e}}))}},537:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- disabled 为函数时，根据函数返回结果实现有条件禁用\r\n * en -\r\n *    -- When the disabled is a function, disbale the option that the function to return true.\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Radio.Group keygen data={data} disabled={d => d === 'yellow'} defaultValue=\"blue\" renderItem={d => d} />\r\n    </div>\r\n  )\r\n}\r\n"},538:function(e,n,t){"use strict";t.r(n);var r=t(12),a=t.n(r),r=t(1),o=t.n(r),l=t(34),i=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){var e=o.a.useState("red"),e=a()(e,2),n=e[0],t=e[1];return o.a.createElement(l.z.Group,{keygen:!0,value:n,onChange:function(e){return t(e)}},i.map(function(e){return o.a.createElement("span",{key:e,onClick:function(){n===e&&setTimeout(function(){return t(void 0)})}},o.a.createElement(l.z,{htmlValue:e},e))}))}},539:function(e,n){e.exports="/**\r\n * cn - 支持取消\r\n *    -- 使用组件形式来支持取消选中\r\n * en - Cancel\r\n *    -- Use component list for toggle radio\r\n */\r\nimport React from 'react'\r\nimport { Radio } from 'ethan'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nexport default function() {\r\n  const [current, setCurrent] = React.useState('red')\r\n  return (\r\n    <Radio.Group keygen value={current} onChange={c => setCurrent(c)}>\r\n      {data.map(d => (\r\n        <span\r\n          key={d}\r\n          onClick={() => {\r\n            if (current === d) setTimeout(() => setCurrent(undefined))\r\n          }}\r\n        >\r\n          <Radio htmlValue={d}>{d}</Radio>\r\n        </span>\r\n      ))}\r\n    </Radio.Group>\r\n  )\r\n}\r\n"},891:function(e,n,t){"use strict";t.r(n);var r=t(8),a=t.n(r),o=t(1),l=t.n(o),i=t(215),u=t(216),c=t(35),r=t(518),o=t.n(r),r=t(519),r=t.n(r),d=Object(c.b)(o.a,r.a),s=[{name:"1-base",title:Object(c.b)("基本用法 \n Radio.Group 通过数据来生成一组单选框。","Base \n Radio.Group generate a group of radios from an array."),component:t(520).default,rawText:t(521)},{name:"2-group",title:Object(c.b)(" \n 将一组 Radio 放在 Radio.Group 中，以 React 组件方式调用。"," \n A series of radios group by Radio.Group."),component:t(522).default,rawText:t(523)},{name:"3-format",title:Object(c.b)("复杂数据 \n 复杂的数据可以使用 format 处理 value","Complex data \n Complex data can use format to process value."),component:t(524).default,rawText:t(525)},{name:"5-block",title:Object(c.b)("垂直布局 \n 默认为水平布局，设置 block 属性可以改为垂直布局","Vertical layout \n The default is horizontal layout and setting the block property can changed it to be vertical layout."),component:t(526).default,rawText:t(527)},{name:"6-button-1",title:Object(c.b)("按钮样式 \n 设置 button 属性可以展示为按钮样式","Button \n set button to show button style"),component:t(528).default,rawText:t(529)},{name:"6-button-2",title:Object(c.b)(" \n 设置 button 为 outline 可以展示透明背景的按钮样式"," \n set button with outline to show outline button style"),component:t(530).default,rawText:t(531)},{name:"6-button-3",title:Object(c.b)(" \n 设置 size 可以控制按钮样式的大小"," \n size to set button style size"),component:t(532).default,rawText:t(533)},{name:"7-disabled",title:Object(c.b)("禁用 \n 设置 disabled 为 true 时，禁用所有选项","Disabled \n Set disabled property is set to true, all the options is disabled."),component:t(534).default,rawText:t(535)},{name:"8-disabled",title:Object(c.b)(" \n disabled 为函数时，根据函数返回结果实现有条件禁用"," \n When the disabled is a function, disbale the option that the function to return true."),component:t(536).default,rawText:t(537)},{name:"9-toggle",title:Object(c.b)("支持取消 \n 使用组件形式来支持取消选中","Cancel \n Use component list for toggle radio"),component:t(538).default,rawText:t(539)}];n.default=Object(i.a)(function(e){return l.a.createElement(u.a,a()({},e,{codes:void 0,source:d,examples:s}))})}}]);