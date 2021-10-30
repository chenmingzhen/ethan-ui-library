/**
 * cn - 暗系主题
 *    -- 内置了一个暗色的主题，通过 theme 使用
 * en - Dark theme
 *    -- The dark theme.
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
        disabled: true,
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
                children: [
                    {
                        key: '9',
                        disabled: true,
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
        key: '2',
        title: 'Navigation Four',
    },
]

export default () => <Menu data={data} style={{ width: 256 }} theme="dark" />
