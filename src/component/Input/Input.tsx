import React, { PureComponent } from 'react'
import cleanProps from '@/utils/cleanProps'
import { inputClass } from '@/styles'
import { compose } from '@/utils/func'
import withValidate from '@/hoc/withValidate'
import withControl from '@/hoc/withControl'
import inputBorder from '@/hoc/inputBorder'
import trim from '@/hoc/trim'
import { IInputProps, InputComponent } from './type'

class Input extends PureComponent<IInputProps> {
    static defaultProps: IInputProps = {
        type: 'text',
    }

    enterLock = false

    ref: HTMLInputElement

    bindRef = (el) => {
        const { forwardedRef } = this.props

        this.ref = el

        if (typeof forwardedRef === 'function') {
            forwardedRef(el)
        } else if (forwardedRef && Object.prototype.hasOwnProperty.call(forwardedRef, 'current')) {
            forwardedRef.current = el
        }
    }

    /** 检验是否为数字或输入多余的小数位 */
    invalidNumber = (value: string) => {
        const { digits, type } = this.props

        if (type !== 'number') return false

        // 在字符串中, \要多一个\进行转义
        let regStr = '^-?\\d*'

        if (digits === undefined) {
            regStr += '\\.?\\d*'
            // 最终结果 ^-?\d*\.?\d*$
        } else if (digits > 0) {
            regStr += `\\.?\\d{0,${digits}}`
            // 最终结果 ^-?\d*\.?\d{0,digits}$
        }
        regStr += '$'

        const reg = new RegExp(regStr)

        return !reg.test(value)
    }

    handleChange = (value: string, clearClick?: boolean) => {
        const { type, clearable } = this.props

        if (clearClick) {
            this.ref.focus()

            if (typeof clearable === 'function') clearable()
        }

        if (type === 'number' && typeof value !== 'number') value = String(value).replace(/。/g, '.')

        if (this.invalidNumber(value)) return

        this.props.onChange(value)
    }

    tryHandleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = e.target

        this.handleChange(value)
    }

    handleClearClick = (e: React.MouseEvent<HTMLInputElement>) => {
        e.preventDefault()

        this.handleChange('', true)
    }

    handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
        const { onKeyUp, onEnterPress } = this.props

        if (e.keyCode === 13 && onEnterPress && !this.enterLock) {
            onEnterPress((e.target as any).value, e)
        }

        if (onKeyUp) onKeyUp(e)
    }

    handleCompositionStart = () => {
        this.enterLock = true
    }

    handleCompositionEnd = () => {
        setTimeout(() => {
            this.enterLock = false
        }, 100)
    }

    handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        const { onBlur } = this.props

        if (onBlur) onBlur(e)
    }

    render() {
        const { type, defaultValue, digits, className, clearable, htmlName, onEnterPress, forwardedRef, ...other } =
            this.props

        const value = this.props.value == null ? '' : this.props.value

        // https://blog.csdn.net/u013096088/article/details/52873562
        // 利用onCompositionStart,onCompositionEnd处理中文流的问题
        // 中文模式 有输入法 点击回车后内容才会填充到输入框，但是点击回车会触发onKeyUp code=13的情况
        // 需要onCompositionStart进行上锁
        return [
            <input
                {...cleanProps(other)}
                // inputBorder中控制样式
                // className={className}
                name={other.name || htmlName}
                type={type === 'password' ? type : 'text'}
                value={value}
                ref={this.bindRef}
                key="input"
                onChange={this.tryHandleChange}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                onCompositionStart={this.handleCompositionStart}
                onCompositionEnd={this.handleCompositionEnd}
            />,
            !other.disabled && clearable && value !== '' && (
                <div onClick={this.handleClearClick} className={inputClass('clear-wrapper')} key="clear">
                    <div className={inputClass('clear')} />
                </div>
            ),
        ]
    }
}

export default compose(withValidate, withControl, inputBorder({ popover: true }), trim)(Input) as InputComponent
