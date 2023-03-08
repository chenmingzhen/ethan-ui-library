/**
 * cn -
 *    -- 设置 compressed 使选中值合并展示，鼠标悬浮时将会展示所有值。
 * en -
 *    -- Set the compressed property to compress values, hover to show all values.
 */
import React from 'react'
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

export default function () {
    return (
        <Select
            compressed
            style={{ width: 300 }}
            data={data}
            multiple
            placeholder="Multiple select Compressed"
            labelKey="color"
            valueKey="color"
        />
    )
}
