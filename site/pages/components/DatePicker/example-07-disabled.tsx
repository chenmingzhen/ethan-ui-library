/**
 * cn -
 *    -- 传递一个函数禁用指定时间。
 * en - Disabled
 *    -- Pass a function to disable the specified time.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

const style: React.CSSProperties = { marginRight: 12, marginBottom: 10, display: 'block' }

export default function () {
    return (
        <>
            <DatePicker
                type="date"
                placeholder="Select date"
                disabled={(date) => date.getTime() <= new Date().getTime()}
                style={style}
            />
            <DatePicker
                type="month"
                placeholder="Select month"
                disabled={(date) => date.getTime() <= new Date().getTime()}
                style={style}
            />
            <DatePicker
                type="year"
                placeholder="Select year"
                disabled={(date) => date.getTime() <= new Date().getTime()}
                style={style}
            />
            <DatePicker
                type="time"
                placeholder="Select time"
                disabled={(date) => date.getTime() >= new Date().getTime()}
                style={style}
            />
        </>
    )
}
