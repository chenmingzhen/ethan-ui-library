/**
 * cn - 允许删除
 *    -- DatePicker 允许删除
 * en -  Allow clear
 *    -- DatePicker allow clear
 */

import React, { useState } from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    const [datePickerValue, updateDatePickerValue] = useState(new Date('2012-12-31'))
    const [rangePickerValue, updateRangePickerValue] = useState([new Date('2012-12-31'), new Date()])

    return (
        <div>
            <DatePicker
                clearable
                style={{ display: 'block', marginBottom: 10 }}
                placeholder="Select date"
                value={datePickerValue}
                onChange={(value, dateStr) => {
                    console.log('value:', datePickerValue)
                    console.log('dateStr:', dateStr)
                    updateDatePickerValue(value)
                }}
            />

            <DatePicker.RangePicker
                clearable
                style={{ display: 'block', marginBottom: 10 }}
                placeholder="Select date"
                value={rangePickerValue}
                onChange={(value, dateStr) => {
                    console.log('value:', value)
                    console.log('dateStr:', dateStr)
                    updateRangePickerValue(value)
                }}
            />
        </div>
    )
}
