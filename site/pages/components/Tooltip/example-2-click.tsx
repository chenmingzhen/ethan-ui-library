/**
 * cn - 点击触发
 *    -- 默认触发事件为 hover，如果需要点击触发，可以设置 trigger 为 mousedown
 * en - Click
 *    -- Set the trigger property to change the trigger event to 'mousedown'.
 */
import React from 'react'
import { Tooltip, Icon } from 'ethan-ui'

const fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 }

export default function () {
    return (
        <div>
            <Tooltip tip="Some text." trigger="mousedown" position="left">
                <Icon.FontAwesome name="arrow-circle-o-left" style={fontStyle} />
            </Tooltip>
            <Tooltip tip="Some text." trigger="mousedown" position="top">
                <Icon.FontAwesome name="arrow-circle-o-up" style={fontStyle} />
            </Tooltip>
            <Tooltip tip="Some text." trigger="mousedown" position="bottom">
                <Icon.FontAwesome name="arrow-circle-o-down" style={fontStyle} />
            </Tooltip>
            <Tooltip tip="Some text." trigger="mousedown" position="right">
                <Icon.FontAwesome name="arrow-circle-o-right" style={fontStyle} />
            </Tooltip>
        </div>
    )
}
