/**
 * cn - 自定义颜色
 *    -- 自定义每个标签的字体颜色、边框颜色和背景色
 * en - Color
 *    -- Set the font color, border color, and background color for each label.
 */
import React from 'react'
import { Tabs2, FontAwesome } from 'ethan'

const panelStyle = { padding: 15 }
const contact = (
    <span>
        <FontAwesome name="user" />
        Contact
    </span>
)

export default function() {
    return (
        <Tabs2 lazy={false}>
            <Tabs2.Panel border="transparent" color="#fff" background="#FE4365" style={panelStyle} tab="Home">
                Content of Tab Pane 1
            </Tabs2.Panel>
            <Tabs2.Panel border="transparent" background="#FC9D9A" style={panelStyle} tab="Profile">
                Content of Tab Pane 2
            </Tabs2.Panel>
            <Tabs2.Panel border="transparent" background="#F9CDAD" style={panelStyle} tab={contact}>
                Content of Tab Pane 3
            </Tabs2.Panel>
            <Tabs2.Panel border="transparent" background="#C8C8A9" style={panelStyle} tab="Setting">
                Content of Tab Pane 4
            </Tabs2.Panel>
            <Tabs2.Panel border="#b7eb8f" background="#f6ffed" style={panelStyle} tab="Message">
                Content of Tab Pane 5
            </Tabs2.Panel>
        </Tabs2>
    )
}
