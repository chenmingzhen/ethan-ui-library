import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isBoolean, isFunc, isObject } from '@/utils/is'
import deepEqual from 'deep-eql'
import { CheckboxData, CheckboxDataValueType } from '../type'

interface UseListDatumProps {
    onChange?(values: CheckboxDataValueType[], data: CheckboxData, checked: boolean): void
    value?: CheckboxDataValueType[]
    disabled?: boolean | ((data: CheckboxData, values: CheckboxDataValueType[]) => boolean)
    defaultValue?: CheckboxDataValueType[]
    valueKey: string
}

function useCheckboxGroupValues(props: UseListDatumProps) {
    const { onChange, valueKey } = props

    const [values, updateValues] = useMergedValue<CheckboxDataValueType[], [CheckboxData, boolean]>({
        defaultStateValue: [],
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
            onChange(nextValues, prevValue, ...args) {
                if (onChange) {
                    onChange(nextValues, ...args)
                }
            },
        },
    })

    const getValueByDataItem = useRefMethod((dataItem: CheckboxData) =>
        isObject(dataItem) ? dataItem[valueKey] : dataItem
    )

    const disabled = useRefMethod((data) => {
        if (isBoolean(props.disabled)) {
            return props.disabled
        }
        if (isFunc(props.disabled)) {
            return props.disabled(data, values)
        }
        return false
    })

    const addByDataItem = useRefMethod((dataItem: CheckboxData) => {
        const value = getValueByDataItem(dataItem)
        const nextValues: CheckboxDataValueType[] = [...values, value]

        updateValues(nextValues, dataItem, true)
    })

    const removeByDataItem = useRefMethod((dataItem: CheckboxData) => {
        const nextValues = [...values].filter((value) => value !== getValueByDataItem(dataItem))

        updateValues(nextValues, dataItem, false)
    })

    const getCheckedStateByDataItem = useRefMethod((dataItem: CheckboxData) => {
        for (let i = 0; i < values.length; i++) {
            if (deepEqual(values[i], getValueByDataItem(dataItem))) return true
        }

        return false
    })

    /** -------------------------------- */

    const addByDataValue = useRefMethod((dataValue: CheckboxDataValueType) => {
        const nextValues: CheckboxDataValueType[] = [...values, dataValue]

        updateValues(nextValues, dataValue, true)
    })

    const removeByDataValue = useRefMethod((dateValue: CheckboxDataValueType) => {
        const nextValues = [...values].filter((value) => value !== dateValue)

        updateValues(nextValues, dateValue, false)
    })

    const getCheckedStateByValue = useRefMethod((value: CheckboxDataValueType) => {
        for (let i = 0; i < values.length; i++) {
            if (deepEqual(values[i], value)) return true
        }

        return false
    })

    return {
        addByDataItem,
        removeByDataItem,
        getCheckedStateByDataItem,
        disabled,
        values,
        addByDataValue,
        removeByDataValue,
        getCheckedStateByValue,
    }
}

export default useCheckboxGroupValues
