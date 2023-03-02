/**
 * cn - 受控
 *    -- 使用 visible 属性控制浮层显示
 * en - Control
 *    -- Use visible prop to control the display of the panel
 */
import React, { useState } from 'react'
import { Tooltip, Button } from 'ethan-ui'

export default function () {
    const [mousedownVisible, updateMousedownVisible] = useState(false)
    const [hoverVisible, updateHoverVisible] = useState(false)

    function handleMousedownVisibleChange(show) {
        console.log('mousedown show:', show)
        updateMousedownVisible(show)
    }

    function handleHoverVisibleChange(show) {
        console.log('hover show:', show)
        updateHoverVisible(show)
    }

    return (
        <div>
            <Tooltip
                tip="Some text."
                visible={mousedownVisible}
                onVisibleChange={handleMousedownVisibleChange}
                trigger="mousedown"
            >
                <Button>mousedown</Button>
            </Tooltip>

            <Tooltip tip="Some text." visible={hoverVisible} onVisibleChange={handleHoverVisibleChange} trigger="hover">
                <Button style={{ marginLeft: 10 }}>hover</Button>
            </Tooltip>
        </div>
    )
}
