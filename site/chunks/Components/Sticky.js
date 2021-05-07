/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Sticky/cn.md'
import en from 'doc/pages/components/Sticky/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-topx',
    title: locate(
    '基本 \n 附着在顶部 20px',
    'Basic \n Sticky 20px to top'
    ),
    component: require('doc/pages/components/Sticky/example-1-top.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-1-top.tsx'),
    },
    {
    name: '2-elementx',
    title: locate(
    '指定元素 \n 附着在元素内',
    'Element \n Sticky to element'
    ),
    component: require('doc/pages/components/Sticky/example-2-element.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-2-element.tsx'),
    },
    {
    name: '3-bottomx',
    title: locate(
    '位置 \n 附着在底部',
    'Position \n Sticky to bottom'
    ),
    component: require('doc/pages/components/Sticky/example-3-bottom.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Sticky/example-3-bottom.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
