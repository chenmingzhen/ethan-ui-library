/**
 * cn -
 *    -- 可设置不同的滚动图标
 * en -
 *    -- Different scroll icons can be set
 */
import React from 'react'
import { Tabs } from 'ethan-ui'

const panelStyle = { padding: '12px 0' }

export default function () {
    return (
        <Tabs inactiveBackground="#f2f2f2" overflowIcon="more" shape="line">
            {Array.from({ length: 50 }).map((_, i) => (
                <Tabs.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
                    Content of Tab Pane {i + 1}
                </Tabs.Panel>
            ))}
        </Tabs>
    )
}
