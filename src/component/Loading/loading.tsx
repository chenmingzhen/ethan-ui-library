import React, { memo, useImperativeHandle, forwardRef, useCallback, useEffect, useRef } from 'react'
import { loadingClass } from '@/styles'
import useSafeState from '@/hooks/useSafeState'
import { usePrevious } from 'react-use'
import Spin from '../Spin'
import { FullScreenProps, ImmatureFullScreenProps, LineLoadingProps, LoadingInstance } from './type'
import Transition from '../Transition'
import event from './event'

type LoadingProps = LineLoadingProps & ImmatureFullScreenProps

const FULLSCREEN_STATE_LIST = ['type', 'text', 'size', 'color']

const Loading: React.ForwardRefRenderFunction<LoadingInstance, LoadingProps> = (props, ref) => {
    const [visible, updateVisible] = useSafeState(true)
    /** Top */
    const [percent, updatePercent] = useSafeState(props.percent || 0)
    const height = props.height ?? 4
    const [color, updateColor] = useSafeState(props.color || '#3399ff')

    /** FullScreen */
    const [type, updateType] = useSafeState(props.type || 'line')
    const [text, updateText] = useSafeState(props.loadingText)
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
                    updateText(newState)

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
            }, 300)
        }
    }, [visible])

    useImperativeHandle(ref, () => ({ updateFullScreenConfig, updateVisible, updatePercent }))

    const animation = lastPercent < percent || !lastPercent

    const barStyle: React.CSSProperties | undefined =
        type === 'line' ? { width: `${percent}%`, background: color } : undefined

    const wrapStyle: React.CSSProperties | undefined = type === 'line' ? { height: `${height}px` } : undefined

    return (
        <Transition show={visible}>
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
                        {text && <div className={loadingClass('text')}>{text}</div>}
                    </div>
                )}
            </div>
        </Transition>
    )
}

export default memo(forwardRef(Loading))
