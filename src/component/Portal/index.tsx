import { portalClass } from '@/styles'
import isDOMElement from '@/utils/dom/isDOMElement'
import { runInNextFrame } from '@/utils/nextFrame'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
    portal?: boolean
    rootClass?: string
    children: React.ReactNode
    getContainer?: () => HTMLElement
    show: boolean
    onRealMounted?: (portalRoot: HTMLDivElement) => void
}

/** 一般情况，使用portal就可以满足大部分的场景，portal就渲染在document.body上，否则就在原来的位置渲染 */
const Portal: React.FC<PortalProps> = function (props) {
    const { portal, rootClass, children, getContainer, show, onRealMounted } = props
    const portalRootRef = useRef<HTMLDivElement>()
    const container = useMemo(() => {
        const propContainer = getContainer ? getContainer() : undefined

        if (isDOMElement(propContainer)) return propContainer
        if (!portal) return undefined
        return document.body
    }, undefined)
    const hasInit = useRef(false)

    if (!show && !hasInit.current) return null

    if (!hasInit.current) {
        runInNextFrame(() => {
            onRealMounted(portalRootRef.current)
        })
    }

    hasInit.current = true

    if (!container) {
        return <>{children}</>
    }

    return ReactDOM.createPortal(
        <div className={classnames(portalClass('_'), rootClass)} ref={portalRootRef}>
            {children}
        </div>,
        container
    )
}

export default React.memo(Portal)
