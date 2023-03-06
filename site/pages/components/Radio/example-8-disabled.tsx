/**
 * cn -
 *    -- disabled 为函数时，根据函数返回结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disabled the option that the function to return true.
 */
import React from 'react'
import { Radio } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

export default function () {
    return (
        <div>
            <Radio.Group data={data} disabled={(d) => d === 'yellow'} defaultValue="blue" />
        </div>
    )
}
