/**
 * cn - 延迟
 *    -- 可以设置展示延时和关闭延时
 * en - delay
 *    -- the hidden/show delay
 */
import React from 'react'
import { Button, Popover } from 'ethan/index'

export default function() {
    return (
        <Popover mouseEnterDelay={1} mouseLeaveDelay={1} style={{ width: 200, padding: 20 }} content="Some text">
            <Button>Hover</Button>
        </Popover>
    )
}
