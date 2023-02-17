import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { KeyboardKey } from '@/utils/keyboard'
import React from 'react'
import { DatePickerTextProps } from '../DatePicker/type'
import Input from '../Input'
import utils from './utils'

const Text: React.FC<DatePickerTextProps> = function (props) {
    const { disabled, className, index, inputAble, onTextBlur, format, placeholder, value, size } = props
    const [textValue, updateTextValue] = useMergedValue({ defaultStateValue: '', options: { value } })

    const handleBlur = useRefMethod(() => {
        if (!textValue.length) {
            onTextBlur(undefined, index)
        } else {
            const nextDate = utils.toDateWithFormat(textValue, format)

            if (nextDate) {
                onTextBlur(nextDate, index)
            }
        }
    })

    const handleKeyDown = useRefMethod((evt: React.KeyboardEvent) => {
        if (evt.key === KeyboardKey.Enter) {
            handleBlur()
        }
    })

    if (!inputAble || disabled) return <span className={className}>{textValue || placeholder}</span>

    return (
        <Input
            onBlur={handleBlur}
            onChange={updateTextValue}
            className={className}
            value={textValue}
            onKeyDown={handleKeyDown}
            size={size}
            trim
        />
    )
}

export default React.memo(Text)
