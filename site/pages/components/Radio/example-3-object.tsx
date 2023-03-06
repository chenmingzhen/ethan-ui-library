/**
 * cn - 复杂数据
 *    -- value为对象
 * en - Complex data
 *    -- Value is object.
 */
import React from 'react'
import { Radio } from 'ethan-ui'

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
    return (
        <Radio.Group defaultValue={{ id: 1, color: 'red' }} onChange={console.log}>
            {data.map((d) => (
                <Radio key={d.id} value={d}>
                    {d.color}
                </Radio>
            ))}
        </Radio.Group>
    )
}
