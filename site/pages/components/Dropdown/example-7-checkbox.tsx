/**
 * cn - 基本用法
 *    -- Dropdown 通过数据来渲染，支持 json 格式数据、React 组件
 * en - Base
 *    -- Dropdown is rendered through data and supports json formatted data and React components.
 */
import React from 'react'
import { Checkbox, Dropdown } from 'ethan-ui'

function empty(e: React.MouseEvent<HTMLInputElement, MouseEvent>) {
    e.stopPropagation()
    e.preventDefault()
}

const data = [
    {
        content: (
            <Checkbox value="Submenu" onClick={empty}>
                Submenu
            </Checkbox>
        ),
        key: 'Submenu',
    },
    {
        content: (
            <Checkbox value="Home" onClick={empty}>
                Home
            </Checkbox>
        ),
        key: 'Home',
    },
    {
        content: (
            <Checkbox value="Message" onClick={empty}>
                Message
            </Checkbox>
        ),
        key: 'Message',
    },
]

export default function () {
    return (
        <Checkbox.Group>
            <Dropdown placeholder="Dropdown" data={data} onClick={console.log} />
        </Checkbox.Group>
    )
}
