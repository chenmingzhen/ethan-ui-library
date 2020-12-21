import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { getProps, defaultProps } from '@/utils/proptypes'
import { wrapSpan } from '@/utils/dom/element'
import { isPromise, isFunc, isString, isEmpty } from '@/utils/is'
import { isDark } from '@/utils/color'
import { tagClass } from '@/styles'
import icons from '../icons'
import Spin from '../Spin'
import Input from './Input'

const hideInput = Symbol('hideInput')
const showInput = Symbol('showInput')

class Tag extends PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      // 0 未关闭 1 关闭中 2 已关闭
      dismiss: 0,
      // tag input status
      inputVisible: hideInput,
      // Input的值
      value: null,
    }

    this.dismiss = this.dismiss.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.renderClose = this.renderClose.bind(this)
    this.closeTag = this.closeTag.bind(this)
    this.toggleInputVisible = this.toggleInputVisible.bind(this)
    this.inputBlur = this.inputBlur.bind(this)
    this.inputChange = this.inputChange.bind(this)
  }

  componentDidMount() {
    const { children, onCompleted } = this.props
    // 如果onCompleted不为空，可编辑，且children是string 将children设为value
    if (onCompleted && isString(children) && !isEmpty(children)) {
      this.setState({ value: children })
    }
  }

  closeTag() {
    this.setState({ dismiss: 2 })
  }

  /**
   * 处理dismiss变化
   * @param e
   */
  dismiss(e) {
    const { onClose } = this.props
    let callback
    // 如果传入值是布尔 非函数
    if (onClose === true) {
      this.closeTag()
      return
    }
    if (typeof onClose === 'function') {
      callback = onClose(e)
    }

    // 如果onClose的返回值是Promise 执行其中的then
    if (isPromise(callback)) {
      this.setState({ dismiss: 1 })
      callback.then(() => {
        this.closeTag()
      })
      return
    }
    if (e.defaultPrevented) {
      return
    }
    this.closeTag()
  }

  /**
   * 点击Input框外时 默认算完成输入
   * @param value
   */
  inputBlur(value) {
    const { onCompleted } = this.props
    // 执行onCompleted回调
    if (isFunc(onCompleted)) onCompleted(value)
    this.setState({ inputVisible: hideInput })
  }

  inputChange(value) {
    this.setState({ value })
  }

  /**
   * 控制Input的显示
   */
  toggleInputVisible() {
    const { inputVisible, value } = this.state
    const { onCompleted } = this.props

    // 如果onCompleted不为空且value不为空
    if (onCompleted && !isEmpty(value))
      this.setState({ inputVisible: inputVisible === hideInput ? showInput : hideInput })
  }

  handleClick(e) {
    const { onClick, disabled } = this.props
    if (disabled) return

    this.toggleInputVisible()

    if (typeof onClick === 'function') {
      onClick(e)
    }
  }

  handleClose(e) {
    const { disabled } = this.props
    if (this.state.dismiss > 0 || disabled) return
    this.dismiss(e)
  }

  // 渲染 关闭|关闭中
  renderClose(dismiss) {
    const { onClose } = this.props
    if (!onClose) return null
    const closeClass = tagClass('close-icon')
    const loadingClass = tagClass('close-loading')
    if (dismiss === 0) {
      return (
        <div className={closeClass} onClick={this.handleClose}>
          {icons.Close}
        </div>
      )
    }
    return (
      <div className={loadingClass}>
        <Spin name="ring" size={10} />
      </div>
    )
  }

  render() {
    const { dismiss, inputVisible, value } = this.state
    if (dismiss === 2) return null

    const { children, className, type, backgroundColor, onClose, disabled, onCompleted } = this.props

    // onCompleted不为空且状态为showInput时 显示Input
    if (onCompleted && inputVisible === showInput)
      return <Input value={value} onBlur={this.inputBlur} onChange={this.inputChange} />

    const childrenParsed = wrapSpan(children)
    const { style } = this.props

    let tagClassName = tagClass('_', disabled && 'disabled', type)
    const inlineClassName = tagClass('inline')
    const click = !onClose ? { onClick: this.handleClick } : {}
    let tagStyle = style || {}

    if (className) tagClassName += ` ${className}`
    if (backgroundColor) {
      tagStyle = {
        color: isDark(backgroundColor) ? '#fff' : '#000',
        backgroundColor,
        borderColor: 'transparent',
        ...style,
      }
    }
    return (
      <div className={tagClassName} style={tagStyle} {...click}>
        {/* 如果有onClose close渲染出来是div标签 添加一层包裹 */}
        {onClose ? (
          <div onClick={this.handleClick} className={inlineClassName}>
            {childrenParsed}
          </div>
        ) : (
          childrenParsed
        )}
        {this.renderClose(dismiss)}
      </div>
    )
  }
}

Tag.propTypes = {
  ...getProps(PropTypes, 'type'),
  children: PropTypes.any,
  onClick: PropTypes.func,
  onClose: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  backgroundColor: PropTypes.string,
  onCompleted: PropTypes.func, // onCompleted 不为空时，可编辑
}

Tag.defaultProps = {
  ...defaultProps,
  type: 'default',
}

export default Tag
