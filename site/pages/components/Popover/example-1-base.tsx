/**
 * cn - 基本用法
 *    -- Popover 放置在一个组件内部弹出
 * en - Base
 *    -- The basic usage.
 */
import React from 'react'
import { Button, Popover } from 'ethan/index'

export default function() {
    return (
        <Popover style={{ padding: '4px 8px' }} title="title" content="content">
            <Button>Hover</Button>
        </Popover>
    )
}
