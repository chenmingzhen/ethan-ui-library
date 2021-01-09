import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { defaultProps, getProps } from '@/utils/proptypes'
import { modalClass } from '@/styles'
import Icons from '../icons'
import Card from '../Card'
import { Provider } from '../Scroll/context'
import { Provider as ZProvider } from './context'

const setTransformOrigin = (node, value) => {
  const { style } = node
  style.transformOrigin = value
}

let mousePosition = null

const getClickPosition = e => {
  mousePosition = {
    x: e.clientX,
    y: e.clientY,
  }
  setTimeout(() => {
    mousePosition = null
  }, 200)
}

document.addEventListener('click', getClickPosition, true)

export default class Panel extends PureComponent {
  panel = null

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

  // eslint-disable-next-line class-methods-use-this
  lockWheel(event) {
    event.preventDefault()
  }

  updateOrigin() {
    const { position } = this.props

    if (position) return

    const node = this.panel

    setTransformOrigin(node, '')

    if (node) {
      if (mousePosition) {
        const { left, top } = node.getBoundingClientRect()
        const ol = mousePosition.x - left
        const ot = mousePosition.y - top

        setTransformOrigin(node, `${ol}px ${ot}px`)
      } else {
        setTransformOrigin(node, '')
      }
    }
  }

  componentDidMount() {
    this.updateOrigin()

    const { autoFocusButton, id } = this.props

    if (!autoFocusButton) return

    const el = document.querySelector(`#${id}-${autoFocusButton}`)

    if (!el) return

    el.focus()
  }

  componentDidUpdate() {
    this.updateOrigin()
  }

  renderContent() {
    const { children, noPadding, title, type, padding, position, bodyStyle } = this.props

    let style = { padding: noPadding === true ? 0 : padding }
    if (position) style.overflow = 'auto'

    if (bodyStyle) style = Object.assign(style, bodyStyle)

    if (type === 'default') return <Card.Body style={style}>{children}</Card.Body>

    const iconType = type.charAt(0).toUpperCase() + type.slice(1)
    const icon = Icons[iconType]
    return (
      <Card.Body className={modalClass('body')} style={style}>
        {icon && <div className={modalClass('icon')}>{icon}</div>}
        {title && <div className={modalClass('title')}>{title}</div>}
        <div>{children}</div>
      </Card.Body>
    )
  }

  render() {
    const { footer, title, type, onClose, maskCloseAble, position, moveable, resizable, hideClose } = this.props

    const className = classnames(modalClass('panel', type, position), this.props.className)

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
            {title && type === 'default' && <Card.Header className={modalClass('title')}>{title}</Card.Header>}
            {this.renderContent()}
            {footer && (
              <Card.Footer className={modalClass('footer')} align="right">
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
}

Panel.defaultProps = {
  ...defaultProps,
  top: '10vh',
  maskCloseAble: true,
  width: 500,
}
