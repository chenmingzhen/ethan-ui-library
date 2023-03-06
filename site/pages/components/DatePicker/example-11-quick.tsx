/**
 * cn - 快速选择
 *    -- 可以配置一些快速选择的选项
 * en - Quick select
 *    -- Configure some options for quick selection.
 */

import React from 'react'
import { DatePicker } from 'ethan-ui'
import { addDays } from 'date-fns'

const today = new Date()

export default function () {
    return (
        <div>
            <DatePicker
                placeholder="Select date"
                quickSelects={[
                    { name: 'Today', value: today },
                    {
                        name: 'A week later',
                        value: addDays(today, -7),
                    },
                    {
                        name: 'A month later',
                        value: addDays(today, -30),
                    },
                ]}
            />
            <br />
            <DatePicker.RangePicker
                placeholder={['Select date', 'Select date']}
                style={{ marginTop: 10 }}
                format="MM/dd/yyyy"
                quickSelects={[
                    {
                        name: 'Next Week',
                        value: [today, addDays(today, 7)],
                    },
                    {
                        name: 'Last Week',
                        value: [addDays(today, -7), today],
                    },
                    {
                        name: 'Next Month',
                        value: [today, addDays(today, 30)],
                    },
                    {
                        name: 'Last Month',
                        value: [addDays(today, -30), today],
                    },
                ]}
            />
        </div>
    )
}
