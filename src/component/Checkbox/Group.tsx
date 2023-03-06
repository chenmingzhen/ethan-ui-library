import React from 'react'
import classnames from 'classnames'
import { checkInputClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import { isObject } from '@/utils/is'
import Checkbox from './Checkbox'
import { Provider } from './context'
import { CheckboxData, CheckboxDataValueType, CheckboxGroupProps } from './type'
import useCheckboxGroupValues from './hooks/useCheckboxGroupValues'

function Group<Data = CheckboxData>(props: CheckboxGroupProps<Data>) {
    const {
        block,
        data,
        children,
        defaultValue,
        value,
        labelKey = 'label',
        valueKey = 'value',
        renderItem,
        onChange,
    } = props

    const {
        getCheckedStateByDataItem,
        getCheckedStateByValue,
        addByDataItem,
        removeByDataItem,
        disabled,
        addByDataValue,
        removeByDataValue,
    } = useCheckboxGroupValues({
        defaultValue,
        value,
        disabled: props.disabled,
        valueKey,
        onChange,
    })
    const className = classnames(checkInputClass('group', block && 'block'), props.className)

    const handleCheckboxGroupItemChange = useRefMethod((changedValue: CheckboxDataValueType, checked) => {
        if (checked) {
            addByDataValue(changedValue)
        } else {
            removeByDataValue(changedValue)
        }
    })

    const handleClick = useRefMethod((checked: boolean, index: number) => {
        if (checked) {
            addByDataItem(data[index])
        } else {
            removeByDataItem(data[index])
        }
    })

    /** 通过wrapChildren的形式 */
    if (data === undefined) {
        return (
            <div className={className}>
                <Provider
                    value={{
                        onCheckboxGroupItemChange: handleCheckboxGroupItemChange,
                        checked: getCheckedStateByValue,
                    }}
                >
                    {children}
                </Provider>
            </div>
        )
    }

    function getKey(dataItem: CheckboxData, index: number) {
        return isObject(dataItem) ? (isObject(dataItem[valueKey]) ? index : dataItem[valueKey]) : dataItem
    }

    function getContent(dataItem: Data, index: number) {
        if (renderItem) {
            return renderItem(dataItem, index)
        }

        return isObject(dataItem) ? dataItem[labelKey] : dataItem
    }

    /** 通过data的形式 */
    if (data) {
        return (
            <div className={className}>
                {data.map((dataItem, i) => (
                    <Checkbox
                        checked={getCheckedStateByDataItem(dataItem)}
                        disabled={disabled(dataItem)}
                        key={getKey(dataItem, i)}
                        onChange={handleClick}
                        index={i}
                    >
                        {getContent(dataItem, i)}
                    </Checkbox>
                ))}
            </div>
        )
    }

    return null
}

export default Group
