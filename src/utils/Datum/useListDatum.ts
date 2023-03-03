import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isArray, isBoolean, isFunc, isString } from '../is'

interface UseListDatumProps {
    format?: string | ((data) => string | number)
    onChange?(value: any, data: any, checked: boolean): void
    value?: any
    prediction?(formatValue, data): boolean
    disabled?: boolean | ((data, values) => boolean)
    limit?: number
    defaultValue?: any
}

function transformValue2Array(value) {
    if (value === undefined || value === null) return undefined

    return isArray(value) ? value : [value]
}

function useListDatum(props: UseListDatumProps) {
    const { limit = 0, onChange } = props

    const [values, updateValues] = useMergedValue<any[], [any, boolean]>({
        defaultStateValue: [],
        options: {
            defaultValue: transformValue2Array(props.defaultValue),
            value: transformValue2Array(props.value),
            onChange(nextValues, prevValue, ...args) {
                if (onChange) {
                    const limitValues = limit === 1 ? nextValues[0] : nextValues
                    onChange(limitValues, ...args)
                }
            },
        },
    })

    const format = useRefMethod((data) => {
        if (isString(props.format)) {
            return data[props.format]
        }
        if (isFunc(props.format)) {
            return props.format(data)
        }
        return data
    })

    const disabled = useRefMethod((data) => {
        if (isBoolean(props.disabled)) {
            return props.disabled
        }
        if (isFunc(props.disabled)) {
            return props.disabled(data, values)
        }
        return false
    })

    const prediction = useRefMethod((formatValue, data) => {
        if (isFunc(props.prediction)) return props.prediction(formatValue, data)

        return formatValue === format(data)
    })

    const add = useRefMethod((dataItem, unshift = false) => {
        if (dataItem === undefined || dataItem === null) return

        const dataList = (Array.isArray(dataItem) ? dataItem : [dataItem]).filter((v) => !disabled(v))
        const nextValues = []

        for (let i = 0; i < dataList.length; i++) {
            const dataValue = format(dataList[i])

            if (dataValue !== undefined) {
                nextValues.push(dataValue)
            }
        }

        updateValues(unshift ? nextValues.concat(values) : values.concat(nextValues), dataItem, true)
    })

    const remove = useRefMethod((dataItem) => {
        if (!dataItem) return

        const dataList = (Array.isArray(dataItem) ? dataItem : [dataItem]).filter((v) => !disabled(v))
        const nextValues = []

        outer: for (let i = 0; i < values.length; i++) {
            const value = values[i]

            for (let j = 0; j < dataList.length; j++) {
                if (prediction(value, dataList[j])) {
                    dataList.splice(j, 1)

                    continue outer
                }
            }

            nextValues.push(value)
        }

        updateValues(nextValues, dataItem, false)
    })

    const check = useRefMethod((data) => {
        for (let i = 0; i < values.length; i++) {
            if (prediction(values[i], data)) return true
        }

        return false
    })

    const set = useRefMethod((dataItem) => {
        const dataList = (Array.isArray(dataItem) ? dataItem : [dataItem]).filter((v) => !disabled(v))
        const nextValues = []

        for (let i = 0; i < dataList.length; i++) {
            const formatDataValue = format(dataList[i])

            if (formatDataValue !== undefined) {
                nextValues.push(formatDataValue)
            }
        }

        updateValues(nextValues, dataItem, true)
    })

    const getDataByValue = useRefMethod((data, value) => {
        for (let i = 0; i < data.length; i++) {
            if (prediction(value, data[i])) return { data: data[i], index: i }
        }

        return null
    })

    return { add, remove, check, disabled, set, values, prediction, getDataByValue, updateValues }
}

export default useListDatum
