(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[708],{32015:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(69048),u=n(85993),t=n(39174),o=(0,t.default)("# Loading *加载进度条*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| type | string | 'line' | 进度的类型 |\r\n| loadingText | string | 无 | 加载中文字，仅对全局加载生效，start中的第二个参数 |\r\n| color | string | 无 | 加载颜色 |\r\n| height | number | 5 | line进度的高度 |\r\n","# Loading \r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| type | string | 'line' | Type of progress |\r\n| loadingText | string | none | Load Chinese text, only for global loading, the second parameter in start |\r\n| color | string | none | Color in load |\r\n| height | number | 5 | The height of the line progress |\r\n"),i=[{name:"1-basex",title:(0,t.default)("基本用法 \n 开始加载,结束加载和错误加载","Base \n Start loading , end loading and error Loading"),component:n(80553).Z,rawText:n(56823).Z},{name:"2-customx",title:(0,t.default)("自定义 \n 自定义加载风格和加载进度","Customize \n Customize the loading style and loading schedule"),component:n(25433).Z,rawText:n(26741).Z},{name:"3-globalx",title:(0,t.default)("全局加载 \n 整屏设置加载中，加载图案参考Spin的type","Global loading \n Full screen Settings are loaded,Load the pattern with reference to the type of Spin"),component:n(68387).Z,rawText:n(79418).Z}],d=(0,r.default)(function(e){return l().createElement(u.ZP,a()({},e,{codes:void 0,source:o,examples:i}))})},56823:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- 开始加载,结束加载和错误加载\r\n * en - Base\r\n *    -- Start loading , end loading and error Loading\r\n */\r\n\r\nimport React from 'react'\r\nimport { Loading, Button } from 'ethan/index'\r\n\r\nexport default () => (\r\n  <div>\r\n    <Button onClick={() => Loading.start()}>start</Button>\r\n    <Button onClick={() => Loading.finish()} type=\"success\">\r\n      finish\r\n    </Button>\r\n    <Button onClick={() => Loading.error()} type=\"danger\">\r\n      error\r\n    </Button>\r\n  </div>\r\n)\r\n"},26741:function(e,t){"use strict";t.Z="/**\r\n * cn - 自定义\r\n *    -- 自定义加载风格和加载进度\r\n * en - Customize\r\n *    -- Customize the loading style and loading schedule\r\n */\r\n\r\nimport React from 'react'\r\nimport { Loading, Button } from 'ethan/index'\r\n\r\nexport default () => (\r\n  <div>\r\n    <Button\r\n      onClick={() =>\r\n        Loading.config({\r\n          type: 'line',\r\n          color: '#FF9812',\r\n          height: 25,\r\n        })\r\n      }\r\n    >\r\n      customize\r\n    </Button>\r\n    <Button onClick={() => Loading.upload(30)}>upload(30)</Button>\r\n    <Button onClick={() => Loading.upload(80)}>upload(80)</Button>\r\n  </div>\r\n)\r\n"},79418:function(e,t){"use strict";t.Z="/**\r\n * cn - 全局加载\r\n *    -- 整屏设置加载中，加载图案参考Spin的type\r\n * en - Global loading\r\n *    -- Full screen Settings are loaded,Load the pattern with reference to the type of Spin\r\n */\r\n\r\nimport React from 'react'\r\nimport { Loading, Button } from 'ethan/index'\r\n\r\nexport default () => {\r\n  const useLoading = React.useCallback(type => {\r\n    Loading.start(type, 'Loading')\r\n\r\n    setTimeout(() => {\r\n      Loading.finish()\r\n    }, 2000)\r\n  }, [])\r\n  return (\r\n    <div>\r\n      <Button onClick={() => useLoading('wave')}>wave</Button>\r\n      <Button onClick={() => useLoading('chasing-ring')}>chasing-ring</Button>\r\n      <Button onClick={() => useLoading('plane')}>scale-circle</Button>\r\n    </div>\r\n  )\r\n}\r\n"},54798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importStar(n(24698)),l=r.__importDefault(n(94184)),u=r.__importDefault(n(15660));n(62356);var o=n(78502);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=a.useRef(null);return a.useEffect(function(){var e=r.current;u.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),a.default.createElement("pre",{ref:r,className:l.default(t||"lang-jsx",o.exampleClass("pre"))},a.default.createElement("code",null,e))}},7595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var m=n(70655),p=m.__importStar(n(24698)),r=m.__importDefault(n(45697)),_=n(79136),g=m.__importDefault(n(22276)),h=m.__importDefault(n(69374)),v=n(78502),E=m.__importDefault(n(54798)),y=p.default.createElement("div",{className:v.exampleClass("placeholder")},p.default.createElement(_.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function a(e){var t=e.component,n=e.id,r=e.name,a=e.rawText,l=e.title,u=p.useRef(null),o=m.__read(p.useState(!1),2),i=o[0],d=o[1],c=m.__read(p.useState(p.createElement(t)),1)[0],e=m.__read(p.useState(),2),f=e[0],s=e[1],o=(m.__read(p.useState(),1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());p.useEffect(function(){u.current&&(u.current.style.height=i?f+"px":"0")},[i]);t=function(e){return p.default.createElement("a",{className:v.exampleClass("toggle"),onClick:function(e){d(!i)}.bind(null,e)},p.default.createElement(g.default,{name:i?"code-close":"code"}))},e=h.default.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=m.__read(l.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return p.default.createElement(p.Fragment,null,e&&p.default.createElement("h3",{key:"0",id:n},e),p.default.createElement(_.Lazyload,{placeholder:y},p.default.createElement("div",{className:v.exampleClass("_",i&&"showcode")},p.default.createElement("div",{className:v.exampleClass("body")},c),0<l.length&&p.default.createElement("div",{className:v.exampleClass("desc")},r.map(function(e,t){return p.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),p.default.createElement("div",{ref:u,className:v.exampleClass("code")},p.default.createElement(E.default,{onHighLight:function(e){s(e)},value:o}),t(!0)))))}(t.default=a).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},a.defaultProps={rawText:""}},71126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),u=n(78502),n=function(e){var t=e.children,e=a.__read(l.useState(!1),2),n=e[0],r=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return l.default.createElement("div",{onClick:function(){r(!n)},className:u.markdownClass("console")},l.default.createElement(t,null,e))};n.propTypes={children:r.default.array},n.defaultProps={children:[]},t.default=n},15302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),u=a.__importDefault(n(21046)),o=a.__importDefault(n(17866));t.default=function(){function e(e){var t=a.__read(l.useState(e.source),2),n=t[0],r=t[1];return l.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?l.default.createElement(u.default,a.__assign({},e,{source:n})):l.default.createElement(o.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},l.memo(e)}},21046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(70655),d=i.__importStar(n(24698)),r=i.__importDefault(n(45697)),c=i.__importDefault(n(30724)),f=n(73727),s=n(70914),m=n(78502),p=i.__importDefault(n(39174)),_=i.__importDefault(n(54798)),g=i.__importDefault(n(7595)),h=i.__importDefault(n(71126)),v=i.__importDefault(n(30681)),E=/^<code name="([\w|-]+)" /,y=/^<example name="([\w|-]+)"/;function a(e){var t=e.onHeadingSetted,a=e.codes,l=e.examples,e=e.source,n=i.__read(d.useState([]),1)[0],u=i.__read(d.useState({}),1)[0];d.useEffect(function(){t&&t(n)},[]);function o(e){n.push(e)}return d.default.createElement(c.default,{className:m.markdownClass("_"),source:e,renderers:{code:_.default,heading:function(e){var t,n=e.level,r=e.children,a=n+"-"+r[0],l="h"+n;return"object"==typeof r[0]?d.default.createElement(l,null,r):(u[a]||(e="heading-"+(t=n,e=r[0],4===t?s.getUidStr():t+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==n&&3!==n||o({id:e,level:n,children:r}),u[a]=d.default.createElement(l,{id:e},r)),u[a])},html:function(e){if("<example />"===e.value)return function(){if(u.examples)return u.examples;if(!l)return d.default.createElement("div",null);var e=p.default("示例","Example"),t="heading-example-h";return o({id:t,level:2,children:[e]}),u.examples=i.__spreadArray([d.default.createElement("h2",{key:"h",id:t},e)],i.__read(l.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-"+e.name,r=i.__read(e.title.split("\n"),1)[0];return o({id:n,level:3,children:[r]}),d.default.createElement(g.default,i.__assign({key:t,id:n},e))}}))),u.examples}();var t,n=e.value.match(y);if(n)return t=n[1],e.value.indexOf("noExpand"),u[r="example-"+t]||(n=(l||[]).find(function(e){return e.name===t}),u[r]=n?d.default.createElement(g.default,i.__assign({},n)):null),u[r];if("<br>"===e.value||"<br />"===e.value)return d.default.createElement("br",null);var r=e.value.match(E);return r?(e=r[1],(r=a[e])?i.__spreadArray([d.default.createElement(_.default,{key:"cb",value:r.text})],i.__read(r.log.map(function(e,t){return d.default.createElement(h.default,{key:t},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:v.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?d.default.createElement("a",{href:e.href,target:t},e.children):d.default.createElement(f.Link,{to:e.href,target:t},e.children)}}})}(t.default=a).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},a.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,t,n){"use strict";var r=n(70655),a=(r.__importDefault(n(24698)),r.__importDefault(n(15302))),l=(r.__importDefault(n(69048)),a.default());t.ZP=l},69048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var d=n(70655),c=d.__importStar(n(24698)),f=n(79136),s=n(64744),m=n(78502),p=d.__importDefault(n(69374));t.default=function(i){return function(e){var t=d.__read(c.useState(""),2),r=t[0],a=t[1],l=d.__read(c.useState([]),1)[0],n=e.location.hash,u=s.useUpdate(),t=c.useCallback(function(e){e.forEach(function(e){l.push(e)}),u()},[]),o=c.useCallback(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);c.useEffect(function(){o();function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#"+e.id);t&&t.offsetTop<=r&&(n=e.id)}),a(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return c.default.createElement("div",{className:m.navClass("_")},c.default.createElement(i,{onHeadingSetted:t}),!e.noNav&&c.default.createElement(f.Sticky,{className:m.navClass("sticky"),top:50},c.default.createElement("div",{className:m.navClass("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return c.default.createElement("a",{key:t,className:m.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===p.default.location.search.indexOf("?example=")?p.default.push(p.default.location.pathname+"?example="+e.replace("heading-","")):(p.default.push(p.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},30681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importDefault(n(24698)),n=r.__importDefault(n(45697));function l(e){var e=e.children,t=r.__spreadArray([],r.__read(e[1].props.children));try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return a.default.createElement("div",{style:{overflow:"auto"}},a.default.createElement("table",{className:"doc-api-table"},e[0],a.default.cloneElement(e[1],{children:t})))}l.propTypes={children:n.default.any},l.defaultProps={},t.default=l},80553:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{onClick:function(){return a.Loading.start()}},"start"),r.default.createElement(a.Button,{onClick:function(){return a.Loading.finish()},type:"success"},"finish"),r.default.createElement(a.Button,{onClick:function(){return a.Loading.error()},type:"danger"},"error"))}},25433:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{onClick:function(){return a.Loading.config({type:"line",color:"#FF9812",height:25})}},"customize"),r.default.createElement(a.Button,{onClick:function(){return a.Loading.upload(30)}},"upload(30)"),r.default.createElement(a.Button,{onClick:function(){return a.Loading.upload(80)}},"upload(80)"))}},68387:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){var e=r.default.useCallback(function(e){a.Loading.start(e,"Loading"),setTimeout(function(){a.Loading.finish()},2e3)},[]);return r.default.createElement("div",null,r.default.createElement(a.Button,{onClick:function(){return e("wave")}},"wave"),r.default.createElement(a.Button,{onClick:function(){return e("chasing-ring")}},"chasing-ring"),r.default.createElement(a.Button,{onClick:function(){return e("plane")}},"scale-circle"))}}}]);