# DatePicker

<example />

## API

### DatePicker

| Property           | Type                                                         | Default       | Description                                                                                                                     |
| ------------------ | ------------------------------------------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| clearable          | boolean                                                      | false         | whether it can be cleared                                                                                                       |
| disabled           | boolean \|(date:Date)=>boolean                               | false         | If disabled is true, disable all options. If disabled isa function, disable the options according to the result of the function |
| size               | 'small' \| 'large' \| 'default'                              | 'default'     | Input size                                                                                                                      |
| format             | string                                                       | -             | Date format                                                                                                                     |
| inputAble          | boolean                                                      | false         | Whether the input box can be inputed                                                                                            |
| placeholder        | ReactNode                                                    | -             | Input placeholder                                                                                                               |
| className          | string                                                       | -             | Input className                                                                                                                 |
| style              | CSSProperties                                                | -             | Input style                                                                                                                     |
| position           | 'left-bottom' \| 'left-top' \| 'right-bottom' \| 'right-top' | 'left-bottom' | Position where the drop-down box is displayed                                                                                   |
| defaultValue       | Date                                                         | -             | Default value                                                                                                                   |
| onChange           | (date:Date,dateString:string)=>void                          | -             | Callback when the date changes                                                                                                  |
| onBlur             | (e:React.FocusEven)=>void                                    | -             | Callback when lose focus                                                                                                        |
| onFocus            | (e:React.FocusEvent)=>void                                   | -             | Callback when focus                                                                                                             |
| type               | 'date' \| 'date-time' \| 'month' \| 'week' \| 'year'         | -             | Sets the selector type                                                                                                          |
| value              | Date                                                         | -             | Date                                                                                                                            |
| quickSelects       | QuickSelect<Date>[]                                          | -             | Quick selection                                                                                                                 |
| mix                | Date                                                         | -             | Optional minimum                                                                                                                |
| max                | Date                                                         | -             | Optional maximum                                                                                                                |
| defaultPickerValue | Date                                                         | -             | Default Panel Date                                                                                                              |
| border             | boolean                                                      | true          | Whether the input box has a border                                                                                              |

### RangePicker

**_The RangePicker Api contains all of DatePicker's properties, but note that some RangePicker properties become arrays_**

| Property           | Type                                  |
| ------------------ | ------------------------------------- |
| defaultValue       | Date[]                                |
| onChange           | (date:Date[],dateString:string)=>void |
| value              | Date[]                                |
| quickSelects       | QuickSelect<Date[]>[]                 |
| defaultPickerValue | Date[]                                |
