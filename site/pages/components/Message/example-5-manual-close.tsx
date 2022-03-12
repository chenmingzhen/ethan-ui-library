/**
 * cn - 手动关闭
 *    -- Message 会返回一个关闭函数，调用它来关闭当前 Message
 * en - Close
 *    -- Message return close func
 */
import React from 'react'
import { Button, Message } from 'ethan/index'

export default () => {
    const msg = async () => {
        const close = Message.success(
            <div>
                I will always show until
                <a onClick={() => close()}> manually closed</a>
            </div>,
            0
        )
    }
    return <Button onClick={msg}>Manual Close</Button>
}
