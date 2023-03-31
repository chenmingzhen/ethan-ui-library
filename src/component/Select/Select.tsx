import useRefMethod from '@/hooks/useRefMethod'
import { selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getParent, isDescendent } from '@/utils/dom/element'
import { isEmpty, isObject } from '@/utils/is'
import { KeyboardKey } from '@/utils/keyboard'
import { getListPortalStyle } from '@/utils/position'
import { styles } from '@/utils/style/styles'
import { getUidStr } from '@/utils/uid'
import React, { useRef, useState } from 'react'
import Portal from '../Portal'
import BoxList from './BoxList'
import useFocus from '../../hooks/useLockFocus'
import OptionList, { OptionListInstance } from './OptionList'
import Result from './Result'
import { SelectData, SelectProps } from './type'
import useProcessedData from './hooks/useProcessedData'
import useSelectDatum from './hooks/useSelectDatum'
import useInputStyle from '../Input/hooks/useInputStyle'

function Select<Data = SelectData>(props: SelectProps<Data>) {
    const [show, updateShow] = useState(false)
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useFocus()
    const [position, updatePosition] = useState<'drop-down' | 'drop-up'>('drop-down')
    const [control, updateControl] = useState<'mouse' | 'keyboard'>('mouse')
    const [filterText, updateFilterText] = useState('')
    const {
        size,
        border = true,
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
        groupBy,
        defaultValue,
        value,
        onChange,
        placeholder,
        compressed,
        showArrow = true,
        compressedClassName,
        resultClassName,
        lineHeight = 32,
        text = {},
        loading,
        spinProps,
        onScrollRatioChange,
        customRender,
        clearable,
        columns,
        columnWidth,
        labelKey = 'label',
        valueKey = 'value',
        width,
    } = props
    const selectId = useRef(getUidStr()).current
    const inputRef = useRef<HTMLInputElement>()
    const optionListRef = useRef<OptionListInstance>()
    const containerElementRef = useRef<HTMLDivElement>()
    const { data, groupKey } = useProcessedData({ filterText, data: props.data, groupBy, onFilter, onCreate })

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

        document.removeEventListener('mousedown', handleClickAway, true)
        handleShowStateChange(false)
        updateFocus(false)
    }

    const handleClickAway = useRefMethod((evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, selectId)

        if (desc) {
            lockFocus(() => {
                focusSelect()
            })
        }
    })

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

            handleShowStateChange(false)
        }
    })

    const handleItemRemove = useRefMethod((dataItem: SelectData) => {
        handleChange(dataItem)
    })

    const handleClear = useRefMethod((evt: React.MouseEvent) => {
        evt.stopPropagation()

        setValuesByDataItems([])

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

        updateShow(nextShow)
        updatePosition(nextPosition)

        if (nextShow) {
            /** @see https://developer.mozilla.org/zh-CN/docs/Web/API/EventTarget/addEventListener */
            document.addEventListener('mousedown', handleClickAway, true)
        }
    }

    const handleInput = onFilter || onCreate ? updateFilterText : undefined

    const handleTransitionEnd = useRefMethod(() => {
        if (!handleInput) return

        updateFilterText('')
    })

    function handleContainerMouseDown(evt: React.MouseEvent) {
        if (
            !getParent(evt.target as HTMLElement, `.${selectClass('result')}`) &&
            evt.target !== containerElementRef.current
        ) {
            return
        }

        const plain = !handleInput

        if (plain && show) {
            handleShowStateChange(false)
        } else {
            handleShowStateChange(true)
        }

        /** 有可能是非直接点击到Input上，需要手动获取焦点 */
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

    function renderList() {
        const rect = containerElementRef.current?.getBoundingClientRect()

        const listStyle = styles(portal && getListPortalStyle(rect, position, autoAdapt ? 'min' : true))

        return (
            <Portal rootClass={selectClass(position)} portal={portal} show={show}>
                {columns >= 1 || columns === -1 ? (
                    <BoxList
                        style={listStyle}
                        show={show}
                        selectId={selectId}
                        height={height}
                        lineHeight={lineHeight}
                        text={text}
                        loading={loading}
                        spinProps={spinProps}
                        customRender={customRender}
                        onChange={handleChange}
                        groupKey={groupKey}
                        data={data}
                        columns={columns}
                        columnWidth={columnWidth}
                        multiple={multiple}
                        disabled={disabled}
                        getKey={getKey}
                        setValuesByDataItems={setValuesByDataItems}
                        getCheckedStateByDataItem={getCheckedStateByDataItem}
                        getOptionContent={getOptionContent}
                        selectedData={selectedData}
                        getDataItemValue={getDataItemValue}
                    />
                ) : (
                    <OptionList
                        selectedData={selectedData}
                        data={data}
                        show={show}
                        style={listStyle}
                        selectId={selectId}
                        className={selectClass(autoAdapt && 'auto-adapt')}
                        onControlChange={updateControl}
                        control={control}
                        height={height}
                        lineHeight={lineHeight}
                        text={text}
                        loading={loading}
                        position={position}
                        spinProps={spinProps}
                        size={size}
                        onScrollRatioChange={onScrollRatioChange}
                        filterText={filterText}
                        customRender={customRender}
                        onChange={handleChange}
                        groupKey={groupKey}
                        onTransitionEnd={handleTransitionEnd}
                        ref={optionListRef}
                        getCheckedStateByDataItem={getCheckedStateByDataItem}
                        disabled={disabled}
                        getKey={getKey}
                        getOptionContent={getOptionContent}
                        getDataItemValue={getDataItemValue}
                    />
                )}
            </Portal>
        )
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
        <div className={cls} style={ms}>
            <div
                className={containerCls}
                ref={containerElementRef}
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
                    selectedData={selectedData}
                    multiple={multiple}
                    placeholder={placeholder}
                    getResultContent={getResultContent}
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
