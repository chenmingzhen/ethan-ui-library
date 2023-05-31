import useSafeState from '@/hooks/useSafeState'
import { addResizeObserver } from '@/utils/dom/element'
import { debounce } from '@/utils/func'
import { runInNextFrame } from '@/utils/nextFrame'
import React, { useEffect, useRef } from 'react'
import { useIsomorphicLayoutEffect, useUpdate } from 'react-use'
import useRefMethod from '@/hooks/useRefMethod'
import { parsePxToNumber } from '@/utils/strings'

interface MoreProps<T = any> {
    data: T[]
    compressed: boolean
    getItemDoms(target: HTMLElement): NodeListOf<HTMLElement>
    getRestElement(): HTMLElement
    getTargetElement(): HTMLElement
    renderItem?: (dataItem: T, index: number) => React.ReactNode
    renderRest: (restNode?: React.ReactNode[]) => React.ReactNode
}

const defaultRenderMore = (rest: number) => `+${rest}`

const NO_COUNT = -2
const PENDING_COUNT = -1

function More<T = any>(props: MoreProps<T>) {
    const { compressed, getTargetElement, data, getItemDoms, renderRest, renderItem, getRestElement } = props
    /**
     * showCount NO_COUNT 不计算
     * showCount PENDING_COUNT 进行计算的阶段
     * showCount number 计算完成的阶段
     */
    const [showCount, setShowCount] = useSafeState(NO_COUNT)
    const update = useUpdate()
    const shouldResetMoreRef = useRef(false)

    const resetMore = useRefMethod(() => {
        /** 由于不确定执行update之后，是否会马上执行render，再而执行effect，使得shouldResetMoreRef.current = true的操作会在最后执行,导致无法计算。 */
        shouldResetMoreRef.current = true
        setShowCount(PENDING_COUNT)
        update()
    })

    const itemNodes = data.map(renderItem)

    const computedMoreNum = useRefMethod(() => {
        const target = getTargetElement()

        if (!target) return NO_COUNT

        const doms = getItemDoms(target)
        const items = Array.from(doms)
        const containerStyle = getComputedStyle(target)
        const { clientWidth } = target
        const paddingLeft = parsePxToNumber(containerStyle.paddingLeft)
        const paddingRight = parsePxToNumber(containerStyle.paddingRight)
        const contentWidth = clientWidth - paddingLeft - paddingRight
        const moreElement = getRestElement()
        const moreElementStyle = getComputedStyle(moreElement)
        const moreElementMargin =
            parsePxToNumber(moreElementStyle.marginLeft) + parsePxToNumber(moreElementStyle.marginRight)

        let currentShowNum = 0
        let sumWidth = 0

        const itemWidthList = items.map((item) => {
            const itemStyle = getComputedStyle(item)
            const itemWidth =
                item.offsetWidth + parsePxToNumber(itemStyle.marginLeft) + parsePxToNumber(itemStyle.marginRight)

            sumWidth += itemWidth

            return itemWidth
        })

        if (sumWidth > contentWidth) {
            let totalWidth = 0

            for (let i = 0; i < itemWidthList.length; i++) {
                totalWidth += itemWidthList[i]

                const reset = defaultRenderMore(items.length - 1 - i)
                ;(moreElement.childNodes[0] as HTMLElement).innerText = reset
                const moreWidth = moreElement.offsetWidth + moreElementMargin

                if (totalWidth > contentWidth - moreWidth) {
                    break
                }

                currentShowNum += 1

                if (i === items.length - 1) {
                    // currentShowNum = -1
                    currentShowNum = NO_COUNT
                }
            }
        } else {
            // currentShowNum = -1

            currentShowNum = NO_COUNT
        }

        return currentShowNum
    })

    useEffect(() => {
        if (!compressed) return

        const target = getTargetElement()

        if (!target) return

        return addResizeObserver(target, debounce(resetMore), { direction: 'x' })
    }, [compressed])

    useIsomorphicLayoutEffect(() => {
        if (!compressed) return

        if (!shouldResetMoreRef.current) {
            resetMore()
        }
    }, [data])

    useIsomorphicLayoutEffect(() => {
        if (!compressed) return

        const target = getTargetElement()

        if (!target) return

        if (shouldResetMoreRef.current) {
            runInNextFrame(() => {
                setShowCount(computedMoreNum())
            })
            shouldResetMoreRef.current = false
        }
    }, [shouldResetMoreRef.current])

    if (!compressed || showCount === NO_COUNT) return <>{itemNodes}</>

    /** ----------------------------Computed------------------------ */

    if (showCount === PENDING_COUNT || showCount > itemNodes.length) {
        return (
            <>
                {itemNodes}
                {renderRest?.(itemNodes)}
            </>
        )
    }

    /** ------------------------------------------------------------ */

    const beforeNumNodes = new Array(showCount).fill(null).map((_, index) => itemNodes[index])
    const afterNumNodes = new Array(itemNodes.length - showCount)
        .fill(null)
        .map((_, index) => itemNodes[showCount + index])

    return (
        <>
            {beforeNumNodes}

            {renderRest?.(afterNumNodes)}
        </>
    )
}

export default React.memo(More) as typeof More
