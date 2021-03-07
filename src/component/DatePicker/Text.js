import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { getParent } from '@/utils/dom/element'
import { datepickerClass } from '@/styles'
import utils from './utils'

let target = null
document.addEventListener(
  'mousedown',
  e => {
    // eslint-disable-next-line prefer-destructuring
    target = e.target
  },
  true
)

class Text extends PureComponent {
  constructor(props) {
    super(props)

    this.handleBlur = this.handleBlur.bind(this)
    this.handleInput = this.handleInput.bind(this)
    this.bindElement = this.bindElement.bind(this)
  }

  // container handleClickAway失焦使用
  bindElement(el) {
    const { onTextSpanRef } = this.props

    this.element = el

    if (onTextSpanRef) onTextSpanRef(el)
  }

  // span失去焦点时执行
  handleBlur(e) {
    const { format, index, onChange, value } = this.props
    // 由于span是可编辑的 获取内容
    const txt = e.target.innerText

    // 如果为picker 则不处理
    if (getParent(target, `.${datepickerClass('picker')}`)) return

    if (txt === value) return
    if (txt.trim().length === 0) {
      onChange(undefined, index)
    } else {
      const newValue = utils.toDateWithFormat(txt, format, undefined)

      if (!newValue) {
        this.element.innerText = null
      }
    }
  }

  handleInput(e) {
    if (e.keyCode === 13) {
      e.preventDefault()
      this.element.blur()
    }
  }

  render() {
    const { className, inputable, value, placeholder, disabled } = this.props

    if (!inputable || disabled) {
      return <span className={className}>{value || placeholder}</span>
    }

    return (
      <span
        ref={this.bindElement}
        contentEditable={inputable}
        onBlur={this.handleBlur}
        onKeyDown={this.handleInput}
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    )
  }
}

Text.propTypes = {
  disabled: PropTypes.bool,
  className: PropTypes.string,
  format: PropTypes.string,
  index: PropTypes.number,
  inputable: PropTypes.bool,
  onChange: PropTypes.func,
  placeholder: PropTypes.any,
  value: PropTypes.string,
  onTextSpanRef: PropTypes.func,
}

Text.defaultProps = {
  value: '',
}

export default Text
