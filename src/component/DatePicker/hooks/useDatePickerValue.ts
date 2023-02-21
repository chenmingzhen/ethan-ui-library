import useMergedValue from '@/hooks/useMergedValue'
import shallowEqual from '@/utils/shallowEqual'
import { DatePickerProps } from '../type'

type UseDatePickerValueProps = Pick<DatePickerProps, 'defaultValue' | 'value' | 'onChange'>

function useDatePickerValue(props: UseDatePickerValueProps) {
    const { onChange, defaultValue } = props

    const [value, updateValue] = useMergedValue<Date, [string]>({
        defaultStateValue: undefined,
        options: {
            defaultValue,
            value: props.value,
            onChange(date, prevDate, dateStr) {
                /** 至少有一个Date是有值才执行,（避免Input无值失去焦点也执行一次onChange null） */
                if (onChange && (date || prevDate) && !shallowEqual(date, prevDate)) {
                    onChange(date, dateStr)
                }
            },
        },
    })

    return { value, updateValue }
}

export default useDatePickerValue
