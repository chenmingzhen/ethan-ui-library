(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[155],{3007:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(54365),t=n.n(r),r=n(82281),o=n.n(r),r=n(70954),i=(0,r.default)("# Swiper *轮播2.0(无缝滚动)*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| transitionDuration | number | 450 | 过渡持续时间 |\r\n| className | string | 无 | 扩展className |\r\n| autoPlay | boolean | true | 是否自动播放 |\r\n| autoplayInterval | number | 2000 | 滚动到下一张的时间 |\r\n| dots | boolean | true | 是否显示面板指示点 |\r\n| arrows | boolean | true | 是否显示箭头 |\r\n| style | React.CSSProperties | 无 | Swiper的拓展样式 |\r\n| onChange | (current: number) => void | 无 | 切换面板的回调 |\r\n| renderArrow | (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode | 无 | 自定义箭头的渲染 |\r\n\r\n### 方法\r\n\r\n** *swiper的ref返回两个切换方法**\r\n\r\n| 名称 | 描述 | \r\n| --- | --- | \r\n| onPrev | 上一张 | \r\n| onNext | 下一张 |\r\n","# Swiper *Carousel 2.0(Seamless rolling)*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| transitionDuration | number | 450 | Transition duration |\r\n| className | string | none | Extend className |\r\n| autoPlay | boolean | true | auto play |\r\n| autoplayInterval | number | 2000 | scroll to the time of the next slide |\r\n| dots | boolean | true | whether to display panel indicator points |\r\n| arrows | boolean | true | whether to show arrows |\r\n| style | React.CSSProperties | none | swiper extends style |\r\n| onChange | (current: number) => void | none | switch panel callback |\r\n| renderArrow | (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode | none | custom arrow rendering |\r\n\r\n### Method\r\n\r\n** *Swiper's ref returns two toggle methods**\r\n\r\n| name | description | \r\n| --- | --- | \r\n| onPrev | prev slide  | \r\n| onNext | next slide |\r\n"),u=[{name:"1-basex",title:(0,r.default)("基本用法 \n 基本用法","Base \n Base"),component:n(84969).default,rawText:n(22504).Z}],c=t()(function(e){return l().createElement(o(),a()({},e,{source:i,examples:u}))})},22504:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- 基本用法\r\n * en - Base\r\n *    -- Base\r\n */\r\nimport React from 'react'\r\nimport { Swiper } from 'ethan-ui'\r\n\r\nconst style: React.CSSProperties = {\r\n    background: '#6c98d6',\r\n    lineHeight: '210px',\r\n    textAlign: 'center',\r\n    color: '#fff',\r\n    fontWeight: 700,\r\n    fontSize: '30px',\r\n}\r\n\r\nexport default () => {\r\n    return (\r\n        <Swiper style={{ height: 210, width: '100%' }}>\r\n            <div style={style}>1</div>\r\n            <div style={style}>2</div>\r\n            <div style={style}>3</div>\r\n        </Swiper>\r\n    )\r\n}\r\n"},95510:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=l(n(24698)),u=o(n(94184)),c=o(n(15660));n(62356);var s=n(36910);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=(0,i.useRef)(null);return(0,i.useEffect)(function(){var e=r.current;c.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),i.default.createElement("pre",{ref:r,className:(0,u.default)(t||"lang-jsx",(0,s.exampleClass)("pre"))},i.default.createElement("code",null,e))}},84241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},c=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=l(n(24698)),f=n(12101),d=o(n(21588)),m=n(36910),h=o(n(20164)),p=o(n(95510));t.default=s.default.memo(function(e){var t=e.component,n=e.id,r=e.rawText,a=void 0===r?"":r,l=e.title,o=c((0,s.useState)(!1),2),i=o[0],u=o[1],r=(0,s.useRef)((0,s.createElement)(t)).current,e=a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),o=c(l.split("\n")),t=o[0],a=o.slice(1),o=function(){u(!i)};return s.default.createElement(s.default.Fragment,null,t&&s.default.createElement("h3",{id:n},t),s.default.createElement(f.Lazyload,{placeholder:s.default.createElement("div",{className:(0,m.exampleClass)("placeholder")},s.default.createElement(f.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},s.default.createElement("div",{className:(0,m.exampleClass)("_",i&&"showcode")},s.default.createElement("div",{className:(0,m.exampleClass)("body")},r),0<l.length&&s.default.createElement("div",{className:(0,m.exampleClass)("desc")},a.map(function(e,t){return s.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),s.default.createElement("a",{className:(0,m.exampleClass)("toggle"),onClick:o},s.default.createElement(d.default,{name:i?"code-close":"code"}))),s.default.createElement(h.default,{height:i?"auto":0,easing:"linear",className:(0,m.exampleClass)("code"),duration:240},s.default.createElement(p.default,{value:e}),s.default.createElement("a",{className:(0,m.exampleClass)("toggle"),onClick:o},s.default.createElement(d.default,{name:i?"code-close":"code"}))))))})},82281:function(e,t,n){"use strict";var l=this&&this.__assign||function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e}).apply(this,arguments)},o=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},i=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=r(n(24698)),c=r(n(30724)),s=n(69087),a=n(17911),f=n(36910),d=r(n(70954)),m=r(n(95510)),h=r(n(84241)),p=r(n(86212)),v=/^<example name="([\w|-]+)"/,y=function(e,t){return 4===e?(0,a.getUidStr)():"".concat(e,"-").concat((t||"").replace(/[\W|-]/g,"-"))};t.default=u.default.memo(function(e){var t=e.onHeadingSet,r=e.examples,e=e.source,n=u.default.useRef([]).current;function a(e){n.push(e)}return u.default.useEffect(function(){null!=t&&t(n)},[]),u.default.createElement(c.default,{className:(0,f.markdownClass)("_"),source:e,renderers:{code:m.default,heading:function(e){var t=e.level,n=e.children,r="h".concat(t),e="heading-".concat(y(t,n[0]));return 2!==t&&3!==t||a({id:e,level:t,children:n}),u.default.createElement(r,{id:e},n)},html:function(e){if("<example />"===e.value)return function(){if(!r)return u.default.createElement("div",null);var e=(0,d.default)("示例","Example"),t="heading-example-h";return a({id:t,level:2,children:[e]}),i([u.default.createElement("h2",{key:"h",id:t},e)],o(r.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),r=o(e.title.split("\n"),1)[0];return a({id:n,level:3,children:[r]}),u.default.createElement(h.default,l({key:t,id:n},e))}})),!1)}();var t,n=e.value.match(v);return n?(t=n[1],(n=(r||[]).find(function(e){return e.name===t}))?u.default.createElement(h.default,l({},n)):null):"<br>"===e.value||"<br />"===e.value?u.default.createElement("br",null):null},table:p.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?u.default.createElement("a",{href:e.href,target:t},e.children):u.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})})},54365:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return a(t,e),t},i=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=l(n(24698)),c=n(12101),s=n(64744),f=n(36910),d=o(n(98789));t.default=function(o){return u.default.memo(function(e){var t=e.noNav,e=i((0,u.useState)(""),2),r=e[0],a=e[1],e=i((0,u.useState)([]),2),l=e[0],e=e[1],n=(0,s.useLocation)().hash;(0,u.useEffect)(function(){function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));(null==t?void 0:t.offsetTop)<=r&&(n=e.id)}),a(n))}var t;return e(),n&&(t=document.querySelector(n),setTimeout(function(){null!=t&&t.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[l]);return u.default.createElement("div",{className:(0,f.navClass)("_")},u.default.createElement(o,{onHeadingSet:e}),!t&&u.default.createElement(c.Sticky,{className:(0,f.navClass)("sticky"),top:50},u.default.createElement("div",{className:(0,f.navClass)("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return u.default.createElement("a",{key:t,className:(0,f.navClass)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===d.default.location.search.indexOf("?example=")?d.default.push("".concat(d.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(d.default.push("".concat(d.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))})}},86212:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,a,l=n.call(e),o=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)o.push(r.value)}catch(e){a={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(a)throw a.error}}return o},a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,a=0,l=t.length;a<l;a++)!r&&a in t||((r=r||Array.prototype.slice.call(t,0,a))[a]=t[a]);return e.concat(r||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=l(n(24698));t.default=function(e){var e=e.children,t=a([],r(e[1].props.children),!1);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return o.default.createElement("div",{style:{overflow:"auto"}},o.default.createElement("table",{className:"doc-api-table"},e[0],o.default.cloneElement(e[1],{children:t})))}},84969:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=r(n(24698)),l=n(12101),o={background:"#6c98d6",lineHeight:"210px",textAlign:"center",color:"#fff",fontWeight:700,fontSize:"30px"};t.default=function(){return a.default.createElement(l.Swiper,{style:{height:210,width:"100%"}},a.default.createElement("div",{style:o},"1"),a.default.createElement("div",{style:o},"2"),a.default.createElement("div",{style:o},"3"))}}}]);