import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { selectClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import { styles } from '@/utils/style/styles'
import React, { useMemo } from 'react'
import deepEql from 'deep-eql'
import Checkbox from '../Checkbox'
import LazyList from '../LazyList'
import Spin from '../Spin'
import BoxListTitle from './BoxListTitle'
import BoxOption from './BoxOption'
import { BoxListProps, SelectData } from './type'
import Motion from '../Motion'

const BoxList: React.FC<BoxListProps> = function (props) {
    const {
        columnWidth = 160,
        style,
        show,
        componentKey,
        customRender = {},
        loading,
        columns,
        data,
        multiple,
        text,
        onChange,
        groupKey,
        height,
        lineHeight,
        disabled,
        getCheckedStateByDataItem,
        getKey,
        setValuesByDataItems,
        getOptionContent,
        selectedData,
        getDataItemValue,
    } = props
    const { footer, header } = customRender
    const width = columns === -1 ? columnWidth : columnWidth * columns
    const ms = styles({}, style, { width })
    const stack = columns === -1

    /** 根据列数再次分割数据 columns:3 => [[1,2,3],[4,5,6]] */
    const columnData = useMemo(
        () =>
            stack
                ? []
                : data.reduce<SelectData[][]>((accumulatedValue, currentValue) => {
                      const groupTitle = currentValue[groupKey]
                      let lastItem = accumulatedValue[accumulatedValue.length - 1]

                      if (!isEmpty(groupTitle)) {
                          accumulatedValue.push([currentValue])
                          accumulatedValue.push([])

                          return accumulatedValue
                      }

                      if (!lastItem) {
                          lastItem = []

                          accumulatedValue.push(lastItem)
                      }

                      if (lastItem.length >= columns) {
                          accumulatedValue.push([currentValue])
                      } else {
                          lastItem.push(currentValue)
                      }

                      return accumulatedValue
                  }, []),
        [data, stack]
    )

    const defaultIndex = useMemo(() => {
        if (!selectedData.length) return undefined

        for (let i = 0; i < columnData.length - 1; i++) {
            const groupData = columnData[i]
            for (let j = 0; j < groupData.length - 1; j++) {
                if (deepEql(getDataItemValue(groupData[j]), getDataItemValue(selectedData[0]))) {
                    return i
                }
            }
        }

        return undefined
    }, [])

    const handleSelectAll = useRefMethod((checked: boolean) => {
        setValuesByDataItems(checked ? data : [])
    })

    const handleLazyListRenderItem = useRefMethod((itemList: SelectData[]) => {
        const groupTitle = itemList[0] && itemList[0][groupKey] ? itemList[0][groupKey] : undefined

        if (!isEmpty(groupTitle)) {
            return <BoxListTitle title={groupTitle} key={groupTitle} style={{ height: lineHeight }} />
        }

        const lineKey = itemList.map((d, i) => getKey(d, i)).join()

        return (
            <div key={lineKey} style={{ height: lineHeight }}>
                {itemList.map((dataItem, i) => (
                    <BoxOption
                        key={getKey(dataItem, undefined)}
                        isActive={getCheckedStateByDataItem(dataItem)}
                        disabled={disabled(dataItem)}
                        data={dataItem}
                        columns={columns}
                        multiple={multiple}
                        onClick={onChange}
                        getOptionContent={getOptionContent}
                        index={i}
                    />
                ))}
            </div>
        )
    })

    function getText(key: string) {
        return text[key] || getLocale(key)
    }

    function renderHeader() {
        if (loading || !multiple) return header ? <div className={selectClass('custom')}>{header}</div> : null

        let checked = false
        let indeterminate = false

        const checkedCount = data.filter((d) => getCheckedStateByDataItem(d)).length

        if (checkedCount === data.length) {
            checked = true
        } else if (checkedCount !== 0) {
            indeterminate = true
        }

        return (
            <div className={selectClass('custom')}>
                <div className={selectClass('header')}>
                    {multiple && (
                        <Checkbox onChange={handleSelectAll} checked={checked} indeterminate={indeterminate}>
                            {getText('selectAll')}
                        </Checkbox>
                    )}
                </div>

                {header}
            </div>
        )
    }

    function renderLazyList() {
        return (
            <LazyList
                defaultIndex={defaultIndex}
                lineHeight={lineHeight}
                data={columnData}
                height={height}
                renderItem={handleLazyListRenderItem}
            />
        )
    }

    function renderStack() {
        return data.map((dataItem, i) => {
            const groupTitle = dataItem[groupKey]

            if (!isEmpty(groupTitle)) {
                return <BoxListTitle title={groupTitle} key={groupTitle} />
            }

            const isActive = getCheckedStateByDataItem(dataItem)

            return (
                <BoxOption
                    key={getKey(dataItem, i)}
                    isActive={isActive}
                    disabled={disabled(dataItem)}
                    data={dataItem}
                    columns={columns}
                    multiple={multiple}
                    onClick={onChange}
                    getOptionContent={getOptionContent}
                    index={i}
                />
            )
        })
    }

    function renderOptions() {
        const empty = data.length === 0

        if (loading) return null

        return (
            <div className={selectClass('box-options', stack && 'scrollable')}>
                {empty && (
                    <div key="empty" className={selectClass('no-data')}>
                        {getText('noData')}
                    </div>
                )}
                {stack ? renderStack() : renderLazyList()}
            </div>
        )
    }

    return (
        <Motion.Transition
            style={ms}
            visible={show}
            duration="fast"
            data-ck={componentKey}
            className={selectClass('box-list')}
            transitionTypes={['scale-y', 'fade']}
            display="flex"
        >
            {renderHeader()}
            {loading && typeof loading === 'boolean' ? <Spin size={30} /> : loading}
            {renderOptions()}
            {footer ? <div className={selectClass('custom')}>{footer}</div> : null}
        </Motion.Transition>
    )
}

export default React.memo(BoxList)
