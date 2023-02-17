/**
 * cn - 无边框
 *    -- 设置border隐藏外边框
 * en - Border
 *    -- Set border to hide the outer border.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return <DatePicker border={false} placeholder="Select date" />
}
