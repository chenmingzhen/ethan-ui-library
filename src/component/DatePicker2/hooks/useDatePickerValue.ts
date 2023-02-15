import { DatePickerProps } from '@/component/DatePicker/type'
import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import utils from '../utils'

type UseDatePickerValueProps = Pick<DatePickerProps, 'defaultValue' | 'value' | 'format' | 'type' | 'onChange'>

function useDatePickerValue(props: UseDatePickerValueProps) {
    const { format, onChange } = props
    const convertValue2FormatStr = useRefMethod((rawValue: string | number) => {
        if (!rawValue) return undefined

        const date = utils.toDateWithFormat(rawValue, format)

        if (!date) return undefined

        const formatValue = utils.format(date, format, {
            weekStartsOn: getLocale('startOfWeek'),
        })

        return formatValue
    })

    const [value, updateValue] = useMergedValue<string, [Date]>({
        defaultStateValue: undefined,
        options: {
            defaultValue: convertValue2FormatStr(props.defaultValue),
            value: convertValue2FormatStr(props.value),
            onChange(nextValue, _, date) {
                if (onChange) {
                    onChange(nextValue, date)
                }
            },
        },
    })

    return { value, updateValue }
}

export default useDatePickerValue
