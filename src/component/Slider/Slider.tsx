import React from 'react'
import { sliderClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { perToValue, valueToPer } from './utils'
import Indicator from './Indicator'
import { SliderProps, SliderState } from './type'

export default class Slider extends PureComponent<SliderProps, SliderState> {
    parentElement: HTMLElement

    static defaultProps = {
        formatValue: (v) => v,
    }

    constructor(props) {
        super(props)

        this.state = {
            dragging: false,
            lengthPercent: valueToPer(props.value, props.scale),
        }
    }

    componentDidUpdate(prevProps) {
        const { scale, value } = this.props

        const { dragging } = this.state

        const { length } = scale

        if (prevProps.value !== value || (!dragging && prevProps.scale[length - 1] !== scale[length - 1])) {
            this.setState({ lengthPercent: valueToPer(value, scale) })
        }
    }

    handleDrag = (mx: number, my: number) => {
        const { scale, onDrag, value, vertical, onIncrease, min, max } = this.props

        const { lengthPercent } = this.state

        const movePercent = vertical ? my / this.parentElement.clientHeight : mx / this.parentElement.clientWidth

        const minPercent = min ? valueToPer(min, scale) : 0
        const maxPercent = max ? valueToPer(max, scale) : 1

        /** y轴向下为正 */
        let newLengthPercent = lengthPercent + (vertical ? -movePercent : movePercent)

        const needIncrease = newLengthPercent > 1

        if (newLengthPercent < minPercent) newLengthPercent = minPercent
        if (newLengthPercent > maxPercent) newLengthPercent = maxPercent

        const newValue = this.lengthPercentToValue(newLengthPercent)

        if (needIncrease && onIncrease) onIncrease(newValue)

        this.setState({
            lengthPercent: newLengthPercent,
            dragging: true,
        })

        if (onDrag) {
            if (newValue !== value) onDrag(newValue)
        }
    }

    handleDragEnd = () => {
        const { onChange, index } = this.props

        const { lengthPercent } = this.state

        this.setState({
            dragging: false,
        })

        if (onChange) {
            onChange(index, this.lengthPercentToValue(lengthPercent))
        }
    }

    lengthPercentToValue = (length: number) => {
        const { scale, step } = this.props

        return perToValue(length, scale, step)
    }

    renderResult = () => {
        const { autoHide, formatValue } = this.props

        const { dragging, lengthPercent } = this.state

        if (!formatValue) return null

        const className = sliderClass('result', (!autoHide || dragging) && 'show')

        const value = formatValue(this.lengthPercentToValue(lengthPercent))

        return <div className={className}>{value}</div>
    }

    render() {
        const { index, disabled, vertical } = this.props

        let { lengthPercent } = this.state

        if (index === 1) lengthPercent = 1 - lengthPercent

        const style = { [vertical ? 'height' : 'width']: `${lengthPercent * 100}%` }

        const className = sliderClass(
            'bar',
            vertical && (index === 1 ? 'top' : 'bottom'),
            !vertical && index === 1 && 'right'
        )

        return (
            <div
                ref={(el) => {
                    this.parentElement = el?.parentElement
                }}
                style={style}
                className={className}
            >
                {this.renderResult()}

                <div className={sliderClass('bar-bg')} />

                <Indicator disabled={disabled} onDrag={this.handleDrag} onDragEnd={this.handleDragEnd} />
            </div>
        )
    }
}
