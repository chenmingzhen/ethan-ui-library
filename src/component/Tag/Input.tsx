import React, { useRef } from 'react'
import inputBorder from '@/hoc/inputBorder'
import { tagClass } from '@/styles'

export interface TagInputProps {
    value?: string

    onBlur?: (value: string, e: React.KeyboardEvent<HTMLInputElement> | React.FocusEvent<HTMLInputElement>) => void

    onChange?: (value: string) => void

    onKeyUp?: (e: React.KeyboardEvent<HTMLInputElement>) => void

    onEnterPress?: (value: string, e: React.KeyboardEvent<HTMLInputElement>) => void

    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void
}

const TagInput: React.FC<TagInputProps> = ({ value, onBlur, onChange, onEnterPress, onFocus, onKeyUp }) => {
    const inputRef = useRef<HTMLInputElement>()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        onChange?.(e.target.value)
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.keyCode === 13) {
            onEnterPress?.(e.target.value, e)

            onBlur?.(e.target.value, e)
        }

        onKeyUp?.(e)
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        onBlur?.(e.target.value, e)
    }

    React.useEffect(() => {
        inputRef.current.focus()
    }, [])

    return (
        <input
            ref={inputRef}
            type="text"
            value={value}
            onFocus={onFocus}
            onChange={handleChange}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
        />
    )
}

const HocTagInput = inputBorder(
    {
        className: tagClass('input'),
    },
    TagInput
) as React.FC<TagInputProps>

HocTagInput.displayName = 'EthanTagInput'

export default React.memo(HocTagInput)
