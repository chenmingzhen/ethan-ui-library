/**
 * cn - 禁用
 *    -- 设置 disabled 禁用组件
 * en - Disabled
 *    -- Set the disabled property to disable the component.
 */
import React from 'react'
import { Select } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <div>
            <Select style={{ width: 240, marginBottom: 12 }} disabled data={data} placeholder="Select color" />
            <br />
            <Select
                style={{ width: 300 }}
                data={data}
                disabled={(d) => d === 'green'}
                multiple
                defaultValue={['orange', 'green']}
                placeholder="Multiple select"
            />
        </div>
    )
}
