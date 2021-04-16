import React, { memo, useState } from 'react'
import PropTypes from 'prop-types'
import { cascaderClass } from '@/styles'
import { getParent } from '@/utils/dom/element'
import { checkInputClass } from '@/styles'
import Checkbox from '../Checkbox'
import Spin from '../Spin'
import Caret from '../icons/Caret'

const checkBoxStyle = { marginRight: 8, marginTop: -1, verticalAlign: 'top' }

const Node = props => {
  const [loading, setLoading] = useState(false)
  const {
    active,
    data,
    multiple,
    datum,
    id,
    loader,
    expandTrigger,
    childrenKey,
    disabled,
    onChange,
    onPathChange,
    path,
    renderItem,
  } = props

  const checkDisabled = () => {
    if (disabled) return true

    return datum.isDisabled(id)
  }

  const handleClick = () => {
    onPathChange(id, data, path)

    if (!multiple) {
      onChange([...path, id], datum.getDataById(id))
    }

    if (loader && !loading) {
      setLoading(true)
      loader(id, data)
    }
  }

  const handlePathChange = () => {
    onPathChange(id, data, path)
  }

  const handleSelect = e => {
    if (getParent(e.target, `.${checkInputClass('_')}`)) return

    const checked = datum.getChecked(id)
    handleChange(null, !checked)
  }

  const handleChange = (_, checked) => {
    datum.set(id, checked ? 1 : 0)
    // 这里驱动Value的改变，对应inputable的handleChange line264
    onChange(datum.getValue(), datum.getDataById(id))
  }

  const renderContent = () => {
    const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]
    return render(data, active, id)
  }
  // ---------------------------------------render----------------------------------------

  const children = data[childrenKey]
  const hasChildren = children && children.length > 0
  // 动态加载children数据
  const mayChildren = loader && !loading && children === undefined
  const className = cascaderClass(
    'node',
    active && 'active',
    checkDisabled() && 'disabled',
    hasChildren && 'has-children',
    mayChildren && 'may-be-children'
  )

  const style = {}

  const events = {}

  if (!checkDisabled() && (expandTrigger !== 'hover-only' || !children || children.length === 0)) {
    events.onClick = handleClick
    style.cursor = 'pointer'
  }
  if (expandTrigger === 'hover' || expandTrigger === 'hover-only') {
    events.onMouseEnter = handlePathChange
    if (multiple) events.onClick = handleSelect
  }
  const caret = (
    <span className={cascaderClass('caret')}>
      <Caret />
    </span>
  )

  return (
    <div className={className} style={style} {...events}>
      {multiple && (
        <Checkbox
          checked={datum.getChecked(id)}
          disabled={checkDisabled()}
          onChange={handleChange}
          style={checkBoxStyle}
        />
      )}
      {renderContent()}
      {loading && children === undefined && <Spin className={cascaderClass('loading')} size={10} name="ring" />}
      {(hasChildren || mayChildren) && caret}
    </div>
  )
}

Node.propTypes = {
  active: PropTypes.bool,
  data: PropTypes.object,
  datum: PropTypes.object,
  disabled: PropTypes.bool,
  expandTrigger: PropTypes.string,
  id: PropTypes.string,
  loader: PropTypes.func,
  multiple: PropTypes.bool,
  onChange: PropTypes.func,
  onPathChange: PropTypes.func,
  path: PropTypes.array,
  renderItem: PropTypes.oneOfType([PropTypes.func, PropTypes.string]).isRequired,
  childrenKey: PropTypes.string,
}

export default memo(Node)
