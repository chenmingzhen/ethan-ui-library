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

            let nextScrollRatio = scrollRatio + value / (length - barLength)

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
        if (direction === 'x') {
            // 使用比例而非实际的px
            // (length / scrollLength) * 100 * (handleContainer width|height)=barLength,handleContainer width|height=length
            // style.width = `${barLength}px`
            barStyle.width = `${(length / scrollLength) * 100}%`
            barStyle.left = value
        } else {
            // style.height = `${barLength}px`
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
