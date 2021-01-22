import React, { useCallback, useRef, useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Textarea from '@/component/Textarea'
import Input from '@/component/Input'
import Popover from '@/component/Popover'
import { editableAreaClass } from '@/styles'
import { focusElement, getParent } from '@/utils/dom/element'
import icons from '../icons'

const formatShowValue = value => {
  if (!value && value !== 0) return ''

  const arr = String(value).split('\n')
  const len = arr.length

  if (len > 1) return `${arr[0]}...`

  return String(value)
}

const Editable = props => {
  const [value, setValue] = useState(props.value)
  const [showTextarea, setShowTextarea] = useState(false)
  const { width, style, className, bordered, clearable, getPopupContainer } = props
  const popWidth = useRef()
  const containerRef = useRef()
  const inputRef = useRef()
  const prevPropsRef = useRef()
  const prevProps = prevPropsRef.current

  // ------------------------lifecycle-----------------------
  useEffect(() => {
    if (prevProps && prevProps.showTextarea !== showTextarea && showTextarea) {
      autoFocus()
    }
    if (prevProps && value !== prevProps.value) {
      setValue(value)
    }

    prevPropsRef.current = props
  })

  // ------------------------method---------------------------
  // 绑定InputRef
  const bindInput = useCallback(el => {
    inputRef.current = el
  }, [])

  // 绑定textarea的Ref
  const bindContainer = useCallback(el => {
    containerRef.current = el
  }, [])

  const updateShowTextarea = useCallback(flag => {
    // Input的上层 label标签的
    if (flag && inputRef.current)
      popWidth.current = getParent(inputRef.current, `.${editableAreaClass('input')}`).offsetWidth
    setShowTextarea(flag)
  }, [])

  const showPop = useCallback(() => updateShowTextarea(true), [])

  const hidePop = useCallback(() => updateShowTextarea(false), [])

  const onChange = useCallback(
    val => {
      if (typeof props.onChange === 'function') props.onChange(val)
      setValue(val)
    },
    [props.onChange]
  )

  const onBlur = useCallback(
    e => {
      hidePop()
      if (typeof props.onBlur === 'function') props.onBlur(e)
    },
    [props.onBlur]
  )

  const handleFocus = useCallback(
    e => {
      if (typeof props.onFocus === 'function') props.onFocus(e)
    },
    [props.onFocus]
  )

  const autoFocus = useCallback(() => {
    if (!containerRef.current) return
    const target = containerRef.current.querySelector(`.${editableAreaClass('text-area')} textarea.so-input-auto-size`)
    if (target) focusElement.end(target)
  }, [containerRef.current])

  const renderInput = useCallback(() => {
    const { placeholder, disabled } = props

    return (
      <Input
        forwardedRef={bindInput}
        placeholder={placeholder}
        value={formatShowValue(value)}
        className={editableAreaClass('input')}
        onFocus={showPop}
        disabled={disabled}
      />
    )
  }, [value, props.placeholder, props.disabled])

  const renderTextarea = useCallback(() => {
    const { delay, placeholder, maxHeight } = props

    if (!showTextarea) return null
    return (
      <div ref={bindContainer}>
        <Textarea
          className={editableAreaClass('text-area')}
          autosize
          value={value}
          rows={1}
          delay={delay}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={handleFocus}
          placeholder={placeholder}
          maxHeight={maxHeight}
        />
      </div>
    )
  }, [showTextarea, value, props.delay, props.placeholder, props.maxHeight])

  // ------------------------render---------------------------
  const cls = classnames(className, editableAreaClass('_', !bordered && 'none-bordered'))
  const ms = Object.assign({ width }, style)
  const popStyle = { width: popWidth.current }

  // Popover 作用是 输入足够多的内容时 Input被掩盖，由Textarea接管显示
  return (
    <div className={cls} style={ms}>
      {renderInput()}
      <Popover
        visible={showTextarea}
        showArrow={false}
        className={editableAreaClass('popover')}
        position="cover"
        style={popStyle}
        getPopupContainer={getPopupContainer}
      >
        {renderTextarea()}
      </Popover>
      {clearable && value ? (
        <div className={editableAreaClass('clear')} onClick={onChange.bind(null, '')}>
          {icons.CloseCircle}
        </div>
      ) : null}
    </div>
  )
}

Editable.defaultProps = {
  bordered: false,
}

Editable.propTypes = {
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string,
  style: PropTypes.object,
  className: PropTypes.string,
  delay: PropTypes.number,
  bordered: PropTypes.bool,
  placeholder: PropTypes.string,
  onFocus: PropTypes.func,
  disabled: PropTypes.bool,
  clearable: PropTypes.bool,
  getPopupContainer: PropTypes.func,
  maxHeight: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
}

export default Editable
