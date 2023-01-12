import useMergedValue from '@/hooks/useMergedValue'
import { checkInputClass } from '@/styles'
import classnames from 'classnames'
import React from 'react'
import { SwitchProps } from './type'

const Switch: React.FC<SwitchProps> = function (props) {
    const { disabled, size, content = [], onClick, defaultChecked, onChange, style } = props
    const [checked, updateChecked] = useMergedValue<boolean>({
        defaultStateValue: false,
        options: {
            defaultValue: defaultChecked,
            value: props.value ?? props.checked,
            onChange(nextValue) {
                if (onChange) {
                    onChange(nextValue)
                }
            },
        },
    })

    function handleChange(isChecked: boolean) {
        if (disabled) return

        updateChecked(isChecked)
    }

    function handleSwitchChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChange(e.target.checked)
    }

    const className = classnames(
        checkInputClass('_', disabled && 'disabled', checked === true && 'checked', 'switch', {
            large: size === 'large',
            small: size === 'small',
        }),
        props.className
    )

    const [checkedChildren, uncheckedChildren] = content

    return (
        <label className={className} style={style} tabIndex={disabled ? undefined : 0}>
            {size !== 'small' ? (
                <span className={checkInputClass('switch-children')}>
                    {checked ? checkedChildren : uncheckedChildren}
                </span>
            ) : null}

            <input
                type="checkbox"
                disabled={disabled}
                tabIndex={-1}
                onClick={onClick}
                onChange={handleSwitchChange}
                checked={checked}
                className={checkInputClass('indicator', 'switch')}
            />

            <i className={checkInputClass('indicator', 'switch')} />

            <span className={checkInputClass('switch-indicator')} />
        </label>
    )
}

export default React.memo(Switch)
