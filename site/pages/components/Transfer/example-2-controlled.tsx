/**
 * cn - 受控
 *    -- 组件受控
 * en - Controlled
 *    -- Component controlled
 */
import React, { useState } from 'react'
import { Transfer } from 'ethan-ui'

const data = []

for (let i = 1; i < 20; i++) {
    data.push({
        id: i,
        content: `content ${i}`,
    })
}

export default function () {
    const [value, updateValue] = useState([1, 3, 5, 7, 9])
    const [selectedKeys, updateSelectedKeys] = useState([1, 2])
    return (
        <Transfer
            data={data}
            value={value}
            selectedKeys={selectedKeys}
            valueKey="id"
            labelKey="content"
            disabled={(d) => d.content.indexOf('1') > -1}
            onChange={(nextValue: number[]) => {
                console.log('nextValue:', nextValue)
                updateValue(nextValue)
            }}
            onSelectChange={(left: number[], right: number[]) => {
                console.log('nextSelectedKeys:', left, right)
                updateSelectedKeys([...left, ...right])
            }}
        />
    )
}
