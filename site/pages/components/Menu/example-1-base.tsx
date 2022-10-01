/**
 * cn - 基本用法
 *    -- Menu 通过数据来生成菜单项
 * en - Base
 *    -- Menu generates menu items through data.
 */
import React from 'react'
import { Menu } from 'ethan-ui'

const data = [
    {
        key: '1',
        title: 'Navigation One',
    },
    {
        key: '2',
        title: 'Navigation Two',
        children: [
            {
                key: '3',
                title: 'Option 1',
            },
            {
                key: '4',
                title: 'Option 2',
            },
        ],
    },
    {
        key: '5',
        title: 'Navigation Three',
        children: [
            {
                key: '6',
                title: 'Option 3',
            },
            {
                key: '7',
                title: 'Option 4',
                children: [
                    {
                        key: '8',
                        title: 'Optic 1',
                    },
                    {
                        key: '9',
                        title: 'Optic 2',
                    },
                ],
            },
        ],
    },
    {
        key: '10',
        title: 'Navigation Four',
    },
]

export default () => (
    <Menu
        data={data}
        style={{ width: 256 }}
        inlineIndent={24}
        defaultOpenKeys={['2']}
        defaultActiveKey="1"
        onClick={item => {
            console.log(item)
        }}
    />
)
