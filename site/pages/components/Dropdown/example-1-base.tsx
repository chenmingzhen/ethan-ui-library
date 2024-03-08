/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *    -- Dropdown is rendered through data and supports json formatted data and React components.
 */
import React from 'react'
import { Button, Dropdown } from 'ethan-ui'

const data = [
    {
        content: 'Submenu',
        key: 'Submenu',
        children: [
            {
                content: (
                    <a target="_blank" href="https://google.com" rel="noreferrer">
                        Link to Google
                    </a>
                ),
                key: 'Link to Google',
            },
        ],
    },
    { content: <a href="/">Home</a>, key: 'Home' },
    {
        content: 'Message',
        key: 'Message',
    },
]

export default function () {
    return (
        <Dropdown menu={{ data, onSelect: console.log }}>
            <Button>Click me</Button>
        </Dropdown>
    )
}
