import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isArray, isBoolean, isFunc } from '@/utils/is'
import { useEffect, useState } from 'react'
import { CascaderData, CascaderDataValueType, CascaderNode, CascaderProps } from '../type'

interface UseCascaderDatumProps {
    data: CascaderData[]
    childrenKey: CascaderProps['childrenKey']
    disabled: CascaderProps['disabled']
    defaultValue: CascaderProps['defaultValue']
    value: CascaderProps['value']
    onChange: CascaderProps['onChange']
    getKey: (dataItem: CascaderData) => CascaderDataValueType
    limit: number
}

function transformValue2Array(value) {
    if (value === undefined || value === null) return undefined
    return isArray(value) ? [value] : [[value]]
}

export default function useCascaderDatum(props: UseCascaderDatumProps) {
    const { data, childrenKey, onChange, getKey, limit } = props
    const [nodeMapping, updateNodeMapping] = useState(new Map<CascaderDataValueType, CascaderNode>())
    const [dataMapping, updateDataMapping] = useState(new Map<CascaderDataValueType, CascaderData>())
    const [valueMapping, updateValueMapping] = useState(new Map<CascaderDataValueType, boolean>())
    const [value, setValue] = useMergedValue<CascaderDataValueType[][]>({
        defaultStateValue: [],
        options: {
            defaultValue: transformValue2Array(props.defaultValue),
            value: transformValue2Array(props.value),
            onChange(nextValue) {
                if (onChange) {
                    const limitValue = (limit === 1 ? nextValue[0] : nextValue) || []
                    onChange(limitValue)
                }
            },
        },
    })

    useEffect(() => {
        const nextNodeMapping = new Map<CascaderDataValueType, CascaderNode>()
        const nextDataMapping = new Map<CascaderDataValueType, CascaderData>()

        function initData(
            currentData: CascaderData[],
            currentKeyPath: CascaderDataValueType[] = [],
            currentDisabled?: boolean,
            currentIndexPath: number[] = []
        ) {
            const currentIds: CascaderDataValueType[] = []
            for (let i = 0; i < currentData.length; i++) {
                const dataItem = currentData[i]
                const key = getKey(dataItem)
                const isDisabled = currentDisabled || disabled(currentData)
                const indexPath = [...currentIndexPath, i]
                const childrenData = dataItem[childrenKey]
                const keyPath = [...currentKeyPath, key]
                const children = isArray(childrenData)
                    ? initData(childrenData, [...currentKeyPath, key], isDisabled, indexPath)
                    : []

                currentIds.push(key)
                nextDataMapping.set(key, dataItem)
                nextNodeMapping.set(key, { children, indexPath, isDisabled, keyPath })
            }

            return currentIds
        }

        initData(data)

        updateNodeMapping(nextNodeMapping)
        updateDataMapping(nextDataMapping)
    }, [data])

    const disabled = useRefMethod((dataItem: CascaderData) => {
        if (isBoolean(props.disabled)) {
            return props.disabled
        }
        if (isFunc(props.disabled)) {
            return props.disabled(dataItem)
        }
        return false
    })

    const getNodeInfoByDataItem = useRefMethod((dataItem: CascaderData) => {
        const key = getKey(dataItem)

        return nodeMapping.get(key)
    })

    const getDataItemByKey = useRefMethod((key: CascaderDataValueType) => dataMapping.get(key))

    const addValue = useRefMethod((keyPath: CascaderDataValueType[]) => {
        setValue((prevValue) => {
            const nextValue = [...prevValue]
            nextValue.push(keyPath)
            return nextValue
        })
    })

    return { value, disabled, getNodeInfoByDataItem, setValue, getDataItemByKey, addValue }
}
