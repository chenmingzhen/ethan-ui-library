import React, { useMemo, memo, useState, useImperativeHandle, forwardRef, useCallback } from 'react'
import { loadingClass } from '@/styles'
import { isObject } from '@/utils/is'
import Transition from '../Transition'
import Spin from '../Spin'

const Loading = (props, ref) => {
  const [visible, setVisible] = useState(true)
  const [percent, setPercent] = useState(props.percent ? props.percent : 0)
  const [height, setHeight] = useState(props.height ? props.height : 4)
  const [color, setColor] = useState(props.color || '#3399ff')
  const [type, setType] = useState(props.type)
  const [error, setError] = useState(props.error)
  const [loadingText, setLoadingText] = useState(props.loadingText)
  const [size, setSize] = useState(props.size)

  const barClassName = useMemo(() => loadingClass('line', error && 'error'), [error])
  const barStyle = useMemo(() => {
    const style = {}

    if (type === 'line') {
      style.width = `${percent}%`
      style.background = color
    }

    return style
  }, [type, color, percent])

  const wrapStyle = useMemo(() => (type === 'line' ? { height: `${height}px` } : {}), [type, height])

  const update = useCallback(params => {
    if (!params || !isObject(params)) return

    // eslint-disable-next-line no-shadow
    const { percent, visible, error, type, loadingText, color, size } = params

    Object.keys(params).forEach(it => {
      switch (it) {
        case 'percent':
          setPercent(percent)
          break
        case 'visible':
          setVisible(visible)
          break
        case 'error':
          setError(error)
          break
        case 'type':
          setType(type)
          break
        case 'loadingText':
          setLoadingText(loadingText)
          break
        case 'color':
          color && setColor(color)
          break
        case 'height':
          setHeight(height)
          break
        case 'size':
          setSize(size)
          break
        default:
          break
      }
    })
  }, [])

  useImperativeHandle(ref, () => ({ update, type, percent }))

  return (
    <Transition show={visible}>
      <div className={loadingClass('_')} style={wrapStyle}>
        {type === 'line' ? (
          <>
            <div className={barClassName} style={barStyle} />
            <div className={loadingClass('spin')}>
              <Spin name="ring" color={color} size={24} />
            </div>
          </>
        ) : (
          <div className={loadingClass('inner')}>
            <div>
              <Spin size={size || 54} name={type || 'wave'} color={color} />
            </div>
            {loadingText && <div className={loadingClass('text')}>{loadingText}</div>}
          </div>
        )}
      </div>
    </Transition>
  )
}

// forwardRef was not support defaultProps and propTypes
export default memo(forwardRef(Loading))
