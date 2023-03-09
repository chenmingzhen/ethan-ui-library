import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { isBoolean, isFunc, isObject } from '@/utils/is'
import { useMemo } from 'react'
import { TransferData, TransferDataValueType } from '../type'

interface UseTransferDatumProps {
    onChange?(values: TransferDataValueType[], data: TransferData, checked: boolean): void
    value?: TransferDataValueType[]
    disabled?: boolean | ((data: TransferData, values: TransferDataValueType[]) => boolean)
    defaultValue?: TransferDataValueType[]
    valueKey: string
}

function useTransferDatum(props: UseTransferDatumProps) {
    const { onChange, valueKey } = props
    const [values, updateValues] = useMergedValue<TransferDataValueType[], [TransferData, boolean]>({
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

    const checkedMapping = useMemo(() => {
        const map = new Map<TransferDataValueType, boolean>()

        values.forEach((value) => {
            map.set(value, true)
        })

        return map
    }, [values])

    const getValueByDataItem = useRefMethod((dataItem: TransferData) =>
        isObject(dataItem) ? dataItem[valueKey] : dataItem
    )

    const disabled = useRefMethod((data: TransferData) => {
        if (isBoolean(props.disabled)) {
            return props.disabled
        }
        if (isFunc(props.disabled)) {
            return props.disabled(data, values)
        }
        return false
    })

    const addByDataItems = useRefMethod((dataItems: TransferData[]) => {
        const addValues = dataItems.map(getValueByDataItem)
        const nextValues: TransferDataValueType[] = [...addValues, ...values]

        updateValues(nextValues, dataItems, true)
    })

    const removeByDataItems = useRefMethod((dataItems: TransferData[]) => {
        const removeValues = dataItems.map(getValueByDataItem)
        const nextValues = [...values].filter((value) => !removeValues.includes(value))

        updateValues(nextValues, dataItems, false)
    })

    const getCheckedStateByDataItem = useRefMethod((dataItem: TransferData) =>
        checkedMapping.has(getValueByDataItem(dataItem))
    )

    return {
        addByDataItems,
        removeByDataItems,
        getCheckedStateByDataItem,
        disabled,
        values,
    }
}

export default useTransferDatum
