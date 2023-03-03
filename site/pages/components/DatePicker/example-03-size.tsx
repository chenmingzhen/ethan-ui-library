/**
 * cn - 大小
 *    -- 提供了三种尺寸的输入框，small、default、large
 * en - Size
 *    -- There are three size of input, small, default, large.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

const style: React.CSSProperties = { marginRight: 12 }

export default function () {
    return (
        <>
            <DatePicker size="small" style={style} placeholder="Select date" />
            <DatePicker size="default" style={style} placeholder="Select date" />
            <DatePicker size="large" style={style} placeholder="Select date" />
        </>
    )
}
