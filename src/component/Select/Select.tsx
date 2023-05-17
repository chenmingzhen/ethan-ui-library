import useRefMethod from '@/hooks/useRefMethod'
import { selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isEmpty, isObject } from '@/utils/is'
import { KeyboardKey } from '@/utils/keyboard'
import { getPortalListStyle } from '@/utils/position'
import { getUidStr } from '@/utils/uid'
import React, { useEffect, useRef, useState } from 'react'
import useUpdate from '@/hooks/useUpdate'
import BoxList from './BoxList'
import useFocus from '../../hooks/useLockFocus'
import OptionList, { OptionListInstance } from './OptionList'
import Result from './Result'
import { SelectData, SelectProps } from './type'
import useProcessedData from './hooks/useProcessedData'
import useSelectDatum from './hooks/useSelectDatum'
import useInputStyle from '../Input/hooks/useInputStyle'
import Trigger from '../Trigger'

function Select<Data = SelectData>(props: SelectProps<Data>) {
    const [show, updateShow] = useState(false)
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useFocus()
    const [position, updatePosition] = useState<'drop-down' | 'drop-up'>('drop-down')
    const [control, updateControl] = useState<'mouse' | 'keyboard'>('mouse')
    const [filterText, updateFilterText] = useState('')
    const [portalElement, setPortalElement] = useState<HTMLElement>()
    const [triggerElement, setTriggerElement] = useState<HTMLElement>()
    const {
        size,
        style,
        value,
        width,
        onBlur,
        columns,
        onFocus,
        loading,
        groupBy,
        onChange,
        onFilter,
        onCreate,
        text = {},
        className,
        autoAdapt,
        clearable,
        spinProps,
        onCollapse,
        compressed,
        columnWidth,
        placeholder,
        customRender,
        defaultValue,
        height = 256,
        border = true,
        resultClassName,
        lineHeight = 32,
        multiple = false,
        showArrow = true,
        labelKey = 'label',
        valueKey = 'value',
        compressedClassName,
        onScrollRatioChange,
        getPopupContainer = () => document.body,
    } = props
    const componentKey = useRef(getUidStr()).current
    const inputRef = useRef<HTMLInputElement>()
    const optionListRef = useRef<OptionListInstance>()
    const { data, groupKey } = useProcessedData({ filterText, data: props.data, groupBy, onFilter, onCreate })
    const update = useUpdate()
    const {
        /** 选中的数据 */
        selectedData,
        disabled,
        getCheckedStateByDataItem,
        addByDataItem,
        removeByDataItem,
        setValuesByDataItems,
        getDataItemValue,
    } = useSelectDatum({
        multiple,
        onCreate,
        onChange,
        defaultValue,
        value,
        disabled: props.disabled,
        data,
        valueKey,
    })

    const { className: cls, style: ms } = useInputStyle({
        border,
        size,
        disabled: props.disabled === true,
        width,
        style,
        focus,
        className,
    })

    useEffect(() => {
        if (filterText && !show) {
            toggleOpen(true)
        }
    }, [filterText])

    const getKey = useRefMethod((dataItem: SelectData, index: number) =>
        isObject(dataItem) ? (isObject(dataItem[valueKey]) ? index : dataItem[valueKey]) : dataItem
    )

    const getOptionContent = useRefMethod((dataItem: Data, index: number) => {
        if (props.renderItem) {
            return props.renderItem(dataItem, index)
        }

        return isObject(dataItem) ? dataItem[labelKey] : dataItem
    })

    const getResultContent = useRefMethod((dataItem: Data, index: number) => {
        if (!dataItem) return null

        if (props.renderResult) {
            return props.renderResult(dataItem, index)
        }

        return getOptionContent(dataItem, index)
    })

    const focusSelect = useRefMethod(() => {
        if (!inputRef.current) return

        setTimeout(() => {
            inputRef.current.focus()
        })
    })

    function handleFocus(e: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return

        if (onFocus) {
            onFocus(e)
        }

        updateFocus(true)
    }

    function handleBlur(evt: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return

        if (onBlur) {
            onBlur(evt)
        }

        toggleOpen(false)
        updateFocus(false)
    }

    const handleChange = useRefMethod((dataItem: SelectData) => {
        if (props.disabled === true) return
        if (multiple) {
            const checked = !getCheckedStateByDataItem(dataItem)

            if (checked) {
                addByDataItem(dataItem)

                if (handleInput) {
                    handleInput('')
                }
            } else {
                removeByDataItem(dataItem)
            }
        } else {
            setValuesByDataItems([dataItem])

            toggleOpen(false)
        }
    })

    const handleItemRemove = useRefMethod((dataItem: SelectData) => {
        handleChange(dataItem)
    })

    const handleClear = useRefMethod((evt: React.MouseEvent) => {
        evt.stopPropagation()

        setValuesByDataItems([])

        if (show) {
            toggleOpen(false)
        }
    })

    function toggleOpen(nextShow: boolean) {
        if (props.disabled === true || show === nextShow) return

        let nextPosition = position || 'drop-down'

        const windowHeight = docSize.height
        const bottom = height + triggerElement.getBoundingClientRect().bottom

        if (bottom > windowHeight && !nextPosition) nextPosition = 'drop-up'
        if (onCollapse) onCollapse(nextShow)

        updateShow(nextShow)
        updatePosition(nextPosition)
    }

    const handleInput = onFilter || onCreate ? updateFilterText : undefined

    const handleCloseTransitionEnd = useRefMethod(() => {
        if (!handleInput || show) return

        updateFilterText('')
    })

    function handleDescClick() {
        lockFocus(() => {
            focusSelect()
        })
    }

    function handleMouseDown(evt: React.MouseEvent) {
        evt.preventDefault()

        focusSelect()
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
        if (!selectedData.length) return
        const deletedData = selectedData[selectedData.length - 1]
        if (disabled(deletedData)) return

        evt.stopPropagation()
        evt.preventDefault()

        if (deletedData) {
            handleItemRemove(deletedData)
        }
    }

    function handleKeydown(evt: React.KeyboardEvent<HTMLDivElement>) {
        if (evt.key === KeyboardKey.Enter && !show) {
            evt.preventDefault()

            toggleOpen(true)

            return
        }

        if (evt.key === KeyboardKey.Tab && show) {
            toggleOpen(false)

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

    const containerCls = selectClass(
        'inner',
        size,
        focus && 'focus',
        position,
        multiple && 'multiple',
        props.disabled === true && 'disabled'
    )

    return (
        <Trigger
            visible={show}
            componentKey={componentKey}
            onDescClick={handleDescClick}
            onTriggerElementResize={update}
            bindPortalElement={setPortalElement}
            allowClickTriggerClose={!handleInput}
            getPopupContainer={getPopupContainer}
            bindTriggerElement={setTriggerElement}
            portalClassName={selectClass(position)}
            onVisibleChange={toggleOpen}
            customPopupRender={() => {
                const listStyle = getPortalListStyle(triggerElement, portalElement, position, autoAdapt ? 'min' : true)

                return columns >= 1 || columns === -1 ? (
                    <BoxList
                        show={show}
                        text={text}
                        data={data}
                        getKey={getKey}
                        height={height}
                        loading={loading}
                        style={listStyle}
                        columns={columns}
                        multiple={multiple}
                        disabled={disabled}
                        groupKey={groupKey}
                        spinProps={spinProps}
                        lineHeight={lineHeight}
                        onChange={handleChange}
                        columnWidth={columnWidth}
                        selectedData={selectedData}
                        componentKey={componentKey}
                        customRender={customRender}
                        getOptionContent={getOptionContent}
                        getDataItemValue={getDataItemValue}
                        setValuesByDataItems={setValuesByDataItems}
                        getCheckedStateByDataItem={getCheckedStateByDataItem}
                    />
                ) : (
                    <OptionList
                        data={data}
                        show={show}
                        text={text}
                        size={size}
                        height={height}
                        getKey={getKey}
                        control={control}
                        loading={loading}
                        style={listStyle}
                        groupKey={groupKey}
                        position={position}
                        ref={optionListRef}
                        disabled={disabled}
                        spinProps={spinProps}
                        lineHeight={lineHeight}
                        filterText={filterText}
                        onChange={handleChange}
                        customRender={customRender}
                        selectedData={selectedData}
                        componentKey={componentKey}
                        onControlChange={updateControl}
                        getOptionContent={getOptionContent}
                        getDataItemValue={getDataItemValue}
                        onScrollRatioChange={onScrollRatioChange}
                        onTransitionEnd={handleCloseTransitionEnd}
                        className={selectClass(autoAdapt && 'auto-adapt')}
                        getCheckedStateByDataItem={getCheckedStateByDataItem}
                    />
                )
            }}
        >
            <div
                style={ms}
                className={cls}
                onBlur={handleBlur}
                onFocus={handleFocus}
                onKeyDown={handleKeydown}
                onMouseDown={handleMouseDown}
            >
                <div className={containerCls}>
                    <Result
                        size={size}
                        multiple={multiple}
                        showArrow={showArrow}
                        onInput={handleInput}
                        compressed={compressed}
                        filterText={filterText}
                        disabledFunc={disabled}
                        placeholder={placeholder}
                        onRemove={handleItemRemove}
                        selectedData={selectedData}
                        forwardedInputRef={inputRef}
                        resultClassName={resultClassName}
                        getResultContent={getResultContent}
                        isDisabled={props.disabled === true}
                        compressedClassName={compressedClassName}
                        onClear={clearable ? handleClear : undefined}
                    />
                </div>
            </div>
        </Trigger>
    )
}

Select.displayName = 'EthanSelect'

export default React.memo(Select) as typeof Select
