# Checkbox

<example />

## API

### Checkbox

| Property       | Type                                   | Default | Description                                  |
| -------------- | -------------------------------------- | ------- | -------------------------------------------- |
| checked        | boolean                                | -       | Checked is passed as a controlled component. |
| disabled       | boolean                                | false   | disable checkbox                             |
| onChange       | (value: any, checked: boolean) => void | -       | Checkbox change callback.                    |
| defaultChecked | boolean                                | -       | The default checked                          |
| indeterminate  | boolean                                | false   | The indeterminate checked state of checkbox  |

### Checkbox.Group

** Checkbox.Group common props **

| Property     | Type                                                 | Default | Description                                                                                                                        |
| ------------ | ---------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| defaultValue | FormatData[]                                         | []      | Initial value                                                                                                                      |
| disabled     | (data: CheckItemGroupBaseData) => boolean \| boolean | false   | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| onChange     | (value: CheckItemGroupBaseData[]) => void            | -       | The value is CheckItemGroupBaseData                                                                                                |
| value        | FormatData[]                                         | -       | In the Form, the value will be taken over by the form and the value will lose efficacy.                                            |

** Checkbox.Group props for using data **

| Property     | Type                                                         | Default                     | Description                                                                                                                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------ | --------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| data         | CheckItemGroupBaseData[]                                     | -                           | The data item                                                                                                                                                                                                                                                                                        |
| defaultValue | FormatData[]                                                 | []                          | Initial value                                                                                                                                                                                                                                                                                        |
| disabled     | (data: CheckItemGroupBaseData) => boolean \| boolean         | false                       | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true.                                                                                                                                                                   |
| format       | ((data: CheckItemGroupBaseData) => any)                      | string                      | d => d                                                                                                                                                                                                                                                                                               | format value |
| keygen       | ((data: CheckItemGroupBaseData) => string) \| string \| true | required                    | Key generator<br />When it is true, the data itself is used as the key equivalent to (d => d)<br />When it is a function, use its return value.<br />When it is a string，ues the value of the string.For example, 'id' is the same thing as (d) => d.id.                                            |
| onChange     | (value: FormatData[]) => void                                | -                           | value is datum.getValue()                                                                                                                                                                                                                                                                            |
| prediction   | (value: FormatData, data: FormatData) => boolean             | (val, d) => val===format(d) | By default, the result of the format function is used to compare whether it matches. In some cases (for example, whe an object that returns the original data is updated, an different option with the same value is generated), the prediction function needs to be used to determine whether match |
| renderItem   | (data: CheckItemGroupBaseData) => ReactNode \| string        | required                    | When it is a string, return d\[string]<br />When it is a function, return the result of the function.                                                                                                                                                                                                |
| value        | FormatData[]                                                 | -                           | In the Form, the value will be taken over by the form and the value will lose efficacy.                                                                                                                                                                                                              |
| renderItem   | (data: CheckItemGroupBaseData) => ReactNode \| string        | required                    | When it is a string, return d\[string]<br />When it is a function, return the result of the function.                                                                                                                                                                                                |

** Checkbox Type **

```typescript
export type CheckItemGroupBaseData = Record<string, any> | string | number
```
