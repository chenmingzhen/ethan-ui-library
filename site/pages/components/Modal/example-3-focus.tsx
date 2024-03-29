/**
 * cn - 默认聚焦按钮
 *    -- 设置 buttonProps的autoFocus 可以在打开的时候默认聚焦到某个按钮, 再点击回车可以触发改按钮的点击事件, 方便用户进行键盘操作. 该属性仅在 Modal的 methods 中生效.
 * en - Default focus button
 *    -- Setting autoFocus of buttonProps can focus on a button by default when you open it, and then press Enter to trigger the click event of the button, which is convenient for the user to perform keyboard operation. This property only takes effect in Modal methods
 */
import React from 'react'
import { Modal, Button, Message } from 'ethan-ui'

export default function () {
    function confirm(type) {
        Modal.confirm({
            title: 'This is a confirm message',
            content: `the ${type} button will be focus`,
            text: {
                ok: 'ok',
                cancel: 'cancel',
            },
            onOk: () => {
                Message.info('you chose the ok')
            },
            onCancel: () => {
                Message.info('you chose the cancel')
            },
            [`${type}ButtonProps`]: {
                autoFocus: true,
            },
        })
    }

    return (
        <div>
            <Button onClick={confirm.bind(this, 'cancel')}>cancel</Button>
            <Button onClick={confirm.bind(this, 'ok')}>ok</Button>
        </div>
    )
}
