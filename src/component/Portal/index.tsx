import { portalClass } from '@/styles'
import classnames from 'classnames'
import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { useIsomorphicLayoutEffect } from 'react-use'

interface PortalProps {
    portal?: boolean

    rootClass?: string

    children: ((params: { style: React.CSSProperties }) => React.ReactNode) | React.ReactNode
}

let root: HTMLDivElement

function initRoot() {
    root = document.createElement('div')

    root.className = portalClass('_')

    document.body.appendChild(root)
}

const Portal: React.FC<PortalProps> = function (props) {
    const { portal, rootClass, children } = props

    const container = useRef(portal ? document.createElement('div') : undefined).current

    useIsomorphicLayoutEffect(() => {
        if (!portal) return

        if (!root) initRoot()

        root.appendChild(container)

        return () => {
            root.removeChild(container)
        }
    }, [])

    if (!portal) {
        return <>{children}</>
    }

    container.className = classnames(portalClass('wrapper'), rootClass)

    return ReactDOM.createPortal(<>{children}</>, container)
}

export default React.memo(Portal)
