import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '@/utils/proptypes'
import { iconClass } from '@/styles'

function Icon(props) {
  const { children, prefix, type, name, fontFamily, fontSize, ext, ...other } = props
  const className = classnames(iconClass('_', type), props.className, `${prefix}-${name}`)
  const style = Object.assign({}, { fontFamily, fontSize }, props.style)

  if (ext === 'js') {
    // https://developer.mozilla.org/zh-CN/docs/Web/Accessibility/ARIA/ARIA_Techniques/%E4%BD%BF%E7%94%A8aria-hidden%E5%B1%9E%E6%80%A7
    // aria-hidden 把 aria-hidden="true" 加到元素上会把该元素和它的所有子元素从可访问性树上移除。
    return (
      <i {...other} className={className} style={style}>
        <svg className={iconClass('svg')} aria-hidden="true">
          <use xlinkHref={`#${prefix}-${name}`} />
        </svg>
      </i>
    )
  }

  return (
    <i {...other} className={className} style={style}>
      {children}
    </i>
  )
}

Icon.propTypes = {
  ...getProps(PropTypes, 'size', 'type'),
  prefix: PropTypes.string,
  name: PropTypes.string,
  fontFamily: PropTypes.string,
  fontSize: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
}

Icon.defaultProps = {
  ...defaultProps,
  prefix: 'icon',
  fontFamily: 'iconfont',
  name: '',
  type: 'default',
}

Icon.displayName = 'EthanIcon'
export default memo(Icon)
