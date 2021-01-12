import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '@/utils/proptypes'
import { modalClass } from '@/styles'
import Icons from '../icons'
import Card from '../Card'
import { Provider } from '../Scroll/context'
// 用于设置默认zIndex
import { Provider as ZProvider } from './context'

function setTransformOrigin(node, value) {
  const { style } = node
  style.transformOrigin = value
}

let mousePosition = null

// 对Zoom情况做处理 记录点击的位置 从点击点缩放到中心
const getClickPosition = e => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  }
  // 100 无实际意义
  setTimeout(() => {
    mousePosition = null
  }, 100)
}

document.addEventListener('click', getClickPosition, true)

const handleStop = e => e.stopPropagation()

export default class Panel extends PureComponent {
  panel = null

  getShow() {
    const { container } = this.props
    if (container.classList.contains(modalClass('show'))) return true
    return false
  }

  getStyle() {
    const { width, height, top, position, style } = this.props

    return Object.assign(
      {
        position: 'absolute',
      },
      position
        ? {}
        : {
            display: 'inline-flex',
            width,
            height,
            top,
            position: 'relative',
          },
      style || {}
    )
  }

  savePanel = node => {
    this.panel = node
  }

  /**
   * 无作用 考虑去掉此方法
   */
  animate() {
    const { container, position } = this.props
    setTimeout(() => {
      container.classList.add(modalClass('show'))
      if (!position) container.classList.add(modalClass('start'))
    })
  }

  updateOrigin() {
    const { position, zoom } = this.props

    if (position || !zoom) return

    const node = this.panel

    setTransformOrigin(node, '')

    // 控制位置动画
    if (node) {
      if (mousePosition) {
        const { left, top } = node.getBoundingClientRect()

        const ol = mousePosition.x - left
        const ot = mousePosition.y - top

        // 设置transform的中心点 启用start动画
        // 注意 影响的是scale缩放
        // 可以理解origin的设置 对translate是无影响的 该移动多少还是多少
        // 关闭时候执行end scale缩放
        // 没被destroy时  只是动画制造消失的假象，Dom在动画结束后还在中心原处
        setTransformOrigin(node, `${ol}px ${ot}px`)
      } else {
        // 无作用 考虑去掉
        setTransformOrigin(node, '')
      }
    }
  }

  componentDidMount() {
    const { container } = this.props

    this.updateOrigin()
    this.animate()

    const { autoFocusButton, id } = this.props

    if (!autoFocusButton) return
    const el = container.querySelector(`#${id}-${autoFocusButton}`)

    if (!el) return

    el.focus()
  }

  componentDidUpdate() {
    if (this.getShow()) return

    this.updateOrigin()
    this.animate()
  }

  renderIcon() {
    const { type } = this.props

    if (type === 'default') return null

    const iconType = type.charAt(0).toUpperCase() + type.slice(1)

    return Icons[iconType]
  }

  renderTitle(justRenderClassComponent = false) {
    const { from, title } = this.props

    if (!title) return null

    // 对Success Info等做特殊处理
    if (from === 'method') {
      if (justRenderClassComponent) return null

      return <div className={modalClass('title')}>{title}</div>
    }

    const icon = this.renderIcon()

    return (
      <Card.Header className={modalClass('title', icon && 'with-icon')}>
        {icon && <div className={modalClass('icon')}>{icon}</div>}
        {title}
      </Card.Header>
    )
  }

  renderContent() {
    const { children, noPadding, padding, position, bodyStyle, from = null } = this.props

    let style = { padding: noPadding === true ? 0 : padding }
    if (position) style.overflow = 'auto'

    if (bodyStyle) style = Object.assign(style, bodyStyle)

    if (!from || from !== 'method')
      return (
        <Card.Body style={style} onScroll={handleStop}>
          {children}
        </Card.Body>
      )

    const icon = this.renderIcon()

    return (
      <Card.Body className={modalClass('body')} style={style} onScroll={handleStop}>
        {icon && <div className={modalClass('icon')}>{icon}</div>}
        {this.renderTitle()}
        <div>{children}</div>
      </Card.Body>
    )
  }

  render() {
    const { footer, type, onClose, maskCloseAble, position, moveable, zoom, resizable, hideClose, from } = this.props

    const className = classnames(modalClass('panel', type, position, zoom && !moveable && 'zoom'), this.props.className)
    const showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null

    return (
      <ZProvider value>
        <Provider value={{ element: undefined }}>
          <div key="mask" className={modalClass('mask')} onClick={maskCloseAble ? onClose : undefined} />
          <Card
            forwardedRef={this.savePanel}
            moveable={moveable}
            resizable={resizable}
            key="card"
            shadow
            className={className}
            style={this.getStyle()}
          >
            {showClose && (
              <a className={modalClass('close')} onClick={onClose}>
                {Icons.Close}
              </a>
            )}
            {this.renderTitle(true)}
            {this.renderContent()}
            {footer && (
              <Card.Footer className={modalClass('footer', from)} align="right">
                {footer}
              </Card.Footer>
            )}
          </Card>
        </Provider>
      </ZProvider>
    )
  }
}

Panel.displayName = 'EthanModalPanel'

Panel.propTypes = {
  ...getProps(PropTypes),
  footer: PropTypes.any,
  maskCloseAble: PropTypes.bool,
  noPadding: PropTypes.bool,
  onClose: PropTypes.func,
  padding: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  position: PropTypes.oneOf(['left', 'top', 'right', 'bottom']),
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  moveable: PropTypes.bool,
  resizable: PropTypes.oneOfType([PropTypes.bool, PropTypes.object]),
  hideClose: PropTypes.bool,
  from: PropTypes.string,
  zoom: PropTypes.bool,
  container: PropTypes.any,
}

Panel.defaultProps = {
  ...defaultProps,
  top: '10vh',
  maskCloseAble: true,
  width: 500,
}
