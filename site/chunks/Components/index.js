/**
* 此文件根据 scripts/component-index.ejs 生成，不要手动修改
*/
import { lazy } from 'react'
import Page from 'doc/pages/Page'

const pages = [
                {
        name: 'Start',
        cn: '快速上手',
        level: 1,
        component: lazy(() => import(/* webpackChunkName: "Start" */ './Start')),
        },
                'General',
                {
        name: 'Button',
        cn: '按钮',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Button" */ './Button')),
        },
            {
        name: 'Dropdown',
        cn: '下拉菜单',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Dropdown" */ './Dropdown')),
        },
            {
        name: 'Icon',
        cn: '图标',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Icon" */ './Icon')),
        },
            {
        name: 'Image',
        cn: '图片',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Image" */ './Image')),
        },
            {
        name: 'PhotoView',
        cn: '照片展览',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "PhotoView" */ './PhotoView')),
        },
                'Layout',
                {
        name: 'Card',
        cn: '卡片',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Card" */ './Card')),
        },
            {
        name: 'Grid',
        cn: '栅格',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Grid" */ './Grid')),
        },
            {
        name: 'Sticky',
        cn: '附着',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Sticky" */ './Sticky')),
        },
                'Form',
                {
        name: 'Checkbox',
        cn: '复选框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Checkbox" */ './Checkbox')),
        },
            {
        name: 'DatePicker',
        cn: '日期选择',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "DatePicker" */ './DatePicker')),
        },
            {
        name: 'EditableArea',
        cn: '可编辑域',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "EditableArea" */ './EditableArea')),
        },
            {
        name: 'Input',
        cn: '输入框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Input" */ './Input')),
        },
            {
        name: 'Radio',
        cn: '单选框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Radio" */ './Radio')),
        },
            {
        name: 'Rate',
        cn: '评分',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Rate" */ './Rate')),
        },
            {
        name: 'Select',
        cn: '选择框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Select" */ './Select')),
        },
            {
        name: 'Slider',
        cn: '滑块',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Slider" */ './Slider')),
        },
            {
        name: 'Textarea',
        cn: '多行文本框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Textarea" */ './Textarea')),
        },
            {
        name: 'Transfer',
        cn: '穿梭框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Transfer" */ './Transfer')),
        },
            {
        name: 'Upload',
        cn: '上传',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Upload" */ './Upload')),
        },
                'Navigation',
                {
        name: 'BackTop',
        cn: '回到顶部',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "BackTop" */ './BackTop')),
        },
            {
        name: 'Breadcrumb',
        cn: '面包屑',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Breadcrumb" */ './Breadcrumb')),
        },
            {
        name: 'Menu',
        cn: '菜单',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Menu" */ './Menu')),
        },
            {
        name: 'Steps',
        cn: '步骤条',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Steps" */ './Steps')),
        },
                'Data',
                {
        name: 'Avatar',
        cn: '头像',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Avatar" */ './Avatar')),
        },
            {
        name: 'Badge',
        cn: '徽标数',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Badge" */ './Badge')),
        },
            {
        name: 'Carousel',
        cn: '轮播',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Carousel" */ './Carousel')),
        },
            {
        name: 'Pagination',
        cn: '分页',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Pagination" */ './Pagination')),
        },
            {
        name: 'Timeline',
        cn: '时间轴',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Timeline" */ './Timeline')),
        },
            {
        name: 'Tree',
        cn: '树',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Tree" */ './Tree')),
        },
                'Feedback',
                {
        name: 'Alert',
        cn: '提示框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Alert" */ './Alert')),
        },
            {
        name: 'Loading',
        cn: '顶部进度条',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Loading" */ './Loading')),
        },
            {
        name: 'Message',
        cn: '消息提示',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Message" */ './Message')),
        },
            {
        name: 'Modal',
        cn: '对话框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Modal" */ './Modal')),
        },
            {
        name: 'Popover',
        cn: '气泡',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Popover" */ './Popover')),
        },
            {
        name: 'Progress',
        cn: '进度条',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Progress" */ './Progress')),
        },
            {
        name: 'Tag',
        cn: '标签',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Tag" */ './Tag')),
        },
            {
        name: 'Tooltip',
        cn: '提示',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Tooltip" */ './Tooltip')),
        },
    ]

export default Page(pages)
