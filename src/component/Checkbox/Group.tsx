import React from 'react'
import classnames from 'classnames'
import { getKey } from '@/utils/uid'
import { checkInputClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import useListDatum from '@/utils/Datum/useListDatum'
import { isFunc, isString } from '@/utils/is'
import Checkbox from './Checkbox'
import { Provider } from './context'
import { CheckboxGroupProps, CheckItemGroupBaseData } from './type2'

function Group<Data extends CheckItemGroupBaseData, FormatData extends CheckItemGroupBaseData>(
    props: CheckboxGroupProps<Data, FormatData>
) {
    const {
        block,
        data,
        keygen,
        children,
        defaultValue,
        format,
        prediction,
        onChange,
        value,
        renderItem = (d) => d,
    } = props
    const { check, add, remove, disabled } = useListDatum({
        format,
        prediction,
        onChange,
        defaultValue,
        value,
        disabled: props.disabled,
    })
    const className = classnames(checkInputClass('group', block && 'block'), props.className)

    const handleCheckboxGroupItemChange = useRefMethod((changedValue, checked) => {
        if (checked) {
            add(changedValue)
        } else {
            remove(changedValue)
        }
    })

    const handleClick = useRefMethod((checked: boolean, index: number) => {
        if (checked) {
            add(data[index])
        } else {
            remove(data[index])
        }
    })

    const getContent = useRefMethod((item) => {
        if (isString(renderItem)) {
            return item[renderItem]
        }

        if (isFunc(renderItem)) {
            return renderItem(item)
        }

        return ''
    })

    /** 通过wrapperChildren的形式 */
    if (data === undefined) {
        return (
            <div className={className}>
                <Provider value={{ onCheckboxGroupItemChange: handleCheckboxGroupItemChange, checked: check }}>
                    {children}
                </Provider>
            </div>
        )
    }

    /** 通过data的形式 */
    if (data) {
        return (
            <div className={className}>
                {data.map((d, i) => (
                    <Checkbox
                        checked={check(d)}
                        disabled={disabled(d)}
                        key={getKey(d, keygen, i)}
                        onChange={handleClick}
                        index={i}
                    >
                        {getContent(d)}
                    </Checkbox>
                ))}
                {children}
            </div>
        )
    }

    return null
}

export default Group
