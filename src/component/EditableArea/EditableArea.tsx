import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { editableAreaClass } from '@/styles'
import { focusElement, getParent } from '@/utils/dom/element'
import { isEmpty, isString } from '@/utils/is'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useEffect, useMemo, useRef, useState } from 'react'
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
            onChange,
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

    const formatValue = useMemo(() => {
        if (isEmpty(value)) return ''

        const arr = value.split('\n')
        const len = arr.length

        return len > 1 ? `${arr[0]}...` : value
    }, [value])

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
            showArrow={false}
            animation={false}
            placement="cover"
            visible={showTextarea}
            innerProps={{ style: popStyle }}
            getPopupContainer={getPopupContainer}
            className={editableAreaClass('popover')}
            content={
                <Textarea
                    autoSize
                    rows={1}
                    value={value}
                    id={textareaId}
                    onFocus={onFocus}
                    onBlur={handleBlur}
                    maxHeight={maxHeight}
                    clearable={clearable}
                    onChange={updateValue}
                    placeholder={placeholder}
                    className={editableAreaClass('text-area')}
                />
            }
        >
            <div className={cls} style={ms}>
                <Input
                    disabled={disabled}
                    value={formatValue}
                    clearable={clearable}
                    onChange={updateValue}
                    forwardedRef={inputRef}
                    placeholder={placeholder}
                    onFocus={handleInputFocus}
                    className={editableAreaClass('input')}
                />
            </div>
        </Popover>
    )
}

EditableArea.displayName = 'EthanEditableArea'

export default EditableArea
