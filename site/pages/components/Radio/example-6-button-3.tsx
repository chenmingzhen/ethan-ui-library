/**
 * cn -
 *    -- 设置 size 可以控制按钮样式的大小
 * en -
 *    -- size to set button style size
 */
import React from 'react'
import { Radio } from 'ethan-ui'

const data = ['red', 'orange', 'yellow']

export default function () {
    return (
        <div>
            <Radio.Group size="small" button data={data} defaultValue="red" />
            <Radio.Group button data={data} defaultValue="red" />
            <Radio.Group size="large" button data={data} defaultValue="red" />
        </div>
    )
}
