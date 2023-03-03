/**
 * cn - 范围选择
 *    -- 基本的使用
 * en - Range
 *    -- Basic usage
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return <DatePicker.RangePicker placeholder={['Select date', 'Select date']} onChange={console.log} />
}
