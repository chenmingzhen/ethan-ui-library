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
        name: 'Icon',
        cn: '图标',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Icon" */ './Icon')),
        },
                'Layout',
                    'Form',
                    'Navigation',
                    'Data',
                {
        name: 'Carousel',
        cn: '轮播',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Carousel" */ './Carousel')),
        },
                'Feedback',
                {
        name: 'Alert',
        cn: '提示框',
        level: 2,
        component: lazy(() => import(/* webpackChunkName: "Alert" */ './Alert')),
        },
                'Other',
        ]

export default Page(pages)
