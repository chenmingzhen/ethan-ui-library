/**
 * cn - 禁用
 *    -- 选择框的不可用状态。
 * en - Disabled
 *    -- Disabled DatePicker.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return (
        <>
            <DatePicker type="date" placeholder="Select date" disabled />
        </>
    )
}
