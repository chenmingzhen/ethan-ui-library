/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Button/cn.md'
import en from 'doc/pages/components/Button/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '1-basex',
    title: locate(
    '基本用法 \n Button 内置了几种常用的类型，分为默认(default), 主要(primary), 次要(secondary), 成功(success), 警告(warning), 危险(danger)和链接(link)',
    'Base \n Button has several built-in type, default, primary, secondary, success, warning, dange, and link.'
    ),
    component: require('doc/pages/components/Button/example-1-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-1-base.tsx').default,
    },
    {
    name: '1-textx',
    title: locate(
    '文字按钮 \n 设置 text 属性来使用文字按钮',
    'Text \n set text to use text button'
    ),
    component: require('doc/pages/components/Button/example-1-text.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-1-text.tsx').default,
    },
    {
    name: '2-iconx',
    title: locate(
    '图标 \n shineout 并不提供内置的图标, 所以需要图标可以在内容中自行加入',
    'Icon \n shineout does not provide built-in icons, you can add it to the content by yourself.'
    ),
    component: require('doc/pages/components/Button/example-2-icon.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-2-icon.tsx').default,
    },
    {
    name: '3-sizex',
    title: locate(
    '大小 \n 一共有三种尺寸，[\'small\', \'default\', \'large\']，默认为 \'default\'',
    'Size \n There are three sizes, [\'small\', \'default\', \'large\'], default value is \'default\'.'
    ),
    component: require('doc/pages/components/Button/example-3-size.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-3-size.tsx').default,
    },
    {
    name: '4-disabledx',
    title: locate(
    '不可用 \n 添加 disabled 属性可以禁用按钮。',
    'Disabled \n Adding disabled property can disable the button.'
    ),
    component: require('doc/pages/components/Button/example-4-disabled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-4-disabled.tsx').default,
    },
    {
    name: '5-loadingx',
    title: locate(
    '加载中 \n 设定 loading 属性，可以让按钮变成加载中状态',
    'Loading \n Set loading property can add a loading indicator to button.'
    ),
    component: require('doc/pages/components/Button/example-5-loading.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-5-loading.tsx').default,
    },
    {
    name: '6-hrefx',
    title: locate(
    '链接 \n 设置 href 属性，按钮会渲染为 a 标签，同时可以设置 target 属性',
    'Link \n Set the href attribute, the button will be rendered as <a> tag and you can also set the target property.'
    ),
    component: require('doc/pages/components/Button/example-6-href.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-6-href.tsx').default,
    },
    {
    name: '7-outlinex',
    title: locate(
    '透明背景 \n 添加 outline 属性可以设置为透明背景，type 不能为 default 和 link。',
    'Outline \n Adding outline property can set background to transparent. Outline type can not be default and link.'
    ),
    component: require('doc/pages/components/Button/example-7-outline.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-7-outline.tsx').default,
    },
    {
    name: '8-groupx',
    title: locate(
    '组合 \n 一组 Button 可以用 Button.Group 容器中，按钮样式通过 Button.Group 的 size, type, outline 属性设置',
    'Group \n A series of buttons can group by Button.Group, set styles by Button.Group\'s size, type, and outline property.'
    ),
    component: require('doc/pages/components/Button/example-8-group.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Button/example-8-group.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
