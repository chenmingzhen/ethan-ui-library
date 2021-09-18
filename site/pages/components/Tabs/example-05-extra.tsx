/**
 * cn - 额外内容
 *    -- 可以在标签页的右侧添加额外内容
 * en - Extra Content
 *    -- Can add extra content on the right side of the tab
 */
import React from 'react'
import { Tabs, Button } from 'ethan'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <Tabs defaultActive={1} tabBarExtraContent={<Button type="link">extra</Button>}>
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
