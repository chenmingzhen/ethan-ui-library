import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isBoolean, isFunc, isString } from '../is'

interface UseListDatumProps {
    format?: string | ((value) => string | number)
    onChange?(value: any, data: any, checked: boolean)
    value?: any
    prediction?(formatValue, data): boolean
    disabled?: boolean | ((value) => boolean)
    limit?: number
    defaultValue?: any
}

function useListDatum(props: UseListDatumProps) {
    const { limit = 0, onChange } = props
    const [values, updateValues] = useMergedValue<any[], [any, boolean]>({
        defaultStateValue: [],
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
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
            return props.disabled(data)
        }
        return false
    })

    const prediction = useRefMethod((formatValue, data) => {
        if (isFunc(props.prediction)) return props.prediction(formatValue, data)

        return formatValue === format(data)
    })

    const add = useRefMethod((data, unshift = false) => {
        if (data === undefined || data === null) return

        let raws = Array.isArray(data) ? data : [data]

        raws = raws.filter((v) => {
            const isDisabled = disabled(v)

            if (isDisabled) return false

            return true
        })

        const nextValues = []

        for (let i = 0; i < raws.length; i++) {
            const formatDataValue = format(raws[i])

            if (formatDataValue !== undefined) {
                nextValues.push(formatDataValue)
            }
        }

        updateValues(unshift ? nextValues.concat(values) : values.concat(nextValues), data, true)
    })

    const remove = useRefMethod((data) => {
        if (!data) return

        let raws = Array.isArray(data) ? data : [data]

        raws = raws.filter((r) => !disabled(r))

        const nextValues = []

        outer: for (let i = 0; i < values.length; i++) {
            const value = values[i]

            for (let j = 0; j < raws.length; j++) {
                if (prediction(value, raws[j])) {
                    raws.splice(j, 1)

                    continue outer
                }
            }

            nextValues.push(value)
        }

        updateValues(nextValues, data, false)
    })

    const check = useRefMethod((data) => {
        for (let i = 0; i < values.length; i++) {
            if (prediction(values[i], data)) return true
        }

        return false
    })

    return { add, remove, check, disabled }
}

export default useListDatum
