# Checkbox _复选框_

Checkbox 可以单独使用。一组 Checkbox 使用时，使用一个 Array 类型的属性 data 来控制选项。

<example />

## API

### Checkbox

| 属性           | 类型                       | 默认值 | 说明                                    |
| -------------- | -------------------------- | ------ | --------------------------------------- |
| checked        | boolean                    | false  | checked 传入时为受控组件                |
| disabled       | boolean                    | false  | 是否禁用                                |
| onChange       | (checked: boolean) => void | -      | Checkbox 变化回调                       |
| defaultChecked | boolean                    |        | 默认值                                  |
| indeterminate  | boolean                    | false  | 设置 indeterminate 状态，只负责样式控制 |

### Checkbox.Group

**_Checkbox.Group 使用 data 会比直接使用 children 性能更好_**

** Checkbox.Group 通用 Props **

| 属性         | 类型                                                 | 默认值 | 说明                                                                                |
| ------------ | ---------------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| defaultValue | FormatData[]                                         |        | 初始值                                                                              |
| disabled     | (data: CheckItemGroupBaseData) => boolean \| boolean | false  | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |
| onChange     | (value: CheckItemGroupBaseData[]) => void            | -      | value 为 FormatData                                                                 |
| value        | FormatData[]                                         |        | 在 Form 中，value 会被表单接管，value 无效                                          |

** Checkbox.Group 中使用 data 时的 Props **

| 属性         | 类型                                                         | 默认值                      | 说明                                                                                                                                                                                          |
| ------------ | ------------------------------------------------------------ | --------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| data         | CheckItemGroupBaseData[]                                     | -                           | 数据项                                                                                                                                                                                        |
| defaultValue | FormatData[]                                                 |                             | 初始值                                                                                                                                                                                        |
| disabled     | (data: CheckItemGroupBaseData) => boolean \| boolean         | false                       | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项                                                                                                           |
| format       | (data: CheckItemGroupBaseData) => any \| string              | d => d                      | 格式化 value<br />默认值，返回原始数据<br />为 string 时，会作为 key 从原始数据中获取值，相当于 (d) => d[format]<br /> 为函数时，以函数返回结果作为 value                                     |
| keygen       | ((data: CheckItemGroupBaseData) => string) \| string \| true | 必填                        | 生成每一项 key 的辅助方法<br />为 true 时，以数据项本身作为 key，相当于 (d => d)<br />为函数时，使用此函数返回值<br />为 string 时，使用这个 string 对应的数据值。如 'id'，相当于 (d => d.id) |
| onChange     | (value: FormatData[]) => void                                | -                           | value 为 datum.getValue()                                                                                                                                                                     |
| prediction   | (value: FormatData, data: FormatData) => boolean             | (val, d) => val===format(d) | 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配                |
| renderItem   | (data: CheckItemGroupBaseData) => ReactNode \| string        | 必填                        | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果                                                                                                                               |

** Checkbox 类型说明 **

```typescript
export type CheckItemGroupBaseData = Record<string, any> | string | number
```
