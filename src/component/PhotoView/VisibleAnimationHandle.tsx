import React from 'react'
import { DataType, OriginRectType, ShowAnimateEnum } from './types'

interface VisibleHandleProps {
    visible: boolean
    currentImage?: DataType
    children: ({
        photoVisible,
        showAnimateType,
        originRect,
        onShowAnimateEnd,
    }: {
        photoVisible: boolean
        showAnimateType: ShowAnimateEnum
        originRect: OriginRectType
        onShowAnimateEnd: () => void
    }) => JSX.Element | null
}

export default function VisibleAnimationHandle({ visible, currentImage, children }: VisibleHandleProps) {
    const [photoVisible, updatePhotoVisible] = React.useState(visible)
    const [showAnimateType, updateAnimateStatus] = React.useState<ShowAnimateEnum>(ShowAnimateEnum.None)
    const [originRect, updateOriginRect] = React.useState<OriginRectType>()

    function onShowAnimateEnd() {
        updateAnimateStatus(ShowAnimateEnum.None)

        // Close
        if (showAnimateType === ShowAnimateEnum.Out) {
            updatePhotoVisible(false)
        }
    }

    React.useEffect(() => {
        if (!currentImage) {
            return
        }
        const { originRef } = currentImage
        if (originRef && originRef.nodeType === 1) {
            // 获取触发时节点位置
            const { top, left, width, height } = originRef.getBoundingClientRect()
            updateOriginRect({
                clientX: left + width / 2,
                clientY: top + height / 2,
            })
        } else if (originRect && !originRef) {
            updateOriginRect(undefined)
        }

        if (visible) {
            updateAnimateStatus(ShowAnimateEnum.In)
            updatePhotoVisible(true)
        } else {
            updateAnimateStatus(ShowAnimateEnum.Out)
        }
    }, [visible])

    return children({
        photoVisible,
        showAnimateType,
        originRect,
        onShowAnimateEnd,
    })
}
