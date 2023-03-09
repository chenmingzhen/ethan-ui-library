/**
 * cn -  单向
 *    -- 通过 oneWay 将 Transfer 转为单向样式。
 * en -  OneWay
 *    -- Use oneWay to makes Transfer to one way style.
 */
import React from 'react'
import { Transfer } from 'ethan-ui'

const data = []

for (let i = 1; i < 20; i++) {
    data.push({
        id: i,
        content: `content ${i}`,
    })
}

export default function () {
    return (
        <Transfer
            data={data}
            labelKey="content"
            valueKey="id"
            titles={['Source', 'Target']}
            oneWay
            disabled={({ id }) => id % 2 === 0}
            defaultValue={[1, 2]}
        />
    )
}
