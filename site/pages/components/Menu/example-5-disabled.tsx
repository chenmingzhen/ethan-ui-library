/**
 * cn - 禁用菜单
 *    -- 通过 disabled 属性可以禁用选项
 * en - Disabled
 *    --Disable the option by the disabled property.
 */
import React from 'react'
import { Menu } from 'ethan-ui'

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
        disabled: true,
    },
]

export default () => <Menu mode="inline" data={data} style={{ width: 256 }} inlineIndent={24} />
