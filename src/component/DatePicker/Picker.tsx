import useRefMethod from '@/hooks/useRefMethod'
import { datePickerClass } from '@/styles'
import React, { useState } from 'react'
import Day from './Day'
import Month from './Month'
import Quick from './Quick'
import Time from './Time'
import { PickerProps, QuickSelect } from './type'
import Year from './Year'

const Picker: React.FC<PickerProps> = (props) => {
    const { type, format, children, panelDate, handleHover, onChange, quicks, ...other } = props
    const [mode, updateMode] = useState(() => {
        if (type === 'year') return 'year'
        if (type === 'month') return 'month'
        if (type === 'time') return 'time'

        return 'day'
    })

    let Component = null

    switch (mode) {
        case 'year':
            Component = Year
            break
        case 'month':
            Component = Month
            break
        case 'time':
            Component = Time
            break
        default:
            Component = Day
    }

    const handleQuickChange = useRefMethod((quick: QuickSelect) => {
        onChange(quick.value, true, false)
    })

    return (
        <div className={datePickerClass('split')}>
            {quicks.length ? <Quick quicks={quicks} onChange={handleQuickChange} /> : null}

            <Component
                {...other}
                onChange={onChange}
                format={format}
                type={type}
                panelDate={panelDate}
                onModeChange={updateMode}
            />
        </div>
    )
}

export default React.memo(Picker)
