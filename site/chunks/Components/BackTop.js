/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/BackTop/cn.md'
import en from 'doc/pages/components/BackTop/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n 基本的使用',
    'Base \n Basic usage'
    ),
    component: require('doc/pages/components/BackTop/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/BackTop/example-1-base.tsx').default,
    },
    {
    name: '2-locationx',
    title: locate(
    '位置 \n 自定义按钮位置',
    'Location \n Customize the button position'
    ),
    component: require('doc/pages/components/BackTop/example-2-location.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/BackTop/example-2-location.tsx').default,
    },
    {
    name: '3-contentx',
    title: locate(
    '内容 \n 自定义内容',
    'Content \n Custom content'
    ),
    component: require('doc/pages/components/BackTop/example-3-content.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/BackTop/example-3-content.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
