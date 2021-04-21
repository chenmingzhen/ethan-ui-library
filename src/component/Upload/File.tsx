// @ts-nocheck 
import React, { memo, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '@/styles'
import Progress from '../Progress'
import Spin from '../Spin'
import icons from '../icons'
import { ERROR, UPLOADING } from './utils/request'

const useSpin = () =>
  useMemo(
    () => (
      <span style={{ display: 'inline-block', marginRight: 8 }}>
        <Spin size={10} name="ring" />
      </span>
    ),
    []
  )

const File = props => {
  const { id, message, name, onRemove, process, status } = props

  const handleRemove = useCallback(() => {
    onRemove(id)
  }, [onRemove, id])
  const SPIN = useSpin()

  const className = uploadClass('view-file', status === ERROR && 'error')

  return (
    <div className={className}>
      <div className={uploadClass('text')}>
        {status === UPLOADING && SPIN} {name} {message && <span>({message}) </span>}
      </div>
      <a className={uploadClass('delete')} onClick={handleRemove}>
        {icons.Close}
      </a>
      {status !== ERROR && (
        <Progress
          className={uploadClass('progress')}
          background={process >= 0 ? '#e9ecef' : 'transparent'}
          value={process}
          strokeWidth={2}
        />
      )}
    </div>
  )
}

File.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  name: PropTypes.string,
  onRemove: PropTypes.func,
  process: PropTypes.number,
  status: PropTypes.number,
}

export default memo(File)
