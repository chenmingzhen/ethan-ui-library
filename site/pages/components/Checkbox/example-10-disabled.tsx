/**
 * cn -
 *    -- disabled 为函数时，根据函数结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disbale the option that the function to return true.
 */
import React from 'react'
import { Checkbox } from 'ethan-ui'

const baseData = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

const ComplexData = [
    { value: 1, label: 'red' },
    { value: 2, label: 'orange' },
    { value: 3, label: 'yellow' },
    { value: 4, label: 'green' },
    { value: 5, label: 'cyan' },
    { value: 6, label: 'blue' },
    { value: 7, label: 'violet' },
]

export default function() {
    return (
        <div>
            <div>
                <Checkbox.Group
                    data={baseData}
                    disabled={d => d === 'yellow'}
                    keygen
                    value={['blue']}
                    renderItem={d => d}
                />
            </div>

            <div>
                <Checkbox.Group
                    data={ComplexData}
                    disabled={d => d.label === 'yellow'}
                    keygen="value"
                    format="label"
                    value={['blue']}
                    renderItem="label"
                />
            </div>
        </div>
    )
}
