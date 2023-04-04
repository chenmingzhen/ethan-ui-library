# Tooltip _提示_

Tooltip 主要用来显示文字提示，如果需要显示更多内容，请使用 [Popover](/components/Popover)

<example />

## API

### Tooltip

| 属性              | 类型                                   | 默认值            | 说明                                                              |
| ----------------- | -------------------------------------- | ----------------- | ----------------------------------------------------------------- |
| animation         | boolean                                | true              | 弹出是否使用动画，默认为 true                                     |
| className         | string                                 | 无                | 扩展 className                                                    |
| children          | ReactNode                              | 必填              | 子元素只能为一个 ReactElement                                     |
| position          | 'left' \| 'top' \| 'right' \| 'bottom' | 'top'             | 弹出层位置                                                        |
| style             | object                                 | 无                | 最外层扩展样式                                                    |
| tip               | ReactNode                              | 必填              | 弹出文字                                                          |
| trigger           | 'hover' \|'mousedown'                  | "hover"           | 弹出方式                                                          |
| disabledChild     | boolean                                | false             | 使被禁用的元素正常显示提示                                        |
| getPopupContainer | ()=>HTMLElement                        | ()=>document.body | 浮层渲染父节点，默认渲染到 body 上,父节点需要为相对定位(relative) |

## 注意

请确保 Tooltip 的子元素能接受 onMouseEnter、onMouseLeave、onMouseDown 事件。
