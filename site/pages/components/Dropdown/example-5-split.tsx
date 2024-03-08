/**
 * cn - 组合
 *    -- 在 Button.Group 中组合使用，通常用于隐藏一组按钮中不太常用的选项
 * en - Group
 *    -- Dropdown can be combined with Button used in Button.Group.
 */
import React from 'react'
import { Dropdown, Message, Button } from 'ethan-ui'

const data = [
    {
        content: 'First',
        key: 'First',
    },
    {
        content: (
            <a target="blank" href="http://www.google.com">
                Second
            </a>
        ),
        key: 'Second',
    },
]

export default function () {
    return (
        <Button.Group>
            <Button onClick={() => Message.info('The left button clicked.')}>Left</Button>
            <Button>Center</Button>
            <Dropdown
                position="bottom-right"
                menu={{
                    data,
                    onSelect(item) {
                        Message.info(`The Dropdown clicked ${item.content}.`)
                    },
                }}
            >
                <Button>Dropdown</Button>
            </Dropdown>
        </Button.Group>
    )
}
