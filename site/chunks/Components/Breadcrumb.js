/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Breadcrumb/cn.md'
import en from 'doc/pages/components/Breadcrumb/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n 组件调用通过 json 数据配置',
    'Base \n The basic usage.'
    ),
    component: require('doc/pages/components/Breadcrumb/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-1-base.tsx'),
    },
    {
    name: '2-separatorx',
    title: locate(
    '分隔符 \n 默认的分隔符为 \'/\'，可以通过 separator 属性自定义',
    'separator \n The default separator is \'/\'.'
    ),
    component: require('doc/pages/components/Breadcrumb/example-2-separator.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-2-separator.tsx'),
    },
    {
    name: '3-iconx',
    title: locate(
    '图标 \n 带图标的面包屑',
    'icon \n Breadcrumbs with icons'
    ),
    component: require('doc/pages/components/Breadcrumb/example-3-icon.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Breadcrumb/example-3-icon.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
