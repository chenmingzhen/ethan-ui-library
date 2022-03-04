# Checkbox

<example />

## API

### Checkbox

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| checked | boolean \| 'indeterminate' | - | Checked is passed as a controlled component. |
| disabled | boolean | false | disable checkbox |
| name | string | - | The name of the Form which access data |
| onChange | (value: any, checked: boolean) => void | - | Checkbox change callback. |
| defaultChecked | boolean | - | The default checked |

### Checkbox.Group

** Checkbox.Group common props ** 

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| defaultValue | CheckItemGroupBaseData[] | [] | Initial value |
| disabled | (data: CheckItemGroupBaseData) => boolean \| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| onChange | (value: CheckItemGroupBaseData[]) => void | - | The value is CheckItemGroupBaseData |
| value | any[] | - | In the Form, the value will be taken over by the form and the value will lose efficacy. |



** Checkbox.Group props for using data **

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | CheckItemGroupBaseData[] | - | The data item |
| defaultValue | CheckItemGroupBaseData[] | [] | Initial value |
| disabled | (data: CheckItemGroupBaseData) => boolean \| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| format | ((data: CheckItemGroupBaseData) => any) | string | d => d | format value |
| name | string | - | The name of the Form which access data |
| keygen | ((data: CheckItemGroupBaseData) => string) \| string \| true | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| onChange | (value: FormatData[]) => void  | - | value is datum.getValue() |
| prediction | (value: FormatData, data: FormatData) => boolean |  (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| renderItem | (data: CheckItemGroupBaseData) => ReactNode \| string | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| value | any[] | - | In the Form, the value will be taken over by the form and the value will lose efficacy. |
| renderItem | (data: any) => ReactNode \| string | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |


** Checkbox Type ** 

```typescript

export type CheckItemGroupDefaultDataRecord = { label: React.ReactNode; value: string | number }

export type CheckItemGroupBaseData = Record<string, any> | string | number


```