/**
 * cn - 弹出位置
 *    -- 设置 position 参数，修改显示位置，可以实现消息提醒展示位置，可选值：top, middle, top-left, top-right, bottom-left, bottom-right。
 * en - Notification
 *    -- Set position property to specify the pop-up layer location, optional value: top, middle, top-left, top-right, bottom-left, bottom-right.
 */
import React, { useState } from 'react'
import { Button, Message, Select } from 'ethan-ui'

const positions = ['top', 'middle', 'top-left', 'top-right', 'bottom-left', 'bottom-right']

export default function () {
    const [position, updatePosition] = useState(positions[0])

    function show() {
        Message.info(<div style={{ width: 240 }}>some message.</div>, 3, {
            position,
            title: 'notify title',
        })
    }

    return (
        <div>
            position:
            <Select
                keygen
                data={positions}
                onChange={updatePosition}
                value={position}
                width={200}
                style={{ margin: '0 20px' }}
            />
            <Button onClick={show}>Show message.</Button>
        </div>
    )
}
