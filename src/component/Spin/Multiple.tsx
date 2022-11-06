import React from 'react'
import {
    defaultClass,
    chasingDotsClass,
    doubleBounceClass,
    waveClass,
    cubeGridClass,
    chasingRingClass,
    scaleCircleClass,
    threeBounceClass,
    fourDotsClass,
} from '@/styles/spin'
import Spin from './Spin'
import { formatSize } from './util'
import { SpinProps } from '.'

function simpleRender(classname, i, { color, itemStyle }) {
    const style = Object.assign({ backgroundColor: color }, itemStyle)

    return <div key={i} style={style} className={classname('item')} />
}

export function DoubleBounce(props: SpinProps) {
    return <Spin {...props} count={2} spinClass={doubleBounceClass} render={simpleRender} />
}

export function Wave(prop) {
    const { value, unit } = formatSize(prop.size)

    let width = value / 7

    let margin: string | number = value / 20

    if (unit === 'px') {
        width = Math.floor(width)

        margin = Math.ceil(margin) + unit
    } else {
        margin = '2px'
    }

    return (
        <Spin
            {...prop}
            itemStyle={{ width: width + unit, marginRight: margin }}
            count={5}
            spinClass={waveClass}
            render={simpleRender}
        />
    )
}

export function CubeGrid(props) {
    return <Spin {...props} count={9} spinClass={cubeGridClass} render={simpleRender} />
}

export function ChasingRing(prop) {
    const { value, unit } = formatSize(prop.size)

    const borderWidth = `${value / 10}${unit}`

    const style = {
        borderWidth,
        borderTopColor: prop.color,
        backgroundColor: 'transparent',
    }

    return <Spin {...prop} count={4} itemStyle={style} spinClass={chasingRingClass} render={simpleRender} />
}

function multipleRenderDiv(className, i, { color, itemStyle, itemClass }) {
    const style = Object.assign({ backgroundColor: color }, itemStyle)

    return (
        <div key={i} className={className('item', itemClass)}>
            <div style={style} />
        </div>
    )
}

export function Default(props: SpinProps) {
    const { value, unit } = formatSize(props.size)

    const size = Math.ceil(value / 12.5) + unit

    return (
        <Spin
            {...props}
            count={12}
            itemStyle={{ width: size, borderRadius: size }}
            spinClass={defaultClass}
            render={multipleRenderDiv}
        />
    )
}

function multipleRenderSvg(className, i, { color, itemSize, itemClass }) {
    return (
        <div key={i} className={className('item', itemClass)}>
            <svg width={itemSize} height={itemSize} viewBox="0 0 100 100">
                <circle fill={color} cx={50} cy={50} r={50} />
            </svg>
        </div>
    )
}

function twelveCircle(props: SpinProps, type) {
    const { value, unit } = formatSize(props.size)

    const itemSize = (value / 7).toFixed(3) + unit

    return (
        <Spin
            {...props}
            count={12}
            itemSize={itemSize}
            itemClass={type}
            spinClass={scaleCircleClass}
            render={multipleRenderSvg}
        />
    )
}

export const ScaleCircle = (opt) => twelveCircle(opt, 'scale')

export const FadingCircle = (opt) => twelveCircle(opt, 'fade')

export function ThreeBounce(props: SpinProps) {
    const { value, unit } = formatSize(props.size)

    return (
        <Spin
            {...props}
            count={3}
            style={{ width: value * 2 + unit, height: 'auto' }}
            itemSize={value / 2 + unit}
            spinClass={threeBounceClass}
            render={multipleRenderSvg}
        />
    )
}

export function ChasingDots(props: SpinProps) {
    return <Spin {...props} count={2} spinClass={chasingDotsClass} render={multipleRenderSvg} />
}

export function FourDots(props: SpinProps) {
    return <Spin {...props} count={4} spinClass={fourDotsClass} render={multipleRenderSvg} />
}
