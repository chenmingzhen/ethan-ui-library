import { isEmpty } from '@/utils/is'
import React, { useMemo, useState } from 'react'
import { FormatBoxListDataHandlerProps } from '../type'

const FormatBoxListDataHandler: React.FC<FormatBoxListDataHandlerProps> = function(props) {
    const { data: propData, columns, children, datum, groupKey } = props

    /**
     * 根据列数再次分割数据
     * columns:3 => [[1,2,3],[4,5,6]]
     */
    const sliceData = useMemo(() => {
        return propData.reduce((accumulatedValue, currentValue) => {
            let lastItem = accumulatedValue[accumulatedValue.length - 1]

            const groupTitle = currentValue[groupKey]

            if (!isEmpty(groupTitle)) {
                accumulatedValue.push([currentValue])

                accumulatedValue.push([])

                return accumulatedValue
            }

            if (!lastItem) {
                lastItem = []

                accumulatedValue.push(lastItem)
            }

            if (lastItem.length >= columns) {
                accumulatedValue.push([currentValue])
            } else {
                lastItem.push(currentValue)
            }

            return accumulatedValue
        }, [])
    }, [propData])

    const [defaultIndex] = useState<number | undefined>(() => {
        if (!datum.values.length) return undefined

        for (let i = 0; i < sliceData.length; i++) {
            const data = sliceData[i]

            const item = datum.getDataByValue(data, datum.values[0])

            if (item) {
                return i
            }
        }

        return undefined
    })

    return <>{children({ sliceData, defaultIndex })}</>
}

export default React.memo(FormatBoxListDataHandler)
