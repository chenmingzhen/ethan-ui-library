import React from 'react'
import { getUidStr } from '@/utils/uid'
import { isTouchDevice } from './utils'
import Context, { PhotoContext } from './context'

export interface IPhotoConsumer {
    src: string
    intro?: React.ReactNode
    children?: React.ReactElement<any>
}

const PhotoConsumer: React.FC<IPhotoConsumer> = ({ src, intro, children }) => {
    const photoContext = React.useContext<PhotoContext>(Context)
    const key = React.useMemo<string>(getUidStr, [])
    const [position, updatePosition] = React.useState<{
        clientX: number | undefined
        clientY: number | undefined
    }>({
        clientX: undefined,
        clientY: undefined,
    })
    const photoTriggerRef = React.useRef<HTMLElement | null>(null)

    React.useEffect(() => {
        photoContext.addItem({
            key,
            src,
            originRef: photoTriggerRef.current,
            intro,
        })
        return () => {
            photoContext.removeItem(key)
        }
    }, [])

    function handleTouchStart(e) {
        const { clientX, clientY } = e.touches[0]
        updatePosition({
            clientX,
            clientY,
        })
        if (children) {
            const { onTouchStart } = children.props
            if (onTouchStart) {
                onTouchStart(e)
            }
        }
    }

    function handleTouchEnd(e) {
        const { clientX, clientY } = e.changedTouches[0]
        if (position.clientX === clientX && position.clientY === clientY) {
            photoContext.onShow(key)
        }
        if (children) {
            const { onTouchEnd } = children.props
            if (onTouchEnd) {
                onTouchEnd(e)
            }
        }
    }

    function handleClick(e) {
        photoContext.onShow(key)
        if (children) {
            const { onClick } = children.props
            if (onClick) {
                onClick(e)
            }
        }
    }

    if (children) {
        return React.Children.only(
            React.cloneElement(
                children,
                isTouchDevice
                    ? {
                          onTouchStart: handleTouchStart,
                          onTouchEnd: handleTouchEnd,
                          ref: photoTriggerRef,
                      }
                    : { onClick: handleClick, ref: photoTriggerRef }
            )
        )
    }
    return null
}

export default PhotoConsumer
