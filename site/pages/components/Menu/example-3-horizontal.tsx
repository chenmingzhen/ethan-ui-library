/**
 * cn - 水平布局
 *    -- 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）
 * en - Horizontal
 *    -- Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).
 */
import React from 'react'
import { Menu } from 'ethan/index'

const data = [
    {
        key: '1',
        title: 'Navigation One',
    },
    {
        key: '3',
        title: 'Navigation Two',
        children: [
            {
                key: '4',
                title: 'Option 1',
            },
            {
                key: '5',
                title: 'Option 2',
            },
        ],
    },
    {
        key: '6',
        title: 'Navigation Three',
        children: [
            {
                key: '7',
                title: 'Option 3',
            },
            {
                key: '8',
                title: 'Option 4',
            },
        ],
    },
    {
        key: '2',
        title: 'Navigation Four',
    },
]

export default () => <Menu mode="horizontal" keygen="id" data={data} inlineIndent={24} defaultActiveKey="1" />
