import React, { useMemo, useEffect } from 'react'
import classnames from 'classnames'
import { modalClass } from '@/styles'
import Icons from '../icons'
import Card from '../Card'
import { mousePosition, setTransformOrigin, handleStop } from './util'
import ModalProps from './type'

export interface ModalPanelProps extends ModalProps {
    id?: string

    noPadding?: boolean

    container: HTMLElement

    children: React.ReactNode
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

    const updateOrigin = () => {
        const { position, zoom } = props

        if (position || !zoom) return

        const node = cardRef.current

        setTransformOrigin(node, '')

        // 控制位置动画
        if (node && mousePosition.x !== undefined && mousePosition.y !== undefined) {
            const { left, top } = node.getBoundingClientRect()

            // TODO getBoundingClientRect获取的值不准确 马上获取时为偏大 设置定时任务时却正常
            // 导致缩放的点不正确

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
