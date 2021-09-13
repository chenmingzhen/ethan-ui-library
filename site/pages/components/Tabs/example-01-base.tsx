/**
 * cn - 基本用法
 *    -- 默认标签样式
 * en - Base
 *    -- Basic usage.
 */
import React from 'react'
import { Tabs2 } from 'ethan'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <Tabs2 defaultActive={1}>
            <Tabs2.Panel style={panelStyle} tab="Home">
                Content of Tab Pane 1
            </Tabs2.Panel>
            <Tabs2.Panel style={panelStyle} tab="Profile">
                Content of Tab Pane 2
            </Tabs2.Panel>
            <Tabs2.Panel style={panelStyle} tab="Contact" disabled>
                Content of Tab Pane 3
            </Tabs2.Panel>
        </Tabs2>
    )
}
