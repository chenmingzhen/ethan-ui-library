(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[887],{64538:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return o}});var r=n(67154),a=n.n(r),t=n(24698),l=n.n(t),r=n(69048),i=n(85993),t=n(39174),c=(0,t.default)("# Step *步骤条*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Steps API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| current | String\\|Number | 0 | 指定当前步骤，从 0 开始记数。在子 Step 元素中，可以通过 status 属性覆盖状态 |\r\n| vertical | Boolean | false | 是否垂直显示，默认水平显示 |\r\n| mini | Boolean | false | 是否显示迷你模式 |\r\n| status | String | process | 指定当前步骤的状态，可选 wait process finish error |\r\n\r\n### Steps.Item API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| title | String\\|Number | 0 | 步骤标题 |\r\n| description | string | 无 | 步骤的详情描述 |\r\n| icon | ReactElement | 无 | 步骤图标的类型 |\r\n| status | String | wait | 指定当前步骤的状态，可选 wait process finish error |\r\n| onClick | Function | 无 | Item点击回调 |\r\n","# Loading \r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Steps API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| current | String\\|Number | 0 | Specifies the current step, counting from 0.Within the child Step element, state can be overridden by the status attribute |\r\n| vertical | Boolean | false | Vertical display, default horizontal display |\r\n| mini | Boolean | false | Whether to display mini mode |\r\n| status | String | process | Specifies the status of the current step, optionally wait process finish error |\r\n\r\n### Step.Item API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| title | String\\|Number | 0 | Step title |\r\n| description | string | none | Detailed description of the steps |\r\n| icon | ReactElement | none | Step icon |\r\n| status | String | wait | Specifies the status of the current step, optionally wait process finish error |\r\n| onClick | Function | none | Item click callback |\r\n\r\n"),u=[{name:"1-basex",title:(0,t.default)("基本用法 \n 简单的步骤条","Base \n Simple steps"),component:n(75934).Z,rawText:n(24280).Z},{name:"2-minix",title:(0,t.default)("迷你 \n 迷你的步骤条","Mini \n Mini steps"),component:n(66247).Z,rawText:n(94955).Z},{name:"3-iconx",title:(0,t.default)("图标 \n 自定义图标","Icon \n Custom Icon"),component:n(48762).Z,rawText:n(46632).Z},{name:"4-errorx",title:(0,t.default)("错误 \n 步骤出现错误","Error \n Error in steps"),component:n(18761).Z,rawText:n(6357).Z},{name:"5-changex",title:(0,t.default)("步骤切换 \n 改变流程的处理进度","Steps to switch \n Change the processing schedule of the process"),component:n(1990).Z,rawText:n(29847).Z},{name:"6-verticalx",title:(0,t.default)("垂直 \n 设置 vertical 属性，修改组件为垂直方向","Vertical \n Set the vertical property to change the component vertical."),component:n(94143).Z,rawText:n(84868).Z}],o=(0,r.default)(function(e){return l().createElement(i.ZP,a()({},e,{codes:void 0,source:c,examples:u}))})},24280:function(e,t){"use strict";t.Z='/**\r\n * cn - 基本用法\r\n *    -- 简单的步骤条\r\n * en - Base\r\n *    -- Simple steps\r\n */\r\n\r\nimport React from \'react\'\r\nimport { Steps } from \'ethan/index\'\r\n\r\nconst Item = Steps.StepItem\r\n\r\nexport default () => (\r\n  <Steps current="1">\r\n    <Item title="已完成" description="这里是步骤的描述信息" />\r\n    <Item title="进行中" description="这里是步骤的描述信息" />\r\n    <Item title="待进行" description="这里是步骤的描述信息" />\r\n  </Steps>\r\n)\r\n'},94955:function(e,t){"use strict";t.Z='/**\r\n * cn - 迷你\r\n *    -- 迷你的步骤条\r\n * en - Mini\r\n *    -- Mini steps\r\n */\r\n\r\nimport React from \'react\'\r\nimport { Steps } from \'ethan/index\'\r\n\r\nconst Item = Steps.StepItem\r\n\r\nexport default () => (\r\n  <Steps current={1} mini>\r\n    <Item title="已完成" />\r\n    <Item title="进行中" />\r\n    <Item title="待进行" />\r\n  </Steps>\r\n)\r\n'},46632:function(e,t){"use strict";t.Z='/**\r\n * cn - 图标\r\n *    -- 自定义图标\r\n * en - Icon\r\n *    -- Custom Icon\r\n */\r\n\r\nimport React from \'react\'\r\nimport { FontAwesome, Steps } from \'ethan/index\'\r\n\r\nconst Item = Steps.StepItem\r\n\r\nexport default () => (\r\n  <Steps current="1">\r\n    <Item title="已完成" description="这里是步骤的描述信息" icon={<FontAwesome name="angle-double-right" />} />\r\n    <Item title="进行中" description="这里是步骤的描述信息" icon={<FontAwesome name="hand-o-right" />} />\r\n    <Item title="待进行" description="这里是步骤的描述信息" icon={<FontAwesome name="long-arrow-right" />} />\r\n  </Steps>\r\n)\r\n'},6357:function(e,t){"use strict";t.Z='/**\r\n * cn - 错误\r\n *    -- 步骤出现错误\r\n * en - Error\r\n *    -- Error in steps\r\n */\r\n\r\nimport React from \'react\'\r\nimport { Steps } from \'ethan/index\'\r\n\r\nconst Item = Steps.StepItem\r\n\r\nexport default () => (\r\n  <Steps current="1" status="error">\r\n    <Item title="已完成" description="这里是步骤的描述信息" />\r\n    <Item title="进行中" description="这里是步骤的描述信息" />\r\n    <Item title="待进行" description="这里是步骤的描述信息" />\r\n  </Steps>\r\n)\r\n'},29847:function(e,t){"use strict";t.Z="/**\r\n * cn - 步骤切换\r\n *    -- 改变流程的处理进度\r\n * en - Steps to switch\r\n *    -- Change the processing schedule of the process\r\n */\r\n\r\nimport React from 'react'\r\nimport { Steps, Button } from 'ethan/index'\r\n\r\nconst Item = Steps.StepItem\r\n\r\nexport default () => {\r\n  const [current, setCurrent] = React.useState(0)\r\n\r\n  const setSteps = action => {\r\n    const newCurrent = action === 'next' ? (current >= 3 ? 3 : current + 1) : current <= 0 ? 0 : current - 1\r\n\r\n    setCurrent(newCurrent)\r\n  }\r\n\r\n  return (\r\n    <>\r\n      <Steps current={current}>\r\n        <Item title=\"步骤1\" />\r\n        <Item title=\"步骤2\" />\r\n        <Item title=\"步骤3\" />\r\n        <Item title=\"步骤4\" />\r\n      </Steps>\r\n      <br />\r\n      <Button onClick={setSteps.bind(null, 'next')}>下一步</Button>\r\n      <Button onClick={setSteps.bind(null, 'prev')}>上一步</Button>\r\n    </>\r\n  )\r\n}\r\n"},84868:function(e,t){"use strict";t.Z='/**\r\n * cn - 垂直\r\n *    -- 设置 vertical 属性，修改组件为垂直方向\r\n * en - Vertical\r\n *    -- Set the vertical property to change the component vertical.\r\n */\r\n\r\nimport React from \'react\'\r\nimport { FontAwesome, Steps } from \'ethan/index\'\r\n\r\nconst Item = Steps.StepItem\r\n\r\nconst Example = () => {\r\n  const [current, setCurrent] = React.useState(0)\r\n\r\n  const setSteps = index => setCurrent(index)\r\n\r\n  return (\r\n    <Steps current={current} vertical>\r\n      <Item title="步骤1" onClick={setSteps} />\r\n      <Item title="步骤2" onClick={setSteps} />\r\n      <Item title="步骤3" onClick={setSteps} />\r\n      <Item title="步骤4" onClick={setSteps} />\r\n    </Steps>\r\n  )\r\n}\r\n\r\nexport default () => (\r\n  <div style={{ display: \'flex\' }}>\r\n    <Steps current="1" vertical>\r\n      <Item title="已完成" description="这里是步骤的描述信息" />\r\n      <Item title="进行中" description="这里是步骤的描述信息" />\r\n      <Item title="待进行" description="这里是步骤的描述信息" />\r\n    </Steps>\r\n\r\n    <Steps current={1} vertical mini>\r\n      <Item title="已完成" />\r\n      <Item title="进行中" />\r\n      <Item title="待进行" />\r\n    </Steps>\r\n\r\n    <Steps current="1" vertical>\r\n      <Item title="已完成" description="这里是步骤的描述信息" icon={<FontAwesome name="angle-double-right" />} />\r\n      <Item title="进行中" description="这里是步骤的描述信息" icon={<FontAwesome name="hand-o-right" />} />\r\n      <Item title="待进行" description="这里是步骤的描述信息" icon={<FontAwesome name="long-arrow-right" />} />\r\n    </Steps>\r\n\r\n    <Steps current="1" vertical status="error" style={{ height: \'500px\' }}>\r\n      <Item title="已完成" description="这里是步骤的描述信息" />\r\n      <Item title="进行中" description="这里是步骤的描述信息" />\r\n      <Item title="待进行" description="这里是步骤的描述信息" />\r\n    </Steps>\r\n\r\n    <Example />\r\n  </div>\r\n)\r\n'},54798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importStar(n(24698)),l=r.__importDefault(n(94184)),i=r.__importDefault(n(15660));n(62356);var c=n(78502);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=a.useRef(null);return a.useEffect(function(){var e=r.current;i.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),a.default.createElement("pre",{ref:r,className:l.default(t||"lang-jsx",c.exampleClass("pre"))},a.default.createElement("code",null,e))}},7595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var m=n(70655),p=m.__importStar(n(24698)),r=m.__importDefault(n(45697)),_=n(79136),h=m.__importDefault(n(22276)),S=m.__importDefault(n(69374)),E=n(78502),v=m.__importDefault(n(54798)),g=p.default.createElement("div",{className:E.exampleClass("placeholder")},p.default.createElement(_.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function a(e){var t=e.component,n=e.id,r=e.name,a=e.rawText,l=e.title,i=p.useRef(null),c=m.__read(p.useState(!1),2),u=c[0],o=c[1],s=m.__read(p.useState(p.createElement(t)),1)[0],e=m.__read(p.useState(),2),d=e[0],f=e[1],c=(m.__read(p.useState(),1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());p.useEffect(function(){i.current&&(i.current.style.height=u?d+"px":"0")},[u]);t=function(e){return p.default.createElement("a",{className:E.exampleClass("toggle"),onClick:function(e){o(!u)}.bind(null,e)},p.default.createElement(h.default,{name:u?"code-close":"code"}))},e=S.default.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=m.__read(l.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return p.default.createElement(p.Fragment,null,e&&p.default.createElement("h3",{key:"0",id:n},e),p.default.createElement(_.Lazyload,{placeholder:g},p.default.createElement("div",{className:E.exampleClass("_",u&&"showcode")},p.default.createElement("div",{className:E.exampleClass("body")},s),0<l.length&&p.default.createElement("div",{className:E.exampleClass("desc")},r.map(function(e,t){return p.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),p.default.createElement("div",{ref:i,className:E.exampleClass("code")},p.default.createElement(v.default,{onHighLight:function(e){f(e)},value:c}),t(!0)))))}(t.default=a).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},a.defaultProps={rawText:""}},71126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),i=n(78502),n=function(e){var t=e.children,e=a.__read(l.useState(!1),2),n=e[0],r=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return l.default.createElement("div",{onClick:function(){r(!n)},className:i.markdownClass("console")},l.default.createElement(t,null,e))};n.propTypes={children:r.default.array},n.defaultProps={children:[]},t.default=n},15302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),l=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),i=a.__importDefault(n(21046)),c=a.__importDefault(n(17866));t.default=function(){function e(e){var t=a.__read(l.useState(e.source),2),n=t[0],r=t[1];return l.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?l.default.createElement(i.default,a.__assign({},e,{source:n})):l.default.createElement(c.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},l.memo(e)}},21046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=n(70655),o=u.__importStar(n(24698)),r=u.__importDefault(n(45697)),s=u.__importDefault(n(30724)),d=n(73727),f=n(70914),m=n(78502),p=u.__importDefault(n(39174)),_=u.__importDefault(n(54798)),h=u.__importDefault(n(7595)),S=u.__importDefault(n(71126)),E=u.__importDefault(n(30681)),v=/^<code name="([\w|-]+)" /,g=/^<example name="([\w|-]+)"/;function a(e){var t=e.onHeadingSetted,a=e.codes,l=e.examples,e=e.source,n=u.__read(o.useState([]),1)[0],i=u.__read(o.useState({}),1)[0];o.useEffect(function(){t&&t(n)},[]);function c(e){n.push(e)}return o.default.createElement(s.default,{className:m.markdownClass("_"),source:e,renderers:{code:_.default,heading:function(e){var t,n=e.level,r=e.children,a=n+"-"+r[0],l="h"+n;return"object"==typeof r[0]?o.default.createElement(l,null,r):(i[a]||(e="heading-"+(t=n,e=r[0],4===t?f.getUidStr():t+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==n&&3!==n||c({id:e,level:n,children:r}),i[a]=o.default.createElement(l,{id:e},r)),i[a])},html:function(e){if("<example />"===e.value)return function(){if(i.examples)return i.examples;if(!l)return o.default.createElement("div",null);var e=p.default("示例","Example"),t="heading-example-h";return c({id:t,level:2,children:[e]}),i.examples=u.__spreadArray([o.default.createElement("h2",{key:"h",id:t},e)],u.__read(l.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-"+e.name,r=u.__read(e.title.split("\n"),1)[0];return c({id:n,level:3,children:[r]}),o.default.createElement(h.default,u.__assign({key:t,id:n},e))}}))),i.examples}();var t,n=e.value.match(g);if(n)return t=n[1],e.value.indexOf("noExpand"),i[r="example-"+t]||(n=(l||[]).find(function(e){return e.name===t}),i[r]=n?o.default.createElement(h.default,u.__assign({},n)):null),i[r];if("<br>"===e.value||"<br />"===e.value)return o.default.createElement("br",null);var r=e.value.match(v);return r?(e=r[1],(r=a[e])?u.__spreadArray([o.default.createElement(_.default,{key:"cb",value:r.text})],u.__read(r.log.map(function(e,t){return o.default.createElement(S.default,{key:t},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:E.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?o.default.createElement("a",{href:e.href,target:t},e.children):o.default.createElement(d.Link,{to:e.href,target:t},e.children)}}})}(t.default=a).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},a.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,t,n){"use strict";var r=n(70655),a=(r.__importDefault(n(24698)),r.__importDefault(n(15302))),l=(r.__importDefault(n(69048)),a.default());t.ZP=l},69048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=n(70655),s=o.__importStar(n(24698)),d=n(79136),f=n(64744),m=n(78502),p=o.__importDefault(n(69374));t.default=function(u){return function(e){var t=o.__read(s.useState(""),2),r=t[0],a=t[1],l=o.__read(s.useState([]),1)[0],n=e.location.hash,i=f.useUpdate(),t=s.useCallback(function(e){e.forEach(function(e){l.push(e)}),i()},[]),c=s.useCallback(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);s.useEffect(function(){c();function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#"+e.id);t&&t.offsetTop<=r&&(n=e.id)}),a(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return s.default.createElement("div",{className:m.navClass("_")},s.default.createElement(u,{onHeadingSetted:t}),!e.noNav&&s.default.createElement(d.Sticky,{className:m.navClass("sticky"),top:50},s.default.createElement("div",{className:m.navClass("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return s.default.createElement("a",{key:t,className:m.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===p.default.location.search.indexOf("?example=")?p.default.push(p.default.location.pathname+"?example="+e.replace("heading-","")):(p.default.push(p.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},30681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importDefault(n(24698)),n=r.__importDefault(n(45697));function l(e){var e=e.children,t=r.__spreadArray([],r.__read(e[1].props.children));try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return a.default.createElement("div",{style:{overflow:"auto"}},a.default.createElement("table",{className:"doc-api-table"},e[0],a.default.cloneElement(e[1],{children:t})))}l.propTypes={children:n.default.any},l.defaultProps={},t.default=l},75934:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136),l=a.Steps.StepItem;t.Z=function(){return r.default.createElement(a.Steps,{current:"1"},r.default.createElement(l,{title:"已完成",description:"这里是步骤的描述信息"}),r.default.createElement(l,{title:"进行中",description:"这里是步骤的描述信息"}),r.default.createElement(l,{title:"待进行",description:"这里是步骤的描述信息"}))}},66247:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136),l=a.Steps.StepItem;t.Z=function(){return r.default.createElement(a.Steps,{current:1,mini:!0},r.default.createElement(l,{title:"已完成"}),r.default.createElement(l,{title:"进行中"}),r.default.createElement(l,{title:"待进行"}))}},48762:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136),l=a.Steps.StepItem;t.Z=function(){return r.default.createElement(a.Steps,{current:"1"},r.default.createElement(l,{title:"已完成",description:"这里是步骤的描述信息",icon:r.default.createElement(a.FontAwesome,{name:"angle-double-right"})}),r.default.createElement(l,{title:"进行中",description:"这里是步骤的描述信息",icon:r.default.createElement(a.FontAwesome,{name:"hand-o-right"})}),r.default.createElement(l,{title:"待进行",description:"这里是步骤的描述信息",icon:r.default.createElement(a.FontAwesome,{name:"long-arrow-right"})}))}},18761:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136),l=a.Steps.StepItem;t.Z=function(){return r.default.createElement(a.Steps,{current:"1",status:"error"},r.default.createElement(l,{title:"已完成",description:"这里是步骤的描述信息"}),r.default.createElement(l,{title:"进行中",description:"这里是步骤的描述信息"}),r.default.createElement(l,{title:"待进行",description:"这里是步骤的描述信息"}))}},1990:function(e,t,n){"use strict";var r=n(70655),a=r.__importDefault(n(24698)),l=n(79136),i=l.Steps.StepItem;t.Z=function(){var e=r.__read(a.default.useState(0),2),t=e[0],n=e[1],e=function(e){n("next"===e?3<=t?3:t+1:t<=0?0:t-1)};return a.default.createElement(a.default.Fragment,null,a.default.createElement(l.Steps,{current:t},a.default.createElement(i,{title:"步骤1"}),a.default.createElement(i,{title:"步骤2"}),a.default.createElement(i,{title:"步骤3"}),a.default.createElement(i,{title:"步骤4"})),a.default.createElement("br",null),a.default.createElement(l.Button,{onClick:e.bind(null,"next")},"下一步"),a.default.createElement(l.Button,{onClick:e.bind(null,"prev")},"上一步"))}},94143:function(e,t,n){"use strict";function r(){var e=(n=a.__read(l.default.useState(0),2))[0],t=n[1],n=function(e){return t(e)};return l.default.createElement(i.Steps,{current:e,vertical:!0},l.default.createElement(c,{title:"步骤1",onClick:n}),l.default.createElement(c,{title:"步骤2",onClick:n}),l.default.createElement(c,{title:"步骤3",onClick:n}),l.default.createElement(c,{title:"步骤4",onClick:n}))}var a=n(70655),l=a.__importDefault(n(24698)),i=n(79136),c=i.Steps.StepItem;t.Z=function(){return l.default.createElement("div",{style:{display:"flex"}},l.default.createElement(i.Steps,{current:"1",vertical:!0},l.default.createElement(c,{title:"已完成",description:"这里是步骤的描述信息"}),l.default.createElement(c,{title:"进行中",description:"这里是步骤的描述信息"}),l.default.createElement(c,{title:"待进行",description:"这里是步骤的描述信息"})),l.default.createElement(i.Steps,{current:1,vertical:!0,mini:!0},l.default.createElement(c,{title:"已完成"}),l.default.createElement(c,{title:"进行中"}),l.default.createElement(c,{title:"待进行"})),l.default.createElement(i.Steps,{current:"1",vertical:!0},l.default.createElement(c,{title:"已完成",description:"这里是步骤的描述信息",icon:l.default.createElement(i.FontAwesome,{name:"angle-double-right"})}),l.default.createElement(c,{title:"进行中",description:"这里是步骤的描述信息",icon:l.default.createElement(i.FontAwesome,{name:"hand-o-right"})}),l.default.createElement(c,{title:"待进行",description:"这里是步骤的描述信息",icon:l.default.createElement(i.FontAwesome,{name:"long-arrow-right"})})),l.default.createElement(i.Steps,{current:"1",vertical:!0,status:"error",style:{height:"500px"}},l.default.createElement(c,{title:"已完成",description:"这里是步骤的描述信息"}),l.default.createElement(c,{title:"进行中",description:"这里是步骤的描述信息"}),l.default.createElement(c,{title:"待进行",description:"这里是步骤的描述信息"})),l.default.createElement(r,null))}}}]);