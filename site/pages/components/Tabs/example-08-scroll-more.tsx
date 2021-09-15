/**
 * cn -
 *    -- 可设置不同的滚动图标
 * en -
 *    -- Different scroll icons can be set
 */
import React from 'react'
import { Tabs2 } from 'ethan'

const panelStyle = { padding: '12px 0' }

export default function() {
    return (
        <Tabs2 inactiveBackground="#f2f2f2" overflowIcon="more" shape="line">
            {Array.from({ length: 50 }).map((_, i) => (
                <Tabs2.Panel key={i} style={panelStyle} tab={`Tab ${i}`}>
                    Content of Tab Pane {i + 1}
                </Tabs2.Panel>
            ))}
        </Tabs2>
    )
}
