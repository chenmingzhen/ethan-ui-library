/**
 * cn - 垂直样式
 *    -- 设置 mode 为 "vertical"，显示为垂直布局
 * en - Vertical
 *    -- Set mode to "vertical" to display it as vertical layout.
 */
import React from 'react'
import { Menu } from 'ethan-ui'
import { RecursiveMenuWithExtraData } from '@/component/Menu/type'

function getItem(title: React.ReactNode, key: React.Key, children?: RecursiveMenuWithExtraData[], type?: 'group') {
    return {
        key,
        children,
        title,
        type,
    }
}

const data = [
    getItem('Navigation One', 'sub1', [
        getItem('Item 1', 'g1', [getItem('Option 1', '1'), getItem('Option 2', '2')], 'group'),
        getItem('Item 2', 'g2', [getItem('Option 3', '3'), getItem('Option 4', '4')], 'group'),
    ]),

    getItem('Navigation Two', 'sub2', [
        getItem('Option 5', '5'),
        getItem('Option 6', '6'),
        getItem('Submenu', 'sub3', [getItem('Option 7', '7'), getItem('Option 8', '8')]),
    ]),

    getItem('Navigation Three', 'sub4', [
        getItem('Option 9', '9'),
        getItem('Option 10', '10'),
        getItem('Option 11', '11'),
        getItem('Option 12', '12'),
    ]),
]

export default () => <Menu mode="vertical" data={data} style={{ width: 256 }} inlineIndent={24} />
