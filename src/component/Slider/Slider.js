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

// import React from 'react'
// import PropTypes from 'prop-types'
// import { PureComponent } from '@/utils/component'
// import { sliderClass } from '@/styles'
// import Indicator from './Indicator'
// import { perToValue, valueToPer } from './utils'
//
// class Slider extends PureComponent {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       dragging: false,
//       length: valueToPer(props.value, props.scale),
//     }
//
//     this.bindElement = this.bindElement.bind(this)
//     this.handleDrag = this.handleDrag.bind(this)
//     this.handleDragEnd = this.handleDragEnd.bind(this)
//   }
//
//   componentDidUpdate(prevProps) {
//     const { value, scale } = this.props
//     const { dragging } = this.state
//     const len = scale.length
//     if (prevProps.value !== value || (!dragging && prevProps.scale[len - 1] !== scale[len - 1])) {
//       // eslint-disable-next-line
//             this.setState({ length: valueToPer(value, scale) })
//     }
//   }
//
//   bindElement(el) {
//     if (el) this.parentElement = el.parentElement
//   }
//
//   length2value(length) {
//     const { scale, step } = this.props
//     return perToValue(length, scale, step)
//   }
//
//   handleDrag(mx, my) {
//     const { scale, onDrag, value, vertical, onIncrease } = this.props
//     const m = vertical ? my / this.parentElement.clientHeight : mx / this.parentElement.clientWidth
//     const { length } = this.state
//
//     const min = this.props.min ? valueToPer(this.props.min, scale) : 0
//     const max = this.props.max ? valueToPer(this.props.max, scale) : 1
//
//     let newLength = length + (vertical ? -m : m)
//     const needIncrease = newLength > 1
//
//     if (newLength < min) newLength = min
//     if (newLength > max) newLength = max
//
//     if (needIncrease && onIncrease) onIncrease()
//
//     this.setState({ length: newLength, dragging: true })
//
//     if (onDrag) {
//       const newValue = this.length2value(newLength)
//       if (newValue !== value) onDrag(newValue)
//     }
//   }
//
//   handleDragEnd() {
//     const { length } = this.state
//     const { scale } = this.props
//     const value = this.length2value(length)
//
//     this.setState({ length: valueToPer(value, scale), dragging: false })
//     this.props.onChange(this.props.index, value)
//   }
//
//   renderResult() {
//     const { autoHide, formatValue } = this.props
//     if (!formatValue) return null
//
//     const { dragging } = this.state
//     const className = sliderClass('result', (!autoHide || dragging) && 'show')
//     const value = formatValue(this.length2value(this.state.length))
//     return <div className={className}>{value}</div>
//   }
//
//   render() {
//     const { index, disabled, vertical } = this.props
//     let { length } = this.state
//
//     if (index === 1) length = 1 - length
//     const style = { [vertical ? 'height' : 'width']: `${length * 100}%` }
//     const className = sliderClass(
//       'bar',
//       vertical && (index === 1 ? 'top' : 'bottom'),
//       !vertical && index === 1 && 'right'
//     )
//
//     return (
//       <div ref={this.bindElement} style={style} className={className}>
//         {this.renderResult()}
//         <div className={sliderClass('bar-bg')} />
//         <Indicator disabled={disabled} onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} />
//       </div>
//     )
//   }
// }
//
// Slider.propTypes = {
//   autoHide: PropTypes.bool,
//   disabled: PropTypes.bool,
//   formatValue: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
//   index: PropTypes.number.isRequired,
//   min: PropTypes.number,
//   max: PropTypes.number,
//   onChange: PropTypes.func.isRequired,
//   onDrag: PropTypes.func,
//   scale: PropTypes.array.isRequired,
//   step: PropTypes.number,
//   value: PropTypes.number.isRequired,
//   vertical: PropTypes.bool.isRequired,
//   onIncrease: PropTypes.func,
// }
//
// Slider.defaultProps = {
//   formatValue: v => v,
// }
//
// export default Slider
