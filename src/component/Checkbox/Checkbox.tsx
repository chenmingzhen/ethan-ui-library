import useMergedValue from '@/hooks/useMergedValue'
import { checkInputClass } from '@/styles'
import classnames from 'classnames'
import React, { useContext, useMemo } from 'react'
import { CheckboxContext } from './context'
import { CheckboxProps } from './type2'

const Checkbox: React.FC<CheckboxProps> = (props) => {
    const { disabled, style, children, onClick, value, index, onChange, indeterminate } = props
    const context = useContext(CheckboxContext)
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

    const className = classnames(
        checkInputClass(
            '_',
            disabled && 'disabled',
            mergedChecked === true && !indeterminate && 'checked',
            indeterminate && 'indeterminate'
        ),
        props.className
    )

    function handleChange(isChecked: boolean) {
        if (disabled) return

        updateChecked(isChecked, index)

        if (context && context.onCheckboxGroupItemChange) context.onCheckboxGroupItemChange(value, isChecked)
    }

    function handleCheckboxChange(e: React.ChangeEvent<HTMLInputElement>) {
        handleChange(e.target.checked)
    }

    /** @see https://www.w3school.com.cn/tags/tag_label.asp */
    /** for 属性规定 label 与哪个表单元素绑定 */
    /** label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。 */
    /** tabindex 属性规定当使用 "tab" 键进行导航时元素的顺序。 */
    return (
        <label className={className} style={style} tabIndex={disabled ? undefined : 0}>
            <input
                disabled={disabled}
                tabIndex={-1}
                type="checkbox"
                onClick={onClick}
                onChange={handleCheckboxChange}
                checked={mergedChecked === true}
                className={checkInputClass('indicator', 'checkbox')}
            />

            <i className={checkInputClass('indicator', 'checkbox')} />

            {children && <span>{children}</span>}
        </label>
    )
}

Checkbox.displayName = 'EthanCheckbox'

export default React.memo(Checkbox)
