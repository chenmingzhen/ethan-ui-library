"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5155],{75722:function(e,n,t){t.d(n,{Z:function(){return k}});var r=t(87462),a=t(29439),l=t(93433),o=t(87363),c=t.n(o),i=t(92242),s=t.n(i),u=t(73727),d=t(22770),m=t(62625),f=t(94184),v=t.n(f),p=t(15660),h=t.n(p),E=(t(62356),function(e){var n=e.language,t=void 0===n?"lang-jsx":n,r=e.value,a=(0,o.useRef)(null);return(0,o.useEffect)((function(){h().highlightElement(a.current,!1)}),[]),c().createElement("pre",{ref:a,className:v()(t,(0,d.vf)("pre"))},c().createElement("code",null,r))}),g=t(84506),y=t(11888),Z=t(91391),b=function(e){var n=e.component,t=e.id,r=e.rawText,l=void 0===r?"":r,i=e.title,s=(0,o.useState)(!1),u=(0,a.Z)(s,2),m=u[0],f=u[1],v=(0,o.useRef)((0,o.createElement)(n)).current,p=l.replace(/(^|\n|\r)\s*\/\*[\s\S]*?\*\/\s*(?:\r|\n|$)/,"").trim(),h=i.split("\n"),b=(0,g.Z)(h),w=b[0],x=b.slice(1),N=function(){f(!m)};return c().createElement(c().Fragment,null,w&&c().createElement("h3",{id:t},w),c().createElement(y.Zr,{placeholder:c().createElement("div",{className:(0,d.vf)("placeholder")},c().createElement(y.yC,{size:"54px",name:"four-dots",color:"#53a0fd"}))},c().createElement("div",{className:(0,d.vf)("_",m&&"showcode")},c().createElement("div",{className:(0,d.vf)("body")},v),i.length>0&&c().createElement("div",{className:(0,d.vf)("desc")},x.map((function(e,n){return c().createElement("div",{key:n,dangerouslySetInnerHTML:{__html:e}})})),c().createElement("a",{className:(0,d.vf)("toggle"),onClick:N},c().createElement(Z.Z,{name:m?"code-close":"code"}))),c().createElement(y.y_.Transition,{visible:m,transitionTypes:["collapse","fade"]},c().createElement(E,{value:p}),c().createElement("a",{className:(0,d.vf)("toggle"),onClick:N},c().createElement(Z.Z,{name:m?"code-close":"code"}))))))},w=c().memo(b),x=function(e){var n=e.children,t=(0,l.Z)(n[1].props.children);try{t.sort((function(e,n){return e.props.children[0].props.children[0].localeCompare(n.props.children[0].props.children[0])}))}catch(e){console.log("sort fail...")}return c().createElement("div",{style:{overflow:"auto"}},c().createElement("table",{className:"doc-api-table"},n[0],c().cloneElement(n[1],{children:t})))},N=t(35087),S=function(e){var n=[],t=(0,o.useContext)(N.Z).setHeadings,i=e.source,f=e.examples;return c().useEffect((function(){t(n)}),[]),c().createElement(s(),{className:(0,d.EX)("_"),source:i,renderers:{code:E,heading:function(e){var t=e.level,r=e.children,a="h".concat(t),l="heading-".concat(function(e,n){return"".concat(e,"-").concat((n||"").replace(/[\W|-]/g,"-"))}(t,r[0]));return 2!==t&&3!==t||n.push({id:l,level:t,children:r}),c().createElement(a,{id:l},r)},table:x,html:function(e){return"<example />"===e.value?c().createElement(c().Fragment,null,function(){if(!f)return c().createElement("div",null);var e=(0,m.ZP)("示例","Example"),t="heading-example-h";return n.push({id:t,level:2,children:[e]}),[c().createElement("h2",{key:"h",id:t},e)].concat((0,l.Z)(f.map((function(e){var t="heading-".concat(e.name),l=e.title.split("\n"),o=(0,a.Z)(l,1)[0];return n.push({id:t,level:3,children:[o]}),c().createElement(w,(0,r.Z)({key:t,id:t},e))}))))}()):"<br>"===e.value||"<br />"===e.value?c().createElement("br",null):null},link:function(e){var n=0===e.href.indexOf("http")?"_blank":void 0;return n?c().createElement("a",{href:e.href,target:n},e.children):c().createElement(u.rU,{to:e.href},e.children)}}})},k=c().memo(S)},35087:function(e,n,t){var r=(0,t(87363).createContext)(void 0);n.Z=r},88981:function(e,n,t){var r=t(29439),a=t(87363),l=t.n(a),o=t(91291),c=t(22770),i=t(11888),s=t(75964),u=t(12025),d=t(35087),m=function(e){var n=e.children,t=(0,a.useState)(""),m=(0,r.Z)(t,2),f=m[0],v=m[1],p=(0,a.useState)([]),h=(0,r.Z)(p,2),E=h[0],g=h[1],y=(0,o.Z)().hash,Z=(0,s.Z)((function(e){u.Z.push("".concat(u.Z.location.pathname,"#").concat(e));var n=document.getElementById(e);null==n||n.scrollIntoView()})),b=(0,s.Z)((function(){var e=document.documentElement.scrollTop,n=E.filter((function(e){return 3===e.level&&e.children.length}));if(0!==n.length){var t=n[0].id;n.forEach((function(n){var r=document.querySelector("#".concat(n.id));(null==r?void 0:r.offsetTop)<=e&&(t=n.id)})),v(t)}}));(0,a.useEffect)((function(){if(b(),y){var e=document.querySelector(y);setTimeout((function(){null==e||e.scrollIntoView()}),20)}return document.addEventListener("scroll",b),function(){document.removeEventListener("scroll",b)}}),[E]);var w=l().useMemo((function(){return{setHeadings:g}}),[]);return l().createElement("div",{className:(0,c.EH)("_")},l().createElement(d.Z.Provider,{value:w},n),l().createElement(i.Le,{className:(0,c.EH)("sticky"),top:50},l().createElement("div",{className:(0,c.EH)("nav")},E.map((function(e,n){var t=e.children.filter((function(e){return"string"==typeof e}));return l().createElement("a",{key:n,className:(0,c.EH)("level-".concat(e.level),f===e.id&&"active"),onClick:Z.bind(null,e.id)},t)})))))};n.Z=l().memo(m)},457:function(e,n,t){t.r(n),t.d(n,{default:function(){return d}});var r=t(87363),a=t.n(r),l=t(88981),o=t(75722),c=t(62625),i=t(36519),s=(0,c.ZP)("# Swiper *轮播2.0(无缝滚动)*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| 属性 | 类型 | 默认值 | 说明 |\r\n| --- | --- | --- | --- |\r\n| transitionDuration | number | 450 | 过渡持续时间 |\r\n| className | string | 无 | 扩展className |\r\n| autoPlay | boolean | true | 是否自动播放 |\r\n| autoplayInterval | number | 2000 | 滚动到下一张的时间 |\r\n| dots | boolean | true | 是否显示面板指示点 |\r\n| arrows | boolean | true | 是否显示箭头 |\r\n| style | React.CSSProperties | 无 | Swiper的拓展样式 |\r\n| onChange | (current: number) => void | 无 | 切换面板的回调 |\r\n| renderArrow | (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode | 无 | 自定义箭头的渲染 |\r\n\r\n### 方法\r\n\r\n** *swiper的ref返回两个切换方法**\r\n\r\n| 名称 | 描述 | \r\n| --- | --- | \r\n| onPrev | 上一张 | \r\n| onNext | 下一张 |\r\n","# Swiper *Carousel 2.0(Seamless rolling)*\r\n\r\n<example />\r\n\r\n## API\r\n\r\n| Property | Type | Default | Description |\r\n| --- | --- | --- | --- |\r\n| transitionDuration | number | 450 | Transition duration |\r\n| className | string | none | Extend className |\r\n| autoPlay | boolean | true | auto play |\r\n| autoplayInterval | number | 2000 | scroll to the time of the next slide |\r\n| dots | boolean | true | whether to display panel indicator points |\r\n| arrows | boolean | true | whether to show arrows |\r\n| style | React.CSSProperties | none | swiper extends style |\r\n| onChange | (current: number) => void | none | switch panel callback |\r\n| renderArrow | (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode | none | custom arrow rendering |\r\n\r\n### Method\r\n\r\n** *Swiper's ref returns two toggle methods**\r\n\r\n| name | description | \r\n| --- | --- | \r\n| onPrev | prev slide  | \r\n| onNext | next slide |\r\n"),u=[{name:"1-base",title:(0,c.ZP)("基本用法 \n 基本用法","Base \n Base"),component:t(85556).Z,rawText:t(22504).Z}],d=(0,i.Z)((function(){return a().createElement(l.Z,null,a().createElement(o.Z,{source:s,examples:u}))}))},85556:function(e,n,t){var r=t(87363),a=t.n(r),l=t(11888),o={background:"#6c98d6",lineHeight:"210px",textAlign:"center",color:"#fff",fontWeight:700,fontSize:"30px"};n.Z=function(){return a().createElement(l.tq,{style:{height:210,width:"100%"}},a().createElement("div",{style:o},"1"),a().createElement("div",{style:o},"2"),a().createElement("div",{style:o},"3"))}},36519:function(e,n,t){var r=t(11888),a=t(87363),l=t.n(a);n.Z=function(e){var n=function(n){return(0,a.useEffect)((function(){return r.gb.finish(),function(){r.gb.start()}}),[]),l().createElement(e,n)};return l().memo(n)}},22504:function(e,n){n.Z="/**\r\n * cn - 基本用法\r\n *    -- 基本用法\r\n * en - Base\r\n *    -- Base\r\n */\r\nimport React from 'react'\r\nimport { Swiper } from 'ethan-ui'\r\n\r\nconst style: React.CSSProperties = {\r\n    background: '#6c98d6',\r\n    lineHeight: '210px',\r\n    textAlign: 'center',\r\n    color: '#fff',\r\n    fontWeight: 700,\r\n    fontSize: '30px',\r\n}\r\n\r\nexport default () => (\r\n    <Swiper style={{ height: 210, width: '100%' }}>\r\n        <div style={style}>1</div>\r\n        <div style={style}>2</div>\r\n        <div style={style}>3</div>\r\n    </Swiper>\r\n)\r\n"}}]);