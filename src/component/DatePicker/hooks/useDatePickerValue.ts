import useMergedValue from '@/hooks/useMergedValue'
import { DatePickerProps } from '../type'

type UseDatePickerValueProps = Pick<DatePickerProps, 'defaultValue' | 'value' | 'format' | 'type' | 'onChange'>

function useDatePickerValue(props: UseDatePickerValueProps) {
    const { onChange, defaultValue } = props

    const [value, updateValue] = useMergedValue<Date, [string]>({
        defaultStateValue: undefined,
        options: {
            defaultValue,
            value: props.value,
            onChange(date, _, dateStr) {
                if (onChange) {
                    onChange(date, dateStr)
                }
            },
        },
    })

    return { value, updateValue }
}

export default useDatePickerValue
