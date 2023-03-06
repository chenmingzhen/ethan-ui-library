import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isBoolean, isFunc, isObject } from '@/utils/is'
import deepEqual from 'deep-eql'
import { RadioData, RadioDataValueType } from '../type'

interface UseListDatumProps {
    onChange?(values: RadioDataValueType): void
    value?: RadioDataValueType
    disabled?: boolean | ((data: RadioData) => boolean)
    defaultValue?: RadioDataValueType
    valueKey: string
}

function useRadioGroupValue(props: UseListDatumProps) {
    const { onChange, valueKey } = props

    const [value, updateValue] = useMergedValue<RadioDataValueType>({
        defaultStateValue: undefined,
        options: {
            defaultValue: props.defaultValue,
            value: props.value,
            onChange(nextValues) {
                if (onChange) {
                    onChange(nextValues)
                }
            },
        },
    })

    const getValueByDataItem = useRefMethod((dataItem: RadioData) =>
        isObject(dataItem) ? dataItem[valueKey] : dataItem
    )

    const setByDataItem = useRefMethod((dataItem: RadioData) => {
        updateValue(getValueByDataItem(dataItem))
    })

    const setByDateValue = useRefMethod((dataValue: RadioDataValueType) => {
        updateValue(dataValue)
    })

    const disabled = useRefMethod((dataItem: RadioData) => {
        if (isBoolean(props.disabled)) {
            return props.disabled
        }
        if (isFunc(props.disabled)) {
            return props.disabled(dataItem)
        }
        return false
    })

    const getCheckedStateByDataItem = useRefMethod((dataItem: RadioData) =>
        deepEqual(value, getValueByDataItem(dataItem))
    )

    const getCheckedStateByDataValue = useRefMethod((dataValue: RadioDataValueType) => deepEqual(value, dataValue))

    return { disabled, setByDataItem, setByDateValue, getCheckedStateByDataItem, getCheckedStateByDataValue }
}

export default useRadioGroupValue
