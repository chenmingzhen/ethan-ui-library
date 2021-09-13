/**
 * cn -
 *    -- 设置 shape 为 'button'，标签显示为按钮
 * en -
 *    -- The button type tabs.
 */
import React from 'react'
import { Tabs2 } from 'ethan'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <Tabs2 shape="button" defaultActive={1}>
            <Tabs2.Panel style={panelStyle} tab="Home">
                Content of Tab Pane 1
            </Tabs2.Panel>
            <Tabs2.Panel style={panelStyle} tab="Profile">
                Content of Tab Pane 2
            </Tabs2.Panel>
            <Tabs2.Panel style={panelStyle} tab="Contact">
                Content of Tab Pane 3
            </Tabs2.Panel>
        </Tabs2>
    )
}
