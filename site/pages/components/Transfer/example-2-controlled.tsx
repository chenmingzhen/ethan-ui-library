/**
 * cn - 受控
 *    -- 组件受控
 * en - Controlled
 *    -- Component controlled
 */
import React, { useState } from 'react'
import { Transfer } from 'ethan-ui'

interface Data {
    id: number
    content: string
}

const data: Data[] = []

for (let i = 1; i < 20; i++) {
    data.push({
        id: i,
        content: `content ${i}`,
    })
}

export default function () {
    const [value, updateValue] = useState([1, 3, 5, 7, 9])

    return (
        <Transfer<Data, number>
            data={data}
            value={value}
            onChange={updateValue}
            format="id"
            renderItem="content"
            keygen="id"
            disabled={(d) => d.content.indexOf('1') > -1}
        />
    )
}
