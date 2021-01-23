import React, { useCallback, useMemo, useRef, useState } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { range } from '@/utils/numbers'
import { getParent } from '@/utils/dom/element'
import { getProps, defaultProps } from '@/utils/proptypes'
import { rateClass } from '@/styles'

const MIN_SIZE = 12

const Rate = props => {
  const [hover, setHover] = useState(0)
  const [highlight, setHighlight] = useState(-1)
  const highlightTimer = useRef()
  // -------------------------method and computed-------------------------
  const computedStyle = useMemo(() => {
    const { size } = props
    if (!size) return undefined
    const parsed = Math.max(MIN_SIZE, parseFloat(size))
    return { width: parsed, fontSize: parsed }
  }, [props.size])

  const computedValue = useMemo(() => (hover === 0 ? props.value : hover), [hover, props.value])

  const getScale = useCallback(() => {
    const { size } = props
    if (size >= MIN_SIZE) return undefined
    return {
      transform: `scale(${size / MIN_SIZE})`,
    }
  }, [props.size])

  const getIcon = useCallback(
    (icons, i, isBg) => {
      const { repeat, allowHalf } = props
      const value = computedValue
      const remain = value - i

      let icon
      if (!Array.isArray(icons)) {
        icon = icons
      } else {
        icon = icons[repeat ? value - 1 : i]
        if (!icon) icon = icons[icons.length - 1]
      }

      if (remain <= 0 || remain >= 1 || isBg) return icon

      const style = { width: `${remain * 100}%`, display: 'block', overflow: 'hidden', fontSize: 'inherit' }
      return (
        <span style={style} className={allowHalf && rateClass('allow-half')}>
          {icon}
        </span>
      )
    },
    [computedValue, props.repeat, props.allowHalf]
  )

  const renderBackground = useCallback(() => {
    const { background, max, disabled, allowHalf } = props

    return (
      <div className={rateClass('background')}>
        {range(max).map(v => (
          <span
            key={v}
            style={Object.assign(
              { visibility: !allowHalf && !disabled && computedValue > v ? 'hidden' : 'visible' },
              computedStyle
            )}
          >
            {getIcon(background, v, true)}
          </span>
        ))}
      </div>
    )
  }, [computedStyle, computedValue, props])

  const renderStatic = useCallback(() => {
    const { front, value, max, text } = props
    const style = computedStyle

    return (
      <div className={rateClass('static')}>
        {range(max).map(v => (
          <span key={v} style={style}>
            {value > v && getIcon(front, v)}
          </span>
        ))}
        <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
      </div>
    )
  }, [computedStyle, props.front, props.value, props.max, props.text])

  const handleClick = useCallback(
    (...args) => {
      let value = args[0]
      const e = args[1]
      const { clearable, allowHalf } = props
      if (allowHalf && getParent(e.target, `.${rateClass('allow-half')}`)) {
        value -= 0.5
      }
      if (clearable && props.value === value) {
        value = 0
        setHover(0)
      }
      props.onChange(value)
      setHighlight(value)

      if (highlightTimer.current) clearTimeout(highlightTimer.current)
      highlightTimer.current = setTimeout(() => {
        setHighlight(-1)
      }, 300)
    },
    [props.clearable, props.allowHalf, props.onChange, highlightTimer.current]
  )

  const handleHover = useCallback(
    _hover => {
      setHover(_hover)
    },
    [hover]
  )

  const handleMove = useCallback((_hover, e) => {
    const { x, width } = e.target.getBoundingClientRect()
    setHover(_hover - (x + width / 2 > e.clientX ? 0.5 : 0))
  }, [])

  const renderRate = useCallback(() => {
    const { front, max, text, allowHalf } = props
    const value = computedValue
    const style = computedStyle

    return (
      <div className={rateClass('front')}>
        {range(max).map(v => (
          <span
            key={v}
            onClick={handleClick.bind(this, v + 1)}
            onMouseLeave={handleHover.bind(this, 0)}
            onMouseMove={allowHalf ? handleMove.bind(this, v + 1) : undefined}
            onMouseEnter={!allowHalf ? handleHover.bind(this, v + 1) : undefined}
            style={style}
          >
            {value > v ? getIcon(front, v) : <span>&nbsp;</span>}
            {highlight === v + 1 && <i className={rateClass('highlight')}>{getIcon(front, v)}</i>}
          </span>
        ))}
        <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
      </div>
    )
  }, [props, computedValue, computedStyle])
  // -------------------------render--------------------------
  const className = classnames(rateClass('_', props.className))
  const ms = Object.assign({}, props.style, getScale())

  return (
    <div className={className} style={ms}>
      {renderBackground()}
      {props.disabled ? renderStatic() : renderRate()}
    </div>
  )
}

Rate.propTypes = {
  ...getProps(PropTypes, 'disabled', 'type'),
  background: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  clearable: PropTypes.bool,
  repeat: PropTypes.bool,
  front: PropTypes.oneOfType([PropTypes.element, PropTypes.array]),
  max: PropTypes.number,
  onChange: PropTypes.func.isRequired,
  size: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  text: PropTypes.array,
  value: PropTypes.number,
  allowHalf: PropTypes.bool,
}

Rate.defaultProps = {
  ...defaultProps,
  repeat: true,
  max: 5,
  size: 20,
  text: [],
  value: 0,
}

export default Rate
