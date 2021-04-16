import React, { memo, useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useUpdateEffect } from 'ethan-use-hooks'
import Pagination from './Pagination'

const Index = props => {
  const [current, setCurrent] = useState(props.current || props.defaultCurrent)
  const [pageSize, setPageSize] = useState(props.pageSize)

  useUpdateEffect(() => {
    setCurrent(props.current)
    setPageSize(props.pageSize)
  }, [props.current, props.pageSize])

  const handleChange = useCallback(
    (tCurrent, tPageSize = pageSize) => {
      const sizeChange = tPageSize !== pageSize
      setCurrent(tCurrent)
      setPageSize(tPageSize)

      props.onChange && props.onChange(tCurrent, tPageSize, sizeChange)
    },
    [props.pageSize, pageSize]
  )

  if (props.total < 0) return null

  return <Pagination {...props} current={current} pageSize={pageSize} onChange={handleChange} />
}

Index.propTypes = {
  current: PropTypes.number,
  defaultCurrent: PropTypes.number,
  onChange: PropTypes.func,
  pageSize: PropTypes.number,
  total: PropTypes.number,
}

Index.defaultProps = {
  defaultCurrent: 1,
  pageSize: 10,
  total: 0,
}

export default memo(Index)
