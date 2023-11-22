import React, { useEffect, useMemo } from 'react'
import useSafeState from '@/hooks/useSafeState'
import useRefMethod from '@/hooks/useRefMethod'
import { useIsomorphicLayoutEffect } from 'react-use'
import { addResizeObserver } from '@/utils/dom/element'
import { parsePxToNumber } from '@/utils/strings'
import { runInNextFrame } from '@/utils/nextFrame'
import { getDataItemKey } from '@/utils/keygen'
import { MoreProps } from './type'
import MoreContext from './context'
import Item from './Item'

const defaultGetMoreText = (rest: number) => `+${rest}`
const NO_COUNT = -2
const PENDING_COUNT = -1

function More<T extends Record<any, any> = {}>(props: MoreProps<T>) {
    const {
        data,
        keyName,
        renderMore,
        renderItem,
        getMoreElement,
        onComputeFinish,
        compressed = true,
        getContainerElement,
        getMoreText = defaultGetMoreText,
    } = props

    const [isResetPending, updateResetPending] = useSafeState(false)
    const [showCount, updateShowCount] = useSafeState(PENDING_COUNT)

    const resetMore = useRefMethod(() => {
        runInNextFrame(() => {
            updateShowCount(PENDING_COUNT)
        })

        updateResetPending(true)
    })

    const computedMoreNum = useRefMethod(() => {
        const container = getContainerElement()
        const collapseMapping = new Map<React.Key, boolean>()

        if (!container) return { count: NO_COUNT, collapseMapping }

        const containerStyle = getComputedStyle(container)
        const { clientWidth } = container
        const paddingLeft = parsePxToNumber(containerStyle.paddingLeft)
        const paddingRight = parsePxToNumber(containerStyle.paddingRight)
        const contentWidth = clientWidth - paddingLeft - paddingRight
        const moreElement = getMoreElement(container)
        const moreElementStyle = getComputedStyle(moreElement)
        const moreElementMargin =
            parsePxToNumber(moreElementStyle.marginLeft) + parsePxToNumber(moreElementStyle.marginRight)

        let currentShowNum = 0
        let sumWidth = 0

        const itemWidthList = data.map((item, index) => {
            const itemKey = getDataItemKey(item, keyName, index)
            const element = container.querySelector(`[data-more-item-key="${itemKey}"]`) as HTMLElement

            if (!element) return 0

            const elementStyle = getComputedStyle(element)
            const elementWidth =
                element.offsetWidth +
                parsePxToNumber(elementStyle.marginLeft) +
                parsePxToNumber(elementStyle.marginRight)

            sumWidth += elementWidth

            return elementWidth
        })

        if (sumWidth > contentWidth) {
            let totalWidth = 0

            for (let i = 0; i < itemWidthList.length; i++) {
                totalWidth += itemWidthList[i]

                const reset = getMoreText(data.length - 1 - i)
                ;(moreElement.childNodes[0] as HTMLElement).innerText = reset
                const moreWidth = moreElement.offsetWidth + moreElementMargin

                if (totalWidth > contentWidth - moreWidth) {
                    break
                }

                currentShowNum += 1

                if (i === data.length - 1) {
                    currentShowNum = NO_COUNT
                }
            }
        } else {
            currentShowNum = NO_COUNT
        }

        if (currentShowNum !== NO_COUNT) {
            data.forEach((item, index) => {
                const itemKey = getDataItemKey(item, keyName, index)

                collapseMapping.set(itemKey, index >= currentShowNum)
            })
        }

        return { count: currentShowNum, collapseMapping }
    })

    useEffect(() => {
        if (!compressed) return
        const container = getContainerElement()
        if (!container) return

        return addResizeObserver(container, resetMore, { direction: 'x', executeOnObserver: false })
    }, [compressed])

    useIsomorphicLayoutEffect(() => {
        if (!compressed) return
        if (!isResetPending) {
            resetMore()
        }
    }, [data])

    useIsomorphicLayoutEffect(() => {
        if (!compressed) return

        const container = getContainerElement()

        if (!container) return

        if (isResetPending) {
            runInNextFrame(() => {
                const { count, collapseMapping } = computedMoreNum()

                updateShowCount(count)

                onComputeFinish?.(count, collapseMapping)
            })

            updateResetPending(false)
        }
    }, [isResetPending])

    const itemNodes = useMemo(() => {
        if (data && renderItem) {
            return data.map((dataItem, index) => {
                const itemKey = getDataItemKey(dataItem, keyName, index)

                return (
                    <Item itemKey={itemKey} key={itemKey}>
                        {renderItem(dataItem, index)}
                    </Item>
                )
            })
        }

        return []
    }, [data])

    const contextValue = useMemo(() => ({ showCount }), [showCount])

    const renderContent = useRefMethod(() => {
        if (!compressed || showCount === NO_COUNT || showCount >= itemNodes.length) {
            return (
                <React.Fragment key="fragment">
                    <React.Fragment key="items">{itemNodes}</React.Fragment>
                </React.Fragment>
            )
        }

        if (showCount === PENDING_COUNT) {
            return (
                <React.Fragment key="fragment">
                    <React.Fragment key="items">{itemNodes}</React.Fragment>
                    <React.Fragment key="more">{renderMore?.([])}</React.Fragment>
                </React.Fragment>
            )
        }

        const beforeNumNodes = new Array(showCount).fill(null).map((_, index) => itemNodes[index])
        const afterNumNodes = new Array(itemNodes.length - showCount)
            .fill(null)
            .map((_, index) => itemNodes[showCount + index])

        return (
            <React.Fragment key="fragment">
                <React.Fragment key="items">{beforeNumNodes}</React.Fragment>
                <React.Fragment key="more">{renderMore?.(afterNumNodes)}</React.Fragment>
            </React.Fragment>
        )
    })

    return <MoreContext.Provider value={contextValue}>{renderContent()}</MoreContext.Provider>
}

More.NO_COUNT = NO_COUNT

export default React.memo(More) as unknown as typeof More
