import { getLocale } from '@/locale'
import { selectClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import { getKey } from '@/utils/uid'
import React from 'react'
import Checkbox from '../Checkbox'
import { Checked } from '../Checkbox/type'
import AnimationList from '../List'
import LazyList from '../List/LazyList'
import Spin from '../Spin'
import BoxOption from './BoxOption'
import { SelectListProps } from './type'

class BoxList extends PureComponent<SelectListProps> {
    static defaultProps = {
        columnWidth: 160,
    }

    get width() {
        const { columnWidth, columns } = this.props

        if (columns === -1) return columnWidth

        return columnWidth * columns
    }

    getText = key => {
        return this.props.text[key] || getLocale(key)
    }

    handleSelectAll = (checked: boolean) => {
        const { datum, data } = this.props

        if (checked) {
            datum.set(data)
        } else {
            datum.clear()
        }
    }

    handleRenderItem = (data, groupIndex) => {
        const { datum, keygen, columns, multiple, onChange, renderItem, lineHeight } = this.props

        return (
            <div key={groupIndex} style={{ height: lineHeight }}>
                {data.map((d, i) => (
                    <BoxOption
                        key={getKey(d, keygen, groupIndex + i)}
                        isActive={datum.check(d)}
                        disabled={datum.disabled(d)}
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
    }

    renderHeader = () => {
        const { customRender = {}, data, loading, multiple, datum } = this.props

        const { header } = customRender

        if (loading || !multiple) return header ? <div className={selectClass('custom')}>{header}</div> : null

        let checked: Checked = 'indeterminate'

        const checkedCount = data.filter(d => datum.check(d)).length

        if (checkedCount === 0) checked = false
        else if (checkedCount === data.length) checked = true

        return (
            <div className={selectClass('custom')}>
                <div className={selectClass('header')}>
                    {multiple && (
                        <Checkbox onChange={this.handleSelectAll} checked={checked}>
                            {this.getText('selectAll')}
                        </Checkbox>
                    )}
                </div>

                {header}
            </div>
        )
    }

    renderStack = () => {
        const { columns, datum, multiple, onChange, renderItem, data, keygen } = this.props

        return data.map((d, i) => {
            const isActive = datum.check(d)

            return (
                <BoxOption
                    key={getKey(d, keygen, i)}
                    isActive={isActive}
                    disabled={datum.disabled(d)}
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

    renderLazyList = () => {
        const { columns, height, lineHeight, data, itemsInView } = this.props

        const scrollHeight = lineHeight * Math.ceil(data.length / columns)

        /**
         * 根据列数再次分割数据
         * columns:3 => [[1,2,3],[4,5,6]]
         */
        const sliceData = data.reduce((accumulatedValue, currentValue) => {
            let lastItem = accumulatedValue[accumulatedValue.length - 1]

            if (!lastItem) {
                lastItem = []

                accumulatedValue.push(lastItem)
            }

            if (lastItem.length >= columns) accumulatedValue.push([currentValue])
            else lastItem.push(currentValue)

            return accumulatedValue
        }, [])

        return (
            <LazyList
                control={false}
                scrollHeight={scrollHeight}
                lineHeight={lineHeight}
                data={sliceData}
                itemsInView={itemsInView}
                height={height}
                renderItem={this.handleRenderItem}
            />
        )
    }

    renderOptions = () => {
        const { columns, data, loading } = this.props

        const stack = columns === -1

        const empty = data.length === 0

        if (loading) return null

        return (
            <div className={selectClass('box-options', stack && 'scrollable')}>
                {empty && (
                    <div key="empty" className={selectClass('no-data')}>
                        {this.getText('noData')}
                    </div>
                )}
                {stack ? this.renderStack() : this.renderLazyList()}
            </div>
        )
    }

    render() {
        const { style, focus, selectId, customRender = {}, loading } = this.props

        const { footer } = customRender

        const ms = Object.assign({}, style, { width: this.width })

        return (
            <AnimationList
                lazyDom
                style={ms}
                show={focus}
                duration="fast"
                data-id={selectId}
                className={selectClass('box-list')}
                animationTypes={['scale-y', 'fade']}
                display="flex"
            >
                {this.renderHeader()}

                {loading && typeof loading === 'boolean' ? <Spin size={30} /> : loading}

                {this.renderOptions()}

                {footer ? <div className={selectClass('custom')}>{footer}</div> : null}
            </AnimationList>
        )
    }
}

export default BoxList
