/**
 * cn - 移入展开
 *    -- 设置 expandTrigger 为 'hover', 可以在鼠标移入节点时展开，默认为 'click'
 * en - Hover
 *    -- Set expandTrigger to 'hover', expand the node when mouse hover, default value is 'click'.
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
    return <Cascader data={data} expandTrigger="hover" style={{ width: 300 }} />
}
