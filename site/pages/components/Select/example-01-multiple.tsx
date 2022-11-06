/**
 * cn - 多选
 *    -- multiple 属性为true时，为多选状态，默认为单选
 * en - Multiple
 *    -- Set the multiple property to true, it is multi-selection.
 */
import React, { useState } from 'react'
import { Select } from 'ethan-ui'

interface Value {
    id: string
}

const data: Value[] = [
    { id: 'red' },
    { id: 'orange' },
    { id: 'yellow' },
    { id: 'green' },
    { id: 'cyan' },
    { id: 'blue' },
    { id: 'violet' },
]

export default () => {
    const [value, updateValue] = useState<string[]>(['blue'])

    return (
        <Select<Value, string>
            style={{ width: 300, marginBottom: 15 }}
            data={data}
            keygen="id"
            multiple
            placeholder="Multiple select"
            onChange={updateValue}
            value={value}
            renderItem="id"
            format="id"
            disabled={({ id }) => id === 'blue'}
        />
    )
}
