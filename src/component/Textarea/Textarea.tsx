// @ts-nocheck 
import React, { useState, useCallback, useEffect, useRef, memo } from 'react'
import PropTypes from 'prop-types'
import { inputClass } from '@/styles'
import cleanProps from '@/utils/cleanProps'

function Textarea(props) {
  const [height, setHeight] = useState(0)
  const shadow = useRef()
  // 上一个props值
  const prevPropsRef = useRef()
  const prevProps = prevPropsRef.current
  // ----------------------lifeCycle---------------------
  useEffect(() => {
    if (props.autosize) textareaResize()
  }, [])

  useEffect(() => () => {
    if (props.autosize && prevProps && prevProps.value !== props.value) textareaResize(props.value)

    // 记录上一个props值
    prevPropsRef.current = props
  })
  // ---------------------method-------------------------
  const defaultInfo = useCallback(
    value => {
      if (!value || value.length === 0) return null

      const { info } = props
      const text = `${value.length} / ${info}`

      if (value.length <= info) return text

      return new Error(text)
    },
    [props.info]
  )

  const renderInfo = useCallback(() => {
    const { info } = props
    const notNumber = typeof info !== 'number'

    if (typeof info !== 'function' && notNumber) return null
    const textInfo = notNumber ? info : defaultInfo
    const res = textInfo(props.value)

    if (!res) return null

    const isError = res instanceof Error
    const text = isError ? res.message : res

    return (
      <div key="info" style={{ minWidth: 'auto' }} className={inputClass('bottom-right', isError ? 'error' : 'tip')}>
        {text}
      </div>
    )
  }, [props.info, props.value, defaultInfo])

  const textareaResize = useCallback(
    value => {
      if (value || value === '') shadow.current.value = value
      const nHeight = shadow.current ? shadow.current.scrollHeight : 0
      setHeight(nHeight)
    },
    [height, shadow.current]
  )

  const handleChange = useCallback(
    e => {
      props.onChange(e.target.value)

      if (props.autosize) {
        textareaResize(e.target.value)
      }
    },
    [props.autosize, props.onChange]
  )

  const handleKeyUp = useCallback(
    e => {
      const { onEnterPress } = props
      if (e.keyCode === 13 && onEnterPress) {
        onEnterPress(e.target.value, e)
      }
    },
    [props.onEnterPress]
  )

  const handleBlur = useCallback(
    e => {
      const { value } = e.target
      const { forceChange, onBlur } = props
      if (onBlur) onBlur(e)
      forceChange(value)
    },
    [props.forceChange, props.onBlur]
  )

  const bindShadow = el => {
    shadow.current = el
  }

  // --------------------render-------------------------
  const { autosize, onChange, maxHeight, info, onEnterPress, resize, ...otherProps } = props
  const value = props.value == null ? '' : props.value
  const nHeight = height || 'auto'
  const className = autosize ? inputClass('auto-size') : inputClass(resize && 'textarea-resize')
  const ts = [
    <textarea
      {...cleanProps(otherProps)}
      key="t"
      value={value}
      className={className}
      style={{ height: nHeight, maxHeight, overflow: 'auto' }}
      onChange={handleChange}
      onKeyUp={handleKeyUp}
      onBlur={handleBlur}
    />,
    renderInfo(),
  ]

  // 占位 如果autoSize存在 这个textarea固定高度 然后内容超过的时候 出现scrollHeight 这时的scrollHeight就是上面真正textarea的高度
  if (autosize) {
    ts.push(
      <textarea key="s" ref={bindShadow} className={inputClass('shadow')} rows={props.rows} defaultValue={value} />
    )
  }

  return ts
}

Textarea.propTypes = {
  autosize: PropTypes.bool,
  forceChange: PropTypes.func,
  info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
  maxHeight: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func.isRequired,
  onEnterPress: PropTypes.func,
  rows: PropTypes.number,
  value: PropTypes.string,
  resize: PropTypes.bool,
}

Textarea.defaultProps = {
  rows: 4,
  resize: false,
}

export default memo(Textarea)
