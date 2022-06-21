import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { transferClass } from '@/styles'
import { isArray } from '@/utils/is'
import { getKey } from '@/utils/uid'
import { TransferBaseData, TransferDefaultData, TransferState, TransferProps } from './type'
import splitSelecteds from './utils/select'
import { Provider } from './context'
import Card from './Card'
import OperationButtons from './OperationButtons'

class Transfer<
    Data extends TransferBaseData = TransferDefaultData,
    FormatData extends TransferBaseData = Data
> extends PureComponent<TransferProps<Data, FormatData>, TransferState<FormatData>> {
    static defaultProps = {
        titles: [],
        data: [],
        footers: [],
        operations: [],
        operationIcon: true,
        renderItem: d => d,
        rowsInView: 20,
        lineHeight: 32,
        listHeight: 180,
    }

    get selecteds() {
        const { selectedKeys } = this.props

        /** 受控 */
        if (selectedKeys) return splitSelecteds(selectedKeys, this.props)

        return this.state.selecteds
    }

    get sources() {
        const { data, datum } = this.props

        return data.filter(d => !datum.check(d))
    }

    get targets() {
        const { data, datum } = this.props

        const datumValues = datum.getOuterValue()

        return datumValues.reduce((p, n) => {
            const d = datum.getDataByValue(data, n)

            if (d) p.push(d)

            return p
        }, [])
    }

    constructor(props: TransferProps<Data, FormatData>) {
        super(props)

        const { selectedKeys, defaultSelectedKeys } = props

        const selecteds = selectedKeys
            ? splitSelecteds(selectedKeys, props)
            : splitSelecteds(defaultSelectedKeys, props) || [[], []]

        this.state = {
            selecteds,
        }
    }

    getKey = (item: FormatData, index: number) => {
        const { keygen } = this.props

        return getKey(item, keygen, index)
    }

    getLoading = (index: number) => {
        const { loading } = this.props

        if (isArray(loading)) {
            return loading[index]
        }

        return loading
    }

    updateSelecteds = (index: number, value: FormatData[]) => {
        const { onSelectChange } = this.props
        const { selecteds } = this.state

        const newSelecteds = index ? [selecteds[0], value] : [value, selecteds[1]]

        if (onSelectChange) onSelectChange(newSelecteds[0], newSelecteds[1])

        this.setState({
            selecteds: newSelecteds,
        })
    }

    render() {
        const {
            className,
            style,
            itemClass,
            titles,
            renderItem,
            footers,
            listClassName,
            listStyle,
            onFilter,
            empty,
            disabled,
            onSearch,
            rowsInView,
            lineHeight,
            listHeight,
            renderFilter,
            children,
            datum,
            operations,
            data,
            operationIcon,
        } = this.props

        const { selecteds, sources, targets } = this

        const datumValues = datum.getOuterValue()

        return (
            <div className={classnames(transferClass('_'), className)} style={style}>
                <Provider value={{ selecteds, setSelecteds: this.updateSelecteds }}>
                    <Card
                        title={titles[0]}
                        selecteds={selecteds[0]}
                        data={sources}
                        getKey={this.getKey}
                        renderItem={renderItem}
                        setSelecteds={this.updateSelecteds}
                        index={0}
                        footer={footers[0]}
                        listClassName={listClassName}
                        listStyle={listStyle}
                        loading={this.getLoading(0)}
                        onFilter={onFilter}
                        empty={empty}
                        disabled={disabled}
                        onSearch={onSearch}
                        rowsInView={rowsInView}
                        lineHeight={lineHeight}
                        listHeight={listHeight}
                        renderFilter={renderFilter}
                        customRender={children}
                        values={datumValues}
                        itemClass={itemClass}
                    />
                    <OperationButtons
                        datum={datum}
                        getKey={this.getKey}
                        operations={operations}
                        operationIcon={operationIcon}
                        data={data}
                        disabled={disabled}
                    />
                    <Card
                        title={titles[1]}
                        selecteds={selecteds[1]}
                        data={targets}
                        getKey={this.getKey}
                        renderItem={renderItem}
                        loading={this.getLoading(1)}
                        setSelecteds={this.updateSelecteds}
                        index={1}
                        footer={footers[1]}
                        listClassName={listClassName}
                        listStyle={listStyle}
                        onFilter={onFilter}
                        empty={empty}
                        disabled={disabled}
                        onSearch={onSearch}
                        rowsInView={rowsInView}
                        lineHeight={lineHeight}
                        listHeight={listHeight}
                        renderFilter={renderFilter}
                        customRender={children}
                        values={datumValues}
                        itemClass={itemClass}
                    />
                </Provider>
            </div>
        )
    }
}

export default Transfer
