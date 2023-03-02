/**
 * cn - 延迟展示
 *    -- 在Trigger为‘hover’的模式下，可以设置delay进行延迟展示
 * en - Delay
 *    -- Set the trigger property to change the trigger event to 'mousedown'.
 */
import React from 'react'
import { Tooltip, Button } from 'ethan-ui'

export default function () {
    return (
        <div>
            <Tooltip
                tip="Some text."
                trigger="hover"
                delay={500}
                onVisibleChange={(visible) => {
                    console.log('visible change:', visible)
                }}
            >
                <Button>Delay</Button>
            </Tooltip>
        </div>
    )
}
