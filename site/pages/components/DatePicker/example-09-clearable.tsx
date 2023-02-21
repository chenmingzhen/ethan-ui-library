/**
 * cn - 允许删除
 *    -- DatePicker 允许删除
 * en -  Allow clear
 *    -- DatePicker allow clear
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'

export default function () {
    const [date, updateDate] = React.useState(new Date('2012-12-31'))
    return (
        <DatePicker
            placeholder="Select date"
            clearable
            value={date}
            onChange={(value, dateStr) => {
                console.log('value:', date)
                console.log('dateStr:', dateStr)
                updateDate(value)
            }}
        />
    )
}
