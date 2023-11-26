/**
 * cn - 水平布局
 *    -- 设置 mode 为 "horizontal"，显示为水平布局
 * en - Horizontal
 *    -- Set mode to "horizontal" to display it as horizontal layout.
 */
import React from 'react'
import { Menu } from 'ethan-ui'
import { RecursiveMenuWithExtraData } from '@/component/Menu/type'

const data: RecursiveMenuWithExtraData[] = [
    {
        title: 'Navigation One',
        key: 'mail',
    },
    {
        title: 'Navigation Two',
        key: 'app',
        disabled: true,
    },
    {
        title: 'Navigation Three - Submenu',
        key: 'SubMenu',
        children: [
            {
                type: 'group',
                key: 'group 1',
                title: 'Item 1',
                children: [
                    {
                        title: 'Option 1',
                        key: 'setting:1',
                    },
                    {
                        title: 'Option 2',
                        key: 'setting:2',
                    },
                ],
            },
            {
                type: 'group',
                key: 'group 2',
                title: 'Item 2',
                children: [
                    {
                        title: 'Option 3',
                        key: 'setting:3',
                    },
                    {
                        title: 'Option 4',
                        key: 'setting:4',
                    },
                ],
            },
        ],
    },
    {
        title: (
            <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                Navigation Four - Link
            </a>
        ),
        key: 'alipay',
    },
]

export default () => <Menu mode="horizontal" data={data} subMenuTriggerActions={['click']} />
