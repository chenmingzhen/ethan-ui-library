/**
 * cn - 过滤
 *    -- 可以直接搜索选项并选择。
 * en - Filter
 *   -- Search and select options directly.
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
        <div>
            <Cascader
                data={data}
                placeholder="single"
                style={{ width: 300 }}
                onChange={console.log}
                onFilter
                disabled={({ value }) => value === 'hangzhou'}
            />
            <br />
            <Cascader
                data={data}
                multiple
                placeholder="multiple"
                style={{ width: 300, marginTop: 20 }}
                onChange={console.log}
                onFilter
            />
        </div>
    )
}
