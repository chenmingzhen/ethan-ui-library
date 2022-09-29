import React, { useCallback, useState } from 'react'
import Day from './Day'
import Month from './Month'
import Time from './Time'
import { PickerProps } from './type'
import utils from './utils'
import Year from './Year'

function getInitMode(type: PickerProps['type']) {
    let mode: string

    switch (type) {
        case 'month':
            mode = 'month'
            break
        case 'time':
            mode = 'time'
            break
        default:
            mode = 'day'
    }

    return mode
}

function getDefaultCurrent(rawDate: string | number | Date, format: string) {
    const date = utils.toDateWithFormat(rawDate, format)

    return date ? new Date(date) : new Date()
}

const Picker: React.FC<PickerProps> = props => {
    const { type, format, index, children, current, handleHover, ...other } = props

    const [mode, updateMode] = useState(getInitMode(type))

    const [defaultCurrent] = useState(getDefaultCurrent(props.defaultTime[0], format))

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

    const handleModeChange = useCallback((newMode: string) => {
        setTimeout(() => {
            updateMode(newMode)
        })
    }, [])

    const handleMouseEnter: React.MouseEventHandler<HTMLDivElement> = useCallback(
        evt => {
            evt.stopPropagation()

            handleHover(index, true)
        },
        [handleHover, index]
    )

    const handleMouseLeave: React.MouseEventHandler<HTMLDivElement> = useCallback(
        evt => {
            evt.stopPropagation()

            handleHover(index, false)
        },
        [handleHover, index]
    )

    if (index === undefined)
        return (
            <Component
                {...other}
                format={format}
                type={type}
                current={current || defaultCurrent}
                onModeChange={handleModeChange}
            />
        )

    return (
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
            <Component
                {...other}
                format={format}
                index={index}
                current={current || defaultCurrent}
                onModeChange={handleModeChange}
            />
        </div>
    )
}

export default React.memo(Picker)
