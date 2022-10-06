(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[355],{40771:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(67154),l=n.n(r),t=n(24698),a=n.n(t),r=n(54365),t=n.n(r),r=n(82281),o=n.n(r),r=n(70954),i=(0,r.default)("# Alert _提示框_\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Alert\r\n\r\n| 属性      | 类型                                                    | 默认值    | 说明                                                                                |\r\n| --------- | ------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------- |\r\n| children  | ReactNode                                               | 无        | 内容，文字或 react 组件                                                             |\r\n| className | string                                                  | 无        | 扩展 className                                                                      |\r\n| icon      | ReactNode \\| boolean                                    | 无        | 为 true 时，根据 type 属性显示状态图标。如果需要显示自定义图标，传入 ReactElement。 |\r\n| iconSize  | number                                                  | 14        | icon 的尺寸                                                                         |\r\n| onClose   | () => void \\| boolean                                   | 无        | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可       |\r\n| style     | object                                                  | 无        | 最外层扩展样式                                                                      |\r\n| type      | 'success' \\| 'info' \\| 'warning' \\| 'danger' \\| 'error' | _warning_ | 4 选 1                                                                              |\r\n\r\n### Alert.ScrollAlert\r\n\r\n**_Alert.ScrollAlert 的 Api 包含 Alert 所有的属性，但是注意 Alert.ScrollAlert 的优先级高于 Alert，且内部都需要为 Alert 组件_**\r\n\r\n| 属性           | 类型     | 默认值 | 说明                                               |\r\n| -------------- | -------- | ------ | -------------------------------------------------- |\r\n| scrollInterval | number   | 5000   | 滚动时间的间距                                     |\r\n| onClose        | ()=>void | 无     | 所有节点被关闭的回调                               |\r\n| style          | object   | 无     | 用于统一设置 Alert 的样式 勿添加 Margin 影响计算值 |\r\n","# Alert\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Alert\r\n\r\n| Property  | Type                                                    | Default   | Description                                                                                                                                     |\r\n| --------- | ------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |\r\n| children  | ReactNode                                               | -         | Content, text or react component                                                                                                                |\r\n| className | string                                                  | -         | Extend className                                                                                                                                |\r\n| icon      | ReactNode \\| boolean                                    | -         | When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement. |\r\n| iconSize  | number                                                  | 14        | The size for icon                                                                                                                               |\r\n| onClose   | () => void \\| boolean                                   | -         | When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.                            |\r\n| style     | object                                                  | -         | Container element style                                                                                                                         |\r\n| type      | 'success' \\| 'info' \\| 'warning' \\| 'danger' \\| 'error' | _warning_ | type of alert                                                                                                                                   |\r\n\r\n### Alert.ScrollAlert\r\n\r\n**The Alert.ScrollAlert API contains all the properties of Alert, but note that Alert.ScrollAlert takes precedence over Alert and needs to be an Alert component internally**\r\n\r\n| Property       | Type     | Default | Description                                                                                    |\r\n| -------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- |\r\n| scrollInterval | number   | 5000    | The spacing of scrolling times                                                                 |\r\n| onClose        | ()=>void | none    | Callback when all nodes are shut down                                                          |\r\n| style          | object   | none    | The style used to uniformly set the Alert should not add Margin to affect the calculated value |\r\n"),c=[{name:"1-basex",title:(0,r.default)("基本用法 \n 基本的使用","Base \n Basic usage"),component:n(69689).default,rawText:n(14675).Z},{name:"2-typex",title:(0,r.default)("类型 \n 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning","type \n There are four built-in types (styles), [success, info, warning, danger], the default value is warning."),component:n(22263).default,rawText:n(19737).Z},{name:"3-closex",title:(0,r.default)("关闭 \n 设置 onClose 属性时，显示关闭按钮 \n onClose 为 true 时，只关闭提示，不处理 \n onClose 为函数时，关闭后调用此函数","onClose \n When the onClose property is set, the close button is displayed. \n When the onClose property is true, only hide the component. \n When the onClose is a function, call this function after hiding it."),component:n(15231).default,rawText:n(27850).Z},{name:"4-iconx",title:(0,r.default)("内置图标 \n 设置 icon 属性可以显示内置的图标，不同类型的图标见示例","Icon \n Set the icon property to display the built-in icon."),component:n(70553).default,rawText:n(40317).Z},{name:"5-scrollx",title:(0,r.default)("滚动 \n 滚动的使用","Scroll \n Scroll usage"),component:n(11227).default,rawText:n(41495).Z}],u=t()(function(e){return a().createElement(o(),l()({},e,{source:i,examples:c}))})},14675:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- 基本的使用\r\n * en - Base\r\n *    -- Basic usage\r\n */\r\nimport React from 'react'\r\nimport { Alert } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Alert>\r\n            <h3>Title</h3>\r\n            Some content.\r\n        </Alert>\r\n    )\r\n}\r\n"},19737:function(e,t){"use strict";t.Z='/**\r\n * cn - 类型\r\n *    -- 内置了 4 种类型（样式），[success, info, warning, danger]，默认为 warning\r\n * en - type\r\n *    -- There are four built-in types (styles), [success, info, warning, danger], the default value is warning.\r\n */\r\nimport React from \'react\'\r\nimport { Alert } from \'ethan-ui\'\r\n\r\nexport default function() {\r\n    return (\r\n        <div>\r\n            <Alert type="success">Success Type.</Alert>\r\n            <Alert type="info">Info Type.</Alert>\r\n            <Alert type="warning">Warning Type.</Alert>\r\n            <Alert type="danger">Danger Type.</Alert>\r\n        </div>\r\n    )\r\n}\r\n'},27850:function(e,t){"use strict";t.Z="/**\r\n * cn - 关闭\r\n *    -- 设置 onClose 属性时，显示关闭按钮\r\n *    -- onClose 为 true 时，只关闭提示，不处理\r\n *    -- onClose 为函数时，关闭后调用此函数\r\n * en - onClose\r\n *    -- When the onClose property is set, the close button is displayed.\r\n *    -- When the onClose property is true, only hide the component.\r\n *    -- When the onClose is a function, call this function after hiding it.\r\n */\r\nimport React from 'react'\r\nimport { Alert } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    const [placeholder, setPlaceholder] = React.useState('')\r\n\r\n    return (\r\n        <div>\r\n            <Alert onClose>Alert onClose=true</Alert>\r\n\r\n            <Alert\r\n                onClose={() => {\r\n                    setPlaceholder('Alert was dismissed.')\r\n                }}\r\n            >\r\n                Alert onClose=function\r\n            </Alert>\r\n\r\n            {placeholder && <Alert type=\"info\">{placeholder}</Alert>}\r\n        </div>\r\n    )\r\n}\r\n"},40317:function(e,t){"use strict";t.Z='/**\r\n * cn - 内置图标\r\n *    -- 设置 icon 属性可以显示内置的图标，不同类型的图标见示例\r\n * en - Icon\r\n *    -- Set the icon property to display the built-in icon.\r\n */\r\nimport React from \'react\'\r\nimport { Alert } from \'ethan-ui\'\r\n\r\nexport default function() {\r\n    return (\r\n        <div>\r\n            <Alert type="success" icon>\r\n                Success Type.\r\n            </Alert>\r\n            <Alert type="info" icon>\r\n                Info Type.\r\n            </Alert>\r\n            <Alert type="warning" icon>\r\n                Warning Type.\r\n            </Alert>\r\n            <Alert type="danger" icon>\r\n                Danger Type.\r\n            </Alert>\r\n\r\n            <Alert icon iconSize={24} style={{ padding: 20 }}>\r\n                <h3>Set iconSize</h3>\r\n                iconSize=24\r\n            </Alert>\r\n        </div>\r\n    )\r\n}\r\n'},41495:function(e,t){"use strict";t.Z='/**\r\n * cn - 滚动\r\n *    -- 滚动的使用\r\n * en - Scroll\r\n *    -- Scroll usage\r\n */\r\nimport React from \'react\'\r\nimport { Alert } from \'ethan-ui\'\r\n\r\nexport default function() {\r\n    return (\r\n        <>\r\n            <div>\r\n                <Alert.Scroll\r\n                    onClose={() => {\r\n                        console.log(\'all close\')\r\n                    }}\r\n                >\r\n                    <Alert type="success" icon>\r\n                        Success Type.\r\n                    </Alert>\r\n                    <Alert type="info" icon>\r\n                        Info Type.\r\n                    </Alert>\r\n                    <Alert type="warning" icon>\r\n                        Warning Type.\r\n                    </Alert>\r\n                    <Alert type="danger" icon>\r\n                        Danger Type.\r\n                    </Alert>\r\n                </Alert.Scroll>\r\n            </div>\r\n            <div style={{ marginTop: \'20px\' }}>\r\n                <Alert.Scroll style={{ padding: \'20px\' }}>\r\n                    <Alert icon iconSize={24} type="success">\r\n                        <h3>Set iconSize</h3>\r\n                        iconSize=24\r\n                    </Alert>\r\n                    <Alert icon iconSize={24} type="info">\r\n                        <h3>Set iconSize</h3>\r\n                        iconSize=24\r\n                    </Alert>\r\n                    <Alert icon iconSize={24} type="warning">\r\n                        <h3>Set iconSize</h3>\r\n                        iconSize=24\r\n                    </Alert>\r\n                    <Alert icon iconSize={24} type="danger">\r\n                        <h3>Set iconSize</h3>\r\n                        iconSize=24\r\n                    </Alert>\r\n                </Alert.Scroll>\r\n            </div>\r\n        </>\r\n    )\r\n}\r\n'},95510:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return l(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(n(24698)),c=o(n(94184)),u=o(n(15660));n(62356);var s=n(36910);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=(0,i.useRef)(null);return(0,i.useEffect)(function(){var e=r.current;u.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),i.default.createElement("pre",{ref:r,className:(0,c.default)(t||"lang-jsx",(0,s.exampleClass)("pre"))},i.default.createElement("code",null,e))}},84241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return l(t,e),t},u=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,l,a=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)o.push(r.value)}catch(e){l={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(l)throw l.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=a(n(24698)),f=n(12101),d=o(n(21588)),p=n(36910),m=o(n(20164)),h=o(n(95510));t.default=s.default.memo(function(e){var t=e.component,n=e.id,r=e.rawText,l=void 0===r?"":r,a=e.title,o=u((0,s.useState)(!1),2),i=o[0],c=o[1],r=(0,s.useRef)((0,s.createElement)(t)).current,e=l.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),o=u(a.split("\n")),t=o[0],l=o.slice(1),o=function(){c(!i)};return s.default.createElement(s.default.Fragment,null,t&&s.default.createElement("h3",{id:n},t),s.default.createElement(f.Lazyload,{placeholder:s.default.createElement("div",{className:(0,p.exampleClass)("placeholder")},s.default.createElement(f.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},s.default.createElement("div",{className:(0,p.exampleClass)("_",i&&"showcode")},s.default.createElement("div",{className:(0,p.exampleClass)("body")},r),0<a.length&&s.default.createElement("div",{className:(0,p.exampleClass)("desc")},l.map(function(e,t){return s.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),s.default.createElement("a",{className:(0,p.exampleClass)("toggle"),onClick:o},s.default.createElement(d.default,{name:i?"code-close":"code"}))),s.default.createElement(m.default,{height:i?"auto":0,easing:"linear",className:(0,p.exampleClass)("code"),duration:240},s.default.createElement(h.default,{value:e}),s.default.createElement("a",{className:(0,p.exampleClass)("toggle"),onClick:o},s.default.createElement(d.default,{name:i?"code-close":"code"}))))))})},82281:function(e,t,n){"use strict";var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var l in t=arguments[n])Object.prototype.hasOwnProperty.call(t,l)&&(e[l]=t[l]);return e}).apply(this,arguments)},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,l,a=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)o.push(r.value)}catch(e){l={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(l)throw l.error}}return o},i=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,l=0,a=t.length;l<a;l++)!r&&l in t||((r=r||Array.prototype.slice.call(t,0,l))[l]=t[l]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=r(n(24698)),u=r(n(30724)),s=n(69087),l=n(17911),f=n(36910),d=r(n(70954)),p=r(n(95510)),m=r(n(84241)),h=r(n(86212)),y=/^<example name="([\w|-]+)"/,v=function(e,t){return 4===e?(0,l.getUidStr)():"".concat(e,"-").concat((t||"").replace(/[\W|-]/g,"-"))};t.default=c.default.memo(function(e){var t=e.onHeadingSet,r=e.examples,e=e.source,n=c.default.useRef([]).current;function l(e){n.push(e)}return c.default.useEffect(function(){null!=t&&t(n)},[]),c.default.createElement(u.default,{className:(0,f.markdownClass)("_"),source:e,renderers:{code:p.default,heading:function(e){var t=e.level,n=e.children,r="h".concat(t),e="heading-".concat(v(t,n[0]));return 2!==t&&3!==t||l({id:e,level:t,children:n}),c.default.createElement(r,{id:e},n)},html:function(e){if("<example />"===e.value)return function(){if(!r)return c.default.createElement("div",null);var e=(0,d.default)("示例","Example"),t="heading-example-h";return l({id:t,level:2,children:[e]}),i([c.default.createElement("h2",{key:"h",id:t},e)],o(r.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),r=o(e.title.split("\n"),1)[0];return l({id:n,level:3,children:[r]}),c.default.createElement(m.default,a({key:t,id:n},e))}})),!1)}();var t,n=e.value.match(y);return n?(t=n[1],(n=(r||[]).find(function(e){return e.name===t}))?c.default.createElement(m.default,a({},n)):null):"<br>"===e.value||"<br />"===e.value?c.default.createElement("br",null):null},table:h.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?c.default.createElement("a",{href:e.href,target:t},e.children):c.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})})},54365:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return l(t,e),t},i=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,l,a=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)o.push(r.value)}catch(e){l={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(l)throw l.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=a(n(24698)),u=n(12101),s=n(64744),f=n(36910),d=o(n(98789));t.default=function(o){return c.default.memo(function(e){var t=e.noNav,e=i((0,c.useState)(""),2),r=e[0],l=e[1],e=i((0,c.useState)([]),2),a=e[0],e=e[1],n=(0,s.useLocation)().hash;(0,c.useEffect)(function(){function e(){var n,r=document.documentElement.scrollTop,e=a.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));(null==t?void 0:t.offsetTop)<=r&&(n=e.id)}),l(n))}var t;return e(),n&&(t=document.querySelector(n),setTimeout(function(){null!=t&&t.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[a]);return c.default.createElement("div",{className:(0,f.navClass)("_")},c.default.createElement(o,{onHeadingSet:e}),!t&&c.default.createElement(u.Sticky,{className:(0,f.navClass)("sticky"),top:50},c.default.createElement("div",{className:(0,f.navClass)("nav")},a.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return c.default.createElement("a",{key:t,className:(0,f.navClass)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===d.default.location.search.indexOf("?example=")?d.default.push("".concat(d.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(d.default.push("".concat(d.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))})}},86212:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,l,a=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)o.push(r.value)}catch(e){l={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(l)throw l.error}}return o},l=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,l=0,a=t.length;l<a;l++)!r&&l in t||((r=r||Array.prototype.slice.call(t,0,l))[l]=t[l]);return e.concat(r||Array.prototype.slice.call(t))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=a(n(24698));t.default=function(e){var e=e.children,t=l([],r(e[1].props.children),!1);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return o.default.createElement("div",{style:{overflow:"auto"}},o.default.createElement("table",{className:"doc-api-table"},e[0],o.default.cloneElement(e[1],{children:t})))}},69689:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=r(n(24698)),a=n(12101);t.default=function(){return l.default.createElement(a.Alert,null,l.default.createElement("h3",null,"Title"),"Some content.")}},22263:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=r(n(24698)),a=n(12101);t.default=function(){return l.default.createElement("div",null,l.default.createElement(a.Alert,{type:"success"},"Success Type."),l.default.createElement(a.Alert,{type:"info"},"Info Type."),l.default.createElement(a.Alert,{type:"warning"},"Warning Type."),l.default.createElement(a.Alert,{type:"danger"},"Danger Type."))}},15231:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,l,a=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)o.push(r.value)}catch(e){l={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(l)throw l.error}}return o},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(24698)),o=n(12101);t.default=function(){var e=r(a.default.useState(""),2),t=e[0],n=e[1];return a.default.createElement("div",null,a.default.createElement(o.Alert,{onClose:!0},"Alert onClose=true"),a.default.createElement(o.Alert,{onClose:function(){n("Alert was dismissed.")}},"Alert onClose=function"),t&&a.default.createElement(o.Alert,{type:"info"},t))}},70553:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=r(n(24698)),a=n(12101);t.default=function(){return l.default.createElement("div",null,l.default.createElement(a.Alert,{type:"success",icon:!0},"Success Type."),l.default.createElement(a.Alert,{type:"info",icon:!0},"Info Type."),l.default.createElement(a.Alert,{type:"warning",icon:!0},"Warning Type."),l.default.createElement(a.Alert,{type:"danger",icon:!0},"Danger Type."),l.default.createElement(a.Alert,{icon:!0,iconSize:24,style:{padding:20}},l.default.createElement("h3",null,"Set iconSize"),"iconSize=24"))}},11227:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=r(n(24698)),a=n(12101);t.default=function(){return l.default.createElement(l.default.Fragment,null,l.default.createElement("div",null,l.default.createElement(a.Alert.Scroll,{onClose:function(){console.log("all close")}},l.default.createElement(a.Alert,{type:"success",icon:!0},"Success Type."),l.default.createElement(a.Alert,{type:"info",icon:!0},"Info Type."),l.default.createElement(a.Alert,{type:"warning",icon:!0},"Warning Type."),l.default.createElement(a.Alert,{type:"danger",icon:!0},"Danger Type."))),l.default.createElement("div",{style:{marginTop:"20px"}},l.default.createElement(a.Alert.Scroll,{style:{padding:"20px"}},l.default.createElement(a.Alert,{icon:!0,iconSize:24,type:"success"},l.default.createElement("h3",null,"Set iconSize"),"iconSize=24"),l.default.createElement(a.Alert,{icon:!0,iconSize:24,type:"info"},l.default.createElement("h3",null,"Set iconSize"),"iconSize=24"),l.default.createElement(a.Alert,{icon:!0,iconSize:24,type:"warning"},l.default.createElement("h3",null,"Set iconSize"),"iconSize=24"),l.default.createElement(a.Alert,{icon:!0,iconSize:24,type:"danger"},l.default.createElement("h3",null,"Set iconSize"),"iconSize=24"))))}}}]);