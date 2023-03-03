import React, { useContext, useState } from 'react'
import RangePickerContext from './context'
import Day from './Day'
import Month from './Month'
import { PickerProps } from './type'
import Year from './Year'

const Picker: React.FC<PickerProps> = (props) => {
    const { type, format, children, panelDate, onChange, ...other } = props
    const { onHoverPanel, index } = useContext(RangePickerContext) || {}
    const [mode, updateMode] = useState(() => {
        if (type === 'year') return 'year'
        if (type === 'month') return 'month'

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
        default:
            Component = Day
    }

    function handleMouseEnter() {
        if (onHoverPanel) {
            onHoverPanel(index)
        }
    }

    function handleMouseLeave() {
        if (onHoverPanel) {
            onHoverPanel(null)
        }
    }

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
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
