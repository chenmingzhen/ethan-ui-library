import React, { useState, useEffect } from 'react'
import { Tab } from '../type'

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

                const offset = i !== 0 ? 30 * 2 : 0

                if (tabPos && scrollPos && attribute + scrollPos[pos] < tabPos[pos] + offset) {
                    startIndex = i

                    break
                }
            }
        }

        for (let i = 0; i < tabs.length; i++) {
            const tabPos = scrollElementRef.current?.children[i]?.getBoundingClientRect()

            const startTabPos = scrollElementRef.current?.children[startIndex]?.getBoundingClientRect()

            const innerWidth = innerElementRef.current?.offsetWidth

            const offset = i !== 0 ? 30 * 2 : 0

            if (tabPos && startTabPos && startTabPos[pos] + innerWidth < tabPos[pos] + offset) {
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

    return { hideTabs }
}

export default useHideTabs
