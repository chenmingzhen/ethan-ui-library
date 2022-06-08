import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { inputClass, selectClass } from '@/styles'
import { stopPropagation } from '@/utils/func'
import { warningOnce } from '@/utils/warning'
import { SELECT_RENDER_RESULT } from '@/utils/warning/types'
import { SelectResultProps } from './type'
import Caret from '../icons/Caret'
import ResultItem from './ResultItem'
import Popover from '../Popover/Popover'
import Input from '../Input'

export default class Result extends PureComponent<SelectResultProps, { showInput: boolean }> {
    constructor(props: SelectResultProps) {
        super(props)

        const { focus, onInput } = props

        /** 在输入模式下，如果focus的状态直接改变，Input结束挂载，onBlur不能冒泡到父容器上， 为了确保onBlur能顺利冒泡到父容器中，添加延时 */
        this.state = { showInput: !!(focus && onInput) }
    }

    componentDidUpdate(prevProps: Readonly<SelectResultProps>): void {
        if (!this.props.onInput && !prevProps.onInput) return

        if (prevProps.focus && this.props.focus === false) {
            setTimeout(() => {
                this.setState({ showInput: false })
            }, 10)
        } else if (prevProps.focus !== this.props.focus) {
            this.setState({ showInput: this.props.focus })
        }
    }

    buildResult = item => {
        const { renderResult } = this.props

        if (typeof renderResult === 'function') {
            return renderResult(item)
        }

        if (typeof renderResult === 'string') {
            return item?.[renderResult]
        }

        warningOnce(SELECT_RENDER_RESULT)

        return null
    }

    renderMore = (resultList: any[]) => {
        const { datum, compressedClassName, resultClassName, onRemove } = this.props

        const className = classnames(selectClass('popover'), compressedClassName)

        return (
            <Popover
                key="more"
                innerProps={{ onClick: stopPropagation, onFocus: stopPropagation }}
                className={className}
                trigger="click"
                innerAlwaysUpdate
                content={
                    <div className={selectClass('result')}>
                        {resultList.map((result, i) => (
                            <ResultItem
                                key={i}
                                result={result}
                                disabled={datum.disabled(result)}
                                onRemove={onRemove}
                                renderResult={this.buildResult}
                                resultClassName={resultClassName}
                            />
                        ))}
                    </div>
                }
            >
                <a
                    tabIndex={-1}
                    className={selectClass('item', 'item-compressed', 'item-more')}
                    onFocus={stopPropagation}
                    onClick={stopPropagation}
                >
                    <span>{`+${resultList.length}`}</span>
                </a>
            </Popover>
        )
    }

    renderResult = () => {
        const { resultClassName, result, multiple, compressed, datum, onRemove } = this.props

        const value = this.buildResult(result[0])

        if (multiple) {
            const computedResults = compressed ? result.slice(0, 1) : result

            const removable = !compressed || result.length === 1

            const items = computedResults.map((r, index) => (
                <ResultItem
                    title
                    key={index}
                    result={r}
                    disabled={datum.disabled(r)}
                    onRemove={removable ? onRemove : undefined}
                    renderResult={this.buildResult}
                    resultClassName={resultClassName}
                />
            ))

            if (compressed && result.length > 1) {
                const restResult = result.slice(1)

                items.push(this.renderMore(restResult))
            }

            if (this.state.showInput) {
                items.push(this.renderInput())
            }

            return items
        }

        if (this.state.showInput) {
            return this.renderInput(value)
        }

        return (
            <span title={value} className={classnames(selectClass('ellipsis'), resultClassName)}>
                {value}
            </span>
        )
    }

    renderInput = (placeholder = '') => {
        const { onInput, size, onInputBlur, onInputFocus, onBindInputInstance, filterText } = this.props

        return (
            <Input
                autoFocus
                key="key"
                value={filterText}
                className={selectClass('input2')}
                size={size}
                onChange={onInput}
                placeholder={placeholder}
                onBlur={onInputBlur}
                onFocus={onInputFocus}
                forwardedRef={onBindInputInstance}
            />
        )
    }

    renderPlaceholder = () => {
        const { placeholder } = this.props

        if (this.state.showInput) {
            return this.renderInput()
        }

        return (
            <span className={classnames(inputClass('placeholder'), selectClass('ellipsis'))}>
                <span>{placeholder}</span>
            </span>
        )
    }

    renderIndicator = () => {
        const { multiple, showArrow, compressed } = this.props

        if (!showArrow || (multiple && !compressed)) return null

        const showCaret = !multiple

        return (
            <a tabIndex={-1} className={selectClass('indicator', multiple ? 'multi' : 'caret')}>
                {showCaret && <Caret />}
            </a>
        )
    }

    renderClear = () => {
        const { onClear, result, disabled } = this.props

        if (onClear && result.length > 0 && disabled !== true) {
            return (
                <div onClick={onClear} className={selectClass('close-wrapper')}>
                    {/* eslint-disable-next-line jsx-a11y/anchor-has-content */}
                    <a tabIndex={-1} data-role="close" className={selectClass('indicator', 'close')} />
                </div>
            )
        }

        return null
    }

    render() {
        const { compressed, result } = this.props

        return (
            <div className={selectClass('result', compressed && 'compressed')}>
                {!result.length ? this.renderPlaceholder() : this.renderResult()}
                {this.renderIndicator()}
                {this.renderClear()}
            </div>
        )
    }
}
