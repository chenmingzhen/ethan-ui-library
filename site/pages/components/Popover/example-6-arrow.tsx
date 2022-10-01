/**
 * cn - 箭头
 *    -- 设置allowArrow属性用于控制箭头的显示
 * en - Close
 *    -- Set the allowArrow property to show arrow.
 */
import React from 'react'
import { Button, Popover } from 'ethan-ui'

export default function() {
    return (
        <Popover content="arrow" showArrow={false}>
            <Button>Click me</Button>
        </Popover>
    )
}
