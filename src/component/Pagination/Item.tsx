// @ts-nocheck 
import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { paginationClass } from '@/styles'

const Item = props => {
  const { page, onClick, children, isCurrent, disabled } = props

  const handleClick = useCallback(() => {
    onClick(page)
  }, [onClick, page])

  const className = useMemo(() => paginationClass('item', props.className, isCurrent && 'current'), [
    props.className,
    isCurrent,
  ])

  return (
    <a className={className} disabled={disabled || isCurrent} onMouseDown={handleClick}>
      {children}
    </a>
  )
}

Item.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  disabled: PropTypes.bool,
  isCurrent: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
}

Item.defaultProps = {
  disabled: false,
  isCurrent: false,
}

export default memo(Item)
