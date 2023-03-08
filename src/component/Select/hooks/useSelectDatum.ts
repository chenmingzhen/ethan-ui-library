import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isArray, isBoolean, isFunc, isNumber, isObject, isString } from '@/utils/is'
import { useMemo, useRef } from 'react'
import deepEqual from 'deep-eql'
import { SelectData, SelectDataValueType, SelectProps } from '../type'

interface UseSelectValueProps {
    multiple: boolean
    onChange?: SelectProps['onChange']
    onCreate: SelectProps['onCreate']
    defaultValue: SelectDataValueType | SelectDataValueType[]
    value: SelectDataValueType | SelectDataValueType[]
    disabled: SelectProps['disabled']
    data: SelectData[]
    valueKey: SelectProps['valueKey']
}

function transformValue2Array(value) {
    if (value === undefined || value === null) return undefined

    return isArray(value) ? value : [value]
}

function useSelectDatum(props: UseSelectValueProps) {
    const { multiple, onChange, defaultValue, onCreate, valueKey, data } = props
    const selectValueCacheMap = useRef(new Map()).current
    const [values, updateValues] = useMergedValue<SelectDataValueType[]>({
        defaultStateValue: [],
        options: {
            defaultValue: transformValue2Array(defaultValue),
            value: transformValue2Array(props.value),
            onChange(nextValues) {
                if (onChange) {
                    const limitValues = multiple ? nextValues : nextValues[0]

                    onChange(limitValues)
                }
            },
        },
    })

    /** Base */
    const disabled = useRefMethod((dataItem: SelectData) => {
        if (isBoolean(props.disabled)) {
            return props.disabled
        }
        if (isFunc(props.disabled)) {
            return props.disabled(dataItem, values)
        }
        return false
    })

    const getDataItemValue = useRefMethod((dataItem: SelectData) =>
        isObject(dataItem) ? dataItem[valueKey] : dataItem
    )

    const addByDataItem = useRefMethod((dataItem: SelectData) => {
        const value = getDataItemValue(dataItem)
        const nextValues: SelectDataValueType[] = [...values, value]

        updateValues(nextValues)
    })

    const removeByDataItem = useRefMethod((dataItem: SelectData) => {
        const nextValues = [...values].filter((value) => value !== getDataItemValue(dataItem))

        updateValues(nextValues)
    })

    const getCheckedStateByDataItem = useRefMethod((dataItem: SelectData) => {
        for (let i = 0; i < values.length; i++) {
            if (deepEqual(values[i], getDataItemValue(dataItem))) return true
        }

        return false
    })

    const setValuesByDataItems = useRefMethod((dataItems: SelectData[]) => {
        const nextValues = []

        for (let i = 0; i < dataItems.length; i++) {
            const value = getDataItemValue(dataItems[i])

            if (value !== undefined) {
                nextValues.push(value)
            }
        }

        updateValues(nextValues)
    })

    /**  */

    function createData(text: string | number) {
        const createFn = isBoolean(onCreate) ? (t) => t : onCreate

        return createFn(text)
    }

    /** 目前选中的DataItem，包含创建的值 */
    const selectedData = useMemo(
        () =>
            values.reduce<SelectData[]>((accumulation, currentValue) => {
                let result = selectValueCacheMap.get(currentValue)

                if (result === undefined) {
                    for (const item of data) {
                        const dataItemValue = getDataItemValue(item)
                        if (deepEqual(currentValue, dataItemValue)) {
                            result = item
                        }
                    }

                    if (result === undefined && onCreate) {
                        /** value是直接输入的，对应基本的数据类型data */
                        if (isString(currentValue) || isNumber(currentValue)) {
                            result = createData(currentValue)
                        } else {
                            /** 复杂的数据类型 */
                            result = currentValue
                        }
                    }

                    if (result !== undefined) {
                        selectValueCacheMap.set(currentValue, result)
                    }
                }

                if (result !== undefined) {
                    accumulation.push(result)
                }

                return accumulation
            }, []),
        [values, data]
    )

    return {
        selectedData,
        disabled,
        addByDataItem,
        removeByDataItem,
        getCheckedStateByDataItem,
        setValuesByDataItems,
        getDataItemValue,
    }
}

export default useSelectDatum
