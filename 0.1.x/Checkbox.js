(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[10],{215:function(e,n,t){"use strict";var r=t(12),u=t.n(r),d=t(1),s=t.n(d),h=t(34),m=t(27),f=t(42),b=t(44);n.a=function(i){return function(e){var n=Object(d.useState)(""),n=u()(n,2),r=n[0],a=n[1],n=Object(d.useState)([]),o=u()(n,1)[0],t=e.location.hash,c=Object(m.useUpdate)(),n=Object(d.useCallback)(function(e){e.forEach(function(e){o.push(e)}),c()},[]),l=Object(d.useCallback)(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);Object(d.useEffect)(function(){l();function e(){var t,r=document.documentElement.scrollTop,e=o.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#".concat(e.id));n&&n.offsetTop<=r&&(t=e.id)}),a(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return s.a.createElement("div",{className:Object(f.f)("_")},s.a.createElement(i,{onHeadingSetted:n}),!e.noNav&&s.a.createElement(h.G,{className:Object(f.f)("sticky"),top:50},s.a.createElement("div",{className:Object(f.f)("nav")},o.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return s.a.createElement("a",{key:n,className:Object(f.f)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===b.a.location.search.indexOf("?example=")?b.a.push("".concat(b.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(b.a.push("".concat(b.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},216:function(e,n,t){"use strict";var r=t(8),i=t.n(r),m=t(1),f=t.n(m),r=t(12),b=t.n(r),r=t(0),a=t.n(r),r=t(25),u=t.n(r),r=t(23),d=t.n(r),r=t(217),s=t.n(r),h=t(49),p=t(14),k=t(42),x=t(35),r=t(10),o=t.n(r),r=t(218),c=t.n(r),v=(t(219),function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=Object(m.useRef)(null);return Object(m.useEffect)(function(){var e=r.current;c.a.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),f.a.createElement("pre",{ref:r,className:o()(n||"lang-jsx",Object(k.a)("pre"))},f.a.createElement("code",null,e))}),r=t(74),y=t.n(r),g=t(34),C=t(72),E=t(44),j=f.a.createElement("div",{className:Object(k.a)("placeholder")},f.a.createElement(g.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function O(e){var n=e.component,t=e.id,r=e.name,a=e.rawText,o=e.title,c=Object(m.useRef)(null),l=Object(m.useState)(!1),i=b()(l,2),u=i[0],d=i[1],e=Object(m.useState)(Object(m.createElement)(n)),l=b()(e,1)[0],i=Object(m.useState)(),n=b()(i,2),s=n[0],h=n[1],e=Object(m.useState)(),i=(b()(e,1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(m.useEffect)(function(){c.current&&(c.current.style.height=u?"".concat(s,"px"):"0")},[u]);n=function(e){return f.a.createElement("a",{className:Object(k.a)("toggle"),onClick:function(e){d(!u)}.bind(null,e)},f.a.createElement(C.a,{name:u?"code-close":"code"}))},e=E.a.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=o.split("\n"),e=y()(r),r=e[0],e=e.slice(1),r=r&&r.trim();return f.a.createElement(m.Fragment,null,r&&f.a.createElement("h3",{key:"0",id:t},r),f.a.createElement(g.r,{placeholder:j},f.a.createElement("div",{className:Object(k.a)("_",u&&"showcode")},f.a.createElement("div",{className:Object(k.a)("body")},l),0<o.length&&f.a.createElement("div",{className:Object(k.a)("desc")},e.map(function(e,n){return f.a.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),f.a.createElement("div",{ref:c,className:Object(k.a)("code")},f.a.createElement(v,{onHighLight:function(e){h(e)},value:i}),n(!0)))))}O.propTypes={component:a.a.func.isRequired,id:a.a.string,name:a.a.string,rawText:a.a.string,title:a.a.string.isRequired},O.defaultProps={rawText:""};r=function(e){var n=e.children,e=Object(m.useState)(!1),e=b()(e,2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return f.a.createElement("div",{onClick:function(){r(!t)},className:Object(k.e)("console")},f.a.createElement(n,null,e))};r.propTypes={children:a.a.array},r.defaultProps={children:[]};var w=r;function l(e){var e=e.children,n=d()(e[1].props.children);try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return f.a.createElement("div",{style:{overflow:"auto"}},f.a.createElement("table",{className:"doc-api-table"},e[0],f.a.cloneElement(e[1],{children:n})))}l.propTypes={children:a.a.any},l.defaultProps={};var V=l,T=/^<code name="([\w|-]+)" /,I=/^<example name="([\w|-]+)"/;function G(e){var n=e.onHeadingSetted,a=e.codes,o=e.examples,t=e.source,e=Object(m.useState)([]),r=b()(e,1)[0],e=Object(m.useState)({}),c=b()(e,1)[0];Object(m.useEffect)(function(){n&&n(r)},[]);function l(e){r.push(e)}return f.a.createElement(s.a,{className:Object(k.e)("_"),source:t,renderers:{code:v,heading:function(e){var n,t=e.level,r=e.children,a="".concat(t,"-").concat(r[0]),o="h".concat(t);return"object"===u()(r[0])?f.a.createElement(o,null,r):(c[a]||(e="heading-".concat((n=t,e=r[0],4===n?Object(p.c)():"".concat(n,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==t&&3!==t||l({id:e,level:t,children:r}),c[a]=f.a.createElement(o,{id:e},r)),c[a])},html:function(e){if("<example />"===e.value)return function(){if(c.examples)return c.examples;if(!o)return f.a.createElement("div",null);var e=Object(x.b)("示例","Example"),n="heading-example-h";return l({id:n,level:2,children:[e]}),c.examples=[f.a.createElement("h2",{key:"h",id:n},e)].concat(d()(o.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),r=e.title.split("\n"),r=b()(r,1)[0];return l({id:t,level:3,children:[r]}),f.a.createElement(O,i()({key:n,id:t},e))}}))),c.examples}();var n,t=e.value.match(I);if(t)return n=t[1],e.value.indexOf("noExpand"),r="example-".concat(n),c[r]||(t=(o||[]).find(function(e){return e.name===n}),c[r]=t?f.a.createElement(O,t):null),c[r];if("<br>"===e.value||"<br />"===e.value)return f.a.createElement("br",null);var r=e.value.match(T);return r?(e=r[1],(r=a[e])?[f.a.createElement(v,{key:"cb",value:r.text})].concat(d()(r.log.map(function(e,n){return f.a.createElement(w,{key:n},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:V,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?f.a.createElement("a",{href:e.href,target:n},e.children):f.a.createElement(h.a,{to:e.href,target:n},e.children)}}})}G.propTypes={children:a.a.oneOfType([a.a.element,a.a.array]),codes:a.a.object,examples:a.a.array,onHeadingSetted:a.a.func,source:a.a.string.isRequired},G.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var R=t(73),S=(t(215),N.propTypes={loader:a.a.func,source:a.a.string},N.defaultProps={loader:void 0,source:void 0},Object(m.memo)(N));function N(e){var n=Object(m.useState)(e.source),t=b()(n,2),n=t[0],r=t[1];return Object(m.useEffect)(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?f.a.createElement(G,i()({},e,{source:n})):f.a.createElement(R.a,{style:{minHeight:200}})}n.a=S},430:function(e,n){e.exports="# Checkbox *复选框*\r\n\r\nCheckbox 可以单独使用。一组Checkbox使用时，使用一个Array类型的属性 data 来控制选项。\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Checkbox\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| checked | boolean \\| 'indeterminate' | 无 | checked 传入时为受控组件 |\r\n| disabled | boolean | false | 是否禁用 |\r\n| htmlValue | any | true | 选中时返回值 |\r\n| name | string | 无 | Form 存取数据的名称 |\r\n| onChange | (value: any, checked: boolean) => void | 无 | 选中时，value 为 htmlValue，checked 为 true<br />未选中时，value 为 undefined，checked 为 false |\r\n| value | any | 无 | 如果 checked 未设置，checked 状态为 value === htmlValue |\r\n\r\n### Checkbox.Group\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| data | any[] | 必填 | 数据项 |\r\n| defaultValue | any[] | | 初始值 |\r\n| disabled | (data: any) => boolean \\| boolean | false | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |\r\n| format | (data: any) => any \\| string | d => d | 格式化 value<br />默认值，返回原始数据<br />为string时，会作为key从原始数据中获取值，相当于 (d) => d[format]<br /> 为函数时，以函数返回结果作为 value |\r\n| name | string | 无 | Form 存取数据的名称 |\r\n| keygen | ((data: any) => string) \\| string \\| true | 必填 | 生成每一项key的辅助方法<br />为 true 时，以数据项本身作为key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为string时，使用这个string对应的数据值。如 'id'，相当于 (d => d.id) |\r\n| onChange | (value: any[]) => void | 无 | value 为 datum.getValue() |\r\n| prediction | (value: any, data: any) => boolean |  (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配 |\r\n| renderItem | (data: any) => ReactNode \\| string | 必填 | 为 string 时，返回 d\\[string]<br />为 function 时，返回函数结果 |\r\n| value | any[] | | 在Form中，value会被表单接管，value无效 |\r\n"},431:function(e,n){e.exports="# Checkbox\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Checkbox\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| checked | boolean \\| 'indeterminate' | - | if not set, use (value === htmlValue). |\r\n| disabled | boolean | false | disable checkbox |\r\n| htmlValue | any | true | Specifies the result |\r\n| name | string | - | The name of the Form which access data |\r\n| onChange | (value: any, checked: boolean) => void | - | When selected, value is htmlValue and checked is true.<br />When not selected, value is undefined and checked is false. |\r\n| value | any | - |  |\r\n\r\n### Checkbox.Group\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| data | any[] | required | The data item |\r\n| datum | object | - | If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](/components/Datum.List) object or the Datum.List configuration to process data. |\r\n| defaultValue | any[] | [] | Initial value |\r\n| disabled | (data: any) => boolean \\| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |\r\n| format | ((data: any) => any) | string | d => d | format value |\r\n| name | string | - | The name of the Form which access data |\r\n| keygen | ((data: any) => string) \\| string \\| true | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |\r\n| onChange | (value: any[]) => void  | - | value is datum.getValue() |\r\n| prediction | (value: any, data: any) => boolean |  (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |\r\n| renderItem | (data: any) => ReactNode \\| string | required | When it is a string, return d\\[string]<br />When it is a function, return the result of the function. |\r\n| value | any[] | - | In the Form, the value will be taken over by the form and the value will lose efficacy. |\r\n"},432:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement(o.i,null,"Checkbox")}},433:function(e,n){e.exports="/**\r\n * cn - 基本用法\r\n *    -- 基本的 Checkbox\r\n * en - Base\r\n *    -- Basic Checkbox\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Checkbox>Checkbox</Checkbox>\r\n}\r\n"},434:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.i,{checked:!1},"not checked"),a.a.createElement(o.i,{checked:!0},"checked"),a.a.createElement(o.i,{checked:"indeterminate"},"indeterminate"))}},435:function(e,n){e.exports="/**\r\n * cn - 状态\r\n *    -- checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。\r\n * en - Checked\r\n *    -- The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked).\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Checkbox checked={false}>not checked</Checkbox>\r\n      <Checkbox checked>checked</Checkbox>\r\n      <Checkbox checked=\"indeterminate\">indeterminate</Checkbox>\r\n    </div>\r\n  )\r\n}\r\n"},436:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement(o.i,{htmlValue:"ok",value:"ok"},"value is ok")}},437:function(e,n){e.exports="/**\r\n * cn - 选中值\r\n *    -- 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。\r\n * en - Value\r\n *    -- When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked);\r\n *    -- When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <Checkbox htmlValue=\"ok\" value=\"ok\">\r\n      value is ok\r\n    </Checkbox>\r\n  )\r\n}\r\n"},438:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),c=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(o.i.Group,{keygen:"id",defaultValue:[3,5]},c.map(function(e){return a.a.createElement(o.i,{key:e.id,htmlValue:e.id},e.color)}))}},439:function(e,n){e.exports="/**\r\n * cn - 一组复选框\r\n *    -- 一组复选框可以放在 Checkbox.Group 中\r\n * en - Group\r\n *    -- A series of checkboxes group by Checkbox.Group.\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nconst data = [\r\n  { id: 1, color: 'red' },\r\n  { id: 2, color: 'orange' },\r\n  { id: 3, color: 'yellow' },\r\n  { id: 4, color: 'green' },\r\n  { id: 5, color: 'cyan' },\r\n  { id: 6, color: 'blue' },\r\n  { id: 7, color: 'violet' },\r\n]\r\n\r\nexport default function() {\r\n  return (\r\n    <Checkbox.Group keygen=\"id\" defaultValue={[3, 5]}>\r\n      {data.map(d => (\r\n        <Checkbox key={d.id} htmlValue={d.id}>\r\n          {d.color}\r\n        </Checkbox>\r\n      ))}\r\n    </Checkbox.Group>\r\n  )\r\n}\r\n"},440:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),c=["red","orange","yellow","green","cyan","blue","violet"];function l(e){var n={borderBottom:"solid 1px ".concat(e),paddingBottom:2};return a.a.createElement("span",{style:n},e)}n.default=function(){return a.a.createElement(o.i.Group,{keygen:function(e){return e},data:c,defaultValue:["blue","cyan"],renderItem:l})}},441:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- 可以直接通过数据来渲染一组 Checkbox\r\n * en -\r\n *    -- Render a group of checkboxes from data.\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nfunction renderItem(color) {\r\n  const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }\r\n  return <span style={style}>{color}</span>\r\n}\r\n\r\nexport default function() {\r\n  return <Checkbox.Group keygen={c => c} data={data} defaultValue={['blue', 'cyan']} renderItem={renderItem} />\r\n}\r\n"},442:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return f});var n=t(4),c=t.n(n),n=t(5),r=t.n(n),n=t(2),l=t.n(n),n=t(6),i=t.n(n),n=t(7),a=t.n(n),n=t(3),o=t.n(n),n=t(9),u=t.n(n),n=t(1),d=t.n(n),s=t(34);function h(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,n=o()(t);return n=r?(e=o()(this).constructor,Reflect.construct(n,arguments,e)):n.apply(this,arguments),a()(this,n)}}var m=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}],f=function(e){i()(o,e);var a=h(o);function o(){var e;c()(this,o);for(var n=arguments.length,t=new Array(n),r=0;r<n;r++)t[r]=arguments[r];return e=a.call.apply(a,[this].concat(t)),u()(l()(e),"renderItem",function(e){var n={borderBottom:"solid 1px ".concat(e.color),paddingBottom:2};return d.a.createElement("span",{style:n},e.color)}),e}return r()(o,[{key:"render",value:function(){return d.a.createElement(s.i.Group,{keygen:"id",data:m,format:"color",defaultValue:["blue","cyan"],renderItem:this.renderItem})}}]),o}(n.Component)},443:function(e,n){e.exports="/**\r\n * cn - 复杂数据\r\n *    -- 复杂的数据可以使用 format 处理 value\r\n * en - Complex data\r\n *    -- Complex data can use format to process value.\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nconst data = [\r\n  { id: 1, color: 'red' },\r\n  { id: 2, color: 'orange' },\r\n  { id: 3, color: 'yellow' },\r\n  { id: 4, color: 'green' },\r\n  { id: 5, color: 'cyan' },\r\n  { id: 6, color: 'blue' },\r\n  { id: 7, color: 'violet' },\r\n]\r\n\r\nexport default class extends Component {\r\n  renderItem = d => {\r\n    const style = { borderBottom: `solid 1px ${d.color}`, paddingBottom: 2 }\r\n    return <span style={style}>{d.color}</span>\r\n  }\r\n\r\n  render() {\r\n    return (\r\n      <Checkbox.Group\r\n        keygen=\"id\"\r\n        data={data}\r\n        format=\"color\"\r\n        defaultValue={['blue', 'cyan']}\r\n        renderItem={this.renderItem}\r\n      />\r\n    )\r\n  }\r\n}\r\n"},444:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),c=[{id:1,color:"red"},{id:2,color:"orange"},{id:3,color:"yellow"},{id:4,color:"green"},{id:5,color:"cyan"},{id:6,color:"blue"},{id:7,color:"violet"}];n.default=function(){return a.a.createElement(o.i.Group,{keygen:"id",block:!0,data:c,datum:{format:"color"},defaultValue:["blue","cyan"],renderItem:"color"})}},445:function(e,n){e.exports="/**\r\n * cn - 垂直布局\r\n *    -- 默认是水平布局，设置 block 属性可以改为垂直布局\r\n * en - Block\r\n *    -- The default is horizontal layout, and setting the block property can change it to be vertical layout.\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nconst data = [\r\n  { id: 1, color: 'red' },\r\n  { id: 2, color: 'orange' },\r\n  { id: 3, color: 'yellow' },\r\n  { id: 4, color: 'green' },\r\n  { id: 5, color: 'cyan' },\r\n  { id: 6, color: 'blue' },\r\n  { id: 7, color: 'violet' },\r\n]\r\n\r\nexport default function() {\r\n  return (\r\n    <Checkbox.Group\r\n      keygen=\"id\"\r\n      block\r\n      data={data}\r\n      datum={{ format: 'color' }}\r\n      defaultValue={['blue', 'cyan']}\r\n      renderItem=\"color\"\r\n    />\r\n  )\r\n}\r\n"},446:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),c=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.i.Group,{disabled:!0,keygen:!0,data:c,defaultValue:["blue","cyan"],renderItem:function(e){return e}}),a.a.createElement("br",null),a.a.createElement(o.i,{disabled:!0,checked:!1},"not checked"),a.a.createElement(o.i,{disabled:!0,checked:!0},"checked"),a.a.createElement(o.i,{disabled:!0,checked:"indeterminate"},"indeterminate"))}},447:function(e,n){e.exports="/**\r\n * cn - 禁用\r\n *    -- 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项\r\n * en - Disabled\r\n *    -- Set the disabled property of Checkbox.Group to true, disable all the checkboxes.\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Checkbox.Group disabled keygen data={data} defaultValue={['blue', 'cyan']} renderItem={d => d} />\r\n      <br />\r\n      <Checkbox disabled checked={false}>\r\n        not checked\r\n      </Checkbox>\r\n      <Checkbox disabled checked>\r\n        checked\r\n      </Checkbox>\r\n      <Checkbox disabled checked=\"indeterminate\">\r\n        indeterminate\r\n      </Checkbox>\r\n    </div>\r\n  )\r\n}\r\n"},448:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34),c=["red","orange","yellow","green","cyan","blue","violet"];n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.i.Group,{data:c,disabled:function(e){return"yellow"===e},keygen:!0,value:["blue"],renderItem:function(e){return e}}))}},449:function(e,n){e.exports="/**\r\n * cn -\r\n *    -- disabled 为函数时，根据函数结果实现有条件禁用\r\n * en -\r\n *    -- When the disabled is a function, disbale the option that the function to return true.\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nconst data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Checkbox.Group data={data} disabled={d => d === 'yellow'} keygen value={['blue']} renderItem={d => d} />\r\n    </div>\r\n  )\r\n}\r\n"},450:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement(o.i,{inputable:!0},"more...")}},451:function(e,n){e.exports="/**\r\n * cn - 带输入\r\n *    -- 设置 inputable 属性可以显示输入框，返回值为输入框内容\r\n * en - Inputable\r\n *    -- Set the inputable property to true can show the input box and the return value is the value of the input box.\r\n */\r\nimport React from 'react'\r\nimport { Checkbox } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Checkbox inputable>more...</Checkbox>\r\n}\r\n"},887:function(e,n,t){"use strict";t.r(n);var r=t(8),a=t.n(r),o=t(1),c=t.n(o),l=t(215),i=t(216),u=t(35),r=t(430),o=t.n(r),r=t(431),r=t.n(r),d=Object(u.b)(o.a,r.a),s=[{name:"01-base",title:Object(u.b)("基本用法 \n 基本的 Checkbox","Base \n Basic Checkbox"),component:t(432).default,rawText:t(433)},{name:"02-checked",title:Object(u.b)("状态 \n checked 有三个值，选中(true)、未选中(false)、半选中('indeterminate')。checked 设置时为受控组件（此示例没有处理 onChange 事件）。","Checked \n The checked has three values: true(checked), false(not checked), 'indeterminate'(half-checked)."),component:t(434).default,rawText:t(435)},{name:"03-value",title:Object(u.b)("选中值 \n 未设置htmlValue的状态下，checkbox选中时返回true，如果设置 htmlValue，返回 htmlValue。未选中状态都是返回 undefined。","Value \n When the htmlValue is set, the checkbox return the htmlValue (checked) and undefined (not checked); \n When the htmlValue is not set, the checkbox selected return true (checked) and undefined (not checked);"),component:t(436).default,rawText:t(437)},{name:"04-rawgroup",title:Object(u.b)("一组复选框 \n 一组复选框可以放在 Checkbox.Group 中","Group \n A series of checkboxes group by Checkbox.Group."),component:t(438).default,rawText:t(439)},{name:"05-group",title:Object(u.b)(" \n 可以直接通过数据来渲染一组 Checkbox"," \n Render a group of checkboxes from data."),component:t(440).default,rawText:t(441)},{name:"06-format",title:Object(u.b)("复杂数据 \n 复杂的数据可以使用 format 处理 value","Complex data \n Complex data can use format to process value."),component:t(442).default,rawText:t(443)},{name:"08-block",title:Object(u.b)("垂直布局 \n 默认是水平布局，设置 block 属性可以改为垂直布局","Block \n The default is horizontal layout, and setting the block property can change it to be vertical layout."),component:t(444).default,rawText:t(445)},{name:"09-disabled",title:Object(u.b)("禁用 \n 设置 Checkbox.Group 的 disabled 为 true，禁用全部选项","Disabled \n Set the disabled property of Checkbox.Group to true, disable all the checkboxes."),component:t(446).default,rawText:t(447)},{name:"10-disabled",title:Object(u.b)(" \n disabled 为函数时，根据函数结果实现有条件禁用"," \n When the disabled is a function, disbale the option that the function to return true."),component:t(448).default,rawText:t(449)},{name:"11-input",title:Object(u.b)("带输入 \n 设置 inputable 属性可以显示输入框，返回值为输入框内容","Inputable \n Set the inputable property to true can show the input box and the return value is the value of the input box."),component:t(450).default,rawText:t(451)}];n.default=Object(l.a)(function(e){return c.a.createElement(i.a,a()({},e,{codes:void 0,source:d,examples:s}))})}}]);