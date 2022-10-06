(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[764],{22770:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(67154),l=n.n(r),t=n(24698),o=n.n(t),r=n(69048),a=n(85993),t=n(39174),i=(0,t.default)("# Tooltip *提示*\r\n\r\nTooltip 主要用来显示文字提示，如果需要显示更多内容，请使用 [Popover](/components/Popover)\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Tooltip\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| animation | boolean | true | 弹出是否使用动画，默认为 true |\r\n| className | string | 无 | 扩展className |\r\n| children | ReactNode | 必填 | 子元素只能为一个 ReactElement |\r\n| position | 'left' \\| 'top' \\| 'right' \\| 'bottom' | 'top' | 弹出层位置 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n| tip | ReactNode | 必填 | 弹出文字 | \r\n| trigger| string | \"hover\" | 弹出方式, 可选值: \\[\"hover\", \"click\"]|\r\n| disabledChild | boolean | false | 使被禁用的元素正常显示提示 |\r\n\r\n\r\n## 注意\r\n请确保 Popover 的父元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。\r\n","# Tooltip\r\n\r\nTooltip is used to display text prompts, and if you need to more content, use [Popover](/components/Popover).\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Tooltip\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| animation | boolean | true | use animation |\r\n| className | string | none | Extend className |\r\n| children | ReactNode | required | The child element can only be a ReactElement. |\r\n| position | 'left' \\| 'top' \\| 'right' \\| 'bottom' | 'top' | The position of the pop-up layer, options: \\['left', 'top', 'right', 'bottom'] |\r\n| style | object | null | extend style |\r\n| tip | ReactNode | required | Pop up texts |\r\n| trigger| string | \"hover\" | Pop-up type, one of  \\[\"hover\", \"click\"]\r\n| disabledChild | boolean | false | make disabled element work |\r\n\r\n\r\n### TooltipNote\r\nPlease ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.\r\n"),u=[{name:"1-basex",title:(0,t.default)("基本用法 \n 内置了四个弹出方向","Base \n There are four pop-up directions built in."),component:n(20843).Z,rawText:n(67891).Z},{name:"2-clickx",title:(0,t.default)("点击触发 \n 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 click","Click \n Set the trigger property to change the trigger event to 'click'."),component:n(50618).Z,rawText:n(40870).Z},{name:"3-disabled-innerx",title:(0,t.default)("禁用元素 \n 设置 disabledChild 来使内部禁用的元素正常工作","Disabled \n Set disabledChild make disabled child work"),component:n(5178).Z,rawText:n(29972).Z}],c=(0,r.default)(function(e){return o().createElement(a.ZP,l()({},e,{codes:void 0,source:i,examples:u}))})},67891:function(e,t){"use strict";t.Z='/**\r\n * cn - 基本用法\r\n *    -- 内置了四个弹出方向\r\n * en - Base\r\n *    -- There are four pop-up directions built in.\r\n */\r\nimport React from \'react\'\r\nimport { Tooltip, FontAwesome } from \'ethan\'\r\n\r\nconst fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Tooltip tip="Some text." position="left">\r\n        <FontAwesome name="arrow-circle-o-left" style={fontStyle} />\r\n      </Tooltip>\r\n      <Tooltip tip="Some text." position="top">\r\n        <FontAwesome name="arrow-circle-o-up" style={fontStyle} />\r\n      </Tooltip>\r\n      <Tooltip tip="Some text." position="bottom">\r\n        <FontAwesome name="arrow-circle-o-down" style={fontStyle} />\r\n      </Tooltip>\r\n      <Tooltip tip="Some text." position="right">\r\n        <FontAwesome name="arrow-circle-o-right" style={fontStyle} />\r\n      </Tooltip>\r\n    </div>\r\n  )\r\n}\r\n'},40870:function(e,t){"use strict";t.Z='/**\r\n * cn - 点击触发\r\n *    -- 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 click\r\n * en - Click\r\n *    -- Set the trigger property to change the trigger event to \'click\'.\r\n */\r\nimport React from \'react\'\r\nimport { Tooltip, FontAwesome } from \'ethan\'\r\n\r\nconst fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 }\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Tooltip tip="Some text." trigger="click" position="left">\r\n        <FontAwesome name="arrow-circle-o-left" style={fontStyle} />\r\n      </Tooltip>\r\n      <Tooltip tip="Some text." trigger="click" position="top">\r\n        <FontAwesome name="arrow-circle-o-up" style={fontStyle} />\r\n      </Tooltip>\r\n      <Tooltip tip="Some text." trigger="click" position="bottom" style={{ width: \'200px\' }}>\r\n        <FontAwesome name="arrow-circle-o-down" style={fontStyle} />\r\n      </Tooltip>\r\n      <Tooltip tip="Some text." trigger="click" position="right">\r\n        <FontAwesome name="arrow-circle-o-right" style={fontStyle} />\r\n      </Tooltip>\r\n    </div>\r\n  )\r\n}\r\n'},29972:function(e,t){"use strict";t.Z="/**\r\n * cn - 禁用元素\r\n *    -- 设置 disabledChild 来使内部禁用的元素正常工作\r\n * en - Disabled\r\n *    -- Set disabledChild make disabled child work\r\n */\r\nimport React from 'react'\r\nimport { Tooltip, Button } from 'ethan'\r\n\r\nexport default function() {\r\n    return (\r\n        <div>\r\n            <Tooltip tip=\"Some text.\" disabledChild>\r\n                <Button disabled>Disabled</Button>\r\n            </Tooltip>\r\n        </div>\r\n    )\r\n}\r\n"},54798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),l=r.__importStar(n(24698)),o=r.__importDefault(n(94184)),a=r.__importDefault(n(15660));n(62356);var i=n(78502);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=l.useRef(null);return l.useEffect(function(){var e=r.current;a.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),l.default.createElement("pre",{ref:r,className:o.default(t||"lang-jsx",i.exampleClass("pre"))},l.default.createElement("code",null,e))}},7595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var p=n(70655),m=p.__importStar(n(24698)),r=p.__importDefault(n(45697)),h=n(79136),_=p.__importDefault(n(22276)),v=p.__importDefault(n(69374)),g=n(78502),E=p.__importDefault(n(54798)),y=m.default.createElement("div",{className:g.exampleClass("placeholder")},m.default.createElement(h.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function l(e){var t=e.component,n=e.id,r=e.name,l=e.rawText,o=e.title,a=m.useRef(null),i=p.__read(m.useState(!1),2),u=i[0],c=i[1],d=p.__read(m.useState(m.createElement(t)),1)[0],e=p.__read(m.useState(),2),s=e[0],f=e[1],i=(p.__read(m.useState(),1)[0],l.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());m.useEffect(function(){a.current&&(a.current.style.height=u?s+"px":"0")},[u]);t=function(e){return m.default.createElement("a",{className:g.exampleClass("toggle"),onClick:function(e){c(!u)}.bind(null,e)},m.default.createElement(_.default,{name:u?"code-close":"code"}))},e=v.default.location.search,l="?example=";if(0===e.indexOf(l)&&(e=e.replace(l,""),r.indexOf(e)<0))return null;r=p.__read(o.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return m.default.createElement(m.Fragment,null,e&&m.default.createElement("h3",{key:"0",id:n},e),m.default.createElement(h.Lazyload,{placeholder:y},m.default.createElement("div",{className:g.exampleClass("_",u&&"showcode")},m.default.createElement("div",{className:g.exampleClass("body")},d),0<o.length&&m.default.createElement("div",{className:g.exampleClass("desc")},r.map(function(e,t){return m.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),m.default.createElement("div",{ref:a,className:g.exampleClass("code")},m.default.createElement(E.default,{onHighLight:function(e){f(e)},value:i}),t(!0)))))}(t.default=l).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},l.defaultProps={rawText:""}},71126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n(70655),o=l.__importStar(n(24698)),r=l.__importDefault(n(45697)),a=n(78502),n=function(e){var t=e.children,e=l.__read(o.useState(!1),2),n=e[0],r=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return o.default.createElement("div",{onClick:function(){r(!n)},className:a.markdownClass("console")},o.default.createElement(t,null,e))};n.propTypes={children:r.default.array},n.defaultProps={children:[]},t.default=n},15302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=n(70655),o=l.__importStar(n(24698)),r=l.__importDefault(n(45697)),a=l.__importDefault(n(21046)),i=l.__importDefault(n(17866));t.default=function(){function e(e){var t=l.__read(o.useState(e.source),2),n=t[0],r=t[1];return o.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?o.default.createElement(a.default,l.__assign({},e,{source:n})):o.default.createElement(i.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},o.memo(e)}},21046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n(70655),c=u.__importStar(n(24698)),r=u.__importDefault(n(45697)),d=u.__importDefault(n(30724)),s=n(73727),f=n(70914),p=n(78502),m=u.__importDefault(n(39174)),h=u.__importDefault(n(54798)),_=u.__importDefault(n(7595)),v=u.__importDefault(n(71126)),g=u.__importDefault(n(30681)),E=/^<code name="([\w|-]+)" /,y=/^<example name="([\w|-]+)"/;function l(e){var t=e.onHeadingSetted,l=e.codes,o=e.examples,e=e.source,n=u.__read(c.useState([]),1)[0],a=u.__read(c.useState({}),1)[0];c.useEffect(function(){t&&t(n)},[]);function i(e){n.push(e)}return c.default.createElement(d.default,{className:p.markdownClass("_"),source:e,renderers:{code:h.default,heading:function(e){var t,n=e.level,r=e.children,l=n+"-"+r[0],o="h"+n;return"object"==typeof r[0]?c.default.createElement(o,null,r):(a[l]||(e="heading-"+(t=n,e=r[0],4===t?f.getUidStr():t+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==n&&3!==n||i({id:e,level:n,children:r}),a[l]=c.default.createElement(o,{id:e},r)),a[l])},html:function(e){if("<example />"===e.value)return function(){if(a.examples)return a.examples;if(!o)return c.default.createElement("div",null);var e=m.default("示例","Example"),t="heading-example-h";return i({id:t,level:2,children:[e]}),a.examples=u.__spreadArray([c.default.createElement("h2",{key:"h",id:t},e)],u.__read(o.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-"+e.name,r=u.__read(e.title.split("\n"),1)[0];return i({id:n,level:3,children:[r]}),c.default.createElement(_.default,u.__assign({key:t,id:n},e))}}))),a.examples}();var t,n=e.value.match(y);if(n)return t=n[1],e.value.indexOf("noExpand"),a[r="example-"+t]||(n=(o||[]).find(function(e){return e.name===t}),a[r]=n?c.default.createElement(_.default,u.__assign({},n)):null),a[r];if("<br>"===e.value||"<br />"===e.value)return c.default.createElement("br",null);var r=e.value.match(E);return r?(e=r[1],(r=l[e])?u.__spreadArray([c.default.createElement(h.default,{key:"cb",value:r.text})],u.__read(r.log.map(function(e,t){return c.default.createElement(v.default,{key:t},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:g.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?c.default.createElement("a",{href:e.href,target:t},e.children):c.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})}(t.default=l).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},l.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,t,n){"use strict";var r=n(70655),l=(r.__importDefault(n(24698)),r.__importDefault(n(15302))),o=(r.__importDefault(n(69048)),l.default());t.ZP=o},69048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=n(70655),d=c.__importStar(n(24698)),s=n(79136),f=n(64744),p=n(78502),m=c.__importDefault(n(69374));t.default=function(u){return function(e){var t=c.__read(d.useState(""),2),r=t[0],l=t[1],o=c.__read(d.useState([]),1)[0],n=e.location.hash,a=f.useUpdate(),t=d.useCallback(function(e){e.forEach(function(e){o.push(e)}),a()},[]),i=d.useCallback(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);d.useEffect(function(){i();function e(){var n,r=document.documentElement.scrollTop,e=o.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#"+e.id);t&&t.offsetTop<=r&&(n=e.id)}),l(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return d.default.createElement("div",{className:p.navClass("_")},d.default.createElement(u,{onHeadingSetted:t}),!e.noNav&&d.default.createElement(s.Sticky,{className:p.navClass("sticky"),top:50},d.default.createElement("div",{className:p.navClass("nav")},o.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return d.default.createElement("a",{key:t,className:p.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===m.default.location.search.indexOf("?example=")?m.default.push(m.default.location.pathname+"?example="+e.replace("heading-","")):(m.default.push(m.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},30681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),l=r.__importDefault(n(24698)),n=r.__importDefault(n(45697));function o(e){var e=e.children,t=r.__spreadArray([],r.__read(e[1].props.children));try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return l.default.createElement("div",{style:{overflow:"auto"}},l.default.createElement("table",{className:"doc-api-table"},e[0],l.default.cloneElement(e[1],{children:t})))}o.propTypes={children:n.default.any},o.defaultProps={},t.default=o},20843:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),l=n(79136),o={fontSize:20,lineHeight:1,margin:4};t.Z=function(){return r.default.createElement("div",null,r.default.createElement(l.Tooltip,{tip:"Some text.",position:"left"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-left",style:o})),r.default.createElement(l.Tooltip,{tip:"Some text.",position:"top"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-up",style:o})),r.default.createElement(l.Tooltip,{tip:"Some text.",position:"bottom"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-down",style:o})),r.default.createElement(l.Tooltip,{tip:"Some text.",position:"right"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-right",style:o})))}},50618:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),l=n(79136),o={fontSize:20,lineHeight:1,margin:4};t.Z=function(){return r.default.createElement("div",null,r.default.createElement(l.Tooltip,{tip:"Some text.",trigger:"click",position:"left"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-left",style:o})),r.default.createElement(l.Tooltip,{tip:"Some text.",trigger:"click",position:"top"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-up",style:o})),r.default.createElement(l.Tooltip,{tip:"Some text.",trigger:"click",position:"bottom",style:{width:"200px"}},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-down",style:o})),r.default.createElement(l.Tooltip,{tip:"Some text.",trigger:"click",position:"right"},r.default.createElement(l.FontAwesome,{name:"arrow-circle-o-right",style:o})))}},5178:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),l=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(l.Tooltip,{tip:"Some text.",disabledChild:!0},r.default.createElement(l.Button,{disabled:!0},"Disabled")))}}}]);