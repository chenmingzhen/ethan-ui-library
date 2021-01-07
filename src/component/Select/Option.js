import React, { useMemo, useCallback, useRef } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { selectClass } from '@/styles'
import { isObject } from '@/utils/is'
import icons from '../icons'

function Options(props) {
  const { data, isActive, index, renderItem, isHover, disabled, groupKey } = props

  const isGroupTitle = useMemo(() => data[groupKey], [data, groupKey])

  const className = useMemo(
    () =>
      classnames(
        selectClass(
          'option',
          isActive && 'active',
          isHover && 'hover',
          disabled && 'disabled',
          isGroupTitle && 'group'
        ),
        `option-${index}`
      ),
    [isActive, isHover, disabled, isGroupTitle]
  )

  const result = useMemo(() => (isGroupTitle ? data[groupKey] : renderItem(data, index)), [
    isGroupTitle,
    data,
    groupKey,
    renderItem,
    index,
  ])

  const locked = useRef(false)

  const title = typeof result === 'string' ? result : ''

  const handleClick = useCallback(() => {
    const { onClick } = props
    if (locked.current || disabled || data[groupKey]) return
    locked.current = true

    onClick(!isActive, data, index)

    setTimeout(() => {
      locked.current = false
    }, 200)
  }, [locked.current, disabled, data, groupKey, props.onClick, index])

  const handleEnter = useCallback(() => {
    props.onHover(props.index)
  }, [props])

  if (isObject(data) && result === data) {
    console.warn('renderItem is essential when data element is Object')
  }

  return (
    <a tabIndex={-1} onClick={handleClick} onMouseEnter={handleEnter} className={className} title={title}>
      {result}
      {isActive && icons.Check}
    </a>
  )
}

Options.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
  disabled: PropTypes.bool,
  index: PropTypes.number,
  isActive: PropTypes.bool,
  isHover: PropTypes.bool,
  onClick: PropTypes.func,
  onHover: PropTypes.func.isRequired,
  renderItem: PropTypes.func.isRequired,
  groupKey: PropTypes.string,
}

export default Option
