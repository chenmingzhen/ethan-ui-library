import React, { memo, useImperativeHandle, forwardRef } from 'react'
import { loadingClass } from '@/styles'
import { usePrevious } from 'react-use'
import useSetState from '@/hooks/useSetState'
import Spin from '../Spin'
import { LoadingProps, LoadingState, LoadingInstance } from './type'

const Loading: React.ForwardRefRenderFunction<LoadingInstance, LoadingProps> = (props, ref) => {
    const [state, updateState] = useSetState<LoadingState>({
        visible: true,
        percent: props.percent || 0,
        height: props.height || 4,
        color: props.color || '#3399ff',
    })
    const lastPercent = usePrevious(state.percent)

    useImperativeHandle(ref, () => ({ updateState }))

    const animation = lastPercent < state.percent
    const barStyle: React.CSSProperties = {
        width: `${state.percent}%`,
        background: state.color,
        boxShadow: `0 0 10px 0 ${state.color}`,
    }

    return (
        <div className={loadingClass('_', !state.visible && 'fade')} style={{ height: state.height }}>
            <div className={loadingClass('line', animation && 'animation')} style={barStyle} />
            <div className={loadingClass('spin')}>
                <Spin name="ring" color={state.color} size={24} />
            </div>
        </div>
    )
}

export default memo(forwardRef(Loading))
