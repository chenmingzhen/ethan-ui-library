(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[16],{70708:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(54365),t=n.n(r),r=n(82281),o=n.n(r),r=n(70954),u=(0,r.default)("# Textarea *多行文本框*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| autoSize | boolean | false | 高度是否随内容自动变化 |\r\n| defaultValue | string \\| number | | 默认值 |\r\n| name | string | 无 | Form 存取数据的名称 |\r\n| onChange | (value: string) => void | | 值改变回调函数 |\r\n| onEnterPress | (value: string) => void | | 回车键回调函数 |\r\n| placeholder | string | | 同原生 input 标签的 placeholder |\r\n| rows | number | 4 | 最小行高，同原生 textarea rows 属性 |\r\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 | \r\n| style | object | 无 | 最外层扩展样式 |\r\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |\r\n| resize | boolean | false | 是否可以伸缩高度 |\r\n| value | string \\| number | | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |\r\n| popoverProps | object | 无 | 校验弹框接受的属性，具体属性参考Popover组件说明 |\r\n| showCount | boolean | false | 显示长度 |","# Textarea\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| autoSize | boolean | false | Whether the height changes automatically with the content |\r\n| defaultValue | string \\| number | | default value |\r\n| name | string | none | The name that accesses data from Form |\r\n| onChange | (value: string) => void | | The callback function for changing value |\r\n| onEnterPress | (value: string) => void | | The callback function for enter key |\r\n| placeholder | string | | The same as the native placeholder tag. |\r\n| rows | number | 4 | The minimum row height. Same as native textarea rows property. |\r\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than | \r\n| style | object | - | Container element style |\r\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |\r\n| resize | boolean | false | support resize |\r\n| value | string \\| number | | DefaultValue and value can be set at the same time and defaultValue will be overridden by value. <br />In the Form, the value is taken over by the Form and lose efficacy. |\r\n| popoverProps | object | none | Validate popup properties, specific properties refer to Popover component description |\r\n| showCount | boolean | false | Show value length |\r\n"),i=[{name:"1-basex",title:(0,r.default)("基本用法 \n 多行文本输入框","Base \n Multi-line text input box"),component:n(28808).default,rawText:n(88820).Z},{name:"2-autosizex",title:(0,r.default)("自适应高度 \n autoSize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可","AutoSize \n When the autoSize property is true, component will change height to fit the content. Set maxHeight to limit maximum height."),component:n(79052).default,rawText:n(68918).Z},{name:"3-infox",title:(0,r.default)("信息 \n 设置 showCount, 设定最大长度，用户 focus 时会显示用户已输入文字长度。","Info \n Set showCount to true, set the maximum length, and the user's focus shows the length of text that the user has entered."),component:n(5277).default,rawText:n(11282).Z},{name:"4-customx",title:(0,r.default)("自定义信息 \n 可以通过设置 tip 为函数去自定义提示信息 \n 如果 info 返回类型为 Error，不会隐藏。","Custom Info \n can customize the tip by setting info as a function \n if the functio return an Error , the info doesn't hide"),component:n(34009).default,rawText:n(31154).Z}],c=t()(function(e){return l().createElement(o(),a()({},e,{source:u,examples:i}))})},88820:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- 多行文本输入框\r\n * en - Base\r\n *    -- Multi-line text input box\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return <Textarea rows={6} placeholder=\"input something\" />\r\n}\r\n"},68918:function(e,t){"use strict";t.Z="/**\r\n * cn - 自适应高度\r\n *    -- autoSize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可\r\n * en - AutoSize\r\n *    -- When the autoSize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan-ui'\r\n\r\nconst text = `a\r\nu\r\nt\r\no\r\ns\r\ni\r\nz\r\ne`\r\n\r\nexport default function() {\r\n    return (\r\n        <div>\r\n            <Textarea rows={2} autoSize maxHeight={200} placeholder=\"autoSize\" />\r\n            <br />\r\n            <Textarea rows={2} autoSize value={text} maxHeight={200} placeholder=\"autoSize\" />\r\n        </div>\r\n    )\r\n}\r\n"},11282:function(e,t){"use strict";t.Z="/**\r\n * cn - 信息\r\n *    -- 设置 showCount, 设定最大长度，用户 focus 时会显示用户已输入文字长度。\r\n * en - Info\r\n *    -- Set showCount to true, set the maximum length, and the user's focus shows the length of text that the user has entered.\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return <Textarea rows={4} trim placeholder=\"input something\" showCount maxLength={10} />\r\n}\r\n"},31154:function(e,t){"use strict";t.Z="/**\r\n * cn - 自定义信息\r\n *    -- 可以通过设置 tip 为函数去自定义提示信息\r\n *     -- 如果 info 返回类型为 Error，不会隐藏。\r\n * en - Custom Info\r\n *    -- can customize the tip by setting info as a function\r\n *    -- if the functio return an Error , the info doesn't hide\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan-ui'\r\n\r\nconst renderInfo = value => {\r\n    if (!value || value.length === 0) return null\r\n\r\n    const text = `total is  ${value.length}`\r\n\r\n    if (value.length <= 20) return text\r\n\r\n    return <span style={{ color: 'red' }}>{text}</span>\r\n}\r\n\r\nexport default function() {\r\n    return <Textarea rows={4} trim placeholder=\"input something\" tip={renderInfo} />\r\n}\r\n"},95510:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=l(n(24698)),i=o(n(94184)),c=o(n(15660));n(62356);var s=n(36910);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=(0,u.useRef)(null);return(0,u.useEffect)(function(){var e=r.current;c.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),u.default.createElement("pre",{ref:r,className:(0,i.default)(t||"lang-jsx",(0,s.exampleClass)("pre"))},u.default.createElement("code",null,e))}},84241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},c=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=l(n(24698)),f=n(12101),d=o(n(21588)),h=n(36910),m=o(n(20164)),p=o(n(95510));t.default=s.default.memo(function(e){var t=e.component,n=e.id,r=e.rawText,a=void 0===r?"":r,l=e.title,o=c((0,s.useState)(!1),2),u=o[0],i=o[1],r=(0,s.useRef)((0,s.createElement)(t)).current,e=a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),o=c(l.split("\n")),t=o[0],a=o.slice(1),o=function(){i(!u)};return s.default.createElement(s.default.Fragment,null,t&&s.default.createElement("h3",{id:n},t),s.default.createElement(f.Lazyload,{placeholder:s.default.createElement("div",{className:(0,h.exampleClass)("placeholder")},s.default.createElement(f.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},s.default.createElement("div",{className:(0,h.exampleClass)("_",u&&"showcode")},s.default.createElement("div",{className:(0,h.exampleClass)("body")},r),0<l.length&&s.default.createElement("div",{className:(0,h.exampleClass)("desc")},a.map(function(e,t){return s.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),s.default.createElement("a",{className:(0,h.exampleClass)("toggle"),onClick:o},s.default.createElement(d.default,{name:u?"code-close":"code"}))),s.default.createElement(m.default,{height:u?"auto":0,easing:"linear",className:(0,h.exampleClass)("code"),duration:240},s.default.createElement(p.default,{value:e}),s.default.createElement("a",{className:(0,h.exampleClass)("toggle"),onClick:o},s.default.createElement(d.default,{name:u?"code-close":"code"}))))))})},82281:function(e,t,n){"use strict";var l=this&&this.__assign||function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},u=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=r(n(24698)),c=r(n(30724)),s=n(69087),a=n(17911),f=n(36910),d=r(n(70954)),h=r(n(95510)),m=r(n(84241)),p=r(n(86212)),v=/^<example name="([\w|-]+)"/,g=function(e,t){return 4===e?(0,a.getUidStr)():"".concat(e,"-").concat((t||"").replace(/[\W|-]/g,"-"))};t.default=i.default.memo(function(e){var t=e.onHeadingSet,r=e.examples,e=e.source,n=i.default.useRef([]).current;function a(e){n.push(e)}return i.default.useEffect(function(){null!=t&&t(n)},[]),i.default.createElement(c.default,{className:(0,f.markdownClass)("_"),source:e,renderers:{code:h.default,heading:function(e){var t=e.level,n=e.children,r="h".concat(t),e="heading-".concat(g(t,n[0]));return 2!==t&&3!==t||a({id:e,level:t,children:n}),i.default.createElement(r,{id:e},n)},html:function(e){if("<example />"===e.value)return function(){if(!r)return i.default.createElement("div",null);var e=(0,d.default)("示例","Example"),t="heading-example-h";return a({id:t,level:2,children:[e]}),u([i.default.createElement("h2",{key:"h",id:t},e)],o(r.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),r=o(e.title.split("\n"),1)[0];return a({id:n,level:3,children:[r]}),i.default.createElement(m.default,l({key:t,id:n},e))}})),!1)}();var t,n=e.value.match(v);return n?(t=n[1],(n=(r||[]).find(function(e){return e.name===t}))?i.default.createElement(m.default,l({},n)):null):"<br>"===e.value||"<br />"===e.value?i.default.createElement("br",null):null},table:p.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?i.default.createElement("a",{href:e.href,target:t},e.children):i.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})})},54365:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},u=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=l(n(24698)),c=n(12101),s=n(64744),f=n(36910),d=o(n(98789));t.default=function(o){return i.default.memo(function(e){var t=e.noNav,e=u((0,i.useState)(""),2),r=e[0],a=e[1],e=u((0,i.useState)([]),2),l=e[0],e=e[1],n=(0,s.useLocation)().hash;(0,i.useEffect)(function(){function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));(null==t?void 0:t.offsetTop)<=r&&(n=e.id)}),a(n))}var t;return e(),n&&(t=document.querySelector(n),setTimeout(function(){null!=t&&t.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[l]);return i.default.createElement("div",{className:(0,f.navClass)("_")},i.default.createElement(o,{onHeadingSet:e}),!t&&i.default.createElement(c.Sticky,{className:(0,f.navClass)("sticky"),top:50},i.default.createElement("div",{className:(0,f.navClass)("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return i.default.createElement("a",{key:t,className:(0,f.navClass)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===d.default.location.search.indexOf("?example=")?d.default.push("".concat(d.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(d.default.push("".concat(d.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))})}},86212:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=l(n(24698));t.default=function(e){var e=e.children,t=a([],r(e[1].props.children),!1);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return o.default.createElement("div",{style:{overflow:"auto"}},o.default.createElement("table",{className:"doc-api-table"},e[0],o.default.cloneElement(e[1],{children:t})))}},28808:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101);t.default=function(){return a.default.createElement(l.Textarea,{rows:6,placeholder:"input something"})}},79052:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101),o="a\nu\nt\no\ns\ni\nz\ne";t.default=function(){return a.default.createElement("div",null,a.default.createElement(l.Textarea,{rows:2,autoSize:!0,maxHeight:200,placeholder:"autoSize"}),a.default.createElement("br",null),a.default.createElement(l.Textarea,{rows:2,autoSize:!0,value:o,maxHeight:200,placeholder:"autoSize"}))}},5277:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101);t.default=function(){return a.default.createElement(l.Textarea,{rows:4,trim:!0,placeholder:"input something",showCount:!0,maxLength:10})}},34009:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101),o=function(e){if(!e||0===e.length)return null;var t="total is  ".concat(e.length);return e.length<=20?t:a.default.createElement("span",{style:{color:"red"}},t)};t.default=function(){return a.default.createElement(l.Textarea,{rows:4,trim:!0,placeholder:"input something",tip:o})}}}]);