import { isBoolean, isEmpty } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import { useEffect, useMemo, useRef, useState } from 'react'

interface UseSelectData {
    filterText: string
    onCreate: boolean | ((text: string) => any)
    onFilter: (text: string, data: any) => boolean
    data: any[]
    groupBy: (item: any, index: number, items: any) => string | number
}

export default function useSelectData(props: UseSelectData) {
    const { filterText, onCreate, onFilter, data, groupBy } = props
    const [createdData, updateCreatedData] = useState(undefined)
    const groupKey = useRef(getUidStr()).current
    const memoData = useMemo(
        () => (onFilter && filterText ? data.filter((d) => onFilter(filterText, d)) : data),
        [data, filterText]
    )

    function createData(text: string) {
        const createFn = isBoolean(onCreate) ? (t) => t : onCreate

        return createFn(text)
    }

    useEffect(() => {
        if (onCreate) {
            if (isEmpty(filterText)) {
                updateCreatedData(undefined)
            } else {
                updateCreatedData(createData(filterText))
            }
        }
    }, [filterText])

    const selectData = [...memoData]

    if (createdData) {
        selectData.unshift(createdData)
    }

    const groupData = useMemo(() => {
        if (typeof groupBy !== 'function') {
            return selectData
        }

        const groupMap = new Map<string | number, any[]>()

        selectData.forEach((item, index) => {
            const groupName = groupBy(item, index, selectData)

            if (!groupMap.has(groupName)) {
                groupMap.set(groupName, [{ [groupKey]: groupName }])
            }

            const group = groupMap.get(groupName)

            group.push(item)
        })

        const itemList = []

        // 0: {kmqcy6ol: "City"}
        // 1: {value: "Beijing", tag: "1"}
        // 2: {value: "Shanghai", tag: "1"}
        // 3: {kmqcy6ol: "Country"}
        // 4: {value: "China", tag: "2"}

        for (const [, groupList] of groupMap) {
            itemList.push(...groupList)
        }

        return itemList
    }, [memoData, createData])

    return { selectData: groupData, groupKey }
}
