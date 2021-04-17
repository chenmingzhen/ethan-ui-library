/**
* 此文件根据 scripts/components-page.ejs 生成，不要手动修改
*/
import React from 'react'
import navable from 'docs/Navable'
import MarkDown from 'docs/MarkDown'

import locate from 'doc/utils/locate'

import cn from 'doc/pages/components/Upload/cn.md'
import en from 'doc/pages/components/Upload/en.md'

const source = locate(cn, en)

const examples = [
    {
    name: '01-base.tsx',
    title: locate(
    '基本用法 \n 基础的文件上传, onSuccess 的返回值会作为 value 传给 onChange',
    'Base \n Basic usage for uploading file, the onSuccess\'s returns will be the onChange params'
    ),
    component: require('doc/pages/components/Upload/example-01-base.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-01-base.tsx'),
    },
    {
    name: '01-onChange.tsx',
    title: locate(
    '自定义结果 \n 默认展示的结果和 value 里面所存储的值是一样的, 如果有需求需要, 可以用 renderResult 自行处理',
    'Custom result \n The result of the default display is the same as the value stored in the value. If there is a need, you can use the renderResult to handle it yourself.'
    ),
    component: require('doc/pages/components/Upload/example-01-onChange.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-01-onChange.tsx'),
    },
    {
    name: '02-image.tsx',
    title: locate(
    '上传图片 \n 使用 Upload.Image 处理带预览的图片上传',
    'Image \n Use Upload.Image to upload and preview images.'
    ),
    component: require('doc/pages/components/Upload/example-02-image.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-02-image.tsx'),
    },
    {
    name: '02-show-image.tsx',
    title: locate(
    '自定义结果内容 \n 使用  renderContent 可以自定义上传之后的图片结果.',
    'Custom result content \n Use renderContent to customize the image results after uploading.'
    ),
    component: require('doc/pages/components/Upload/example-02-show-image.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-02-show-image.tsx'),
    },
    {
    name: '03-button.tsx',
    title: locate(
    '按钮上传 \n 使用 Upload.Button 展示单个文件的上传进度',
    'Button \n Use Upload.Button to show the upload progress of individual files'
    ),
    component: require('doc/pages/components/Upload/example-03-button.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-03-button.tsx'),
    },
    {
    name: '04-validator.tsx',
    title: locate(
    '校验 \n 通过 validator.imageSize 校验图片长宽，本例为 200px * 100px',
    'Validator \n Set validator.imageSize to validate the width and height of the image.'
    ),
    component: require('doc/pages/components/Upload/example-04-validator.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-04-validator.tsx'),
    },
    {
    name: '05-filesize.tsx',
    title: locate(
    '文件大小 \n 文件大小校验，本例为 10KB',
    ' \n Set validator.size to validate the size of the file. This example is 10KB.'
    ),
    component: require('doc/pages/components/Upload/example-05-filesize.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-05-filesize.tsx'),
    },
    {
    name: '06-error.tsx',
    title: locate(
    '异常处理 \n onHttpError 用来处理上传到服务器返回的异常',
    'Error \n Set onHttpError to handle exceptions returned by uploading to the server.'
    ),
    component: require('doc/pages/components/Upload/example-06-error.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-06-error.tsx'),
    },
    {
    name: '07-recover.tsx',
    title: locate(
    '恢复删除 \n 设置 recoverAble 为 true，点击删除后，文件会标记为已删除，可以通过恢复图标恢复',
    'Recover \n Set reconverAble to true, Clicking delete icon will not remove the file, but will mark it as deleted.'
    ),
    component: require('doc/pages/components/Upload/example-07-recover.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-07-recover.tsx'),
    },
    {
    name: '08-request.tsx',
    title: locate(
    '自定义上传 \n 通过 request 函数，替代默认上传方法',
    'Custom Request \n Set request property to use your own XMLHttpRequest.'
    ),
    component: require('doc/pages/components/Upload/example-08-request.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-08-request.tsx'),
    },
    {
    name: '09-zip.tsx',
    title: locate(
    ' \n 此事例演示通过自定义函数压缩文件后上传',
    ' \n Zip file and upload.'
    ),
    component: require('doc/pages/components/Upload/example-09-zip.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-09-zip.tsx'),
    },
    {
    name: '10-defaultValue.tsx',
    title: locate(
    '默认值 \n 默认值示例',
    'defaultValue \n defaultValue example'
    ),
    component: require('doc/pages/components/Upload/example-10-defaultValue.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-10-defaultValue.tsx'),
    },
    {
    name: '11-dragger.tsx',
    title: locate(
    '拖拽上传 \n 设置 drop 来支持拖拽上传',
    'Drag and Drop \n set drop to Drag files to upload.'
    ),
    component: require('doc/pages/components/Upload/example-11-dragger.tsx').default,
    // webpack静态资源内联raw-loader, Example中使用，代码内容从此处通过正则筛选
    rawText: require('!raw-loader!doc/pages/components/Upload/example-11-dragger.tsx'),
    },
]

    const codes = undefined

export default navable(props => (
<MarkDown {...props} codes={codes} source={source} examples={examples} />
))
