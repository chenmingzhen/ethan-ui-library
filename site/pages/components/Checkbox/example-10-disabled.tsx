/**
 * cn -
 *    -- disabled 为函数时，根据函数结果实现有条件禁用
 * en -
 *    -- When the disabled is a function, disabled the option that the function to return true.
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

export default function () {
    return (
        <div>
            <div>
                <Checkbox.Group data={baseData} disabled={(d) => d === 'yellow'} defaultValue={['blue']} />
            </div>

            <div>
                <Checkbox.Group data={ComplexData} disabled={(d) => d.label === 'yellow'} defaultValue={['blue']} />
            </div>

            <div>
                <Checkbox.Group
                    data={ComplexData}
                    disabled={(d, values) => {
                        console.log(d, values)
                        return !values.includes(d.value) && values.length >= 2
                    }}
                    defaultValue={[6]}
                />
            </div>
        </div>
    )
}
