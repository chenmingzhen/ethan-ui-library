import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { flattenArray } from '@/utils/flat'
import { isArray, isBoolean, isEmpty, isFunc } from '@/utils/is'
import { useEffect, useState } from 'react'
import deepEql from 'deep-eql'
import { CascaderData, CascaderDataValueType, CascaderNode, CascaderNodeValue, CascaderProps } from '../type'

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

function transformValue2Array(value, limit) {
    if (value === undefined || value === null) return undefined

    if (limit === 1) return [value]

    return value
}

export default function useCascaderDatum(props: UseCascaderDatumProps) {
    const { data, childrenKey, onChange, getKey, limit } = props
    const [nodeMapping, updateNodeMapping] = useState(new Map<CascaderDataValueType, CascaderNode>())
    const [dataMapping, updateDataMapping] = useState(new Map<CascaderDataValueType, CascaderData>())
    const [valueMapping, updateValueMapping] = useState(new Map<CascaderDataValueType, CascaderNodeValue>())
    const [value, setValue] = useMergedValue<CascaderDataValueType[][]>({
        defaultStateValue: [],
        options: {
            defaultValue: transformValue2Array(props.defaultValue, limit),
            value: transformValue2Array(props.value, limit),
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

    useEffect(() => {
        /** 只处理多选的情况 */
        if (limit === 1) return

        const valueSet = new Set<CascaderDataValueType>()
        const nextValueMapping = new Map<CascaderDataValueType, CascaderNodeValue>()
        const flattenValue = flattenArray(value) as CascaderDataValueType[]
        flattenValue.forEach((key) => {
            valueSet.add(key)
        })

        function initValue(keys: CascaderDataValueType[]) {
            if (isEmpty(data)) return

            let inderminate = false

            keys.forEach((key) => {
                const { children } = nodeMapping.get(key)

                const checked = valueSet.has(key)

                if (children.length > 0) {
                    inderminate = initValue(children)
                }

                nextValueMapping.set(key, { checked, indeterminate: false })
            })

            return inderminate
        }

        const rootKeys = []

        nodeMapping.forEach(({ keyPath }, key) => {
            if (keyPath.length === 1) rootKeys.push(key)
        })

        initValue(rootKeys)

        updateValueMapping(nextValueMapping)
    }, [nodeMapping, value])

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

    const setSingleValue = useRefMethod((dataItem: CascaderData) => {
        const node = getNodeInfoByDataItem(dataItem)
        const { keyPath } = node
        setValue([keyPath])
    })

    /**
     * 多选模式中使用
     * 计算所有新增、减少的值，注入到一个数组中
     */
    const inject = useRefMethod((dataItem: CascaderData, temp: CascaderDataValueType[][]) => {
        const { keyPath, children } = getNodeInfoByDataItem(dataItem)
        if (children.length) {
            children.forEach((c) => {
                inject(getDataItemByKey(c), temp)
            })
        } else {
            temp.push(keyPath)
        }
    })

    const addValue = useRefMethod((dataItem: CascaderData) => {
        const addedValue: CascaderDataValueType[][] = []

        inject(dataItem, addedValue)
        setValue([...value, ...addedValue])
    })

    const removeValue = useRefMethod((dataItem: CascaderData) => {
        const removedValue: CascaderDataValueType[][] = []

        inject(dataItem, removedValue)
        setValue((prevValue) => {
            const nextValue = prevValue.filter((it) => !removedValue.some((t) => deepEql(it, t)))
            return nextValue
        })
    })

    const getCheckboxStateByDataItem = useRefMethod((dataItem: CascaderData) => {
        const key = getKey(dataItem)
        return valueMapping.get(key)
    })

    return {
        value,
        disabled,
        getNodeInfoByDataItem,
        setValue,
        getDataItemByKey,
        addValue,
        removeValue,
        getCheckboxStateByDataItem,
        setSingleValue,
    }
}
