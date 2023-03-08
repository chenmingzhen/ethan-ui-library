/**
 * cn - 多选
 *    -- multiple 属性为true时，为多选状态，默认为单选
 * en - Multiple
 *    -- Set the multiple property to true, it is multi-selection.
 */
import React, { useState } from 'react'
import { Select } from 'ethan-ui'

const data = [
    { color: 'red' },
    { color: 'orange' },
    { color: 'yellow' },
    { color: 'green' },
    { color: 'cyan' },
    { color: 'blue' },
    { color: 'violet' },
]

export default () => {
    const [value, updateValue] = useState(['blue'])

    return (
        <Select
            style={{ width: 300, marginBottom: 15 }}
            data={data}
            multiple
            placeholder="Multiple select"
            value={value}
            labelKey="color"
            valueKey="color"
            disabled={({ color }) => color === 'blue'}
            onChange={(selectValues: string[]) => {
                updateValue(selectValues)
                console.log('onChange:', selectValues)
            }}
        />
    )
}
