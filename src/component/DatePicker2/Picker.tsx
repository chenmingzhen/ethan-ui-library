import useRefMethod from '@/hooks/useRefMethod'
import React, { useState } from 'react'
import Day from './Day'
import Month from './Month'
import Time from './Time'
import { PickerProps } from './type'
import Year from './Year'

const Picker: React.FC<PickerProps> = (props) => {
    const { type, format, children, panelDate, handleHover, ...other } = props
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

    const handleModeChange = useRefMethod((newMode: string) => {
        setTimeout(() => {
            updateMode(newMode)
        })
    })

    return <Component {...other} format={format} type={type} panelDate={panelDate} onModeChange={handleModeChange} />
}

export default React.memo(Picker)
