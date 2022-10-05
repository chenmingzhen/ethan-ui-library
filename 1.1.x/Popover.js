(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[503],{85406:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return c}});var r=n(67154),o=n.n(r),t=n(24698),l=n.n(t),r=n(54365),t=n.n(r),r=n(82281),i=n.n(r),r=n(70954),a=(0,r.default)("# Popover *气泡*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Popover\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| visible | boolean | 无 | 是否显示(受控) |\r\n| onVisibleChange | (visible: boolean) => void | 无 | 显示隐藏改变时事件 | \r\n| mouseEnterDelay | number | 0.15 | 移入显示延迟(毫秒) | \r\n| mouseLeaveDelay | number | 0.15 | 移除隐藏延迟(毫秒) | \r\n| className | string | 无 | 扩展className |\r\n| children | ReactNode | 必填 | 弹出显示内容 |\r\n| position | 'top-left' \\| 'top' \\| 'top-right' \\| 'left-top' \\| 'left' \\| 'left-bottom' \\| 'right-top' \\| 'right' \\| 'right-bottom' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | 'top' | 弹出层位置 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n| trigger | 'click' \\| 'hover'\\|[] | 'hover' | 触发方式 |\r\n| priorityDirection | string | 'vertical' | 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效, 可选值\\['vertical', 'horizontal'] |\r\n| getPopupContainer | () => HTMLElement | 无 | 自定义Popover容器，覆盖默认渲染在body下的行为, () => DOMElement |\r\n| showArrow | boolean | true | 是否展示箭头 |\r\n| autoAdjustOverflow | boolean | true | 气泡被遮挡时是否自动调整位置 |\r\n\r\n\r\n### Popover.Confirm\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| onOk | () => void | 无 | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |\r\n| onCancel | () => void | 无 | 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |\r\n| text | object | { ok: 'Ok', cancel: 'Cancel' } | 按钮文字 |\r\n| type | string | *warning* |  icon的类型，4 选 1，\\[*success*, *info*, *warning*, *danger(error)*] |\r\n| description | ReactNode | 无 |  确认框的描述 |\r\n| buttonProps | ButtonProps | {ok:ButtonProps,cancel:ButtonProps} |  按钮Props |\r\n\r\n\r\n## 注意\r\n请确保 Popover 的父元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。\r\n","# Popover\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Popover \r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| visible | boolean | - | is visible (controlled) |\r\n| onVisibleChange | (visible: boolean) => void | - | the event of visible change | \r\n| mouseEnterDelay | number | 0.15 | the show delay of mouseenter(ms) | \r\n| mouseLeaveDelay | number | 0.15 | the hidden delay of mouseleave (ms) | \r\n| className | string | - | Extend className |\r\n| children | ReactNode | required | Pop-up content. |\r\n| position | 'top-left' \\| 'top' \\| 'top-right' \\| 'left-top' \\| 'left' \\| 'left-bottom' \\| 'right-top' \\| 'right' \\| 'right-bottom' \\| 'bottom-left' \\| 'bottom' \\| 'bottom-right' | 'top' | The position of pop-up layer |\r\n| style | object | - | The pop-up container style |\r\n| trigger | 'click' \\| 'hover' | 'hover'\\|[] | type of show |\r\n| priorityDirection | string | 'vertical' | Popup location priority, default is left and right priority, only valid when position is not set, Options: \\['vertical', 'horizontal'] |\r\n| getPopupContainer | () => HTMLElement | none | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |\r\n| showArrow | boolean | true | Whether to show arrow |\r\n| autoAdjustOverflow | boolean | true | Whether the popover automatically adjusts its position when it is blocked |\r\n\r\n### Popover.Confirm\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| onOk | () => void | none | ok button click callback, will close tooltip while returned promise resolve |\r\n| onCancel | () => void | none | cancel button click callback, will close tooltip while returned promise resolve |\r\n| text | object | { ok: 'Ok', cancel: 'Cancel' } | button text |\r\n| type | string | *warning* |  icon type \\[*success*, *info*, *warning*, *danger(error)*] |\r\n| description | ReactNode | none |  Confirm the description of the box |\r\n| buttonProps | ButtonProps | {ok:ButtonProps,cancel:ButtonProps} |  ButtonProps |\r\n\r\n\r\n### PopoverNote\r\nPlease ensure that the parent node of `Popover` accepts `onMouseEnter`, `onMouseLeave`, `onFocus`, `onClick` events.\r\n"),u=[{name:"1-basex",title:(0,r.default)("基本用法 \n Popover 放置在一个组件内部弹出","Base \n The basic usage."),component:n(92056).default,rawText:n(36372).Z},{name:"1-controlx",title:(0,r.default)("受控 \n 可以通过visible使Popover受控","Control \n Use visible to control the show or hidden"),component:n(17343).default,rawText:n(10670).Z},{name:"10-containerx",title:(0,r.default)("自定义容器 \n 使用 getPopupContainer 指定渲染的目标容器","Custom container \n use getPopupContainer return target container"),component:n(75788).default,rawText:n(66715).Z},{name:"2-delayx",title:(0,r.default)("延迟 \n 可以设置展示延时和关闭延时","delay \n the hidden/show delay"),component:n(15692).default,rawText:n(51690).Z},{name:"2-positionx",title:(0,r.default)("弹出位置 \n 内置了十二个弹出的位置","Position \n Twelve pop-up positions are built in."),component:n(29812).default,rawText:n(6981).Z},{name:"3-triggerx",title:(0,r.default)("触发方式 \n 默认是移入组件触发，设置 trigger 为 'click'或Trigger数组，可以改变触发方式","Trigger \n Set the trigger property to change the trigger event."),component:n(47314).default,rawText:n(80312).Z},{name:"4-confirmx",title:(0,r.default)("确认 \n Popover.Confirm 提供弹出气泡式的确认框","Confirm \n Popover.Confirm provide popover confirm."),component:n(20832).default,rawText:n(80590).Z},{name:"5-funcx",title:(0,r.default)("关闭事件 \n content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件","Close \n Set the content property to a function, you can handle the close event inside the popup panel."),component:n(56760).default,rawText:n(47006).Z},{name:"6-arrowx",title:(0,r.default)("箭头 \n 设置allowArrow属性用于控制箭头的显示","Close \n Set the allowArrow property to show arrow."),component:n(2366).default,rawText:n(86904).Z}],c=t()(function(e){return l().createElement(i(),o()({},e,{source:a,examples:u}))})},36372:function(e,t){"use strict";t.Z='/**\r\n * cn - 基本用法\r\n *    -- Popover 放置在一个组件内部弹出\r\n * en - Base\r\n *    -- The basic usage.\r\n */\r\nimport React from \'react\'\r\nimport { Button, Popover } from \'ethan-ui\'\r\n\r\nexport default function() {\r\n    return (\r\n        <Popover title="title" content="content" trigger="hover">\r\n            <Button>Hover</Button>\r\n        </Popover>\r\n    )\r\n}\r\n'},10670:function(e,t){"use strict";t.Z='/**\r\n * cn - 受控\r\n *    -- 可以通过visible使Popover受控\r\n * en -  Control\r\n *    -- Use visible to control the show or hidden\r\n */\r\nimport React from \'react\'\r\nimport { Button, Popover } from \'ethan-ui\'\r\n\r\nexport default () => {\r\n    const [visible, updateVisible] = React.useState(true)\r\n\r\n    return (\r\n        <div>\r\n            <Popover\r\n                visible={visible}\r\n                style={{ width: 200, padding: 20 }}\r\n                content="some text"\r\n                title="control"\r\n                trigger="click"\r\n                onVisibleChange={v => {\r\n                    console.log(\'onVisibleChange:\', v)\r\n\r\n                    if (v) {\r\n                        updateVisible(true)\r\n                    }\r\n                }}\r\n            >\r\n                <Button>Control</Button>\r\n            </Popover>\r\n\r\n            <Button\r\n                type="danger"\r\n                onClick={() => {\r\n                    updateVisible(false)\r\n                }}\r\n            >\r\n                Close\r\n            </Button>\r\n        </div>\r\n    )\r\n}\r\n'},66715:function(e,t){"use strict";t.Z="/**\r\n * cn - 自定义容器\r\n *    -- 使用 getPopupContainer 指定渲染的目标容器\r\n * en - Custom container\r\n *    -- use getPopupContainer return target container\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <div id=\"popup-target\" style={{ height: 200, overflowY: 'auto', position: 'relative' }}>\r\n            <div style={{ margin: '100px 0' }}>1</div>\r\n            <Popover\r\n                trigger=\"click\"\r\n                getPopupContainer={() => document.querySelector('#popup-target')}\r\n                content=\"content\"\r\n                title=\"title\"\r\n            >\r\n                <Button>Scrollable</Button>\r\n            </Popover>\r\n        </div>\r\n    )\r\n}\r\n"},51690:function(e,t){"use strict";t.Z="/**\r\n * cn - 延迟\r\n *    -- 可以设置展示延时和关闭延时\r\n * en - delay\r\n *    -- the hidden/show delay\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Popover mouseEnterDelay={1} mouseLeaveDelay={1} style={{ width: 200, padding: 20 }} content=\"Some text\">\r\n            <Button>Hover</Button>\r\n        </Popover>\r\n    )\r\n}\r\n"},6981:function(e,t){"use strict";t.Z="/**\r\n * cn - 弹出位置\r\n *    -- 内置了十二个弹出的位置\r\n * en - Position\r\n *    -- Twelve pop-up positions are built in.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan-ui'\r\n\r\nconst positions = [\r\n    [null, 'bottom-left', 'bottom', 'bottom-right', null],\r\n    ['right-top', null, null, null, 'left-top'],\r\n    ['right', null, null, null, 'left'],\r\n    ['right-bottom', null, null, null, 'left-bottom'],\r\n    [null, 'top-left', 'top', 'top-right', null],\r\n]\r\n\r\nconst style = {\r\n    width: 100,\r\n    textAlign: 'center',\r\n    lineHeight: '30px',\r\n    margin: 4,\r\n    display: 'inline-block',\r\n    border: 'solid 1px #eee',\r\n    cursor: 'pointer',\r\n}\r\n\r\nexport default function() {\r\n    return positions.map((row, i) => (\r\n        <div key={i}>\r\n            {row.map((p, j) =>\r\n                p ? (\r\n                    <Popover key={`${i}-${j}`} trigger=\"click\" placement={p} content={<div>Some text</div>} title={p}>\r\n                        <div style={style}>{p}</div>\r\n                    </Popover>\r\n                ) : (\r\n                    <div key={j} style={{ ...style, border: 0 }} />\r\n                )\r\n            )}\r\n        </div>\r\n    ))\r\n}\r\n"},80312:function(e,t){"use strict";t.Z="/**\r\n * cn - 触发方式\r\n *    -- 默认是移入组件触发，设置 trigger 为 'click'或Trigger数组，可以改变触发方式\r\n * en - Trigger\r\n *    -- Set the trigger property to change the trigger event.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover, Card } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Popover\r\n            style={{ marginRight: 12 }}\r\n            trigger={['click', 'hover']}\r\n            content={\r\n                <Card style={{ width: 300, border: 0, background: 'transparent' }}>\r\n                    <Card.Header>Header</Card.Header>\r\n                    <Card.Body style={{ height: 80 }}>Body</Card.Body>\r\n                </Card>\r\n            }\r\n        >\r\n            <Button>Trigger</Button>\r\n        </Popover>\r\n    )\r\n}\r\n"},80590:function(e,t){"use strict";t.Z="/**\r\n * cn - 确认\r\n *    -- Popover.Confirm 提供弹出气泡式的确认框\r\n * en - Confirm\r\n *    -- Popover.Confirm provide popover confirm.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Popover.Confirm\r\n            onCancel={() => {\r\n                console.log('cancel')\r\n            }}\r\n            onOk={() =>\r\n                new Promise(resolve => {\r\n                    console.log('ok')\r\n                    setTimeout(() => resolve(true), 2000)\r\n                })\r\n            }\r\n            text={{ ok: 'Yes', cancel: 'No' }}\r\n            description=\"Are you sure delete?\"\r\n            title=\"title\"\r\n        >\r\n            <Button>Delete</Button>\r\n        </Popover.Confirm>\r\n    )\r\n}\r\n"},47006:function(e,t){"use strict";t.Z="/**\r\n * cn - 关闭事件\r\n *    -- content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件\r\n * en - Close\r\n *    -- Set the content property to a function, you can handle the close event inside the popup panel.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover, Message } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Popover\r\n            trigger=\"click\"\r\n            content={close => (\r\n                <div style={{ padding: 20 }}>\r\n                    <div>Are you sure you want to close this panel?</div>\r\n                    <div style={{ marginTop: 30, textAlign: 'right' }}>\r\n                        <Button\r\n                            size=\"small\"\r\n                            onClick={() => {\r\n                                close()\r\n                                Message.success('Popover panel closed.')\r\n                            }}\r\n                        >\r\n                            close\r\n                        </Button>\r\n                    </div>\r\n                </div>\r\n            )}\r\n        >\r\n            <Button>Click me</Button>\r\n        </Popover>\r\n    )\r\n}\r\n"},86904:function(e,t){"use strict";t.Z="/**\r\n * cn - 箭头\r\n *    -- 设置allowArrow属性用于控制箭头的显示\r\n * en - Close\r\n *    -- Set the allowArrow property to show arrow.\r\n */\r\nimport React from 'react'\r\nimport { Button, Popover } from 'ethan-ui'\r\n\r\nexport default function() {\r\n    return (\r\n        <Popover content=\"arrow\" showArrow={false}>\r\n            <Button>Click me</Button>\r\n        </Popover>\r\n    )\r\n}\r\n"},95510:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var a=l(n(24698)),u=i(n(94184)),c=i(n(15660));n(62356);var s=n(36910);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=(0,a.useRef)(null);return(0,a.useEffect)(function(){var e=r.current;c.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),a.default.createElement("pre",{ref:r,className:(0,u.default)(t||"lang-jsx",(0,s.exampleClass)("pre"))},a.default.createElement("code",null,e))}},84241:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},c=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,l=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(o)throw o.error}}return i},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var s=l(n(24698)),f=n(12101),d=i(n(21588)),p=n(36910),m=i(n(20164)),v=i(n(95510));t.default=s.default.memo(function(e){var t=e.component,n=e.id,r=e.rawText,o=void 0===r?"":r,l=e.title,i=c((0,s.useState)(!1),2),a=i[0],u=i[1],r=(0,s.useRef)((0,s.createElement)(t)).current,e=o.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),i=c(l.split("\n")),t=i[0],o=i.slice(1),i=function(){u(!a)};return s.default.createElement(s.default.Fragment,null,t&&s.default.createElement("h3",{id:n},t),s.default.createElement(f.Lazyload,{placeholder:s.default.createElement("div",{className:(0,p.exampleClass)("placeholder")},s.default.createElement(f.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}))},s.default.createElement("div",{className:(0,p.exampleClass)("_",a&&"showcode")},s.default.createElement("div",{className:(0,p.exampleClass)("body")},r),0<l.length&&s.default.createElement("div",{className:(0,p.exampleClass)("desc")},o.map(function(e,t){return s.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),s.default.createElement("a",{className:(0,p.exampleClass)("toggle"),onClick:i},s.default.createElement(d.default,{name:a?"code-close":"code"}))),s.default.createElement(m.default,{height:a?"auto":0,easing:"linear",className:(0,p.exampleClass)("code"),duration:240},s.default.createElement(v.default,{value:e}),s.default.createElement("a",{className:(0,p.exampleClass)("toggle"),onClick:i},s.default.createElement(d.default,{name:a?"code-close":"code"}))))))})},82281:function(e,t,n){"use strict";var l=this&&this.__assign||function(){return(l=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},i=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,l=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(o)throw o.error}}return i},a=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,l=t.length;o<l;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=r(n(24698)),c=r(n(30724)),s=n(69087),o=n(17911),f=n(36910),d=r(n(70954)),p=r(n(95510)),m=r(n(84241)),v=r(n(86212)),h=/^<example name="([\w|-]+)"/,g=function(e,t){return 4===e?(0,o.getUidStr)():"".concat(e,"-").concat((t||"").replace(/[\W|-]/g,"-"))};t.default=u.default.memo(function(e){var t=e.onHeadingSet,r=e.examples,e=e.source,n=u.default.useRef([]).current;function o(e){n.push(e)}return u.default.useEffect(function(){null!=t&&t(n)},[]),u.default.createElement(c.default,{className:(0,f.markdownClass)("_"),source:e,renderers:{code:p.default,heading:function(e){var t=e.level,n=e.children,r="h".concat(t),e="heading-".concat(g(t,n[0]));return 2!==t&&3!==t||o({id:e,level:t,children:n}),u.default.createElement(r,{id:e},n)},html:function(e){if("<example />"===e.value)return function(){if(!r)return u.default.createElement("div",null);var e=(0,d.default)("示例","Example"),t="heading-example-h";return o({id:t,level:2,children:[e]}),a([u.default.createElement("h2",{key:"h",id:t},e)],i(r.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-".concat(e.name),r=i(e.title.split("\n"),1)[0];return o({id:n,level:3,children:[r]}),u.default.createElement(m.default,l({key:t,id:n},e))}})),!1)}();var t,n=e.value.match(h);return n?(t=n[1],(n=(r||[]).find(function(e){return e.name===t}))?u.default.createElement(m.default,l({},n)):null):"<br>"===e.value||"<br />"===e.value?u.default.createElement("br",null):null},table:v.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?u.default.createElement("a",{href:e.href,target:t},e.children):u.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})})},54365:function(e,t,n){"use strict";var r=this&&this.__createBinding||(Object.create?function(e,t,n,r){void 0===r&&(r=n),Object.defineProperty(e,r,{enumerable:!0,get:function(){return t[n]}})}:function(e,t,n,r){void 0===r&&(r=n),e[r]=t[n]}),o=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),l=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)"default"!==n&&Object.prototype.hasOwnProperty.call(e,n)&&r(t,e,n);return o(t,e),t},a=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,l=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(o)throw o.error}}return i},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var u=l(n(24698)),c=n(12101),s=n(64744),f=n(36910),d=i(n(98789));t.default=function(i){return u.default.memo(function(e){var t=e.noNav,e=a((0,u.useState)(""),2),r=e[0],o=e[1],e=a((0,u.useState)([]),2),l=e[0],e=e[1],n=(0,s.useLocation)().hash;(0,u.useEffect)(function(){function e(){var n,r=document.documentElement.scrollTop,e=l.filter(function(e){return 3===e.level&&e.children.length});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#".concat(e.id));(null==t?void 0:t.offsetTop)<=r&&(n=e.id)}),o(n))}var t;return e(),n&&(t=document.querySelector(n),setTimeout(function(){null!=t&&t.scrollIntoView()},20)),document.addEventListener("scroll",e),function(){document.removeEventListener("scroll",e)}},[l]);return u.default.createElement("div",{className:(0,f.navClass)("_")},u.default.createElement(i,{onHeadingSet:e}),!t&&u.default.createElement(c.Sticky,{className:(0,f.navClass)("sticky"),top:50},u.default.createElement("div",{className:(0,f.navClass)("nav")},l.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return u.default.createElement("a",{key:t,className:(0,f.navClass)("level-".concat(e.level),r===e.id&&"active"),onClick:function(e){0===d.default.location.search.indexOf("?example=")?d.default.push("".concat(d.default.location.pathname,"?example=").concat(e.replace("heading-",""))):(d.default.push("".concat(d.default.location.pathname,"#").concat(e)),null!=(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))})}},86212:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,l=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(o)throw o.error}}return i},o=this&&this.__spreadArray||function(e,t,n){if(n||2===arguments.length)for(var r,o=0,l=t.length;o<l;o++)!r&&o in t||((r=r||Array.prototype.slice.call(t,0,o))[o]=t[o]);return e.concat(r||Array.prototype.slice.call(t))},l=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var i=l(n(24698));t.default=function(e){var e=e.children,t=o([],r(e[1].props.children),!1);try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return i.default.createElement("div",{style:{overflow:"auto"}},i.default.createElement("table",{className:"doc-api-table"},e[0],i.default.cloneElement(e[1],{children:t})))}},92056:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement(l.Popover,{title:"title",content:"content",trigger:"hover"},o.default.createElement(l.Button,null,"Hover"))}},17343:function(e,t,n){"use strict";var r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,l=n.call(e),i=[];try{for(;(void 0===t||0<t--)&&!(r=l.next()).done;)i.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=l.return)&&n.call(l)}finally{if(o)throw o.error}}return i},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=o(n(24698)),i=n(12101);t.default=function(){var e=r(l.default.useState(!0),2),t=e[0],n=e[1];return l.default.createElement("div",null,l.default.createElement(i.Popover,{visible:t,style:{width:200,padding:20},content:"some text",title:"control",trigger:"click",onVisibleChange:function(e){console.log("onVisibleChange:",e),e&&n(!0)}},l.default.createElement(i.Button,null,"Control")),l.default.createElement(i.Button,{type:"danger",onClick:function(){n(!1)}},"Close"))}},75788:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement("div",{id:"popup-target",style:{height:200,overflowY:"auto",position:"relative"}},o.default.createElement("div",{style:{margin:"100px 0"}},"1"),o.default.createElement(l.Popover,{trigger:"click",getPopupContainer:function(){return document.querySelector("#popup-target")},content:"content",title:"title"},o.default.createElement(l.Button,null,"Scrollable")))}},15692:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement(l.Popover,{mouseEnterDelay:1,mouseLeaveDelay:1,style:{width:200,padding:20},content:"Some text"},o.default.createElement(l.Button,null,"Hover"))}},29812:function(e,t,n){"use strict";var r=this&&this.__assign||function(){return(r=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var l=o(n(24698)),i=n(12101),a=[[null,"bottom-left","bottom","bottom-right",null],["right-top",null,null,null,"left-top"],["right",null,null,null,"left"],["right-bottom",null,null,null,"left-bottom"],[null,"top-left","top","top-right",null]],u={width:100,textAlign:"center",lineHeight:"30px",margin:4,display:"inline-block",border:"solid 1px #eee",cursor:"pointer"};t.default=function(){return a.map(function(e,n){return l.default.createElement("div",{key:n},e.map(function(e,t){return e?l.default.createElement(i.Popover,{key:"".concat(n,"-").concat(t),trigger:"click",placement:e,content:l.default.createElement("div",null,"Some text"),title:e},l.default.createElement("div",{style:u},e)):l.default.createElement("div",{key:t,style:r(r({},u),{border:0})})}))})}},47314:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement(l.Popover,{style:{marginRight:12},trigger:["click","hover"],content:o.default.createElement(l.Card,{style:{width:300,border:0,background:"transparent"}},o.default.createElement(l.Card.Header,null,"Header"),o.default.createElement(l.Card.Body,{style:{height:80}},"Body"))},o.default.createElement(l.Button,null,"Trigger"))}},20832:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement(l.Popover.Confirm,{onCancel:function(){console.log("cancel")},onOk:function(){return new Promise(function(e){console.log("ok"),setTimeout(function(){return e(!0)},2e3)})},text:{ok:"Yes",cancel:"No"},description:"Are you sure delete?",title:"title"},o.default.createElement(l.Button,null,"Delete"))}},56760:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement(l.Popover,{trigger:"click",content:function(e){return o.default.createElement("div",{style:{padding:20}},o.default.createElement("div",null,"Are you sure you want to close this panel?"),o.default.createElement("div",{style:{marginTop:30,textAlign:"right"}},o.default.createElement(l.Button,{size:"small",onClick:function(){e(),l.Message.success("Popover panel closed.")}},"close")))}},o.default.createElement(l.Button,null,"Click me"))}},2366:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});var o=r(n(24698)),l=n(12101);t.default=function(){return o.default.createElement(l.Popover,{content:"arrow",showArrow:!1},o.default.createElement(l.Button,null,"Click me"))}}}]);