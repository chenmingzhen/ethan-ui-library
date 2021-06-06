/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Menu/cn.md'
import en from 'doc/pages/components/Menu/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n Menu 通过数据来生成菜单项',
    'Base \n Menu generates menu items through data.'
    ),
    component: require('doc/pages/components/Menu/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-base.tsx').default,
    },
    {
    name: '1-linkx',
    title: locate(
    '链接 \n 可以通过设置 linkKey 来渲染出对应的链接',
    'link \n Can render the corresponding link by setting linkKey'
    ),
    component: require('doc/pages/components/Menu/example-1-link.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-1-link.tsx').default,
    },
    {
    name: '2-horizontalx',
    title: locate(
    '水平布局 \n 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）',
    'Horizontal \n Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).'
    ),
    component: require('doc/pages/components/Menu/example-2-horizontal.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-2-horizontal.tsx').default,
    },
    {
    name: '3-verticalx',
    title: locate(
    '垂直样式 \n 设置 mode 为 "vertical"，显示为垂直布局 \n 设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）',
    'Vertical \n Set mode to "vertical" to display it as vertical layout. \n set \'vertical-auto\' auto popup position'
    ),
    component: require('doc/pages/components/Menu/example-3-vertical.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-3-vertical.tsx').default,
    },
    {
    name: '4-disabledx',
    title: locate(
    '禁用菜单 \n 通过 disabled 属性可以禁用选项',
    'Disabled \n Disable the option by the disabled property.'
    ),
    component: require('doc/pages/components/Menu/example-4-disabled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-4-disabled.tsx').default,
    },
    {
    name: '5-selectedx',
    title: locate(
    '受控 \n active 参数控制选中选项',
    'Controlled \n Set active property to control the actived option.'
    ),
    component: require('doc/pages/components/Menu/example-5-selected.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-5-selected.tsx').default,
    },
    {
    name: '6-itemRenderx',
    title: locate(
    '自定义渲染 \n 设置 renderItem 属性展现稍微复杂的内容',
    'RenderItem \n Set the renderItem property to show format content.'
    ),
    component: require('doc/pages/components/Menu/example-6-itemRender.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-6-itemRender.tsx').default,
    },
    {
    name: '7-clickx',
    title: locate(
    '点击事件 \n 如果选项未设置单独的 onClick 事件，点击后会调用 Menu 定义的 onClick 事件',
    'Click \n If the data item set the onClick event, this event is called. Otherwise, the onClick event defined by Menu is called.'
    ),
    component: require('doc/pages/components/Menu/example-7-click.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-7-click.tsx').default,
    },
    {
    name: '8-darkx',
    title: locate(
    '暗系主题 \n 内置了一个暗色的主题，通过 theme 使用',
    'Dark theme \n The dark theme.'
    ),
    component: require('doc/pages/components/Menu/example-8-dark.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Menu/example-8-dark.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
