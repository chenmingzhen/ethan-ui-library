import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { inputClass, selectClass } from '@/styles'
import { stopPropagation } from '@/utils/func'
import { SelectResultProps } from './type'
import Caret from '../icons/Caret'
import ResultItem from './ResultItem'
import Popover from '../Popover/Popover'
import SelectInput from './Input2'
import Input from '../Input'

export default class Result extends PureComponent<SelectResultProps> {
    renderMore = (resultList: any[]) => {
        const { datum, renderResult, compressedClassName, resultClassName, onRemove } = this.props

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
                                renderResult={renderResult}
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
        const {
            resultClassName,
            renderResult,
            result,
            multiple,
            compressed,
            datum,
            onRemove,
            onInput,
            focus,
        } = this.props

        const value = typeof renderResult === 'function' ? renderResult(result[0]) : result[0]?.[renderResult]

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
                    renderResult={renderResult}
                    resultClassName={resultClassName}
                />
            ))

            if (compressed && result.length > 1) {
                const restResult = result.slice(1)

                items.push(this.renderMore(restResult))
            }

            return items
        }

        if (onInput && focus) {
            return this.renderInput(result[0])
        }

        return (
            <span title={value} className={classnames(selectClass('ellipsis'), resultClassName)}>
                {value}
            </span>
        )
    }

    renderInput = (placeholder = '') => {
        const {
            multiple,
            onInput,
            focus,
            onInputFocus,
            bindInputReset,
            onInputBlur,
            size,
            result,
            selectId,
        } = this.props

        return (
            <Input
                key={selectId}
                defaultValue=""
                className={selectClass('input2')}
                size={size}
                onChange={onInput}
                placeholder={placeholder}
                autoFocus
            />
        )

        return (
            <SelectInput
                onInputFocus={onInputFocus}
                onInputBlur={onInputBlur}
                multiple={multiple}
                focus={focus}
                text={filterText}
                onInput={onInput}
                bindInputReset={bindInputReset}
            />
        )
    }

    renderPlaceholder = () => {
        const { focus, onInput, placeholder } = this.props

        if (focus && onInput) {
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
