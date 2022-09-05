import React, { useRef } from 'react'
import classnames from 'classnames'
import { modalClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import { stopPropagation } from '@/utils/func'
import Card from '../Card'
import { ModalPanelProps } from './type'
import Icons from '../icons'

const Panel: React.FC<ModalPanelProps> = props => {
    const {
        maskCloseAble,
        onClose,
        moveable,
        resizable,
        position,
        type,
        zoom,
        className,
        width,
        height,
        top,
        hideClose,
        title,
        padding,
        bodyStyle,
        children,
        footer,
        from,
        style: propStyle,
    } = props

    const cardDomRef = useRef<HTMLDivElement>()

    const ms = classnames(modalClass('panel', type, position, zoom && !moveable && 'zoom'), className)

    function buildStyle() {
        const style: React.CSSProperties = { position: 'absolute' }

        if (!position) {
            Object.assign(style, {
                width,
                height,
                top,
                position: 'relative',
            })
        }

        if (resizable) {
            Object.assign(style, { left: '50%', marginLeft: '-15%' })
        }

        if (propStyle) {
            Object.assign(style, propStyle)
        }

        return style
    }

    function renderIcon() {
        if (type === 'default') return null

        const iconType = type.charAt(0).toUpperCase() + type.slice(1)

        return Icons[iconType]
    }

    function renderTitle(justRenderClassComponent = false) {
        if (isEmpty(title)) return null

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

    function renderContent() {
        const contentStyle: React.CSSProperties = { padding }

        if (position) contentStyle.overflow = 'auto'

        if (bodyStyle) Object.assign(contentStyle, bodyStyle)

        if (from === 'method') {
            const icon = renderIcon()

            return (
                <Card.Body className={modalClass('body')} style={contentStyle} onScroll={stopPropagation}>
                    {icon && <div className={modalClass('icon')}>{icon}</div>}

                    {renderTitle()}

                    <div>{children}</div>
                </Card.Body>
            )
        }

        return (
            <Card.Body style={contentStyle} onScroll={stopPropagation}>
                {children}
            </Card.Body>
        )
    }

    function renderFooter() {
        if (!footer) return null

        return (
            <Card.Footer className={modalClass('footer', from)} align="right">
                {footer}
            </Card.Footer>
        )
    }

    return (
        <>
            <div key="mask" className={modalClass('mask')} onClick={maskCloseAble ? onClose : undefined} />
            <Card
                forwardedRef={cardDomRef}
                moveable={moveable}
                resizable={resizable}
                key="card"
                shadow
                className={ms}
                style={buildStyle()}
            >
                {!hideClose && (
                    <a className={modalClass('close')} onClick={onClose}>
                        {Icons.Close}
                    </a>
                )}

                {renderTitle(true)}

                {renderContent()}

                {renderFooter()}
            </Card>
        </>
    )
}

Panel.defaultProps = {
    width: 500,
    top: '10vh',
    type: 'default',
}

export default React.memo(Panel)
