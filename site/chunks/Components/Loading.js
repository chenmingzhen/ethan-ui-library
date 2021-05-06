/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Loading/cn.md'
import en from 'doc/pages/components/Loading/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n 开始加载,结束加载和错误加载',
    'Base \n Start loading , end loading and error Loading'
    ),
    component: require('doc/pages/components/Loading/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Loading/example-1-base.tsx'),
    },
    {
    name: '2-customx',
    title: locate(
    '自定义 \n 自定义加载风格和加载进度',
    'Customize \n Customize the loading style and loading schedule'
    ),
    component: require('doc/pages/components/Loading/example-2-custom.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Loading/example-2-custom.tsx'),
    },
    {
    name: '3-globalx',
    title: locate(
    '全局加载 \n 整屏设置加载中，加载图案参考Spin的type',
    'Global loading \n Full screen Settings are loaded,Load the pattern with reference to the type of Spin'
    ),
    component: require('doc/pages/components/Loading/example-3-global.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Loading/example-3-global.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
