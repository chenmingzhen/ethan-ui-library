import React, { useRef } from 'react'
import { scrollClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import useDragPosition from '@/hooks/useDragPosition'
import classnames from 'classnames'
import { ScrollBarProps } from './type'

const Bar: React.FC<ScrollBarProps> = function (props) {
    const { length, scrollLength, direction, scrollRatio, onScroll } = props
    const barElementRef = useRef<HTMLDivElement>()
    const getDragTarget = useRefMethod(() => barElementRef.current)
    const getBoundingElement = useRefMethod(() => barElementRef.current.parentElement)

    const { dragging } = useDragPosition({
        getDragTarget,
        getBoundingElement,
        onDrag(moveX, moveY) {
            const value = direction === 'x' ? moveX : moveY

            let nextScrollRatio = scrollRatio + value / moveableLength

            if (nextScrollRatio < 0) nextScrollRatio = 0
            if (nextScrollRatio > 1) nextScrollRatio = 1
            if (nextScrollRatio === scrollRatio) return

            onScroll(nextScrollRatio)
        },
    })

    const handleBgClick = useRefMethod((evt: React.MouseEvent) => {
        if (!show || evt.target === barElementRef.current) return

        const barRect = barElementRef.current.getBoundingClientRect()

        let nextScrollRatio = scrollRatio

        const page = length / (scrollLength - length)

        if ((direction === 'x' && evt.clientX < barRect.left) || (direction === 'y' && evt.clientY < barRect.top)) {
            nextScrollRatio = scrollRatio - page

            if (nextScrollRatio < 0) nextScrollRatio = 0
        } else if (
            (direction === 'x' && evt.clientX > barRect.right) ||
            (direction === 'y' && evt.clientY > barRect.top)
        ) {
            nextScrollRatio = scrollRatio + page
            if (nextScrollRatio > 1) nextScrollRatio = 1
        }

        onScroll(nextScrollRatio)
    })

    const show = scrollLength > length
    const barLength = Math.max(20, (length / scrollLength) * length)
    /** 滚动条可以移动的最大值 */
    const moveableLength = length - barLength
    const value = moveableLength * scrollRatio
    const barStyle: React.CSSProperties = {}

    if (scrollLength > 0) {
        /** 使用实际长度和比例表示都是一样的 */
        if (direction === 'x') {
            /** 实际长度表示 */
            // barStyle.width = `${barLength}px`
            /** 比例表示(less中已经限制长度最小为20) */
            barStyle.width = `${(length / scrollLength) * 100}%`
            barStyle.left = value
        } else {
            /** 实际长度表示 */
            // barStyle.height = `${barLength}px`
            /** 比例表示(less中已经限制长度最小为20) */
            barStyle.height = `${(length / scrollLength) * 100}%`
            barStyle.top = value
        }
    }

    const className = classnames(scrollClass('bar', direction, show && 'show', dragging && 'dragging'), props.className)

    return (
        <div className={className} onMouseDown={handleBgClick}>
            <div className={scrollClass('handle')} ref={barElementRef} style={barStyle} />
        </div>
    )
}

export default React.memo(Bar)
