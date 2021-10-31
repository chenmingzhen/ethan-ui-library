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
        title: 'Navigation 1',
    },
    {
        key: '3',
        title: 'Navigation 3',
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
        key: '21',
        title: 'Navigation 21',
    },
    {
        key: '22',
        title: 'Navigation 22',
    },
    {
        key: '23',
        title: 'Navigation 23',
    },
    {
        key: '24',
        title: 'Navigation 24',
    },
    {
        key: '25',
        title: 'Navigation 25',
    },
    {
        key: '26',
        title: 'Navigation 26',
    },
    {
        key: '27',
        title: 'Navigation 27',
    },
    {
        key: '28',
        title: 'Navigation 28',
    },
    {
        key: '29',
        title: 'Navigation 29',
    },
    {
        key: '30',
        title: 'Navigation 30',
        children: [
            {
                key: '7',
                title: 'Option 3',
            },
            {
                key: '8',
                title: 'Option 4',
                children: [
                    {
                        key: '9',
                        title: 'Optic 1',
                    },
                    {
                        key: '10',
                        title: 'Optic 2',
                    },
                ],
            },
        ],
    },
    {
        key: '31',
        title: 'Navigation 31',
    },
    {
        key: '32',
        title: 'Navigation 32',
    },
    {
        key: '33',
        title: 'Navigation 33',
    },
    {
        key: '34',
        title: 'Navigation 34',
    },
    {
        key: '35',
        title: 'Navigation 35',
    },
    {
        key: '36',
        title: 'Navigation 36',
    },
    {
        key: '37',
        title: 'Navigation 37',
    },
    {
        key: '38',
        title: 'Navigation 38',
    },
    {
        key: '39',
        title: 'Navigation 39',
    },
    {
        key: '40',
        title: 'Navigation 40',
    },
    {
        key: '41',
        title: 'Navigation 41',
    },
    {
        key: '42',
        title: 'Navigation 42',
    },
    {
        key: '43',
        title: 'Navigation 43',
    },
    {
        key: '44',
        title: 'Navigation 44',
    },
    {
        key: '45',
        title: 'Navigation 45',
    },
]

export default () => (
    <Menu mode="horizontal" data={data} inlineIndent={24} defaultActiveKey="1" style={{ height: 62 }} />
)
