# Checkbox

<example />

## API

### Checkbox

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| checked | boolean \| 'indeterminate' | - | if not set, use (value === htmlValue). |
| disabled | boolean | false | disable checkbox |
| htmlValue | any | true | Specifies the result |
| name | string | - | The name of the Form which access data |
| onChange | (value: any, checked: boolean) => void | - | When selected, value is htmlValue and checked is true.<br />When not selected, value is undefined and checked is false. |
| value | any | - |  |

### Checkbox.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | any[] | required | The data item |
| datum | object | - | If the format and prediction does not satisfied your requirements, you can pass in a [Datum.List](/components/Datum.List) object or the Datum.List configuration to process data. |
| defaultValue | any[] | [] | Initial value |
| disabled | (data: any) => boolean \| boolean | false | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| format | ((data: any) => any) | string | d => d | format value |
| name | string | - | The name of the Form which access data |
| keygen | ((data: any) => string) \| string \| true | required | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id. |
| onChange | (value: any[]) => void  | - | value is datum.getValue() |
| prediction | (value: any, data: any) => boolean |  (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value  is generated), the prediction function needs to be used to determine whether match |
| renderItem | (data: any) => ReactNode \| string | required | When it is a string, return d\[string]<br />When it is a function, return the result of the function. |
| value | any[] | - | In the Form, the value will be taken over by the form and the value will lose efficacy. |
