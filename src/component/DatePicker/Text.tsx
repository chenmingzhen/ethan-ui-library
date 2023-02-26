import useRefMethod from '@/hooks/useRefMethod'
import { KeyboardKey } from '@/utils/keyboard'
import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from '@/utils/func'
import { DatePickerTextProps } from './type'
import Input from '../Input'
import utils from './utils'

const Text: React.FC<DatePickerTextProps> = function (props) {
    const { disabled, className, index, inputAble, onTextBlur, format, placeholder, value, size, onInputValidDate } =
        props
    const [textValue, updateTextValue] = useState(value || '')
    const [blur, updateBlur] = useState({})
    const handleBlur = useRefMethod(() => {
        if (!textValue.length) {
            onTextBlur(null, index)
        } else {
            const nextDate = utils.toDateWithFormat(textValue, format)

            if (nextDate) {
                onTextBlur(nextDate, index)
            } else {
                onTextBlur(null, index)
            }
        }

        updateBlur({})
    })

    useEffect(() => {
        updateTextValue(value || '')
    }, [value, blur])

    /** 不能立即改变，避免出现补位的情况 eg:输入 =》2023-02-2 马上变为 2023-02-02 */
    const handleInputValidDate = useCallback(
        debounce((date: Date) => {
            onInputValidDate(date, index)
        }, 500),
        []
    )

    const handleKeyDown = useRefMethod((evt: React.KeyboardEvent) => {
        if (evt.key === KeyboardKey.Enter) {
            handleBlur()
        }
    })

    const handleChange = useRefMethod((inputValue) => {
        const date = utils.toDateWithFormat(inputValue, format)
        updateTextValue(inputValue)

        handleInputValidDate.cancel()

        if (date) {
            handleInputValidDate(date)
        }
    })

    if (!inputAble || disabled) return <span className={className}>{textValue || placeholder}</span>

    return (
        <Input
            onBlur={handleBlur}
            onChange={handleChange}
            className={className}
            value={textValue}
            onKeyDown={handleKeyDown}
            size={size}
            trim
        />
    )
}

export default React.memo(Text)
