import React, { memo, useCallback } from 'react'
import PropTypes from 'prop-types'
import { paginationClass } from '@/styles'
import Select from '../Select'

const PageSizeList = props => {
  const { current, onChange, pageSize, pageSizeList, text, disabled, size, sizeListProps = {} } = props

  const handleChange = useCallback(
    tPageSize => {
      const start = (current - 1) * pageSize + 1

      onChange(Math.ceil(start / tPageSize), tPageSize)
    },
    [current, onChange, pageSize]
  )

  return (
    <Select
      onChange={handleChange}
      disabled={disabled}
      absolute
      autoAdapt
      keygen
      value={pageSize}
      size={size}
      className={paginationClass('section', 'pagesize')}
      data={pageSizeList}
      renderItem={d => `${d} ${text.page || ''}`}
      {...sizeListProps}
    />
  )
}

PageSizeList.propTypes = {
  current: PropTypes.number.isRequired,
  disabled: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  pageSize: PropTypes.number.isRequired,
  pageSizeList: PropTypes.array,
  text: PropTypes.object.isRequired,
  size: PropTypes.string,
  sizeListProps: PropTypes.object,
}

PageSizeList.defaultProps = {
  pageSizeList: [10, 20, 30, 50, 100],
}

export default memo(PageSizeList)
