(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[978],{7068:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(69048),o=n(85993),t=n(39174),u=(0,t.default)("# EditableArea *可编辑域*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | string | 无 | 设置初始值 |\r\n| value | string | 无 | 受控时，传入的value |\r\n| className | string | 无 | 扩展外层className |\r\n| onChange | (value: string) => void | 无 | 值改变时的回调函数，和value一起设置时使组件受控 |\r\n| style | object | 无 | 组件最外层的扩展样式 |\r\n| bordered | boolean | false | 是否显示外边框 |\r\n| disabled | boolean | false | 是否禁用 |\r\n| clearable | boolean | true | 是否展示清除按钮 |\r\n| placeholder | string | 无 | 同原生 textarea 标签的 placeholder |\r\n| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒 |\r\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符 |\r\n| onBlur | (e: MouseEvent) => void | 无 | 失去焦点事件 |\r\n| onFocus | (e: MouseEvent) => void | 无 | 聚焦事件 |\r\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 | \r\n| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |\r\n| width | number \\| string | 无 | 编辑域宽度 |","# EditableArea\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | string | none | Set initial value |\r\n| value | string | none | The value passed in when controlled |\r\n| className | string | none | The outermost extension className of a component |\r\n| onChange | (value: string) => void | none | Callback function when the value changes, making the component controlled when set with value |\r\n| style | object | none | The outermost extension style of a component |\r\n| bordered | boolean | false | Whether to show the border |\r\n| disabled | boolean | false | Whether to disable |\r\n| clearable | boolean | true | Whether to show the clear button |\r\n| placeholder | string | none | The same as the native placeholder tag |\r\n| delay | number | 400 | User input triggers the onChange and to check interval, unit: ms. |\r\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus |\r\n| onBlur | (e: MouseEvent) => void | none | blur event |\r\n| onFocus | (e: MouseEvent) => void | none | focus event |\r\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than | \r\n| getPopupContainer | () => HTMLElement | none | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |\r\n| width | number \\| string | none | width of the editablearea |"),i=[{name:"01-basex",title:(0,t.default)("基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替","Base \n Editablearea displays one line by default, and more than one line is replaced by ..."),component:n(59833).Z,rawText:n(14536).Z},{name:"02-controlledx",title:(0,t.default)("受控 \n 传递value, onChange使组件受控","Controlled \n Pass value and onChange props to make the component controlled"),component:n(10066).Z,rawText:n(14648).Z},{name:"03-containerx",title:(0,t.default)("自定义容器 \n 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动","Custom container \n use getPopupContainer return target container"),component:n(55912).Z,rawText:n(17339).Z}],d=(0,r.default)(function(e){return l().createElement(o.ZP,a()({},e,{codes:void 0,source:u,examples:i}))})},14536:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- EditableArea 默认展示一行，超过一行的内容用...代替\r\n * en - Base\r\n *    -- Editablearea displays one line by default, and more than one line is replaced by ...\r\n */\r\n\r\nimport React from 'react'\r\nimport { EditableArea } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <EditableArea bordered placeholder=\"input something\" />\r\n}\r\n"},14648:function(e,t){"use strict";t.Z="/**\r\n * cn - 受控\r\n *    -- 传递value, onChange使组件受控\r\n * en - Controlled\r\n *    -- Pass value and onChange props to make the component controlled\r\n */\r\n\r\nimport React, { useState } from 'react'\r\nimport { EditableArea } from 'ethan/index'\r\n\r\nexport default function() {\r\n  const [value, setValue] = useState('')\r\n  return (\r\n    <EditableArea\r\n      value={value}\r\n      placeholder=\"Input something\"\r\n      onChange={val => {\r\n        setValue(val)\r\n      }}\r\n      width={400}\r\n      onBlur={() => {\r\n        console.log('EditableArea: onBlur')\r\n      }}\r\n    />\r\n  )\r\n}\r\n"},17339:function(e,t){"use strict";t.Z="/**\r\n * cn - 自定义容器\r\n *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动\r\n * en - Custom container\r\n *    -- use getPopupContainer return target container\r\n */\r\nimport React from 'react'\r\nimport { EditableArea } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <div id=\"popup-target\" style={{ height: 200, overflow: 'auto', position: 'relative', padding: 10 }}>\r\n      <div style={{ height: 100 }} />\r\n      <EditableArea\r\n        bordered\r\n        placeholder=\"scroll in container\"\r\n        getPopupContainer={() => document.querySelector('#popup-target')}\r\n        maxHeight={100}\r\n      />\r\n      <div style={{ height: 140 }} />\r\n    </div>\r\n  )\r\n}\r\n"},54798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importStar(n(24698)),l=r.__importDefault(n(94184)),o=r.__importDefault(n(15660));n(62356);var u=n(78502);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=a.useRef(null);return a.useEffect(function(){var e=r.current;o.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),a.default.createElement("pre",{ref:r,className:l.default(t||"lang-jsx",u.exampleClass("pre"))},a.default.createElement("code",null,e))}},7595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var m=n(70655),p=m.__importStar(n(24698)),r=m.__importDefault(n(45697)),h=n(79136),v=m.__importDefault(n(22276)),_=m.__importDefault(n(69374)),g=n(78502),E=m.__importDefault(n(54798)),b=p.default.createElement("div",{className:g.exampleClass("placeholder")},p.default.createElement(h.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function a(e){var t=e.component,n=e.id,r=e.name,a=e.rawText,l=e.title,o=p.useRef(null),u=m.__read(p.useState(!1),2),i=u[0],d=u[1],c=m.__read(p.useState(p.createElement(t)),1)[0],e=m.__read(p.useState(),2),s=e[0],f=e[1],u=(m.__read(p.useState(),1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());p.useEffect(function(){o.current&&(o.current.style.height=i?s+"px":"0")},[i]);t=function(e){return p.default.createElement("a",{className:g.exampleClass("toggle"),onClick:function(e){d(!i)}.bind(null,e)},p.default.createElement(v.default,{name:i?"code-close":"code"}))},e=_.default.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=m.__read(l.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return p.default.createElement(p.Fragment,null,e&&p.default.createElement("h3",{key:"0",id:n},e),p.default.createElement(h.Lazyload,{placeholder:b},p.default.createElement("div",{className:g.exampleClass("_",i&&"showcode")},p.default.createElement("div",{className:g.exampleClass("body")},c),0<l.length&&p.default.createElement("div",{className:g.exampleClass("desc")},r.map(function(e,t){return p.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),p.default.createElement("div",{ref:o,className:g.exampleClass("code")},p.default.createElement(E.default,{onHighLight:function(e){f(e)},value:u}),t(!0)))))}(t.default=a).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},a.defaultProps={rawText:""}},71126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),o=n(78502),n=function(e){var t=e.children,e=a.__read(l.useState(!1),2),n=e[0],r=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return l.default.createElement("div",{onClick:function(){r(!n)},className:o.markdownClass("console")},l.default.createElement(t,null,e))};n.propTypes={children:r.default.array},n.defaultProps={children:[]},t.default=n},15302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),o=a.__importDefault(n(21046)),u=a.__importDefault(n(17866));t.default=function(){function e(e){var t=a.__read(l.useState(e.source),2),n=t[0],r=t[1];return l.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?l.default.createElement(o.default,a.__assign({},e,{source:n})):l.default.createElement(u.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},l.memo(e)}},21046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(70655),d=i.__importStar(n(24698)),r=i.__importDefault(n(45697)),c=i.__importDefault(n(30724)),s=n(73727),f=n(70914),m=n(78502),p=i.__importDefault(n(39174)),h=i.__importDefault(n(54798)),v=i.__importDefault(n(7595)),_=i.__importDefault(n(71126)),g=i.__importDefault(n(30681)),E=/^<code name="([\w|-]+)" /,b=/^<example name="([\w|-]+)"/;function a(e){var t=e.onHeadingSetted,a=e.codes,l=e.examples,e=e.source,n=i.__read(d.useState([]),1)[0],o=i.__read(d.useState({}),1)[0];d.useEffect(function(){t&&t(n)},[]);function u(e){n.push(e)}return d.default.createElement(c.default,{className:m.markdownClass("_"),source:e,renderers:{code:h.default,heading:function(e){var t,n=e.level,r=e.children,a=n+"-"+r[0],l="h"+n;return"object"==typeof r[0]?d.default.createElement(l,null,r):(o[a]||(e="heading-"+(t=n,e=r[0],4===t?f.getUidStr():t+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==n&&3!==n||u({id:e,level:n,children:r}),o[a]=d.default.createElement(l,{id:e},r)),o[a])},html:function(e){if("<example />"===e.value)return function(){if(o.examples)return o.examples;if(!l)return d.default.createElement("div",null);var e=p.default("示例","Example"),t="heading-example-h";return u({id:t,level:2,children:[e]}),o.examples=i.__spreadArray([d.default.createElement("h2",{key:"h",id:t},e)],i.__read(l.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-"+e.name,r=i.__read(e.title.split("\n"),1)[0];return u({id:n,level:3,children:[r]}),d.default.createElement(v.default,i.__assign({key:t,id:n},e))}}))),o.examples}();var t,n=e.value.match(b);if(n)return t=n[1],e.value.indexOf("noExpand"),o[r="example-"+t]||(n=(l||[]).find(function(e){return e.name===t}),o[r]=n?d.default.createElement(v.default,i.__assign({},n)):null),o[r];if("<br>"===e.value||"<br />"===e.value)return d.default.createElement("br",null);var r=e.value.match(E);return r?(e=r[1],(r=a[e])?i.__spreadArray([d.default.createElement(h.default,{key:"cb",value:r.text})],i.__read(r.log.map(function(e,t){return d.default.createElement(_.default,{key:t},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:g.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?d.default.createElement("a",{href:e.href,target:t},e.children):d.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})}(t.default=a).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},a.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,t,n){"use strict";var r=n(70655),a=(r.__importDefault(n(24698)),r.__importDefault(n(15302))),l=(r.__importDefault(n(69048)),a.default());t.ZP=l},69048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var d=n(70655),c=d.__importStar(n(24698)),s=n(79136),f=n(64744),m=n(78502),p=d.__importDefault(n(69374));t.default=function(i){return function(e){var t=d.__read(c.useState(""),2),r=t[0],a=t[1],l=d.__read(c.useState([]),1)[0],n=e.location.hash,o=f.useUpdate(),t=c.useCallback(function(e){e.forEach(function(e){l.push(e)}),o()},[]),u=c.useCallback(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);c.useEffect(function(){u();function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#"+e.id);t&&t.offsetTop<=r&&(n=e.id)}),a(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return c.default.createElement("div",{className:m.navClass("_")},c.default.createElement(i,{onHeadingSetted:t}),!e.noNav&&c.default.createElement(s.Sticky,{className:m.navClass("sticky"),top:50},c.default.createElement("div",{className:m.navClass("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return c.default.createElement("a",{key:t,className:m.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===p.default.location.search.indexOf("?example=")?p.default.push(p.default.location.pathname+"?example="+e.replace("heading-","")):(p.default.push(p.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},30681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importDefault(n(24698)),n=r.__importDefault(n(45697));function l(e){var e=e.children,t=r.__spreadArray([],r.__read(e[1].props.children));try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return a.default.createElement("div",{style:{overflow:"auto"}},a.default.createElement("table",{className:"doc-api-table"},e[0],a.default.cloneElement(e[1],{children:t})))}l.propTypes={children:n.default.any},l.defaultProps={},t.default=l},59833:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement(a.EditableArea,{bordered:!0,placeholder:"input something"})}},10066:function(e,t,n){"use strict";var r=n(70655),a=r.__importStar(n(24698)),l=n(79136);t.Z=function(){var e=r.__read(a.useState(""),2),t=e[0],n=e[1];return a.default.createElement(l.EditableArea,{value:t,placeholder:"Input something",onChange:function(e){n(e)},width:400,onBlur:function(){console.log("EditableArea: onBlur")}})}},55912:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",{id:"popup-target",style:{height:200,overflow:"auto",position:"relative",padding:10}},r.default.createElement("div",{style:{height:100}}),r.default.createElement(a.EditableArea,{bordered:!0,placeholder:"scroll in container",getPopupContainer:function(){return document.querySelector("#popup-target")},maxHeight:100}),r.default.createElement("div",{style:{height:140}}))}}}]);