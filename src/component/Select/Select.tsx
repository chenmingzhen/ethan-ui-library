import useRefMethod from '@/hooks/useRefMethod'
import { selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getParent, isDescendent } from '@/utils/dom/element'
import { isEmpty, isFunc } from '@/utils/is'
import { KeyboardKey } from '@/utils/keyboard'
import { getListPortalStyle } from '@/utils/position'
import { styles } from '@/utils/style/styles'
import { getUidStr } from '@/utils/uid'
import React, { useRef, useState } from 'react'
import useInputStyle from '../Input/hooks/useInputStyle'
import Portal from '../Portal'
import BoxList from './BoxList'
import useFocus from '../../hooks/useLockFocus'
import useSelectData from './hooks/useSelectData'
import useSelectValues from './hooks/useSelectValue'
import OptionList, { OptionListInstance } from './OptionList'
import Result from './Result'
import { SelectBaseData, SelectProps } from './type'

function defaultRenderItem(item) {
    if (typeof item === 'string' || typeof item === 'number') {
        return item
    }

    console.error(
        `RenderItem or RenderResult must return reactNode.But Got ${typeof item}.Maybe you passed a wrong value or didn't pass it`
    )

    return null
}

function Select<Data extends SelectBaseData = SelectBaseData, FormatData extends SelectBaseData = SelectBaseData>(
    props: SelectProps<Data, FormatData>
) {
    const [show, updateShow] = useState(false)
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useFocus()
    const [position, updatePosition] = useState<'drop-down' | 'drop-up'>('drop-down')
    const [control, updateControl] = useState<'mouse' | 'keyboard'>('mouse')
    const [filterText, updateFilterText] = useState('')
    const {
        size,
        border,
        width,
        style,
        className,
        multiple = false,
        onFocus,
        onBlur,
        onFilter,
        onCreate,
        height = 256,
        onCollapse,
        autoAdapt,
        portal,
        format,
        data,
        groupBy,
        defaultValue,
        value,
        onChange,
        prediction,
        placeholder,
        compressed,
        showArrow = true,
        compressedClassName,
        resultClassName,
        lineHeight = 32,
        text = {},
        loading,
        keygen,
        spinProps,
        onScrollRatioChange,
        customRender,
        clearable,
        columns,
        columnWidth,
    } = props
    const selectId = useRef(getUidStr()).current
    const isRender = useRef(false)
    const inputRef = useRef<HTMLInputElement>()
    const optionListRef = useRef<OptionListInstance>()
    const containerElementRef = useRef<HTMLDivElement>()
    const { className: cls, style: ms } = useInputStyle({
        border,
        size,
        disabled: props.disabled === true,
        width,
        style,
        focus,
        className,
    })
    const { selectData, groupKey } = useSelectData({ filterText, data, groupBy, onFilter, onCreate })
    const { selectValues, add, remove, disabled, check, getDataByValue, set, updateSelectValues } = useSelectValues({
        multiple,
        onCreate,
        onChange,
        prediction,
        defaultValue,
        value,
        disabled: props.disabled,
        selectData,
        format,
    })
    const containerCls = selectClass(
        'inner',
        size,
        focus && 'focus',
        position,
        multiple && 'multiple',
        props.disabled === true && 'disabled'
    )

    function handleFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return

        if (onFocus) {
            onFocus(e)
        }

        updateFocus(true)

        lockFocus()
    }

    function handleBlur(evt: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return
        /** @see https://developer.mozilla.org/en-US/docs/Web/API/FocusEvent/relatedTarget */
        if (evt.relatedTarget && getParent(evt.relatedTarget as HTMLElement, `.${selectClass('result')}`)) return

        if (onBlur) {
            onBlur(evt)
        }

        document.removeEventListener('mousedown', handleClickAway, true)
        handleShowStateChange(false)
        updateFocus(false)
    }

    const handleClickAway = useRefMethod((evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, selectId)

        if (desc) {
            const clickInput = getParent(evt.target as HTMLElement, `.${selectClass('input')}`)
            const clickCustom = getParent(evt.target as HTMLElement, `.${selectClass('custom')}`)

            lockFocus(() => {
                if (!clickInput && !clickCustom) {
                    containerElementRef.current.focus()
                }
            })
        }
    })

    const handleChange = useRefMethod((dataItem) => {
        if (props.disabled === true) return

        if (multiple) {
            const checked = !check(dataItem)

            if (checked) {
                add(dataItem)

                if (handleInput) {
                    handleInput('')
                    lockFocus()
                    inputRef.current.focus()
                }
            } else {
                remove(dataItem)
            }
        } else {
            set(dataItem)

            handleShowStateChange(false)
        }
    })

    const handleItemRemove = useRefMethod((dataItem) => {
        handleChange(dataItem)
    })

    const handleClear = useRefMethod((evt: React.MouseEvent) => {
        evt.stopPropagation()

        set([])

        if (show) {
            handleShowStateChange(false)
        }
    })

    function handleShowStateChange(nextShow: boolean) {
        if (props.disabled === true || show === nextShow) return

        let nextPosition = position || 'drop-down'

        const windowHeight = docSize.height
        const bottom = height + containerElementRef.current.getBoundingClientRect().bottom

        if (bottom > windowHeight && !nextPosition) nextPosition = 'drop-up'
        if (onCollapse) onCollapse(nextShow)
        if (nextShow) {
            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener */
            document.addEventListener('mousedown', handleClickAway, true)
        }

        updateShow(nextShow)
        updatePosition(nextPosition)
    }

    const handleInput = onFilter || onCreate ? updateFilterText : undefined

    const handleTransitionEnd = useRefMethod(() => {
        if (!handleInput) return

        updateFilterText('')
    })

    function handleContainerMouseDown(evt: React.MouseEvent) {
        const isClickOption =
            !getParent(evt.target as HTMLElement, `.${selectClass('result')}`) &&
            evt.target !== containerElementRef.current

        if (isClickOption) {
            return
        }

        const plain = !handleInput

        if (plain && show) {
            handleShowStateChange(false)
        } else {
            handleShowStateChange(true)
        }
    }

    function handleEnter() {
        if (!optionListRef.current) return

        const hoverIndex = optionListRef.current.getHoverIndex()

        const hoverData = data[hoverIndex]

        if (!isEmpty(hoverData) && !hoverData[groupKey]) {
            handleChange(hoverData)

            optionListRef.current.handleHover?.(hoverIndex)
        }
    }

    function handleDelete(evt: React.KeyboardEvent<HTMLDivElement>) {
        if (!multiple) return

        if (!isEmpty(filterText)) return

        if (!selectValues.length) return

        const afterValues = [...selectValues]

        const deleteValue = afterValues.pop()

        const dataItem = getDataByValue(data, deleteValue)

        if (dataItem) {
            handleItemRemove(dataItem.data)
        } else {
            updateSelectValues(afterValues, deleteValue, false)
        }

        evt.stopPropagation()

        evt.preventDefault()
    }

    function handleKeydown(evt: React.KeyboardEvent<HTMLDivElement>) {
        if (evt.key === KeyboardKey.Enter && !show) {
            evt.preventDefault()

            handleShowStateChange(true)

            return
        }

        if (evt.key === KeyboardKey.Tab && show) {
            handleShowStateChange(false)

            return
        }

        if (!focus) return

        updateControl('keyboard')

        switch (evt.key) {
            case KeyboardKey.ArrowUp:
                evt.preventDefault()

                if (optionListRef.current) {
                    optionListRef.current.hoverMove(-1)
                }

                break
            case KeyboardKey.ArrowDown:
                evt.preventDefault()

                if (optionListRef.current) {
                    optionListRef.current.hoverMove(1)
                }

                break
            case KeyboardKey.Enter:
                if (optionListRef.current) {
                    handleEnter()
                }

                evt.stopPropagation()

                evt.preventDefault()

                break

            case KeyboardKey.Backspace:
                handleDelete(evt)

                break
            default:
                break
        }
    }

    const renderItem = useRefMethod((item, index?: number) => {
        if (isEmpty(props.renderItem)) {
            return defaultRenderItem(item)
        }

        return isFunc(props.renderItem) ? props.renderItem(item, index) : item[props.renderItem]
    })

    function renderList() {
        if (!show && !isRender.current) return null

        isRender.current = true

        const rect = containerElementRef.current?.getBoundingClientRect()

        const listStyle = styles(portal && getListPortalStyle(rect, position, autoAdapt ? 'min' : true))

        return (
            <Portal rootClass={selectClass(position)} portal={portal}>
                {columns >= 1 || columns === -1 ? (
                    <BoxList
                        style={listStyle}
                        show={show}
                        selectId={selectId}
                        renderItem={renderItem}
                        height={height}
                        lineHeight={lineHeight}
                        text={text}
                        loading={loading}
                        keygen={keygen}
                        spinProps={spinProps}
                        customRender={customRender}
                        onChange={handleChange}
                        set={set}
                        disabled={disabled}
                        getDataByValue={getDataByValue}
                        check={check}
                        groupKey={groupKey}
                        data={selectData}
                        values={selectValues}
                        columns={columns}
                        columnWidth={columnWidth}
                        multiple={multiple}
                    />
                ) : (
                    <OptionList
                        values={selectValues}
                        data={selectData}
                        show={show}
                        style={listStyle}
                        selectId={selectId}
                        className={selectClass(autoAdapt && 'auto-adapt')}
                        renderItem={renderItem}
                        onControlChange={updateControl}
                        control={control}
                        height={height}
                        lineHeight={lineHeight}
                        text={text}
                        loading={loading}
                        keygen={keygen}
                        position={position}
                        spinProps={spinProps}
                        size={size}
                        onScrollRatioChange={onScrollRatioChange}
                        filterText={filterText}
                        customRender={customRender}
                        onChange={handleChange}
                        set={set}
                        disabled={disabled}
                        getDataByValue={getDataByValue}
                        check={check}
                        groupKey={groupKey}
                        onTransitionEnd={handleTransitionEnd}
                        ref={optionListRef}
                    />
                )}
            </Portal>
        )
    }

    const renderResult = props.renderResult || renderItem

    return (
        <div className={cls} style={ms}>
            <div
                tabIndex={props.disabled === true ? -1 : 0}
                ref={containerElementRef}
                className={containerCls}
                onFocus={handleFocus}
                onMouseDown={handleContainerMouseDown}
                onBlur={handleBlur}
                data-id={selectId}
                onKeyDown={handleKeydown}
            >
                <Result
                    size={size}
                    filterText={filterText}
                    onClear={clearable ? handleClear : undefined}
                    onInput={handleInput}
                    onRemove={handleItemRemove}
                    isDisabled={props.disabled === true}
                    disabledFunc={disabled}
                    show={show}
                    result={selectValues}
                    multiple={multiple}
                    placeholder={placeholder}
                    renderResult={renderResult}
                    compressed={compressed}
                    showArrow={showArrow}
                    compressedClassName={compressedClassName}
                    resultClassName={resultClassName}
                    forwardedInputRef={inputRef}
                />

                {renderList()}
            </div>
        </div>
    )
}

Select.displayName = 'EthanSelect'

export default React.memo(Select) as typeof Select
