/**
 * cn - 多选
 *    -- 一次性选择多个选项。
 * en - Multiple
 *   -- Select multiple options
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
    return <Cascader data={data} style={{ width: 300 }} multiple />
}
