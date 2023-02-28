import { portalClass } from '@/styles'
import isDOMElement from '@/utils/dom/isDOMElement'
import classnames from 'classnames'
import React, { useMemo, useRef } from 'react'
import ReactDOM from 'react-dom'

interface PortalProps {
    portal?: boolean
    rootClass?: string
    children: ((params: { style: React.CSSProperties }) => React.ReactNode) | React.ReactNode
    getContainer?: () => HTMLElement
    show: boolean
}

/** 一般情况，使用portal就可以满足大部分的场景，portal就渲染在document.body上，否则就在原来的位置渲染 */
const Portal: React.FC<PortalProps> = function (props) {
    const { portal, rootClass, children, getContainer, show } = props
    const container = useMemo(() => {
        const propContainer = getContainer ? getContainer() : undefined
        if (isDOMElement(propContainer)) return propContainer
        if (!portal) return undefined
        return document.body
    }, [])
    const hasInit = useRef(false)

    if (!show && !hasInit.current) return null
    hasInit.current = true

    if (!container) {
        return <>{children}</>
    }

    return ReactDOM.createPortal(<div className={classnames(portalClass('_'), rootClass)}>{children}</div>, container)
}

export default React.memo(Portal)
