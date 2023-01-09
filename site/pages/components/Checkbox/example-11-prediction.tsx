/**
 * cn - 比对
 *    -- 复杂的数据和复杂的值可以使用prediction判断是否应该被选中
 * en - Prediction
 *    -- Complex data and complex value can use prediction to determine whether item should be checked
 */
import React from 'react'
import { Checkbox } from 'ethan-ui'

const data = [
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
                <Checkbox.Group
                    data={data}
                    keygen="value"
                    renderItem="label"
                    defaultValue={[{ value: 3, label: 'yellow' }]}
                    prediction={(item, predictiveData) => item.value === predictiveData.value}
                />
            </div>
        </div>
    )
}
