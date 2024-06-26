/**
 * cn - 图标
 *    -- 带图标的面包屑
 * en - icon
 *    -- Breadcrumbs with icons
 */

import React from 'react'
import { Breadcrumb, Icon } from 'ethan-ui'

const data = [
    { icon: <Icon.FontAwesome name="home" />, title: 'Home', url: '#home' },
    { title: 'Menu' },
    { title: 'Self', url: 'https://www.google.com' },
]

export default function () {
    return <Breadcrumb data={data} />
}
