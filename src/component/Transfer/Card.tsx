import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { transferClass } from '@/styles'
import { styles } from '@/utils/style/styles'
import classnames from 'classnames'
import React, { useMemo, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import Card from '../Card'
import Checkbox from '../Checkbox'
import Input from '../Input'
import LazyList from '../LazyList'
import Spin from '../Spin'
import { TransferCardProps, TransferData, TransferDataValueType } from './type'
import Item from './TransferItem'

const TransferCard: React.FC<TransferCardProps> = (props) => {
    const {
        disabled,
        loading,
        title,
        listClassName,
        listStyle,
        listHeight,
        empty,
        footer,
        index,
        onFilter,
        onSelectedKeyChange,
        onSearch,
        lineHeight,
        itemClass,
        getKey,
        getContent,
        isDisabledAll,
        sideSelectedKeys,
        oneWay,
        removeByDataItems,
    } = props
    const [text, updateText] = useState('')
    const [lazyListHeight, updateLazyListHeight] = useState(0)
    const cardBodyElementRef = useRef<HTMLDivElement>()
    const data = useMemo(
        () => (!onFilter || !text ? props.data : props.data.filter((d) => onFilter(text, d, !index))),
        [props.data, text]
    )

    useIsomorphicLayoutEffect(() => {
        updateLazyListHeight(cardBodyElementRef.current.offsetHeight)
    }, [])

    const handleShouldRecomputed = useRefMethod(() => false)

    const handleCheckAll = useRefMethod((check: boolean) => {
        if (check) {
            const nextSelectedKeys = data.reduce<TransferDataValueType[]>((total, current, i) => {
                if (disabled(current)) return total

                total.push(getKey(current, i))

                return total
            }, [])

            onSelectedKeyChange(index, nextSelectedKeys)
        } else {
            onSelectedKeyChange(index, [])
        }
    })

    const handleFilter = useRefMethod((nextText) => {
        if (onSearch) onSearch(nextText, !index)

        updateText(nextText)
    })

    const renderItem = useRefMethod((dataItem: TransferData, i: number) => {
        const key = getKey(dataItem, i)
        const content = getContent(dataItem, i)

        return (
            <Item
                lineHeight={lineHeight}
                key={key}
                disabled={isDisabledAll || disabled(dataItem)}
                index={index}
                checkKey={key}
                content={content}
                itemClass={itemClass}
                sideSelectedKeys={sideSelectedKeys}
                onSelectedKeyChange={onSelectedKeyChange}
                oneWay={oneWay}
                removeByDataItems={removeByDataItems}
                dataItem={dataItem}
            />
        )
    })

    function renderFilter() {
        if (!onFilter && !onSearch) return null

        return (
            <div className={transferClass('filter')}>
                <Input
                    disabled={isDisabledAll}
                    onChange={handleFilter}
                    placeholder={getLocale('search')}
                    clearable
                    size="small"
                    value={text}
                />
            </div>
        )
    }

    const checked = data.length !== 0 && sideSelectedKeys.length === data.length
    const indeterminate = !checked && sideSelectedKeys.length !== 0
    const listMergeStyle = styles(listStyle, { height: listHeight })

    return (
        <Card className={transferClass('card')}>
            <Card.Header className={transferClass('card-header')}>
                {!oneWay || !index ? (
                    <div>
                        <Checkbox
                            onChange={handleCheckAll}
                            checked={checked}
                            indeterminate={indeterminate}
                            disabled={isDisabledAll || loading}
                        >
                            {checked || indeterminate
                                ? `${sideSelectedKeys.length} ${getLocale('selected')}`
                                : getLocale('selectAll')}
                        </Checkbox>
                    </div>
                ) : null}
                <div className={transferClass('card-header-title')}>{title}</div>
            </Card.Header>
            {renderFilter()}
            <Spin loading={loading}>
                <Card.Body className={classnames(transferClass('card-body'), listClassName)} style={listMergeStyle}>
                    <div className={transferClass('body-container')} ref={cardBodyElementRef}>
                        <LazyList
                            data={data}
                            lineHeight={lineHeight}
                            height={lazyListHeight}
                            renderItem={renderItem}
                            shouldRecomputed={handleShouldRecomputed}
                        />
                        {data.length === 0 && (
                            <div className={transferClass('empty')}>{empty || getLocale('noData')}</div>
                        )}
                    </div>
                </Card.Body>
            </Spin>

            {footer && <Card.Footer className={transferClass('card-footer')}>{footer}</Card.Footer>}
        </Card>
    )
}

export default React.memo(TransferCard)
