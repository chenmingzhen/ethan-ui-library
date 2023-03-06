/**
 * cn - 复杂数据
 *    -- value为对象
 * en - Complex data
 *    -- Value is object.
 */
import React from 'react'
import { Checkbox } from 'ethan-ui'

interface Data {
    id: number
    color: string
}

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
    return <Checkbox.Group data={data} defaultValue={[1]} valueKey="id" renderItem={renderItem} />
}
