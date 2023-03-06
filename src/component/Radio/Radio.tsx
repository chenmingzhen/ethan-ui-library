import useMergedValue from '@/hooks/useMergedValue'
import { checkInputClass } from '@/styles'
import classnames from 'classnames'
import React, { useContext, useMemo } from 'react'
import { RadioGroupContext } from './context'
import { RadioProps } from './type'

const Radio: React.FC<RadioProps> = function (props) {
    const { disabled, style, children, value, index, onChange } = props
    const context = useContext(RadioGroupContext)
    const [checked, updateChecked] = useMergedValue<any, [number]>({
        defaultStateValue: false,
        options: {
            defaultValue: props.defaultChecked,
            value: props.checked ?? props.value,
            onChange(nextValue, _, i) {
                if (onChange) {
                    onChange(nextValue, i)
                }
            },
        },
    })
    const mergedChecked = useMemo(() => {
        if (context && context.checked) return context.checked(value)

        return checked
    }, [checked, context])

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (disabled) return

        const isChecked = e.target.checked

        updateChecked(isChecked, index)

        if (context && context.onRadioGroupItemChange) context.onRadioGroupItemChange(value, isChecked)
    }

    const className = classnames(
        checkInputClass('_', disabled && 'disabled', mergedChecked === true && 'checked'),
        props.className
    )

    return (
        <label className={className} style={style} tabIndex={disabled ? undefined : 0}>
            <input
                disabled={disabled}
                tabIndex={-1}
                type="radio"
                onChange={handleChange}
                checked={mergedChecked === true}
                className={checkInputClass('indicator', 'radio')}
            />

            <i className={checkInputClass('indicator', 'radio')} />

            {children && <span>{children}</span>}
        </label>
    )
}

export default React.memo(Radio)
