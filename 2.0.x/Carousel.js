"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[9361],{75722:function(e,n,t){t.d(n,{Z:function(){return P}});var r=t(87462),i=t(29439),a=t(93433),o=t(87363),c=t.n(o),l=t(92242),s=t.n(l),d=t(73727),u=t(22770),m=t(62625),f=t(94184),v=t.n(f),h=t(15660),p=t.n(h),y=(t(62356),function(e){var n=e.language,t=void 0===n?"lang-jsx":n,r=e.value,i=(0,o.useRef)(null);return(0,o.useEffect)((function(){p().highlightElement(i.current,!1)}),[]),c().createElement("pre",{ref:i,className:v()(t,(0,u.vf)("pre"))},c().createElement("code",null,r))}),g=t(84506),E=t(11888),b=t(91391),Z=function(e){var n=e.component,t=e.id,r=e.rawText,a=void 0===r?"":r,l=e.title,s=(0,o.useState)(!1),d=(0,i.Z)(s,2),m=d[0],f=d[1],v=(0,o.useRef)((0,o.createElement)(n)).current,h=a.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),p=l.split("\n"),Z=(0,g.Z)(p),C=Z[0],k=Z.slice(1),x=function(){f(!m)};return c().createElement(c().Fragment,null,C&&c().createElement("h3",{id:t},C),c().createElement(E.Zr,{placeholder:c().createElement("div",{className:(0,u.vf)("placeholder")},c().createElement(E.yC,{size:"54px",name:"four-dots",color:"#53a0fd"}))},c().createElement("div",{className:(0,u.vf)("_",m&&"showcode")},c().createElement("div",{className:(0,u.vf)("body")},v),l.length>0&&c().createElement("div",{className:(0,u.vf)("desc")},k.map((function(e,n){return c().createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})})),c().createElement("a",{className:(0,u.vf)("toggle"),onClick:x},c().createElement(b.Z,{name:m?"code-close":"code"}))),c().createElement(E.y_.Transition,{visible:m,transitionTypes:["collapse","fade"]},c().createElement(y,{value:h}),c().createElement("a",{className:(0,u.vf)("toggle"),onClick:x},c().createElement(b.Z,{name:m?"code-close":"code"}))))))},C=c().memo(Z),k=function(e){var n=e.children,t=(0,a.Z)(n[1].props.children);try{t.sort((function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])}))}catch(e){console.log("sort fail...")}return c().createElement("div",{style:{overflow:"auto"}},c().createElement("table",{className:"doc-api-table"},n[0],c().cloneElement(n[1],{children:t})))},x=t(35087),T=function(e){var n=[],t=(0,o.useContext)(x.Z).setHeadings,l=e.source,f=e.examples;return c().useEffect((function(){t(n)}),[]),c().createElement(s(),{className:(0,u.EX)("_"),source:l,renderers:{code:y,heading:function(e){var t=e.level,r=e.children,i="h".concat(t),a="heading-".concat(function(e,n){return"".concat(e,"-").concat((n||"").replace(/[\W|-]/g,"-"))}(t,r[0]));return 2!==t&&3!==t||n.push({id:a,level:t,children:r}),c().createElement(i,{id:a},r)},table:k,html:function(e){return"<example />"===e.value?c().createElement(c().Fragment,null,function(){if(!f)return c().createElement("div",null);var e=(0,m.ZP)("示例","Example"),t="heading-example-h";return n.push({id:t,level:2,children:[e]}),[c().createElement("h2",{key:"h",id:t},e)].concat((0,a.Z)(f.map((function(e){var t="heading-".concat(e.name),a=e.title.split("\n"),o=(0,i.Z)(a,1)[0];return n.push({id:t,level:3,children:[o]}),c().createElement(C,(0,r.Z)({key:t,id:t},e))}))))}()):"<br>"===e.value||"<br />"===e.value?c().createElement("br",null):null},link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?c().createElement("a",{href:e.href,target:n},e.children):c().createElement(d.rU,{to:e.href},e.children)}}})},P=c().memo(T)},35087:function(e,n,t){var r=(0,t(87363).createContext)(void 0);n.Z=r},88981:function(e,n,t){var r=t(29439),i=t(87363),a=t.n(i),o=t(91291),c=t(22770),l=t(11888),s=t(75964),d=t(12025),u=t(35087),m=function(e){var n=e.children,t=(0,i.useState)(""),m=(0,r.Z)(t,2),f=m[0],v=m[1],h=(0,i.useState)([]),p=(0,r.Z)(h,2),y=p[0],g=p[1],E=(0,o.Z)().hash,b=(0,s.Z)((function(e){d.Z.push("".concat(d.Z.location.pathname,"#").concat(e));var n=document.getElementById(e);null==n||n.scrollIntoView()})),Z=(0,s.Z)((function(){var e=document.documentElement.scrollTop,n=y.filter((function(e){return 3===e.level&&e.children.length}));if(0!==n.length){var t=n[0].id;n.forEach((function(n){var r=document.querySelector("#".concat(n.id));(null==r?void 0:r.offsetTop)<=e&&(t=n.id)})),v(t)}}));(0,i.useEffect)((function(){if(Z(),E){var e=document.querySelector(E);setTimeout((function(){null==e||e.scrollIntoView()}),20)}return document.addEventListener("scroll",Z),function(){document.removeEventListener("scroll",Z)}}),[y]);var C=a().useMemo((function(){return{setHeadings:g}}),[]);return a().createElement("div",{className:(0,c.EH)("_")},a().createElement(u.Z.Provider,{value:C},n),a().createElement(l.Le,{className:(0,c.EH)("sticky"),top:50},a().createElement("div",{className:(0,c.EH)("nav")},y.map((function(e,n){var t=e.children.filter((function(e){return"string"==typeof e}));return a().createElement("a",{key:n,className:(0,c.EH)("level-".concat(e.level),f===e.id&&"active"),onClick:b.bind(null,e.id)},t)})))))};n.Z=a().memo(m)},3253:function(e,n,t){t.r(n),t.d(n,{default:function(){return u}});var r=t(87363),i=t.n(r),a=t(88981),o=t(75722),c=t(62625),l=t(36519),s=(0,c.ZP)("# Carousel *轮播*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| animation | string | 'slide' | 动画效果，可选值为<br />slide - 横向滑动<br />slide-y - 垂直滑动<br />fade - 淡入淡出 |\r\n| className | string | 无 | 扩展className |\r\n| indicatorPosition | 'left' \\| 'center' \\| 'right' | 'center' | 指示标示位置 |\r\n| indicatorType | (current: number, moveTo: () => void) => ReactNode \\| string | 'circle' | 指示标示样式，字符串可以是：\\['circle', 'number', 'line']，函数则可以自定义样式: (current, moveTo) => (<Component /\\>) |\r\n| interval | number | 0 | 动画间隔时间，为 0 时，不自动播放 |\r\n| style | object | 无 | 最外层扩展样式 |\r\n","# Carousel\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| animation | string | 'slide' | animation effects, options: <br />slide - horizontal sliding<br />slide-y - vertical sliding<br />fade - fading |\r\n| className | string | none | extend className |\r\n| indicatorPosition | 'left' \\| 'center' \\| 'right'  | 'center' | the position of indicator |\r\n| indicatorType | (current: number, moveTo: () => void) => ReactNode \\| string | 'circle' | the style of indicator, string options: \\['circle', 'number', 'line'], using function for custom styles |\r\n| interval | number | 0 | the interval of animation, When it is not 0, play automatically |\r\n"),d=[{name:"1-base",title:(0,c.ZP)("基本用法 \n 轮播组件提供了三种动画过渡方式，可以切换选项查看效果","Base \n The carousel component provides three modes of animation transition. Change the option to view the result."),component:t(91599).Z,rawText:t(22088).Z},{name:"2-custom-indicator",title:(0,c.ZP)("自定义 Indicator \n 当 indicatorType 为函数时，可以自定义 Indicator","Custom Indicator \n Indicators can be customized when indicatorType is a function."),component:t(31478).Z,rawText:t(9052).Z}],u=(0,l.Z)((function(){return i().createElement(a.Z,null,i().createElement(o.Z,{source:s,examples:d}))}))},91599:function(e,n,t){t.d(n,{Z:function(){return f}});var r=t(4942),i=t(15671),a=t(43144),o=t(60136),c=t(82963),l=t(61120),s=t(87363),d=t.n(s),u=t(11888);var m={fontSize:40,color:"#fff",display:"flex",margin:"auto"},f=function(e){(0,o.Z)(f,e);var n,t,s=(n=f,t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,l.Z)(n);if(t){var i=(0,l.Z)(this).constructor;e=Reflect.construct(r,arguments,i)}else e=r.apply(this,arguments);return(0,c.Z)(this,e)});function f(e){var n;return(0,i.Z)(this,f),(n=s.call(this,e)).state={interval:5e3,animation:"slide",indicatorType:"circle",indicatorPosition:"center"},n}return(0,a.Z)(f,[{key:"propChange",value:function(e,n){this.setState((0,r.Z)({},e,n))}},{key:"render",value:function(){var e=this.state,n=e.interval,t=e.animation,r=e.indicatorPosition,i=e.indicatorType;return d().createElement("div",null,d().createElement("div",{style:{marginBottom:20}},"animation:"," ",d().createElement(u.Ph,{data:["slide","slide-y","fade"],keygen:!0,style:{width:100},value:t,size:"small",onChange:this.propChange.bind(this,"animation")}),"　indicatorPosition: ",d().createElement(u.Ph,{data:["left","center","right"],keygen:!0,style:{width:90},value:r,size:"small",onChange:this.propChange.bind(this,"indicatorPosition")}),"　indicatorType: ",d().createElement(u.Ph,{data:["circle","number","line"],keygen:!0,style:{width:90},value:i,size:"small",onChange:this.propChange.bind(this,"indicatorType")})),d().createElement(u.lr,{style:{width:500,height:300},interval:n,animation:t,indicatorPosition:r,indicatorType:i},d().createElement("div",{style:{background:"#666",display:"flex"}},d().createElement("div",{style:m},"Page 1")),d().createElement("div",{style:{background:"#fa8c16",display:"flex"}},d().createElement("div",{style:m},"Page 2")),d().createElement("div",{style:{background:"#eb2f96",display:"flex"}},d().createElement("div",{style:m},"Page 3")),d().createElement("a",null,d().createElement("img",{alt:"",style:{width:"100%",height:"100%"},src:"https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg"}))))}}]),f}(s.Component)},31478:function(e,n,t){t.d(n,{Z:function(){return m}});var r=t(87363),i=t.n(r),a=t(11888),o=t(94184),c=t.n(o),l={fontSize:40,color:"#fff",display:"flex",margin:"auto"},s=["rgb(255,67,101)","rgb(252,157,154)","rgb(249,205,1173)","rgb(200,200,169)","rgb(131,175,155)"],d=["H","E","L","L","O"];function u(e,n){return i().createElement("div",{className:"indicator"},d.map((function(t,r){var a=e===r,o=c()("indicator-item",a&&"active"),l=a?{animation:"indicator-rise ".concat(5,"s linear")}:{};return i().createElement("div",{key:r,onClick:function(){return n(r)},className:o},i().createElement("span",null,t),i().createElement("div",{className:"indicator-progress"},i().createElement("div",{className:"fg",style:l}),i().createElement("div",{className:"bg"})))})))}function m(){return i().createElement(a.lr,{indicatorType:u,style:{width:500,height:300},interval:5e3},d.map((function(e,n){return i().createElement("div",{key:n,style:{background:s[n],display:"flex"}},i().createElement("div",{style:l},e))})))}},36519:function(e,n,t){var r=t(11888),i=t(87363),a=t.n(i);n.Z=function(e){var n=function(n){return(0,i.useEffect)((function(){return r.gb.finish(),function(){r.gb.start()}}),[]),a().createElement(e,n)};return a().memo(n)}},22088:function(e,n){n.Z="/**\r\n * cn - 基本用法\r\n *    -- 轮播组件提供了三种动画过渡方式，可以切换选项查看效果\r\n * en - Base\r\n *    -- The carousel component provides three modes of animation transition. Change the option to view the result.\r\n */\r\nimport React, { Component } from 'react'\r\nimport { Carousel, Select } from 'ethan-ui'\r\n\r\nconst containerStyle = {\r\n    fontSize: 40,\r\n    color: '#fff',\r\n    display: 'flex',\r\n    margin: 'auto',\r\n}\r\n\r\nexport default class extends Component {\r\n    constructor(props) {\r\n        super(props)\r\n        this.state = {\r\n            interval: 5000,\r\n            animation: 'slide',\r\n            indicatorType: 'circle',\r\n            indicatorPosition: 'center',\r\n        }\r\n    }\r\n\r\n    propChange(key, value) {\r\n        this.setState({ [key]: value })\r\n    }\r\n\r\n    render() {\r\n        const { interval, animation, indicatorPosition, indicatorType } = this.state\r\n\r\n        return (\r\n            <div>\r\n                <div style={{ marginBottom: 20 }}>\r\n                    animation:{' '}\r\n                    <Select\r\n                        data={['slide', 'slide-y', 'fade']}\r\n                        keygen\r\n                        style={{ width: 100 }}\r\n                        value={animation}\r\n                        size=\"small\"\r\n                        onChange={this.propChange.bind(this, 'animation')}\r\n                    />\r\n                    {'　indicatorPosition: '}\r\n                    <Select\r\n                        data={['left', 'center', 'right']}\r\n                        keygen\r\n                        style={{ width: 90 }}\r\n                        value={indicatorPosition}\r\n                        size=\"small\"\r\n                        onChange={this.propChange.bind(this, 'indicatorPosition')}\r\n                    />\r\n                    {'　indicatorType: '}\r\n                    <Select\r\n                        data={['circle', 'number', 'line']}\r\n                        keygen\r\n                        style={{ width: 90 }}\r\n                        value={indicatorType}\r\n                        size=\"small\"\r\n                        onChange={this.propChange.bind(this, 'indicatorType')}\r\n                    />\r\n                </div>\r\n\r\n                <Carousel\r\n                    style={{ width: 500, height: 300 }}\r\n                    interval={interval}\r\n                    animation={animation}\r\n                    indicatorPosition={indicatorPosition}\r\n                    indicatorType={indicatorType}\r\n                >\r\n                    <div style={{ background: '#666', display: 'flex' }}>\r\n                        <div style={containerStyle}>Page 1</div>\r\n                    </div>\r\n                    <div style={{ background: '#fa8c16', display: 'flex' }}>\r\n                        <div style={containerStyle}>Page 2</div>\r\n                    </div>\r\n                    <div style={{ background: '#eb2f96', display: 'flex' }}>\r\n                        <div style={containerStyle}>Page 3</div>\r\n                    </div>\r\n                    <a>\r\n                        <img\r\n                            alt=\"\"\r\n                            style={{ width: '100%', height: '100%' }}\r\n                            src=\"https://chenmingzhen.github.io/ethan-ui-library/images/1_b.jpg\"\r\n                        />\r\n                    </a>\r\n                </Carousel>\r\n            </div>\r\n        )\r\n    }\r\n}\r\n"},9052:function(e,n){n.Z="/**\r\n * cn - 自定义 Indicator\r\n *    -- 当 indicatorType 为函数时，可以自定义 Indicator\r\n * en - Custom Indicator\r\n *    -- Indicators can be customized when indicatorType is a function.\r\n */\r\nimport React from 'react'\r\nimport { Carousel } from 'ethan-ui'\r\nimport classnames from 'classnames'\r\nimport './style-2-custom-indicator.less'\r\n\r\nconst duration = 5000\r\n\r\nconst containerStyle = {\r\n    fontSize: 40,\r\n    color: '#fff',\r\n    display: 'flex',\r\n    margin: 'auto',\r\n}\r\n\r\nconst backgroundStyle = [\r\n    'rgb(255,67,101)',\r\n    'rgb(252,157,154)',\r\n    'rgb(249,205,1173)',\r\n    'rgb(200,200,169)',\r\n    'rgb(131,175,155)',\r\n]\r\n\r\nconst items = ['H', 'E', 'L', 'L', 'O']\r\n\r\nfunction indicatorSwitch(current, moveTo) {\r\n    return (\r\n        <div className=\"indicator\">\r\n            {items.map((item, index) => {\r\n                const isActive = current === index\r\n                const itemClassname = classnames('indicator-item', isActive && 'active')\r\n                const animationStyle = isActive ? { animation: `indicator-rise ${duration / 1000}s linear` } : {}\r\n                return (\r\n                    <div key={index} onClick={() => moveTo(index)} className={itemClassname}>\r\n                        <span>{item}</span>\r\n                        <div className=\"indicator-progress\">\r\n                            <div className=\"fg\" style={animationStyle} />\r\n                            <div className=\"bg\" />\r\n                        </div>\r\n                    </div>\r\n                )\r\n            })}\r\n        </div>\r\n    )\r\n}\r\n\r\nexport default function () {\r\n    return (\r\n        <Carousel indicatorType={indicatorSwitch} style={{ width: 500, height: 300 }} interval={duration}>\r\n            {items.map((item, index) => (\r\n                <div key={index} style={{ background: backgroundStyle[index], display: 'flex' }}>\r\n                    <div style={containerStyle}>{item}</div>\r\n                </div>\r\n            ))}\r\n        </Carousel>\r\n    )\r\n}\r\n"}}]);