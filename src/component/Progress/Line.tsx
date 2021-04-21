// @ts-nocheck 
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { progressClass } from '@/styles'
import analyzeColor from './analyzeColor'

const Line = ({ children, strokeWidth, type, value, color, style, background, className }) => {
  const ClassName = classnames(progressClass('line', type), className)

  const innerStyle = {
    width: `${(value / 100) * 100}%`,
    borderRadius: strokeWidth / 2,
  }

  if (typeof color === 'string') {
    innerStyle.background = color
    innerStyle.backgroundSize = '1em 1em'
  } else if (typeof color === 'object') {
    innerStyle.background = `linear-gradient(to right,${analyzeColor(color).reduce((p, v) => {
      const col = `${v.color} ${v.pos}`

      // ""?console.log(1):console.log(2) output:2

      return p ? `${p},${col}` : col
    }, '')})`
  }

  return (
    <div className={ClassName} style={style}>
      <div
        className={progressClass('background')}
        style={{ height: strokeWidth, background, borderRadius: strokeWidth / 2 }}
      >
        <div className={progressClass('front')} style={innerStyle} />
      </div>
      {children !== undefined && <div className={progressClass('content')}>{children}</div>}
    </div>
  )
}

Line.propTypes = {
  background: PropTypes.string,
  children: PropTypes.any,
  className: PropTypes.string,
  color: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  strokeWidth: PropTypes.number,
  style: PropTypes.object,
  type: PropTypes.oneOf(['success', 'info', 'warning', 'error', 'danger']),
  value: PropTypes.number,
}

Line.defaultProps = {
  strokeWidth: 8,
}

export default Line
