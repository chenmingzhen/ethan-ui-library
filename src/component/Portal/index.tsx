import { portalClass } from '@/styles'
import isDOMElement from '@/utils/dom/isDOMElement'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
    portal?: boolean
    rootClass?: string
    children: React.ReactNode
    /** @deprecated 改用getPopupContainer */
    getContainer?: () => HTMLElement
    getPopupContainer?: () => HTMLElement
    show: boolean
}

/** 一般情况，使用portal就可以满足大部分的场景，portal就渲染在document.body上，否则就在原来的位置渲染 */
const Portal: React.ForwardRefRenderFunction<HTMLDivElement, PortalProps> = function (props, ref) {
    const { portal, rootClass, children, getContainer, show, getPopupContainer } = props

    const container = useMemo(() => {
        const propContainer = getPopupContainer ? getPopupContainer() : getContainer ? getContainer() : undefined

        if (isDOMElement(propContainer)) return propContainer
        if (!portal) return undefined
        return document.body
    }, undefined)

    const isRender = useRef(false)

    if (!show && !isRender.current) return null

    isRender.current = true

    if (!container) {
        return <>{children}</>
    }

    return ReactDOM.createPortal(
        <div className={classnames(portalClass('_'), rootClass)} ref={ref}>
            {children}
        </div>,
        container
    )
}

export default React.memo(React.forwardRef(Portal))
