/**
 * cn - 绝对定位
 *    -- 如果选项弹出层的父容器被遮挡，可以设置 absolute 属性使弹出选项在单独层中渲染。
 * en - Absolute
 *    -- If the parent container of the pop-up layer is occluded, you can set the absolute property to make the pop-up options rendered in a separate layer.
 */
import React from 'react'
import { Dropdown } from 'ethan-ui'

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
            {
                content: 'Disabled',
                disabled: true,
                key: 'Disabled',
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
        <div style={{ background: '#eee', padding: 20, borderRadius: 10, overflow: 'hidden' }}>
            <Dropdown absolute placeholder="Absolute" data={data} />
            <Dropdown placeholder="Default" data={data} style={{ marginLeft: 40 }} />
        </div>
    )
}
