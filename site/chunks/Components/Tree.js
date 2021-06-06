/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Tree/cn.md'
import en from 'doc/pages/components/Tree/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '01-basex',
    title: locate(
    '基本用法 \n 基础的 Tree 用法',
    'Base \n Basic usage of Tree'
    ),
    component: require('doc/pages/components/Tree/example-01-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-01-base.tsx').default,
    },
    {
    name: '02-iconx',
    title: locate(
    '图标 \n 在 renderItem 中根据状态展示不同的图标',
    'Icons \n Display different icon in the renderItem.'
    ),
    component: require('doc/pages/components/Tree/example-02-icon.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-02-icon.tsx').default,
    },
    {
    name: '03-clickx',
    title: locate(
    '点击事件 \n 设置 onClick 属性监听节点点击',
    'Click \n Set the onClick property to listen the node click.'
    ),
    component: require('doc/pages/components/Tree/example-03-click.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-03-click.tsx').default,
    },
    {
    name: '04-nolinex',
    title: locate(
    '无连接线 \n 设置 line 为 false，隐藏连接线',
    'Line \n Set the line property to false to hid the connecting line.'
    ),
    component: require('doc/pages/components/Tree/example-04-noline.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-04-noline.tsx').default,
    },
    {
    name: '05-expandedx',
    title: locate(
    '控制展开 \n 受控的展开（此示例数据量太大，第一次全部展开会比较慢）',
    'Expanded \n Controlled expansion (Because the data in this example is too large, it will be slower for the first time.)'
    ),
    component: require('doc/pages/components/Tree/example-05-expanded.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-05-expanded.tsx').default,
    },
    {
    name: '06-changex',
    title: locate(
    '可选择 \n 选中值取值提供了 4 种模式 \n 0: 只返回完全选中的节点，包含父节点 \n 1: 返回全部选中的节点和半选中的父节点 \n 2: 只返回选中的子节点 \n 3: 如果父节点选中，只返回父节点',
    'onChange \n Selected values provide 4 modes \n 0: Return only the fully selected node, including the parent node. \n 1: Return the fully selected nodes and semi-selected parent nodes. \n 2: Return only the selected child node. \n 3: Return only the parent node, if the parent node is selected.'
    ),
    component: require('doc/pages/components/Tree/example-06-change.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-06-change.tsx').default,
    },
    {
    name: '07-disabledx',
    title: locate(
    '禁用 \n disabled 为函数时，根据返回结果禁用节点，同时禁用子节点 \n disabled 为 true 时，禁用全部节点',
    'disabled \n When the disabled property is a function, disable the node and its child nodes according to the returned result. \n When the disabled property is true, disable all nodes.'
    ),
    component: require('doc/pages/components/Tree/example-07-disabled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-07-disabled.tsx').default,
    },
    {
    name: '08-dragx',
    title: locate(
    '拖动 \n 设置 onDrop 属性可以拖动节点，设置 dragSibling 限制兄弟节点之间拖动',
    'Drag \n Set the onDrop property to drag nodes.'
    ),
    component: require('doc/pages/components/Tree/example-08-drag.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-08-drag.tsx').default,
    },
    {
    name: '08-styledragx',
    title: locate(
    '设置拖动样式 \n 可以通过 dragImageSelector, dragImageStyle, dragHoverExpand定义一些拖动的设置',
    'Set the drag style \n Some drag settings can be defined by dragImageSelector, dragImageStyle, dragHoverExpand'
    ),
    component: require('doc/pages/components/Tree/example-08-styledrag.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-08-styledrag.tsx').default,
    },
    {
    name: '09-lazyloadx',
    title: locate(
    '动态加载 \n 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数',
    'Lazy load \n Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.'
    ),
    component: require('doc/pages/components/Tree/example-09-lazyload.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-09-lazyload.tsx').default,
    },
    {
    name: 'datax',
    title: locate(
    '',
    ''
    ),
    component: require('doc/pages/components/Tree/example-data.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tree/example-data.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
