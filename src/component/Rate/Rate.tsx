import React from 'react'
import classnames from 'classnames'
import { range } from '@/utils/numbers'
import { getParent } from '@/utils/dom/element'
import { rateClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { RateProps, RateState } from './type'

const MIN_SIZE = 12

export default class Rate extends PureComponent<RateProps, RateState> {
    static defaultProps: RateProps = {
        repeat: true,
        max: 5,
        size: 20,
        text: [],
        value: 0,
    }

    static displayName = 'EthanRate'

    highlightTimer: NodeJS.Timeout

    get scale() {
        const { size } = this.props

        if (size >= MIN_SIZE) return undefined

        return {
            transform: `scale(${size / MIN_SIZE})`,
        }
    }

    get computedValue() {
        const { value } = this.props

        const { hover } = this.state

        return hover === 0 ? value : hover
    }

    get InnerStyle() {
        const { size } = this.props

        if (!size) return undefined

        const parsed = Math.max(MIN_SIZE, size)

        return { width: parsed, fontSize: parsed }
    }

    constructor(props) {
        super(props)

        this.state = {
            hover: 0,
            highlight: 0,
        }
    }

    handleClick = (value: number, e: React.MouseEvent<HTMLSpanElement>) => {
        const { clearable, allowHalf, onChange } = this.props

        if (allowHalf && getParent(e.target, `.${rateClass('allow-half')}`)) {
            value -= 0.5
        }

        if (clearable && this.props.value === value) {
            value = 0

            this.setState({ hover: 0 })
        }

        onChange(value)

        this.setState({ highlight: value })

        // 高亮动画
        if (this.highlightTimer) {
            clearTimeout(this.highlightTimer)

            this.highlightTimer = null
        }

        this.highlightTimer = setTimeout(() => {
            this.setState({ highlight: 0 })
        }, 300)
    }

    handleMove = (hover: number, e: React.MouseEvent) => {
        const { x, width } = (e.target as HTMLElement).getBoundingClientRect()

        const value = hover - (x + width / 2 > e.clientX ? 0.5 : 0)

        this.setState({ hover: value })
    }

    handleHover = (hover: number) => {
        this.setState({ hover })
    }

    buildIcon = (icons: React.ReactNode | React.ReactNode[], i: number, isBg = false) => {
        const { repeat, allowHalf } = this.props

        const remain = this.computedValue - i

        let icon

        if (!Array.isArray(icons)) {
            icon = icons
        } else {
            icon = icons[repeat ? this.computedValue - 1 : i]

            if (!icon) icon = icons[icons.length - 1]
        }

        if (remain <= 0 || remain >= 1 || isBg) return icon

        /** 半选remain是0.5 */
        const style = { width: `${remain * 100}%`, display: 'block', overflow: 'hidden', fontSize: 'inherit' }

        /** 半选 */
        return (
            <span style={style} className={allowHalf && rateClass('allow-half')}>
                {icon}
            </span>
        )
    }

    renderRate = () => {
        const { front, max, text, allowHalf } = this.props

        const { highlight } = this.state

        return (
            <div className={rateClass('front')}>
                {range(max).map(v => (
                    <span
                        key={v}
                        onClick={this.handleClick.bind(this, v + 1)}
                        onMouseLeave={this.handleHover.bind(this, 0)}
                        onMouseMove={allowHalf ? this.handleMove.bind(this, v + 1) : undefined}
                        onMouseEnter={!allowHalf ? this.handleHover.bind(this, v + 1) : undefined}
                        style={this.InnerStyle}
                    >
                        {this.computedValue > v ? this.buildIcon(front, v) : <span>&nbsp;</span>}
                        {/* 点击后的动画 */}
                        {highlight === v + 1 && <i className={rateClass('highlight')}>{this.buildIcon(front, v)}</i>}
                    </span>
                ))}
                <span className={rateClass('text')}>{text[Math.ceil(this.computedValue) - 1]}</span>
            </div>
        )
    }

    renderStatic = () => {
        const { front, value, max, text } = this.props

        return (
            <div className={rateClass('static')}>
                {range(max).map(v => (
                    <span key={v} style={this.InnerStyle}>
                        {value > v && this.buildIcon(front, v)}
                    </span>
                ))}
                <span className={rateClass('text')}>{text[Math.ceil(value) - 1]}</span>
            </div>
        )
    }

    renderBackground = () => {
        const { background, max, disabled, allowHalf } = this.props

        return (
            <div className={rateClass('background')}>
                {range(max).map(v => {
                    const style = Object.assign(
                        {
                            visibility: !allowHalf && !disabled && this.computedValue > v ? 'hidden' : 'visible',
                        },
                        this.InnerStyle
                    ) as React.CSSProperties

                    return (
                        <span key={v} style={style}>
                            {this.buildIcon(background, v, true)}
                        </span>
                    )
                })}
            </div>
        )
    }

    render() {
        const { disabled } = this.props

        const className = classnames(rateClass('_', this.props.className))

        const style = Object.assign({}, this.props.style, this.scale)

        return (
            <div className={className} style={style}>
                {this.renderBackground()}

                {disabled ? this.renderStatic() : this.renderRate()}
            </div>
        )
    }
}
