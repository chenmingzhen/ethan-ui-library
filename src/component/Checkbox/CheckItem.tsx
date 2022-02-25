import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { getUidStr } from '@/utils/uid'
import { isEnterPress } from '@/utils/is'
import { checkInputClass } from '@/styles'
import { ICheckedItemProps, CheckItemState, CheckType } from './type'

export default function(type: CheckType) {
    return class extends PureComponent<ICheckedItemProps, CheckItemState> {
        static defaultProps: ICheckedItemProps = {
            htmlValue: true,
            content: [],
        }

        id = getUidStr()

        labelElement: HTMLLabelElement

        constructor(props) {
            super(props)

            this.state = {
                checked: props.checked,
            }
        }

        componentDidUpdate(prevProps) {
            const { checked, value, htmlValue } = this.props

            /** Group中item的value发生改变 */
            if (prevProps.value !== value && checked === undefined) {
                this.setState({ checked: value === htmlValue })
            }
        }

        getChecked = () => {
            const { checked, value, htmlValue } = this.props

            if (typeof checked === 'function') return checked(htmlValue)

            /** 受控 */
            if (checked !== undefined) return checked

            /** 初始checked的判断 */
            if (this.state.checked === undefined) return value === htmlValue

            return this.state.checked
        }

        handleEnter = (e: React.KeyboardEvent) => {
            if (!isEnterPress(e)) return

            const checked = !this.getChecked()

            this.handleChange(checked)
        }

        beforeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            const { checked } = e.target

            this.handleChange(checked)
        }

        handleChange = (checked: boolean) => {
            const { onChange, onGroupCallback, index } = this.props

            this.setState({ checked }, () => this.labelElement.focus())

            if (type === 'switch' && onChange) {
                onChange(checked)

                return
            }

            if (onGroupCallback) onGroupCallback(this.props.htmlValue, checked)

            const value = checked ? this.props.htmlValue : undefined

            if (onChange) onChange(value, checked, index)
        }

        render() {
            const { disabled, style, content, size, children, onClick } = this.props

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

            /** 处理Switch的情况 */
            const [checkedChildren, uncheckedChildren] = content

            const switchChildren =
                isSwitch && size !== 'small' ? (
                    <span className={checkInputClass('switch-children')}>
                        {checked ? checkedChildren : uncheckedChildren}
                    </span>
                ) : null

            /** @see https://www.w3school.com.cn/tags/tag_label.asp */
            /** for 属性规定 label 与哪个表单元素绑定 */
            /** label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。 */
            /** tabindex 属性规定当使用 "tab" 键进行导航时元素的顺序。 */
            return (
                <label
                    onKeyDown={this.handleEnter}
                    className={className}
                    style={style}
                    htmlFor={this.id}
                    tabIndex={disabled ? undefined : 0}
                    ref={labelElement => {
                        this.labelElement = labelElement
                    }}
                >
                    {switchChildren}

                    <input
                        id={this.id}
                        disabled={disabled}
                        tabIndex={-1}
                        type={isSwitch ? 'checkbox' : type}
                        onClick={onClick}
                        onChange={this.beforeChange}
                        checked={checked === true}
                        className={checkInputClass('indicator', type)}
                    />

                    <i className={checkInputClass('indicator', type)} />

                    {children && !isSwitch && <span>{children}</span>}

                    {isSwitch && <span className={checkInputClass('switch-indicator')} />}
                </label>
            )
        }
    }
}
