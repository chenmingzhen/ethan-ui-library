import useRefMethod from '@/hooks/useRefMethod'
import { getLocale } from '@/locale'
import { transferClass } from '@/styles'
import { isArray, isFunc, isString } from '@/utils/is'
import { styles } from '@/utils/style/styles'
import { getKey } from '@/utils/uid'
import classnames from 'classnames'
import React, { useMemo, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import Card from '../Card'
import Checkbox from '../Checkbox'
import Input from '../Input'
import LazyList from '../LazyList'
import Spin from '../Spin'
import { TransferCardProps } from './type'
import Item from './TransferItem'

const TransferCard: React.FC<TransferCardProps> = (props) => {
    const {
        selectedKeys,
        disabled,
        loading,
        title,
        listClassName,
        listStyle,
        listHeight,
        customRender,
        empty,
        footer,
        keygen,
        index,
        onFilter,
        onSelectedKeysChange,
        onSearch,
        values,
        lineHeight,
        itemClass,
    } = props

    const [text, updateText] = useState('')
    const [lazyListHeight, updateLazyListHeight] = useState(0)
    const cardBodyElementRef = useRef<HTMLDivElement>()
    const data = useMemo(() => {
        if (!onFilter || !text) return props.data

        return props.data.filter((d) => onFilter(text, d, !index))
    }, [props.data, text])

    useIsomorphicLayoutEffect(() => {
        updateLazyListHeight(cardBodyElementRef.current.offsetHeight)
    }, [])

    const handleShouldRecomputed = useRefMethod(() => false)

    const handleCheckAll = useRefMethod((check: boolean) => {
        if (check) {
            if (typeof disabled === 'function') {
                const nextSelectedKeys = data.reduce((total, current, i) => {
                    if (disabled(current)) return total

                    total.push(getKey(current, keygen, i))

                    return total
                }, [])

                onSelectedKeysChange(index, nextSelectedKeys)
            } else {
                onSelectedKeysChange(
                    index,
                    data.map((item, i) => getKey(item, keygen, i))
                )
            }
        } else {
            onSelectedKeysChange(index, [])
        }
    })

    const handleFilter = useRefMethod((nextText) => {
        if (onSearch) onSearch(nextText, !index)

        updateText(nextText)
    })

    const renderItem = useRefMethod((item, i) => {
        const key = getKey(item, keygen, i)

        const content = isString(props.renderItem)
            ? item[props.renderItem]
            : isFunc(props.renderItem)
            ? props.renderItem(item)
            : ''

        return (
            <Item
                lineHeight={lineHeight}
                key={key}
                disabled={typeof disabled === 'function' ? disabled(item) : disabled}
                index={index}
                checkKey={key}
                content={content}
                itemClass={itemClass}
            />
        )
    })

    const customSetSelected = useRefMethod((value) => {
        if (typeof value === 'string') {
            onSelectedKeysChange(index, [...selectedKeys, value])

            return
        }
        if (isArray(value)) {
            onSelectedKeysChange(index, value)
        }
    })

    function renderFilter() {
        if (!onFilter && !onSearch) return null

        if (isFunc(props.renderFilter)) {
            return (
                <div className={transferClass('filter')}>
                    {props.renderFilter({
                        text,
                        disabled: disabled === true,
                        onFilter,
                        placeholder: getLocale('search'),
                    })}
                </div>
            )
        }
        return (
            <div className={transferClass('filter')}>
                <Input
                    disabled={disabled === true}
                    onChange={handleFilter}
                    placeholder={getLocale('search')}
                    clearable
                    size="small"
                    value={text}
                />
            </div>
        )
    }

    function renderBody() {
        if (isFunc(customRender)) {
            const custom = customRender({
                onSelected: customSetSelected,
                direction: index === 0 ? 'left' : 'right',
                selectedKeys,
                value: values,
                data,
                text,
            })

            if (custom) return custom
        }

        return (
            <LazyList
                data={data}
                lineHeight={lineHeight}
                height={lazyListHeight}
                renderItem={renderItem}
                shouldRecomputed={handleShouldRecomputed}
            />
        )
    }

    const checked = data.length !== 0 && selectedKeys.length === data.length
    const indeterminate = !checked && selectedKeys.length !== 0
    const listMergeStyle = styles(listStyle, { height: listHeight })

    return (
        <>
            <Card className={transferClass('card')}>
                <Card.Header className={transferClass('card-header')}>
                    <div>
                        <Checkbox
                            onChange={handleCheckAll}
                            checked={checked}
                            indeterminate={indeterminate}
                            disabled={disabled === true || loading}
                        >
                            {checked || indeterminate
                                ? `${selectedKeys.length} ${getLocale('selected')}`
                                : getLocale('selectAll')}
                        </Checkbox>
                    </div>
                    <div className={transferClass('card-header-title')}>{title}</div>
                </Card.Header>
                {renderFilter()}
                <Spin loading={loading}>
                    <Card.Body className={classnames(transferClass('card-body'), listClassName)} style={listMergeStyle}>
                        <div className={transferClass('body-container')} ref={cardBodyElementRef}>
                            {renderBody()}
                            {!isFunc(customRender) && data.length === 0 && (
                                <div className={transferClass('empty')}>{empty || getLocale('noData')}</div>
                            )}
                        </div>
                    </Card.Body>
                </Spin>

                {footer && <Card.Footer className={transferClass('card-footer')}>{footer}</Card.Footer>}
            </Card>
        </>
    )
}

export default React.memo(TransferCard)
