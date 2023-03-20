/**
 * cn - 过滤
 *    -- 基础的级联用法
 * en - Filter
 *   -- Basic usage of Cascader
 */

import React from 'react'
import { Cascader } from 'ethan-ui'

const data = [
    {
        value: 'zhejiang',
        label: 'Zhejiang',
        children: [
            {
                value: 'hangzhou',
                label: 'Hangzhou',
                children: [
                    {
                        value: 'xihu',
                        label: 'West Lake',
                    },
                ],
            },
        ],
    },
    {
        value: 'jiangsu',
        label: 'Jiangsu',
        children: [
            {
                value: 'nanjing',
                label: 'Nanjing',
                children: [
                    {
                        value: 'zhonghuamen',
                        label: 'Zhong Hua Men',
                    },
                ],
            },
        ],
    },
]

export default function () {
    return (
        <Cascader
            data={data}
            style={{ width: 300 }}
            onChange={console.log}
            onFocus={() => {
                console.log('focus')
            }}
            onBlur={() => {
                console.log('blur')
            }}
            onFilter
            disabled={({ value }) => value === 'hangzhou'}
        />
    )
}
