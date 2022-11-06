/**
 * cn - 一组复选框
 *    -- 一组复选框可以放在 Checkbox.Group 中
 * en - Group
 *    -- A series of checkboxes group by Checkbox.Group.
 */
import React from 'react'
import { Checkbox } from 'ethan-ui'

const data = [
    { id: 1, color: 'red' },
    { id: 2, color: 'orange' },
    { id: 3, color: 'yellow' },
    { id: 4, color: 'green' },
    { id: 5, color: 'cyan' },
    { id: 6, color: 'blue' },
    { id: 7, color: 'violet' },
]

export default function () {
    const [value, updateValue] = React.useState([1, 2])

    return (
        <Checkbox.Group value={value}>
            {data.map((d) => (
                <Checkbox key={d.id} value={d.id}>
                    {d.color}
                </Checkbox>
            ))}
        </Checkbox.Group>
    )
}
