/**
 * cn - 滚动
 *    -- 超出长度时，会自动出现滚动按钮
 * en - Scroll
 *    -- The slide button is displayed when the Tabs length exceeds the parent container
 */
import React from 'react'
import { Tabs } from 'ethan-ui'

const panelStyle = { padding: '12px 0' }

export default function () {
    return (
        <Tabs shape="line">
            {Array.from({ length: 30 }).map((_, i) => (
                <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
                    Content of Tab Pane {i + 1}
                </Tabs.Panel>
            ))}
        </Tabs>
    )
}
