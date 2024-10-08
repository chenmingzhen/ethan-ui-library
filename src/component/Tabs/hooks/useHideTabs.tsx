import { DropDownData } from '@/component/Dropdown/type'
import React, { useEffect, useRef, useMemo } from 'react'
import useRefMethod from '@/hooks/useRefMethod'
import { throttleWrapper } from '@/utils/func'
import useSafeState from '@/hooks/useSafeState'
import { Tab, TabMoveMap } from '../type'

interface UseHideTabsParams {
    tabs: Tab[]

    isVertical: boolean

    offset: number

    scrollElementRef: React.RefObject<HTMLDivElement>

    innerElementRef: React.RefObject<HTMLDivElement>

    collapsible: boolean
}

const useHideTabs = (props: UseHideTabsParams) => {
    const { tabs, isVertical, offset, scrollElementRef, innerElementRef, collapsible } = props

    const [hideTabs, setTabs] = useSafeState<Tab[]>([])

    const tabMoveMap = useRef<TabMoveMap>(new Map()).current

    const dropDownData: DropDownData[] = useMemo(
        () =>
            hideTabs.map((tab) => ({
                content: tab.tab,
                disabled: tab.disabled,
                key: tab.id,
            })),
        [hideTabs]
    )

    const computedTabs = useRefMethod(
        throttleWrapper(() => {
            let startIndex = 0
            let endIndex = tabs.length - 1

            const pos = isVertical ? 'top' : 'left'
            const scrollPos = scrollElementRef.current?.getBoundingClientRect()

            if (!offset) {
                startIndex = 0
            } else {
                for (let i = 0; i < tabs.length; i++) {
                    const tabPos = scrollElementRef.current?.children[i]?.getBoundingClientRect()

                    if (tabPos && scrollPos && offset + scrollPos[pos] < tabPos[pos]) {
                        startIndex = i

                        break
                    }
                }
            }

            for (let i = 0; i < tabs.length; i++) {
                const tabPos = scrollElementRef.current?.children[i]?.getBoundingClientRect()
                const startTabPos = scrollElementRef.current?.children[startIndex]?.getBoundingClientRect()

                // 此处获取的innerDistance不正确 添加setTimeout后获取正确
                // 由于在setPosition中设置了overflow副作用 会新增一个Icon的DOM位置30width
                const innerDistance = isVertical
                    ? innerElementRef.current?.offsetHeight
                    : innerElementRef.current?.offsetWidth

                // TODO 可能需要手动props获取自定义图标的宽高
                // Icon的DOM位置30 width height
                const nextOffset = (offset > 0 ? 60 : 30) + (collapsible ? 30 : 0)

                if (tabPos && startTabPos && startTabPos[pos] + innerDistance - nextOffset <= tabPos[pos]) {
                    endIndex = i

                    break
                }
            }

            const newHideTabs = []

            tabs.forEach((tab, index) => {
                if (index < startIndex || index > endIndex - 1) {
                    newHideTabs.push(tab)
                }
            })

            setTabs(newHideTabs)
        }, 100)
    )

    // 考虑再添加overflow作为副作用的dep 因为overflow影响DOM的计算
    useEffect(computedTabs, [offset])

    return { dropDownData, tabMoveMap }
}

export default useHideTabs
