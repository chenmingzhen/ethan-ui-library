/**
 * cn - 格式化
 *    -- 使用 format 属性，可以自定义日期显示格式
 * en - Format
 *    -- Using the format prop, you can customize the date display format
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    return <DatePicker defaultValue={new Date('2012-12-31')} format="MM/dd/yyyy" />
}
