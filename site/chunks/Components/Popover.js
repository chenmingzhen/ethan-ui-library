/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Popover/cn.md'
import en from 'doc/pages/components/Popover/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n Popover 放置在一个组件内部弹出',
    'Base \n The basic usage.'
    ),
    component: require('doc/pages/components/Popover/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-1-base.tsx').default,
    },
    {
    name: '1-controllx',
    title: locate(
    '受控 \n 可以通过 visible 去控制',
    'controll \n Use cisible to controll the show/hidden'
    ),
    component: require('doc/pages/components/Popover/example-1-controll.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-1-controll.tsx').default,
    },
    {
    name: '10-containerx',
    title: locate(
    '自定义容器 \n 使用 getPopupContainer 指定渲染的目标容器',
    'Custom container \n use getPopupContainer return target container'
    ),
    component: require('doc/pages/components/Popover/example-10-container.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-10-container.tsx').default,
    },
    {
    name: '11-disabledx',
    title: locate(
    '禁用元素 \n 当父元素被禁用，可以将 Popver 和禁用元素置于同一层级，并用元素将他们包裹',
    'Disabled \n When the parent element is disabled, you can place the Popver and the disabled element in the same hierarchy and wrap them with the element'
    ),
    component: require('doc/pages/components/Popover/example-11-disabled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-11-disabled.tsx').default,
    },
    {
    name: '2-delayx',
    title: locate(
    '延迟 \n 可以设置展示延时和关闭延时',
    'delay \n the hidden/show delay'
    ),
    component: require('doc/pages/components/Popover/example-2-delay.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-2-delay.tsx').default,
    },
    {
    name: '2-positionx',
    title: locate(
    '弹出位置 \n 内置了十二个弹出的位置',
    'Position \n Twelve pop-up positions are built in.'
    ),
    component: require('doc/pages/components/Popover/example-2-position.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-2-position.tsx').default,
    },
    {
    name: '3-clickx',
    title: locate(
    '点击触发 \n 默认是移入组件触发，设置 trigger 为 \'click\'，可以改为点击触发',
    'Trigger \n Set the trigger property to change the trigger event to \'click\'.'
    ),
    component: require('doc/pages/components/Popover/example-3-click.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-3-click.tsx').default,
    },
    {
    name: '4-confirmx',
    title: locate(
    '确认 \n Popover.Confirm 提供弹出气泡式的确认框',
    'Confirm \n Popover.Confirm provide popover confirm.'
    ),
    component: require('doc/pages/components/Popover/example-4-confirm.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-4-confirm.tsx').default,
    },
    {
    name: '5-funcx',
    title: locate(
    '关闭事件 \n content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件',
    'Close \n Set the content property to a function, you can handle the close event inside the popup panel.'
    ),
    component: require('doc/pages/components/Popover/example-5-func.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-5-func.tsx').default,
    },
    {
    name: '6-typex',
    title: locate(
    '样式 \n 内置四种样式',
    'Type \n Four styles are built in.'
    ),
    component: require('doc/pages/components/Popover/example-6-type.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-6-type.tsx').default,
    },
    {
    name: '7-typex',
    title: locate(
    ' \n 如果内置样式不满足需求，可以通过 background 和 border 自定义样式',
    ' \n Customize the style with background and border.'
    ),
    component: require('doc/pages/components/Popover/example-7-type.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-7-type.tsx').default,
    },
    {
    name: '9-eventx',
    title: locate(
    '事件 \n 提供了onOpen 和 onClose 事件',
    'Events \n provider onOpen and onClose event'
    ),
    component: require('doc/pages/components/Popover/example-9-event.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Popover/example-9-event.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
