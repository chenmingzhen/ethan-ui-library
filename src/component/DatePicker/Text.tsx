import useRefMethod from '@/hooks/useRefMethod'
import { KeyboardKey } from '@/utils/keyboard'
import React, { useCallback, useEffect, useState } from 'react'
import { debounce } from '@/utils/func'
import { datePickerClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import { DatePickerTextProps } from './type'
import Input from '../Input'
import utils from './utils'

const Text: React.FC<DatePickerTextProps> = function (props) {
    const {
        disabled,
        index,
        inputAble,
        onTextBlur,
        format,
        placeholder,
        value,
        size,
        onInputValidDate,
        forwardedInputRef,
        hover,
    } = props
    const readOnly = !inputAble || disabled
    const [textValue, updateTextValue] = useState(value || '')
    const [blur, updateBlur] = useState({})
    const handleBlur = useRefMethod(() => {
        if (readOnly || textValue === value) return

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

        if (date) {
            handleInputValidDate(date)
        }
    })

    return (
        <Input
            trim
            disabled={disabled}
            autoComplete="off"
            onBlur={handleBlur}
            onChange={handleChange}
            value={textValue}
            onKeyDown={handleKeyDown}
            size={size}
            readOnly={readOnly}
            forwardedRef={forwardedInputRef}
            placeholder={placeholder}
            className={datePickerClass(
                'input',
                !readOnly && 'search',
                !isEmpty(hover) && !isEmpty(index) && hover === index && 'panel-hover'
            )}
        />
    )
}

export default React.memo(Text)
