/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Badge/cn.md'
import en from 'doc/pages/components/Badge/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-base',
    title: locate(
    '基本用法 \n 基本的使用',
    'Base \n Basic usage'
    ),
    component: require('doc/pages/components/Badge/example-1-base.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Badge/example-1-base.js'),
    },
    {
    name: '2-dot',
    title: locate(
    '点 \n 设置为点',
    'Dot \n Set to the dot'
    ),
    component: require('doc/pages/components/Badge/example-2-dot.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Badge/example-2-dot.js'),
    },
    {
    name: '3-overflow',
    title: locate(
    '数字隐藏 \n 数字模式超出隐藏',
    'Overflow \n Digital mode beyond hidden'
    ),
    component: require('doc/pages/components/Badge/example-3-overflow.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Badge/example-3-overflow.js'),
    },
    {
    name: '4-color',
    title: locate(
    '颜色 \n 自定义颜色',
    'Color \n Custom color'
    ),
    component: require('doc/pages/components/Badge/example-4-color.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Badge/example-4-color.js'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))