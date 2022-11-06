import { useState, useEffect } from 'react'
import { PhotoViewImageData, OriginRectType, ShowAnimateEnum } from './types'

interface VisibleHandleProps {
    // Slider是否为可见状态
    visible: boolean
    currentImage?: PhotoViewImageData
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

// 处理PhotoSlider的显示以及动画状态
// 当传入是否可见visible时 开始执行记录节点位置 动画相关的副作用
export default function VisibleAnimationHandle({ visible, currentImage, children }: VisibleHandleProps) {
    const [photoVisible, setPhotoVisible] = useState(visible)

    const [showAnimateType, setAnimateStatus] = useState<ShowAnimateEnum>(ShowAnimateEnum.None)

    const [originRect, setOriginRect] = useState<OriginRectType>()

    function onShowAnimateEnd() {
        setAnimateStatus(ShowAnimateEnum.None)

        if (showAnimateType === ShowAnimateEnum.Out) {
            setPhotoVisible(false)
        }
    }

    useEffect(() => {
        if (!currentImage) {
            return
        }

        const { originRef } = currentImage

        // https://www.w3school.com.cn/jsref/prop_node_nodetype.asp

        if (originRef && originRef.nodeType === 1) {
            // 获取触发时装载元素的节点位置 即被Consumer包裹的最外层元素
            const { top, left, width, height } = originRef.getBoundingClientRect()

            setOriginRect({
                clientX: left + width / 2,
                clientY: top + height / 2,
            })
        } else if (!originRef) {
            setOriginRect(undefined)
        }

        if (visible) {
            setAnimateStatus(ShowAnimateEnum.In)
            setPhotoVisible(true)
        } else {
            setAnimateStatus(ShowAnimateEnum.Out)
        }
    }, [visible])

    return children({
        photoVisible,
        showAnimateType,
        originRect,
        onShowAnimateEnd,
    })
}
