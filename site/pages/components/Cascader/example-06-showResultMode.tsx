/**
 * cn - 显示结果的方式
 *    -- 通过设置 showResultMode 选择结果的显示方式。
 * en - ShowResultMode
 *    -- The showResultMode command is used to select a result display mode.
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
    {
        label: 'Dark',
        value: 'dark',
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
