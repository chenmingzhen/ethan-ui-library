import useLockFocus from '@/hooks/useLockFocus'
import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { cascaderClass, selectClass } from '@/styles'
import { docSize } from '@/utils/dom/document'
import { getPortalListStyle } from '@/utils/position'
import { styles } from '@/utils/style/styles'
import { getUidStr } from '@/utils/uid'
import classnames from 'classnames'
import React, { useRef, useState } from 'react'
import { KeyboardKey } from '@/utils/keyboard'
import { isEmpty } from '@/utils/is'
import useUpdate from '@/hooks/useUpdate'
import useInputStyle from '../Input/hooks/useInputStyle'
import CascaderResult from './Result'
import { CascaderData, CascaderDataValueType, CascaderProps } from './type'
import CascaderList from './List'
import useCascaderDatum from './hooks/useCascaderDatum'
import Spin from '../Spin'
import Trigger from '../Trigger'
import Motion from '../Motion'
import useFilteredData from './hooks/useFilteredData'
import FilterListOption from './FilterListOption'

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
        getPopupContainer = () => document.body,
    } = props
    const componentKey = useRef(getUidStr()).current
    const [position, updatePosition] = useState(props.position)
    const [show, updateShow] = useState(false)
    const [path, updatePath] = useState<CascaderDataValueType[]>([])
    const [focus, updateFocus, lockFocus, hasLockFocusRef] = useLockFocus()
    const [triggerElement, setTriggerElement] = useState<HTMLElement>()
    const [portalElement, setPortalElement] = useState<HTMLElement>()
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
    const update = useUpdate()
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

    const filteredData = useFilteredData({ filterText, nodeMapping, onFilter, getDataItemByKey, getContent })

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

    const handleDescClick = useRefMethod(() => {
        lockFocus(() => {
            inputRef.current.focus()
        })
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
        const bottom = height + triggerElement.getBoundingClientRect().bottom
        let nextPosition = position || 'drop-down'

        if (bottom > windowHeight && !nextPosition) nextPosition = 'drop-up'
        if (onCollapse) onCollapse(nextShow)
        if (nextShow) {
            updatePath(value[value.length - 1] || [])
        }

        updateShow(nextShow)
        updatePosition(nextPosition)
    }

    function handleBlur(evt: React.FocusEvent<HTMLDivElement, Element>) {
        if (hasLockFocusRef.current || props.disabled === true) return
        if (onBlur) {
            onBlur(evt)
        }

        if (!filterText) {
            updateFocus(false)
        } else {
            updateFilterText('')
            updateFocus(false)
        }

        toggleOpen(false)
    }

    function handleClear() {
        setValue([])
        updatePath([])
        toggleOpen(false)
    }

    function handleMouseDown(e: React.MouseEvent) {
        e.preventDefault()

        inputRef.current.focus()
    }

    function handleKeydown(evt: React.KeyboardEvent<HTMLDivElement>) {
        if (evt.key === KeyboardKey.Enter) {
            evt.preventDefault()
            toggleOpen(!show)
        }
    }

    function renderCascaderList() {
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

    function renderFilterList() {
        return (
            <>
                {filteredData.length ? (
                    <div className={cascaderClass('filter-list')}>
                        {filteredData.map((dataItem) => {
                            const currentDataItemKey = getKey(dataItem)
                            const node = nodeMapping.get(currentDataItemKey)

                            if (!node) return null

                            return (
                                <FilterListOption
                                    key={currentDataItemKey}
                                    multiple={multiple}
                                    dataItem={dataItem}
                                    onPathChange={handlePathChange}
                                    onFilterTextChange={updateFilterText}
                                    node={node}
                                    nodeMapping={nodeMapping}
                                    getDataItemByKey={getDataItemByKey}
                                    getContent={getContent}
                                    getCheckboxStateByDataItem={getCheckboxStateByDataItem}
                                    removeValue={removeValue}
                                    addValue={addValue}
                                    filterText={filterText}
                                />
                            )
                        })}
                    </div>
                ) : (
                    <span>{text.noData || getLocale('noData')}</span>
                )}
            </>
        )
    }

    return (
        <Trigger
            visible={show}
            allowClickTriggerClose={!onFilter}
            componentKey={componentKey}
            onVisibleChange={toggleOpen}
            bindPortalElement={setPortalElement}
            bindTriggerElement={setTriggerElement}
            portalClassName={classnames(cascaderClass(focus && 'focus'), selectClass(position))}
            getPopupContainer={getPopupContainer}
            onTriggerElementResize={update}
            onDescClick={handleDescClick}
            customPopupRender={() => {
                let listWidth
                let listHeight

                const showCascader = isEmpty(filterText)

                if ((showCascader && !data?.length) || !showCascader || loading) {
                    listWidth = triggerElement ? triggerElement.getBoundingClientRect().width : 0
                }

                if ((showCascader && data?.length) || (!showCascader && filteredData?.length)) {
                    listHeight = height
                }

                const listStyle = styles(
                    { zIndex, width: listWidth, height: listHeight },
                    getPortalListStyle(triggerElement, portalElement, position)
                )

                return (
                    <Motion.Transition
                        visible={show}
                        duration="fast"
                        style={listStyle}
                        data-ck={componentKey}
                        display="inline-flex"
                        onTransitionEnd={handleTransitionEnd}
                        transitionTypes={['fade', 'scale-y']}
                        className={classnames(
                            selectClass('options'),
                            cascaderClass(
                                'options',
                                !data?.length && 'no-data',
                                !showCascader && !filteredData.length ? 'no-data' : null
                            )
                        )}
                    >
                        {loading ? <Spin size={20} /> : showCascader ? renderCascaderList() : renderFilterList()}
                    </Motion.Transition>
                )
            }}
        >
            <div
                className={className}
                style={style}
                onFocus={handleFocus}
                onMouseDown={handleMouseDown}
                onBlur={handleBlur}
                onKeyDown={handleKeydown}
            >
                <div className={cls}>
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
                        onInput={onFilter ? updateFilterText : undefined}
                        filterText={onFilter ? filterText : undefined}
                        size={onFilter ? size : undefined}
                    />
                </div>
            </div>
        </Trigger>
    )
}

Cascader.displayName = 'EthanCascader'

export default React.memo(Cascader)
