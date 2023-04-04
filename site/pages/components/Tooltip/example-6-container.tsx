/**
 * cn - 渲染到指定容器
 *    -- 使用 getContainer 指定渲染的目标容器
 * en - Container
 *    -- use getContainer return target container.
 */
import React from 'react'
import { Tooltip, Button } from 'ethan-ui'

export default function () {
    return (
        <div id="popup-target" style={{ height: 200, overflowY: 'auto', position: 'relative' }}>
            <div style={{ margin: '100px 0' }}>PlaceHolder</div>
            <Tooltip
                tip="Some text."
                getPopupContainer={() => document.querySelector('#popup-target')}
                trigger="mousedown"
            >
                <Button>Mousedown</Button>
            </Tooltip>
        </div>
    )
}
