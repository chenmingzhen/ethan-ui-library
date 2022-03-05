import React from 'react'
import { sliderClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { perToValue, valueToPer } from './utils'
import Indicator from './Indicator'
import { SliderProps, SliderState } from './type'

export default class Slider extends PureComponent<SliderProps, SliderState> {
    parentElement: HTMLElement

    static defaultProps = {
        formatValue: v => v,
    }

    constructor(props) {
        super(props)

        this.state = {
            dragging: false,
            length: valueToPer(props.value, props.scale),
        }
    }

    componentDidUpdate(prevProps) {
        const { scale, value } = this.props

        const { dragging } = this.state

        const { length } = scale

        if (prevProps.value !== value || (!dragging && prevProps.scale[length - 1] !== scale[length - 1])) {
            this.setState({ length: valueToPer(value, scale) })
        }
    }

    handleDrag = (mx: number, my: number) => {
        const { scale, onDrag, value, vertical, onIncrease, min, max } = this.props

        const { length } = this.state

        const m = vertical ? my / this.parentElement.clientHeight : mx / this.parentElement.clientWidth

        const newMin = min ? valueToPer(min, scale) : 0
        const newMax = max ? valueToPer(max, scale) : 1

        /** y轴向下为正 */
        let newLength = length + (vertical ? -m : m)

        const needIncrease = newLength > 1

        if (newLength < newMin) newLength = newMin
        if (newLength > newMax) newLength = newMax

        const newValue = this.lengthToValue(newLength)

        if (needIncrease && onIncrease) onIncrease(newValue)

        this.setState({
            length: newLength,
            dragging: true,
        })

        if (onDrag) {
            if (newValue !== value) onDrag(newValue)
        }
    }

    handleDragEnd = () => {
        const { scale, onChange, index } = this.props

        const { length } = this.state

        const value = this.lengthToValue(length)

        this.setState({
            length: valueToPer(value, scale),
            dragging: false,
        })

        onChange(index, value)
    }

    lengthToValue = (length: number) => {
        const { scale, step } = this.props

        return perToValue(length, scale, step)
    }

    renderResult = () => {
        const { autoHide, formatValue } = this.props

        const { dragging, length } = this.state

        if (!formatValue) return null

        const className = sliderClass('result', (!autoHide || dragging) && 'show')

        const value = formatValue(this.lengthToValue(length))

        return <div className={className}>{value}</div>
    }

    render() {
        const { index, disabled, vertical } = this.props

        let { length } = this.state

        if (index === 1) length = 1 - length

        const style = { [vertical ? 'height' : 'width']: `${length * 100}%` }

        const className = sliderClass(
            'bar',
            vertical && (index === 1 ? 'top' : 'bottom'),
            !vertical && index === 1 && 'right'
        )

        return (
            <div
                ref={el => {
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
