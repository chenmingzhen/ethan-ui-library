/**
 * cn - 显示结果的模式
 *    -- 设置 mode 属性，使组件变为多选，mode 可选值如下
 * en - ShowResultMode
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
            {
                label: 'Little2',
                value: 'little2',
                children: [
                    {
                        label: 'Toy Fish2',
                        value: 'fish2',
                    },
                    {
                        label: 'Toy Cards2',
                        value: 'cards2',
                    },
                    {
                        label: 'Toy Bird2',
                        value: 'bird2',
                    },
                ],
            },
        ],
    },
]

export default function () {
    return (
        <div>
            <Cascader
                data={data}
                style={{ width: 300, marginBottom: 20, display: 'block' }}
                multiple
                showResultMode="parent"
            />
            <Cascader data={data} style={{ width: 300, marginBottom: 20, display: 'block' }} multiple />
            <Cascader
                data={data}
                style={{ width: 300, marginBottom: 20, display: 'block' }}
                multiple
                showResultMode="child"
            />
        </div>
    )
}
