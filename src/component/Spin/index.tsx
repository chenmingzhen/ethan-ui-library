import React, { memo } from 'react'
import { spinClass } from '@/styles'
import {
    ChasingDots,
    DoubleBounce,
    ThreeBounce,
    ScaleCircle,
    FadingCircle,
    CubeGrid,
    ChasingRing,
    Wave,
    FourDots,
    Default,
} from './Multiple'
import { Ring, Plane, Pulse } from './Simple'

export interface SpinProps {
    color?: string

    children?: React.ReactNode

    size?: string | number

    loading?: boolean

    name?:
        | 'default'
        | 'chasing-ring'
        | 'chasing-dots'
        | 'cube-grid'
        | 'double-bounce'
        | 'fading-circle'
        | 'four-dots'
        | 'plane'
        | 'pulse'
        | 'ring'
        | 'scale-circle'
        | 'three-bounce'
        | 'wave'

    className?: string
}

const spins = {
    plane: Plane,
    pulse: Pulse,
    ring: Ring,
    wave: Wave,
    default: Default,
    'chasing-ring': ChasingRing,
    'chasing-dots': ChasingDots,
    'cube-grid': CubeGrid,
    'double-bounce': DoubleBounce,
    'fading-circle': FadingCircle,
    'four-dots': FourDots,
    'scale-circle': ScaleCircle,
    'three-bounce': ThreeBounce,
}

const Spin: React.FC<SpinProps> = (props) => {
    const { children, loading } = props

    const name = props.name ?? 'default'

    const Component = spins[name]

    if (!Component) {
        console.warn(`Spin type '${name}' not existed.`)

        return null
    }

    if (children)
        return (
            <div className={spinClass('container', loading && 'show')}>
                <div className={spinClass('content')}>{children}</div>

                {loading && (
                    <div className={spinClass('loading')}>
                        <Component {...props} />
                    </div>
                )}
            </div>
        )

    return <Component {...props} />
}

Spin.displayName = 'EthanSpin'

Spin.defaultProps = {
    color: '#6c757d',
    size: 40,
}

export default memo(Spin)
