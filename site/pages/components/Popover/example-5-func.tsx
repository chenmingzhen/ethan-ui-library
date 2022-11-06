/**
 * cn - 关闭事件
 *    -- content 属性可以为一个函数，会传递 close 函数，用来在弹出面板内部处理关闭事件
 * en - Close
 *    -- Set the content property to a function, you can handle the close event inside the popup panel.
 */
import React from 'react'
import { Button, Popover, Message } from 'ethan-ui'

export default function () {
    return (
        <Popover
            trigger="click"
            content={(close) => (
                <div style={{ padding: 20 }}>
                    <div>Are you sure you want to close this panel?</div>
                    <div style={{ marginTop: 30, textAlign: 'right' }}>
                        <Button
                            size="small"
                            onClick={() => {
                                close()
                                Message.success('Popover panel closed.')
                            }}
                        >
                            close
                        </Button>
                    </div>
                </div>
            )}
        >
            <Button>Click me</Button>
        </Popover>
    )
}
