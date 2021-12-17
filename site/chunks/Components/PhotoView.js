/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/PhotoView/cn.md'
import en from 'doc/pages/components/PhotoView/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n 基本的使用',
    'Base \n Basic usage'
    ),
    component: require('doc/pages/components/PhotoView/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/PhotoView/example-1-base.tsx').default,
    },
    {
    name: '2-triggerx',
    title: locate(
    '幻灯片 \n 打开图片幻灯片',
    'Slider \n Open photo slider.'
    ),
    component: require('doc/pages/components/PhotoView/example-2-trigger.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/PhotoView/example-2-trigger.tsx').default,
    },
    {
    name: '3-toolbarx',
    title: locate(
    '工具栏 \n 自定义工具栏',
    'Toolbar \n Custom toolbar.'
    ),
    component: require('doc/pages/components/PhotoView/example-3-toolbar.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/PhotoView/example-3-toolbar.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
