import React, { PureComponent } from 'react'
import cleanProps from '@/utils/cleanProps'
import { inputClass } from '@/styles'
import { IInputProps } from './type'

class Input extends PureComponent<IInputProps> {
    static defaultProps: IInputProps = {
        type: 'text',
    }

    enterLock = false

    ref: HTMLInputElement

    bindRef = el => {
        const { forwardedRef } = this.props

        this.ref = el

        if (forwardedRef && forwardedRef.current) {
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
        const { value } = e.target

        const { forceChange, onBlur } = this.props

        if (onBlur) onBlur(e)

        if (this.invalidNumber(value)) return

        if (forceChange) forceChange(value)
    }

    defaultInfo = value => {
        if (!value || value.length === 0) return null

        const { info } = this.props

        const text = `${value.length} / ${info}`

        if (value.length <= info) return text

        // 超过字数限制 返回错误 后面捕获
        return new Error(text)
    }

    renderInfo = () => {
        const { info } = this.props

        const notNumber = typeof info !== 'number'

        if (typeof info !== 'function' && notNumber) return null

        const textInfo = notNumber ? info : this.defaultInfo

        const res = textInfo(this.props.value)

        if (!res) return null

        const isError = res instanceof Error

        const text = isError ? res.message : res

        return (
            <div
                key="info"
                style={{ minWidth: 'auto' }}
                className={inputClass('bottom-right', isError ? 'error' : 'tip')}
            >
                {text}
            </div>
        )
    }

    render() {
        const {
            type,
            defaultValue,
            digits,
            className,
            clearable,
            htmlName,
            forceChange,
            onEnterPress,
            forwardedRef,
            ...other
        } = this.props

        const value = this.props.value == null ? '' : this.props.value

        // https://blog.csdn.net/u013096088/article/details/52873562
        // 利用onCompositionStart,onCompositionEnd处理中文流的问题
        // 中文模式 有输入法 点击回车后内容才会填充到输入框，但是点击回车会触发onKeyUp code=13的情况
        // 需要onCompositionStart进行上锁
        return [
            <input
                {...cleanProps(other)}
                className={className}
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
            this.renderInfo(),
        ]
    }
}

export default Input
