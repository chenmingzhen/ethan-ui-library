# Rate _评分_

<example />

## API

### Rate

| 属性         | 类型             | 默认值 | 说明                                             |
| ------------ | ---------------- | ------ | ------------------------------------------------ |
| defaultValue | number           |   -     | 默认值                                           |
| disabled     | bool             | false  | 是否只读                                         |
| max          | number           | 5      | 选项最大值，整数                                 |
| onChange     | (value: number) => void      |    -    | 值改变回调函数                                   |
| repeat       | bool             | true   | 为 true 时，显示的选项为当前分值对应选项的复制   |
| size         | number \| string | 20     | 图标大小                                         |
| value        | number           | 0      | 作为可输入组件时，为整数。只读展示时，可以带小数 |
| clearable    | bool             | false  | 是否允许再次点击后清除                           |
| allowHalf    | bool             | false  | 是否允许半选                                     |
