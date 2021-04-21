// @ts-nocheck 
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass } from '@/styles'
import { isObject, isFunc, isString } from '@/utils/is'
import Popover from '../Popover'
import Input from './Input'
import Caret from '../icons/Caret'

export const IS_NOT_MATCHED_VALUE = 'IS_NOT_MATCHED_VALUE'

const getResultClassName = (f, value) => {
  if (isFunc(f)) {
    return f(isObject(value) && value.IS_NOT_MATCHED_VALUE ? value.value : value)
  }
  if (isString(f)) {
    return f
  }
  return null
}

// 获取result的内容
const getResultContent = (data, renderResult, renderUnmatched) => {
  if (isObject(data) && data.IS_NOT_MATCHED_VALUE) {
    if (typeof renderUnmatched === 'function') return renderUnmatched(data.value)
    return isObject(data.value) ? renderResult(data.value) : data.value
  }
  return renderResult(data)
}

// Input中的Item
function Item({ renderResult, renderUnmatched, data, disabled, onClick, resultClassName, title = false }) {
  const value = data
  const click = disabled || !onClick ? undefined : () => onClick(value)
  const synDisabled = disabled || !click
  const content = getResultContent(data, renderResult, renderUnmatched)
  if (content === null) return null
  return (
    <a
      title={title && isString(content) ? content : null}
      tabIndex={-1}
      className={classnames(
        selectClass('item', disabled && 'disabled', synDisabled && 'ban'),
        getResultClassName(resultClassName, data)
      )}
    >
      {content}
      {!synDisabled && <span className={selectClass('indicator', 'close')} onClick={click} />}
    </a>
  )
}

class Result extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      more: false,
    }

    this.handleRemove = this.handleRemove.bind(this)
    this.handleMore = this.handleMore.bind(this)
  }

  componentDidUpdate() {
    const { result, compressed } = this.props
    if (compressed && result.length <= 1) this.state.more = false
  }

  handleRemove(...args) {
    const { onRemove } = this.props

    setTimeout(() => {
      onRemove(...args)
    }, 10)
  }

  // 判断是否为空result
  isEmptyResult() {
    const { result, renderResult, renderUnmatched } = this.props

    if (result.length <= 0) return true

    const res = result.reduce((acc, cur) => {
      if (getResultContent(cur, renderResult, renderUnmatched)) {
        acc.push(cur)
      }
      return acc
    }, [])
    return res.length <= 0
  }

  handleMore(more) {
    this.setState({ more })
  }

  renderMore(list) {
    const { datum, renderResult, renderUnmatched, compressedClassName, resultClassName } = this.props
    const { more } = this.state
    const className = classnames(selectClass('popover'), compressedClassName)
    return (
      <a tabIndex={-1} key="more" className={selectClass('item', 'item-compressed', more && 'item-more')}>
        <span>{`+${list.length - 1}`}</span>
        <Popover visible={more} onVisibleChange={this.handleMore} className={className}>
          <div className={selectClass('result')}>
            {list.map((d, i) => (
              <Item
                key={i}
                data={d}
                disabled={datum.disabled(d)}
                onClick={this.handleRemove}
                renderResult={renderResult}
                renderUnmatched={renderUnmatched}
                resultClassName={resultClassName}
              />
            ))}
          </div>
        </Popover>
      </a>
    )
  }

  // 清除icon
  renderClear() {
    const { onClear, result, disabled } = this.props

    if (onClear && result.length > 0 && disabled !== true) {
      return (
        <div onClick={onClear} className={selectClass('close-wrapper')}>
          {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
          <a tabIndex={-1} data-role="close" className={selectClass('indicator', 'close')} />
        </div>
      )
    }

    return null
  }

  renderInput(text, key = 'input') {
    const { multiple, onFilter, trim, focus, onInputFocus, onInputBlur, setInputReset, focusSelected } = this.props
    return (
      <Input
        key={`${key}.${focus ? 1 : 0}`}
        onInputFocus={onInputFocus}
        onInputBlur={onInputBlur}
        updateAble={!multiple}
        multiple={multiple}
        focus={focus}
        text={text}
        trim={trim}
        onFilter={onFilter}
        setInputReset={setInputReset}
        focusSelected={focusSelected}
      />
    )
  }

  // 当result为空时渲染placeholder
  renderPlaceholder() {
    const { focus, onFilter } = this.props

    // 可输入模式 渲染input
    if (focus && onFilter) {
      return this.renderInput()
    }

    return (
      <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
        <span>{this.props.placeholder}</span>
        &nbsp;
      </span>
    )
  }

  renderResult() {
    const {
      multiple,
      compressed,
      result,
      renderResult,
      renderUnmatched,
      onFilter,
      focus,
      datum,
      filterText,
      resultClassName,
    } = this.props

    // 多选模式下
    if (multiple) {
      const neededResult = compressed ? result.slice(0, 1) : result
      const firstRemove = !compressed || result.length === 1
      const items = neededResult.map((d, i) => (
        <Item
          key={i}
          data={d}
          disabled={datum.disabled(d)}
          onClick={firstRemove ? this.handleRemove : undefined}
          renderResult={renderResult}
          renderUnmatched={renderUnmatched}
          resultClassName={resultClassName}
          title
        />
      ))

      // 渲染显示更多
      if (compressed && result.length > 1) {
        items.push(this.renderMore(result))
      }

      if (focus && onFilter) {
        items.push(this.renderInput(filterText, result.length))
      }

      return items
    }

    if (onFilter) {
      return this.renderInput(getResultContent(result[0], renderResult, renderUnmatched))
    }

    const v = getResultContent(result[0], renderResult, renderUnmatched)
    const title = isString(v) ? v : undefined

    return (
      <span
        title={title}
        className={classnames(selectClass('ellipsis'), getResultClassName(resultClassName, result[0]))}
      >
        {v}
      </span>
    )
  }

  renderIndicator() {
    const { multiple, showArrow, compressed } = this.props
    if (!showArrow || (multiple && !compressed)) return null
    const showCaret = !multiple

    return (
      <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
        {showCaret && <Caret />}
      </a>
    )
  }

  render() {
    const { compressed } = this.props
    const result = this.isEmptyResult() ? this.renderPlaceholder() : this.renderResult()

    return (
      <div className={selectClass('result', compressed && 'compressed')}>
        {result}
        {this.renderIndicator()}
        {this.renderClear()}
      </div>
    )
  }
}

Result.propTypes = {
  datum: PropTypes.object,
  disabled: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
  filterText: PropTypes.string,
  focus: PropTypes.bool,
  multiple: PropTypes.bool.isRequired,
  onRemove: PropTypes.func,
  onClear: PropTypes.func,
  onFilter: PropTypes.func,
  onInputBlur: PropTypes.func,
  onInputFocus: PropTypes.func,
  result: PropTypes.array.isRequired,
  renderResult: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  setInputReset: PropTypes.func,
  compressed: PropTypes.bool,
  trim: PropTypes.bool,
  renderUnmatched: PropTypes.func,
  showArrow: PropTypes.bool,
  focusSelected: PropTypes.bool,
  compressedClassName: PropTypes.string,
  resultClassName: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
}

export default Result
