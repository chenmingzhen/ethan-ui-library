/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Avatar/cn.md'
import en from 'doc/pages/components/Avatar/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-base.tsx',
    title: locate(
    '基本用法 \n 基本的使用',
    'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Avatar/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Avatar/example-1-base.tsx'),
    },
    {
    name: '2-text-size.tsx',
    title: locate(
    '适应 \n 自适应文字大小',
    'Adaptive \n Adaptive text size'
    ),
    component: require('doc/pages/components/Avatar/example-2-text-size.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Avatar/example-2-text-size.tsx'),
    },
    {
    name: '3-custom.tsx',
    title: locate(
    '自定义 \n 自定义样式',
    'Custom \n custom style'
    ),
    component: require('doc/pages/components/Avatar/example-3-custom.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Avatar/example-3-custom.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
