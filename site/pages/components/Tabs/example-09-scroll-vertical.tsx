/**
 * cn -
 *    -- 垂直方向滚动
 * en -
 *    -- Vertical scroll
 */
import React from 'react'
import { Tabs } from 'ethan-ui'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <>
            <Tabs
                inactiveBackground="#f2f2f2"
                overflowIcon="more"
                shape="line"
                align="vertical-right"
                style={{ height: '250px' }}
            >
                {Array.from({ length: 30 }).map((_, i) => (
                    <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
                        Content of Tab Pane {i + 1}
                    </Tabs.Panel>
                ))}
            </Tabs>
            <Tabs inactiveBackground="#f2f2f2" shape="line" align="vertical-left" style={{ height: '250px' }}>
                {Array.from({ length: 30 }).map((_, i) => (
                    <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
                        Content of Tab Pane {i + 1}
                    </Tabs.Panel>
                ))}
            </Tabs>
        </>
    )
}
