/**
 * cn - 自定义渲染遮罩层
 *    --
 * en - Overlay
 *    --
 */
import React from 'react'
import { Dropdown } from 'ethan-ui'

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

export default function () {
    return (
        <Dropdown
            trigger="hover"
            overlay={({ menu }) => (
                <div id="dropdown-overlay">
                    <div style={{ backgroundColor: 'black', color: '#fff' }}>Header</div>
                    {menu}
                </div>
            )}
            menu={{ data, onSelect: console.log }}
        >
            <span>overlay</span>
        </Dropdown>
    )
}
