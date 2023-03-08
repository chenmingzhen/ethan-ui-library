import { isBoolean, isEmpty, isFunc } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import { useEffect, useMemo, useRef, useState } from 'react'
import { SelectData, SelectProps } from '../type'

interface UseSelectData {
    filterText: string
    onCreate: SelectProps['onCreate']
    onFilter: SelectProps['onFilter']
    data: SelectProps['data']
    groupBy: SelectProps['groupBy']
}

export default function useProcessedData(props: UseSelectData) {
    const { filterText, onCreate, onFilter, groupBy } = props
    const [createdData, updateCreatedData] = useState(undefined)
    const groupKey = useRef(getUidStr()).current

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

    const processedData = useMemo<SelectData[]>(() => {
        const data: SelectData[] =
            onFilter && filterText ? props.data.filter((d) => onFilter(filterText, d)) : [...props.data]

        if (createdData) {
            data.unshift(createdData)
        }
        if (!isFunc(groupBy)) {
            return data
        }

        /** 构建分组数据 */
        const groupMap = new Map<string | number, any[]>()
        const groupData = []
        data.forEach((item, index) => {
            const groupName = groupBy(item, index, data)

            if (!groupMap.has(groupName)) {
                groupMap.set(groupName, [{ [groupKey]: groupName }])
            }

            const group = groupMap.get(groupName)

            group.push(item)
        })

        // 0: {groupKey: "City"}
        // 1: {value: "Beijing", tag: "1"}
        // 2: {value: "Shanghai", tag: "1"}
        // 3: {groupKey: "Country"}
        // 4: {value: "China", tag: "2"}

        for (const [, groupList] of groupMap) {
            groupData.push(...groupList)
        }

        return groupData
    }, [props.data, createdData, filterText])

    return { data: processedData, groupKey }
}
