// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { defaultProps, getProps } from '@/utils/proptypes'
import { getUidStr } from '@/utils/uid'
import { isEnterPress } from '@/utils/is'
import { checkInputClass } from '@/styles'
import Input from '../Input'

/**
 * @param type radio||switch||checkbox
 */
export default function(type) {
    class CheckItem extends PureComponent {
        constructor(props) {
            super(props)

            this.state = {
                checked: props.checked,
            }

            this.id = `cb_${getUidStr()}`
            this.input = null
            this.el = null
            this.handleChange = this.handleChange.bind(this)
            this.handleInputChange = this.handleInputChange.bind(this)
            this.handleEnter = this.handleEnter.bind(this)
            this.bindRef = this.bindRef.bind(this)
        }

        componentDidUpdate(prevProps) {
            const { checked, inputable, value, htmlValue } = this.props
            if (prevProps.value !== value && checked === undefined) {
                // eslint-disable-next-line
        this.setState({checked: inputable ? !!value : value === htmlValue})
            }
        }

        /**
         * 获取选中状态
         * @returns {boolean|*}
         */
        getChecked() {
            const { checked, value, htmlValue } = this.props
            // checked为函数 执行判断函数
            if (typeof checked === 'function') return checked(htmlValue)
            // 返回用户受控的checked
            if (checked !== undefined) return checked

            if (this.state.checked === undefined) return value === htmlValue
            return this.state.checked
        }

        bindRef(el) {
            if (el) this.el = el
        }

        handleEnter(e) {
            if (isEnterPress(e)) {
                this.handleChange({
                    target: {
                        checked: !this.getChecked(),
                    },
                })
            }
        }

        /**
         * 原生input发生变化时
         * @param e
         */
        handleChange(e) {
            const { onChange, onRawChange, index, inputable } = this.props
            const { checked } = e.target
            this.setState({ checked }, () => this.el.focus())

            if (type === 'switch' && onChange) {
                onChange(checked)
                return
            }

            let value = inputable ? this.props.value : this.props.htmlValue

            if (onRawChange) onRawChange(value, checked)

            value = checked ? value : undefined
            if (onChange) onChange(value, checked, index)
        }

        /**
         * Input组件值改变 执行props回调
         * @param val
         */
        handleInputChange(val) {
            const { onChange, index } = this.props
            const checked = val.length > 0
            if (onChange) onChange(val, checked, index)
        }

        render() {
            const { disabled, style, content, size, children, inputable, onClick } = this.props

            const checked = this.getChecked()
            const isSwitch = type === 'switch'

            const className = classnames(
                checkInputClass(
                    '_',
                    disabled && 'disabled',
                    checked === true && 'checked',
                    checked === 'indeterminate' && 'indeterminate',
                    isSwitch && 'switch',
                    {
                        large: size === 'large',
                        small: size === 'small',
                    }
                ),
                this.props.className
            )

            // 处理Switch的情况 Checkbox无用到
            const [checkedChildren, uncheckedChildren] = content
            const switchChildren =
                isSwitch && size !== 'small' ? (
                    <span className={checkInputClass('switch-children')}>
                        {checked ? checkedChildren : uncheckedChildren}
                    </span>
                ) : null

            const value = typeof this.props.value === 'string' ? this.props.value : ''

            // for 属性规定 label 与哪个表单元素绑定
            // tabindex 属性规定当使用 "tab" 键进行导航时元素的顺序。
            return (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
                <label
                    onKeyDown={this.handleEnter}
                    className={className}
                    style={style}
                    htmlFor={this.id}
                    tabIndex={disabled ? undefined : 0}
                    ref={this.bindRef}
                    disabled={disabled}
                >
                    {switchChildren}
                    <input
                        id={this.id}
                        disabled={disabled}
                        tabIndex={-1}
                        type={isSwitch ? 'checkbox' : type}
                        onClick={onClick}
                        onChange={this.handleChange}
                        checked={checked}
                    />
                    <i className={checkInputClass('indicator', type)} />
                    {children && !isSwitch && <span>{children}</span>}
                    {inputable && !isSwitch && checked && (
                        <Input className={checkInputClass('text')} onChange={this.handleInputChange} value={value} />
                    )}
                    {isSwitch && <span className={checkInputClass('switch-indicator')} />}
                </label>
            )
        }
    }

    CheckItem.propTypes = {
        ...getProps(PropTypes, 'disabled'),
        checked: PropTypes.oneOfType([PropTypes.oneOf([true, false, 'indeterminate']), PropTypes.func]),
        inputable: PropTypes.bool,
        htmlValue: PropTypes.any,
        index: PropTypes.number,
        onChange: PropTypes.func,
        onRawChange: PropTypes.func,
        value: PropTypes.any,
        onClick: PropTypes.func,
        size: PropTypes.oneOf(['small', 'default', 'large']),
        content: PropTypes.array,
    }

    CheckItem.defaultProps = {
        ...defaultProps,
        htmlValue: true,
        onClick: undefined,
        content: [],
    }

    return CheckItem
}
