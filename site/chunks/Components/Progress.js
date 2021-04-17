/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Progress/cn.md'
import en from 'doc/pages/components/Progress/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-base.tsx',
    title: locate(
    '基本用法 \n 基础的进度条',
    'Base \n Basic progress bar'
    ),
    component: require('doc/pages/components/Progress/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-1-base.tsx'),
    },
    {
    name: '2-type.tsx',
    title: locate(
    '样式 \n 内置了四种样式，通过 type 来调用',
    'Type \n There are 4 built-in style.'
    ),
    component: require('doc/pages/components/Progress/example-2-type.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-2-type.tsx'),
    },
    {
    name: '3-color.tsx',
    title: locate(
    ' \n 通过 color 使用自定义颜色',
    'Color \n Use custom colors.'
    ),
    component: require('doc/pages/components/Progress/example-3-color.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-color.tsx'),
    },
    {
    name: '3-linear.tsx',
    title: locate(
    '渐变色 \n 当 color 为对象时可以设置渐变色, 推荐只使用两种颜色',
    'Gradient \n Gradient color can be set when color is an object, recommended only in two colors'
    ),
    component: require('doc/pages/components/Progress/example-3-linear.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-3-linear.tsx'),
    },
    {
    name: '4-circle.tsx',
    title: locate(
    '圆形 \n 设置 shape 为 \'circle\'，显示为环形进度条',
    'Circle \n Set the shape property to circle to display circular progress bar.'
    ),
    component: require('doc/pages/components/Progress/example-4-circle.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-4-circle.tsx'),
    },
    {
    name: '5-size.tsx',
    title: locate(
    '大小 \n 通过 size 或 style 来控制大小 \n 通过 strokeWidth 属性来控制线框宽度',
    'Size \n Set size(circle) or style(line) property to change the size.'
    ),
    component: require('doc/pages/components/Progress/example-5-size.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-5-size.tsx'),
    },
    {
    name: '6-animation.tsx',
    title: locate(
    '动态示例 \n value 变更时动画效果演示',
    'Animation \n The animation for changing value.'
    ),
    component: require('doc/pages/components/Progress/example-6-animation.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Progress/example-6-animation.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
