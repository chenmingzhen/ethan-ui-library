/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Rate/cn.md'
import en from 'doc/pages/components/Rate/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '01-basex',
    title: locate(
    '基本用法 \n Rate 为一个函数，创建一个指定图标或文字的 Rate 组件，供多处复用。',
    'Base \n Rate is a function that creates a new custom Rate component that specifies an icon or text.'
    ),
    component: require('doc/pages/components/Rate/example-01-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-01-base.tsx'),
    },
    {
    name: '01-halfx',
    title: locate(
    '半星 \n Rate 是否允许半星。',
    'Semi selection \n Rate whether to allow semi selection.'
    ),
    component: require('doc/pages/components/Rate/example-01-half.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-01-half.tsx'),
    },
    {
    name: '02-colorx',
    title: locate(
    '颜色 \n 在创建组件时设置颜色',
    'Icon color \n Set the color when the component is created.'
    ),
    component: require('doc/pages/components/Rate/example-02-color.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-02-color.tsx'),
    },
    {
    name: '04-maxx',
    title: locate(
    '最大值 \n 通过 max 属性设置选项最大值，默认为 5',
    'Max \n Set the maximum value of the option through the max attribute. The default value is 5.'
    ),
    component: require('doc/pages/components/Rate/example-04-max.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-04-max.tsx'),
    },
    {
    name: '05-sizex',
    title: locate(
    '大小 \n 通过 size 属性可以设置大小',
    'Size \n Set the size through the size property.'
    ),
    component: require('doc/pages/components/Rate/example-05-size.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-05-size.tsx'),
    },
    {
    name: '06-textx',
    title: locate(
    '附加文字 \n text 属性可以为每个选项附加文字',
    'Text \n Set text property to append text to each item.'
    ),
    component: require('doc/pages/components/Rate/example-06-text.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-06-text.tsx'),
    },
    {
    name: '07-disabledx',
    title: locate(
    '只读 \n 设置 disabled 标示为只读，只读状态下，value可以传入小数',
    'Disabled \n Set disabled to true make it be read-only. When disabled, value can be passed in decimals.'
    ),
    component: require('doc/pages/components/Rate/example-07-disabled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-07-disabled.tsx'),
    },
    {
    name: '08-facex',
    title: locate(
    '分级显示 \n 创建组件时可以使用数组显示不同分数下的选项，这种情况下，不支持带小数的value',
    'Array \n You can use arrays to display items with different scores when creating components. In this case, values with decimals are not supported.'
    ),
    component: require('doc/pages/components/Rate/example-08-face.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-08-face.tsx'),
    },
    {
    name: '09-arrayx',
    title: locate(
    '不重复选项 \n 默认情况下，会重复显示当前分值对应的选项，设置 repeat 属性为 false 可以按分值显示不同选项。',
    'No Repeat \n By default, the item corresponding to the current value is displayed repeatedly. Set repeat property to false to display different item by value.'
    ),
    component: require('doc/pages/components/Rate/example-09-array.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-09-array.tsx'),
    },
    {
    name: '10-clearablex',
    title: locate(
    '清除 \n 通过 clearable 属性可以设置再次点击清除 value。',
    'clear \n Set the clearable to clear value when click again.'
    ),
    component: require('doc/pages/components/Rate/example-10-clearable.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Rate/example-10-clearable.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
