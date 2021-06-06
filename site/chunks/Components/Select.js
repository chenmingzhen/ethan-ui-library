/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Select/cn.md'
import en from 'doc/pages/components/Select/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '01-basex',
    title: locate(
    '基本用法 \n Select 没有单独的 Option 选项，通过数据来渲染。',
    'Base \n Select generate group of options from data.'
    ),
    component: require('doc/pages/components/Select/example-01-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-base.tsx').default,
    },
    {
    name: '01-cadaptx',
    title: locate(
    ' \n 当文字过长时，下拉列表宽度根据内容自由展开',
    ' \n options auto adapt width'
    ),
    component: require('doc/pages/components/Select/example-01-cadapt.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-cadapt.tsx').default,
    },
    {
    name: '01-multiplex',
    title: locate(
    '多选 \n multiple 属性为true时，为多选状态，默认为单选',
    'Multiple \n Set the multiple property to true, it is multi-selection.'
    ),
    component: require('doc/pages/components/Select/example-01-multiple.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-multiple.tsx').default,
    },
    {
    name: '01-o-compressedx',
    title: locate(
    ' \n 设置 compressed 使选中值合并展示，鼠标悬浮时将会展示所有值。',
    ' \n Set the compressed property to compress values, hover to show all values.'
    ),
    component: require('doc/pages/components/Select/example-01-o-compressed.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-01-o-compressed.tsx').default,
    },
    {
    name: '02-formatx',
    title: locate(
    '数据处理 \n 设置 format 选项把数据对象格式化为指定的 value',
    'Datum \n Set format property to format the data object to the specified value.'
    ),
    component: require('doc/pages/components/Select/example-02-format.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-02-format.tsx').default,
    },
    {
    name: '02-groupx',
    title: locate(
    '分组 \n 可以通过 groupBy 去将数据分组 \n 组件会通过该函数的返回值对内容进行分组, 如果返回的是空, 则默认不分组, 为了防止产生歧义, 建议有一个默认分组.',
    'GroupBy \n Grouping data by groupBy. \n The component will group the content by the return value of the function. If the return is empty, the default is not grouped. To prevent ambiguity, it is recommended to have a default grouping.'
    ),
    component: require('doc/pages/components/Select/example-02-group.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-02-group.tsx').default,
    },
    {
    name: '04-clearablex',
    title: locate(
    '可清空 \n clearable 属性为 true 时，hover 后会显示清空图标。',
    'Clearable \n Set the clearable property to true, the clear icon will be displayed on hover.'
    ),
    component: require('doc/pages/components/Select/example-04-clearable.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-04-clearable.tsx').default,
    },
    {
    name: '04-sizex',
    title: locate(
    '大小 \n 有三种 size，[\'small\', default, \'large\']',
    'Size \n There are three sizes, [\'small\', default, \'large\']'
    ),
    component: require('doc/pages/components/Select/example-04-size.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-04-size.tsx').default,
    },
    {
    name: '06-bigdatax',
    title: locate(
    '性能 \n Select 内部用懒加载机制来优化性能，本例加载了10000条数据。',
    'Performance \n Select uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.'
    ),
    component: require('doc/pages/components/Select/example-06-bigdata.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-06-bigdata.tsx').default,
    },
    {
    name: '07-disabledx',
    title: locate(
    '禁用 \n 设置 disabled 禁用组件',
    'Disabled \n Set the disabled property to disable the component.'
    ),
    component: require('doc/pages/components/Select/example-07-disabled.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-07-disabled.tsx').default,
    },
    {
    name: '08-filterx',
    title: locate(
    '筛选数据 - 内置 \n onFilter 返回函数时，使用这个函数做前端过滤',
    'Filter - built-in \n When the onFilter property returns a function, use this function to do front-end filtering.'
    ),
    component: require('doc/pages/components/Select/example-08-filter.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-08-filter.tsx').default,
    },
    {
    name: '09-filterx',
    title: locate(
    '筛选数据 - 服务端 \n onFilter 函数不返回结果时，从服务端筛选数据或自行处理',
    'Filter - server \n When the onFilter property don\'t return a function, you can filter data from server or filter by yourself.'
    ),
    component: require('doc/pages/components/Select/example-09-filter.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-09-filter.tsx').default,
    },
    {
    name: '10-filterx',
    title: locate(
    ' \n 示例：服务端过滤多选',
    ' \n Example: Server-side filters multiple selection.'
    ),
    component: require('doc/pages/components/Select/example-10-filter.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-10-filter.tsx').default,
    },
    {
    name: '11-createx',
    title: locate(
    '创建选项 \n 设置 onCreate 属性可以通过输入创建选项',
    'Create by input \n Set the onCreate property can create options by inputting.'
    ),
    component: require('doc/pages/components/Select/example-11-create.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-11-create.tsx').default,
    },
    {
    name: '12-createx',
    title: locate(
    ' \n 示例：创建选项和 filter 配合使用',
    ' \n Example: Create options with filter'
    ),
    component: require('doc/pages/components/Select/example-12-create.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-12-create.tsx').default,
    },
    {
    name: '13-absolutex',
    title: locate(
    '绝对定位 \n 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。（非必要情况下不建议）',
    'Absolute \n If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer. (not recommended if not necessary)'
    ),
    component: require('doc/pages/components/Select/example-13-absolute.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-13-absolute.tsx').default,
    },
    {
    name: '14-columns-defaultx',
    title: locate(
    '多列选项 \n 设置 columns 属性，选项变为多列展示，设置 columnWidth 指定每一列宽度',
    'Columns \n Set columns property over 1, options will display in multiple columns.'
    ),
    component: require('doc/pages/components/Select/example-14-columns-default.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-14-columns-default.tsx').default,
    },
    {
    name: '14-columns-stackx',
    title: locate(
    ' \n columns 为 -1 时选项会堆叠展示， columnWidth 为选项框的宽度',
    ' \n Set columns -1, options will display end by end， columnsWidth is the width of the option box'
    ),
    component: require('doc/pages/components/Select/example-14-columns-stack.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-14-columns-stack.tsx').default,
    },
    {
    name: '15-treeDatax',
    title: locate(
    '树形选择 \n 通过设置 treeData 来实现树形选择。',
    'Tree Select \n Set treeData to select with tree.'
    ),
    component: require('doc/pages/components/Select/example-15-treeData.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-15-treeData.tsx').default,
    },
    {
    name: '16-onFilterx',
    title: locate(
    '树形选择 - 筛选数据 \n 通过设置 onFilter 来筛选树形数据。',
    'Tree Select Filter \n Set onFilter to filter tree data.'
    ),
    component: require('doc/pages/components/Select/example-16-onFilter.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-16-onFilter.tsx').default,
    },
    {
    name: '17-resultx',
    title: locate(
    '自定义结果 \n 使用 renderResult 去自定义选中的结果。',
    'result \n use renderRsult. to format the result'
    ),
    component: require('doc/pages/components/Select/example-17-result.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Select/example-17-result.tsx').default,
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
