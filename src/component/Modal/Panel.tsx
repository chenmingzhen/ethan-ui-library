import React from 'react'
import classnames from 'classnames'
import { modalClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import { stopPropagation } from '@/utils/func'
import { styles } from '@/utils/style/styles'
import Card from '../Card'
import { ModalPanelProps } from './type'
import Icons from '../icons'

const Panel: React.ForwardRefRenderFunction<HTMLDivElement, ModalPanelProps> = (props, ref) => {
    const {
        maskCloseAble,
        onClose,
        moveable = false,
        resizable,
        position,
        type = 'default',
        width = 599,
        height,
        top = '10vh',
        hideClose,
        title,
        padding,
        bodyStyle,
        children,
        footer,
        from,
        style: propStyle,
        className,
        zIndex,
        rootClassName,
        maskStyle,
        maskClassName,
    } = props

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
        const contentStyle = styles({ padding }, position && { overflow: 'auto' }, bodyStyle)

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

    const maskMs = styles({ background: `rgba(0,0,0,25%)` }, maskStyle)
    const maskCls = modalClass('mask', maskClassName)

    return (
        <div
            ref={ref}
            style={{ zIndex }}
            className={classnames(modalClass(position && 'position'), className, rootClassName)}
        >
            <div className={maskCls} onClick={maskCloseAble ? onClose : undefined} style={maskMs} />
            <Card
                shadow
                moveable={moveable}
                style={buildStyle()}
                resizable={resizable}
                className={classnames(modalClass('panel', type, position, moveable && 'moveable'))}
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
        </div>
    )
}

export default React.memo(React.forwardRef(Panel))
