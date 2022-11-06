import React, { useMemo, useRef } from 'react'
import { getUidStr } from '@/utils/uid'
import { SelectProps } from './type'

export default (Origin) =>
    React.memo<SelectProps>((props) => {
        const groupKey = useRef(getUidStr()).current

        const { groupBy, data } = props

        const computedData = useMemo(() => {
            if (typeof groupBy !== 'function') {
                return data
            }

            const groupMap = new Map<string | number, any[]>()

            data.forEach((item, index) => {
                const groupName = groupBy(item, index, data)

                if (!groupMap.has(groupName)) {
                    groupMap.set(groupName, [{ [groupKey]: groupName }])
                }

                const group = groupMap.get(groupName)

                group.push(item)
            })

            const itemList = []

            for (const [, groupList] of groupMap) {
                itemList.push(...groupList)
            }

            // 0: {kmqcy6ol: "City"}
            // 1: {value: "Beijing", tag: "1"}
            // 2: {value: "Shanghai", tag: "1"}
            // 3: {kmqcy6ol: "Country"}
            // 4: {value: "China", tag: "2"}

            return itemList
        }, [data])

        return <Origin {...props} data={computedData} groupKey={groupKey} />
    })
