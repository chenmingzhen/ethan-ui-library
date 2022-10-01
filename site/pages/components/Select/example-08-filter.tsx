/**
 * cn - 筛选数据
 *    -- onFilter 返回函数时，使用这个函数做过滤
 * en - Filter
 *    -- When the onFilter property returns a function, use this function to do filtering.
 */
import React from 'react'
import { Select } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function() {
    return (
        <div>
            <Select
                style={{ width: 240, marginBottom: 12 }}
                data={data}
                keygen
                placeholder="Select color"
                onFilter={(text, d) => d.indexOf(text) >= 0}
            />

            <br />
        </div>
    )
}
