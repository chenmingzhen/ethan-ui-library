/**
 * cn - 自定义颜色
 *    -- 自定义每个标签的字体颜色、边框颜色和背景色
 * en - Color
 *    -- Set the font color, border color, and background color for each label.
 */
import React from 'react'
import { Tabs, FontAwesome } from 'ethan-ui'

const panelStyle = { padding: 15 }

const activeTabStyle = { color: '#000000' }

const contact = (
    <span>
        <FontAwesome name="user" />
        Contact
    </span>
)

export default function() {
    return (
        <Tabs lazy={false}>
            <Tabs.Panel
                border="transparent"
                background="#FE4365"
                style={panelStyle}
                activeTabStyle={activeTabStyle}
                tab="Home"
            >
                Content of Tab Pane 1
            </Tabs.Panel>
            <Tabs.Panel
                border="transparent"
                background="#FC9D9A"
                style={panelStyle}
                activeTabStyle={activeTabStyle}
                tab="Profile"
            >
                Content of Tab Pane 2
            </Tabs.Panel>
            <Tabs.Panel
                border="transparent"
                background="#F9CDAD"
                style={panelStyle}
                activeTabStyle={activeTabStyle}
                tab={contact}
            >
                Content of Tab Pane 3
            </Tabs.Panel>
            <Tabs.Panel
                border="transparent"
                background="#C8C8A9"
                style={panelStyle}
                activeTabStyle={activeTabStyle}
                tab="Setting"
            >
                Content of Tab Pane 4
            </Tabs.Panel>
            <Tabs.Panel
                border="#b7eb8f"
                background="#f6ffed"
                style={panelStyle}
                activeTabStyle={activeTabStyle}
                tab="Message"
            >
                Content of Tab Pane 5
            </Tabs.Panel>
        </Tabs>
    )
}
