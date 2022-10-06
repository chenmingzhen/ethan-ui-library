(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[24],{215:function(e,n,t){"use strict";var r=t(12),u=t.n(r),s=t(1),p=t.n(s),f=t(34),m=t(27),d=t(42),g=t(44);n.a=function(c){return function(e){var n=Object(s.useState)(""),n=u()(n,2),r=n[0],a=n[1],n=Object(s.useState)([]),o=u()(n,1)[0],t=e.location.hash,l=Object(m.useUpdate)(),n=Object(s.useCallback)(function(e){e.forEach(function(e){o.push(e)}),l()},[]),i=Object(s.useCallback)(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);Object(s.useEffect)(function(){i();function e(){var t,r=document.documentElement.scrollTop,e=o.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#".concat(e.id));n&&n.offsetTop<=r&&(t=e.id)}),a(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return p.a.createElement("div",{className:Object(d.f)("_")},p.a.createElement(c,{onHeadingSetted:n}),!e.noNav&&p.a.createElement(f.G,{className:Object(d.f)("sticky"),top:50},p.a.createElement("div",{className:Object(d.f)("nav")},o.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return p.a.createElement("a",{key:n,className:Object(d.f)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===g.a.location.search.indexOf("?example=")?g.a.push("".concat(g.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(g.a.push("".concat(g.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},216:function(e,n,t){"use strict";var r=t(8),c=t.n(r),m=t(1),d=t.n(m),r=t(12),g=t.n(r),r=t(0),a=t.n(r),r=t(25),u=t.n(r),r=t(23),s=t.n(r),r=t(217),p=t.n(r),f=t(49),h=t(14),b=t(42),v=t(35),r=t(10),o=t.n(r),r=t(218),l=t.n(r),x=(t(219),function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=Object(m.useRef)(null);return Object(m.useEffect)(function(){var e=r.current;l.a.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),d.a.createElement("pre",{ref:r,className:o()(n||"lang-jsx",Object(b.a)("pre"))},d.a.createElement("code",null,e))}),r=t(74),y=t.n(r),E=t(34),S=t(72),j=t(44),O=d.a.createElement("div",{className:Object(b.a)("placeholder")},d.a.createElement(E.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function z(e){var n=e.component,t=e.id,r=e.name,a=e.rawText,o=e.title,l=Object(m.useRef)(null),i=Object(m.useState)(!1),c=g()(i,2),u=c[0],s=c[1],e=Object(m.useState)(Object(m.createElement)(n)),i=g()(e,1)[0],c=Object(m.useState)(),n=g()(c,2),p=n[0],f=n[1],e=Object(m.useState)(),c=(g()(e,1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(m.useEffect)(function(){l.current&&(l.current.style.height=u?"".concat(p,"px"):"0")},[u]);n=function(e){return d.a.createElement("a",{className:Object(b.a)("toggle"),onClick:function(e){s(!u)}.bind(null,e)},d.a.createElement(S.a,{name:u?"code-close":"code"}))},e=j.a.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=o.split("\n"),e=y()(r),r=e[0],e=e.slice(1),r=r&&r.trim();return d.a.createElement(m.Fragment,null,r&&d.a.createElement("h3",{key:"0",id:t},r),d.a.createElement(E.r,{placeholder:O},d.a.createElement("div",{className:Object(b.a)("_",u&&"showcode")},d.a.createElement("div",{className:Object(b.a)("body")},i),0<o.length&&d.a.createElement("div",{className:Object(b.a)("desc")},e.map(function(e,n){return d.a.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),d.a.createElement("div",{ref:l,className:Object(b.a)("code")},d.a.createElement(x,{onHighLight:function(e){f(e)},value:c}),n(!0)))))}z.propTypes={component:a.a.func.isRequired,id:a.a.string,name:a.a.string,rawText:a.a.string,title:a.a.string.isRequired},z.defaultProps={rawText:""};r=function(e){var n=e.children,e=Object(m.useState)(!1),e=g()(e,2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return d.a.createElement("div",{onClick:function(){r(!t)},className:Object(b.e)("console")},d.a.createElement(n,null,e))};r.propTypes={children:a.a.array},r.defaultProps={children:[]};var w=r;function i(e){var e=e.children,n=s()(e[1].props.children);try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return d.a.createElement("div",{style:{overflow:"auto"}},d.a.createElement("table",{className:"doc-api-table"},e[0],d.a.cloneElement(e[1],{children:n})))}i.propTypes={children:a.a.any},i.defaultProps={};var k=i,P=/^<code name="([\w|-]+)" /,C=/^<example name="([\w|-]+)"/;function T(e){var n=e.onHeadingSetted,a=e.codes,o=e.examples,t=e.source,e=Object(m.useState)([]),r=g()(e,1)[0],e=Object(m.useState)({}),l=g()(e,1)[0];Object(m.useEffect)(function(){n&&n(r)},[]);function i(e){r.push(e)}return d.a.createElement(p.a,{className:Object(b.e)("_"),source:t,renderers:{code:x,heading:function(e){var n,t=e.level,r=e.children,a="".concat(t,"-").concat(r[0]),o="h".concat(t);return"object"===u()(r[0])?d.a.createElement(o,null,r):(l[a]||(e="heading-".concat((n=t,e=r[0],4===n?Object(h.c)():"".concat(n,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==t&&3!==t||i({id:e,level:t,children:r}),l[a]=d.a.createElement(o,{id:e},r)),l[a])},html:function(e){if("<example />"===e.value)return function(){if(l.examples)return l.examples;if(!o)return d.a.createElement("div",null);var e=Object(v.b)("示例","Example"),n="heading-example-h";return i({id:n,level:2,children:[e]}),l.examples=[d.a.createElement("h2",{key:"h",id:n},e)].concat(s()(o.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-".concat(e.name),r=e.title.split("\n"),r=g()(r,1)[0];return i({id:t,level:3,children:[r]}),d.a.createElement(z,c()({key:n,id:t},e))}}))),l.examples}();var n,t=e.value.match(C);if(t)return n=t[1],e.value.indexOf("noExpand"),r="example-".concat(n),l[r]||(t=(o||[]).find(function(e){return e.name===n}),l[r]=t?d.a.createElement(z,t):null),l[r];if("<br>"===e.value||"<br />"===e.value)return d.a.createElement("br",null);var r=e.value.match(P);return r?(e=r[1],(r=a[e])?[d.a.createElement(x,{key:"cb",value:r.text})].concat(s()(r.log.map(function(e,n){return d.a.createElement(w,{key:n},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:k,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?d.a.createElement("a",{href:e.href,target:n},e.children):d.a.createElement(f.a,{to:e.href,target:n},e.children)}}})}T.propTypes={children:a.a.oneOfType([a.a.element,a.a.array]),codes:a.a.object,examples:a.a.array,onHeadingSetted:a.a.func,source:a.a.string.isRequired},T.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var N=t(73),R=(t(215),L.propTypes={loader:a.a.func,source:a.a.string},L.defaultProps={loader:void 0,source:void 0},Object(m.memo)(L));function L(e){var n=Object(m.useState)(e.source),t=g()(n,2),n=t[0],r=t[1];return Object(m.useEffect)(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?d.a.createElement(T,c()({},e,{source:n})):d.a.createElement(N.a,{style:{minHeight:200}})}n.a=R},732:function(e,n){e.exports="# Pagination *分页*\r\n\r\n<example />\r\n\r\n## API \r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| align | 'left' \\| 'center' \\| 'right' | 'left' | 排布方式 |\r\n| className | string | 无 | 扩展className |\r\n| current | number | 无 | 当前页，如果传入值，组件为受控组件，必须通过onChange来处理回调 |\r\n| defaultCurrent | number | 1 | 初始页码 |\r\n| disabled | boolean | false | 禁用 |\r\n| layout | string[] | \\['links'] | 子组件布局，可选值为:<br />'links': 页码<br />'list': 每页数量选择<br />'jumper': 跳转页码<br />'simple': 极简模式(不能与links同时使用)<br />function({ current, total, pageSize }): 匿名函数，用来信息展示 |\r\n| onChange | (current: number, pageSize: number) => void | 无 | 页码或每页显示数量改变时回调<br />current: 新的页码<br />pageSize: 每页数量 |\r\n| pageSize | number | 10 | 每页数量 |\r\n| pageSizeList | number[] | \\[10, 20, 30, 50, 100] | 每页数量可选列表 |\r\n| size | 'large' \\| 'default' \\| 'small' | 'default' | 尺寸 |\r\n| span | number | 5 | 中间links数目 |\r\n| text | object | 无 | 替换文案<br />prev: 上一页<br />next: 下一页<br />page: pageSizeList文字<br />jumper: 跳转输入框文字, '{input}' 为输入框占位 |\r\n| total | number | 0 | 总条目数。如果 total 小于 0，隐藏分页。 |\r\n| sizeListProps| object | 无 | 需要给分页数量的选择框的额外的属性 | \r\n"},733:function(e,n){e.exports="# Pagination\r\n\r\n<example />\r\n\r\n## API \r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| align | 'left' \\| 'center' \\| 'right' | 'left' | align of pagination |\r\n| className | string | - | Extend className |\r\n| current | number | - | Current page. |\r\n| defaultCurrent | number | 1 | Initial page number |\r\n| disabled | boolean | false | Disabled |\r\n| layout | string[] | \\['links'] | The layout of child elements, options: <br />'links': page number<br />'list': page size selector<br />'jumper': jump to page number<br />'simple': minimalist mode(Do not use both simple and links)<br />function({ current, total, pageSize }): custom information |\r\n| onChange | (current: number, pageSize: number) => void | - | The callback function when current page or pageSize is changing<br />current: new page number<br />pageSize: number of each page |\r\n| pageSize | number | 10 | Number of each page |\r\n| pageSizeList | number[] | \\[10, 20, 30, 50, 100] | The list of number of each page |\r\n| size | 'large' \\| 'default' \\| 'small' | 'default' | size of pagination |\r\n| span | number | 5 | the number of middle links |\r\n| text | object | none | Replaced text<br />prev: the previous page<br />next: the next page<br />page:the text of pageSizeList<br />jumper: jump to input box text, '{input}' pilaceholder for input box |\r\n| total | number | 0 | Total number. If total is less than 0, hide the Pagination. |\r\n| sizeListProps| object | - | Additional attributes which need to given page size selector  | \r\n"},734:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement(o.w,{defaultCurrent:10,total:1e3})}},735:function(e,n){e.exports="/**\r\n * cn - 基本用法\r\n *    -- 最基本的使用\r\n * en - Base\r\n *    -- The basic usage\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Pagination defaultCurrent={10} total={1000} />\r\n}\r\n"},736:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement("div",null,a.a.createElement(o.w,{size:"small",total:1e3}),a.a.createElement("br",null),a.a.createElement(o.w,{total:1e3}),a.a.createElement("br",null),a.a.createElement(o.w,{size:"large",total:1e3}))}},737:function(e,n){e.exports="/**\r\n * cn - 大小\r\n *    -- 内置了 3 种大小供选择，small, default, large，默认为 default\r\n * en - Size\r\n *    -- Three sizes are built in for selection: small, default, large, default value is default.\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Pagination size=\"small\" total={1000} />\r\n      <br />\r\n      <Pagination total={1000} />\r\n      <br />\r\n      <Pagination size=\"large\" total={1000} />\r\n    </div>\r\n  )\r\n}\r\n"},738:function(e,n,t){"use strict";t.r(n);function r(e){return e=e.total,"total ".concat(e)}var a=t(1),o=t.n(a),l=t(34);n.default=function(){return o.a.createElement(l.w,{total:128,pageSize:50,text:{jumper:"Go to {input}"},onChange:function(){for(var e=arguments.length,n=new Array(e),t=0;t<e;t++)n[t]=arguments[t];return console.log(n)},layout:["links","list",r,"jumper"]})}},739:function(e,n){e.exports="/**\r\n * cn - 布局\r\n *    -- 通过 layout 属性来控制组件是否显示以及显示的位置\r\n * en - Layout\r\n *    -- Use the layout property to control whether the child elements is displayed and where is displayed.\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nconst info = ({ total }) => `total ${total}`\r\n\r\nexport default function() {\r\n  return (\r\n    <Pagination\r\n      total={128}\r\n      pageSize={50}\r\n      text={{\r\n        jumper: 'Go to {input}',\r\n      }}\r\n      onChange={(...args) => console.log(args)}\r\n      layout={['links', 'list', info, 'jumper']}\r\n    />\r\n  )\r\n}\r\n"},740:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);function l(e){var n=e.current,t=e.pageSize,r=e.total,e=n*t;return r<e&&(e=r),"".concat((n-1)*t+1," to ").concat(e," of ").concat(r," items")}n.default=function(){return a.a.createElement(o.w,{text:{prev:"Previous",next:"Next",page:"/ page"},total:256,pageSize:50,layout:["links","list",l,"jumper"]})}},741:function(e,n){e.exports="/**\r\n * cn - 文字\r\n *    -- 通过 text 替换文字\r\n * en - Text\r\n *    -- Set text property to replace the default text..\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nfunction info({ current, pageSize, total }) {\r\n  const from = (current - 1) * pageSize + 1\r\n  let to = current * pageSize\r\n  if (to > total) to = total\r\n  return `${from} to ${to} of ${total} items`\r\n}\r\n\r\nexport default function() {\r\n  return (\r\n    <Pagination\r\n      text={{\r\n        prev: 'Previous',\r\n        next: 'Next',\r\n        page: '/ page',\r\n      }}\r\n      total={256}\r\n      pageSize={50}\r\n      layout={['links', 'list', info, 'jumper']}\r\n    />\r\n  )\r\n}\r\n"},742:function(e,n,t){"use strict";t.r(n);function r(e){return e=e.total,"Total ".concat(e)}var a=t(1),o=t.n(a),l=t(34);n.default=function(){return o.a.createElement("div",null,o.a.createElement(l.w,{align:"center",total:100,layout:["links",r]}),o.a.createElement("br",null),o.a.createElement(l.w,{align:"right",total:100,layout:[r,"links"]}))}},743:function(e,n){e.exports="/**\r\n * cn - 位置\r\n *    -- 内置了 3 种位置，left, center, right，默认为 left\r\n * en - Alignment\r\n *    -- Options: 'left', 'center', 'right', the default value is left.\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nconst info = ({ total }) => `Total ${total}`\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Pagination align=\"center\" total={100} layout={['links', info]} />\r\n      <br />\r\n      <Pagination align=\"right\" total={100} layout={[info, 'links']} />\r\n    </div>\r\n  )\r\n}\r\n"},744:function(e,n,t){"use strict";t.r(n),t.d(n,"default",function(){return d});var n=t(4),l=t.n(n),n=t(5),r=t.n(n),n=t(2),i=t.n(n),n=t(6),c=t.n(n),n=t(7),a=t.n(n),n=t(3),o=t.n(n),n=t(9),u=t.n(n),n=t(1),s=t.n(n),p=t(34);function f(t){var r=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(e){return!1}}();return function(){var e,n=o()(t);return n=r?(e=o()(this).constructor,Reflect.construct(n,arguments,e)):n.apply(this,arguments),a()(this,n)}}function m(e){return e=e.current,"Current page ".concat(e)}var d=function(e){c()(o,e);var a=f(o);function o(){var t;l()(this,o);for(var e=arguments.length,n=new Array(e),r=0;r<e;r++)n[r]=arguments[r];return t=a.call.apply(a,[this].concat(n)),u()(i()(t),"state",{current:1,pageSize:20}),u()(i()(t),"handleChange",function(e,n){t.setState({current:e,pageSize:n})}),t}return r()(o,[{key:"render",value:function(){var e=this.state,n=e.current,e=e.pageSize;return s.a.createElement("div",null,s.a.createElement(p.w,{text:{prev:"Previous",next:"Next",page:"/ page"},current:n,onChange:this.handleChange,pageSize:e,total:1e3,layout:["links","list"]}),s.a.createElement("br",null),s.a.createElement(p.w,{current:n,onChange:this.handleChange,pageSize:e,total:1e3,layout:["links",m]}))}}]),o}(n.PureComponent)},745:function(e,n){e.exports="/**\r\n * cn - 受控组件\r\n *    -- 同时设置 current 和 onChange 属性，可以作为受控组件使用\r\n * en - Controlled\r\n *    -- Set both the current and onChange properties for being used as a controlled component.\r\n */\r\nimport React, { PureComponent } from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nconst info = ({ current }) => `Current page ${current}`\r\n\r\nexport default class extends PureComponent {\r\n  state = {\r\n    current: 1,\r\n    pageSize: 20,\r\n  }\r\n\r\n  handleChange = (current, pageSize) => {\r\n    this.setState({ current, pageSize })\r\n  }\r\n\r\n  render() {\r\n    const { current, pageSize } = this.state\r\n    return (\r\n      <div>\r\n        <Pagination\r\n          text={{\r\n            prev: 'Previous',\r\n            next: 'Next',\r\n            page: '/ page',\r\n          }}\r\n          current={current}\r\n          onChange={this.handleChange}\r\n          pageSize={pageSize}\r\n          total={1000}\r\n          layout={['links', 'list']}\r\n        />\r\n        <br />\r\n        <Pagination\r\n          current={current}\r\n          onChange={this.handleChange}\r\n          pageSize={pageSize}\r\n          total={1000}\r\n          layout={['links', info]}\r\n        />\r\n      </div>\r\n    )\r\n  }\r\n}\r\n"},746:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement(o.w,{disabled:!0,defaultCurrent:10,layout:["links","list"],total:1e3})}},747:function(e,n){e.exports="/**\r\n * cn - 禁用\r\n *    -- 设置 disabled 属性，可以禁用组件\r\n * en - Disabled\r\n *    -- Set the disabled property to disable the component.\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Pagination disabled defaultCurrent={10} layout={['links', 'list']} total={1000} />\r\n}\r\n"},748:function(e,n,t){"use strict";t.r(n);var r=t(1),a=t.n(r),o=t(34);n.default=function(){return a.a.createElement(o.w,{layout:["simple"],pageSize:20,total:100})}},749:function(e,n){e.exports="/**\r\n * cn - Simple 模式\r\n *    -- layout 设置为 simple；注意：simple 模式不与其他layout共存。\r\n * en - Simple mode\r\n *    -- layout set to simple; Note: simple mode does not coexist with other layouts.\r\n */\r\nimport React from 'react'\r\nimport { Pagination } from 'ethan/index'\r\n\r\nexport default function() {\r\n  return <Pagination layout={['simple']} pageSize={20} total={100} />\r\n}\r\n"},902:function(e,n,t){"use strict";t.r(n);var r=t(8),a=t.n(r),o=t(1),l=t.n(o),i=t(215),c=t(216),u=t(35),r=t(732),o=t.n(r),r=t(733),r=t.n(r),s=Object(u.b)(o.a,r.a),p=[{name:"1-base",title:Object(u.b)("基本用法 \n 最基本的使用","Base \n The basic usage"),component:t(734).default,rawText:t(735)},{name:"2-size",title:Object(u.b)("大小 \n 内置了 3 种大小供选择，small, default, large，默认为 default","Size \n Three sizes are built in for selection: small, default, large, default value is default."),component:t(736).default,rawText:t(737)},{name:"3-layout",title:Object(u.b)("布局 \n 通过 layout 属性来控制组件是否显示以及显示的位置","Layout \n Use the layout property to control whether the child elements is displayed and where is displayed."),component:t(738).default,rawText:t(739)},{name:"4-text",title:Object(u.b)("文字 \n 通过 text 替换文字","Text \n Set text property to replace the default text.."),component:t(740).default,rawText:t(741)},{name:"5-align",title:Object(u.b)("位置 \n 内置了 3 种位置，left, center, right，默认为 left","Alignment \n Options: 'left', 'center', 'right', the default value is left."),component:t(742).default,rawText:t(743)},{name:"7-controlled",title:Object(u.b)("受控组件 \n 同时设置 current 和 onChange 属性，可以作为受控组件使用","Controlled \n Set both the current and onChange properties for being used as a controlled component."),component:t(744).default,rawText:t(745)},{name:"8-disabled",title:Object(u.b)("禁用 \n 设置 disabled 属性，可以禁用组件","Disabled \n Set the disabled property to disable the component."),component:t(746).default,rawText:t(747)},{name:"9-simple",title:Object(u.b)("Simple 模式 \n layout 设置为 simple；注意：simple 模式不与其他layout共存。","Simple mode \n layout set to simple; Note: simple mode does not coexist with other layouts."),component:t(748).default,rawText:t(749)}];n.default=Object(i.a)(function(e){return l.a.createElement(c.a,a()({},e,{codes:void 0,source:s,examples:p}))})}}]);