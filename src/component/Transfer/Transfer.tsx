import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import { transferClass } from '@/styles'
import useListDatum from '@/utils/Datum/useListDatum'
import { isArray } from '@/utils/is'
import { getKey } from '@/utils/uid'
import classnames from 'classnames'
import React, { useMemo } from 'react'
import Card from './Card'
import { Provider } from './context'
import OperationButtons from './OperationButtons'
import { TransferBaseData, TransferProps } from './type'

function Transfer<Data extends TransferBaseData, FormatData extends TransferBaseData = Data>(
    props: TransferProps<Data, FormatData>
) {
    const {
        className,
        style,
        itemClass,
        titles = [],
        renderItem = (d) => d,
        footers = [],
        listClassName,
        listStyle,
        onFilter,
        empty,
        onSearch,
        lineHeight = 32,
        listHeight = 180,
        renderFilter,
        children,
        operations = [null, null],
        data = [],
        operationIcon = true,
        defaultSelectedKeys,
        loading,
        keygen,
        onSelectChange,
        onChange,
    } = props
    const { add, remove, values, check, getDataByValue, disabled } = useListDatum({
        value: props.value,
        defaultValue: props.defaultValue,
        prediction: props.prediction,
        format: props.format,
        disabled: props.disabled,
        onChange,
    })
    const splitSelectedKeys = useRefMethod((keys) => {
        if (!keys) return undefined

        const left = []
        const right = []

        keys.forEach((selectedKey) => {
            const v = data.find((item, index) => getKey(item, keygen, index) === selectedKey)

            if (v) {
                if (check(v)) right.push(selectedKey)
                else left.push(selectedKey)
            }
        })

        return [left, right]
    })

    const [selectedKeys, updateSelectedKeys] = useMergedValue({
        defaultStateValue: [[], []],
        options: {
            defaultValue: splitSelectedKeys(defaultSelectedKeys),
            value: splitSelectedKeys(props.selectedKeys),
        },
    })

    const handleSelectedChange = useRefMethod((index: number, value) => {
        const nextSelectedKeys = index ? [selectedKeys[0], value] : [value, selectedKeys[1]]

        if (onSelectChange) onSelectChange(nextSelectedKeys[0], nextSelectedKeys[1])

        updateSelectedKeys(nextSelectedKeys)
    })

    const getLoading = useRefMethod((index: number) => {
        if (isArray(loading)) {
            return loading[index]
        }

        return loading
    })

    const sources = useMemo(() => data.filter((item) => !check(item)), [data, values])
    const targets = useMemo(
        () =>
            values.reduce((accumulatedValue, currentValue) => {
                const item = getDataByValue(data, currentValue)

                if (item) {
                    accumulatedValue.push(item.data)
                }

                return accumulatedValue
            }, []),
        [values, data]
    )

    return (
        <div className={classnames(transferClass('_'), className)} style={style}>
            <Provider value={{ selectedKeys, setSelectedKeys: handleSelectedChange }}>
                <Card
                    title={titles[0]}
                    selectedKeys={selectedKeys[0]}
                    data={sources}
                    keygen={keygen}
                    renderItem={renderItem}
                    onSelectedKeysChange={handleSelectedChange}
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
                    renderFilter={renderFilter}
                    customRender={children}
                    values={values}
                    itemClass={itemClass}
                />
                <OperationButtons
                    keygen={keygen}
                    operations={operations}
                    operationIcon={operationIcon}
                    data={data}
                    disabled={disabled}
                    add={add}
                    remove={remove}
                />
                <Card
                    title={titles[1]}
                    selectedKeys={selectedKeys[1]}
                    data={targets}
                    keygen={keygen}
                    renderItem={renderItem}
                    loading={getLoading(1)}
                    onSelectedKeysChange={handleSelectedChange}
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
                    renderFilter={renderFilter}
                    customRender={children}
                    values={values}
                    itemClass={itemClass}
                />
            </Provider>
        </div>
    )
}

export default React.memo(Transfer) as typeof Transfer
