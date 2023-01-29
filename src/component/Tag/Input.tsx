import React from 'react'
import { tagClass } from '@/styles'
import { KeyboardKey } from '@/utils/keyboard'
import { TagInputProps } from './type'
import Input from '../Input'

const TagInput: React.FC<TagInputProps> = ({ value, onBlur, onChange, onEnterPress, onFocus, onKeyUp }) => {
    function handleKeyUp(e: React.KeyboardEvent<HTMLInputElement>) {
        const val = (e.target as any).value

        if (e.key === KeyboardKey.Enter) {
            if (onEnterPress) {
                onEnterPress(val, e)
            }

            if (onBlur) {
                onBlur(val, e)
            }
        }

        if (onKeyUp) {
            onKeyUp(e)
        }
    }

    function handleBlur(e: React.FocusEvent<HTMLInputElement>) {
        if (onBlur) {
            onBlur(e.target.value, e)
        }
    }

    return (
        <Input
            type="text"
            value={value}
            onFocus={onFocus}
            onChange={onChange}
            onKeyUp={handleKeyUp}
            onBlur={handleBlur}
            autoFocus
            width={100}
            className={tagClass('input')}
        />
    )
}

export default React.memo(TagInput)
