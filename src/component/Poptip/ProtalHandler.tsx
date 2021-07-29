import React, { useMemo, useEffect } from 'react'
import ReactDom from 'react-dom'

interface ProtalHandlerProps {
    onClickDocs: (e) => void

    onResize: () => void

    show: boolean

    getPopupContainer?: () => HTMLElement

    children: React.ReactNode
}

function createContainer() {
    const div = document.createElement('div')

    div.style.top = '0'
    div.style.left = ''
    div.style.width = '100%'
    div.style.position = 'absolute'

    return div
}

const ProtalHandler: React.FC<ProtalHandlerProps> = ({
    children,
    show,
    onResize,
    onClickDocs,
    getPopupContainer = () => document.body,
}) => {
    const div = useMemo(createContainer, [])

    useEffect(() => {
        onResize && window.addEventListener('resize', onResize)
        onClickDocs && document.addEventListener('click', onClickDocs)

        const container = getPopupContainer()

        if (show && !container.contains(div)) {
            container.appendChild(div)

            return () => {
                onResize && window.removeEventListener('resize', onResize)
                onClickDocs && document.removeEventListener('click', onClickDocs)

                if (container.contains(div)) {
                    // warning:必须在顶层调用
                    // ReactDom.unmountComponentAtNode(div)
                    container.removeChild(div)
                }
            }
        }
    }, [show])

    return ReactDom.createPortal(<>{children}</>, div)
}

export default React.memo(ProtalHandler)
