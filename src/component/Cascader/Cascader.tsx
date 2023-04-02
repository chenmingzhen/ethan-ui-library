import useLockFocus from '@/hooks/useLockFocus'
import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { cascaderClass, selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { isDescendent } from '@/utils/dom/element'
import { getListPortalStyle } from '@/utils/position'
import { styles } from '@/utils/style/styles'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useRef, useState } from 'react'
import { KeyboardKey } from '@/utils/keyboard'
import { isEmpty } from '@/utils/is'
import useInputStyle from '../Input/hooks/useInputStyle'
import AnimationList from '../List'
import Portal from '../Portal'
import CascaderResult from './Result'
import { CascaderData, CascaderDataValueType, CascaderProps } from './type'
import CascaderList from './List'
import useCascaderDatum from './hooks/useCascaderDatum'
import FilterList from './FilterList'
import { useLockAnimation } from './hooks/useLockAnimation'
import Spin from '../Spin'

function Cascader<Data = CascaderData>(props: CascaderProps<Data>) {
    const {
        size,
        border,
        onFocus,
        onBlur,
        height = 300,
        onCollapse,
        placeholder,
        zIndex,
        portal,
        compressed,
        loader,
        data = [],
        onFilter,
        clearable = true,
        onItemClick,
        changeOnSelect,
        multiple,
        loading,
        expandTrigger = 'click',
        text = {},
        labelKey = 'label',
        valueKey = 'value',
        childrenKey = 'children',
        showResultMode = 'full',
    } = props
    const cascaderId = useRef(getUidStr()).current
    const [position, updatePosition] = useState(props.position)
    const [show, updateShow] = useState(false)
    const [path, updatePath] = useState<CascaderDataValueType[]>([])
    const [lockAnimation, startLockAnimation] = useLockAnimation()
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useLockFocus()
    const containerElementRef = useRef<HTMLDivElement>()
    const { className, style } = useInputStyle({
        focus,
        disabled: props.disabled === true,
        size,
        border,
        style: props.style,
        className: classnames(props.className, selectClass('_')),
    })
    const inputRef = useRef<HTMLInputElement>()
    const [filterText, updateFilterText] = useState('')
    const cls = classnames(
        cascaderClass('_', focus && 'focus', props.multiple && 'multiple', props.disabled === true && 'disabled', size),
        selectClass(position)
    )
    const getKey = useRefMethod((dataItem: CascaderData) => dataItem[valueKey])

    const getContent = useRefMethod((dataItem: Data) => {
        if (props.renderItem) {
            return props.renderItem(dataItem)
        }

        return dataItem[labelKey]
    })

    const {
        value,
        setValue,
        nodeMapping,
        getDisabledByDataItem,
        getNodeInfoByDataItem,
        getDataItemByKey,
        getCheckboxStateByDataItem,
        addValue,
        removeValue,
        replaceValue,
        setSingleValue,
    } = useCascaderDatum({
        data,
        childrenKey,
        disabled: props.disabled,
        defaultValue: props.defaultValue,
        value: props.value,
        onChange: props.onChange,
        getKey,
        limit: multiple ? undefined : 1,
    })

    const handleTransitionEnd = useRefMethod(() => {
        if (!show) {
            updatePath([])
        }
    })

    const handlePathChange = useRefMethod((dataItem: CascaderData, change: boolean, dismiss: boolean) => {
        const node = getNodeInfoByDataItem(dataItem)

        if (!node) return

        const { keyPath } = node

        updatePath(keyPath)

        if (change) {
            setSingleValue(dataItem)
        }

        if (dismiss) {
            toggleOpen(false)
        }
    })

    const handleClickAway = useRefMethod((evt: MouseEvent) => {
        const desc = isDescendent(evt.target as HTMLElement, cascaderId)

        if (desc) {
            lockFocus(() => {
                inputRef.current.focus()
            })
        }
    })

    const handleInput = useRefMethod((inputText: string) => {
        /** 无输入内容时，转换成OptionList，不触发动画 */
        if (!inputText) {
            startLockAnimation()
        }

        updateFilterText(inputText)
    })

    function handleFocus(evt: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return

        if (onFocus) {
            onFocus(evt)
        }

        updateFocus(true)

        lockFocus()
    }

    function toggleOpen(nextShow: boolean) {
        if (props.disabled === true || show === nextShow) return

        const windowHeight = docSize.height
        const bottom = height + containerElementRef.current.getBoundingClientRect().bottom
        let nextPosition = position || 'drop-down'

        if (bottom > windowHeight && !nextPosition) nextPosition = 'drop-up'
        if (onCollapse) onCollapse(nextShow)
        if (nextShow) {
            updatePath(value[value.length - 1] || [])
            document.addEventListener('mousedown', handleClickAway, true)
        }

        updateShow(nextShow)
        updatePosition(nextPosition)
    }

    function handleBlur(evt: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return
        if (onBlur) {
            onBlur(evt)
        }

        document.removeEventListener('mousedown', handleClickAway, true)

        if (!filterText) {
            toggleOpen(false)
            updateFocus(false)
        } else {
            startLockAnimation()
            updateFilterText('')
            updateFocus(false)

            setTimeout(() => {
                toggleOpen(false)
            }, 20)
        }
    }

    function handleClear() {
        setValue([])
        updatePath([])
        toggleOpen(false)
    }

    function handleContainerMouseDown() {
        if (show) return

        toggleOpen(true)

        inputRef.current.focus()
    }

    function handleKeydown(evt: React.KeyboardEvent<HTMLDivElement>) {
        if (evt.key === KeyboardKey.Enter) {
            evt.preventDefault()
            toggleOpen(!show)
        }
    }

    function renderCascaderList() {
        if (loading) return <Spin size={20} />
        if (!data?.length) return <span>{text.noData || getLocale('noData')}</span>

        let currentData: CascaderData | CascaderData[] = data

        return (
            <>
                <CascaderList
                    key="root"
                    currentData={data}
                    currentPathActiveId={path[0]}
                    getKey={getKey}
                    multiple={multiple}
                    loader={loader}
                    expandTrigger={expandTrigger}
                    childrenKey={childrenKey}
                    getContent={getContent}
                    onItemClick={onItemClick}
                    getDisabledByDataItem={getDisabledByDataItem}
                    changeOnSelect={changeOnSelect}
                    onPathChange={handlePathChange}
                    getNodeInfoByDataItem={getNodeInfoByDataItem}
                    getCheckboxStateByDataItem={getCheckboxStateByDataItem}
                    addValue={addValue}
                    removeValue={removeValue}
                    replaceValue={replaceValue}
                />
                {path.map((id, index) => {
                    currentData = (currentData as CascaderData[])?.find((dataItem) => getKey(dataItem) === id)

                    if (currentData?.[childrenKey]?.length > 0) {
                        currentData = currentData[childrenKey]

                        return (
                            <CascaderList
                                key={id}
                                currentData={currentData as CascaderData[]}
                                currentPathActiveId={path[index + 1]}
                                getKey={getKey}
                                multiple={multiple}
                                loader={loader}
                                expandTrigger={expandTrigger}
                                childrenKey={childrenKey}
                                getContent={getContent}
                                onItemClick={onItemClick}
                                getDisabledByDataItem={getDisabledByDataItem}
                                changeOnSelect={changeOnSelect}
                                onPathChange={handlePathChange}
                                getNodeInfoByDataItem={getNodeInfoByDataItem}
                                getCheckboxStateByDataItem={getCheckboxStateByDataItem}
                                addValue={addValue}
                                removeValue={removeValue}
                                replaceValue={replaceValue}
                            />
                        )
                    }

                    return null
                })}
            </>
        )
    }

    function renderPanel() {
        let width

        if (!data?.length || loading) {
            width = containerElementRef.current ? containerElementRef.current.getBoundingClientRect().width : 0
        }

        const portalRootCls = classnames(cascaderClass(focus && 'focus'), selectClass(position))
        const rect = containerElementRef.current?.getBoundingClientRect()
        const listStyle = styles(
            { zIndex, width, height: data?.length ? height : undefined },
            portal && getListPortalStyle(rect, position)
        )

        return (
            <Portal rootClass={portalRootCls} portal={portal} show={show}>
                {isEmpty(filterText) || loading ? (
                    <AnimationList
                        show={show}
                        data-id={cascaderId}
                        className={classnames(
                            selectClass('options'),
                            cascaderClass('options', !data?.length && 'no-data')
                        )}
                        animationTypes={!lockAnimation ? ['fade', 'scale-y'] : undefined}
                        duration="fast"
                        display="inline-flex"
                        style={listStyle}
                        onTransitionEnd={handleTransitionEnd}
                    >
                        {renderCascaderList()}
                    </AnimationList>
                ) : (
                    <FilterList
                        cascaderId={cascaderId}
                        listStyle={listStyle}
                        filterText={filterText}
                        nodeMapping={nodeMapping}
                        onFilter={onFilter}
                        getDataItemByKey={getDataItemByKey}
                        getContent={getContent}
                        getKey={getKey}
                        onPathChange={handlePathChange}
                        onFilterTextChange={handleInput}
                        multiple={multiple}
                        addValue={addValue}
                        removeValue={removeValue}
                        getCheckboxStateByDataItem={getCheckboxStateByDataItem}
                        text={text}
                    />
                )}
            </Portal>
        )
    }

    return (
        <div className={className} style={style}>
            <div
                className={cls}
                onFocus={handleFocus}
                ref={containerElementRef}
                onMouseDown={handleContainerMouseDown}
                onBlur={handleBlur}
                onKeyDown={handleKeydown}
                data-id={cascaderId}
            >
                <CascaderResult
                    forwardedInputRef={inputRef}
                    getCheckboxStateByDataItem={getCheckboxStateByDataItem}
                    multiple={multiple}
                    isDisabled={props.disabled === true}
                    onClear={handleClear}
                    placeholder={placeholder}
                    onPathChange={handlePathChange}
                    getDataItemByKey={getDataItemByKey}
                    getContent={getContent}
                    value={value}
                    clearable={clearable}
                    compressed={compressed}
                    getNodeInfoByDataItem={getNodeInfoByDataItem}
                    showResultMode={showResultMode}
                    onInput={onFilter ? handleInput : undefined}
                    filterText={onFilter ? filterText : undefined}
                    size={onFilter ? size : undefined}
                />

                {renderPanel()}
            </div>
        </div>
    )
}

Cascader.displayName = 'EthanCascader'

export default React.memo(Cascader)
