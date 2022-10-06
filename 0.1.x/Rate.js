(window.webpackJsonpEthanDoc=window.webpackJsonpEthanDoc||[]).push([[28],{215:function(e,t,n){"use strict";var a=n(12),s=n.n(a),u=n(1),m=n.n(u),f=n(34),d=n(27),p=n(42),h=n(44);t.a=function(i){return function(e){var t=Object(u.useState)(""),t=s()(t,2),a=t[0],r=t[1],t=Object(u.useState)([]),c=s()(t,1)[0],n=e.location.hash,o=Object(d.useUpdate)(),t=Object(u.useCallback)(function(e){e.forEach(function(e){c.push(e)}),o()},[]),l=Object(u.useCallback)(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);Object(u.useEffect)(function(){l();function e(){var n,a=document.documentElement.scrollTop,e=c.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));t&&t.offsetTop<=a&&(n=e.id)}),r(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return m.a.createElement("div",{className:Object(p.f)("_")},m.a.createElement(i,{onHeadingSetted:t}),!e.noNav&&m.a.createElement(f.G,{className:Object(p.f)("sticky"),top:50},m.a.createElement("div",{className:Object(p.f)("nav")},c.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return m.a.createElement("a",{key:t,className:Object(p.f)("level-".concat(e.level),a===e.id&&"active"),onClick:function(e){0===h.a.location.search.indexOf("?example=")?h.a.push("".concat(h.a.location.pathname,"?example=").concat(e.replace("heading-",""))):(h.a.push("".concat(h.a.location.pathname,"#").concat(e)),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},216:function(e,t,n){"use strict";var a=n(8),i=n.n(a),d=n(1),p=n.n(d),a=n(12),h=n.n(a),a=n(0),r=n.n(a),a=n(25),s=n.n(a),a=n(23),u=n.n(a),a=n(217),m=n.n(a),f=n(49),b=n(14),v=n(42),x=n(35),a=n(10),c=n.n(a),a=n(218),o=n.n(a),E=(n(219),function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,a=Object(d.useRef)(null);return Object(d.useEffect)(function(){var e=a.current;o.a.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),p.a.createElement("pre",{ref:a,className:c()(t||"lang-jsx",Object(v.a)("pre"))},p.a.createElement("code",null,e))}),a=n(74),g=n.n(a),y=n(34),R=n(72),w=n(44),O=p.a.createElement("div",{className:Object(v.a)("placeholder")},p.a.createElement(y.E,{size:"54px",name:"four-dots",color:"#53a0fd"}));function j(e){var t=e.component,n=e.id,a=e.name,r=e.rawText,c=e.title,o=Object(d.useRef)(null),l=Object(d.useState)(!1),i=h()(l,2),s=i[0],u=i[1],e=Object(d.useState)(Object(d.createElement)(t)),l=h()(e,1)[0],i=Object(d.useState)(),t=h()(i,2),m=t[0],f=t[1],e=Object(d.useState)(),i=(h()(e,1)[0],r.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());Object(d.useEffect)(function(){o.current&&(o.current.style.height=s?"".concat(m,"px"):"0")},[s]);t=function(e){return p.a.createElement("a",{className:Object(v.a)("toggle"),onClick:function(e){u(!s)}.bind(null,e)},p.a.createElement(R.a,{name:s?"code-close":"code"}))},e=w.a.location.search,r="?example=";if(0===e.indexOf(r)&&(e=e.replace(r,""),a.indexOf(e)<0))return null;a=c.split("\n"),e=g()(a),a=e[0],e=e.slice(1),a=a&&a.trim();return p.a.createElement(d.Fragment,null,a&&p.a.createElement("h3",{key:"0",id:n},a),p.a.createElement(y.r,{placeholder:O},p.a.createElement("div",{className:Object(v.a)("_",s&&"showcode")},p.a.createElement("div",{className:Object(v.a)("body")},l),0<c.length&&p.a.createElement("div",{className:Object(v.a)("desc")},e.map(function(e,t){return p.a.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),p.a.createElement("div",{ref:o,className:Object(v.a)("code")},p.a.createElement(E,{onHighLight:function(e){f(e)},value:i}),t(!0)))))}j.propTypes={component:r.a.func.isRequired,id:r.a.string,name:r.a.string,rawText:r.a.string,title:r.a.string.isRequired},j.defaultProps={rawText:""};a=function(e){var t=e.children,e=Object(d.useState)(!1),e=h()(e,2),n=e[0],a=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return p.a.createElement("div",{onClick:function(){a(!n)},className:Object(v.e)("console")},p.a.createElement(t,null,e))};a.propTypes={children:r.a.array},a.defaultProps={children:[]};var S=a;function l(e){var e=e.children,t=u()(e[1].props.children);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return p.a.createElement("div",{style:{overflow:"auto"}},p.a.createElement("table",{className:"doc-api-table"},e[0],p.a.cloneElement(e[1],{children:t})))}l.propTypes={children:r.a.any},l.defaultProps={};var k=l,T=/^<code name="([\w|-]+)" /,A=/^<example name="([\w|-]+)"/;function F(e){var t=e.onHeadingSetted,r=e.codes,c=e.examples,n=e.source,e=Object(d.useState)([]),a=h()(e,1)[0],e=Object(d.useState)({}),o=h()(e,1)[0];Object(d.useEffect)(function(){t&&t(a)},[]);function l(e){a.push(e)}return p.a.createElement(m.a,{className:Object(v.e)("_"),source:n,renderers:{code:E,heading:function(e){var t,n=e.level,a=e.children,r="".concat(n,"-").concat(a[0]),c="h".concat(n);return"object"===s()(a[0])?p.a.createElement(c,null,a):(o[r]||(e="heading-".concat((t=n,e=a[0],4===t?Object(b.c)():"".concat(t,"-").concat((e||"").replace(/[\W|-]/g,"-")))),2!==n&&3!==n||l({id:e,level:n,children:a}),o[r]=p.a.createElement(c,{id:e},a)),o[r])},html:function(e){if("<example />"===e.value)return function(){if(o.examples)return o.examples;if(!c)return p.a.createElement("div",null);var e=Object(x.b)("示例","Example"),t="heading-example-h";return l({id:t,level:2,children:[e]}),o.examples=[p.a.createElement("h2",{key:"h",id:t},e)].concat(u()(c.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),a=e.title.split("\n"),a=h()(a,1)[0];return l({id:n,level:3,children:[a]}),p.a.createElement(j,i()({key:t,id:n},e))}}))),o.examples}();var t,n=e.value.match(A);if(n)return t=n[1],e.value.indexOf("noExpand"),a="example-".concat(t),o[a]||(n=(c||[]).find(function(e){return e.name===t}),o[a]=n?p.a.createElement(j,n):null),o[a];if("<br>"===e.value||"<br />"===e.value)return p.a.createElement("br",null);var a=e.value.match(T);return a?(e=a[1],(a=r[e])?[p.a.createElement(E,{key:"cb",value:a.text})].concat(u()(a.log.map(function(e,t){return p.a.createElement(S,{key:t},e)}))):(console.error("Code ".concat(e," not existed")),null)):null},table:k,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?p.a.createElement("a",{href:e.href,target:t},e.children):p.a.createElement(f.a,{to:e.href,target:t},e.children)}}})}F.propTypes={children:r.a.oneOfType([r.a.element,r.a.array]),codes:r.a.object,examples:r.a.array,onHeadingSetted:r.a.func,source:r.a.string.isRequired},F.defaultProps={children:null,examples:null,onHeadingSetted:void 0};var z=n(73),I=(n(215),N.propTypes={loader:r.a.func,source:r.a.string},N.defaultProps={loader:void 0,source:void 0},Object(d.memo)(N));function N(e){var t=Object(d.useState)(e.source),n=h()(t,2),t=n[0],a=n[1];return Object(d.useEffect)(function(){e.loader&&e.loader().then(function(e){a(e.default)})},[]),t?p.a.createElement(F,i()({},e,{source:t})):p.a.createElement(z.a,{style:{minHeight:200}})}t.a=I},540:function(e,t){e.exports="# Rate *评分*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n#### Rate function(background, front):ReactClass\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| background | ReactElement \\| string \\| array | 必填 | 待选项 |\r\n| front | ReactElement \\| string \\| array | background | 选中项，不填和待选项相同 |\r\n\r\n### Rate\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| defaultValue | number | | 默认值 |\r\n| disabled | bool | false | 是否只读 |\r\n| max | number | 5 | 选项最大值，整数 |\r\n| onChange | function(d) | | 值改变回调函数 |\r\n| repeat | bool | true | 为 true 时，显示的选项为当前分值对应选项的复制 |\r\n| size | number \\| string | 20 | 图标大小 |\r\n| value | number | 0 | 作为可输入组件时，为整数。只读展示时，可以带小数 |\r\n| clearable | bool | false | 是否允许再次点击后清除 |\r\n| allowHalf | bool | false | 是否允许半选 |\r\n"},541:function(e,t){e.exports="# Rate\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### RateFunction(background, front):ReactClass\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| background | ReactElement \\| string \\| array | required | Background item for rate |\r\n| front | ReactElement \\| string \\| array | background | Front item. If it is not set, use background item |\r\n\r\n### Rate\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| defaultValue | number | | Default value |\r\n| disabled | bool | false | read-only |\r\n| max | number | 5 | The maximum value of the option, integer |\r\n| onChange | function(d) | | The callback function when the value is changing |\r\n| repeat | bool | true | When repeat is true, display item is a copy of the item corresponding to the current value |\r\n| size | number \\| string | 20 | the size of the icon |\r\n| value | number | 0 | |\r\n| clearable | bool | false | whether to allow clear when click again |\r\n| allowHalf | bool | false | Whether to allow semi selection |"},542:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement(c,null)}},543:function(e,t){e.exports="/**\r\n * cn - 基本用法\r\n *    -- Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用。\r\n * en - Base\r\n *    -- Rate is a function that creates a new custom Rate component that specifies an icon or text.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return <StarRate />\r\n}\r\n"},544:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement(c,{size:24,allowHalf:!0})}},545:function(e,t){e.exports="/**\r\n * cn - 半星\r\n *    -- Rate 是否允许半星。\r\n * en - Semi selection\r\n *    -- Rate whether to allow semi selection.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return <StarRate size={24} allowHalf />\r\n}\r\n"},546:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(34),a=r.a.createElement(c.m,{name:"heart-o"}),n=r.a.createElement(c.m,{name:"heart",style:{color:"#ff4d4f"}}),o=Object(c.A)(a,n);t.default=function(){return r.a.createElement(o,{defaultValue:2})}},547:function(e,t){e.exports="/**\r\n * cn - 颜色\r\n *    -- 在创建组件时设置颜色\r\n * en - Icon color\r\n *    -- Set the color when the component is created.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst heartBg = <FontAwesome name=\"heart-o\" />\r\nconst heart = <FontAwesome name=\"heart\" style={{ color: '#ff4d4f' }} />\r\nconst HeartRate = Rate(heartBg, heart)\r\n\r\nexport default function() {\r\n  return <HeartRate defaultValue={2} />\r\n}\r\n"},548:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement(c,{max:10,defaultValue:3})}},549:function(e,t){e.exports="/**\r\n * cn - 最大值\r\n *    -- 通过 max 属性设置选项最大值，默认为 5\r\n * en - Max\r\n *    -- Set the maximum value of the option through the max attribute. The default value is 5.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return <StarRate max={10} defaultValue={3} />\r\n}\r\n"},550:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement("div",null,r.a.createElement(c,{size:14}),r.a.createElement("br",null),r.a.createElement(c,{size:20}),r.a.createElement("br",null),r.a.createElement(c,{size:40}))}},551:function(e,t){e.exports="/**\r\n * cn - 大小\r\n *    -- 通过 size 属性可以设置大小\r\n * en - Size\r\n *    -- Set the size through the size property.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <StarRate size={14} />\r\n      <br />\r\n      <StarRate size={20} />\r\n      <br />\r\n      <StarRate size={40} />\r\n    </div>\r\n  )\r\n}\r\n"},552:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement(c,{defaultValue:4,text:["poor","fair","good","very good","excellent"]})}},553:function(e,t){e.exports="/**\r\n * cn - 附加文字\r\n *    -- text 属性可以为每个选项附加文字\r\n * en - Text\r\n *    -- Set text property to append text to each item.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return <StarRate defaultValue={4} text={['poor', 'fair', 'good', 'very good', 'excellent']} />\r\n}\r\n"},554:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement(c,{value:3.6,disabled:!0})}},555:function(e,t){e.exports="/**\r\n * cn - 只读\r\n *    -- 设置 disabled 标示为只读，只读状态下，value可以传入小数\r\n * en - Disabled\r\n *    -- Set disabled to true make it be read-only. When disabled, value can be passed in decimals.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return <StarRate value={3.6} disabled />\r\n}\r\n"},556:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(34),a=Object(c.o)("https://at.alicdn.com/t/font_662584_hfkafvbgwurkvs4i.css","facefont"),n=r.a.createElement(a,{name:"question"}),a=[r.a.createElement(a,{name:"cry",style:{color:"#003a8c"}}),r.a.createElement(a,{name:"sad",style:{color:"#222222"}}),r.a.createElement(a,{name:"sleeping",style:{color:"#ffa940"}}),r.a.createElement(a,{name:"happy",style:{color:"#fa541c"}}),r.a.createElement(a,{name:"lol",style:{color:"#fa541c"}})],o=Object(c.A)(n,a);t.default=function(){return r.a.createElement(o,{equal:!1,size:40,defaultValue:3})}},557:function(e,t){e.exports="/**\r\n * cn - 分级显示\r\n *    -- 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value\r\n * en - Array\r\n *    -- You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported.\r\n */\r\nimport React from 'react'\r\nimport { Rate, Icon } from 'ethan'\r\n\r\nconst FaceIcon = Icon('https://at.alicdn.com/t/font_662584_hfkafvbgwurkvs4i.css', 'facefont')\r\nconst background = <FaceIcon name=\"question\" />\r\nconst front = [\r\n  <FaceIcon name=\"cry\" style={{ color: '#003a8c' }} />,\r\n  <FaceIcon name=\"sad\" style={{ color: '#222222' }} />,\r\n  <FaceIcon name=\"sleeping\" style={{ color: '#ffa940' }} />,\r\n  <FaceIcon name=\"happy\" style={{ color: '#fa541c' }} />,\r\n  <FaceIcon name=\"lol\" style={{ color: '#fa541c' }} />,\r\n]\r\nconst TextRate = Rate(background, front)\r\n\r\nexport default function() {\r\n  return <TextRate equal={false} size={40} defaultValue={3} />\r\n}\r\n"},558:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),c=n(34),a=["A","B","C","D","E"],n=a.map(function(e){return r.a.createElement("span",{style:{color:"red"}},e)}),o=Object(c.A)(a,n);t.default=function(){return r.a.createElement(o,{repeat:!1,defaultValue:2})}},559:function(e,t){e.exports="/**\r\n * cn - 不重复选项\r\n *    -- 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项。\r\n * en - No Repeat\r\n *    -- By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value.\r\n */\r\nimport React from 'react'\r\nimport { Rate } from 'ethan'\r\n\r\nconst text = ['A', 'B', 'C', 'D', 'E']\r\nconst front = text.map(t => <span style={{ color: 'red' }}>{t}</span>)\r\nconst TextRate = Rate(text, front)\r\n\r\nexport default function() {\r\n  return <TextRate repeat={false} defaultValue={2} />\r\n}\r\n"},560:function(e,t,n){"use strict";n.r(t);var a=n(1),r=n.n(a),a=n(34),n=r.a.createElement(a.m,{name:"star"}),c=Object(a.A)(n,n);t.default=function(){return r.a.createElement(c,{clearable:!0})}},561:function(e,t){e.exports="/**\r\n * cn - 清除\r\n *    -- 通过 clearable 属性可以设置再次点击清除 value。\r\n * en - clear\r\n *    -- Set the clearable to clear value when click again.\r\n */\r\nimport React from 'react'\r\nimport { Rate, FontAwesome } from 'ethan'\r\n\r\nconst star = <FontAwesome name=\"star\" />\r\nconst StarRate = Rate(star, star)\r\n\r\nexport default function() {\r\n  return <StarRate clearable />\r\n}\r\n"},892:function(e,t,n){"use strict";n.r(t);var a=n(8),r=n.n(a),c=n(1),o=n.n(c),l=n(215),i=n(216),s=n(35),a=n(540),c=n.n(a),a=n(541),a=n.n(a),u=Object(s.b)(c.a,a.a),m=[{name:"01-base",title:Object(s.b)("基本用法 \n Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用。","Base \n Rate is a function that creates a new custom Rate component that specifies an icon or text."),component:n(542).default,rawText:n(543)},{name:"01-half",title:Object(s.b)("半星 \n Rate 是否允许半星。","Semi selection \n Rate whether to allow semi selection."),component:n(544).default,rawText:n(545)},{name:"02-color",title:Object(s.b)("颜色 \n 在创建组件时设置颜色","Icon color \n Set the color when the component is created."),component:n(546).default,rawText:n(547)},{name:"04-max",title:Object(s.b)("最大值 \n 通过 max 属性设置选项最大值，默认为 5","Max \n Set the maximum value of the option through the max attribute. The default value is 5."),component:n(548).default,rawText:n(549)},{name:"05-size",title:Object(s.b)("大小 \n 通过 size 属性可以设置大小","Size \n Set the size through the size property."),component:n(550).default,rawText:n(551)},{name:"06-text",title:Object(s.b)("附加文字 \n text 属性可以为每个选项附加文字","Text \n Set text property to append text to each item."),component:n(552).default,rawText:n(553)},{name:"07-disabled",title:Object(s.b)("只读 \n 设置 disabled 标示为只读，只读状态下，value可以传入小数","Disabled \n Set disabled to true make it be read-only. When disabled, value can be passed in decimals."),component:n(554).default,rawText:n(555)},{name:"08-face",title:Object(s.b)("分级显示 \n 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value","Array \n You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported."),component:n(556).default,rawText:n(557)},{name:"09-array",title:Object(s.b)("不重复选项 \n 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项。","No Repeat \n By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value."),component:n(558).default,rawText:n(559)},{name:"10-clearable",title:Object(s.b)("清除 \n 通过 clearable 属性可以设置再次点击清除 value。","clear \n Set the clearable to clear value when click again."),component:n(560).default,rawText:n(561)}];t.default=Object(l.a)(function(e){return o.a.createElement(i.a,r()({},e,{codes:void 0,source:u,examples:m}))})}}]);