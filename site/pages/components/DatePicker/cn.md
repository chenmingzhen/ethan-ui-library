# DatePicker _日期选择框_

<example />

## API

### DatePicker

| 属性               | 类型                                                         | 默认值        | 说明                                                                                |
| ------------------ | ------------------------------------------------------------ | ------------- | ----------------------------------------------------------------------------------- |
| clearable          | boolean                                                      | false         | 是否可清空                                                                          |
| disabled           | boolean \|(date:Date)=>boolean                               | false         | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数返回结果禁用选项 |
| size               | 'small' \| 'large' \| 'default'                              | 'default'     | 大小                                                                                |
| format             | string                                                       | -             | 设置日期格式                                                                        |
| inputAble          | boolean                                                      | false         | 是否可输入                                                                          |
| placeholder        | ReactNode                                                    | -             | 输入框提示文字                                                                      |
| className          | string                                                       | -             | 输入框样式名                                                                        |
| style              | CSSProperties                                                | -             | 输入框的样式                                                                        |
| position           | 'left-bottom' \| 'left-top' \| 'right-bottom' \| 'right-top' | 'left-bottom' | 下拉框弹出位置                                                                      |
| portal             | boolean                                                      | false         | 是否在 body 中弹出下拉框                                                            |
| defaultValue       | Date                                                         | -             | 默认日期                                                                            |
| onChange           | (date:Date,dateString:string)=>void                          | -             | 日期改变时回调                                                                      |
| onBlur             | (e:React.FocusEven)=>void                                    | -             | 失去焦点时回调                                                                      |
| onFocus            | (e:React.FocusEvent)=>void                                   | -             | 获取焦点时回调                                                                      |
| type               | 'date' \| 'date-time' \| 'month' \| 'week' \| 'year'         | -             | 设置选择器类型                                                                      |
| value              | Date                                                         | -             | 日期                                                                                |
| quickSelects       | QuickSelect<Date>[]                                          | -             | 快捷选择                                                                            |
| mix                | Date                                                         | -             | 可选最小值                                                                          |
| max                | Date                                                         | -             | 可选最大值                                                                          |
| defaultPickerValue | Date                                                         | -             | 默认面板日期                                                                        |
| border             | boolean                                                      | true          | 输入框是否有边框                                                                    |

### RangePicker

**_RangePicker 的 Api 包含 DatePicker 所有的属性，但是注意 RangePicker 部分属性会变为数组的形式_**

| 属性               | 类型                                  |
| ------------------ | ------------------------------------- |
| defaultValue       | Date[]                                |
| onChange           | (date:Date[],dateString:string)=>void |
| value              | Date[]                                |
| quickSelects       | QuickSelect<Date[]>[]                 |
| defaultPickerValue | Date[]                                |
