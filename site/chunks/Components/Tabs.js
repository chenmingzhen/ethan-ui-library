/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Tabs/cn.md'
import en from 'doc/pages/components/Tabs/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '01-basex',
    title: locate(
    '基本用法 \n 默认标签样式',
    'Base \n Basic usage.'
    ),
    component: require('doc/pages/components/Tabs/example-01-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-01-base.tsx').default,
    },
    {
    name: '02-colorx',
    title: locate(
    '自定义颜色 \n 自定义每个标签的字体颜色、边框颜色和背景色',
    'Color \n Set the font color, border color, and background color for each label.'
    ),
    component: require('doc/pages/components/Tabs/example-02-color.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-02-color.tsx').default,
    },
    {
    name: '03-shape-linex',
    title: locate(
    '样式 \n 设置 shape 为 \'line\'，标签显示为线条',
    'Shape (line) \n The line type tabs.'
    ),
    component: require('doc/pages/components/Tabs/example-03-shape-line.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-03-shape-line.tsx').default,
    },
    {
    name: '04-shape-buttonx',
    title: locate(
    ' \n 设置 shape 为 \'button\'，标签显示为按钮',
    ' \n The button type tabs.'
    ),
    component: require('doc/pages/components/Tabs/example-04-shape-button.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-04-shape-button.tsx').default,
    },
    {
    name: '04-shape-dashx',
    title: locate(
    ' \n 设置 shape 为 \'dash\'，标签显示为短线条',
    ' \n dash tab type'
    ),
    component: require('doc/pages/components/Tabs/example-04-shape-dash.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-04-shape-dash.tsx').default,
    },
    {
    name: '05-extrax',
    title: locate(
    '额外内容 \n 可以在标签页的右侧添加额外内容',
    'Extra Content \n Can add extra content on the right side of the tab'
    ),
    component: require('doc/pages/components/Tabs/example-05-extra.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-05-extra.tsx').default,
    },
    {
    name: '06-scrollx',
    title: locate(
    '滚动 \n 超出长度时，会自动出现滚动按钮',
    'Scroll \n The slide button is displayed when the Tabs length exceeds the parent container'
    ),
    component: require('doc/pages/components/Tabs/example-06-scroll.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Tabs/example-06-scroll.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
