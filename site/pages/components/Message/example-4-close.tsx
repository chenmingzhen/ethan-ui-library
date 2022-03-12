/**
 * cn - 关闭回调
 *    -- 通过第三个参数[options]的 onClose 属性处理消息关闭回调,设置closeable可显示关闭按钮。
 * en - Close
 *    -- Set onClose to handle close event. Set closeable to show close icon
 */
import React from 'react'
import { Button, Message } from 'ethan/index'

export default function() {
    const close = () => {
        Message.warn('Close this message will display another message.', 0, {
            onClose: () => {
                Message.info('You can close the message now.')
            },
            closeable: true,
        })
    }

    return <Button onClick={close}>Close callback</Button>
}
