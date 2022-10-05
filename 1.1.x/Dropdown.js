(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[983],{37810:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return u}});var r=n(67154),o=n.n(r),t=n(24698),a=n.n(t),r=n(54365),t=n.n(r),r=n(82281),l=n.n(r),r=n(70954),i=(0,r.default)("# Dropdown *下拉菜单*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Dropdown\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| className | string | 无 | 扩展className |\r\n| columns | number | 无 | 页面多元素展示,此属性需要依赖width属性,请合理的设置列数和宽度 |\r\n| data | object[] | 必填 | 下拉数据，详见data |\r\n| disabled | boolean | false | 禁用 |\r\n| onClick | (data: object) => void | 无 | 点击事件。参数为渲染的数据, <br /> 注: 如果数据内设置了onClick，会忽略此方法，调用data.onClick |\r\n| placeholder | string \\| ReactNode | 必填 | 按钮显示内容 |\r\n| renderItem | (data: object) => ReactNode \\| string | 'content' | 设置显示的内容,如果是字符串,则为对应的值<br />如果是函数,则返回值为显示的内容,参数为当条数据 |\r\n| buttonProps | ButtonProps | 无 | 同 [Button](/components/Button) |\r\n| trigger | 'click' \\| 'hover' | 'click' | 触发方式 |\r\n| width | number | 无 | 弹出选项层的宽度 |\r\n| animation | boolean | true | 是否开启动画 |\r\n| position | string | 'auto' | 位置，可选值:'right-top'\\|'bottom-left'\\|'bottom-right'\\|'left-top'\\|'right-bottom'\\|'top-left'\\|'top-right'\\|'left-bottom'\\|'auto'|\r\n\r\n### DropdownData\r\n\r\ndata 选项有三种情况：\r\n\r\n- 为 ReactElement 时，直接显示此元素。\r\n\r\n- 为 object 且设置了 renderItem，显示 renderItem 返回的内容。\r\n\r\n- 为 object 且未设置 renderItem，按以下数据结构处理。\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| content | string \\| element | | 默认从content获取内容 |\r\n| url | string | 无 | url属性不为空时，render为一个链接 |\r\n| target | string | 无 | url 不为空时有效 |\r\n| onClick | function | 无 | 点击事件 |\r\n","# Dropdown\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Dropdown\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| className | string | none | Extend className |\r\n| columns | number | none | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately. |\r\n| data | object[] | required | See the detail in the data of the drop down box. |\r\n| disabled | boolean | false | disabled |\r\n| onClick | (data: object) => void | none | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called. |\r\n| placeholder | string \\| ReactNode | required | Displayed content of the button |\r\n| renderItem | (data: object) => ReactNode \\| string | 'content' | Set the displayed content. If it is a string,  the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |\r\n| buttonProps | ButtonProps | none | The same as [Button](/components/Button) |\r\n| trigger | 'click' \\| 'hover' | 'click' | Toggle mode, options |\r\n| width | number | none | The width of the pop-up option layer |\r\n| animation | boolean | true | animation toggle |\r\n| position | string | 'auto' | position,optional value:'right-top'\\|'bottom-left'\\|'bottom-right'\\|'left-top'\\|'right-bottom'\\|'top-left'\\|'top-right'\\|'left-bottom'\\|'auto'|\r\n\r\n\r\n### DropdownData\r\n\r\n- If data item is a ReactElement, render the item;\r\n- If data item is an object and renderItem is set, render the renderItem's result;\r\n- if data item is an object and renderItem is not set, handle the parameters as follows;\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| content | string \\| element | |  |\r\n| url | string | none | When the url is not empty, a url will be rendered. |\r\n| target | string | none | It is valid when the url is not empty. |\r\n| onClick | function | none | The click event |\r\n"),c=[{name:"1-basex",title:(0,r.default)("基本用法 \n Dropdown 通过数据来渲染，支持 json 格式数据、React 组件","Base \n Dropdown is rendered through data and supports json formatted data and React components."),component:n(14115).default,rawText:n(49775).Z},{name:"2-hoverx",title:(0,r.default)('触发 \n Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发','Trigger \n By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.'),component:n(82080).default,rawText:n(88981).Z},{name:"3-positionx",title:(0,r.default)("弹出位置 \n 设置 position 属性可以控制下拉菜单弹出的方向和位置","Position \n Set position property can control the direction and position of the drop-down menu."),component:n(19791).default,rawText:n(77471).Z},{name:"4-itemsx",title:(0,r.default)("多列平铺 \n 设置 columns 属性可以让选项多列平铺","Multiple columns \n Set columns property can make the option multi-column tiled."),component:n(60691).default,rawText:n(13824).Z},{name:"5-splitx",title:(0,r.default)("组合 \n 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项","Group \n Dropdown can be combined with Button used in Button.Group."),component:n(47629).default,rawText:n(14177).Z},{name:"6-typex",title:(0,r.default)("样式 \n Button 样式","type \n Button style"),component:n(82134).default,rawText:n(55903).Z},{name:"7-basex",title:(0,r.default)("绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。","Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer."),component:n(61052).default,rawText:n(85064).Z}],u=t()(function(e){return a().createElement(l(),o()({},e,{source:i,examples:c}))})},49775:function(e,t){"use strict";t.Z="/**\r\n * cn - 基本用法\r\n *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件\r\n * en - Base\r\n *    -- Dropdown is rendered through data and supports json formatted data and React components.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown, Message } from 'ethan-ui'\r\n\r\nconst data = [\r\n    {\r\n        content: 'Submenu',\r\n        children: [\r\n            {\r\n                content: 'Link to Google',\r\n                target: '_blank',\r\n                url: 'https://google.com',\r\n            },\r\n            {\r\n                content: 'Disabled',\r\n                disabled: true,\r\n            },\r\n        ],\r\n    },\r\n    <a href=\"/\">Home</a>,\r\n    {\r\n        content: 'Message',\r\n        onClick: () => {\r\n            Message.info('Some message.')\r\n        },\r\n    },\r\n]\r\n\r\nexport default function() {\r\n    return <Dropdown placeholder=\"Dropdown\" data={data} />\r\n}\r\n"},88981:function(e,t){"use strict";t.Z="/**\r\n * cn - 触发\r\n *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger=\"hover\" 属性可以改为移入触发\r\n * en - Trigger\r\n *    -- By default, Dropdown toggled clicking, setting trigger=\"hover\" can toggled by mouse move in.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    const menu = [\r\n        {\r\n            content: 'First',\r\n            id: '1',\r\n            children: [\r\n                {\r\n                    id: '3',\r\n                    content: 'optic 1',\r\n                },\r\n            ],\r\n        },\r\n        {\r\n            content: 'Second',\r\n            url: 'http://www.google.com',\r\n            id: '2',\r\n            children: [\r\n                {\r\n                    content: 'topic 2',\r\n                    id: 4,\r\n                    children: [\r\n                        {\r\n                            id: '6',\r\n                            content: 'topic 3',\r\n                        },\r\n                    ],\r\n                },\r\n            ],\r\n        },\r\n    ]\r\n\r\n    return <Dropdown trigger=\"hover\" placeholder=\"Hover\" data={menu} />\r\n}\r\n"},77471:function(e,t){"use strict";t.Z="/**\r\n * cn - 弹出位置\r\n *    -- 设置 position 属性可以控制下拉菜单弹出的方向和位置\r\n * en - Position\r\n *    -- Set position property can control the direction and position of the drop-down menu.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown } from 'ethan-ui'\r\n\r\nconst style = { marginRight: 12, marginBottom: 12 }\r\n\r\nexport default function() {\r\n    const menu = [\r\n        {\r\n            content: 'First',\r\n            id: '1',\r\n            children: [\r\n                {\r\n                    content: 'link1',\r\n                    id: '4',\r\n                },\r\n                {\r\n                    content: 'link2',\r\n                    id: '5',\r\n                },\r\n            ],\r\n        },\r\n        {\r\n            content: 'Second',\r\n            url: 'http://www.google.com',\r\n            id: '2',\r\n            children: [\r\n                {\r\n                    content: 'link3',\r\n                    id: 6,\r\n                    onClick: () => {\r\n                        console.log('this is special')\r\n                    },\r\n                },\r\n                {\r\n                    content: 'link4',\r\n                    id: 7,\r\n                    children: [\r\n                        {\r\n                            id: '8',\r\n                            content: 'link5',\r\n                        },\r\n                        {\r\n                            id: '9',\r\n                            content: 'link6',\r\n                        },\r\n                    ],\r\n                },\r\n            ],\r\n        },\r\n    ]\r\n\r\n    return (\r\n        <div>\r\n            <Dropdown placeholder=\"Right Top\" style={style} position=\"right-top\" data={menu} />\r\n\r\n            <Dropdown placeholder=\"Bottom Left\" style={style} position=\"bottom-left\" data={menu} />\r\n\r\n            <Dropdown placeholder=\"Bottom Right\" style={style} position=\"bottom-right\" data={menu} />\r\n\r\n            <Dropdown placeholder=\"Left Top\" style={style} position=\"left-top\" data={menu} />\r\n\r\n            <br />\r\n\r\n            <Dropdown placeholder=\"Right Bottom\" style={style} position=\"right-bottom\" data={menu} />\r\n\r\n            <Dropdown placeholder=\"Top Left\" style={style} position=\"top-left\" data={menu} />\r\n\r\n            <Dropdown placeholder=\"Top Right\" style={style} position=\"top-right\" data={menu} />\r\n\r\n            <Dropdown placeholder=\"Left Bottom\" style={style} position=\"left-bottom\" data={menu} />\r\n\r\n            <br />\r\n            <Dropdown placeholder=\"Auto Position\" style={style} position=\"auto\" data={menu} />\r\n        </div>\r\n    )\r\n}\r\n"},13824:function(e,t){"use strict";t.Z="/**\r\n * cn - 多列平铺\r\n *    -- 设置 columns 属性可以让选项多列平铺\r\n * en - Multiple columns\r\n *    -- Set columns property can make the option multi-column tiled.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    const menu = []\r\n    for (let i = 1; i <= 30; i++) {\r\n        menu.push({\r\n            id: `${i}`,\r\n            content: `item${i}`,\r\n        })\r\n    }\r\n\r\n    return <Dropdown placeholder=\"Dropdown\" width={500} columns={5} data={menu} />\r\n}\r\n"},14177:function(e,t){"use strict";t.Z="/**\r\n * cn - 组合\r\n *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项\r\n * en - Group\r\n *    -- Dropdown can be combined with Button used in Button.Group.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown, Message, Button } from 'ethan-ui'\r\n\r\nconst menu = [\r\n    {\r\n        content: 'First',\r\n    },\r\n    {\r\n        content: 'Second',\r\n        target: '_blank',\r\n        url: 'http://www.google.com',\r\n    },\r\n]\r\n\r\nexport default function() {\r\n    return (\r\n        <Button.Group>\r\n            <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>\r\n            <Button>Center</Button>\r\n            <Dropdown\r\n                onClick={data => Message.info(`The Dropdown clicked ${data.content}.`)}\r\n                position=\"bottom-right\"\r\n                data={menu}\r\n            />\r\n        </Button.Group>\r\n    )\r\n}\r\n"},55903:function(e,t){"use strict";t.Z="/**\r\n * cn - 样式\r\n *    -- Button 样式\r\n * en - type\r\n *    -- Button style\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Dropdown, Message, Select, Checkbox } from 'ethan-ui'\r\n\r\nconst menu = [\r\n    {\r\n        content: 'Submenu',\r\n        children: [\r\n            {\r\n                content: 'Link',\r\n                target: '_blank',\r\n                url: 'https://google.com',\r\n            },\r\n            {\r\n                content: 'Disabled',\r\n                disabled: true,\r\n            },\r\n        ],\r\n    },\r\n    {\r\n        content: 'Message',\r\n        onClick: () => {\r\n            Message.info('Some message.')\r\n        },\r\n    },\r\n]\r\n\r\nexport default class extends Component {\r\n    constructor(props) {\r\n        super(props)\r\n        this.state = {\r\n            type: 'primary',\r\n            size: 'default',\r\n            disabled: false,\r\n            outline: false,\r\n        }\r\n    }\r\n\r\n    changeSetting(name, value) {\r\n        this.setState({ [name]: value })\r\n    }\r\n\r\n    render() {\r\n        const { type, outline, size, disabled } = this.state\r\n        return (\r\n            <div>\r\n                <div style={{ marginBottom: 20 }}>\r\n                    <span>type: </span>\r\n                    <Select\r\n                        width={140}\r\n                        keygen={d => d}\r\n                        data={['primary', 'success', 'warning', 'danger']}\r\n                        value={type}\r\n                        onChange={this.changeSetting.bind(this, 'type')}\r\n                        style={{ marginRight: 20 }}\r\n                    />\r\n\r\n                    <span>size: </span>\r\n                    <Select\r\n                        width={100}\r\n                        keygen={d => d}\r\n                        data={['small', 'default', 'large']}\r\n                        value={size}\r\n                        onChange={this.changeSetting.bind(this, 'size')}\r\n                        style={{ marginRight: 20 }}\r\n                    />\r\n\r\n                    <Checkbox value={outline} onChange={this.changeSetting.bind(this, 'outline')}>\r\n                        outline\r\n                    </Checkbox>\r\n\r\n                    <Checkbox value={disabled} onChange={this.changeSetting.bind(this, 'disabled')}>\r\n                        disabled\r\n                    </Checkbox>\r\n                </div>\r\n\r\n                <Dropdown\r\n                    placeholder=\"Dropdown\"\r\n                    data={menu}\r\n                    disabled={disabled}\r\n                    buttonProps={{ size, type, outline }}\r\n                />\r\n            </div>\r\n        )\r\n    }\r\n}\r\n"},85064:function(e,t){"use strict";t.Z="/**\r\n * cn - 绝对定位\r\n *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。\r\n * en - Absolute\r\n *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.\r\n */\r\nimport React from 'react'\r\nimport { Dropdown, Message } from 'ethan-ui'\r\n\r\nconst data = [\r\n    {\r\n        content: 'Submenu',\r\n        children: [\r\n            {\r\n                content: 'Link to Google',\r\n                target: '_blank',\r\n                url: 'https://google.com',\r\n            },\r\n            {\r\n                content: 'Disabled',\r\n                disabled: true,\r\n            },\r\n        ],\r\n    },\r\n    <a href=\"/\">Home</a>,\r\n    {\r\n        content: 'Message',\r\n        onClick: () => {\r\n            Message.info('Some message.')\r\n        },\r\n    },\r\n]\r\n\r\nexport default function() {\r\n    return (\r\n        <div style={{ background: '#eee', padding: 20, borderRadius: 10, overflow: 'hidden' }}>\r\n            <Dropdown absolute placeholder=\"Absolute\" data={data} />\r\n            <Dropdown placeholder=\"Default\" data={data} style={{ marginLeft: 40 }} />\r\n        </div>\r\n    )\r\n}\r\n"},95510:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=a(n(24698)),c=l(n(94184)),u=l(n(15660));n(62356);var d=n(36910);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=(0,i.useRef)(null);return(0,i.useEffect)(function(){var e=r.current;u.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),i.default.createElement("pre",{ref:r,className:(0,c.default)(t||"lang-jsx",(0,d.exampleClass)("pre"))},i.default.createElement("code",null,e))}},84241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},u=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),l=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)l.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return l},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var d=a(n(24698)),s=n(12101),f=l(n(21588)),p=n(36910),m=l(n(20164)),h=l(n(95510));t.default=d.default.memo(function(e){var t=e.component,n=e.id,r=e.rawText,o=void 0===r?"":r,a=e.title,l=u((0,d.useState)(!1),2),i=l[0],c=l[1],r=(0,d.useRef)((0,d.createElement)(t)).current,e=o.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),l=u(a.split("\n")),t=l[0],o=l.slice(1),l=function(){c(!i)};return d.default.createElement(d.default.Fragment,null,t&&d.default.createElement("h3",{id:n},t),d.default.createElement(s.Lazyload,{placeholder:d.default.createElement("div",{className:(0,p.exampleClass)("placeholder")},d.default.createElement(s.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},d.default.createElement("div",{className:(0,p.exampleClass)("_",i&&"showcode")},d.default.createElement("div",{className:(0,p.exampleClass)("body")},r),0<a.length&&d.default.createElement("div",{className:(0,p.exampleClass)("desc")},o.map(function(e,t){return d.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),d.default.createElement("a",{className:(0,p.exampleClass)("toggle"),onClick:l},d.default.createElement(f.default,{name:i?"code-close":"code"}))),d.default.createElement(m.default,{height:i?"auto":0,easing:"linear",className:(0,p.exampleClass)("code"),duration:240},d.default.createElement(h.default,{value:e}),d.default.createElement("a",{className:(0,p.exampleClass)("toggle"),onClick:l},d.default.createElement(f.default,{name:i?"code-close":"code"}))))))})},82281:function(e,t,n){"use strict";var a=this&&this.__assign||function(){return(a=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},l=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),l=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)l.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return l},i=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=r(n(24698)),u=r(n(30724)),d=n(69087),o=n(17911),s=n(36910),f=r(n(70954)),p=r(n(95510)),m=r(n(84241)),h=r(n(86212)),g=/^<example name="([\w|-]+)"/,b=function(e,t){return 4===e?(0,o.getUidStr)():"".concat(e,"-").concat((t||"").replace(/[\W|-]/g,"-"))};t.default=c.default.memo(function(e){var t=e.onHeadingSet,r=e.examples,e=e.source,n=c.default.useRef([]).current;function o(e){n.push(e)}return c.default.useEffect(function(){null!=t&&t(n)},[]),c.default.createElement(u.default,{className:(0,s.markdownClass)("_"),source:e,renderers:{code:p.default,heading:function(e){var t=e.level,n=e.children,r="h".concat(t),e="heading-".concat(b(t,n[0]));return 2!==t&&3!==t||o({id:e,level:t,children:n}),c.default.createElement(r,{id:e},n)},html:function(e){if("<example />"===e.value)return function(){if(!r)return c.default.createElement("div",null);var e=(0,f.default)("示例","Example"),t="heading-example-h";return o({id:t,level:2,children:[e]}),i([c.default.createElement("h2",{key:"h",id:t},e)],l(r.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),r=l(e.title.split("\n"),1)[0];return o({id:n,level:3,children:[r]}),c.default.createElement(m.default,a({key:t,id:n},e))}})),!1)}();var t,n=e.value.match(g);return n?(t=n[1],(n=(r||[]).find(function(e){return e.name===t}))?c.default.createElement(m.default,a({},n)):null):"<br>"===e.value||"<br />"===e.value?c.default.createElement("br",null):null},table:h.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?c.default.createElement("a",{href:e.href,target:t},e.children):c.default.createElement(d.Link,{to:e.href,target:t},e.children)}}})})},54365:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},i=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),l=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)l.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return l},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var c=a(n(24698)),u=n(12101),d=n(64744),s=n(36910),f=l(n(98789));t.default=function(l){return c.default.memo(function(e){var t=e.noNav,e=i((0,c.useState)(""),2),r=e[0],o=e[1],e=i((0,c.useState)([]),2),a=e[0],e=e[1],n=(0,d.useLocation)().hash;(0,c.useEffect)(function(){function e(){var n,r=document.documentElement.scrollTop,e=a.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));(null==t?void 0:t.offsetTop)<=r&&(n=e.id)}),o(n))}var t;return e(),n&&(t=document.querySelector(n),setTimeout(function(){null!=t&&t.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[a]);return c.default.createElement("div",{className:(0,s.navClass)("_")},c.default.createElement(l,{onHeadingSet:e}),!t&&c.default.createElement(u.Sticky,{className:(0,s.navClass)("sticky"),top:50},c.default.createElement("div",{className:(0,s.navClass)("nav")},a.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return c.default.createElement("a",{key:t,className:(0,s.navClass)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===f.default.location.search.indexOf("?example=")?f.default.push("".concat(f.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(f.default.push("".concat(f.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))})}},86212:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,a=n.call(e),l=[];try{for(;(void 0===t||0<t--)&&!(r=a.next()).done;)l.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=a.return)&&n.call(a)}finally{if(o)throw o.error}}return l},o=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,a=t.length;o<a;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))},a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=a(n(24698));t.default=function(e){var e=e.children,t=o([],r(e[1].props.children),!1);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return l.default.createElement("div",{style:{overflow:"auto"}},l.default.createElement("table",{className:"doc-api-table"},e[0],l.default.cloneElement(e[1],{children:t})))}},14115:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),a=n(12101),l=[{content:"Submenu",children:[{content:"Link to Google",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},o.default.createElement("a",{href:"/"},"Home"),{content:"Message",onClick:function(){a.Message.info("Some message.")}}];t.default=function(){return o.default.createElement(a.Dropdown,{placeholder:"Dropdown",data:l})}},82080:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),a=n(12101);t.default=function(){return o.default.createElement(a.Dropdown,{trigger:"hover",placeholder:"Hover",data:[{content:"First",id:"1",children:[{id:"3",content:"optic 1"}]},{content:"Second",url:"http://www.google.com",id:"2",children:[{content:"topic 2",id:4,children:[{id:"6",content:"topic 3"}]}]}]})}},19791:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),a=n(12101),l={marginRight:12,marginBottom:12};t.default=function(){var e=[{content:"First",id:"1",children:[{content:"link1",id:"4"},{content:"link2",id:"5"}]},{content:"Second",url:"http://www.google.com",id:"2",children:[{content:"link3",id:6,onClick:function(){console.log("this is special")}},{content:"link4",id:7,children:[{id:"8",content:"link5"},{id:"9",content:"link6"}]}]}];return o.default.createElement("div",null,o.default.createElement(a.Dropdown,{placeholder:"Right Top",style:l,position:"right-top",data:e}),o.default.createElement(a.Dropdown,{placeholder:"Bottom Left",style:l,position:"bottom-left",data:e}),o.default.createElement(a.Dropdown,{placeholder:"Bottom Right",style:l,position:"bottom-right",data:e}),o.default.createElement(a.Dropdown,{placeholder:"Left Top",style:l,position:"left-top",data:e}),o.default.createElement("br",null),o.default.createElement(a.Dropdown,{placeholder:"Right Bottom",style:l,position:"right-bottom",data:e}),o.default.createElement(a.Dropdown,{placeholder:"Top Left",style:l,position:"top-left",data:e}),o.default.createElement(a.Dropdown,{placeholder:"Top Right",style:l,position:"top-right",data:e}),o.default.createElement(a.Dropdown,{placeholder:"Left Bottom",style:l,position:"left-bottom",data:e}),o.default.createElement("br",null),o.default.createElement(a.Dropdown,{placeholder:"Auto Position",style:l,position:"auto",data:e}))}},60691:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),a=n(12101);t.default=function(){for(var e=[],t=1;t<=30;t++)e.push({id:"".concat(t),content:"item".concat(t)});return o.default.createElement(a.Dropdown,{placeholder:"Dropdown",width:500,columns:5,data:e})}},47629:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),a=n(12101),l=[{content:"First"},{content:"Second",target:"_blank",url:"http://www.google.com"}];t.default=function(){return o.default.createElement(a.Button.Group,null,o.default.createElement(a.Button,{onClick:function(){return a.Message.info("The left button clicked.")}},"Left"),o.default.createElement(a.Button,null,"Center"),o.default.createElement(a.Dropdown,{onClick:function(e){return a.Message.info("The Dropdown clicked ".concat(e.content,"."))},position:"bottom-right",data:l}))}},82134:function(e,t,n){"use strict";var r,o=this&&this.__extends||(r=function(e,t){return(r=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n])})(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null");function n(){this.constructor=e}r(e,t),e.prototype=null===t?Object.create(t):(n.prototype=t.prototype,new n)}),a=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),l=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),i=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&a(t,e,n);return l(t,e),t};Object.defineProperty(t,"__esModule",{value:!0});var c,u=i(n(24698)),d=n(12101),s=[{content:"Submenu",children:[{content:"Link",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},{content:"Message",onClick:function(){d.Message.info("Some message.")}}],o=(c=u.Component,o(f,c),f.prototype.changeSetting=function(e,t){var n;this.setState(((n={})[e]=t,n))},f.prototype.render=function(){var e=this.state,t=e.type,n=e.outline,r=e.size,e=e.disabled;return u.default.createElement("div",null,u.default.createElement("div",{style:{marginBottom:20}},u.default.createElement("span",null,"type: "),u.default.createElement(d.Select,{width:140,keygen:function(e){return e},data:["primary","success","warning","danger"],value:t,onChange:this.changeSetting.bind(this,"type"),style:{marginRight:20}}),u.default.createElement("span",null,"size: "),u.default.createElement(d.Select,{width:100,keygen:function(e){return e},data:["small","default","large"],value:r,onChange:this.changeSetting.bind(this,"size"),style:{marginRight:20}}),u.default.createElement(d.Checkbox,{value:n,onChange:this.changeSetting.bind(this,"outline")},"outline"),u.default.createElement(d.Checkbox,{value:e,onChange:this.changeSetting.bind(this,"disabled")},"disabled")),u.default.createElement(d.Dropdown,{placeholder:"Dropdown",data:s,disabled:e,buttonProps:{size:r,type:t,outline:n}}))},f);function f(e){e=c.call(this,e)||this;return e.state={type:"primary",size:"default",disabled:!1,outline:!1},e}t.default=o},61052:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),a=n(12101),l=[{content:"Submenu",children:[{content:"Link to Google",target:"_blank",url:"https://google.com"},{content:"Disabled",disabled:!0}]},o.default.createElement("a",{href:"/"},"Home"),{content:"Message",onClick:function(){a.Message.info("Some message.")}}];t.default=function(){return o.default.createElement("div",{style:{background:"#eee",padding:20,borderRadius:10,overflow:"hidden"}},o.default.createElement(a.Dropdown,{absolute:!0,placeholder:"Absolute",data:l}),o.default.createElement(a.Dropdown,{placeholder:"Default",data:l,style:{marginLeft:40}}))}}}]);