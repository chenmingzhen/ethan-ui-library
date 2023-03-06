import React from 'react'
import classnames from 'classnames'
import { checkInputClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { isObject } from '@/utils/is'
import Radio from './Radio'
import { Provider } from './context'
import { RadioData, RadioDataValueType, RadioGroupProps } from './type'
import useRadioGroupValue from './hooks/useRadioGroupValue'

function Group<Data = RadioData>(props: RadioGroupProps<Data>) {
    const {
        data,
        children,
        defaultValue,
        onChange,
        value,
        block,
        button,
        size,
        renderItem,
        labelKey = 'label',
        valueKey = 'value',
    } = props

    const { disabled, setByDataItem, setByDateValue, getCheckedStateByDataItem, getCheckedStateByDataValue } =
        useRadioGroupValue({
            onChange,
            defaultValue,
            value,
            disabled: props.disabled,
            valueKey,
        })
    const className = classnames(
        checkInputClass(
            'group',
            block && 'block',
            button && 'button',
            button === 'outline' && 'outline',
            button && size
        ),
        props.className
    )

    const handleRadioGroupItemChange = useRefMethod((changedValue: RadioDataValueType) => {
        setByDateValue(changedValue)
    })

    const handleChange = useRefMethod((_, index: number) => {
        setByDataItem(data[index])
    })

    if (data === undefined) {
        return (
            <div className={className}>
                <Provider
                    value={{ onRadioGroupItemChange: handleRadioGroupItemChange, checked: getCheckedStateByDataValue }}
                >
                    {children}
                </Provider>
            </div>
        )
    }

    function getKey(dataItem: RadioData, index: number) {
        return isObject(dataItem) ? (isObject(dataItem[valueKey]) ? index : dataItem[valueKey]) : dataItem
    }

    function getContent(dataItem: Data, index: number) {
        if (renderItem) {
            return renderItem(dataItem, index)
        }

        return isObject(dataItem) ? dataItem[labelKey] : dataItem
    }

    if (data) {
        return (
            <div className={className}>
                {data.map((dataItem, i) => (
                    <Radio
                        checked={getCheckedStateByDataItem(dataItem)}
                        disabled={disabled(dataItem)}
                        key={getKey(dataItem, i)}
                        onChange={handleChange}
                        index={i}
                    >
                        {getContent(dataItem, i)}
                    </Radio>
                ))}
                {children}
            </div>
        )
    }

    return null
}

export default React.memo(Group)
