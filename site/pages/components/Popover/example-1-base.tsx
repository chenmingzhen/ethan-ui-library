/**
 * cn - 基本用法
 *    -- Popover 放置在一个组件内部弹出
 * en - Base
 *    -- The basic usage.
 */
import React from 'react'
import { Button, Popover } from 'ethan-ui'

export default function () {
    return (
        <Popover title="title" content="content" trigger="hover">
            <Button>Hover</Button>
        </Popover>
    )
}
