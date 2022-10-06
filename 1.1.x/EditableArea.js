(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[978],{80627:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(54365),t=n.n(r),r=n(82281),o=n.n(r),r=n(70954),i=(0,r.default)("# EditableArea *可编辑域*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | string | 无 | 设置初始值 |\r\n| value | string | 无 | 受控时，传入的value |\r\n| className | string | 无 | 扩展外层className |\r\n| onChange | (value: string) => void | 无 | 值改变时的回调函数，和value一起设置时使组件受控 |\r\n| style | object | 无 | 组件最外层的扩展样式 |\r\n| bordered | boolean | false | 是否显示外边框 |\r\n| disabled | boolean | false | 是否禁用 |\r\n| clearable | boolean | true | 是否展示清除按钮 |\r\n| placeholder | string | 无 | 同原生 textarea 标签的 placeholder |\r\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符 |\r\n| onBlur | (e: MouseEvent) => void | 无 | 失去焦点事件 |\r\n| onFocus | (e: MouseEvent) => void | 无 | 聚焦事件 |\r\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 | \r\n| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |\r\n| width | number \\| string | 无 | 编辑域宽度 |","# EditableArea\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | string | none | Set initial value |\r\n| value | string | none | The value passed in when controlled |\r\n| className | string | none | The outermost extension className of a component |\r\n| onChange | (value: string) => void | none | Callback function when the value changes, making the component controlled when set with value |\r\n| style | object | none | The outermost extension style of a component |\r\n| bordered | boolean | false | Whether to show the border |\r\n| disabled | boolean | false | Whether to disable |\r\n| clearable | boolean | true | Whether to show the clear button |\r\n| placeholder | string | none | The same as the native placeholder tag |\r\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus |\r\n| onBlur | (e: MouseEvent) => void | none | blur event |\r\n| onFocus | (e: MouseEvent) => void | none | focus event |\r\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than | \r\n| getPopupContainer | () => HTMLElement | none | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |\r\n| width | number \\| string | none | width of the editablearea |"),u=[{name:"01-basex",title:(0,r.default)("基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替","Base \n Editablearea displays one line by default, and more than one line is replaced by ..."),component:n(5843).default,rawText:n(14536).Z},{name:"02-controlledx",title:(0,r.default)("受控 \n 传递value, onChange使组件受控","Controlled \n Pass value and onChange props to make the component controlled"),component:n(15446).default,rawText:n(14648).Z},{name:"03-containerx",title:(0,r.default)("自定义容器 \n 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动","Custom container \n use getPopupContainer return target container"),component:n(10826).default,rawText:n(17339).Z}],c=t()(function(e){return l().createElement(o(),a()({},e,{source:i,examples:u}))})},14536:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- EditableArea 默认展示一行，超过一行的内容用...代替\r\n * en - Base\r\n *    -- Editablearea displays one line by default, and more than one line is replaced by ...\r\n */\r\n\r\nimport React from 'react'\r\nimport { EditableArea } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return <EditableArea bordered placeholder=\"input something\" />\r\n}\r\n"},14648:function(e,t){"use strict";t.Z="/**\r\n * cn - 受控\r\n *    -- 传递value, onChange使组件受控\r\n * en - Controlled\r\n *    -- Pass value and onChange props to make the component controlled\r\n */\r\n\r\nimport React, { useState } from 'react'\r\nimport { EditableArea } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    const [value, setValue] = useState('')\r\n    return (\r\n        <EditableArea\r\n            value={value}\r\n            placeholder=\"Input something\"\r\n            onChange={val => {\r\n                setValue(val)\r\n            }}\r\n            width={400}\r\n            onBlur={() => {\r\n                console.log('EditableArea: onBlur')\r\n            }}\r\n        />\r\n    )\r\n}\r\n"},17339:function(e,t){"use strict";t.Z="/**\r\n * cn - 自定义容器\r\n *    -- 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动\r\n * en - Custom container\r\n *    -- use getPopupContainer return target container\r\n */\r\nimport React from 'react'\r\nimport { EditableArea } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <div id=\"popup-target\" style={{ height: 200, overflow: 'auto', position: 'relative', padding: 10 }}>\r\n            <div style={{ height: 100 }} />\r\n            <EditableArea\r\n                bordered\r\n                placeholder=\"scroll in container\"\r\n                getPopupContainer={() => document.querySelector('#popup-target')}\r\n                maxHeight={100}\r\n            />\r\n            <div style={{ height: 140 }} />\r\n        </div>\r\n    )\r\n}\r\n"},95510:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=l(n(24698)),u=o(n(94184)),c=o(n(15660));n(62356);var d=n(36910);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=(0,i.useRef)(null);return(0,i.useEffect)(function(){var e=r.current;c.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),i.default.createElement("pre",{ref:r,className:(0,u.default)(t||"lang-jsx",(0,d.exampleClass)("pre"))},i.default.createElement("code",null,e))}},84241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},c=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var d=l(n(24698)),s=n(12101),f=o(n(21588)),h=n(36910),m=o(n(20164)),p=o(n(95510));t.default=d.default.memo(function(e){var t=e.component,n=e.id,r=e.rawText,a=void 0===r?"":r,l=e.title,o=c((0,d.useState)(!1),2),i=o[0],u=o[1],r=(0,d.useRef)((0,d.createElement)(t)).current,e=a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),o=c(l.split("\n")),t=o[0],a=o.slice(1),o=function(){u(!i)};return d.default.createElement(d.default.Fragment,null,t&&d.default.createElement("h3",{id:n},t),d.default.createElement(s.Lazyload,{placeholder:d.default.createElement("div",{className:(0,h.exampleClass)("placeholder")},d.default.createElement(s.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},d.default.createElement("div",{className:(0,h.exampleClass)("_",i&&"showcode")},d.default.createElement("div",{className:(0,h.exampleClass)("body")},r),0<l.length&&d.default.createElement("div",{className:(0,h.exampleClass)("desc")},a.map(function(e,t){return d.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),d.default.createElement("a",{className:(0,h.exampleClass)("toggle"),onClick:o},d.default.createElement(f.default,{name:i?"code-close":"code"}))),d.default.createElement(m.default,{height:i?"auto":0,easing:"linear",className:(0,h.exampleClass)("code"),duration:240},d.default.createElement(p.default,{value:e}),d.default.createElement("a",{className:(0,h.exampleClass)("toggle"),onClick:o},d.default.createElement(f.default,{name:i?"code-close":"code"}))))))})},82281:function(e,t,n){"use strict";var l=this&&this.__assign||function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},i=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=r(n(24698)),c=r(n(30724)),d=n(69087),a=n(17911),s=n(36910),f=r(n(70954)),h=r(n(95510)),m=r(n(84241)),p=r(n(86212)),v=/^<example name="([\w|-]+)"/,b=function(e,t){return 4===e?(0,a.getUidStr)():"".concat(e,"-").concat((t||"").replace(/[\W|-]/g,"-"))};t.default=u.default.memo(function(e){var t=e.onHeadingSet,r=e.examples,e=e.source,n=u.default.useRef([]).current;function a(e){n.push(e)}return u.default.useEffect(function(){null!=t&&t(n)},[]),u.default.createElement(c.default,{className:(0,s.markdownClass)("_"),source:e,renderers:{code:h.default,heading:function(e){var t=e.level,n=e.children,r="h".concat(t),e="heading-".concat(b(t,n[0]));return 2!==t&&3!==t||a({id:e,level:t,children:n}),u.default.createElement(r,{id:e},n)},html:function(e){if("<example />"===e.value)return function(){if(!r)return u.default.createElement("div",null);var e=(0,f.default)("示例","Example"),t="heading-example-h";return a({id:t,level:2,children:[e]}),i([u.default.createElement("h2",{key:"h",id:t},e)],o(r.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),r=o(e.title.split("\n"),1)[0];return a({id:n,level:3,children:[r]}),u.default.createElement(m.default,l({key:t,id:n},e))}})),!1)}();var t,n=e.value.match(v);return n?(t=n[1],(n=(r||[]).find(function(e){return e.name===t}))?u.default.createElement(m.default,l({},n)):null):"<br>"===e.value||"<br />"===e.value?u.default.createElement("br",null):null},table:p.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?u.default.createElement("a",{href:e.href,target:t},e.children):u.default.createElement(d.Link,{to:e.href,target:t},e.children)}}})})},54365:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=l(n(24698)),c=n(12101),d=n(64744),s=n(36910),f=o(n(98789));t.default=function(o){return u.default.memo(function(e){var t=e.noNav,e=i((0,u.useState)(""),2),r=e[0],a=e[1],e=i((0,u.useState)([]),2),l=e[0],e=e[1],n=(0,d.useLocation)().hash;(0,u.useEffect)(function(){function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));(null==t?void 0:t.offsetTop)<=r&&(n=e.id)}),a(n))}var t;return e(),n&&(t=document.querySelector(n),setTimeout(function(){null!=t&&t.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[l]);return u.default.createElement("div",{className:(0,s.navClass)("_")},u.default.createElement(o,{onHeadingSet:e}),!t&&u.default.createElement(c.Sticky,{className:(0,s.navClass)("sticky"),top:50},u.default.createElement("div",{className:(0,s.navClass)("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return u.default.createElement("a",{key:t,className:(0,s.navClass)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===f.default.location.search.indexOf("?example=")?f.default.push("".concat(f.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(f.default.push("".concat(f.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))})}},86212:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=l(n(24698));t.default=function(e){var e=e.children,t=a([],r(e[1].props.children),!1);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return o.default.createElement("div",{style:{overflow:"auto"}},o.default.createElement("table",{className:"doc-api-table"},e[0],o.default.cloneElement(e[1],{children:t})))}},5843:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101);t.default=function(){return a.default.createElement(l.EditableArea,{bordered:!0,placeholder:"input something"})}},15446:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o};Object.defineProperty(t,"__esModule",{value:!0});var i=l(n(24698)),u=n(12101);t.default=function(){var e=o((0,i.useState)(""),2),t=e[0],n=e[1];return i.default.createElement(u.EditableArea,{value:t,placeholder:"Input something",onChange:function(e){n(e)},width:400,onBlur:function(){console.log("EditableArea: onBlur")}})}},10826:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101);t.default=function(){return a.default.createElement("div",{id:"popup-target",style:{height:200,overflow:"auto",position:"relative",padding:10}},a.default.createElement("div",{style:{height:100}}),a.default.createElement(l.EditableArea,{bordered:!0,placeholder:"scroll in container",getPopupContainer:function(){return document.querySelector("#popup-target")},maxHeight:100}),a.default.createElement("div",{style:{height:140}}))}}}]);