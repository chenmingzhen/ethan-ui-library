import React from 'react'
import { getUidStr } from '@/utils/uid'
import { isTouchDevice } from './utils'
import Context, { PhotoContext } from './context'

export interface PhotoConsumerProps {
    src: string
    intro?: React.ReactNode
    children?: React.ReactElement<any>
}

/**
 *
 * 装载着Children,接收Provider的value 在此进行addItem removeItem
 *
 */

const PhotoConsumer: React.FC<PhotoConsumerProps> = ({ src, intro, children }) => {
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

    // 在挂载后 添加Item进Provider中的images中
    // 结束挂载之后 移除Item
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
            // 如果children中存在此事件 如children为div 则回调数据
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
        // https://zh-hans.reactjs.org/docs/react-api.html#reactchildrenonly

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
