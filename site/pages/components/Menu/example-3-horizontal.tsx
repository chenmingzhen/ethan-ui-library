/**
 * cn - 水平布局
 *    -- 设置 mode 为 "horizontal"，显示为水平布局（子菜单在右侧弹出）
 * en - Horizontal
 *    -- Set mode to "horizontal" to display it as horizontal layout (submenu pops up on the right).
 */
import React from 'react'
import { Menu } from 'ethan-ui'

const data = [
    {
        key: '1',
        title: 'Navigation 1',
    },
    {
        key: '2',
        title: 'Navigation 2↓',
        children: [
            {
                key: 'group2-1',
                type: 'group',
                title: 'Group2',
                children: [
                    {
                        key: 'group2-1-21',
                        title: 'Option 21',
                    },
                    {
                        key: 'group2-1-22',
                        title: 'Option 22>',
                        children: [
                            {
                                key: 'group2-1-221',
                                title: 'Option 221>',
                                children: [
                                    {
                                        key: 'group2-1-2211',
                                        title: 'Option 2211',
                                    },
                                    {
                                        key: 'group2-1-2212',
                                        title: 'Option 2212',
                                    },
                                ],
                            },
                            {
                                key: 'group2-1-222',
                                title: 'Option 222',
                            },
                        ],
                    },
                    {
                        key: 'group2-1-23',
                        title: 'Option 23>',
                        children: [
                            {
                                key: 'group2-1-231',
                                title: 'Option 231>',
                                children: [
                                    {
                                        key: 'group2-1-2311',
                                        title: 'Option 2311',
                                    },
                                    {
                                        key: 'group2-1-2312',
                                        title: 'Option 2312',
                                    },
                                ],
                            },
                            {
                                key: 'group2-1-232',
                                title: 'Option 232>',
                                children: [
                                    {
                                        key: 'group2-1-2321',
                                        title: 'Option 2321',
                                    },
                                    {
                                        key: 'group2-1-2322',
                                        title: 'Option 2322',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
            {
                key: 'group2-2',
                type: 'group',
                title: 'Group2-2',
                children: [
                    {
                        key: 'group2-2-22',
                        title: 'Option 22>',
                        children: [
                            {
                                key: 'group2-2-221',
                                title: 'Option 221>',
                                children: [
                                    {
                                        key: 'group2-2-2211',
                                        title: 'Option 2211',
                                    },
                                    {
                                        key: 'group2-2-2212',
                                        title: 'Option 2212',
                                    },
                                ],
                            },
                            {
                                key: 'group2-2-222',
                                title: 'Option 222',
                            },
                        ],
                    },
                    {
                        key: 'group2-2-21',
                        title: 'Option 21',
                    },

                    {
                        key: 'group2-2-23',
                        title: 'Option 23>',
                        children: [
                            {
                                key: 'group2-2-231',
                                title: 'Option 231>',
                                children: [
                                    {
                                        key: 'group2-2-2311',
                                        title: 'Option 2311',
                                    },
                                    {
                                        key: 'group2-2-2312',
                                        title: 'Option 2312',
                                    },
                                ],
                            },
                            {
                                key: 'group2-2-232',
                                title: 'Option 232>',
                                children: [
                                    {
                                        key: 'group2-2-2321',
                                        title: 'Option 2321',
                                    },
                                    {
                                        key: 'group2-2-2322',
                                        title: 'Option 2322',
                                    },
                                ],
                            },
                        ],
                    },
                ],
            },
        ],
    },
    {
        key: '3',
        title: 'Navigation 3',
    },
    {
        key: '4',
        title: 'Navigation 4',
    },

    {
        key: '5',
        title: 'Navigation 5',
        children: [
            {
                key: '51',
                title: 'Option 51',
            },
            {
                key: '52',
                title: 'Option 52',
                children: [
                    {
                        key: '521',
                        title: 'Optic 521',
                    },
                    {
                        key: '522',
                        title: 'Optic 522',
                    },
                ],
            },
        ],
    },
]

export default () => <Menu mode="horizontal" data={data} subMenuTriggerActions={['click']} />
