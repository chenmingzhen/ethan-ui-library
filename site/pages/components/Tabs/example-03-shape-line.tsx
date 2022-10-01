/**
 * cn - 样式
 *    -- 设置 shape 为 'line'，标签显示为线条
 * en - Shape (line)
 *    -- The line type tabs.
 */
import React from 'react'
import { Tabs } from 'ethan-ui'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <Tabs shape="line" defaultActive={1}>
            <Tabs.Panel style={panelStyle} tab="Home">
                Content of Tab Pane 1
            </Tabs.Panel>
            <Tabs.Panel style={panelStyle} tab="Profile">
                Content of Tab Pane 2
            </Tabs.Panel>
            <Tabs.Panel style={panelStyle} tab="Contact">
                Content of Tab Pane 3
            </Tabs.Panel>
        </Tabs>
    )
}
