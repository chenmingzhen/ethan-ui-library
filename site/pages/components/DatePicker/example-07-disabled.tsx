/**
 * cn -
 *    -- 传递一个函数禁用指定时间。
 * en - Disabled
 *    -- Pass a function to disable the specified time.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'
import { endOfDay, endOfMonth, endOfYear, getWeek } from 'date-fns'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block', width: 200 }

export default function () {
    return (
        <>
            <DatePicker
                type="date"
                placeholder="Cannot select today or before today"
                disabled={(current) => current <= endOfDay(new Date())}
                style={style}
            />

            <DatePicker
                type="year"
                placeholder="Cannot select last year of before last year"
                disabled={(current) => current <= endOfYear(new Date())}
                style={style}
            />

            <DatePicker
                type="month"
                placeholder="Cannot select this month or before this month"
                disabled={(current) => current <= endOfMonth(new Date())}
                style={style}
            />

            <DatePicker
                type="week"
                placeholder="Cannot select an odd number of weeks"
                disabled={(current) => getWeek(current, { weekStartsOn: 1 }) % 2 !== 0}
                style={style}
            />
        </>
    )
}
