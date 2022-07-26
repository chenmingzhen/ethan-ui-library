import React, { PureComponent } from 'react'
import { inputClass } from '@/styles'
import { isNull, isString } from '@/utils/is'
import icons from '../icons'
import Input from './Input'
import { InputNumberProps } from './type'

class Number extends PureComponent<InputNumberProps> {
    static defaultProps: InputNumberProps = {
        step: 1,
        allowNull: false,
        hideArrow: false,
    }

    hold: boolean

    keyPressTimeOut: NodeJS.Timeout

    componentWillUnmount() {
        this.hold = false

        if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
    }

    handleAddClick = () => {
        this.handleCalc(this.props.step)
    }

    handleSubClick = () => {
        this.handleCalc(-this.props.step)
    }

    handleChange = (value: string | number) => {
        const { onChange, digits, step } = this.props

        if (isNull(value)) {
            onChange(value)

            return
        }

        /** 处于手动输入状态 */
        if (isString(value)) {
            if (new RegExp('^-?\\d*\\.?\\d*$').test(value)) {
                onChange(value)
            }

            return
        }

        if (typeof digits === 'number') {
            value = parseFloat(value.toFixed(digits))
        } else {
            const stepStr = step.toString()

            const dot = stepStr.lastIndexOf('.')

            if (dot >= 0) value = parseFloat(value.toFixed(stepStr.length - dot))
        }

        const { min, max } = this.props

        if (max !== undefined && value > max) value = max
        if (min !== undefined && value < min) value = min

        if (value !== this.props.value) {
            onChange(value)
        }
    }

    handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        let value = parseFloat(e.target.value)

        // for the empty
        if (e.target.value === '' && this.props.allowNull) {
            value = null
        }

        // eslint-disable-next-line no-restricted-globals
        if (isNaN(value)) value = 0

        this.handleChange(value)

        this.props.onBlur(e)
    }

    changeValue = (mod: number) => {
        if (this.props.disabled) return

        let value = parseFloat(`${String(this.props.value) || ''}`.replace(/,/g, ''))

        // eslint-disable-next-line
        if (isNaN(value)) value = 0

        this.handleChange(value + mod)
    }

    longPress = mod => {
        if (!this.hold) return

        setTimeout(() => {
            this.changeValue(mod)

            this.longPress(mod)
        }, 50)
    }

    handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { step } = this.props

        if (e.keyCode !== 38 && e.keyCode !== 40) return

        e.preventDefault()

        const mod = e.keyCode === 38 ? step : -step

        this.changeValue(mod)
    }

    handleCalc = mod => {
        this.hold = true

        this.changeValue(mod)

        this.keyPressTimeOut = setTimeout(() => {
            this.longPress(mod)
        }, 1000)
    }

    handleMouseUp = () => {
        this.hold = false

        if (this.keyPressTimeOut) clearTimeout(this.keyPressTimeOut)
    }

    renderArrowGroup = () => {
        const { hideArrow } = this.props

        if (hideArrow) return []

        return [
            <a
                key="up"
                // do not need the tab to focus
                tabIndex={-1}
                className={inputClass('number-up')}
                onMouseDown={this.handleAddClick}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseUp}
            >
                {icons.AngleRight}
            </a>,

            <a
                key="down"
                tabIndex={-1}
                className={inputClass('number-down')}
                onMouseDown={this.handleSubClick}
                onMouseUp={this.handleMouseUp}
                onMouseLeave={this.handleMouseUp}
            >
                {icons.AngleRight}
            </a>,
        ]
    }

    render = () => {
        const { onChange, allowNull, hideArrow, ...other } = this.props

        return [
            <Input
                key="input"
                {...other}
                className={inputClass({ number: !hideArrow })}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                onBlur={this.handleBlur}
                type="number"
            />,
            ...this.renderArrowGroup(),
        ]
    }
}

export default Number
