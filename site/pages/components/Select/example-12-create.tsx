/**
 * cn -
 *    -- 示例：创建选项和 filter 配合使用
 * en -
 *    -- Example: Create options with filter
 */
import React from 'react'
import { Select } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <div>
            <Select
                style={{ width: 240, marginBottom: 12 }}
                data={data}
                placeholder="input label"
                onCreate
                onFilter={(text, d) => d.indexOf(text) >= 0}
            />
            <br />
            <Select
                style={{ width: 360, marginBottom: 12 }}
                data={data}
                placeholder="input label"
                onCreate
                multiple
                onFilter={(text, d) => d.indexOf(text) >= 0}
            />
        </div>
    )
}
