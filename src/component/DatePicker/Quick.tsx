import { datePickerClass } from '@/styles'
import React from 'react'
import { DatePickerQuickProps } from './type'

const DatePickerQuick: React.FC<DatePickerQuickProps> = function (props) {
    const { quicks, onChange } = props

    return (
        <div className={datePickerClass('quick-select')}>
            {quicks.map((q) => (
                <div
                    onClick={() => {
                        onChange(q)
                    }}
                    className={datePickerClass('quick-select-item')}
                    key={q.name}
                >
                    {q.name}
                </div>
            ))}
        </div>
    )
}

export default React.memo(DatePickerQuick)
