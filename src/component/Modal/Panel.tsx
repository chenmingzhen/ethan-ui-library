import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { modalClass } from '@/styles'
import Icons from '../icons'
import Card from '../Card'
import ModalProps from './type'

export interface ModalPanelProps extends ModalProps {
    id?: string

    noPadding?: boolean

    container: HTMLElement

    children: React.ReactNode
}

let mousePosition = null

function setTransformOrigin(node: HTMLElement, value) {
    const { style } = node

    style.transformOrigin = value
}

function handleStop(e) {
    e.stopPropagation()
}

// 对Zoom情况做处理 记录点击的位置 从点击点缩放到中心
// https://github.com/ant-design/ant-design/blob/master/components/modal/Modal.tsx

function getClickPosition(e: MouseEvent) {
    mousePosition = {
        x: e.clientX,
        y: e.clientY,
    }

    setTimeout(() => {
        mousePosition = null
    }, 100)
}

document.addEventListener('click', getClickPosition, true)

class ModalPanel extends PureComponent<ModalPanelProps> {
    cardRef = React.createRef<HTMLDivElement>()

    get show() {
        const { container } = this.props

        if (container.classList.contains(modalClass('show'))) return true

        return false
    }

    get style() {
        const { width = 500, height, top = '10vh', position, style, resizable } = this.props

        return Object.assign(
            {
                position: 'absolute',
            },
            position
                ? {}
                : {
                      width,
                      height,
                      top,
                      position: 'relative',
                  },
            resizable ? { left: '50%', marginLeft: '-15%' } : {},
            style || {}
        )
    }

    renderIcon = () => {
        const { type = 'default' } = this.props

        if (type === 'default') return null

        const iconType = type.charAt(0).toUpperCase() + type.slice(1)

        return Icons[iconType]
    }

    renderTitle = (justRenderClassComponent = false) => {
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

    renderContent = () => {
        const { children, noPadding, padding, position, bodyStyle, from = null } = this.props

        let newStyle: React.CSSProperties = { padding: noPadding === true ? 0 : padding }

        if (position) newStyle.overflow = 'auto'

        if (bodyStyle) newStyle = Object.assign(newStyle, bodyStyle)

        if (!from || from !== 'method')
            return (
                <Card.Body style={newStyle} onScroll={handleStop}>
                    {children}
                </Card.Body>
            )

        const icon = this.renderIcon()

        return (
            <Card.Body className={modalClass('body')} style={newStyle} onScroll={handleStop}>
                {icon && <div className={modalClass('icon')}>{icon}</div>}
                {this.renderTitle()}
                <div>{children}</div>
            </Card.Body>
        )
    }

    render = () => {
        const {
            footer,
            type,
            onClose,
            maskCloseAble = true,
            position,
            moveable,
            zoom,
            resizable,
            hideClose,
            from,
        } = this.props

        const className = classnames(
            modalClass('panel', type, position, zoom && !moveable && 'zoom'),
            this.props.className
        )
        const showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null

        return (
            <>
                <div key="mask" className={modalClass('mask')} onClick={maskCloseAble ? onClose : undefined} />
                <Card
                    forwardedRef={this.cardRef}
                    moveable={moveable}
                    resizable={resizable}
                    key="card"
                    shadow
                    className={className}
                    style={this.style}
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
            </>
        )
    }

    componentDidMount = () => {
        const { container, autoFocusButton, id } = this.props

        this.updateOrigin()

        this.animate()

        if (autoFocusButton) {
            const el = container.querySelector(`#${id}-${autoFocusButton}`) as HTMLElement

            el?.focus()
        }
    }

    componentDidUpdate = () => {
        if (this.show) return

        this.updateOrigin()

        this.animate()
    }

    updateOrigin = () => {
        const { position, zoom } = this.props

        if (position || !zoom) return

        const node = this.cardRef.current

        setTransformOrigin(node, '')

        // 控制位置动画
        if (node && mousePosition) {
            const { left, top } = node.getBoundingClientRect()

            const ol = mousePosition.x - left

            const ot = mousePosition.y - top

            // 设置transform的中心点 启用start动画
            // 注意 影响的是scale缩放
            // 可以理解origin的设置 对translate是无影响的 该移动多少还是多少
            // 关闭时候执行end scale缩放
            // 没被destroy时  只是动画制造消失的假象，Dom在动画结束后还在中心原处
            setTransformOrigin(node, `${ol}px ${ot}px`)
        }
    }

    animate = () => {
        const { container, position } = this.props

        setTimeout(() => {
            container.classList.add(modalClass('show'))

            if (!position) container.classList.add(modalClass('start'))
        })
    }
}

export default ModalPanel
