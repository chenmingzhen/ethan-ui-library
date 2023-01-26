import useListDatum from '@/utils/Datum/useListDatum'
import { isBoolean, isNumber, isString } from '@/utils/is'
import { useMemo, useRef } from 'react'

interface UseSelectValueProps {
    multiple: boolean
    cacheAble: boolean
    onChange?
    onCreate
    prediction
    defaultValue
    value
    disabled
    selectData
    format
}

function useSelectValues(props: UseSelectValueProps) {
    const { multiple, onChange, defaultValue, value, cacheAble, onCreate, selectData, format } = props
    const { add, set, remove, prediction, values, disabled, check, getDataByValue, updateValues } = useListDatum({
        limit: multiple ? 0 : 1,
        prediction: props.prediction,
        defaultValue,
        value,
        disabled: props.disabled,
        onChange,
        format,
    })
    const selectValueCacheMap = useRef(new Map()).current

    function createData(text: string | number) {
        const createFn = isBoolean(onCreate) ? (t) => t : onCreate

        return createFn(text)
    }

    const selectValues = useMemo(
        () =>
            values.reduce((accumulation, currentValue) => {
                let result = cacheAble ? selectValueCacheMap.get(currentValue) : undefined

                if (result === undefined) {
                    for (const item of selectData) {
                        if (prediction(currentValue, item)) {
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

                    if (result !== undefined && cacheAble) {
                        selectValueCacheMap.set(currentValue, result)
                    }
                }

                if (result !== undefined) {
                    accumulation.push(result)
                }

                return accumulation
            }, []),
        [values, selectData]
    )

    return { selectValues, add, remove, disabled, set, check, getDataByValue, updateSelectValues: updateValues }
}

export default useSelectValues
