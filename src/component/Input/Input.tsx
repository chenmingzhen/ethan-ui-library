import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import cleanProps from '@/utils/cleanProps'
import { inputClass, popoverClass } from '@/styles'
import useInputStyle from '@/component/Input/hooks/useInputStyle'
import useMergedValue from '@/hooks/useMergedValue'
import { KeyboardKey } from '@/utils/keyboard'
import { isEmpty, isFunc, isNumber, isString } from '@/utils/is'
import useIsomorphicLayoutUpdateEffect from '@/hooks/useIsomorphicLayoutUpdateEffect'
import useValidate from '@/component/Input/hooks/useValidate'
import { IInputProps } from './type'
import WrapperPopover from './WrapperPopover'
import icons from '../icons'

const Input: React.FC<IInputProps> = function (props) {
    const {
        type,
        defaultValue,
        digits,
        className,
        clearable,
        onEnterPress,
        forwardedRef,
        onKeyUp,
        onBlur,
        border,
        size,
        disabled,
        width,
        style,
        rules,
        onError,
        autoFocus,
        onFocus,
        popoverProps,
        tip,
        trim,
        ...other
    } = props

    const [focus, updateFocus] = useState(autoFocus || false)
    const { error, validate } = useValidate({ rules })
    const [value, updateValue] = useMergedValue<string | number>({
        defaultStateValue: '',
        options: {
            value: props.value,
            defaultValue: props.defaultValue,
            onChange(changedValue) {
                if (props.onChange) {
                    props.onChange(changedValue)
                }
            },
        },
    })
    const { className: cls, style: ms } = useInputStyle({
        border,
        size,
        disabled,
        width,
        style,
        hasError: error,
        focus,
    })
    const inputRef = useRef<HTMLInputElement>()
    const enterLock = useRef(false)

    useEffect(() => {
        if (autoFocus) {
            inputRef.current.focus()
        }
    }, [])

    useIsomorphicLayoutUpdateEffect(() => {
        validate(value).catch()
    }, [value])

    const bindRef = useCallback((el) => {
        inputRef.current = el

        if (typeof forwardedRef === 'function') {
            forwardedRef(el)
        } else if (forwardedRef && Object.prototype.hasOwnProperty.call(forwardedRef, 'current')) {
            forwardedRef.current = el
        }
    }, [])

    const isInvalidNumber = (checkValue: string) => {
        // 在字符串中, \要多一个\进行转义
        let regStr = '^-?\\d*'

        if (digits === undefined) {
            regStr += '\\.?\\d*'
            // 最终结果 ^-?\d*\.?\d*$
        } else if (digits > 0) {
            regStr += `\\.?\\d{0,${digits}}`
            // 最终结果 ^-?\d*\.?\d{0,digits}$
        }
        regStr += '$'

        const reg = new RegExp(regStr)

        return !reg.test(checkValue)
    }

    const handleChange = (nextValue: string) => {
        if (type === 'number' && !isNumber(nextValue)) nextValue = String(nextValue).replace(/。/g, '.')

        if (type === 'number' && isInvalidNumber(nextValue)) return

        updateValue(nextValue)
    }

    const tryHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        handleChange(e.target.value)
    }

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === KeyboardKey.Enter && onEnterPress && !enterLock.current) {
            onEnterPress((e.target as any).value, e)
        }

        if (onKeyUp) onKeyUp(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (!focus) return

        if (onBlur) {
            onBlur(e)
        }

        updateFocus(false)

        if (trim && isString(value)) {
            updateValue(value.trim())
        }
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
        if (focus) return

        if (onFocus) onFocus(e)

        updateFocus(true)
    }

    const handleClearClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()

        handleChange('')

        inputRef.current.focus()
    }

    const tipInfo = useMemo(() => {
        if (error) {
            return error?.message
        }

        if (isFunc(tip)) {
            if (!isEmpty(value)) return tip(value)
        } else {
            return tip
        }
    }, [tip, value, error])

    // https://blog.csdn.net/u013096088/article/details/52873562
    // 利用onCompositionStart,onCompositionEnd处理中文流的问题
    // 中文模式 有输入法 点击回车后内容才会填充到输入框，但是点击回车会触发onKeyUp code=13的情况
    // 需要onCompositionStart进行上锁

    return (
        <WrapperPopover
            hasError={!!error}
            focus={focus}
            popoverProps={popoverProps}
            tip={tipInfo}
            className={popoverClass('input-tip', error && 'input-error')}
        >
            <div style={ms} className={cls}>
                <input
                    {...cleanProps(other)}
                    disabled={disabled}
                    type={type === 'password' ? type : 'text'}
                    value={value || ''}
                    ref={bindRef}
                    key="input"
                    onFocus={handleFocus}
                    onChange={tryHandleChange}
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur}
                    onCompositionStart={() => {
                        enterLock.current = true
                    }}
                    onCompositionEnd={() => {
                        setTimeout(() => {
                            enterLock.current = false
                        }, 100)
                    }}
                />
                {!disabled && clearable && value !== '' && (
                    <div
                        className={inputClass('clear')}
                        onClick={handleClearClick}
                        // Do not trigger onBlur when clear input
                        /** @see https://github.com/react-component/input/blob/master/src/BaseInput.tsx */
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {icons.CloseCircle}
                    </div>
                )}
            </div>
        </WrapperPopover>
    )
}

export default Input
