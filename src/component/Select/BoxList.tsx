import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { selectClass } from '@/styles'
import { isEmpty } from '@/utils/is'
import { styles } from '@/utils/style/styles'
import { getKey } from '@/utils/uid'
import React, { useMemo } from 'react'
import Checkbox from '../Checkbox'
import LazyList from '../LazyList'
import AnimationList from '../List'
import Spin from '../Spin'
import BoxListTitle from './BoxListTitle'
import BoxOption from './BoxOption'
import { BoxListProps } from './type'

const BoxList: React.FC<BoxListProps> = function (props) {
    const {
        columnWidth = 160,
        style,
        show,
        selectId,
        customRender = {},
        loading,
        columns,
        data,
        multiple,
        text,
        onChange,
        renderItem,
        keygen,
        groupKey,
        height,
        lineHeight,
        values,
        check,
        set,
        disabled,
        getDataByValue,
    } = props
    const { footer, header } = customRender
    const width = columns === -1 ? columnWidth : columnWidth * columns
    const ms = styles({}, style, { width })

    /**
     * 根据列数再次分割数据
     * columns:3 => [[1,2,3],[4,5,6]]
     */
    const sliceData = useMemo(
        () =>
            data.reduce((accumulatedValue, currentValue) => {
                let lastItem = accumulatedValue[accumulatedValue.length - 1]

                const groupTitle = currentValue[groupKey]

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
        [data]
    )

    const defaultIndex = useMemo(() => {
        if (!values.length) return undefined

        for (let i = 0; i < sliceData.length; i++) {
            sliceData[i]

            const item = getDataByValue(sliceData[i], values[0])

            if (item) {
                return i
            }
        }

        return undefined
    }, [])

    const handleSelectAll = useRefMethod((checked: boolean) => {
        set(checked ? data : [])
    })

    const handleLazyListRenderItem = useRefMethod((itemList: any[], groupIndex: number) => {
        const groupTitle = itemList[0] && itemList[0][groupKey] ? itemList[0][groupKey] : undefined

        if (!isEmpty(groupTitle)) {
            return <BoxListTitle title={groupTitle} key={groupTitle} style={{ height: lineHeight }} />
        }

        const lineKey = itemList.map((d, i) => getKey(d, keygen, i)).join()

        return (
            <div key={lineKey} style={{ height: lineHeight }}>
                {itemList.map((d, i) => (
                    <BoxOption
                        key={getKey(d, keygen, groupIndex + i)}
                        isActive={check(d)}
                        disabled={disabled(d)}
                        data={d}
                        columns={columns}
                        multiple={multiple}
                        onClick={onChange}
                        renderItem={renderItem}
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

        const checkedCount = data.filter((d) => check(d)).length

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
                data={sliceData}
                height={height}
                renderItem={handleLazyListRenderItem}
            />
        )
    }

    function renderStack() {
        return data.map((d, i) => {
            const groupTitle = d[groupKey]

            if (!isEmpty(groupTitle)) {
                return <BoxListTitle title={groupTitle} key={groupTitle} />
            }

            const isActive = check(d)

            return (
                <BoxOption
                    key={getKey(d, keygen, i)}
                    isActive={isActive}
                    disabled={disabled(d)}
                    data={d}
                    columns={columns}
                    multiple={multiple}
                    onClick={onChange}
                    renderItem={renderItem}
                    index={i}
                />
            )
        })
    }

    function renderOptions() {
        const stack = columns === -1

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
        <AnimationList
            style={ms}
            show={show}
            duration="fast"
            data-id={selectId}
            className={selectClass('box-list')}
            animationTypes={['scale-y', 'fade']}
            display="flex"
        >
            {renderHeader()}

            {loading && typeof loading === 'boolean' ? <Spin size={30} /> : loading}

            {renderOptions()}

            {footer ? <div className={selectClass('custom')}>{footer}</div> : null}
        </AnimationList>
    )
}

export default React.memo(BoxList)
