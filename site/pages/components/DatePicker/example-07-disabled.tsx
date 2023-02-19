/**
 * cn -
 *    -- 传递一个函数禁用指定时间。
 * en - Disabled
 *    -- Pass a function to disable the specified time.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return (
        <>
            <DatePicker
                type="month"
                placeholder="Select date"
                disabled={(date) => date.getTime() <= new Date().getTime()}
            />
        </>
    )
}
