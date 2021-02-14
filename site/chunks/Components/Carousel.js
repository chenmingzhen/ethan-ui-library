/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Carousel/cn.md'
import en from 'doc/pages/components/Carousel/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '2-custom-indicator',
    title: locate(
    '自定义 Indicator \n 当 indicatorType 为函数时，可以自定义 Indicator',
    'Custom Indicator \n Indicators can be customized when indicatorType is a function.'
    ),
    component: require('doc/pages/components/Carousel/example-2-custom-indicator.js').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Carousel/example-2-custom-indicator.js'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
