# Input _输入框_

<example />

## API

| 属性         | 类型                                  | 默认值    | 说明                                                                                                             |
| ------------ | ------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------- |
| defaultValue | string \| number                      | -         | 默认值                                                                                                           |
| name         | string                                | -         | Form 存取数据的名称                                                                                              |
| onChange     | (value: string) => void               | -         | 值改变回调函数                                                                                                   |
| onEnterPress | (value: string) => void               | -         | 回车键回调函数                                                                                                   |
| placeholder  | string                                | -         | 同原生 input 标签的 placeholder                                                                                  |
| size         | 'large' \| 'default' \| 'small'       | 'default' | 尺寸                                                                                                             |
| style        | object                                | -         | 最外层扩展样式                                                                                                   |
| tip          | ReactNode \|(value:string)=>ReactNode | -         | 提示信息                                                                                                         |
| trim         | boolean                               | false     | trim 为 true 时，失去焦点时会自动删除空白字符。                                                                  |
| type         | string                                | 'text'    | 同原生 input 标签的 type                                                                                         |
| value        | string \| number                      | -         | defaultValue 和 value 可以同时设置，defaultValue 会被 value 覆盖<br />在 Form 中，value 会被表单接管，value 无效 |
| clearable    | () => void \| boolean                 | -         | 可点击清空图标删除输入框内容，为函数式表示清空回调                                                               |
| info         | (value: string) => string \| number   | -         | 提示信息                                                                                                         |
| popoverProps | object                                | -         | 校验弹框接受的属性，具体属性参考 Popover 组件说明                                                                |
| maxLength    | number                                | -         | 可输入最大长度                                                                                                   |
| prefix       | ReactNode                             | -         | 带有前缀图标的 input                                                                                             |
| suffix       | ReactNode                             | -         | 带有后缀图标的 input                                                                                             |

### Input.Number

基本 API 和上表相同，特定的 API 如下：

| 属性      | 类型                    | 默认值 | 说明                   |
| --------- | ----------------------- | ------ | ---------------------- |
| max       | number                  | -      | 最大值                 |
| min       | number                  | -      | 最小值                 |
| step      | number                  | 1      | 改变数字跨度，可为小数 |
| digits    | number                  | -      | 数值的精度             |
| allowNull | boolean                 | false  | 允许空值               |
| hideArrow | boolean                 | false  | 是否展示增减按钮       |
| onChange  | (value: number) => void | -      | 值改变回调函数         |
| onInput   | (value: string) => void | -      | 输入框改变时回调函数   |
