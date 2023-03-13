/**
 * cn - 多选
 *    -- 设置 mode 属性，使组件变为多选，mode 可选值如下
 *    -- 0: 只返回完全选中的节点，包含父节点
 *    -- 1: 返回全部选中的节点和半选中的父节点
 *    -- 2: 只返回选中的子节点
 *    -- 3: 如果父节点选中，只返回父节点
 * en - Multiple
 *   -- Set the mode property change the component to multiple select
 *    -- 0: Return only the fully selected node, including the parent node.
 *    -- 1: Return the fully selected nodes and semi-selected parent nodes.
 *    -- 2: Return only the selected child node.
 *    -- 3: Return only the parent node, if the parent node is selected.
 */

import React from 'react'
import { Cascader } from 'ethan-ui'

const data = [
    {
        label: 'Light',
        value: 'light',
        children: new Array(20).fill(null).map((_, index) => ({ label: `Number ${index}`, value: index })),
    },
    {
        label: 'Bamboo',
        value: 'bamboo',
        children: [
            {
                label: 'Little',
                value: 'little',
                children: [
                    {
                        label: 'Toy Fish',
                        value: 'fish',
                    },
                    {
                        label: 'Toy Cards',
                        value: 'cards',
                    },
                    {
                        label: 'Toy Bird',
                        value: 'bird',
                    },
                ],
            },
        ],
    },
]

export default function () {
    return <Cascader data={data} style={{ width: 300 }} multiple showResultMode="child" />
}
