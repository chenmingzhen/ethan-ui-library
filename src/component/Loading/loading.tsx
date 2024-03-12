import React, { memo } from 'react'
import { loadingClass } from '@/styles'
import { usePrevious } from 'react-use'
import Spin from '../Spin'
import { LoadingProps } from './type'
import Motion from '../Motion'

const Loading: React.FC<LoadingProps> = (props) => {
    const { visible, percent, height, color } = props
    const lastPercent = usePrevious(percent)

    const animation = lastPercent < percent
    const barStyle: React.CSSProperties = {
        width: `${percent}%`,
        background: color,
        boxShadow: `0 0 10px 0 ${color}`,
    }

    return (
        <Motion.Transition
            duration="slow"
            visible={visible}
            style={{ height }}
            transitionTypes={['fade']}
            className={loadingClass('_')}
        >
            <div className={loadingClass('line', animation && 'animation')} style={barStyle} />
            <div className={loadingClass('spin')}>
                <Spin name="ring" color={color} size={24} />
            </div>
        </Motion.Transition>
    )
}

export default memo(Loading)
