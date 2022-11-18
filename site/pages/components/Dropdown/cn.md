# Dropdown _下拉菜单_

<example />

## API

### Dropdown

| 属性        | 类型                                  | 默认值    | 说明                                                                                                                                |
| ----------- | ------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| className   | string                                | -         | 扩展 className                                                                                                                      |
| columns     | number                                | -         | 页面多元素展示,此属性需要依赖 width 属性,请合理的设置列数和宽度                                                                     |
| data        | object[]                              | 必填      | 下拉数据，详见 data                                                                                                                 |
| disabled    | boolean                               | false     | 禁用                                                                                                                                |
| onClick     | (data: object) => void                | -         | 点击事件。参数为渲染的数据, <br /> 注: 如果数据内设置了 onClick，会忽略此方法，调用 data.onClick                                    |
| placeholder | string \| ReactNode                   | 必填      | 按钮显示内容                                                                                                                        |
| renderItem  | (data: object) => ReactNode \| string | 'content' | 设置显示的内容,如果是字符串,则为对应的值<br />如果是函数,则返回值为显示的内容,参数为当条数据                                        |
| buttonProps | ButtonProps                           | -         | 同 [Button](/components/Button)                                                                                                     |
| trigger     | 'click' \| 'hover'                    | 'click'   | 触发方式                                                                                                                            |
| width       | number                                | -         | 弹出选项层的宽度                                                                                                                    |
| animation   | boolean                               | true      | 是否开启动画                                                                                                                        |
| position    | string                                | 'auto'    | 位置，可选值:'right-top'\|'bottom-left'\|'bottom-right'\|'left-top'\|'right-bottom'\|'top-left'\|'top-right'\|'left-bottom'\|'auto' |
| showCaret   | boolean                               | true      | 是否显示箭头                                                                                                                        |

### DropdownData

| 属性     | 类型              | 默认值 | 说明                    |
| -------- | ----------------- | ------ | ----------------------- |
| content  | string \| element | -      | 默认从 content 获取内容 |
| key      | string \| number  | -      | 唯一键                  |
| disabled | boolean           | false  | 是否禁用                |
