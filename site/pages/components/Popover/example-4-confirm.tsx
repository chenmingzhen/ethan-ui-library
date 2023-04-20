/**
 * cn - 确认
 *    -- Popover.Confirm 提供弹出气泡式的确认框
 * en - Confirm
 *    -- Popover.Confirm provide popover confirm.
 */
import React from 'react'
import { Button, Popover } from 'ethan-ui'

export default function () {
    return (
        <Popover.Confirm
            onCancel={() => {
                console.log('cancel')
            }}
            onOk={() =>
                new Promise((resolve) => {
                    console.log('ok')
                    setTimeout(() => resolve(), 2000)
                })
            }
            text={{ ok: 'Yes', cancel: 'No' }}
            description="Are you sure delete?"
            title="title"
        >
            <Button>Delete</Button>
        </Popover.Confirm>
    )
}
