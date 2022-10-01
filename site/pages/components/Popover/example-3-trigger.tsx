/**
 * cn - 触发方式
 *    -- 默认是移入组件触发，设置 trigger 为 'click'或Trigger数组，可以改变触发方式
 * en - Trigger
 *    -- Set the trigger property to change the trigger event.
 */
import React from 'react'
import { Button, Popover, Card } from 'ethan-ui'

export default function() {
    return (
        <Popover
            style={{ marginRight: 12 }}
            trigger={['click', 'hover']}
            content={
                <Card style={{ width: 300, border: 0, background: 'transparent' }}>
                    <Card.Header>Header</Card.Header>
                    <Card.Body style={{ height: 80 }}>Body</Card.Body>
                </Card>
            }
        >
            <Button>Trigger</Button>
        </Popover>
    )
}
