import { portalClass } from '@/styles'
import isDOMElement from '@/utils/dom/isDOMElement'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
    show: boolean
    portalClassName?: string
    children: React.ReactNode
    getPopupContainer?: () => HTMLElement
}

const Portal: React.ForwardRefRenderFunction<HTMLDivElement, PortalProps> = function (props, ref) {
    const { portalClassName, children, show, getPopupContainer } = props

    const container = useMemo(() => {
        if (!getPopupContainer) return document.body

        const popupContainer = getPopupContainer ? getPopupContainer() : undefined

        if (isDOMElement(popupContainer)) return popupContainer

        return document.body
    }, undefined)

    const isRender = useRef(false)

    if (!show && !isRender.current) return null

    isRender.current = true

    if (!container) {
        return <>{children}</>
    }

    return ReactDOM.createPortal(
        <div className={classnames(portalClass('_'), portalClassName)} ref={ref}>
            {children}
        </div>,
        container
    )
}

export default React.memo(React.forwardRef(Portal))
