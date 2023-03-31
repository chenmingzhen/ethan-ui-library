/**
 * cn - 大小
 *    -- 基础的级联用法
 * en - Size
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
        <div>
            <Cascader data={data} style={{ width: 300, display: 'block', marginBottom: 10 }} size="small" />
            <Cascader data={data} style={{ width: 300, display: 'block', marginBottom: 10 }} size="default" />
            <Cascader data={data} style={{ width: 300, display: 'block', marginBottom: 10 }} size="large" />
        </div>
    )
}
