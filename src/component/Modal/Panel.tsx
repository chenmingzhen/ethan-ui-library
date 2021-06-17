import React, { useMemo, useEffect } from 'react'
import classnames from 'classnames'
import { modalClass } from '@/styles'
import Icons from '../icons'
import Card from '../Card'
import { mousePosition, setTransformOrigin, handleStop } from './util'

interface ModalPanelProps {
    autoFocusButton?: boolean
    /* ModalBody拓展样式 */
    bodyStyle?: React.CSSProperties
    className?: string
    /* 渲染的目标节点 */
    container?: HTMLElement
    /* 关闭时是否销毁元素 */
    destroy?: boolean
    /* 是否支持esc关闭 */
    esc?: boolean
    /* 外层元素所接受的事件列表，可用于在 createPortal 场景中阻止冒泡 */
    events?: any
    /* 底部内容 */
    footer?: React.ReactNode
    /* 内部使用 */
    from: string
    /* 是否隐藏关闭按钮 */
    hideClose?: boolean
    id?: number
    /* 遮罩背景色，设置后透明度将失效 */
    maskBackground?: string
    /* 点击遮罩层是否关闭对话框 */
    maskCloseAble?: boolean
    /* 遮罩层透明度 */
    maskOpacity?: number
    /* 是否可移动 */
    moveable?: boolean
    noPadding?: boolean
    /* 模态框关闭回调 */
    onClose?(): void
    /* 内容内边距 */
    padding?: number
    /* 弹出位置 */
    position?: 'top' | 'right' | 'bottom' | 'left'
    /* 是否可调整大小 */
    resizable?: boolean
    /* Modal 的根元素类名, 为遮罩层的父元素 */
    rootClassName?: string
    /* 最外层扩展样式 */
    style?: React.CSSProperties
    /* 弹出层的标题 */
    title?: string
    /* Modal距离顶部的位置 */
    top?: string
    /* Modal title 显示状态icon */
    type?: 'info' | 'success' | 'warning' | 'error' | 'normal' | 'default'
    /* 为 true 时，使用 ReactDOM.createPortal 创建弹出层，为 false 时，使用 ReactDOM.render */
    usePortal?: boolean
    /* 是否显示 */
    visible?: boolean
    /* 对话框宽度 */
    width?: number
    /* 对话框高度 */
    height?: number
    /* 层级 */
    zIndex: number
    /* 是否开启 zoom 动画效果 */
    zoom: boolean
}

const ModalPanel: React.FC<ModalPanelProps> = props => {
    const cardRef = React.useRef<HTMLDivElement>()

    const isShow = useMemo(() => {
        const { container } = props

        if (container.classList.contains(modalClass('show'))) return true

        return false
    }, [props.container])

    const style = useMemo(() => {
        const { width = 500, height, top = '10vh', position, style: rawStyle, resizable } = props

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
            rawStyle || {}
        )
    }, [props.width, props.height, props.top, props.position, props.style])

    const animate = () => {
        const { container, position } = props

        requestAnimationFrame(() => {
            container.classList.add(modalClass('show'))

            if (!position) container.classList.add(modalClass('start'))
        })
    }

    const updateOrigin = () => {
        const { position, zoom } = props

        if (position || !zoom) return

        const node = cardRef.current

        setTransformOrigin(node, '')

        // 控制位置动画
        if (node && mousePosition.x !== undefined && mousePosition.y !== undefined) {
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

    useEffect(() => {
        const { container, autoFocusButton, id } = props

        if (isShow) return

        updateOrigin()

        animate()

        if (autoFocusButton) {
            const el = container.querySelector(`#${id}-${autoFocusButton}`) as HTMLElement

            el?.focus()
        }
    }, [props])

    const renderIcon = () => {
        const { type = 'default' } = props

        if (type === 'default') return null

        const iconType = type.charAt(0).toUpperCase() + type.slice(1)

        return Icons[iconType]
    }

    const renderTitle = (justRenderClassComponent = false) => {
        const { from, title } = props

        if (!title) return null

        // 对Success Info等做特殊处理
        if (from === 'method') {
            if (justRenderClassComponent) return null

            return <div className={modalClass('title')}>{title}</div>
        }

        const icon = renderIcon()

        return (
            <Card.Header className={modalClass('title', icon && 'with-icon')}>
                {icon && <div className={modalClass('icon')}>{icon}</div>}
                {title}
            </Card.Header>
        )
    }

    const renderContent = () => {
        const { children, noPadding, padding, position, bodyStyle, from = null } = props

        let newStyle: React.CSSProperties = { padding: noPadding === true ? 0 : padding }

        if (position) newStyle.overflow = 'auto'

        if (bodyStyle) newStyle = Object.assign(newStyle, bodyStyle)

        if (!from || from !== 'method')
            return (
                <Card.Body style={newStyle} onScroll={handleStop}>
                    {children}
                </Card.Body>
            )

        const icon = renderIcon()

        return (
            <Card.Body className={modalClass('body')} style={newStyle} onScroll={handleStop}>
                {icon && <div className={modalClass('icon')}>{icon}</div>}
                {renderTitle()}
                <div>{children}</div>
            </Card.Body>
        )
    }

    const { footer, type, onClose, maskCloseAble = true, position, moveable, zoom, resizable, hideClose, from } = props

    const className = classnames(modalClass('panel', type, position, zoom && !moveable && 'zoom'), props.className)
    const showClose = typeof hideClose === 'boolean' ? !hideClose : maskCloseAble || maskCloseAble === null

    return (
        <>
            <div key="mask" className={modalClass('mask')} onClick={maskCloseAble ? onClose : undefined} />
            <Card
                forwardedRef={cardRef}
                moveable={moveable}
                resizable={resizable}
                key="card"
                shadow
                className={className}
                style={style}
            >
                {showClose && (
                    <a className={modalClass('close')} onClick={onClose}>
                        {Icons.Close}
                    </a>
                )}
                {renderTitle(true)}
                {renderContent()}
                {footer && (
                    <Card.Footer className={modalClass('footer', from)} align="right">
                        {footer}
                    </Card.Footer>
                )}
            </Card>
        </>
    )
}

ModalPanel.displayName = 'EthanModalPanel'

export default React.memo(ModalPanel)
