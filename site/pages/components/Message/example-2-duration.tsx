/**
 * cn - 显示时长
 *    -- 通过 duration 属性可以控制消息显示的时长，默认为3秒；当设定为 0s 时，Message不会自动关闭
 * en - Duration
 *    -- Set duration property to control the duration of the message display. The default value is 3 seconds.
 *    -- When duration is set to 0, the message will not hide automatically.
 */
import React from 'react'
import { Button, Message } from 'ethan-ui'

export default function () {
    return (
        <div>
            <Button onClick={() => Message.info('This message will close after 10 seconds.', 10)}>
                Duration 10 s.
            </Button>
        </div>
    )
}
