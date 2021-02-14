/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Icon/cn.md'
import en from 'doc/pages/components/Icon/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-awesome',
    title: locate(
    '基本用法 \n 基本用法',
    'Base \n Base'
    ),
    component: require('doc/pages/components/Icon/example-1-awesome.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Icon/example-1-awesome.js'),
    },
    {
    name: '2-iconfont',
    title: locate(
    '使用 Iconfont \n 可以在 iconfont.cn 定制一个图标，在项目中引入，支持font和svg两种方式',
    'Customize Font \n You can customize an icon in <a target="_blank" href="http://iconfont.cn">iconfont.cn</a> or <a target="_blank" href="http://fontastic.me/">fontastic.me</a>, support font and svg.'
    ),
    component: require('doc/pages/components/Icon/example-2-iconfont.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Icon/example-2-iconfont.js'),
    },
    {
    name: '3-size',
    title: locate(
    '样式 \n 通过fontSize,type,style设置样式',
    'Style \n Set fontSize,type and style to change Component style'
    ),
    component: require('doc/pages/components/Icon/example-3-size.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Icon/example-3-size.js'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
