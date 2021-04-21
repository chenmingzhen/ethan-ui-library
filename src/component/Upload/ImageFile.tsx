// @ts-nocheck 
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import { uploadClass } from '@/styles'
import Progress from '../Progress'
import Image from '../Image'
import { ERROR } from './utils/request'

const ImageFile = props => {
  const { process, status, style, data, message, onRemove, id } = props
  const className = uploadClass('image-item', status === ERROR && 'error')

  const handleRemove = () => {
    onRemove(id)
  }

  return (
    <div style={style} className={className}>
      {data && <Image src={data} fit="center" width="auto" height={0} className={uploadClass('image-bg')} />}

      {message && <div className={uploadClass('message')}>{message}</div>}

      <span className={uploadClass('delete')} onClick={handleRemove} />

      <div className={uploadClass('progress-bg')}>
        <Progress
          className={uploadClass('progress')}
          color="#f2f2f2"
          background="rgba(0,0,0,0.5)"
          value={process}
          strokeWidth={2}
        />
      </div>
    </div>
  )
}

ImageFile.propTypes = {
  id: PropTypes.string,
  message: PropTypes.string,
  onRemove: PropTypes.func,
  process: PropTypes.number,
  status: PropTypes.number,
  style: PropTypes.object,
  data: PropTypes.string,
}

export default memo(ImageFile)
