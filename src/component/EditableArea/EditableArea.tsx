import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { editableAreaClass } from '@/styles'
import { focusElement, getParent } from '@/utils/dom/element'
import { isEmpty, isString } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useEffect, useRef, useState } from 'react'
import Input from '../Input'
import Popover from '../Popover'
import Textarea from '../Textarea'
import { EditableProps } from './type'

const EditableArea: React.FC<EditableProps> = (props) => {
    const {
        defaultValue,
        onChange,
        className,
        style,
        getPopupContainer,
        placeholder,
        disabled,
        border,
        width,
        clearable,
        maxHeight,
        onFocus,
        onBlur,
        trim,
    } = props
    const inputRef = useRef<HTMLInputElement>()
    const textareaId = useRef(getUidStr()).current
    const [popWidth, updatePopWidth] = useState(0)
    const [showTextarea, updateShowTextarea] = useState(false)
    const [value, updateValue] = useMergedValue({
        defaultStateValue: '',
        options: {
            defaultValue,
            value: props.value,
            onChange(nextValue) {
                if (onChange) {
                    onChange(nextValue)
                }
            },
        },
    })

    const cls = classnames(className, editableAreaClass('_', !border && 'none-border'))
    const ms = Object.assign({ width }, style)
    const popStyle: React.CSSProperties = { width: popWidth }

    const handleBlur = useRefMethod((e) => {
        if (onBlur) onBlur(e)

        updateShowTextarea(false)

        if (trim && isString(value)) {
            updateValue(value.trim())
        }
    })

    const handleInputFocus = useRefMethod(() => {
        const { offsetWidth = 0 } = getParent(inputRef.current, `.${editableAreaClass('input')}`) || {}

        updatePopWidth(offsetWidth)
        updateShowTextarea(true)
    })

    const getFormatValue = useRefMethod(() => {
        if (isEmpty(value)) return ''

        const arr = value.split('\n')
        const len = arr.length

        return len > 1 ? `${arr[0]}...` : value
    })

    useEffect(() => {
        if (showTextarea) {
            setTimeout(() => {
                const target = document.getElementById(textareaId)

                if (target) focusElement.end(target)
            }, 100)
        }
    }, [showTextarea])

    return (
        <Popover
            visible={showTextarea}
            showArrow={false}
            className={editableAreaClass('popover')}
            innerProps={{ style: popStyle }}
            getPopupContainer={getPopupContainer}
            animation={false}
            placement="cover"
            content={
                <Textarea
                    className={editableAreaClass('text-area')}
                    autoSize
                    value={value}
                    rows={1}
                    onChange={updateValue}
                    onBlur={handleBlur}
                    onFocus={onFocus}
                    placeholder={placeholder}
                    maxHeight={maxHeight}
                    id={textareaId}
                    clearable={clearable}
                />
            }
        >
            <div className={cls} style={ms}>
                <Input
                    forwardedRef={inputRef}
                    placeholder={placeholder}
                    value={getFormatValue()}
                    className={editableAreaClass('input')}
                    onFocus={handleInputFocus}
                    disabled={disabled}
                    clearable={clearable}
                    onChange={updateValue}
                />
            </div>
        </Popover>
    )
}

EditableArea.displayName = 'EthanEditableArea'

export default EditableArea
