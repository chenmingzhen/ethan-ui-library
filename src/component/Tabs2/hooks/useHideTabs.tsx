import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Tab, TabMoveMap } from '../type'

interface UseHideTabsParams {
    tabs: Tab[]

    isVertical: boolean

    attribute: number

    scrollElementRef: React.RefObject<HTMLDivElement>

    innerElementRef: React.RefObject<HTMLDivElement>
}

const useHideTabs = (props: UseHideTabsParams) => {
    const [hideTabs, setTabs] = useState<Tab[]>([])

    const { tabs, isVertical, attribute, scrollElementRef, innerElementRef } = props

    const tabMoveMap = useRef<TabMoveMap>(new Map())

    // TODO 完善Dropdown后完善类型
    const dropDownData = useMemo(() => {
        return hideTabs.map(tab => {
            return {
                content: tab.tab,
                disabled: tab.disabled,
                onClick() {
                    const method = tabMoveMap.current.get(tab.id)

                    method?.()
                },
            }
        })
    }, [hideTabs])

    useEffect(() => {
        let startIndex = 0

        let endIndex = tabs.length - 1

        const pos = isVertical ? 'top' : 'left'

        const scrollPos = scrollElementRef.current?.getBoundingClientRect()

        if (!attribute) {
            startIndex = 0
        } else {
            for (let i = 0; i < tabs.length; i++) {
                const tabPos = scrollElementRef.current?.children[i]?.getBoundingClientRect()

                if (tabPos && scrollPos && attribute + scrollPos[pos] < tabPos[pos]) {
                    startIndex = i

                    break
                }
            }
        }

        for (let i = 0; i < tabs.length; i++) {
            const tabPos = scrollElementRef.current?.children[i]?.getBoundingClientRect()

            const startTabPos = scrollElementRef.current?.children[startIndex]?.getBoundingClientRect()

            const innerDistance = isVertical
                ? innerElementRef.current?.offsetHeight
                : innerElementRef.current?.offsetWidth

            if (tabPos && startTabPos && startTabPos[pos] + innerDistance <= tabPos[pos]) {
                endIndex = i

                break
            }
        }

        const newHideTabs = []

        tabs.forEach((tab, index) => {
            if (index < startIndex || index > endIndex) {
                newHideTabs.push(tab)
            }
        })

        setTabs(newHideTabs)
    }, [attribute])

    return { dropDownData, tabMoveMap }
}

export default useHideTabs
