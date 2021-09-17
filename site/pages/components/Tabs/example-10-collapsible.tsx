/**
 * cn - 展开
 *    -- 设置 collapsible 为 true，会出现可展开图标，点击图标展开/折起内容。
 * en - Collapsible
 *    -- Set the collapsible property to true, will show the arrow icon. User can click icon to expand/collapse the content.
 */
import React from 'react'
import { Tabs2 } from 'ethan'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <Tabs2 shape="line" collapsible>
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
