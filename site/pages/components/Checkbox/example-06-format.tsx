/**
 * cn - 复杂数据
 *    -- 复杂的数据可以使用 format 处理 value
 * en - Complex data
 *    -- Complex data can use format to process value.
 */
import React from 'react'
import { Checkbox } from 'ethan-ui'

interface Data {
    id: number
    color: string
}

type FormatData = string

const data: Data[] = [
    { id: 1, color: 'red' },
    { id: 2, color: 'orange' },
    { id: 3, color: 'yellow' },
    { id: 4, color: 'green' },
    { id: 5, color: 'cyan' },
    { id: 6, color: 'blue' },
    { id: 7, color: 'violet' },
]

function renderItem(item: Data) {
    const style = { borderBottom: `solid 1px ${item.color}`, paddingBottom: 2 }
    return <span style={style}>{item.color}</span>
}

export default function () {
    return (
        <Checkbox.Group<Data, FormatData>
            keygen="id"
            data={data}
            format="color"
            renderItem={renderItem}
            defaultValue={['red']}
        />
    )
}
