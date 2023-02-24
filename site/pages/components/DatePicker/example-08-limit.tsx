/**
 * cn -  最大最小时间
 *    -- 可以通过设置 min/max 去设置一个选择时间的最大最小值.
 * en - Limit
 *    -- Set the maximum and minimum value of a selection time by setting min/max..
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'
import { addDays } from 'date-fns'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block' }
const today = new Date()
const yesterday = addDays(today, -1)
const tomorrow = addDays(today, 1)
const lastWeek = addDays(today, -7)
const nextWeek = addDays(today, 7)

export default function () {
    return (
        <div>
            <DatePicker type="date-time" placeholder="Select Date" style={style} min={today} />
            <DatePicker type="date-time" placeholder="Select Date" style={style} min={yesterday} max={tomorrow} />
            <DatePicker.RangePicker
                type="date-time"
                placeholder="Select Date"
                style={style}
                min={lastWeek}
                max={nextWeek}
            />
        </div>
    )
}
