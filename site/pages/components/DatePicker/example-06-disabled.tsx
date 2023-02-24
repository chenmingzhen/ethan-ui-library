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
        <div>
            <DatePicker type="date" placeholder="Select date" disabled style={{ marginBottom: 10, display: 'block' }} />

            <DatePicker.RangePicker type="date" placeholder="Select date" disabled style={{ display: 'block' }} />
        </div>
    )
}
