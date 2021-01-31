import React, { useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { inputClass, selectClass, cascaderClass } from '@/styles'

const Result = props => {
  const {
    style,
    value,
    placeholder,
    datum,
    renderItem,
    renderResult,
    compressed,
    multiple,
    clearable,
    disabled,
    onClear,
  } = props

  const handleNodeClick = id => {
    const { path } = props.datum.getPath(id)
    props.onPathChange(id, null, path)
  }

  const renderPlaceholder = useCallback(
    () => (
      <span key="placeholder" className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
        {placeholder}
        &nbsp;
      </span>
    ),
    [placeholder]
  )

  // eslint-disable-next-line no-underscore-dangle
  const _renderResult = () => {
    const nodes = value.map(v => datum.getDataById(v))
    let render = renderResult || renderItem
    if (typeof render === 'string') {
      const copyRender = render
      render = n => n[copyRender]
    }

    const neededResult = compressed ? nodes.slice(0, 1) : nodes
    const items = neededResult.map((n, i) => {
      const res = n && render(n, nodes)
      if (!res) return null
      return (
        <a tabIndex={-1} className={cascaderClass('item')} onClick={handleNodeClick.bind(null, value[i])} key={i}>
          {res}
        </a>
      )
    })

    if (compressed && nodes.length > 1) {
      items.push(
        <a tabIndex={-1} key={items.length} className={cascaderClass('item', 'item-compressed')}>
          <span>{`+${nodes.length - 1}`}</span>
        </a>
      )
    }

    if (items.filter(v => v).length === 0) {
      items.push(renderPlaceholder())
    }

    return items
  }

  const renderClear = () => {
    const className = classnames(selectClass('indicator', 'close'), cascaderClass('close'))

    if (clearable && value.length > 0 && !disabled) {
      // eslint-disable-next-line jsx-a11y/anchor-has-content
      return <a tabIndex={-1} className={className} onClick={onClear} />
    }

    return null
  }

  const result = value.length === 0 ? renderPlaceholder() : _renderResult()

  return (
    <div className={cascaderClass('result')} style={style}>
      {result}
      {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
      {!multiple && <a tabIndex={-1} className={selectClass('indicator', 'caret')} />}
      {renderClear()}
    </div>
  )
}

Result.propTypes = {
  clearable: PropTypes.bool,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  multiple: PropTypes.bool,
  onClear: PropTypes.func,
  onPathChange: PropTypes.func,
  placeholder: PropTypes.any,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  renderResult: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
  style: PropTypes.object,
  value: PropTypes.array,
  compressed: PropTypes.bool, // 将选中值合并
}

Result.defaultProps = {
  value: [],
}

export default memo(Result)
