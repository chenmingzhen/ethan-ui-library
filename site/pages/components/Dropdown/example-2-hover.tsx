/**
 * cn - 触发
 *    -- Dropdown 默认通过点击触发下拉行为，设置 trigger="hover" 属性可以改为移入触发
 * en - Trigger
 *    -- By default, Dropdown toggled clicking, setting trigger="hover" can toggled by mouse move in.
 */
import React from 'react'
import { Button, Dropdown } from 'ethan-ui'

export default function () {
    const data = [
        {
            content: 'First',
            key: '1',
            children: [
                {
                    key: '3',
                    content: 'optic 1',
                    children: [
                        {
                            key: '7',
                            content: 'topic 3',
                            children: [
                                {
                                    key: '71',
                                    content: 'topic 71',
                                    children: [
                                        {
                                            key: '711',
                                            content: 'topic 711',
                                            children: [
                                                {
                                                    key: '7111',
                                                    content: 'topic 7111',
                                                },
                                            ],
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
            content: 'Second',
            key: '2',
            children: [
                {
                    content: 'topic 2',
                    key: '4',
                    disabled: true,
                    children: [
                        {
                            key: '6',
                            content: 'topic 3',
                        },
                    ],
                },
            ],
        },
    ]

    return (
        <Dropdown trigger="hover" menu={{ data }} position="left-bottom">
            <Button>hover</Button>
        </Dropdown>
    )
}
