# EditableArea _可编辑域_

通常用于点击即可修改的文本,失去焦点就保存

<example />

## API

| 属性              | 类型                    | 默认值 | 说明                                                                |
| ----------------- | ----------------------- | ------ | ------------------------------------------------------------------- |
| defaultValue      | string                  | -      | 设置初始值                                                          |
| value             | string                  | -      | 受控时，传入的 value                                                |
| className         | string                  | -      | 扩展外层 className                                                  |
| onChange          | (value: string) => void | -      | 值改变时的回调函数，和 value 一起设置时使组件受控                   |
| style             | object                  | -      | 组件最外层的扩展样式                                                |
| border            | boolean                 | false  | 是否显示外边框                                                      |
| disabled          | boolean                 | false  | 是否禁用                                                            |
| clearable         | boolean                 | true   | 是否展示清除按钮                                                    |
| placeholder       | string                  | -      | 同原生 textarea 标签的 placeholder                                  |
| trim              | boolean                 | false  | trim 为 true 时，失去焦点时会自动删除空白字符                       |
| onBlur            | (e: MouseEvent) => void | -      | 失去焦点事件                                                        |
| onFocus           | (e: MouseEvent) => void | -      | 聚焦事件                                                            |
| maxHeight         | number \| string        | -      | 输入框的最大高度, 超过之后会出现滚动条                              |
| getPopupContainer | () => HTMLElement       | -      | 自定义 Popover 容器，覆盖默认渲染在 body 下的行为, () => DOMElement |
| width             | number \| string        | -      | 编辑域宽度                                                          |
