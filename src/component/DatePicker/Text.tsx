import React, { useCallback, useState } from 'react'
import { KeyboardKey } from '@/utils/keyboard'
import { DatePickerTextProps } from './type'
import Input from '../Input'
import utils from './utils'

const useMergeState = (propsValue = '') => {
    const [value, updateValue] = useState<string>('')

    if (value) return [value, updateValue] as [string, (value: string) => void]

    return [propsValue, updateValue] as [string, (value: string) => void]
}

const Text: React.FC<DatePickerTextProps> = props => {
    const { disabled, className, index, inputAble, onTextBlur, format, placeholder, value, size } = props

    const [textValue, updateTextValue] = useMergeState(value)

    if (!inputAble || disabled) return <span className={className}>{textValue || placeholder}</span>

    const handleBlur = useCallback(() => {
        if (!textValue.length) {
            onTextBlur(undefined, index)
        } else {
            const newValue = utils.toDateWithFormat(textValue, format)

            if (newValue) {
                onTextBlur(newValue, index)
            }
        }

        updateTextValue('')
    }, [onTextBlur, index, textValue, value])

    const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = useCallback(
        evt => {
            if (evt.key === KeyboardKey.Enter) {
                handleBlur()
            }
        },
        [handleBlur]
    )

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
