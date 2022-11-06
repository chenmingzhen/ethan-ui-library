import React from 'react'
import classnames from 'classnames'
import { Component } from '@/utils/component'
import { curry } from '@/utils/func'
import Popover, { PopoverProps } from '@/component/Popover/Popover'
import { isEmpty, isFunc } from '@/utils/is'
import { FormItemConsumer } from '@/component/Form/context/formItemContext'
import { buttonClass, inputClass, popoverClass } from '../styles'

export interface InputBorderProps<Element = HTMLInputElement> {
    disabled?: boolean

    tip?: React.ReactNode | ((value: string) => React.ReactNode)

    popoverProps?: Omit<PopoverProps, 'children'>

    className?: string

    style?: React.CSSProperties

    onBlur?: (e: React.FocusEvent<Element>) => void

    onFocus?: (e: React.FocusEvent<Element>) => void

    size?: 'small' | 'default' | 'large'

    border?: boolean

    width?: React.CSSProperties['width']

    autoFocus?: boolean
}

interface IInputBorderProps extends InputBorderProps {
    value: any

    error?: Error
}

interface InputBorderState {
    focus: boolean
}

interface Options {
    tag?: keyof HTMLElementTagNameMap

    isGroup?: boolean

    overflow?: boolean

    from?: keyof HTMLElementTagNameMap

    className?: string | ((props: IInputBorderProps) => string)

    enterPress?: boolean

    popover?: boolean
}

/**
 * inputBorder HOC 负责 input 的样式 tip信息
 */
export default curry(
    (options: Options, Origin) =>
        class extends Component<IInputBorderProps, InputBorderState> {
            static defaultProps = {
                border: true,
                style: {},
                popoverProps: {},
                errors: [],
            }

            el = React.createRef<HTMLElement>()

            /** 缓存内容，避免在popover消失前，内容为空，影响观感 */
            cacheContent = null

            constructor(props) {
                super(props)
                this.state = {
                    focus: props.autoFocus,
                }
            }

            handleBlur = (event) => {
                if (!this.state.focus) return

                this.setState({ focus: false })

                this.props?.onBlur?.(event)
            }

            handleFocus = (event) => {
                if (this.state.focus) return

                this.setState({ focus: true })

                this.props?.onFocus?.(event)
            }

            buildContent = () => {
                const { error, tip } = this.props

                let content

                if (error) {
                    content = error.message
                } else if (isFunc(tip)) {
                    if (!isEmpty(this.props.value)) {
                        content = tip(this.props.value)
                    }
                } else {
                    content = tip
                }

                if (!this.cacheContent) this.cacheContent = content

                return content
            }

            handleVisibleChange = (visible) => {
                const { onVisibleChange } = this.props.popoverProps

                if (onVisibleChange) onVisibleChange(visible)

                if (!visible) {
                    this.cacheContent = null
                }
            }

            renderChildren = () => {
                const {
                    border,
                    size,
                    tip,
                    width,
                    style,
                    /** use */
                    error,
                    popoverProps,
                    ...other
                } = this.props

                const { focus } = this.state

                if (!options.popover || options.isGroup) {
                    return <Origin {...other} size={size} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                }

                const popoverClassList = ['input-tip']

                const placement = popoverProps.placement || 'bottom-left'

                const popoverStyles =
                    popoverProps.style && popoverProps.style.width
                        ? popoverProps.style
                        : popoverProps.style
                        ? Object.assign({}, { minWidth: 200, maxWidth: 400 }, popoverProps.style)
                        : { minWidth: 200, maxWidth: 400 }

                if (error) {
                    popoverClassList.push('input-error')
                }

                const content = this.buildContent()

                const popoverVisible = !!error || (!!content && focus)

                return (
                    <Popover
                        animation={false}
                        getPopupContainer={() => this.el.current}
                        trigger="click"
                        {...popoverProps}
                        visible={popoverVisible}
                        style={popoverStyles}
                        className={popoverClass(...popoverClassList)}
                        placement={placement}
                        content={content || this.cacheContent}
                        onVisibleChange={this.handleVisibleChange}
                        innerAlwaysUpdate
                    >
                        <Origin {...other} size={size} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                    </Popover>
                )
            }

            render() {
                return (
                    <FormItemConsumer>
                        {({ hasItemError } = {}) => {
                            const { border, size, tip, width, style, error, popoverProps, ...other } = this.props

                            const { focus } = this.state

                            const Tag = (options.tag || 'label') as unknown as React.ElementType

                            const tagStyle = Object.assign({ width }, style)

                            const newClassName = classnames(
                                inputClass(
                                    '_',
                                    focus && other.disabled !== true && 'focus',
                                    other.disabled === true && 'disabled',
                                    options.isGroup && 'group',
                                    size,
                                    tagStyle.width && 'inline',
                                    !border && 'no-border',
                                    options.overflow && `overflow-${options.overflow}`,
                                    (hasItemError || error) && 'invalid',
                                    popoverProps.placement && error && 'focus'
                                ),
                                buttonClass(
                                    options.isGroup && 'group',
                                    options.from === 'input' && options.isGroup && 'from-input-group'
                                ),
                                typeof options.className === 'function'
                                    ? options.className(this.props)
                                    : options.className,
                                this.props.className
                            )

                            return (
                                <Tag
                                    ref={this.el}
                                    className={newClassName}
                                    style={tagStyle}
                                    tabIndex={options.enterPress ? '0' : undefined}
                                >
                                    {this.renderChildren()}
                                </Tag>
                            )
                        }}
                    </FormItemConsumer>
                )
            }
        }
)
