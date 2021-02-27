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
                'Layout',
                    'Form',
                {
        name: 'Select',
        cn: '选择框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Select" */ './Select')),
        },
            {
        name: 'Upload',
        cn: '上传',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Upload" */ './Upload')),
        },
                'Navigation',
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
                'Other',
        ]

export default Page(pages)
