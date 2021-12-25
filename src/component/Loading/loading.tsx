import React, { memo, useImperativeHandle, forwardRef, useCallback, useEffect } from 'react'
import { loadingClass } from '@/styles'
import useSafeState from '@/hooks/useSafeState'
import { usePrevious } from 'react-use'
import Spin from '../Spin'
import { FullScreenProps, ImmatureFullScreenProps, LineLoadingProps, LoadingInstance } from './type'
import event from './event'

type LoadingProps = LineLoadingProps & ImmatureFullScreenProps

const FULLSCREEN_STATE_LIST = ['type', 'fallback', 'size', 'color']

const LINE_STATE_LIST = ['height', 'color']

const Loading: React.ForwardRefRenderFunction<LoadingInstance, LoadingProps> = (props, ref) => {
    const [visible, updateVisible] = useSafeState(true)
    /** Top */
    const [percent, updatePercent] = useSafeState(props.percent || 0)
    const [height, updateHeight] = useSafeState(props.height || 4)
    const [color, updateColor] = useSafeState(props.color || '#3399ff')

    /** FullScreen */
    const [type, updateType] = useSafeState(props.type || 'line')
    const [fallback, updateFallback] = useSafeState(props.fallback)
    const [size, updateSize] = useSafeState(props.size)

    const lastPercent = usePrevious(percent)

    const updateFullScreenConfig = useCallback((config: FullScreenProps) => {
        Object.keys(config).forEach(stateName => {
            const newState = config[stateName]

            switch (stateName) {
                case FULLSCREEN_STATE_LIST[0]: {
                    updateType(newState)

                    break
                }
                case FULLSCREEN_STATE_LIST[1]: {
                    updateFallback(newState)

                    break
                }
                case FULLSCREEN_STATE_LIST[2]: {
                    updateSize(newState)

                    break
                }
                case FULLSCREEN_STATE_LIST[3]: {
                    updateColor(newState)

                    break
                }

                default:
                    break
            }
        })
    }, [])

    const updateLineConfig = useCallback((config: LineLoadingProps) => {
        Object.keys(config).forEach(stateName => {
            const newState = config[stateName]

            switch (stateName) {
                case LINE_STATE_LIST[0]: {
                    updateHeight(newState)

                    break
                }
                case LINE_STATE_LIST[1]: {
                    updateColor(newState)

                    break
                }

                default:
                    break
            }
        })
    }, [])

    useEffect(() => {
        if (percent !== 100) {
            updateVisible(true)
        } else {
            setTimeout(() => {
                updateVisible(false)
            }, 200)
        }
    }, [percent])

    useEffect(() => {
        if (!visible) {
            setTimeout(() => {
                event.destroy()
            }, 500)
        }
    }, [visible])

    useImperativeHandle(ref, () => ({ updateFullScreenConfig, updateLineConfig, updateVisible, updatePercent }))

    const animation = lastPercent < percent || !lastPercent

    const barStyle: React.CSSProperties | undefined =
        type === 'line' ? { width: `${percent}%`, background: color, boxShadow: `0 0 10px 0 ${color}` } : undefined

    const wrapStyle: React.CSSProperties | undefined = type === 'line' ? { height: `${height}px` } : undefined

    return (
        <div className={loadingClass(!visible && 'fade')}>
            <div className={loadingClass('_')} style={wrapStyle}>
                {type === 'line' ? (
                    <>
                        <div className={loadingClass('line', animation && 'animation')} style={barStyle} />
                        <div className={loadingClass('spin')}>
                            <Spin name="ring" color={color} size={24} />
                        </div>
                    </>
                ) : (
                    <div className={loadingClass('inner')}>
                        <div>
                            <Spin size={size || 54} name={type || 'wave'} color={color} />
                        </div>
                        {fallback && <div className={loadingClass('text')}>{fallback}</div>}
                    </div>
                )}
            </div>
        </div>
    )
}

export default memo(forwardRef(Loading))
