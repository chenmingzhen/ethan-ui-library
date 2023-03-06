/**
 * cn -
 *    -- 可以直接通过数据来渲染一组 Checkbox
 * en -
 *    -- Render a group of checkboxes from data.
 */
import React, { useState } from 'react'
import { Checkbox } from 'ethan-ui'

const data = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'violet']

function renderItem(color: string) {
    const style = { borderBottom: `solid 1px ${color}`, paddingBottom: 2 }
    return <span style={style}>{color}</span>
}

export default function () {
    const [value, updateValue] = useState(['blue', 'cyan'])
    return (
        <Checkbox.Group
            data={data}
            value={value}
            renderItem={renderItem}
            onChange={(nextValue: string[]) => {
                console.log('onChange:', nextValue)
                updateValue(nextValue)
            }}
        />
    )
}
