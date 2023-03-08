# Select _选择框_

<example />

## API

| 属性                | 类型                                                                    | 默认值     | 说明                                                                                |
| ------------------- | ----------------------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------- |
| width               | number                                                                  | -          | 宽度                                                                                |
| style               | object                                                                  | -          | 扩展外层 style                                                                      |
| portal              | boolean                                                                 | false      | 为 true 时，选项弹出层在 DOM 中独立 render                                          |
| autoAdapt           | boolean                                                                 | false      | 下拉列表宽度根据内容自由展开                                                        |
| clearable           | boolean                                                                 | false      | 是否可清除值                                                                        |
| multiple            | boolean                                                                 | false      | 是否是多选                                                                          |
| columns             | number                                                                  | 1          | columns 大于 1 时，选项展示为多列布局模式                                           |
| columnWidth         | number                                                                  | 160        | column 单列宽度，仅在 columns 大于 1 时有效                                         |
| data                | SelectData[]                                                            | 必填       | 数据项，单条数据作为 value 的数据必须是唯一的                                       |
| defaultValue        | SelectDataValueType[]                                                   |            | 初始值                                                                              |
| disabled            | (data: SelectData) => boolean \| boolean                                | false      | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |
| onChange            | (value: SelectDataValueType\|SelectDataValueType[]) => void             | -          | 值改变回调函数                                                                      |
| onFilter            | (text: string,data:SelectData) => boolean                               | -          | 过滤数据函数                                                                        |
| renderItem          | (data: SelectData) => ReactNode                                         | 必填       | 为 string 时，返回 d\[string]<br />为 function 时，返回函数结果                     |
| renderResult        | (data: SelectData) => ReactNode                                         | renderItem | 选中后在结果中显示的内容，默认和 renderItem 相同                                    |
| value               | SelectDataValueType \| SelectDataValueType[]                            |            | 在 Form 中，value 会被表单接管，value 无效                                          |
| compressed          | boolean                                                                 | false      | 将选中值合并，只在多选模式下有效                                                    |
| groupBy             | (item: SelectData, index: number, data: SelectData[]) => string\|number | -          | 分组                                                                                |
| showArrow           | boolean                                                                 | true       | 是否显示下拉箭头，仅针对单选情况                                                    |
| cacheAble           | boolean                                                                 | true       | 是否开启数据缓存，如果数据存在动态更新的情况建议开启                                |
| compressedClassName | string                                                                  | -          | 多选合并展示弹出框的类名                                                            |
| onCollapse          | (collapse: boolean) => void                                             | -          | 下拉列表展开/收起回调                                                               |
| resultClassName     | ((value: SelectDataValueType) => string) \| string                      | -          | 选中结果内容容器的 className                                                        |
| customRender        | object                                                                  | -          | 自定义渲染 header 和 footer                                                         |
| labelKey            | string                                                                  | 'label'    | 显示的字段                                                                          |
| valueKey            | string                                                                  | 'value'    | 值的字段                                                                            |
| createOption        | {onCreate?:(text:string)=>void,onCreateEnd?:(data:Data)=>void}          | -          | 创建模式的选项，onCreate 为输入时的回调，onCreateEnd 为创建完成的回调               |
