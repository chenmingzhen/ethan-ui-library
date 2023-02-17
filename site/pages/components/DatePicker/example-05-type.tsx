/**
 * cn - 类型
 *    -- 选择时间的类型
 * en - Type
 *    -- Select the type of time
 */
import React from 'react'
import { DatePicker } from 'ethan-ui'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block' }

export default function () {
    return (
        <>
            <DatePicker type="date" placeholder="Select date" style={style} />
            <DatePicker type="date-time" placeholder="Select date-time" style={style} />
            <DatePicker type="month" placeholder="Select month" style={style} />
            <DatePicker type="time" placeholder="Select time" style={style} />
            <DatePicker type="week" placeholder="Select week" style={style} />
            <DatePicker type="year" placeholder="Select year" style={style} />
        </>
    )
}
