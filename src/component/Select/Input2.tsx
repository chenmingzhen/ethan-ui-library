import React, { cloneElement, isValidElement } from 'react'
import { PureComponent } from '@/utils/component'
import { selectClass } from '@/styles'
import { stopPropagation } from '@/utils/func'
import { focusElement } from '@/utils/dom/element'
import { runInNextFrame } from '@/utils/nextFrame'
import { SelectInputProps } from './type'

export default class extends PureComponent<SelectInputProps> {
    static defaultProps = {
        text: '',
    }

    editElement: HTMLSpanElement

    lastCursorOffset = 0

    constructor(props: SelectInputProps) {
        super(props)

        this.props.bindInputReset(this.reset)
    }

    componentDidMount() {
        if (this.props.focus) {
            this.props.onInputFocus()

            this.focus()
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.focus === prevProps.focus || !this.props.focus) return

        this.props.onInputFocus()

        this.focus()
    }

    bindElement = el => {
        this.editElement = el
    }

    reset = () => {
        if (this.editElement) this.editElement.innerText = ''
    }

    focus = () => {
        runInNextFrame(() => {
            focusElement.select(this.editElement)
        })
    }

    handleInput: React.FormEventHandler<HTMLSpanElement> = evt => {
        const text = evt.currentTarget.innerText

        this.props.onInput(text.trim())
    }

    handleBlur: React.FocusEventHandler<HTMLSpanElement> = evt => {
        const text = evt.currentTarget.innerText

        if (text === this.props.text) return

        this.props.onInputBlur(text)
    }

    handlePaste: React.ReactEventHandler<HTMLSpanElement> = evt => {
        /** @see https://www.jianshu.com/p/bd7159ac6ced */
        const text = evt.clipboardData?.getData('text/plain')

        if (!text) return

        evt.preventDefault()

        /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/Document/execCommand */
        document.execCommand('insertText', false, text)

        this.props.onInput(text.trim())
    }

    render() {
        const { text, focus, multiple } = this.props

        const props = {
            className: selectClass('input', !focus && 'ellipsis', !multiple && 'full'),
            ref: this.bindElement,
            key: 'input',
            onInput: this.handleInput,
            contentEditable: focus,
            onFocus: stopPropagation,
            onBlur: this.handleBlur,
            onPaste: this.handlePaste,
        }

        /** 过滤HTML标签 */
        const value = typeof text === 'string' ? text.replace(/<\/?[^>]*>/g, '') : text

        /**  renderResult的结果可能为一个组件 */
        if (isValidElement(value)) {
            return cloneElement(value, { ...props })
        }

        return <span dangerouslySetInnerHTML={{ __html: value }} {...props} />
    }
}
