import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { curry } from '@/utils/func'
import Popover, { PopoverProps } from '@/component/Popover'
import { buttonClass, inputClass, popoverClass } from '../styles'

interface InputBorderProps {
    autoFocus?: boolean

    border?: boolean

    className?: string

    disabled?: boolean

    error?: Error

    onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void

    onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void

    size?: 'small' | 'default' | 'large'

    style?: React.CSSProperties

    tip?: React.ReactNode

    width?: React.CSSProperties['width']

    popoverProps?: PopoverProps
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

    className?: string | ((props: InputBorderProps) => string)

    enterPress?: boolean
}

/**
 * inputBorder HOC 负责 input 的样式 tip信息
 */
export default curry(
    (options: Options, Origin) =>
        class extends PureComponent<InputBorderProps, InputBorderState> {
            static defaultProps = {
                border: true,
                style: {},
                popoverProps: {},
            }

            el = React.createRef<HTMLElement>()

            constructor(props) {
                super(props)
                this.state = {
                    focus: props.autoFocus,
                    mounted: false,
                }
                this.handleBlur = this.handleBlur.bind(this)
                this.handleFocus = this.handleFocus.bind(this)
            }

            componentDidMount() {
                super.componentDidMount()

                this.setState({ mounted: true })
            }

            handleBlur(event) {
                if (!this.state.focus) return

                this.setState({ focus: false })

                this.props?.onBlur?.(event)
            }

            handleFocus(event) {
                if (this.state.focus) return

                this.setState({ focus: true })

                this.props?.onFocus?.(event)
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

                const content = error?.message ?? tip

                const popoverVisible = !!(error && popoverProps.placement) || !!(tip && focus)

                if (error && popoverProps.placement) {
                    popoverClassList.push('input-error')
                }

                return (
                    <Tag
                        ref={this.el}
                        className={newClassName}
                        style={tagStyle}
                        tabIndex={options.enterPress ? '0' : undefined}
                    >
                        {this.state.mounted && (
                            <Popover
                                getPopupContainer={() => this.el.current}
                                {...popoverProps}
                                visible={popoverVisible}
                                style={popoverStyles}
                                className={popoverClass(...popoverClassList)}
                                placement={placement}
                                content={content}
                            >
                                <Origin {...other} size={size} onFocus={this.handleFocus} onBlur={this.handleBlur} />
                            </Popover>
                        )}
                    </Tag>
                )
            }
        }
)
