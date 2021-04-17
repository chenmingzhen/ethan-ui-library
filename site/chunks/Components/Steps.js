/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Steps/cn.md'
import en from 'doc/pages/components/Steps/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-base.tsx',
    title: locate(
    '基本用法 \n 简单的步骤条',
    'Base \n Simple steps'
    ),
    component: require('doc/pages/components/Steps/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Steps/example-1-base.tsx'),
    },
    {
    name: '2-mini.tsx',
    title: locate(
    '迷你 \n 迷你的步骤条',
    'Mini \n Mini steps'
    ),
    component: require('doc/pages/components/Steps/example-2-mini.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Steps/example-2-mini.tsx'),
    },
    {
    name: '3-icon.tsx',
    title: locate(
    '图标 \n 自定义图标',
    'Icon \n Custom Icon'
    ),
    component: require('doc/pages/components/Steps/example-3-icon.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Steps/example-3-icon.tsx'),
    },
    {
    name: '4-error.tsx',
    title: locate(
    '错误 \n 步骤出现错误',
    'Error \n Error in steps'
    ),
    component: require('doc/pages/components/Steps/example-4-error.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Steps/example-4-error.tsx'),
    },
    {
    name: '5-change.tsx',
    title: locate(
    '步骤切换 \n 改变流程的处理进度',
    'Steps to switch \n Change the processing schedule of the process'
    ),
    component: require('doc/pages/components/Steps/example-5-change.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Steps/example-5-change.tsx'),
    },
    {
    name: '6-vertical.tsx',
    title: locate(
    '垂直 \n 设置 vertical 属性，修改组件为垂直方向',
    'Vertical \n Set the vertical property to change the component vertical.'
    ),
    component: require('doc/pages/components/Steps/example-6-vertical.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Steps/example-6-vertical.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
