/**
 * cn - 动态加载
 *    -- 数据过大，需要动态加载时，可以设置 loader 函数，当展开未定义 children（undefined）的节点时，触发此函数
 * en - Lazy load
 *    -- Set the loader function to dynamic fetch data. This function is triggered when the undefined child node is expanded.
 */
import React, { useState } from 'react'
import { Cascader } from 'ethan-ui'

const initData = ['0', '1', '2', '3', '4', '5', '6', '7', '8'].map((i) => ({ label: `${i}`, value: i }))
const createRange = () => Array.from({ length: Math.round(Math.random() * 4) }, (_, i) => i)

export default function () {
    const [data, setData] = useState(initData)

    const onChange = (value) => {
        console.log('onChange:', value)
    }

    const loadData = (dataItem, node) => {
        console.log('loadData:', dataItem, node)

        /** Modify the source data directly */
        if (node.indexPath.length >= 3) {
            dataItem.children = null

            setData([...data])

            return
        }

        setTimeout(() => {
            dataItem.children = [
                ...createRange().map((i) => {
                    const v = `${dataItem.label}-${i}`

                    return { value: v, label: v }
                }),
            ]

            setData([...data])
        }, 1000)
    }

    return <Cascader data={data} loader={loadData} onChange={onChange} style={{ width: 300 }} />
}
