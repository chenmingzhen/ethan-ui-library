import React, { useState, useRef, useMemo, useEffect } from 'react'
import { inputClass, popoverClass } from '@/styles'
import cleanProps from '@/utils/cleanProps'
import useMergedValue from '@/hooks/useMergedValue'
import { KeyboardKey } from '@/utils/keyboard'
import { isEmpty, isFunc, isString } from '@/utils/is'
import useIsomorphicLayoutUpdateEffect from '@/hooks/useIsomorphicLayoutUpdateEffect'
import classNames from 'classnames'
import { useIsomorphicLayoutEffect } from 'react-use'
import { TextareaProps } from './type'
import useInputStyle from '../Input/hooks/useInputStyle'
import useValidate from '../Input/hooks/useValidate'
import WrapperPopover from '../Input/WrapperPopover'
import icons from '../icons'

const Textarea: React.FC<TextareaProps> = (props) => {
    const [height, setHeight] = useState(0)
    const textareaElementRef = useRef<HTMLTextAreaElement>()
    const {
        autoSize,
        onChange,
        onEnterPress,
        onBlur,
        maxHeight,
        showCount,
        resize,
        defaultValue,
        trim,
        border,
        size,
        disabled,
        width,
        style,
        autoFocus,
        className,
        onFocus,
        popoverProps,
        rules,
        tip,
        clearable,
        ...otherProps
    } = props
    const [focus, updateFocus] = useState(autoFocus || false)
    const { error, validate } = useValidate({ rules })
    const { style: ms, className: cls } = useInputStyle({
        border,
        size,
        disabled,
        width,
        style,
        focus,
        className: classNames(className, inputClass(showCount && 'showCount')),
        hasError: !!error,
    })
    const [value, updateValue] = useMergedValue({
        defaultStateValue: '',
        options: {
            value: otherProps.value,
            defaultValue,
            onChange(nextValue) {
                if (onChange) {
                    onChange(nextValue)
                }
            },
        },
    })

    useIsomorphicLayoutUpdateEffect(() => {
        validate(value).catch(() => {})
    }, [value])

    useIsomorphicLayoutEffect(() => {
        if (autoSize) {
            textareaResize()
        }
    }, [value])

    useEffect(() => {
        if (autoFocus) {
            textareaElementRef.current.focus()
        }
    }, [])

    function textareaResize(newValue?: string) {
        if (newValue || newValue === '') textareaElementRef.current.value = newValue

        const nextHeight = textareaElementRef.current ? textareaElementRef.current.scrollHeight : 0

        setHeight(nextHeight)
    }

    function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
        const nextValue = e.target.value

        updateValue(nextValue)
    }

    function handleKeyUp(e: React.KeyboardEvent<HTMLTextAreaElement>) {
        e.preventDefault()

        if (e.key === KeyboardKey.Enter && onEnterPress) {
            onEnterPress((e.target as any).value, e)
        }
    }

    function handleBlur(e: React.FocusEvent<HTMLTextAreaElement>) {
        updateFocus(false)

        if (onBlur) onBlur(e)

        if (trim && isString(value)) {
            updateValue(value.trim())
        }
    }

    function handleFocus(e: React.FocusEvent<HTMLTextAreaElement, Element>) {
        if (onFocus) {
            onFocus(e)
        }

        updateFocus(true)
    }

    function handleClearClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault()

        updateValue('')
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

    const countInfo = useMemo(() => {
        if (!showCount) return ''

        if (props.maxLength) {
            return `${value?.length || 0}/${props.maxLength}`
        }

        return `${value?.length || 0}`
    }, [showCount, value])

    return (
        <WrapperPopover
            hasError={!!error}
            focus={focus}
            popoverProps={popoverProps}
            tip={tipInfo}
            className={popoverClass('input-tip', error && 'input-error')}
            shouldPop={!isEmpty(tip) || !isEmpty(rules)}
        >
            <div className={cls} style={ms} data-count={countInfo}>
                <textarea
                    {...cleanProps(otherProps)}
                    value={value ?? ''}
                    className={inputClass(autoSize && 'auto-size', !autoSize && resize && 'textarea-resize')}
                    style={{ height: height || 'auto', maxHeight, overflow: 'auto' }}
                    onChange={handleChange}
                    onKeyUp={handleKeyUp}
                    onBlur={handleBlur}
                    onFocus={handleFocus}
                    ref={textareaElementRef}
                />
                {!disabled && clearable && value !== '' && (
                    <div
                        className={inputClass('clear', 'textarea-clear')}
                        onClick={handleClearClick}
                        onMouseDown={(e) => e.preventDefault()}
                    >
                        {icons.CloseCircle}
                    </div>
                )}
            </div>
        </WrapperPopover>
    )
}

Textarea.defaultProps = {
    rows: 4,
    resize: false,
}

export default React.memo(Textarea)
