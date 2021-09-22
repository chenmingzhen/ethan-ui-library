(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[16],{59794:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return s}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(69048),o=n(85993),t=n(39174),u=(0,t.default)("# Textarea *多行文本框*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| autosize | boolean | false | 高度是否随内容自动变化 |\r\n| defaultValue | string \\| number | | 默认值 |\r\n| delay | number | 400 | 用户输入触发 onChange 和校验间隔时间，单位 毫秒。|\r\n| info | (value: string) => string \\| number | 无 | 提示信息 |\r\n| name | string | 无 | Form 存取数据的名称 |\r\n| onChange | (value: string) => void | | 值改变回调函数 |\r\n| onEnterPress | (value: string) => void | | 回车键回调函数 |\r\n| placeholder | string | | 同原生 input 标签的 placeholder |\r\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | | 信息弹出位置 |\r\n| rows | number | 4 | 最小行高，同原生 textarea rows 属性 |\r\n| maxHeight | number \\| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 | \r\n| style | object | 无 | 最外层扩展样式 |\r\n| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |\r\n| resize | boolean | false | 是否可以伸缩高度 |\r\n| value | string \\| number | | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |\r\n","# Textarea\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| autosize | boolean | false | Whether the height changes automatically with the content |\r\n| defaultValue | string \\| number | | default value |\r\n| delay | number | 400 | User input triggers onChange and to check interval, unit: ms.|\r\n| info | (value: string) => string \\| number | - | Infomation |\r\n| name | string | none | The name that accesses data from Form |\r\n| onChange | (value: string) => void | | The callback function for changing value |\r\n| onEnterPress | (value: string) => void | | The callback function for enter key |\r\n| placeholder | string | | The same as the native placeholder tag. |\r\n| popover | 'top-left' \\| 'top' \\| 'top-right' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | | The position where the message pops up |\r\n| rows | number | 4 | The minimum row height. Same as native textarea rows property. |\r\n| maxHeight | number \\| string | - | the maxHeight of the textarea, scroll bars appear after more than | \r\n| style | object | - | Container element style |\r\n| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |\r\n| resize | boolean | false | support resize |\r\n| value | string \\| number | | DefaultValue and value can be set at the same time and defaultValue will be overridden by value. <br />In the Form, the value is taken over by the Form and lose efficacy. |\r\n"),i=[{name:"1-basex",title:(0,t.default)("基本用法 \n 多行文本输入框","Base \n Multi-line text input box"),component:n(8691).Z,rawText:n(88820).Z},{name:"2-autosizex",title:(0,t.default)("自适应高度 \n autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可","Autosize \n When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height."),component:n(42948).Z,rawText:n(68918).Z},{name:"3-infox",title:(0,t.default)("信息 \n 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。 \n 如果超出长度， 则会报错. 不会隐藏。","Info \n Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered. \n If the length is exceeded, the error is reported. It is not hidden."),component:n(21312).Z,rawText:n(11282).Z},{name:"4-customx",title:(0,t.default)("自定义信息 \n 可以通过设置 info 为函数去自定义提示信息 \n 如果 info 返回类型为 Error，不会隐藏。","Custom Info \n can customize the info by setting info as a function \n if the functio return an Error , the info doesn't hide"),component:n(52556).Z,rawText:n(31154).Z}],s=(0,r.default)(function(e){return l().createElement(o.ZP,a()({},e,{codes:void 0,source:u,examples:i}))})},88820:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- 多行文本输入框\r\n * en - Base\r\n *    -- Multi-line text input box\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan'\r\n\r\nexport default function() {\r\n  return <Textarea rows={6} placeholder=\"input something\" />\r\n}\r\n"},68918:function(e,t){"use strict";t.Z="/**\r\n * cn - 自适应高度\r\n *    -- autosize 为 true 时，rows 为最小高度，如果要设置最大高度，使用 maxHeight 即可\r\n * en - Autosize\r\n *    -- When the autosize property is true, component will change height to fit the content. Set maxHeight to limit maximum height.\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan'\r\n\r\nconst text = `a\r\nu\r\nt\r\no\r\ns\r\ni\r\nz\r\ne`\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Textarea rows={2} autosize maxHeight={200} placeholder=\"autosize\" />\r\n      <br />\r\n      <Textarea rows={2} autosize value={text} maxHeight={200} placeholder=\"autosize\" />\r\n    </div>\r\n  )\r\n}\r\n"},11282:function(e,t){"use strict";t.Z="/**\r\n * cn - 信息\r\n *    -- 设置 info 为数字, 设定最大长度，用户 focus 时会显示用户已输入文字长度。\r\n *    -- 如果超出长度， 则会报错. 不会隐藏。\r\n * en - Info\r\n *    -- Set info to number, set the maximum length, and the user's focus shows the length of text that the user has entered.\r\n *    -- If the length is exceeded, the error is reported. It is not hidden.\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan'\r\n\r\nexport default function() {\r\n  return <Textarea rows={4} trim placeholder=\"input something\" info={10} />\r\n}\r\n"},31154:function(e,t){"use strict";t.Z="/**\r\n * cn - 自定义信息\r\n *    -- 可以通过设置 info 为函数去自定义提示信息\r\n *     -- 如果 info 返回类型为 Error，不会隐藏。\r\n * en - Custom Info\r\n *    -- can customize the info by setting info as a function\r\n *    -- if the functio return an Error , the info doesn't hide\r\n */\r\nimport React from 'react'\r\nimport { Textarea } from 'ethan'\r\n\r\nconst renderInfo = value => {\r\n  if (!value || value.length === 0) return null\r\n  const text = `total is  ${value.length}`\r\n  if (value.length <= 20) return text\r\n  return new Error(text)\r\n}\r\n\r\nexport default function() {\r\n  return <Textarea rows={4} trim placeholder=\"input something\" info={renderInfo} />\r\n}\r\n"},54798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importStar(n(24698)),l=r.__importDefault(n(94184)),o=r.__importDefault(n(15660));n(62356);var u=n(78502);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=a.useRef(null);return a.useEffect(function(){var e=r.current;o.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),a.default.createElement("pre",{ref:r,className:l.default(t||"lang-jsx",u.exampleClass("pre"))},a.default.createElement("code",null,e))}},7595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var m=n(70655),p=m.__importStar(n(24698)),r=m.__importDefault(n(45697)),h=n(79136),_=m.__importDefault(n(22276)),v=m.__importDefault(n(69374)),g=n(78502),x=m.__importDefault(n(54798)),E=p.default.createElement("div",{className:g.exampleClass("placeholder")},p.default.createElement(h.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function a(e){var t=e.component,n=e.id,r=e.name,a=e.rawText,l=e.title,o=p.useRef(null),u=m.__read(p.useState(!1),2),i=u[0],s=u[1],f=m.__read(p.useState(p.createElement(t)),1)[0],e=m.__read(p.useState(),2),c=e[0],d=e[1],u=(m.__read(p.useState(),1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());p.useEffect(function(){o.current&&(o.current.style.height=i?c+"px":"0")},[i]);t=function(e){return p.default.createElement("a",{className:g.exampleClass("toggle"),onClick:function(e){s(!i)}.bind(null,e)},p.default.createElement(_.default,{name:i?"code-close":"code"}))},e=v.default.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=m.__read(l.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return p.default.createElement(p.Fragment,null,e&&p.default.createElement("h3",{key:"0",id:n},e),p.default.createElement(h.Lazyload,{placeholder:E},p.default.createElement("div",{className:g.exampleClass("_",i&&"showcode")},p.default.createElement("div",{className:g.exampleClass("body")},f),0<l.length&&p.default.createElement("div",{className:g.exampleClass("desc")},r.map(function(e,t){return p.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),p.default.createElement("div",{ref:o,className:g.exampleClass("code")},p.default.createElement(x.default,{onHighLight:function(e){d(e)},value:u}),t(!0)))))}(t.default=a).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},a.defaultProps={rawText:""}},71126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),o=n(78502),n=function(e){var t=e.children,e=a.__read(l.useState(!1),2),n=e[0],r=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return l.default.createElement("div",{onClick:function(){r(!n)},className:o.markdownClass("console")},l.default.createElement(t,null,e))};n.propTypes={children:r.default.array},n.defaultProps={children:[]},t.default=n},15302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),o=a.__importDefault(n(21046)),u=a.__importDefault(n(17866));t.default=function(){function e(e){var t=a.__read(l.useState(e.source),2),n=t[0],r=t[1];return l.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?l.default.createElement(o.default,a.__assign({},e,{source:n})):l.default.createElement(u.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},l.memo(e)}},21046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(70655),s=i.__importStar(n(24698)),r=i.__importDefault(n(45697)),f=i.__importDefault(n(30724)),c=n(73727),d=n(70914),m=n(78502),p=i.__importDefault(n(39174)),h=i.__importDefault(n(54798)),_=i.__importDefault(n(7595)),v=i.__importDefault(n(71126)),g=i.__importDefault(n(30681)),x=/^<code name="([\w|-]+)" /,E=/^<example name="([\w|-]+)"/;function a(e){var t=e.onHeadingSetted,a=e.codes,l=e.examples,e=e.source,n=i.__read(s.useState([]),1)[0],o=i.__read(s.useState({}),1)[0];s.useEffect(function(){t&&t(n)},[]);function u(e){n.push(e)}return s.default.createElement(f.default,{className:m.markdownClass("_"),source:e,renderers:{code:h.default,heading:function(e){var t,n=e.level,r=e.children,a=n+"-"+r[0],l="h"+n;return"object"==typeof r[0]?s.default.createElement(l,null,r):(o[a]||(e="heading-"+(t=n,e=r[0],4===t?d.getUidStr():t+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==n&&3!==n||u({id:e,level:n,children:r}),o[a]=s.default.createElement(l,{id:e},r)),o[a])},html:function(e){if("<example />"===e.value)return function(){if(o.examples)return o.examples;if(!l)return s.default.createElement("div",null);var e=p.default("示例","Example"),t="heading-example-h";return u({id:t,level:2,children:[e]}),o.examples=i.__spreadArray([s.default.createElement("h2",{key:"h",id:t},e)],i.__read(l.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-"+e.name,r=i.__read(e.title.split("\n"),1)[0];return u({id:n,level:3,children:[r]}),s.default.createElement(_.default,i.__assign({key:t,id:n},e))}}))),o.examples}();var t,n=e.value.match(E);if(n)return t=n[1],e.value.indexOf("noExpand"),o[r="example-"+t]||(n=(l||[]).find(function(e){return e.name===t}),o[r]=n?s.default.createElement(_.default,i.__assign({},n)):null),o[r];if("<br>"===e.value||"<br />"===e.value)return s.default.createElement("br",null);var r=e.value.match(x);return r?(e=r[1],(r=a[e])?i.__spreadArray([s.default.createElement(h.default,{key:"cb",value:r.text})],i.__read(r.log.map(function(e,t){return s.default.createElement(v.default,{key:t},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:g.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?s.default.createElement("a",{href:e.href,target:t},e.children):s.default.createElement(c.Link,{to:e.href,target:t},e.children)}}})}(t.default=a).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},a.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,t,n){"use strict";var r=n(70655),a=(r.__importDefault(n(24698)),r.__importDefault(n(15302))),l=(r.__importDefault(n(69048)),a.default());t.ZP=l},69048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=n(70655),f=s.__importStar(n(24698)),c=n(79136),d=n(64744),m=n(78502),p=s.__importDefault(n(69374));t.default=function(i){return function(e){var t=s.__read(f.useState(""),2),r=t[0],a=t[1],l=s.__read(f.useState([]),1)[0],n=e.location.hash,o=d.useUpdate(),t=f.useCallback(function(e){e.forEach(function(e){l.push(e)}),o()},[]),u=f.useCallback(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);f.useEffect(function(){u();function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#"+e.id);t&&t.offsetTop<=r&&(n=e.id)}),a(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return f.default.createElement("div",{className:m.navClass("_")},f.default.createElement(i,{onHeadingSetted:t}),!e.noNav&&f.default.createElement(c.Sticky,{className:m.navClass("sticky"),top:50},f.default.createElement("div",{className:m.navClass("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return f.default.createElement("a",{key:t,className:m.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===p.default.location.search.indexOf("?example=")?p.default.push(p.default.location.pathname+"?example="+e.replace("heading-","")):(p.default.push(p.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},30681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importDefault(n(24698)),n=r.__importDefault(n(45697));function l(e){var e=e.children,t=r.__spreadArray([],r.__read(e[1].props.children));try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return a.default.createElement("div",{style:{overflow:"auto"}},a.default.createElement("table",{className:"doc-api-table"},e[0],a.default.cloneElement(e[1],{children:t})))}l.propTypes={children:n.default.any},l.defaultProps={},t.default=l},8691:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement(a.Textarea,{rows:6,placeholder:"input something"})}},42948:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Textarea,{rows:2,autosize:!0,maxHeight:200,placeholder:"autosize"}),r.default.createElement("br",null),r.default.createElement(a.Textarea,{rows:2,autosize:!0,value:"a\nu\nt\no\ns\ni\nz\ne",maxHeight:200,placeholder:"autosize"}))}},21312:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement(a.Textarea,{rows:4,trim:!0,placeholder:"input something",info:10})}},52556:function(e,t,n){"use strict";function r(e){if(!e||0===e.length)return null;var t="total is  "+e.length;return e.length<=20?t:new Error(t)}var a=n(70655).__importDefault(n(24698)),l=n(79136);t.Z=function(){return a.default.createElement(l.Textarea,{rows:4,trim:!0,placeholder:"input something",info:r})}}}]);