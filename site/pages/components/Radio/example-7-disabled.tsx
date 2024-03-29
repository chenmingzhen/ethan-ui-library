/**
 * cn - 禁用
 *    -- 设置 disabled 为 true 时，禁用所有选项
 * en - Disabled
 *    -- Set disabled property is set to true, all the options is disabled.
 */
import React from 'react'
import { Radio } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <div>
            <Radio.Group disabled data={data} defaultValue="blue" />
        </div>
    )
}
