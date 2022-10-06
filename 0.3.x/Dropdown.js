(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[983],{81962:function(e,n,t){"use strict";t.r(n),t.d(n,{default:function(){return c}});var r=t(67154),o=t.n(r),n=t(24698),a=t.n(n),r=t(69048),l=t(85993),n=t(39174),i=(0,n.default)("# Dropdown *下拉菜单*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Dropdown\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| className | string | 无 | 扩展className |\r\n| columns | number | 无 | 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度 |\r\n| data | object[] | 必填 | 下拉数据，详见data |\r\n| disabled | boolean | false | 禁用 |\r\n| onClick | (data: object) => void | 无 | 点击事件。参数为渲染的数据, <br /> 注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick |\r\n| outline | boolean | false | 同 [Button](/components/Button) |\r\n| placeholder | string \\| ReactNode | 必填 | 按钮显示内容 |\r\n| renderItem | (data: object) => ReactNode \\| string | 'content' | 设置显示的内容,如果是字符串,则为对应的值<br />如果是函数,则返回值为显示的内容,参数为当条数据 |\r\n| size | string | 'default' | 同 [Button](/components/Button) |\r\n| trigger | 'click' \\| 'hover' | 'click' | 触发方式 |\r\n| type | 'primary' \\| 'secondary' \\|  'success' \\| 'info' \\|  'warning' \\|  'danger' \\|  'link' | 'default' | 类型 |\r\n| width | number | 无 | 弹出选项层的宽度 |\r\n| animation | boolean | true | 是否开启动画 |\r\n\r\n### DropdownData\r\n\r\ndata 选项有三种情况：\r\n\r\n- 为 ReactElement 时，直接显示此元素。\r\n\r\n- 为 object 且设置了 renderItem，显示 renderItem 返回的内容。\r\n\r\n- 为 object 且未设置 renderItem，按以下数据结构处理。\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| content | string \\| element | | 默认从content获取内容 |\r\n| url | string | 无 | url属性不为空时，render为一个链接 |\r\n| target | string | 无 | url 不为空时有效 |\r\n| onClick | function | 无 | 点击事件 |\r\n","# Dropdown\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Dropdown\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| className | string | none | Extend className |\r\n| columns | number | none | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately. |\r\n| data | object[] | required | See the detail in the data of the drop down box. |\r\n| disabled | boolean | false | disabled |\r\n| onClick | (data: object) => void | none | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called. |\r\n| outline | boolean | false | The same as [Button](/components/Button) |\r\n| placeholder | string \\| ReactNode | required | Displayed content of the button |\r\n| renderItem | (data: object) => ReactNode \\| string | 'content' | Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |\r\n| size | string | 'default' | The same as [Button](/components/Button) |\r\n| trigger | 'click' \\| 'hover' | 'click' | Toggle mode, options |\r\n| type | 'primary' \\| 'secondary' \\|  'success' \\| 'info' \\|  'warning' \\|  'danger' \\|  'link' | 'default' | type of Dropdown |\r\n| width | number | none | The width of the pop-up option layer |\r\n| animation | boolean | true | animation toggle |\r\n\r\n\r\n### DropdownData\r\n\r\n- If data item is a ReactElement, render the item;\r\n- If data item is an object and renderItem is set, render the renderItem's result;\r\n- if data item is an object and renderItem is not set, handle the parameters as follows;\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| content | string \\| element | |  |\r\n| url | string | none | When the url is not empty, a url will be rendered. |\r\n| target | string | none | It is valid when the url is not empty. |\r\n| onClick | function | none | The click event |\r\n"),d=[{name:"1-basex",title:(0,n.default)("基本用法 \n Dropdown 通过数据来渲染，支持 json 格式数据、React 组件","Base \n Dropdown is rendered through data and supports json formatted data and React components."),component:t(38863).Z,rawText:t(49775).Z},{name:"2-hoverx",title:(0,n.default)('触发 \n Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发','Trigger \n By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.'),component:t(81981).Z,rawText:t(88981).Z},{name:"3-positionx",title:(0,n.default)("弹出位置 \n 设置 position 属性可以控制下拉菜单弹出的方向和位置","Position \n Set position property can control the direction and position of the drop-down menu."),component:t(74664).Z,rawText:t(77471).Z},{name:"4-itemsx",title:(0,n.default)("多列平铺 \n 设置 columns 属性可以让选项多列平铺","Multiple columns \n Set columns property can make the option multi-column tiled."),component:t(44956).Z,rawText:t(13824).Z},{name:"5-splitx",title:(0,n.default)("组合 \n 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项","Group \n Dropdown can be combined with Button used in Button.Group."),component:t(88824).Z,rawText:t(14177).Z},{name:"6-typex",title:(0,n.default)("样式 \n 使用了和Button相同的 type 和 size 设置样式","type \n Style is set using the same type and size as Button."),component:t(41270).Z,rawText:t(55903).Z},{name:"7-basex",title:(0,n.default)("绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。","Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer."),component:t(28809).Z,rawText:t(85064).Z}],c=(0,r.default)(function(e){return a().createElement(l.ZP,o()({},e,{codes:void 0,source:i,examples:d}))})},49775:function(e,n){"use strict";n.Z="/**\r\n * cn - 基本用法\r\n *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件\r\n * en - Base\r\n *    -- Dropdown is rendered through data and supports json formatted data and React components.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown, Message } from 'ethan/index'\r\n\r\nconst data = [\r\n  {\r\n    content: 'Submenu',\r\n    children: [\r\n      {\r\n        content: 'Link to Google',\r\n        target: '_blank',\r\n        url: 'https://google.com',\r\n      },\r\n      {\r\n        content: 'Disabled',\r\n        disabled: true,\r\n      },\r\n    ],\r\n  },\r\n  <a href=\"/\">Home</a>,\r\n  {\r\n    content: 'Message',\r\n    onClick: () => {\r\n      Message.info('Some message.')\r\n    },\r\n  },\r\n]\r\n\r\nexport default function() {\r\n  return <Dropdown placeholder=\"Dropdown\" data={data} />\r\n}\r\n"},88981:function(e,n){"use strict";n.Z="/**\r\n * cn - 触发\r\n *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger=\"hover\" 属性可以改为移入触发\r\n * en - Trigger\r\n *    -- By default, Dropdown toggled clicking, setting trigger=\"hover\" can toggled by mouse move in.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown } from 'ethan/index'\r\n\r\nexport default function() {\r\n  const menu = [\r\n    {\r\n      content: 'First',\r\n      id: '1',\r\n      children: [\r\n        {\r\n          id: '3',\r\n          content: 'optic 1',\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      content: 'Second',\r\n      url: 'http://www.google.com',\r\n      id: '2',\r\n      children: [\r\n        {\r\n          content: 'topic 2',\r\n          id: 4,\r\n          children: [\r\n            {\r\n              id: '6',\r\n              content: 'topic 3',\r\n            },\r\n          ],\r\n        },\r\n      ],\r\n    },\r\n  ]\r\n\r\n  return <Dropdown trigger=\"hover\" placeholder=\"Hover\" data={menu} />\r\n}\r\n"},77471:function(e,n){"use strict";n.Z="/**\r\n * cn - 弹出位置\r\n *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置\r\n * en - Position\r\n *    -- Set position property can control the direction and position of the drop-down menu.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown } from 'ethan/index'\r\n\r\nconst style = { marginRight: 12, marginBottom: 12 }\r\n\r\nexport default function() {\r\n  const menu = [\r\n    {\r\n      content: 'First',\r\n      id: '1',\r\n      children: [\r\n        {\r\n          content: 'link1',\r\n          id: '4',\r\n        },\r\n        {\r\n          content: 'link2',\r\n          id: '5',\r\n        },\r\n      ],\r\n    },\r\n    {\r\n      content: 'Second',\r\n      url: 'http://www.google.com',\r\n      id: '2',\r\n      children: [\r\n        {\r\n          content: 'link3',\r\n          id: 6,\r\n          onClick: () => {\r\n            console.log('this is special')\r\n          },\r\n        },\r\n        {\r\n          content: 'link4',\r\n          id: 7,\r\n          children: [\r\n            {\r\n              id: '8',\r\n              content: 'link5',\r\n            },\r\n            {\r\n              id: '9',\r\n              content: 'link6',\r\n            },\r\n          ],\r\n        },\r\n      ],\r\n    },\r\n  ]\r\n\r\n  return (\r\n    <div>\r\n      <Dropdown placeholder=\"Right Top\" style={style} position=\"right-top\" data={menu} />\r\n\r\n      <Dropdown placeholder=\"Bottom Left\" style={style} position=\"bottom-left\" data={menu} />\r\n\r\n      <Dropdown placeholder=\"Bottom Right\" style={style} position=\"bottom-right\" data={menu} />\r\n\r\n      <Dropdown placeholder=\"Left Top\" style={style} position=\"left-top\" data={menu} />\r\n\r\n      <br />\r\n\r\n      <Dropdown placeholder=\"Right Bottom\" style={style} position=\"right-bottom\" data={menu} />\r\n\r\n      <Dropdown placeholder=\"Top Left\" style={style} position=\"top-left\" data={menu} />\r\n\r\n      <Dropdown placeholder=\"Top Right\" style={style} position=\"top-right\" data={menu} />\r\n\r\n      <Dropdown placeholder=\"Left Bottom\" style={style} position=\"left-bottom\" data={menu} />\r\n\r\n      <br />\r\n      <Dropdown placeholder=\"Auto Position\" style={style} position=\"auto\" data={menu} />\r\n    </div>\r\n  )\r\n}\r\n"},13824:function(e,n){"use strict";n.Z="/**\r\n * cn - 多列平铺\r\n *    -- 设置 columns 属性可以让选项多列平铺\r\n * en - Multiple columns\r\n *    -- Set columns property can make the option multi-column tiled.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown } from 'ethan/index'\r\n\r\nexport default function() {\r\n  const menu = []\r\n  for (let i = 1; i <= 30; i++) {\r\n    menu.push({\r\n      id: `${i}`,\r\n      content: `item${i}`,\r\n    })\r\n  }\r\n\r\n  return <Dropdown placeholder=\"Dropdown\" width={500} columns={5} data={menu} />\r\n}\r\n"},14177:function(e,n){"use strict";n.Z="/**\r\n * cn - 组合\r\n *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项\r\n * en - Group\r\n *    -- Dropdown can be combined with Button used in Button.Group.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown, Message, Button } from 'ethan/index'\r\n\r\nconst menu = [\r\n  {\r\n    content: 'First',\r\n  },\r\n  {\r\n    content: 'Second',\r\n    target: '_blank',\r\n    url: 'http://www.google.com',\r\n  },\r\n]\r\n\r\nexport default function() {\r\n  return (\r\n    <Button.Group>\r\n      <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>\r\n      <Button>Center</Button>\r\n      <Dropdown\r\n        onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}\r\n        position=\"bottom-right\"\r\n        data={menu}\r\n      />\r\n    </Button.Group>\r\n  )\r\n}\r\n"},55903:function(e,n){"use strict";n.Z="/**\r\n * cn - 样式\r\n *    -- 使用了和Button相同的 type 和 size 设置样式\r\n * en - type\r\n *    -- Style is set using the same type and size as Button.\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Dropdown, Message, Select, Checkbox } from 'ethan/index'\r\n\r\nconst menu = [\r\n  {\r\n    content: 'Submenu',\r\n    children: [\r\n      {\r\n        content: 'Link',\r\n        target: '_blank',\r\n        url: 'https://google.com',\r\n      },\r\n      {\r\n        content: 'Disabled',\r\n        disabled: true,\r\n      },\r\n    ],\r\n  },\r\n  {\r\n    content: 'Message',\r\n    onClick: () => {\r\n      Message.info('Some message.')\r\n    },\r\n  },\r\n]\r\n\r\nexport default class extends Component {\r\n  constructor(props) {\r\n    super(props)\r\n    this.state = {\r\n      type: 'primary',\r\n      size: 'default',\r\n      disabled: false,\r\n      outline: false,\r\n    }\r\n  }\r\n\r\n  changeSetting(name, value) {\r\n    this.setState({ [name]: value })\r\n  }\r\n\r\n  render() {\r\n    const { type, outline, size, disabled } = this.state\r\n    return (\r\n      <div>\r\n        <div style={{ marginBottom: 20 }}>\r\n          <span>type: </span>\r\n          <Select\r\n            width={140}\r\n            keygen={d => d}\r\n            data={['primary', 'success', 'warning', 'danger']}\r\n            value={type}\r\n            onChange={this.changeSetting.bind(this, 'type')}\r\n            style={{ marginRight: 20 }}\r\n          />\r\n\r\n          <span>size: </span>\r\n          <Select\r\n            width={100}\r\n            keygen={d => d}\r\n            data={['small', 'default', 'large']}\r\n            value={size}\r\n            onChange={this.changeSetting.bind(this, 'size')}\r\n            style={{ marginRight: 20 }}\r\n          />\r\n\r\n          <Checkbox value={outline} onChange={this.changeSetting.bind(this, 'outline')}>\r\n            outline\r\n          </Checkbox>\r\n\r\n          <Checkbox value={disabled} onChange={this.changeSetting.bind(this, 'disabled')}>\r\n            disabled\r\n          </Checkbox>\r\n        </div>\r\n\r\n        <Dropdown placeholder=\"Dropdown\" data={menu} disabled={disabled} outline={outline} size={size} type={type} />\r\n      </div>\r\n    )\r\n  }\r\n}\r\n"},85064:function(e,n){"use strict";n.Z="/**\r\n * cn - 绝对定位\r\n *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。\r\n * en - Absolute\r\n *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown, Message } from 'ethan/index'\r\n\r\nconst data = [\r\n  {\r\n    content: 'Submenu',\r\n    children: [\r\n      {\r\n        content: 'Link to Google',\r\n        target: '_blank',\r\n        url: 'https://google.com',\r\n      },\r\n      {\r\n        content: 'Disabled',\r\n        disabled: true,\r\n      },\r\n    ],\r\n  },\r\n  <a href=\"/\">Home</a>,\r\n  {\r\n    content: 'Message',\r\n    onClick: () => {\r\n      Message.info('Some message.')\r\n    },\r\n  },\r\n]\r\n\r\nexport default function() {\r\n  return (\r\n    <div style={{ background: '#eee', padding: 20, borderRadius: 10, overflow: 'hidden' }}>\r\n      <Dropdown absolute placeholder=\"Absolute\" data={data} />\r\n      <Dropdown placeholder=\"Default\" data={data} style={{ marginLeft: 40 }} />\r\n    </div>\r\n  )\r\n}\r\n"},54798:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(70655),o=r.__importStar(t(24698)),a=r.__importDefault(t(94184)),l=r.__importDefault(t(15660));t(62356);var i=t(78502);n.default=function(e){var n=e.language,n=void 0===n?"lang-jsx":n,t=e.onHighLight,e=e.value,r=o.useRef(null);return o.useEffect(function(){var e=r.current;l.default.highlightElement(e,!1,function(){t&&t(e.offsetHeight)})},[]),o.default.createElement("pre",{ref:r,className:a.default(n||"lang-jsx",i.exampleClass("pre"))},o.default.createElement("code",null,e))}},7595:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var f=t(70655),m=f.__importStar(t(24698)),r=f.__importDefault(t(45697)),h=t(79136),g=f.__importDefault(t(22276)),b=f.__importDefault(t(69374)),y=t(78502),_=f.__importDefault(t(54798)),v=m.default.createElement("div",{className:y.exampleClass("placeholder")},m.default.createElement(h.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function o(e){var n=e.component,t=e.id,r=e.name,o=e.rawText,a=e.title,l=m.useRef(null),i=f.__read(m.useState(!1),2),d=i[0],c=i[1],u=f.__read(m.useState(m.createElement(n)),1)[0],e=f.__read(m.useState(),2),s=e[0],p=e[1],i=(f.__read(m.useState(),1)[0],o.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());m.useEffect(function(){l.current&&(l.current.style.height=d?s+"px":"0")},[d]);n=function(e){return m.default.createElement("a",{className:y.exampleClass("toggle"),onClick:function(e){c(!d)}.bind(null,e)},m.default.createElement(g.default,{name:d?"code-close":"code"}))},e=b.default.location.search,o="?example=";if(0===e.indexOf(o)&&(e=e.replace(o,""),r.indexOf(e)<0))return null;r=f.__read(a.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return m.default.createElement(m.Fragment,null,e&&m.default.createElement("h3",{key:"0",id:t},e),m.default.createElement(h.Lazyload,{placeholder:v},m.default.createElement("div",{className:y.exampleClass("_",d&&"showcode")},m.default.createElement("div",{className:y.exampleClass("body")},u),0<a.length&&m.default.createElement("div",{className:y.exampleClass("desc")},r.map(function(e,n){return m.default.createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})}),n(!1)),m.default.createElement("div",{ref:l,className:y.exampleClass("code")},m.default.createElement(_.default,{onHighLight:function(e){p(e)},value:i}),n(!0)))))}(n.default=o).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},o.defaultProps={rawText:""}},71126:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t(70655),a=o.__importStar(t(24698)),r=o.__importDefault(t(45697)),l=t(78502),t=function(e){var n=e.children,e=o.__read(a.useState(!1),2),t=e[0],r=e[1],e=n.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),n=t?"pre":"div";return a.default.createElement("div",{onClick:function(){r(!t)},className:l.markdownClass("console")},a.default.createElement(n,null,e))};t.propTypes={children:r.default.array},t.defaultProps={children:[]},n.default=t},15302:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=t(70655),a=o.__importStar(t(24698)),r=o.__importDefault(t(45697)),l=o.__importDefault(t(21046)),i=o.__importDefault(t(17866));n.default=function(){function e(e){var n=o.__read(a.useState(e.source),2),t=n[0],r=n[1];return a.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),t?a.default.createElement(l.default,o.__assign({},e,{source:t})):a.default.createElement(i.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},a.memo(e)}},21046:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var d=t(70655),c=d.__importStar(t(24698)),r=d.__importDefault(t(45697)),u=d.__importDefault(t(30724)),s=t(73727),p=t(70914),f=t(78502),m=d.__importDefault(t(39174)),h=d.__importDefault(t(54798)),g=d.__importDefault(t(7595)),b=d.__importDefault(t(71126)),y=d.__importDefault(t(30681)),_=/^<code name="([\w|-]+)" /,v=/^<example name="([\w|-]+)"/;function o(e){var n=e.onHeadingSetted,o=e.codes,a=e.examples,e=e.source,t=d.__read(c.useState([]),1)[0],l=d.__read(c.useState({}),1)[0];c.useEffect(function(){n&&n(t)},[]);function i(e){t.push(e)}return c.default.createElement(u.default,{className:f.markdownClass("_"),source:e,renderers:{code:h.default,heading:function(e){var n,t=e.level,r=e.children,o=t+"-"+r[0],a="h"+t;return"object"==typeof r[0]?c.default.createElement(a,null,r):(l[o]||(e="heading-"+(n=t,e=r[0],4===n?p.getUidStr():n+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==t&&3!==t||i({id:e,level:t,children:r}),l[o]=c.default.createElement(a,{id:e},r)),l[o])},html:function(e){if("<example />"===e.value)return function(){if(l.examples)return l.examples;if(!a)return c.default.createElement("div",null);var e=m.default("示例","Example"),n="heading-example-h";return i({id:n,level:2,children:[e]}),l.examples=d.__spreadArray([c.default.createElement("h2",{key:"h",id:n},e)],d.__read(a.map(function(e,n){if(/\d+-/.test(e.name)){var t="heading-"+e.name,r=d.__read(e.title.split("\n"),1)[0];return i({id:t,level:3,children:[r]}),c.default.createElement(g.default,d.__assign({key:n,id:t},e))}}))),l.examples}();var n,t=e.value.match(v);if(t)return n=t[1],e.value.indexOf("noExpand"),l[r="example-"+n]||(t=(a||[]).find(function(e){return e.name===n}),l[r]=t?c.default.createElement(g.default,d.__assign({},t)):null),l[r];if("<br>"===e.value||"<br />"===e.value)return c.default.createElement("br",null);var r=e.value.match(_);return r?(e=r[1],(r=o[e])?d.__spreadArray([c.default.createElement(h.default,{key:"cb",value:r.text})],d.__read(r.log.map(function(e,n){return c.default.createElement(b.default,{key:n},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:y.default,link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?c.default.createElement("a",{href:e.href,target:n},e.children):c.default.createElement(s.Link,{to:e.href,target:n},e.children)}}})}(n.default=o).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},o.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,n,t){"use strict";var r=t(70655),o=(r.__importDefault(t(24698)),r.__importDefault(t(15302))),a=(r.__importDefault(t(69048)),o.default());n.ZP=a},69048:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var c=t(70655),u=c.__importStar(t(24698)),s=t(79136),p=t(64744),f=t(78502),m=c.__importDefault(t(69374));n.default=function(d){return function(e){var n=c.__read(u.useState(""),2),r=n[0],o=n[1],a=c.__read(u.useState([]),1)[0],t=e.location.hash,l=p.useUpdate(),n=u.useCallback(function(e){e.forEach(function(e){a.push(e)}),l()},[]),i=u.useCallback(function(){var e;!t||(e=document.querySelector(t))&&setTimeout(function(){e.scrollIntoView()},50)},[t]);u.useEffect(function(){i();function e(){var t,r=document.documentElement.scrollTop,e=a.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(t=e[0].id,e.forEach(function(e){var n=document.querySelector("#"+e.id);n&&n.offsetTop<=r&&(t=e.id)}),o(t))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return u.default.createElement("div",{className:f.navClass("_")},u.default.createElement(d,{onHeadingSetted:n}),!e.noNav&&u.default.createElement(s.Sticky,{className:f.navClass("sticky"),top:50},u.default.createElement("div",{className:f.navClass("nav")},a.map(function(e,n){var t=e.children.filter(function(e){return"string"==typeof e});return u.default.createElement("a",{key:n,className:f.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===m.default.location.search.indexOf("?example=")?m.default.push(m.default.location.pathname+"?example="+e.replace("heading-","")):(m.default.push(m.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},t)}))))}}},30681:function(e,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=t(70655),o=r.__importDefault(t(24698)),t=r.__importDefault(t(45697));function a(e){var e=e.children,n=r.__spreadArray([],r.__read(e[1].props.children));try{n.sort(function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return o.default.createElement("div",{style:{overflow:"auto"}},o.default.createElement("table",{className:"doc-api-table"},e[0],o.default.cloneElement(e[1],{children:n})))}a.propTypes={children:t.default.any},a.defaultProps={},n.default=a},38863:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),o=t(79136),a=[{content:"Submenu",children:[{content:"Link to Google",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},r.default.createElement("a",{href:"/"},"Home"),{content:"Message",onClick:function(){o.Message.info("Some message.")}}];n.Z=function(){return r.default.createElement(o.Dropdown,{placeholder:"Dropdown",data:a})}},81981:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),o=t(79136);n.Z=function(){return r.default.createElement(o.Dropdown,{trigger:"hover",placeholder:"Hover",data:[{content:"First",id:"1",children:[{id:"3",content:"optic 1"}]},{content:"Second",url:"http://www.google.com",id:"2",children:[{content:"topic 2",id:4,children:[{id:"6",content:"topic 3"}]}]}]})}},74664:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),o=t(79136),a={marginRight:12,marginBottom:12};n.Z=function(){var e=[{content:"First",id:"1",children:[{content:"link1",id:"4"},{content:"link2",id:"5"}]},{content:"Second",url:"http://www.google.com",id:"2",children:[{content:"link3",id:6,onClick:function(){console.log("this is special")}},{content:"link4",id:7,children:[{id:"8",content:"link5"},{id:"9",content:"link6"}]}]}];return r.default.createElement("div",null,r.default.createElement(o.Dropdown,{placeholder:"Right Top",style:a,position:"right-top",data:e}),r.default.createElement(o.Dropdown,{placeholder:"Bottom Left",style:a,position:"bottom-left",data:e}),r.default.createElement(o.Dropdown,{placeholder:"Bottom Right",style:a,position:"bottom-right",data:e}),r.default.createElement(o.Dropdown,{placeholder:"Left Top",style:a,position:"left-top",data:e}),r.default.createElement("br",null),r.default.createElement(o.Dropdown,{placeholder:"Right Bottom",style:a,position:"right-bottom",data:e}),r.default.createElement(o.Dropdown,{placeholder:"Top Left",style:a,position:"top-left",data:e}),r.default.createElement(o.Dropdown,{placeholder:"Top Right",style:a,position:"top-right",data:e}),r.default.createElement(o.Dropdown,{placeholder:"Left Bottom",style:a,position:"left-bottom",data:e}),r.default.createElement("br",null),r.default.createElement(o.Dropdown,{placeholder:"Auto Position",style:a,position:"auto",data:e}))}},44956:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),o=t(79136);n.Z=function(){for(var e=[],n=1;n<=30;n++)e.push({id:""+n,content:"item"+n});return r.default.createElement(o.Dropdown,{placeholder:"Dropdown",width:500,columns:5,data:e})}},88824:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),o=t(79136),a=[{content:"First"},{content:"Second",target:"_blank",url:"http://www.google.com"}];n.Z=function(){return r.default.createElement(o.Button.Group,null,r.default.createElement(o.Button,{onClick:function(){return o.Message.info("The left button clicked.")}},"Left"),r.default.createElement(o.Button,null,"Center"),r.default.createElement(o.Dropdown,{onClick:function(e){return o.Message.info("The Dropdown clicked "+e.content+".")},position:"bottom-right",data:a}))}},41270:function(e,n,t){"use strict";var r,o=t(70655),a=o.__importStar(t(24698)),l=t(79136),i=[{content:"Submenu",children:[{content:"Link",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},{content:"Message",onClick:function(){l.Message.info("Some message.")}}],o=(r=a.Component,o.__extends(d,r),d.prototype.changeSetting=function(e,n){var t;this.setState(((t={})[e]=n,t))},d.prototype.render=function(){var e=this.state,n=e.type,t=e.outline,r=e.size,e=e.disabled;return a.default.createElement("div",null,a.default.createElement("div",{style:{marginBottom:20}},a.default.createElement("span",null,"type: "),a.default.createElement(l.Select,{width:140,keygen:function(e){return e},data:["primary","success","warning","danger"],value:n,onChange:this.changeSetting.bind(this,"type"),style:{marginRight:20}}),a.default.createElement("span",null,"size: "),a.default.createElement(l.Select,{width:100,keygen:function(e){return e},data:["small","default","large"],value:r,onChange:this.changeSetting.bind(this,"size"),style:{marginRight:20}}),a.default.createElement(l.Checkbox,{value:t,onChange:this.changeSetting.bind(this,"outline")},"outline"),a.default.createElement(l.Checkbox,{value:e,onChange:this.changeSetting.bind(this,"disabled")},"disabled")),a.default.createElement(l.Dropdown,{placeholder:"Dropdown",data:i,disabled:e,outline:t,size:r,type:n}))},d);function d(e){e=r.call(this,e)||this;return e.state={type:"primary",size:"default",disabled:!1,outline:!1},e}n.Z=o},28809:function(e,n,t){"use strict";var r=t(70655).__importDefault(t(24698)),o=t(79136),a=[{content:"Submenu",children:[{content:"Link to Google",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},r.default.createElement("a",{href:"/"},"Home"),{content:"Message",onClick:function(){o.Message.info("Some message.")}}];n.Z=function(){return r.default.createElement("div",{style:{background:"#eee",padding:20,borderRadius:10,overflow:"hidden"}},r.default.createElement(o.Dropdown,{absolute:!0,placeholder:"Absolute",data:a}),r.default.createElement(o.Dropdown,{placeholder:"Default",data:a,style:{marginLeft:40}}))}}}]);