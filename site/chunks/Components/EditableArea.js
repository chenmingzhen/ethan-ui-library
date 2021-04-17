/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/EditableArea/cn.md'
import en from 'doc/pages/components/EditableArea/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '01-base.tsx',
    title: locate(
    '基本用法 \n EditableArea 默认展示一行，超过一行的内容用...代替',
    'Base \n Editablearea displays one line by default, and more than one line is replaced by ...'
    ),
    component: require('doc/pages/components/EditableArea/example-01-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-01-base.tsx'),
    },
    {
    name: '02-controlled.tsx',
    title: locate(
    '受控 \n 传递value, onChange使组件受控',
    'Controlled \n Pass value and onChange props to make the component controlled'
    ),
    component: require('doc/pages/components/EditableArea/example-02-controlled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-02-controlled.tsx'),
    },
    {
    name: '03-container.tsx',
    title: locate(
    '自定义容器 \n 在内滚容器中使用此组件，可使用 getPopupContainer 指定渲染的目标容器，使之随之滚动',
    'Custom container \n use getPopupContainer return target container'
    ),
    component: require('doc/pages/components/EditableArea/example-03-container.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/EditableArea/example-03-container.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
