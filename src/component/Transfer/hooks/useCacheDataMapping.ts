import { useEffect, useState } from 'react'
import { TransferDataValueType, TransferData } from '../type'

export default function useCacheDataMapping(
    data: TransferData[],
    getKey: (dataItem: TransferData, index: number) => TransferDataValueType
) {
    const [cacheDataMapping, updateDataMapping] = useState(new Map<TransferDataValueType, TransferData>())

    useEffect(() => {
        updateDataMapping((mapping) => {
            data.forEach((dataItem, index) => {
                mapping.set(getKey(dataItem, index), dataItem)
            })

            return new Map(mapping)
        })
    }, [data])

    return cacheDataMapping
}
