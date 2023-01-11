import React from 'react'
import classnames from 'classnames'
import { getKey } from '@/utils/uid'
import { checkInputClass } from '@/styles'
import useRefMethod from '@/hooks/useRefMethod'
import useListDatum from '@/utils/Datum/useListDatum'
import { isFunc, isString } from '@/utils/is'
import Radio from './Radio'
import { Provider } from './context'
import { RadioGroupProps, RadioGroupBaseData } from './type'

function Group<Data extends RadioGroupBaseData, FormatData extends RadioGroupBaseData>(
    props: RadioGroupProps<Data, FormatData>
) {
    const {
        data,
        keygen,
        children,
        defaultValue,
        format,
        prediction,
        onChange,
        value,
        renderItem = (d) => d,
        block,
        button,
        size,
    } = props
    const { check, set, disabled } = useListDatum({
        format,
        prediction,
        onChange,
        defaultValue,
        value,
        disabled: props.disabled,
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

    const handleRadioGroupItemChange = useRefMethod((changedValue, checked) => {
        set(checked ? changedValue : [])
    })

    const handleClick = useRefMethod((checked: boolean, index: number) => {
        set(checked ? data[index] : [])
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

    if (data === undefined) {
        return (
            <div className={className}>
                <Provider value={{ onRadioGroupItemChange: handleRadioGroupItemChange, checked: check }}>
                    {children}
                </Provider>
            </div>
        )
    }

    if (data) {
        return (
            <div className={className}>
                {data.map((d, i) => (
                    <Radio
                        checked={check(d)}
                        disabled={disabled(d)}
                        key={getKey(d, keygen, i)}
                        onChange={handleClick}
                        index={i}
                    >
                        {getContent(d)}
                    </Radio>
                ))}
                {children}
            </div>
        )
    }

    return null
}

export default React.memo(Group)
