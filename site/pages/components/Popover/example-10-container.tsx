/**
 * cn - 自定义容器
 *    -- 使用 getPopupContainer 指定渲染的目标容器
 * en - Custom container
 *    -- use getPopupContainer return target container
 */
import React from 'react'
import { Button, Popover } from 'ethan-ui'

export default function() {
    return (
        <div id="popup-target" style={{ height: 200, overflowY: 'auto', position: 'relative' }}>
            <div style={{ margin: '100px 0' }}>1</div>
            <Popover
                trigger="click"
                getPopupContainer={() => document.querySelector('#popup-target')}
                content="content"
                title="title"
            >
                <Button>Scrollable</Button>
            </Popover>
        </div>
    )
}
