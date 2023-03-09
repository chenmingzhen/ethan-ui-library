import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { transferClass } from '@/styles'
import { isArray, isObject } from '@/utils/is'
import classnames from 'classnames'
import React, { useMemo } from 'react'
import Card from './Card'
import useCacheDataMapping from './hooks/useCacheDataMapping'
import useTransferDatum from './hooks/useTransferDatum'
import OperationButtons from './OperationButtons'
import { TransferProps, TransferData, TransferDataValueType } from './type'

function Transfer<Data = TransferData>(props: TransferProps<Data>) {
    const {
        className,
        style,
        itemClass,
        titles = [],
        renderItem,
        footers = [],
        listClassName,
        listStyle,
        onFilter,
        empty,
        onSearch,
        lineHeight = 32,
        listHeight = 180,
        operations = [null, null],
        data = [],
        operationIcon = true,
        defaultSelectedKeys,
        loading,
        onSelectChange,
        onChange,
        labelKey = 'label',
        valueKey = 'value',
        defaultValue,
        oneWay,
    } = props

    const { getCheckedStateByDataItem, values, disabled, addByDataItems, removeByDataItems } = useTransferDatum({
        onChange,
        value: props.value,
        disabled: props.disabled,
        defaultValue,
        valueKey,
    })
    const getKey = useRefMethod((dataItem: TransferData, index: number) =>
        isObject(dataItem) ? (isObject(dataItem[valueKey]) ? index : dataItem[valueKey]) : dataItem
    )

    const getContent = useRefMethod((dataItem: Data, index: number) => {
        if (renderItem) {
            return renderItem(dataItem, index)
        }

        return isObject(dataItem) ? dataItem[labelKey] : dataItem
    })
    const splitSelectedKeys = useRefMethod((keys: TransferDataValueType[]) => {
        if (!keys) return undefined

        const sources: TransferDataValueType[] = []
        const targets: TransferDataValueType[] = []

        keys.forEach((selectedKey) => {
            const dataItem = data.find((item, index) => getKey(item, index) === selectedKey)
            if (!dataItem) return

            if (getCheckedStateByDataItem(dataItem)) targets.push(selectedKey)
            else sources.push(selectedKey)
        })

        return [sources, targets]
    })
    const cachePropSelectedKeys = useMemo(() => splitSelectedKeys(props.selectedKeys), [props.selectedKeys])
    const cachePropsDefaultSelectedKeys = useMemo(() => splitSelectedKeys(defaultSelectedKeys), [])

    const [selectedKeys, updateSelectedKeys] = useMergedValue({
        defaultStateValue: [[], []],
        options: {
            defaultValue: cachePropsDefaultSelectedKeys,
            value: cachePropSelectedKeys,
        },
    })

    const cacheDataMapping = useCacheDataMapping(data, getKey)

    const handleSelectedKeyChange = useRefMethod((index: number, value: TransferDataValueType[]) => {
        const nextSelectedKeys = index ? [selectedKeys[0], value] : [value, selectedKeys[1]]
        if (onSelectChange) onSelectChange(nextSelectedKeys[0], nextSelectedKeys[1])

        updateSelectedKeys(nextSelectedKeys)
    })

    const getLoading = useRefMethod((index: number) => (isArray(loading) ? loading[index] : loading))

    const sources = useMemo(() => data.filter((dataItem) => !getCheckedStateByDataItem(dataItem)), [data, values])
    const targets = useMemo(
        () =>
            values.reduce<TransferData[]>((accumulatedValue, currentValue) => {
                const dataItem = cacheDataMapping.get(currentValue)

                if (dataItem) {
                    accumulatedValue.push(dataItem)
                }

                return accumulatedValue
            }, []),
        [values, cacheDataMapping]
    )

    return (
        <div className={classnames(transferClass('_', oneWay && 'oneWay'), className)} style={style}>
            <Card
                title={titles[0]}
                sideSelectedKeys={selectedKeys[0]}
                data={sources}
                index={0}
                footer={footers[0]}
                listClassName={listClassName}
                listStyle={listStyle}
                loading={getLoading(0)}
                onFilter={onFilter}
                empty={empty}
                disabled={disabled}
                onSearch={onSearch}
                lineHeight={lineHeight}
                listHeight={listHeight}
                itemClass={itemClass}
                isDisabledAll={props.disabled === true}
                getContent={getContent}
                getKey={getKey}
                onSelectedKeyChange={handleSelectedKeyChange}
                oneWay={oneWay}
            />
            <OperationButtons
                operations={operations}
                operationIcon={operationIcon}
                isDisabledAll={props.disabled === true}
                addByDataItems={addByDataItems}
                removeByDataItems={removeByDataItems}
                selectedKeys={selectedKeys}
                onSelectedKeyChange={handleSelectedKeyChange}
                cacheDataMapping={cacheDataMapping}
                disabled={disabled}
                oneWay={oneWay}
            />
            <Card
                title={titles[1]}
                sideSelectedKeys={selectedKeys[1]}
                data={targets}
                loading={getLoading(1)}
                index={1}
                footer={footers[1]}
                listClassName={listClassName}
                listStyle={listStyle}
                onFilter={onFilter}
                empty={empty}
                disabled={disabled}
                onSearch={onSearch}
                lineHeight={lineHeight}
                listHeight={listHeight}
                itemClass={itemClass}
                isDisabledAll={props.disabled === true}
                getContent={getContent}
                getKey={getKey}
                onSelectedKeyChange={handleSelectedKeyChange}
                oneWay={oneWay}
                removeByDataItems={oneWay ? removeByDataItems : undefined}
            />
        </div>
    )
}

export default React.memo(Transfer) as typeof Transfer
