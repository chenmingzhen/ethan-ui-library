/**
 * cn - 性能
 *    -- Transfer 内部用懒加载机制来优化性能，本例加载了10000条数据
 * en -
 *    -- Transfer uses a lazy loading to optimize performance. This example loads 10,000 pieces of data.
 */
import React from 'react'
import { Transfer } from 'ethan-ui'

const data = []

for (let i = 0; i < 10000; i++) {
    data.push({
        id: i,
        content: `content ${i}`,
    })
}

export default function () {
    return <Transfer data={data} valueKey="id" labelKey="content" titles={['Source', 'Target']} />
}
