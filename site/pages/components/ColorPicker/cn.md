# ColorPicker _颜色选择器_

<example />

## API

### ColorPicker

| 属性          | 类型                                                         | 默认值        | 说明                     |
| ------------- | ------------------------------------------------------------ | ------------- | ------------------------ |
| value         | string                                                       | -             | 选中的颜色               |
| disabled      | boolean                                                      | false         | 是否禁止                 |
| size          | 'small' \| 'large' \| 'default'                              | 'default'     | 大小                     |
| mode          | 'rgba' \| 'hex' \| 'hsla'                                    | 'rgba'        | 颜色展示模式             |
| defaultColors | string[]                                                     | []            | 自定义颜色盘             |
| style         | React.CSSProperties                                          | -             | 输入框样式               |
| className     | string                                                       | -             | 输入框样式名             |
| position      | 'left-bottom' \| 'left-top' \| 'right-bottom' \| 'right-top' | 'left-bottom' | 下拉框弹出位置           |
| absolute      | boolean                                                      | true          | 是否在 body 中弹出下拉框 |
| defaultValue  | string                                                       | -             | 默认选中的颜色           |
| onChange      | (color:string)=>void                                         | -             | 颜色改变时回调           |

### ColorPicker.ColorBoard

**_ColorPicker.ColorBoard 与 ColorPicker 保持一致的 props，但是不包含 position,size _**
