/**
 * cn - 有边框的
 *    -- 设置border显示外边框
 * en - Border
 *    -- Set border to display the outer border
 */

import React, { useState } from 'react'
import { EditableArea } from 'ethan-ui'

export default function () {
    const [value, setValue] = useState('')

    return (
        <EditableArea
            border
            value={value}
            placeholder="Input something"
            onChange={(val) => {
                setValue(val)
            }}
            width={400}
        />
    )
}
