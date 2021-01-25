import React, { useState, useEffect, useCallback, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { sliderClass } from '@/styles'
import { usePrevious } from 'ethan-use-hooks'
import { perToValue, valueToPer } from './utils'
import Indicator from './Indicator'

const Slider = props => {
  const [dragging, setDragging] = useState(false)
  const [length, setLength] = useState(() => valueToPer(props.value, props.scale))
  const parentElement = useRef()
  const prevProps = usePrevious(props)

  // ---------------------------sideEffect-----------------------------------------------
  // didUpdate
  useEffect(() => {
    const len = props.scale.length

    if (!prevProps) return

    if (prevProps.value !== props.value || (!dragging && prevProps.scale[len - 1] !== props.scale[len - 1])) {
      setLength(valueToPer(props.value, props.scale))
    }
  }, [props.value, props.scale, dragging, prevProps])

  // ---------------------------method and computed--------------------------------------
  const bindElement = useCallback(el => {
    if (el) parentElement.current = el.parentElement
  }, [])

  const lengthToValue = useCallback(
    _length => {
      const { scale, step } = props
      return perToValue(_length, scale, step)
    },
    [props.scale, props.step]
  )

  const handleDrag = useCallback(
    (mx, my) => {
      const { scale, onDrag, value, vertical, onIncrease } = props
      console.log(parentElement.current.clientWidth)
      const m = vertical ? my / parentElement.current.clientHeight : mx / parentElement.current.clientWidth

      const min = props.min ? valueToPer(props.min, scale) : 0
      const max = props.max ? valueToPer(props.max, scale) : 1

      let newLength = length + (vertical ? -m : m)
      const needIncrease = newLength > 1

      if (newLength < min) newLength = min
      if (newLength > max) newLength = max

      if (needIncrease && onIncrease) onIncrease()

      setLength(newLength)
      setDragging(true)

      if (onDrag) {
        const newValue = lengthToValue(newLength)
        if (newValue !== value) onDrag(newValue)
      }
    },
    [props.scale, props.onDrag, props.value, props.vertical, props.onIncrease, length, parentElement.current]
  )

  const handleDragEnd = useCallback(() => {
    const value = lengthToValue(length)

    setLength(valueToPer(value, props.scale))
    setDragging(false)

    props.onChange(props.index, value)
  }, [length, props.scale, props.onChange, props.index])

  const renderResult = useCallback(() => {
    const { autoHide, formatValue } = props
    if (!formatValue) return null

    const className = sliderClass('result', (!autoHide || dragging) && 'show')
    const value = formatValue(lengthToValue(length))

    return <div className={className}>{value}</div>
  }, [props.autoHide, props.formatValue, dragging, length])

  // -------------------------------------render-------------------------------------------
  const { index, disabled, vertical } = props
  let newLength = length

  if (index === 1) newLength = 1 - newLength
  const style = { [vertical ? 'height' : 'width']: `${newLength * 100}%` }
  const className = sliderClass(
    'bar',
    vertical && (index === 1 ? 'top' : 'bottom'),
    !vertical && index === 1 && 'right'
  )

  return (
    <div ref={bindElement} style={style} className={className}>
      {renderResult()}
      <div className={sliderClass('bar-bg')} />
      <Indicator disabled={disabled} onDrag={handleDrag} onDragEnd={handleDragEnd} />
    </div>
  )
}

Slider.propTypes = {
  autoHide: PropTypes.bool,
  disabled: PropTypes.bool,
  formatValue: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  index: PropTypes.number.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  onDrag: PropTypes.func,
  scale: PropTypes.array.isRequired,
  step: PropTypes.number,
  value: PropTypes.number.isRequired,
  vertical: PropTypes.bool.isRequired,
  onIncrease: PropTypes.func,
}

Slider.defaultProps = {
  formatValue: v => v,
}

export default memo(Slider)
