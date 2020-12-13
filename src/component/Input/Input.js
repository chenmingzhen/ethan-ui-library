import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cleanProps from '@/utils/cleanProps'
import { inputClass } from '@/styles'
import Clear from './clear'

class Input extends PureComponent {
  constructor(props) {
    super(props)
    this.enterLock = false
    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.bindRef = this.bindRef.bind(this)
    this.handleCompositionEnd = this.handleComposition.bind(this, 1)
    this.handleCompositionStart = this.handleComposition.bind(this, 0)
  }

  bindRef(el) {
    this.ref = el
  }

  invalidNumber(value) {
    const { digits, type } = this.props
    if (type !== 'number') return false

    let reg = '^-?\\d*'
    if (digits === undefined) {
      reg += '\\.?\\d*'
    } else if (digits > 0) {
      reg += `\\.?\\d{0,${digits}}`
    }
    reg += '$'
    reg = new RegExp(reg)
    return !reg.test(value)
  }

  handleChange(e, clearClick) {
    const { type, clearable } = this.props
    if (clearClick) {
      this.ref.focus()
      if (typeof clearable === 'function') clearable()
    }
    let { value } = e.target
    if (type === 'number' && typeof value !== 'number') value = String(value).replace(/。/g, '.')
    if (this.invalidNumber(value)) return
    this.props.onChange(value)
  }

  handleKeyUp(e) {
    const { onKeyUp, onEnterPress } = this.props
    if (e.keyCode === 13 && onEnterPress && !this.enterLock) {
      onEnterPress(e.target.value, e)
    }
    if (onKeyUp) onKeyUp(e)
  }

  handleComposition(type) {
    if (type === 0) {
      this.enterLock = true
    } else {
      setTimeout(() => {
        this.enterLock = false
      }, 100)
    }
  }

  handleBlur(e) {
    const { value } = e.target
    const { forceChange, onBlur } = this.props
    if (onBlur) onBlur(e)
    if (this.invalidNumber(value)) return
    if (forceChange) forceChange(value)
  }

  defaultInfo = value => {
    if (!value || value.length === 0) return null
    const { info } = this.props
    const text = `${value.length} / ${info}`
    if (value.length <= info) return text
    return new Error(text)
  }

  renderInfo() {
    const { info } = this.props
    const notNumber = typeof info !== 'number'

    if (typeof info !== 'function' && notNumber) return null

    const textInfo = notNumber ? info : this.defaultInfo
    const res = textInfo(this.props.value)

    // empty
    if (!res) return null

    const isError = res instanceof Error
    const text = isError ? res.message : res
    return (
      <div key="info" style={{ minWidth: 'auto' }} className={inputClass('bottom-right', isError ? 'error' : 'tip')}>
        {text}
      </div>
    )
  }

  render() {
    const {
      type,
      defaultValue,
      digits,
      className,
      clearable,
      htmlName,
      forceChange,
      onEnterPress,
      ...other
    } = this.props
    const value = this.props.value == null ? '' : this.props.value

    return [
      <input
        {...cleanProps(other)}
        className={className}
        name={other.name || htmlName}
        type={type === 'password' ? type : 'text'}
        value={value}
        ref={this.bindRef}
        key="input"
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        onBlur={this.handleBlur}
        onCompositionStart={this.handleCompositionStart}
        onCompositionEnd={this.handleCompositionEnd}
      />,
      !other.disabled && clearable && value !== '' && <Clear onClick={this.handleChange} key="close" />,
      this.renderInfo(),
    ]
  }
}

Input.propTypes = {
  className: PropTypes.string,
  defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  digits: PropTypes.number,
  forceChange: PropTypes.func,
  htmlName: PropTypes.string,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  onKeyUp: PropTypes.func,
  type: PropTypes.string,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onFocus: PropTypes.func,
  clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
}

Input.defaultProps = {
  type: 'text',
}

export default Input
