/**
 * cn - 受控选中
 *    -- 可以通过 selectedKeys 和 onSelectChange 去控制哪些列表项被选中
 * en - Controlled selected
 *    -- Can control which elements are selected by selectedKeys and onSelectChange
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
    const [selectedKeys, updateSelectedKeys] = useState([1, 2, 3, 4])

    return (
        <Transfer
            data={data}
            selectedKeys={selectedKeys}
            onSelectChange={(sourceKeys: number[], targetKeys: number[]) => {
                updateSelectedKeys([...sourceKeys, ...targetKeys])
            }}
            value={value}
            onChange={(nextValue: number[]) => {
                console.log('nextValue:', nextValue)
                updateValue(nextValue)
            }}
            valueKey="id"
            labelKey="content"
        />
    )
}
