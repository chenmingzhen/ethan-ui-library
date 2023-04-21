# Select

<example />

## API

| Property            | Type                                                                     | Default    | Description                                                                                                                        |
| ------------------- | ------------------------------------------------------------------------ | ---------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| width               | number                                                                   | null       | width                                                                                                                              |
| style               | object                                                                   | null       | expand style                                                                                                                       |
| getPopupElement     | ()=>HTMLElement                                                          | -          | The option popup layer is rendered in the specified DOM, and the containers need to be positioned relative to each other           |
| autoAdapt           | boolean                                                                  | false      | option list is auto adapt                                                                                                          |
| clearable           | boolean                                                                  | false      | If clearable is true, show clear value icon                                                                                        |
| multiple            | boolean                                                                  | false      | if it is true, it will be multiple selection                                                                                       |
| columns             | number                                                                   | 1          | Option columns.                                                                                                                    |
| columnWidth         | number                                                                   | 160        | Option column width, only effective when columns > 1                                                                               |
| data                | SelectData[]                                                             | required   | Options data                                                                                                                       |
| defaultValue        | SelectDataValueType[]                                                    |            | Initial value                                                                                                                      |
| disabled            | (data: SelectData) => boolean \| boolean                                 | false      | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns true. |
| onChange            | (value: SelectDataValueType\|SelectDataValueType[]) => void              | -          | The callback function when the value is changing().                                                                                |
| onFilter            | (text: string,data:SelectData) => boolean                                | -          | When the onFilter is not empty, you can filter data by input.                                                                      |
| renderItem          | (data: SelectData) => ReactNode                                          | required   | When it is a string, return d\[string]<br />When it is a function, return the result of the function.                              |
| renderResult        | (data: SelectData) => ReactNode                                          | renderItem | The content displayed in the result after selecting, if not set, use renderItem                                                    |
| value               | SelectDataValueType \|SelectDataValueType[]                              |            | In the Form, the value will be taken over by the form and the value will be invalid.                                               |
| compressed          | boolean                                                                  | false      | Merges selected values, valid only in multiselect mode                                                                             |
| groupBy             | (item: SelectData, index: number, data: SelectData[]) => string \|number | -          | group by                                                                                                                           |
| cacheAble           | boolean                                                                  | false      | data cache, if data change asynchronously, better set true                                                                         |
| compressedClassName | string                                                                   | none       | compressed popover classname                                                                                                       |
| onCollapse          | (collapse: boolean) => void                                              | none       | option list collapse callback                                                                                                      |
| resultClassName     | ((value: SelectDataValueType) => string) \| string                       | none       | The className of the selected result content container                                                                             |
| customRender        | object                                                                   | -          | Custom render header and footer                                                                                                    |
| labelKey            | string                                                                   | 'label'    | Label field                                                                                                                        |
| valueKey            | string                                                                   | 'value'    | Value field                                                                                                                        |
| createOption        | {onCreate?:(text:string)=>void,onCreateEnd?:(data:Data)=>void}           | -          | Options for creating a pattern, onCreate is the callback upon input and onCreateEnd is the callback upon creation                  |

                                                              |
