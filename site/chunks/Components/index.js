/**
* 此文件根据 scripts/component-index.ejs 生成，不要手动修改
*/
import { lazy } from 'react'
import Page from 'doc/pages/Page'

const pages = [
                    'General',
                    'Form',
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
                'Layout',
                    'Navigation',
        ]

export default Page(pages)
