/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Card/cn.md'
import en from 'doc/pages/components/Card/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n Card 内部由 Header, Body, Footer 三个自组件组成，可以组合或单独使用',
    'Base \n The card is composed of three components: Header, Body, and Footer. It can be combined or used separately.'
    ),
    component: require('doc/pages/components/Card/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Card/example-1-base.tsx').default,
    },
    {
    name: '2-boxshadowx',
    title: locate(
    '阴影 \n 可以通过 shadow 属性控制阴影',
    'BoxShadow \n Set the shadow property to determined how to display the shadow.'
    ),
    component: require('doc/pages/components/Card/example-2-boxshadow.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Card/example-2-boxshadow.tsx').default,
    },
    {
    name: '4-collapsex',
    title: locate(
    '折叠 \n 设置 collapsible 可以折叠 Card，通过 collapsed 或 defaultCollapsed 属性控制状态',
    'Collapse \n Set collapsible can collapse the Card panel.'
    ),
    component: require('doc/pages/components/Card/example-4-collapse.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Card/example-4-collapse.tsx').default,
    },
    {
    name: '5-accordionx',
    title: locate(
    '手风琴 \n 使用 Card.Accordion 可以使一组 Card 实现手风琴效果（每次打开一个 Card）',
    'Accordion \n Put a group of Card in the Card.Accordion, only one panel can be expanded at the same time.'
    ),
    component: require('doc/pages/components/Card/example-5-accordion.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Card/example-5-accordion.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
