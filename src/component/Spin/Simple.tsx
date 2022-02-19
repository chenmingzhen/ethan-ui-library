import React from 'react'
import { ringClass, planeClass, pulseClass } from '@/styles/spin'
import Spin from './Spin'
import { formatSize } from './util'
import { SpinProps } from '.'

export function Ring(props: SpinProps) {
    const { value, unit } = formatSize(props.size)

    const style = {
        borderWidth: value / 10 + unit,
        borderTopColor: props.color,
    }

    return <Spin {...props} style={style} spinClass={ringClass} />
}

export function Plane(props: SpinProps) {
    const style = {
        backgroundColor: props.color,
    }

    return <Spin {...props} style={style} spinClass={planeClass} />
}

export function Pulse(props: SpinProps) {
    const style = {
        backgroundColor: props.color,
    }

    return <Spin {...props} style={style} spinClass={pulseClass} />
}
