// @ts-nocheck
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import cleanProps from '@/utils/cleanProps'
import { inputClass } from '@/styles'
import Clear from './clear'

class Input extends PureComponent {
    constructor(props) {
        super(props)
        this.enterLock = false
        this.handleChange = this.handleChange.bind(this)
        this.handleKeyUp = this.handleKeyUp.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.bindRef = this.bindRef.bind(this)
        this.handleCompositionEnd = this.handleComposition.bind(this, 1)
        this.handleCompositionStart = this.handleComposition.bind(this, 0)
    }

    bindRef(el) {
        const { forwardedRef } = this.props
        this.ref = el
        if (forwardedRef) forwardedRef(el)
    }

    /**
     * 检验是否为数字或输入多余的小数位
     * @param value
     * @returns {boolean}
     */
    invalidNumber(value) {
        const { digits, type } = this.props
        if (type !== 'number') return false

        // 在字符串中, \要多一个\进行转义

        let reg = '^-?\\d*'
        if (digits === undefined) {
            reg += '\\.?\\d*'
            // 最终结果 ^-?\d*\.?\d*$
        } else if (digits > 0) {
            reg += `\\.?\\d{0,${digits}}`
            // 最终结果 ^-?\d*\.?\d{0,digits}$
        }
        reg += '$'

        reg = new RegExp(reg)
        return !reg.test(value)
    }

    /**
     * input值改变
     * @param e
     * @param clearClick  clear清除组件的回调值
     */
    handleChange(e, clearClick) {
        const { type, clearable } = this.props
        if (clearClick) {
            this.ref.focus()
            if (typeof clearable === 'function') clearable()
        }
        let { value } = e.target
        if (type === 'number' && typeof value !== 'number') value = String(value).replace(/。/g, '.')
        if (this.invalidNumber(value)) return
        // delay的中onChange
        this.props.onChange(value)
    }

    handleKeyUp(e) {
        const { onKeyUp, onEnterPress } = this.props
        // enterLock false 证明是中文等输入情况
        if (e.keyCode === 13 && onEnterPress && !this.enterLock) {
            onEnterPress(e.target.value, e)
        }
        if (onKeyUp) onKeyUp(e)
    }

    handleComposition(type) {
        if (type === 0) {
            this.enterLock = true
        } else {
            setTimeout(() => {
                this.enterLock = false
            }, 100)
        }
    }

    handleBlur(e) {
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

    /**
     * popover样式的提示info  info为数字则显示字数限制 方法则回调
     * @returns {JSX.Element|null}
     */
    renderInfo() {
        const { info } = this.props
        const notNumber = typeof info !== 'number'

        if (typeof info !== 'function' && notNumber) return null

        const textInfo = notNumber ? info : this.defaultInfo
        const res = textInfo(this.props.value)

        // empty
        if (!res) return null

        const isError = res instanceof Error
        const text = isError ? res.message : res
        // 根据是否为超过字数限制 渲染不同的颜色
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
                onChange={this.handleChange}
                onKeyUp={this.handleKeyUp}
                onBlur={this.handleBlur}
                onCompositionStart={this.handleCompositionStart}
                onCompositionEnd={this.handleCompositionEnd}
            />,
            !other.disabled && clearable && value !== '' && <Clear onClick={this.handleChange} key="close" />,
            this.renderInfo(),
        ]
    }
}

Input.propTypes = {
    className: PropTypes.string,
    defaultValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    digits: PropTypes.number,
    forceChange: PropTypes.func,
    htmlName: PropTypes.string,
    onBlur: PropTypes.func,
    onChange: PropTypes.func.isRequired,
    onEnterPress: PropTypes.func,
    onKeyUp: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    onFocus: PropTypes.func,
    clearable: PropTypes.oneOfType([PropTypes.bool, PropTypes.func]),
    info: PropTypes.oneOfType([PropTypes.func, PropTypes.number]),
}

Input.defaultProps = {
    type: 'text',
}

export default Input
