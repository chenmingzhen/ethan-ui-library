/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Dropdown/cn.md'
import en from 'doc/pages/components/Dropdown/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n Dropdown 通过数据来渲染，支持 json 格式数据、React 组件',
    'Base \n Dropdown is rendered through data and supports json formatted data and React components.'
    ),
    component: require('doc/pages/components/Dropdown/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-1-base.tsx').default,
    },
    {
    name: '2-hoverx',
    title: locate(
    '触发 \n Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发',
    'Trigger \n By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.'
    ),
    component: require('doc/pages/components/Dropdown/example-2-hover.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-2-hover.tsx').default,
    },
    {
    name: '3-positionx',
    title: locate(
    '弹出位置 \n 设置 position 属性可以控制下拉菜单弹出的方向和位置',
    'Position \n Set position property can control the direction and position of the drop-down menu.'
    ),
    component: require('doc/pages/components/Dropdown/example-3-position.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-3-position.tsx').default,
    },
    {
    name: '4-itemsx',
    title: locate(
    '多列平铺 \n 设置 columns 属性可以让选项多列平铺',
    'Multiple columns \n Set columns property can make the option multi-column tiled.'
    ),
    component: require('doc/pages/components/Dropdown/example-4-items.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-4-items.tsx').default,
    },
    {
    name: '5-splitx',
    title: locate(
    '组合 \n 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项',
    'Group \n Dropdown can be combined with Button used in Button.Group.'
    ),
    component: require('doc/pages/components/Dropdown/example-5-split.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-5-split.tsx').default,
    },
    {
    name: '6-typex',
    title: locate(
    '样式 \n 使用了和Button相同的 type 和 size 设置样式',
    'type \n Style is set using the same type and size as Button.'
    ),
    component: require('doc/pages/components/Dropdown/example-6-type.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-6-type.tsx').default,
    },
    {
    name: '7-basex',
    title: locate(
    '绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。',
    'Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.'
    ),
    component: require('doc/pages/components/Dropdown/example-7-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Dropdown/example-7-base.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
