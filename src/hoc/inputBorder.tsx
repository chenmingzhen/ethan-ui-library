import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { curry } from '@/utils/func'
import Popover, { PopoverProps } from '@/component/Popover/Popover'
import { isEmpty } from '@/utils/is'
import { buttonClass, inputClass, popoverClass } from '../styles'

export interface InputBorderProps {
    disabled?: boolean

    tip?: React.ReactNode | ((value: string) => React.ReactNode)

    popoverProps?: Omit<PopoverProps, 'children'>
}

interface IInputBorderProps extends InputBorderProps {
    value: any

    autoFocus?: boolean

    border?: boolean

    className?: string

    error?: Error

    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void

    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void

    style?: React.CSSProperties

    width?: React.CSSProperties['width']

    size?: 'small' | 'default' | 'large'
}

interface InputBorderState {
    focus: boolean

    mounted: boolean
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
        class extends PureComponent<IInputBorderProps, InputBorderState> {
            static defaultProps = {
                border: true,
                style: {},
                popoverProps: {},
            }

            el = React.createRef<HTMLElement>()

            /** 缓存内容，避免在popover消失前，内容为空，影响观感 */
            cacheContent = null

            constructor(props) {
                super(props)
                this.state = {
                    focus: props.autoFocus,
                    mounted: false,
                }
            }

            componentDidMount() {
                super.componentDidMount()

                options.popover && this.setState({ mounted: true })
            }

            handleBlur = event => {
                if (!this.state.focus) return

                this.setState({ focus: false })

                this.props?.onBlur?.(event)
            }

            handleFocus = event => {
                if (this.state.focus) return

                this.setState({ focus: true })

                this.props?.onFocus?.(event)
            }

            buildContent = () => {
                const { error, tip } = this.props

                const content =
                    error?.message ??
                    (typeof tip === 'function' ? (!isEmpty(this.props.value) ? tip(this.props.value) : null) : tip)

                if (!this.cacheContent) this.cacheContent = content

                return content
            }

            handleVisibleChange = visible => {
                const { onVisibleChange } = this.props.popoverProps

                if (onVisibleChange) onVisibleChange(visible)

                if (!visible) {
                    this.cacheContent = null
                }
            }

            render() {
                const { className, border, size, tip, width, style, error, popoverProps, ...other } = this.props

                const { focus } = this.state

                const Tag = ((options.tag || 'label') as unknown) as React.ElementType

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
                        error && 'invalid',
                        popoverProps.placement && error && 'focus'
                    ),
                    buttonClass(
                        options.isGroup && 'group',
                        options.from === 'input' && options.isGroup && 'from-input-group'
                    ),
                    typeof options.className === 'function' ? options.className(this.props) : options.className,
                    this.props.className
                )

                const popoverClassList = ['input-tip']

                const placement = popoverProps.placement || 'bottom-left'

                const popoverStyles =
                    popoverProps.style && popoverProps.style.width
                        ? popoverProps.style
                        : popoverProps.style
                        ? Object.assign({}, { minWidth: 200, maxWidth: 400 }, popoverProps.style)
                        : { minWidth: 200, maxWidth: 400 }

                const content = this.buildContent()

                const popoverVisible = !!error || !!(content && focus)

                if (error) {
                    popoverClassList.push('input-error')
                }

                const originComponent = (
                    <Origin {...other} size={size} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                )

                return (
                    <Tag
                        ref={this.el}
                        className={newClassName}
                        style={tagStyle}
                        tabIndex={options.enterPress ? '0' : undefined}
                    >
                        {options.popover ? (
                            <>
                                {this.state.mounted && (
                                    <Popover
                                        getPopupContainer={() => this.el.current}
                                        {...popoverProps}
                                        visible={popoverVisible}
                                        style={popoverStyles}
                                        className={popoverClass(...popoverClassList)}
                                        placement={placement}
                                        content={content || this.cacheContent}
                                        onVisibleChange={this.handleVisibleChange}
                                        innerAlwaysUpdate
                                    >
                                        {originComponent}
                                    </Popover>
                                )}
                            </>
                        ) : (
                            originComponent
                        )}
                    </Tag>
                )
            }
        }
)
