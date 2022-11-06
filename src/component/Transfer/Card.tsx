import React from 'react'
import { transferClass } from '@/styles'
import { getLocale } from '@/locale'
import classnames from 'classnames'
import { isArray, isFunc } from '@/utils/is'
import { createFunc } from '@/utils/func'
import { TransferCardProps } from './type'
import ECard from '../Card'
import Spin from '../Spin'
import Checkbox from '../Checkbox'
import Input from '../Input'
import LazyList from '../LazyList'
import Item from './TransferItem'

interface CardState {
    lazyHeight: number

    text: string
}

class Card extends React.PureComponent<TransferCardProps, CardState> {
    cardBody: HTMLDivElement

    get check() {
        const { selecteds } = this.props

        if (selecteds.length === 0) return false

        if (selecteds.length === this.data.length) return true

        return 'indeterminate'
    }

    get data() {
        const { onFilter, data, index } = this.props

        const { text } = this.state

        if (!onFilter || !text) return data

        return data.filter((d) => onFilter(text, d, !index))
    }

    constructor(props: TransferCardProps) {
        super(props)

        this.state = {
            lazyHeight: 0,
            text: '',
        }
    }

    componentDidMount() {
        this.forceUpdate()
    }

    bindCardBody = (el: HTMLDivElement) => {
        this.cardBody = el

        this.setState({ lazyHeight: el?.offsetHeight })
    }

    checkAll = (check) => {
        const { setSelecteds, disabled, getKey, index } = this.props

        if (check) {
            if (typeof disabled === 'function') {
                const newSelecteds = this.data.reduce((total, current, i) => {
                    if (disabled(current)) return total

                    total.push(getKey(current, i))

                    return total
                }, [])

                setSelecteds(index, newSelecteds)
            } else {
                setSelecteds(
                    index,
                    this.data.map((item, i) => getKey(item, i))
                )
            }
        } else {
            setSelecteds(index, [])
        }
    }

    handleFilter = (text) => {
        const { onSearch, index } = this.props

        if (onSearch) onSearch(text, !index)

        this.setState({ text })
    }

    customSetSelected = (value) => {
        const { setSelecteds, index, selecteds } = this.props

        if (typeof value === 'string') {
            setSelecteds(index, [...selecteds, value])

            return
        }
        if (isArray(value)) {
            setSelecteds(index, value)
        }
    }

    renderFilter = () => {
        const { onFilter, onSearch, renderFilter, disabled } = this.props

        const { text } = this.state

        if (!onFilter && !onSearch) return null

        if (renderFilter && typeof renderFilter === 'function') {
            return (
                <div className={transferClass('filter')}>
                    {renderFilter({
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
                    onChange={this.handleFilter}
                    placeholder={getLocale('search')}
                    clearable
                    size="small"
                    value={text}
                />
            </div>
        )
    }

    renderItem = (data, i) => {
        const { disabled, getKey, lineHeight, renderItem, itemClass, index } = this.props

        const key = getKey(data, i)

        return (
            <Item
                lineHeight={lineHeight}
                key={key}
                disabled={typeof disabled === 'function' ? disabled(data) : disabled}
                index={index}
                checkKey={key}
                content={createFunc(renderItem)(data)}
                itemClass={itemClass}
            />
        )
    }

    renderBody = () => {
        const { customRender, values, selecteds, index, lineHeight } = this.props

        const { lazyHeight } = this.state

        if (isFunc(customRender)) {
            const custom = customRender({
                onSelected: this.customSetSelected,
                direction: index === 0 ? 'left' : 'right',
                selectedKeys: selecteds,
                value: values,
            })

            if (custom) return custom
        }

        return (
            <LazyList
                data={this.data}
                lineHeight={lineHeight}
                height={lazyHeight}
                renderItem={this.renderItem}
                shouldRecomputed={() => false}
            />
        )
    }

    render() {
        const {
            selecteds,
            disabled,
            loading,
            title,
            listClassName,
            listStyle,
            listHeight,
            customRender,
            empty,
            footer,
        } = this.props

        const listMergeStyle = Object.assign({}, listStyle, { height: listHeight })

        return (
            <>
                <ECard className={transferClass('card')}>
                    <ECard.Header className={transferClass('card-header')}>
                        <div>
                            <Checkbox
                                onChange={this.checkAll}
                                checked={this.check}
                                disabled={disabled === true || loading}
                            >
                                {this.check ? `${selecteds.length} ${getLocale('selected')}` : getLocale('selectAll')}
                            </Checkbox>
                        </div>
                        <div className={transferClass('card-header-title')}>{title}</div>
                    </ECard.Header>
                    {this.renderFilter()}
                    <Spin loading={loading}>
                        <ECard.Body
                            className={classnames(transferClass('card-body'), listClassName)}
                            style={listMergeStyle}
                        >
                            <div className={transferClass('body-container')} ref={this.bindCardBody}>
                                {this.renderBody()}
                                {!isFunc(customRender) && this.data.length === 0 && (
                                    <div className={transferClass('empty')}>{empty || getLocale('noData')}</div>
                                )}
                            </div>
                        </ECard.Body>
                    </Spin>

                    {footer && <ECard.Footer className={transferClass('card-footer')}>{footer}</ECard.Footer>}
                </ECard>
            </>
        )
    }
}

export default Card
