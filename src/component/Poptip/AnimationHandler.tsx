import React, { useEffect, useRef, useState } from 'react'
import classnames from 'classnames'
import ReactDOM from 'react-dom'
import ProtalHandler from './ProtalHandler'
import { getPosition } from './util'

interface AnimationHandlerProps {
    getPopupContainer?: () => HTMLElement

    show?: boolean

    className?: string

    width?: number

    placement?: string

    trigger?: 'click' | 'hover'

    onClose(e): void

    onMouseEnter(): void

    onMouseLeave(): void

    contentRef: React.RefObject<HTMLElement>

    children: React.ReactNodeArray
}

enum Dismiss {
    CLOSE,
    CLOSING,
    SHOW,
}

function getDismiss(show) {
    return show ? Dismiss.SHOW : Dismiss.CLOSE
}

const AnimationHandler: React.FC<AnimationHandlerProps> = props => {
    const handlerDivRef = useRef<HTMLDivElement>()

    const [pos, setPos] = useState({ left: 0, top: 0, transformOrigin: '' })

    const [placement, setPlacement] = useState(props.placement)

    const { show, onClose, contentRef, onMouseEnter, onMouseLeave, width } = props

    const [dismiss, setDismiss] = useState(getDismiss(show))

    function setPosition() {
        if (!show) return

        const contentEl = ReactDOM.findDOMNode(contentRef.current)

        getPosition(contentEl, handlerDivRef.current, true, placement, (top, left, transformOrigin, placement) => {
            setPos(prev => {
                prev.top = top
                prev.left = left
                prev.transformOrigin = transformOrigin

                return prev
            })

            setPlacement(placement)
        })
    }

    useEffect(() => {
        setPlacement(props.placement)
    }, [props.placement])

    useEffect(() => {
        setPosition()

        setDismiss(getDismiss(show))

        if (!show && dismiss === Dismiss.SHOW) {
            setDismiss(Dismiss.CLOSING)

            const timer = setTimeout(() => {
                setDismiss(Dismiss.CLOSE)
            }, 300)

            return () => {
                clearTimeout(timer)
            }
        }
    }, [show])

    const className = classnames(
        dismiss === Dismiss.CLOSING && 'exit',
        dismiss === Dismiss.SHOW && 'enter',
        props.className
    )

    const divProps = {
        ref: handlerDivRef,
        className,
        style: {
            left: `${pos.left}px`,
            top: `${pos.top}px`,
            width: `${width}px`,
            transformOrigin: pos.transformOrigin,
        },
        'k-placement': placement,
        onMouseEnter,
        onMouseLeave,
    }

    return (
        <ProtalHandler show={dismiss !== Dismiss.CLOSE} onClickDocs={onClose} onResize={setPosition}>
            <div {...divProps}>{props.children}</div>
        </ProtalHandler>
    )
}

export default React.memo(AnimationHandler)
