import React, { useState, useCallback, useEffect, useRef } from 'react'
import { inputClass } from '@/styles'
import cleanProps from '@/utils/cleanProps'
import { TextareaProps } from './type'

const Textarea: React.FC<TextareaProps> = (props) => {
    const [height, setHeight] = useState(0)

    const shadowElement = useRef<HTMLTextAreaElement>()

    const { value, autoSize, onChange, onEnterPress, onBlur, maxHeight, showCount, resize, ...otherProps } = props

    const textareaResize = useCallback(
        (newValue?: string) => {
            if (newValue || newValue === '') shadowElement.current.value = newValue

            const newHeight = shadowElement.current ? shadowElement.current.scrollHeight : 0

            setHeight(newHeight)
        },
        [height]
    )

    const handleChange = useCallback(
        (e: React.ChangeEvent<HTMLTextAreaElement>) => {
            const newValue = e.target.value

            if (onChange) onChange(newValue)

            if (autoSize) textareaResize(newValue)
        },
        [autoSize]
    )

    const handleKeyUp = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.keyCode === 13 && onEnterPress) {
                onEnterPress((e.target as any).value, e)
            }
        },
        [onEnterPress]
    )

    const handleBlur = useCallback(
        (e: React.FocusEvent<HTMLTextAreaElement>) => {
            if (onBlur) onBlur(e)
        },
        [onBlur]
    )

    useEffect(() => {
        if (autoSize) {
            textareaResize()
        }
    }, [value])

    const newHeight = height || 'auto'

    const className = inputClass(autoSize && 'auto-size', !autoSize && resize && 'textarea-resize')

    const info = React.useMemo(() => {
        if (!showCount) return

        if (props.maxLength) {
            return `${value?.length || 0}/${props.maxLength}`
        }

        return `${value?.length || 0}`
    }, [showCount, value])

    const children = (
        <>
            <textarea
                {...cleanProps(otherProps)}
                value={value ?? ''}
                className={className}
                style={{ height: newHeight, maxHeight, overflow: 'auto' }}
                onChange={handleChange}
                onKeyUp={handleKeyUp}
                onBlur={handleBlur}
            />

            {autoSize && (
                <textarea ref={shadowElement} className={inputClass('shadow')} rows={props.rows} defaultValue={value} />
            )}
        </>
    )

    return showCount ? (
        <span className={inputClass(showCount && 'showCount')} data-count={info}>
            {children}
        </span>
    ) : (
        children
    )
}

Textarea.defaultProps = {
    rows: 4,
    resize: false,
}

export default React.memo(Textarea)
