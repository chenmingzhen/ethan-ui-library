(self.webpackChunkEthanDoc=self.webpackChunkEthanDoc||[]).push([[939],{10544:function(e,t,n){"use strict";n.r(t),n.d(t,{default:function(){return d}});var r=n(67154),a=n.n(r),t=n(24698),u=n.n(t),r=n(69048),l=n(85993),t=n(39174),o=(0,t.default)("# Button *按钮*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Button\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| children | ReactNode | 必填 | 按钮里面的内容, 可以是文字图标等  |\r\n| className | string | 无 | 扩展className |\r\n| disabled | boolean | false | 禁用 |\r\n| href | string | 无 | 如果设置了 href 属性，将会用 &lt;a> 代替 &lt;button> |\r\n| outline | boolean | false | outline 为 true 时，显示透明背景的按钮 |\r\n| size | 'large' \\| 'default' \\| 'small' | 'default' | 按钮尺寸 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n| type | 'default' \\| 'primary' \\| 'secondary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'link' | 'default' | 可选值  |\r\n| text | boolean | false | 文字按钮，不展示边框和背景 |\r\n| onClick | () => void | 无 | 按钮点击回调 |\r\n| space | boolean | false | 仅有2个汉字的按钮，是否在2个汉字中间插入空格 |\r\n\r\n### Button.Group\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| children | ReactNode | 必填 | 由 Button 组成的 array |\r\n| size | 'large' \\| 'default' \\| 'small' | 无 | 同 Button；如果 Button 和 Group 同时设置 size，以 Group 为准 |\r\n| outline | boolean | 无 | 同 Button；如果 Button 未设置，使用此值 |\r\n| type | 'default' \\| 'primary' \\| 'secondary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'link' | 无 | 同 Button；如果 Button 和 Group 同时设置 type，以 Group 为准 |\r\n","# Button\r\n\r\n<example />\r\n\r\n## API\r\n\r\n### Button\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| children | ReactNode | required | The content inside the button, can be a text icon, etc.  |\r\n| className | string | - | extend className |\r\n| disabled | boolean | false | Specifies the button should be disabled |\r\n| href | string | - | If the href attribute is set, &lt;a> will be used instead of &lt;button>. |\r\n| outline | boolean | false | When outline is true, the background is transparent. |\r\n| size | 'large' \\| 'default' \\| 'small' | 'default' | size of button |\r\n| style | object | - | Container element style |\r\n| type | 'default' \\| 'primary' \\| 'secondary' \\| 'success' \\| 'warning' \\| 'danger' \\| 'link' | 'default' | type of button |\r\n| text | boolean | false | text button |\r\n| onClick | () => void | none | button click callback |\r\n| space | boolean | false | For Button with only 2 Chinese characters, whether to insert a space between the two Chinese characters. |\r\n\r\n### Button.Group\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| children | ReactNode | required | array of Button |\r\n| size | string | - | same as Button |\r\n| outline | boolean | - | same as Button |\r\n| type | string | - | same as Button |\r\n"),i=[{name:"1-basex",title:(0,t.default)("基本用法 \n Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)","Base \n Button has several built-in type, default, primary, secondary, success, warning, dange, and link."),component:n(95038).Z,rawText:n(80881).Z},{name:"1-textx",title:(0,t.default)("文字按钮 \n 设置 text 属性来使用文字按钮","Text \n set text to use text button"),component:n(65653).Z,rawText:n(36740).Z},{name:"2-iconx",title:(0,t.default)("图标 \n shineout 并不提供内置的图标, 所以需要图标可以在内容中自行加入","Icon \n shineout does not provide built-in icons, you can add it to the content by yourself."),component:n(75946).Z,rawText:n(57714).Z},{name:"3-sizex",title:(0,t.default)("大小 \n 一共有三种尺寸，['small', 'default', 'large']，默认为 'default'","Size \n There are three sizes, ['small', 'default', 'large'], default value is 'default'."),component:n(22004).Z,rawText:n(52742).Z},{name:"4-disabledx",title:(0,t.default)("不可用 \n 添加 disabled 属性可以禁用按钮。","Disabled \n Adding disabled property can disable the button."),component:n(84670).Z,rawText:n(65959).Z},{name:"5-loadingx",title:(0,t.default)("加载中 \n 设定 loading 属性，可以让按钮变成加载中状态","Loading \n Set loading property can add a loading indicator to button."),component:n(78433).Z,rawText:n(57846).Z},{name:"6-hrefx",title:(0,t.default)("链接 \n 设置 href 属性，按钮会渲染为 a 标签，同时可以设置 target 属性","Link \n Set the href attribute, the button will be rendered as <a> tag and you can also set the target property."),component:n(49184).Z,rawText:n(47061).Z},{name:"7-outlinex",title:(0,t.default)("透明背景 \n 添加 outline 属性可以设置为透明背景，type 不能为 default 和 link。","Outline \n Adding outline property can set background to transparent. Outline type can not be default and link."),component:n(19772).Z,rawText:n(99592).Z},{name:"8-groupx",title:(0,t.default)("组合 \n 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Group 的 size, type, outline 属性设置","Group \n A series of buttons can group by Button.Group, set styles by Button.Group's size, type, and outline property."),component:n(90800).Z,rawText:n(4207).Z}],d=(0,r.default)(function(e){return u().createElement(l.ZP,a()({},e,{codes:void 0,source:o,examples:i}))})},80881:function(e,t){"use strict";t.Z='/**\r\n * cn - 基本用法\r\n *    -- Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)\r\n * en - Base\r\n *    -- Button has several built-in type, default, primary, secondary, success, warning, dange, and link.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button>Default</Button>\r\n      <Button type="primary">Primary</Button>\r\n      <Button type="secondary">Secondary</Button>\r\n      <Button type="success">Success</Button>\r\n      <Button type="warning">Warning</Button>\r\n      <Button type="danger">Danger</Button>\r\n      <Button type="link">Link</Button>\r\n    </div>\r\n  )\r\n}\r\n'},36740:function(e,t){"use strict";t.Z='/**\r\n * cn - 文字按钮\r\n *    -- 设置 text 属性来使用文字按钮\r\n * en - Text\r\n *    -- set text to use text button\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button text>Default</Button>\r\n      <Button text type="primary">\r\n        Primary\r\n      </Button>\r\n      <Button text type="secondary">\r\n        Secondary\r\n      </Button>\r\n      <Button text type="success">\r\n        Success\r\n      </Button>\r\n      <Button text type="warning">\r\n        Warning\r\n      </Button>\r\n      <Button text type="danger">\r\n        Danger\r\n      </Button>\r\n      <Button text type="link">\r\n        Link\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n'},57714:function(e,t){"use strict";t.Z='/**\r\n * cn - 图标\r\n *    -- shineout 并不提供内置的图标, 所以需要图标可以在内容中自行加入\r\n * en - Icon\r\n *    -- shineout does not provide built-in icons, you can add it to the content by yourself.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\nimport { FontAwesome } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button type="primary">\r\n        <FontAwesome name="home" style={{ marginRight: 4 }} />\r\n        left\r\n      </Button>\r\n      <Button type="primary">\r\n        right\r\n        <FontAwesome name="home" style={{ marginLeft: 4 }} />\r\n      </Button>\r\n      <Button type="primary">\r\n        ce\r\n        <FontAwesome name="home" style={{ margin: \'0 4px\' }} />\r\n        ter\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n'},52742:function(e,t){"use strict";t.Z='/**\r\n * cn - 大小\r\n *    -- 一共有三种尺寸，[\'small\', \'default\', \'large\']，默认为 \'default\'\r\n * en - Size\r\n *    -- There are three sizes, [\'small\', \'default\', \'large\'], default value is \'default\'.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <div>\r\n        <Button size="small">Default</Button>\r\n        <Button size="small" type="primary">\r\n          Primary\r\n        </Button>\r\n        <Button size="small" type="secondary">\r\n          Secondary\r\n        </Button>\r\n        <Button size="small" type="success">\r\n          Success\r\n        </Button>\r\n        <Button size="small" type="warning">\r\n          Warning\r\n        </Button>\r\n        <Button size="small" type="danger">\r\n          Danger\r\n        </Button>\r\n        <Button size="small" type="link">\r\n          Link\r\n        </Button>\r\n      </div>\r\n      <br />\r\n      <div>\r\n        <Button>Default</Button>\r\n        <Button type="primary">Primary</Button>\r\n        <Button type="secondary">Secondary</Button>\r\n        <Button type="success">Success</Button>\r\n        <Button type="warning">Warning</Button>\r\n        <Button type="danger">Danger</Button>\r\n        <Button type="link">Link</Button>\r\n      </div>\r\n      <br />\r\n      <div>\r\n        <Button size="large">Default</Button>\r\n        <Button size="large" type="primary">\r\n          Primary\r\n        </Button>\r\n        <Button size="large" type="secondary">\r\n          Secondary\r\n        </Button>\r\n        <Button size="large" type="success">\r\n          Success\r\n        </Button>\r\n        <Button size="large" type="warning">\r\n          Warning\r\n        </Button>\r\n        <Button size="large" type="danger">\r\n          Danger\r\n        </Button>\r\n        <Button size="large" type="link">\r\n          Link\r\n        </Button>\r\n      </div>\r\n    </div>\r\n  )\r\n}\r\n'},65959:function(e,t){"use strict";t.Z='/**\r\n * cn - 不可用\r\n *    -- 添加 disabled 属性可以禁用按钮。\r\n * en - Disabled\r\n *    -- Adding disabled property can disable the button.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button disabled>Default</Button>\r\n      <Button disabled type="primary">\r\n        Primary\r\n      </Button>\r\n      <Button disabled type="secondary">\r\n        Secondary\r\n      </Button>\r\n      <Button disabled type="success">\r\n        Success\r\n      </Button>\r\n      <Button disabled type="warning">\r\n        Warning\r\n      </Button>\r\n      <Button disabled type="danger">\r\n        Danger\r\n      </Button>\r\n      <Button disabled type="link">\r\n        Link\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n'},57846:function(e,t){"use strict";t.Z='/**\r\n * cn - 加载中\r\n *    -- 设定 loading 属性，可以让按钮变成加载中状态\r\n * en - Loading\r\n *    -- Set loading property can add a loading indicator to button.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button loading size="small" type="primary">\r\n        Small\r\n      </Button>\r\n      <Button loading type="primary">\r\n        Default\r\n      </Button>\r\n      <Button loading size="large" type="primary">\r\n        Large\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n'},47061:function(e,t){"use strict";t.Z='/**\r\n * cn - 链接\r\n *    -- 设置 href 属性，按钮会渲染为 a 标签，同时可以设置 target 属性\r\n * en - Link\r\n *    -- Set the href attribute, the button will be rendered as <a> tag and you can also set the target property.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <Button href="#home" target="_blank" type="primary">\r\n      Home\r\n    </Button>\r\n  )\r\n}\r\n'},99592:function(e,t){"use strict";t.Z='/**\r\n * cn - 透明背景\r\n *    -- 添加 outline 属性可以设置为透明背景，type 不能为 default 和 link。\r\n * en - Outline\r\n *    -- Adding outline property can set background to transparent. Outline type can not be default and link.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button outline type="primary">\r\n        Primary\r\n      </Button>\r\n      <Button outline type="secondary">\r\n        Secondary\r\n      </Button>\r\n      <Button outline type="success">\r\n        Success\r\n      </Button>\r\n      <Button outline type="warning">\r\n        Warning\r\n      </Button>\r\n      <Button outline type="danger">\r\n        Danger\r\n      </Button>\r\n    </div>\r\n  )\r\n}\r\n'},4207:function(e,t){"use strict";t.Z='/**\r\n * cn - 组合\r\n *    -- 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Group 的 size, type, outline 属性设置\r\n * en - Group\r\n *    -- A series of buttons can group by Button.Group, set styles by Button.Group\'s size, type, and outline property.\r\n */\r\nimport React from \'react\'\r\nimport { Button } from \'ethan/index\'\r\nimport { FontAwesome } from \'ethan/index\'\r\n\r\nexport default function() {\r\n  return (\r\n    <div>\r\n      <Button.Group>\r\n        <Button>Left</Button>\r\n        <Button>Center</Button>\r\n        <Button>Right</Button>\r\n      </Button.Group>\r\n\r\n      <br />\r\n\r\n      <Button.Group outline type="primary">\r\n        <Button>Left</Button>\r\n        <Button>Center</Button>\r\n        <Button>Right</Button>\r\n      </Button.Group>\r\n\r\n      <br />\r\n      <Button.Group outline type="primary">\r\n        <Button disabled>disabled</Button>\r\n        <Button disabled>Center</Button>\r\n        <Button>Right</Button>\r\n      </Button.Group>\r\n\r\n      <br />\r\n\r\n      <Button.Group type="primary">\r\n        <Button>\r\n          <FontAwesome name="angle-left" style={{ marginRight: 4 }} />\r\n          Left\r\n        </Button>\r\n        <Button>Center</Button>\r\n        <Button>\r\n          Right\r\n          <FontAwesome name="angle-right" style={{ marginLeft: 4 }} />\r\n        </Button>\r\n      </Button.Group>\r\n\r\n      <br />\r\n\r\n      <Button.Group size="large">\r\n        <Button>Left</Button>\r\n        <Button>Center</Button>\r\n        <Button>Right</Button>\r\n      </Button.Group>\r\n    </div>\r\n  )\r\n}\r\n'},54798:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importStar(n(24698)),u=r.__importDefault(n(94184)),l=r.__importDefault(n(15660));n(62356);var o=n(78502);t.default=function(e){var t=e.language,t=void 0===t?"lang-jsx":t,n=e.onHighLight,e=e.value,r=a.useRef(null);return a.useEffect(function(){var e=r.current;l.default.highlightElement(e,!1,function(){n&&n(e.offsetHeight)})},[]),a.default.createElement("pre",{ref:r,className:u.default(t||"lang-jsx",o.exampleClass("pre"))},a.default.createElement("code",null,e))}},7595:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var m=n(70655),p=m.__importStar(n(24698)),r=m.__importDefault(n(45697)),y=n(79136),B=m.__importDefault(n(22276)),g=m.__importDefault(n(69374)),h=n(78502),E=m.__importDefault(n(54798)),_=p.default.createElement("div",{className:h.exampleClass("placeholder")},p.default.createElement(y.Spin,{size:"54px",name:"four-dots",color:"#53a0fd"}));function a(e){var t=e.component,n=e.id,r=e.name,a=e.rawText,u=e.title,l=p.useRef(null),o=m.__read(p.useState(!1),2),i=o[0],d=o[1],c=m.__read(p.useState(p.createElement(t)),1)[0],e=m.__read(p.useState(),2),s=e[0],f=e[1],o=(m.__read(p.useState(),1)[0],a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim());p.useEffect(function(){l.current&&(l.current.style.height=i?s+"px":"0")},[i]);t=function(e){return p.default.createElement("a",{className:h.exampleClass("toggle"),onClick:function(e){d(!i)}.bind(null,e)},p.default.createElement(B.default,{name:i?"code-close":"code"}))},e=g.default.location.search,a="?example=";if(0===e.indexOf(a)&&(e=e.replace(a,""),r.indexOf(e)<0))return null;r=m.__read(u.split("\n")),e=r[0],r=r.slice(1),e=e&&e.trim();return p.default.createElement(p.Fragment,null,e&&p.default.createElement("h3",{key:"0",id:n},e),p.default.createElement(y.Lazyload,{placeholder:_},p.default.createElement("div",{className:h.exampleClass("_",i&&"showcode")},p.default.createElement("div",{className:h.exampleClass("body")},c),0<u.length&&p.default.createElement("div",{className:h.exampleClass("desc")},r.map(function(e,t){return p.default.createElement("div",{key:t,dangerouslySetInnerHTML:{__html:e}})}),t(!1)),p.default.createElement("div",{ref:l,className:h.exampleClass("code")},p.default.createElement(E.default,{onHighLight:function(e){f(e)},value:o}),t(!0)))))}(t.default=a).propTypes={component:r.default.func.isRequired,id:r.default.string,name:r.default.string,rawText:r.default.string,title:r.default.string.isRequired},a.defaultProps={rawText:""}},71126:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),u=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),l=n(78502),n=function(e){var t=e.children,e=a.__read(u.useState(!1),2),n=e[0],r=e[1],e=t.map(function(e){return e.replace(/"fn#fn/g,"").replace(/fn#fn"/g,"").replace(/\\n/g,"\n")}),t=n?"pre":"div";return u.default.createElement("div",{onClick:function(){r(!n)},className:l.markdownClass("console")},u.default.createElement(t,null,e))};n.propTypes={children:r.default.array},n.defaultProps={children:[]},t.default=n},15302:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n(70655),u=a.__importStar(n(24698)),r=a.__importDefault(n(45697)),l=a.__importDefault(n(21046)),o=a.__importDefault(n(17866));t.default=function(){function e(e){var t=a.__read(u.useState(e.source),2),n=t[0],r=t[1];return u.useEffect(function(){e.loader&&e.loader().then(function(e){r(e.default)})},[]),n?u.default.createElement(l.default,a.__assign({},e,{source:n})):u.default.createElement(o.default,{style:{minHeight:200}})}return e.propTypes={loader:r.default.func,source:r.default.string},e.defaultProps={loader:void 0,source:void 0},u.memo(e)}},21046:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n(70655),d=i.__importStar(n(24698)),r=i.__importDefault(n(45697)),c=i.__importDefault(n(30724)),s=n(73727),f=n(70914),m=n(78502),p=i.__importDefault(n(39174)),y=i.__importDefault(n(54798)),B=i.__importDefault(n(7595)),g=i.__importDefault(n(71126)),h=i.__importDefault(n(30681)),E=/^<code name="([\w|-]+)" /,_=/^<example name="([\w|-]+)"/;function a(e){var t=e.onHeadingSetted,a=e.codes,u=e.examples,e=e.source,n=i.__read(d.useState([]),1)[0],l=i.__read(d.useState({}),1)[0];d.useEffect(function(){t&&t(n)},[]);function o(e){n.push(e)}return d.default.createElement(c.default,{className:m.markdownClass("_"),source:e,renderers:{code:y.default,heading:function(e){var t,n=e.level,r=e.children,a=n+"-"+r[0],u="h"+n;return"object"==typeof r[0]?d.default.createElement(u,null,r):(l[a]||(e="heading-"+(t=n,e=r[0],4===t?f.getUidStr():t+"-"+(e||"").replace(/[\W|-]/g,"-")),2!==n&&3!==n||o({id:e,level:n,children:r}),l[a]=d.default.createElement(u,{id:e},r)),l[a])},html:function(e){if("<example />"===e.value)return function(){if(l.examples)return l.examples;if(!u)return d.default.createElement("div",null);var e=p.default("示例","Example"),t="heading-example-h";return o({id:t,level:2,children:[e]}),l.examples=i.__spreadArray([d.default.createElement("h2",{key:"h",id:t},e)],i.__read(u.map(function(e,t){if(/\d+-/.test(e.name)){var n="heading-"+e.name,r=i.__read(e.title.split("\n"),1)[0];return o({id:n,level:3,children:[r]}),d.default.createElement(B.default,i.__assign({key:t,id:n},e))}}))),l.examples}();var t,n=e.value.match(_);if(n)return t=n[1],e.value.indexOf("noExpand"),l[r="example-"+t]||(n=(u||[]).find(function(e){return e.name===t}),l[r]=n?d.default.createElement(B.default,i.__assign({},n)):null),l[r];if("<br>"===e.value||"<br />"===e.value)return d.default.createElement("br",null);var r=e.value.match(E);return r?(e=r[1],(r=a[e])?i.__spreadArray([d.default.createElement(y.default,{key:"cb",value:r.text})],i.__read(r.log.map(function(e,t){return d.default.createElement(g.default,{key:t},e)}))):(console.error("Code "+e+" not existed"),null)):null},table:h.default,link:function(e){var t=0===e.href.indexOf("http")?"_blank":void 0;return t?d.default.createElement("a",{href:e.href,target:t},e.children):d.default.createElement(s.Link,{to:e.href,target:t},e.children)}}})}(t.default=a).propTypes={children:r.default.oneOfType([r.default.element,r.default.array]),codes:r.default.object,examples:r.default.array,onHeadingSetted:r.default.func,source:r.default.string.isRequired},a.defaultProps={children:null,examples:null,onHeadingSetted:void 0}},85993:function(e,t,n){"use strict";var r=n(70655),a=(r.__importDefault(n(24698)),r.__importDefault(n(15302))),u=(r.__importDefault(n(69048)),a.default());t.ZP=u},69048:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var d=n(70655),c=d.__importStar(n(24698)),s=n(79136),f=n(64744),m=n(78502),p=d.__importDefault(n(69374));t.default=function(i){return function(e){var t=d.__read(c.useState(""),2),r=t[0],a=t[1],u=d.__read(c.useState([]),1)[0],n=e.location.hash,l=f.useUpdate(),t=c.useCallback(function(e){e.forEach(function(e){u.push(e)}),l()},[]),o=c.useCallback(function(){var e;!n||(e=document.querySelector(n))&&setTimeout(function(){e.scrollIntoView()},50)},[n]);c.useEffect(function(){o();function e(){var n,r=document.documentElement.scrollTop,e=u.filter(function(e){return 3===e.level&&e.children[0]});0!==e.length&&(n=e[0].id,e.forEach(function(e){var t=document.querySelector("#"+e.id);t&&t.offsetTop<=r&&(n=e.id)}),a(n))}return document.addEventListener("scroll",e),e(),function(){document.removeEventListener("scroll",e)}},[]);return c.default.createElement("div",{className:m.navClass("_")},c.default.createElement(i,{onHeadingSetted:t}),!e.noNav&&c.default.createElement(s.Sticky,{className:m.navClass("sticky"),top:50},c.default.createElement("div",{className:m.navClass("nav")},u.map(function(e,t){var n=e.children.filter(function(e){return"string"==typeof e});return c.default.createElement("a",{key:t,className:m.navClass("level-"+e.level,r===e.id&&"active"),onClick:function(e){0===p.default.location.search.indexOf("?example=")?p.default.push(p.default.location.pathname+"?example="+e.replace("heading-","")):(p.default.push(p.default.location.pathname+"#"+e),(e=document.getElementById(e))&&e.scrollIntoView())}.bind(null,e.id)},n)}))))}}},30681:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(70655),a=r.__importDefault(n(24698)),n=r.__importDefault(n(45697));function u(e){var e=e.children,t=r.__spreadArray([],r.__read(e[1].props.children));try{t.sort(function(e,t){return e.props.children[0].props.children[0].localeCompare(t.props.children[0].props.children[0])})}catch(e){console.log("sort fail...")}return a.default.createElement("div",{style:{overflow:"auto"}},a.default.createElement("table",{className:"doc-api-table"},e[0],a.default.cloneElement(e[1],{children:t})))}u.propTypes={children:n.default.any},u.defaultProps={},t.default=u},95038:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,null,"Default"),r.default.createElement(a.Button,{type:"primary"},"Primary"),r.default.createElement(a.Button,{type:"secondary"},"Secondary"),r.default.createElement(a.Button,{type:"success"},"Success"),r.default.createElement(a.Button,{type:"warning"},"Warning"),r.default.createElement(a.Button,{type:"danger"},"Danger"),r.default.createElement(a.Button,{type:"link"},"Link"))}},65653:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{text:!0},"Default"),r.default.createElement(a.Button,{text:!0,type:"primary"},"Primary"),r.default.createElement(a.Button,{text:!0,type:"secondary"},"Secondary"),r.default.createElement(a.Button,{text:!0,type:"success"},"Success"),r.default.createElement(a.Button,{text:!0,type:"warning"},"Warning"),r.default.createElement(a.Button,{text:!0,type:"danger"},"Danger"),r.default.createElement(a.Button,{text:!0,type:"link"},"Link"))}},75946:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136),u=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{type:"primary"},r.default.createElement(u.FontAwesome,{name:"home",style:{marginRight:4}}),"left"),r.default.createElement(a.Button,{type:"primary"},"right",r.default.createElement(u.FontAwesome,{name:"home",style:{marginLeft:4}})),r.default.createElement(a.Button,{type:"primary"},"ce",r.default.createElement(u.FontAwesome,{name:"home",style:{margin:"0 4px"}}),"ter"))}},22004:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement("div",null,r.default.createElement(a.Button,{size:"small"},"Default"),r.default.createElement(a.Button,{size:"small",type:"primary"},"Primary"),r.default.createElement(a.Button,{size:"small",type:"secondary"},"Secondary"),r.default.createElement(a.Button,{size:"small",type:"success"},"Success"),r.default.createElement(a.Button,{size:"small",type:"warning"},"Warning"),r.default.createElement(a.Button,{size:"small",type:"danger"},"Danger"),r.default.createElement(a.Button,{size:"small",type:"link"},"Link")),r.default.createElement("br",null),r.default.createElement("div",null,r.default.createElement(a.Button,null,"Default"),r.default.createElement(a.Button,{type:"primary"},"Primary"),r.default.createElement(a.Button,{type:"secondary"},"Secondary"),r.default.createElement(a.Button,{type:"success"},"Success"),r.default.createElement(a.Button,{type:"warning"},"Warning"),r.default.createElement(a.Button,{type:"danger"},"Danger"),r.default.createElement(a.Button,{type:"link"},"Link")),r.default.createElement("br",null),r.default.createElement("div",null,r.default.createElement(a.Button,{size:"large"},"Default"),r.default.createElement(a.Button,{size:"large",type:"primary"},"Primary"),r.default.createElement(a.Button,{size:"large",type:"secondary"},"Secondary"),r.default.createElement(a.Button,{size:"large",type:"success"},"Success"),r.default.createElement(a.Button,{size:"large",type:"warning"},"Warning"),r.default.createElement(a.Button,{size:"large",type:"danger"},"Danger"),r.default.createElement(a.Button,{size:"large",type:"link"},"Link")))}},84670:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{disabled:!0},"Default"),r.default.createElement(a.Button,{disabled:!0,type:"primary"},"Primary"),r.default.createElement(a.Button,{disabled:!0,type:"secondary"},"Secondary"),r.default.createElement(a.Button,{disabled:!0,type:"success"},"Success"),r.default.createElement(a.Button,{disabled:!0,type:"warning"},"Warning"),r.default.createElement(a.Button,{disabled:!0,type:"danger"},"Danger"),r.default.createElement(a.Button,{disabled:!0,type:"link"},"Link"))}},78433:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{loading:!0,size:"small",type:"primary"},"Small"),r.default.createElement(a.Button,{loading:!0,type:"primary"},"Default"),r.default.createElement(a.Button,{loading:!0,size:"large",type:"primary"},"Large"))}},49184:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement(a.Button,{href:"#home",target:"_blank",type:"primary"},"Home")}},19772:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button,{outline:!0,type:"primary"},"Primary"),r.default.createElement(a.Button,{outline:!0,type:"secondary"},"Secondary"),r.default.createElement(a.Button,{outline:!0,type:"success"},"Success"),r.default.createElement(a.Button,{outline:!0,type:"warning"},"Warning"),r.default.createElement(a.Button,{outline:!0,type:"danger"},"Danger"))}},90800:function(e,t,n){"use strict";var r=n(70655).__importDefault(n(24698)),a=n(79136),u=n(79136);t.Z=function(){return r.default.createElement("div",null,r.default.createElement(a.Button.Group,null,r.default.createElement(a.Button,null,"Left"),r.default.createElement(a.Button,null,"Center"),r.default.createElement(a.Button,null,"Right")),r.default.createElement("br",null),r.default.createElement(a.Button.Group,{outline:!0,type:"primary"},r.default.createElement(a.Button,null,"Left"),r.default.createElement(a.Button,null,"Center"),r.default.createElement(a.Button,null,"Right")),r.default.createElement("br",null),r.default.createElement(a.Button.Group,{outline:!0,type:"primary"},r.default.createElement(a.Button,{disabled:!0},"disabled"),r.default.createElement(a.Button,{disabled:!0},"Center"),r.default.createElement(a.Button,null,"Right")),r.default.createElement("br",null),r.default.createElement(a.Button.Group,{type:"primary"},r.default.createElement(a.Button,null,r.default.createElement(u.FontAwesome,{name:"angle-left",style:{marginRight:4}}),"Left"),r.default.createElement(a.Button,null,"Center"),r.default.createElement(a.Button,null,"Right",r.default.createElement(u.FontAwesome,{name:"angle-right",style:{marginLeft:4}}))),r.default.createElement("br",null),r.default.createElement(a.Button.Group,{size:"large"},r.default.createElement(a.Button,null,"Left"),r.default.createElement(a.Button,null,"Center"),r.default.createElement(a.Button,null,"Right")))}}}]);