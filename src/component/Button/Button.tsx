// @ts-nocheck 
import React, { isValidElement } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getProps, defaultProps } from '@/utils/proptypes'
import { wrapSpan } from '@/utils/dom/element'
import { buttonClass } from '@/styles'
import Spin from '../Spin'

class Button extends PureComponent {
  getChildren() {
    const { children, loading } = this.props
    if (!children) return children
    const parsed = React.Children.map(wrapSpan(children), item => {
      // 对 loading情况做处理 如果是loading 去除Icon
      if (loading && isValidElement(item) && item?.type?.isEthanIcon) return null
      return item
    }).filter(v => v !== null)
    return parsed
  }

  render() {
    const {
      outline: outlineProp,
      type: typeProp,
      size,
      href,
      htmlType,
      loading,
      disabled,
      onRef,
      shape,
      text,
      ...others
    } = this.props
    // 区分 type为secondary的类型  secondary底色为透明
    const isSecondary = typeProp === 'secondary' && !outlineProp && !text
    const type = isSecondary ? 'primary' : typeProp
    const outline = outlineProp || isSecondary
    const color = outline || type === 'default' ? undefined : '#fff'
    const className = classnames(
      buttonClass('_', shape, type, outline && 'outline', {
        large: size === 'large',
        small: size === 'small',
        text: text && 'text',
        disabled,
      }),
      this.props.className
    )

    // 链接按钮
    if (href) {
      return (
        <a href={href} {...others} className={className}>
          {this.props.children}
        </a>
      )
    }

    const children = this.getChildren()
    return (
      // eslint-disable-next-line
      <button {...others} ref={onRef} disabled={disabled || loading} type={htmlType} className={className}>
        {loading && (
          <span className={buttonClass('spin')}>
            <Spin size={12} name="ring" color={color} />
          </span>
        )}
        {children}
      </button>
    )
  }
}

Button.propTypes = {
  ...getProps(PropTypes, 'disabled', 'size', 'type'),
  children: PropTypes.any,
  href: PropTypes.string,
  htmlType: PropTypes.string,
  loading: PropTypes.bool,
  onRef: PropTypes.func,
  shape: PropTypes.oneOf(['round', 'circle']),
  outline: PropTypes.bool,
  text: PropTypes.bool,
}

Button.defaultProps = {
  ...defaultProps,
  htmlType: 'button',
  outline: false,
  type: 'default',
}

export default Button
