/**
 * cn - 垂直样式
 *    -- 设置 mode 为 "vertical"，显示为垂直布局
 *    -- 设置 mode 为 "vertical-auto" 可以自动选择弹出方向（上下）
 * en - Vertical
 *    -- Set mode to "vertical" to display it as vertical layout.
 *    -- set 'vertical-auto' auto popup position
 */
import React from 'react'
import { Menu } from 'ethan-ui'

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
                children: [
                    {
                        key: '44',
                        title: 'Option 11',
                        children: [
                            {
                                key: '444',
                                title: 'Option 444',
                            },
                            {
                                key: '555',
                                title: 'Option 555',
                            },
                        ],
                    },
                    {
                        key: '55',
                        title: 'Option 22',
                    },
                ],
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
]

export default () => (
    <Menu
        mode="vertical"
        data={data}
        style={{ width: 256, height: 300 }}
        inlineIndent={24}
        subMenuTriggerActions={['hover']}
    />
)
