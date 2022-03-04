import List from '@/utils/Datum/List'
import {
    CheckboxGroupProps,
    CheckboxProps,
    CheckItemGroupBaseData,
    CheckItemGroupDefaultDataRecord,
    CheckItemProps,
    CheckItemValue,
} from '../Checkbox/type'

export type RadioProps<V = any> = CheckboxProps<V>

export interface RadioGroupProps<
    Data extends CheckItemGroupBaseData = CheckItemGroupDefaultDataRecord,
    FormatData extends CheckItemGroupBaseData = Data
> extends Omit<CheckboxGroupProps<Data, FormatData>, 'defaultValue' | 'value' | 'onChange'> {
    button?: boolean | 'outline'

    size?: CheckItemProps['size']

    defaultValue?: CheckItemValue<Data, FormatData>

    value?: CheckItemValue<Data, FormatData>

    onChange?(items: FormatData, data: Data, checked: boolean): void

    /** Internal props */
    datum?: List<Data>
}

export interface RadioComponent<V = any> extends React.ComponentClass<RadioProps<V>> {
    Group<
        Data extends CheckItemGroupBaseData = CheckItemGroupDefaultDataRecord,
        FormatResult extends CheckItemGroupBaseData = Data
    >(
        props: RadioGroupProps<Data, FormatResult>
    ): React.ReactElement<RadioGroupProps<Data, FormatResult>, any>
}
