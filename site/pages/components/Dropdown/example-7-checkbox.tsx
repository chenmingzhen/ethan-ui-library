/**
 * cn - 勾选框
 *    -- Dropdown 配合 Checkbox 实现勾选效果
 * en - Checkbox
 *    -- Dropdown cooperates with Checkbox to achieve the check effect.
 */
import React, { useState } from 'react'
import { Checkbox, Dropdown } from 'ethan-ui'

const data = [
    {
        content: <Checkbox value="Submenu">Submenu</Checkbox>,
        key: 'Submenu',
    },
    { content: <Checkbox value="Home">Home</Checkbox>, key: 'Home' },
    {
        content: <Checkbox value="Message">Message</Checkbox>,
        key: 'Message',
    },
]

export default function () {
    const [visible, updateVisible] = useState(false)

    return (
        <Checkbox.Group>
            <Dropdown placeholder="Dropdown" data={data} visible={visible} onVisibleChange={updateVisible} />
        </Checkbox.Group>
    )
}
