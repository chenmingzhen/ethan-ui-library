/**
 * cn - 基本用法
 *    -- 内置了四个弹出方向
 * en - Base
 *    -- There are four pop-up directions built in.
 */
import React from 'react'
import { Tooltip, Icon } from 'ethan-ui'

const fontStyle = { fontSize: 20, lineHeight: 1, margin: 4 }

export default function () {
    return (
        <div>
            <Tooltip tip="Some text." position="left">
                <Icon.FontAwesome name="arrow-circle-o-left" style={fontStyle} />
            </Tooltip>
            <Tooltip tip="Some text." position="top">
                <Icon.FontAwesome name="arrow-circle-o-up" style={fontStyle} />
            </Tooltip>
            <Tooltip tip="Some text." position="bottom">
                <Icon.FontAwesome name="arrow-circle-o-down" style={fontStyle} />
            </Tooltip>
            <Tooltip tip="Some text." position="right">
                <Icon.FontAwesome name="arrow-circle-o-right" style={fontStyle} />
            </Tooltip>
        </div>
    )
}
