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
        key: '2',
        title: 'Navigation 2>',
        children: [
            {
                key: '21',
                title: 'Option 21',
            },
            {
                key: '22',
                title: 'Option 22>',
                children: [
                    {
                        key: '221',
                        title: 'Option 221>',
                        children: [
                            {
                                key: '2211',
                                title: 'Option 2211',
                            },
                            {
                                key: '2212',
                                title: 'Option 2212',
                            },
                        ],
                    },
                    {
                        key: '222',
                        title: 'Option 222',
                    },
                ],
            },
            {
                key: '23',
                title: 'Option 23>',
                children: [
                    {
                        key: '231',
                        title: 'Option 231>',
                        children: [
                            {
                                key: '2311',
                                title: 'Option 2311',
                            },
                            {
                                key: '2312',
                                title: 'Option 2312',
                            },
                        ],
                    },
                    {
                        key: '232',
                        title: 'Option 232>',
                        children: [
                            {
                                key: '2321',
                                title: 'Option 2321',
                            },
                            {
                                key: '2322',
                                title: 'Option 2322',
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

export default () => (
    <Menu
        mode="vertical"
        data={data}
        style={{ width: 256, height: 300 }}
        inlineIndent={24}
        // subMenuTriggerActions={['hover']}
    />
)
