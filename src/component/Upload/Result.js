import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '@/styles'
import icons from '../icons'

const Result = props => {
  const { renderResult, value, recoverAble, showRecover, onRemove, onRecover, index } = props
  const className = uploadClass('view-value', recoverAble && 'to-be-delete')

  const handleRemove = () => {
    onRemove(index)
  }

  const handleRecover = () => {
    onRecover(index, value)
  }

  return (
    <div className={className}>
      <div className={uploadClass('text')}>{renderResult(value)}</div>

      {onRemove && (
        <a className={uploadClass('delete')} onClick={handleRemove}>
          {icons.Close}
        </a>
      )}

      {showRecover && (
        <a className={uploadClass('recover')} onClick={handleRecover}>
          {icons.Recovery}
        </a>
      )}
    </div>
  )
}

Result.propTypes = {
  index: PropTypes.number,
  onRemove: PropTypes.func,
  onRecover: PropTypes.func,
  recoverAble: PropTypes.bool,
  renderResult: PropTypes.func,
  showRecover: PropTypes.bool,
  value: PropTypes.any,
}

Result.defaultProps = {
  renderResult: a => a,
  recoverAble: false,
}

export default memo(Result)
