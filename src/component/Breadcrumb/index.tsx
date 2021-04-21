// @ts-nocheck 
import React, { useCallback, memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '@/utils/proptypes'
import { breadcrumbClass } from '@/styles'
import { getKey } from '@/utils/uid'
import Popover from '../Popover'
import Caret from '../icons/Caret'

const Breadcrumb = props => {
  const { data, separator, keygen } = props
  const className = classnames(breadcrumbClass('_'), props.className)

  const renderArray = useCallback(
    arrayData => {
      const first = arrayData[0]

      return (
        <span>
          {renderItem(first)}
          <span className={breadcrumbClass('down')}>
            <Caret />
          </span>
          <Popover position="bottom">
            {arrayData.slice(1).map((d, i) => (
              <div className={breadcrumbClass('dropdown-item')} key={i}>
                {renderItem(d)}
              </div>
            ))}
          </Popover>
        </span>
      )
    },
    [data]
  )

  const renderItem = useCallback(
    d => {
      const { renderItem: propsRenderItem } = props
      let item = d.title
      if (!React.isValidElement(item)) {
        if (d.onClick || d.url) {
          const newProps = {
            onClick: d.onClick,
          }
          if (d.url) newProps.href = d.url
          item = (
            <a {...newProps}>
              {d.icon}
              &nbsp;
              {d.title}
            </a>
          )
        } else {
          // 普通展示文本
          item = <b>{d.title}</b>
        }
      }
      return propsRenderItem ? propsRenderItem(d) : item
    },
    [data, props.renderItem]
  )

  return (
    <div className={className} style={props.style}>
      {data.map((d, index) => (
        <span key={keygen ? getKey(d, keygen, index) : index}>
          {Array.isArray(d) ? renderArray(d) : renderItem(d)}
          {index !== data.length - 1 ? <span className={breadcrumbClass('separator')}>{separator}</span> : null}
        </span>
      ))}
    </div>
  )
}

Breadcrumb.protoTypes = {
  ...getProps(PropTypes),
  data: PropTypes.array,
  renderItem: PropTypes.func,
  separator: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
}

Breadcrumb.defaultProps = {
  ...defaultProps,
  data: [],
  separator: '/',
}

Breadcrumb.displayName = 'EthanBreadcrumb'

export default memo(Breadcrumb)
