import React from 'react'
import { getUidStr } from '@/utils/uid'
import Image from '@/component/Image'
import { isTouchDevice } from './utils'
import Context, { PhotoContext } from './context'
import { ImageProps } from '../Image/Image'

export interface PhotoConsumerProps {
    src: string

    intro?: React.ReactNode

    children?: React.ReactElement

    imageProps?: Omit<ImageProps, 'src'>
}

/**
 *
 * 装载着Children,接收Provider的value 在此进行addItem removeItem
 *
 */

const PhotoConsumer: React.FC<PhotoConsumerProps> = ({ src, intro, children, imageProps }) => {
    const { addItem, removeItem, onShow } = React.useContext<PhotoContext>(Context)

    const key = React.useRef(getUidStr()).current

    const [position, updatePosition] = React.useState<{
        clientX?: number
        clientY?: number
    }>({})

    const photoTriggerRef = React.useRef<HTMLElement>()

    // 在挂载后 添加Item进Provider中的images中
    // 结束挂载之后 移除Item
    React.useEffect(() => {
        addItem({
            key,
            src,
            originRef: photoTriggerRef.current,
            intro,
        })

        return () => {
            removeItem(key)
        }
    }, [])

    function handleTouchStart(e) {
        const { clientX, clientY } = e.touches[0]

        updatePosition({
            clientX,
            clientY,
        })

        // 如果children中存在此事件 如children为div 则回调数据
        children?.props?.onTouchStart?.(e)
    }

    function handleTouchEnd(e) {
        const { clientX, clientY } = e.changedTouches[0]

        // 点击类型
        if (position.clientX === clientX && position.clientY === clientY) {
            onShow(key)
        }

        children?.props.onTouchEnd?.(e)
    }

    function handleClick(e) {
        onShow(key)

        children?.props.onClick?.(e)
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

    const props = isTouchDevice
        ? {
              onTouchStart: handleTouchStart,
              onTouchEnd: handleTouchEnd,
              ref: photoTriggerRef,
          }
        : { onClick: handleClick, ref: photoTriggerRef }

    return <Image src={src} width={100} height={100} {...imageProps} {...props} />
}

export default PhotoConsumer