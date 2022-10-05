(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[393],{33509:function(e,r,t){"use strict";t.r(r),t.d(r,{default:function(){return c}});var n=t(67154),a=t.n(n),r=t(24698),l=t.n(r),n=t(54365),r=t.n(n),n=t(82281),o=t.n(n),n=t(70954),d=(0,n.default)("# Card *卡片*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Card\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| className | string | 无 | 扩展className |\r\n| collapsible | boolean \\| 'bottom' | false | 是否可折叠，'bottom' 表示从下方点击折叠 |\r\n| collapsed | boolean | 无 | 是否折叠，用于受控状态 |\r\n| defaultCollapsed | boolean | true | 初始折叠状态（仅在 collapsible 为 true 时有效） |\r\n| onCollapse | () => void | 无 | 折叠状态改变时回调事件 |\r\n| shadow | true \\| false \\| 'hover' | false | 是否显示阴影<br />'hover' - 鼠标移到元素上显示<br />true - 总是显示<br />false - 从不显示 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n| id | any | 无 | 手风琴下控制展开的值 |\r\n\r\n<br />\r\n\r\n### Card.Header, Card.Body, Card.Footer\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| className | string | 无 | 扩展className |\r\n| style | object | 无 | 最外层扩展样式 |\r\n\r\n<br />\r\n\r\n### Card.Accordion\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| active | any | 无 | 打开的值，全关闭时为 null，用于受控状态。默认为索引，若Card设置id后则为id。 |\r\n| defaultActive | any | 0 | 默认打开的值，用于非受控状态。默认为索引，若Card设置id后则为id。 |\r\n| onChange | () => void | 无 | 面板打开回调 |\r\n\r\n<br />\r\n\r\n### Card.Submit\r\n\r\n同 [Button](/components/Button)\r\n","# Card\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Card\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| className | string | none | Extend className |\r\n| collapsible | boolean \\| 'bottom' | false | Whether can be collapsed，'bottom' can collaps on bottom |\r\n| collapsed | boolean | - | Whether to be collapsed. |\r\n| defaultCollapsed | boolean | true | Initial collapsed state |\r\n| onCollapse | () => void | - | Callback when collapsed state changed |\r\n| shadow | true \\| false \\| 'hover' | false | Whether to show the shadow.<br />'hover' - Display it when the mouse is over the element.<br />true - Always show<br />false - Never show |\r\n| style | object | - | Container element style |\r\n| id | any | none | Card.Accordion expand controlled key |\r\n\r\n### Card.Header, Card.Body, Card.Footer\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| className | string | - | Extend className |\r\n| style | object | - | Element style |\r\n\r\n### Card.Accordion\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| active | any | none | Active value. It is -1 when fully closed. Used in controlled state. be id while Card.id setted |\r\n| defaultActive | any | 0 | The default active value for uncontrolled state, be id while Card.id setted|\r\n| onChange | () => void | none | The callback function when the panel is opened |\r\n\r\n### Card.Submit\r\n\r\nThe same as [Button](/components/Button)\r\n"),u=[{name:"1-basex",title:(0,n.default)("基本用法 \n Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用","Base \n The card is composed of three components: Header, Body, and Footer. It can be combined or used separately."),component:t(6519).default,rawText:t(45668).Z},{name:"2-boxshadowx",title:(0,n.default)("阴影 \n 可以通过 shadow 属性控制阴影","BoxShadow \n Set the shadow property to determined how to display the shadow."),component:t(14122).default,rawText:t(583).Z},{name:"4-collapsex",title:(0,n.default)("折叠 \n 设置 collapsible 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态","Collapse \n Set collapsible can collapse the Card panel."),component:t(56617).default,rawText:t(51307).Z},{name:"5-accordionx",title:(0,n.default)("手风琴 \n 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）","Accordion \n Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time."),component:t(55242).default,rawText:t(77146).Z}],c=r()(function(e){return l().createElement(o(),a()({},e,{source:d,examples:u}))})},45668:function(e,r){"use strict";r.Z="/**\r\n * cn - 基本用法\r\n *    -- Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用\r\n * en - Base\r\n *    -- The card is composed of three components: Header, Body, and Footer. It can be combined or used separately.\r\n */\r\nimport React from 'react'\r\nimport { Card } from 'ethan-ui'\r\n\r\nconst cardStyle = {\r\n    width: 240,\r\n    height: 300,\r\n    display: 'inline-flex',\r\n    marginRight: 20,\r\n}\r\nconst gray = { background: '#f7f7f7' }\r\n\r\nexport default function() {\r\n    return (\r\n        <div>\r\n            <Card style={cardStyle}>\r\n                <Card.Header>Header</Card.Header>\r\n                <Card.Body>Body</Card.Body>\r\n                <Card.Footer>Footer</Card.Footer>\r\n            </Card>\r\n\r\n            <Card style={cardStyle}>\r\n                <Card.Header style={gray}>Header</Card.Header>\r\n                <Card.Body>Body</Card.Body>\r\n                <Card.Footer style={gray}>Footer</Card.Footer>\r\n            </Card>\r\n        </div>\r\n    )\r\n}\r\n"},583:function(e,r){"use strict";r.Z="/**\r\n * cn - 阴影\r\n *    -- 可以通过 shadow 属性控制阴影\r\n * en - BoxShadow\r\n *    -- Set the shadow property to determined how to display the shadow.\r\n */\r\nimport React from 'react'\r\nimport { Card } from 'ethan-ui'\r\n\r\nconst cardStyle = {\r\n    width: 140,\r\n    display: 'inline-flex',\r\n    marginRight: 20,\r\n}\r\n\r\nexport default function() {\r\n    return (\r\n        <div>\r\n            <Card style={cardStyle}>\r\n                <Card.Body>Never</Card.Body>\r\n            </Card>\r\n\r\n            <Card style={cardStyle} shadow=\"hover\">\r\n                <Card.Body>Hover</Card.Body>\r\n            </Card>\r\n\r\n            <Card style={cardStyle} shadow>\r\n                <Card.Body>Always</Card.Body>\r\n            </Card>\r\n        </div>\r\n    )\r\n}\r\n"},51307:function(e,r){"use strict";r.Z="/**\r\n * cn - 折叠\r\n *    -- 设置 collapsible 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态\r\n * en - Collapse\r\n *    -- Set collapsible can collapse the Card panel.\r\n */\r\nimport React from 'react'\r\nimport { Card } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Card collapsible>\r\n            <Card.Header>Header</Card.Header>\r\n\r\n            <Card.Body>\r\n                <div style={{ height: 100 }} />\r\n            </Card.Body>\r\n        </Card>\r\n    )\r\n}\r\n"},77146:function(e,r){"use strict";r.Z="/**\r\n * cn - 手风琴\r\n *    -- 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）\r\n * en - Accordion\r\n *    -- Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time.\r\n */\r\nimport React from 'react'\r\nimport { Card } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Card.Accordion defaultActive={1}>\r\n            <Card>\r\n                <Card.Header>Header 1</Card.Header>\r\n                <Card.Body>Body</Card.Body>\r\n            </Card>\r\n            <Card>\r\n                <Card.Header>Header 2</Card.Header>\r\n                <Card.Body>Body</Card.Body>\r\n            </Card>\r\n            <Card>\r\n                <Card.Header>Header 3</Card.Header>\r\n                <Card.Body>Body</Card.Body>\r\n            </Card>\r\n        </Card.Accordion>\r\n    )\r\n}\r\n"},95510:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return a(r,e),r},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var d=l(t(24698)),u=o(t(94184)),c=o(t(15660));t(62356);var i=t(36910);r.default=function(e){var r=e.language,r=void 0===r?"lang-jsx":r,t=e.onHighLight,e=e.value,n=(0,d.useRef)(null);return(0,d.useEffect)(function(){var e=n.current;c.default.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),d.default.createElement("pre",{ref:n,className:(0,u.default)(r||"lang-jsx",(0,i.exampleClass)("pre"))},d.default.createElement("code",null,e))}},84241:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return a(r,e),r},c=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,l=t.call(e),o=[];try{for(;(void 0===r||0<r--)&&!(n=l.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=l.return)&&t.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var i=l(t(24698)),s=t(12101),f=o(t(21588)),m=t(36910),h=o(t(20164)),p=o(t(95510));r.default=i.default.memo(function(e){var r=e.component,t=e.id,n=e.rawText,a=void 0===n?"":n,l=e.title,o=c((0,i.useState)(!1),2),d=o[0],u=o[1],n=(0,i.useRef)((0,i.createElement)(r)).current,e=a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),o=c(l.split("\n")),r=o[0],a=o.slice(1),o=function(){u(!d)};return i.default.createElement(i.default.Fragment,null,r&&i.default.createElement("h3",{id:t},r),i.default.createElement(s.Lazyload,{placeholder:i.default.createElement("div",{className:(0,m.exampleClass)("placeholder")},i.default.createElement(s.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},i.default.createElement("div",{className:(0,m.exampleClass)("_",d&&"showcode")},i.default.createElement("div",{className:(0,m.exampleClass)("body")},n),0<l.length&&i.default.createElement("div",{className:(0,m.exampleClass)("desc")},a.map(function(e,r){return i.default.createElement("div",{key:r,dangerouslySetInnerHTML:{__html:e}})}),i.default.createElement("a",{className:(0,m.exampleClass)("toggle"),onClick:o},i.default.createElement(f.default,{name:d?"code-close":"code"}))),i.default.createElement(h.default,{height:d?"auto":0,easing:"linear",className:(0,m.exampleClass)("code"),duration:240},i.default.createElement(p.default,{value:e}),i.default.createElement("a",{className:(0,m.exampleClass)("toggle"),onClick:o},i.default.createElement(f.default,{name:d?"code-close":"code"}))))))})},82281:function(e,r,t){"use strict";var l=this&&this.__assign||function(){return(l=Object.assign||function(e){for(var r,t=1,n=arguments.length;t<n;t++)for(var a in r=arguments[t])Object.prototype.hasOwnProperty.call(r,a)&&(e[a]=r[a]);return e}).apply(this,arguments)},o=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,l=t.call(e),o=[];try{for(;(void 0===r||0<r--)&&!(n=l.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=l.return)&&t.call(l)}finally{if(a)throw a.error}}return o},d=this&&this.__spreadArray||function(e,r,t){if(t||2===arguments.length)for(var n,a=0,l=r.length;a<l;a++)!n&&a in r||((n=n||Array.prototype.slice.call(r,0,a))[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))},n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var u=n(t(24698)),c=n(t(30724)),i=t(69087),a=t(17911),s=t(36910),f=n(t(70954)),m=n(t(95510)),h=n(t(84241)),p=n(t(86212)),y=/^<example name="([\w|-]+)"/,C=function(e,r){return 4===e?(0,a.getUidStr)():"".concat(e,"-").concat((r||"").replace(/[\W|-]/g,"-"))};r.default=u.default.memo(function(e){var r=e.onHeadingSet,n=e.examples,e=e.source,t=u.default.useRef([]).current;function a(e){t.push(e)}return u.default.useEffect(function(){null!=r&&r(t)},[]),u.default.createElement(c.default,{className:(0,s.markdownClass)("_"),source:e,renderers:{code:m.default,heading:function(e){var r=e.level,t=e.children,n="h".concat(r),e="heading-".concat(C(r,t[0]));return 2!==r&&3!==r||a({id:e,level:r,children:t}),u.default.createElement(n,{id:e},t)},html:function(e){if("<example />"===e.value)return function(){if(!n)return u.default.createElement("div",null);var e=(0,f.default)("示例","Example"),r="heading-example-h";return a({id:r,level:2,children:[e]}),d([u.default.createElement("h2",{key:"h",id:r},e)],o(n.map(function(e,r){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),n=o(e.title.split("\n"),1)[0];return a({id:t,level:3,children:[n]}),u.default.createElement(h.default,l({key:r,id:t},e))}})),!1)}();var r,t=e.value.match(y);return t?(r=t[1],(t=(n||[]).find(function(e){return e.name===r}))?u.default.createElement(h.default,l({},t)):null):"<br>"===e.value||"<br />"===e.value?u.default.createElement("br",null):null},table:p.default,link:function(e){var r=0===e.href.indexOf("http")?"_blank":void 0;return r?u.default.createElement("a",{href:e.href,target:r},e.children):u.default.createElement(i.Link,{to:e.href,target:r},e.children)}}})})},54365:function(e,r,t){"use strict";var n=this&&this.__createBinding||(Object.create?function(e,r,t,n){void 0===n&&(n=t),Object.defineProperty(e,n,{enumerable:!0,get:function(){return r[t]}})}:function(e,r,t,n){void 0===n&&(n=t),e[n]=r[t]}),a=this&&this.__setModuleDefault||(Object.create?function(e,r){Object.defineProperty(e,"default",{enumerable:!0,value:r})}:function(e,r){e.default=r}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var r={};if(null!=e)for(var t in e)"default"!==t&&Object.prototype.hasOwnProperty.call(e,t)&&n(r,e,t);return a(r,e),r},d=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,l=t.call(e),o=[];try{for(;(void 0===r||0<r--)&&!(n=l.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=l.return)&&t.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var u=l(t(24698)),c=t(12101),i=t(64744),s=t(36910),f=o(t(98789));r.default=function(o){return u.default.memo(function(e){var r=e.noNav,e=d((0,u.useState)(""),2),n=e[0],a=e[1],e=d((0,u.useState)([]),2),l=e[0],e=e[1],t=(0,i.useLocation)().hash;(0,u.useEffect)(function(){function e(){var t,n=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(t=e[0].id,e.forEach(function(e){var r=document.querySelector("#".concat(e.id));(null==r?void 0:r.offsetTop)<=n&&(t=e.id)}),a(t))}var r;return e(),t&&(r=document.querySelector(t),setTimeout(function(){null!=r&&r.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[l]);return u.default.createElement("div",{className:(0,s.navClass)("_")},u.default.createElement(o,{onHeadingSet:e}),!r&&u.default.createElement(c.Sticky,{className:(0,s.navClass)("sticky"),top:50},u.default.createElement("div",{className:(0,s.navClass)("nav")},l.map(function(e,r){var t=e.children.filter(function(e){return"string"==typeof e});return u.default.createElement("a",{key:r,className:(0,s.navClass)("level-".concat(e.level),n===e.id&&"active"),onClick:function(e){0===f.default.location.search.indexOf("?example=")?f.default.push("".concat(f.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(f.default.push("".concat(f.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))})}},86212:function(e,r,t){"use strict";var n=this&&this.__read||function(e,r){var t="function"==typeof Symbol&&e[Symbol.iterator];if(!t)return e;var n,a,l=t.call(e),o=[];try{for(;(void 0===r||0<r--)&&!(n=l.next()).done;)o.push(n.value)}catch(e){a={error:e}}finally{try{n&&!n.done&&(t=l.return)&&t.call(l)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,r,t){if(t||2===arguments.length)for(var n,a=0,l=r.length;a<l;a++)!n&&a in r||((n=n||Array.prototype.slice.call(r,0,a))[a]=r[a]);return e.concat(n||Array.prototype.slice.call(r))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var o=l(t(24698));r.default=function(e){var e=e.children,r=a([],n(e[1].props.children),!1);try{r.sort(function(e,r){return e.props.children[0].props.children[0].localeCompare(r.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return o.default.createElement("div",{style:{overflow:"auto"}},o.default.createElement("table",{className:"doc-api-table"},e[0],o.default.cloneElement(e[1],{children:r})))}},6519:function(e,r,t){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var a=n(t(24698)),l=t(12101),o={width:240,height:300,display:"inline-flex",marginRight:20},d={background:"#f7f7f7"};r.default=function(){return a.default.createElement("div",null,a.default.createElement(l.Card,{style:o},a.default.createElement(l.Card.Header,null,"Header"),a.default.createElement(l.Card.Body,null,"Body"),a.default.createElement(l.Card.Footer,null,"Footer")),a.default.createElement(l.Card,{style:o},a.default.createElement(l.Card.Header,{style:d},"Header"),a.default.createElement(l.Card.Body,null,"Body"),a.default.createElement(l.Card.Footer,{style:d},"Footer")))}},14122:function(e,r,t){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var a=n(t(24698)),l=t(12101),o={width:140,display:"inline-flex",marginRight:20};r.default=function(){return a.default.createElement("div",null,a.default.createElement(l.Card,{style:o},a.default.createElement(l.Card.Body,null,"Never")),a.default.createElement(l.Card,{style:o,shadow:"hover"},a.default.createElement(l.Card.Body,null,"Hover")),a.default.createElement(l.Card,{style:o,shadow:!0},a.default.createElement(l.Card.Body,null,"Always")))}},56617:function(e,r,t){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var a=n(t(24698)),l=t(12101);r.default=function(){return a.default.createElement(l.Card,{collapsible:!0},a.default.createElement(l.Card.Header,null,"Header"),a.default.createElement(l.Card.Body,null,a.default.createElement("div",{style:{height:100}})))}},55242:function(e,r,t){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(r,"__esModule",{value:!0});var a=n(t(24698)),l=t(12101);r.default=function(){return a.default.createElement(l.Card.Accordion,{defaultActive:1},a.default.createElement(l.Card,null,a.default.createElement(l.Card.Header,null,"Header 1"),a.default.createElement(l.Card.Body,null,"Body")),a.default.createElement(l.Card,null,a.default.createElement(l.Card.Header,null,"Header 2"),a.default.createElement(l.Card.Body,null,"Body")),a.default.createElement(l.Card,null,a.default.createElement(l.Card.Header,null,"Header 3"),a.default.createElement(l.Card.Body,null,"Body")))}}}]);