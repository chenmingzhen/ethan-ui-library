# Popover _气泡_

<example />

## API

### Popover

| 属性               | 类型                                                                                                                                                                   | 默认值     | 说明                                                                                          |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------- | --------------------------------------------------------------------------------------------- |
| visible            | boolean                                                                                                                                                                | 无         | 是否显示(受控)                                                                                |
| onVisibleChange    | (visible: boolean) => void                                                                                                                                             | 无         | 显示隐藏改变时事件                                                                            |
| mouseEnterDelay    | number                                                                                                                                                                 | 0.15       | 移入显示延迟(毫秒)                                                                            |
| mouseLeaveDelay    | number                                                                                                                                                                 | 0.15       | 移除隐藏延迟(毫秒)                                                                            |
| className          | string                                                                                                                                                                 | 无         | 扩展 className                                                                                |
| children           | ReactNode                                                                                                                                                              | 必填       | 弹出显示内容                                                                                  |
| position           | 'top-left' \| 'top' \| 'top-right' \| 'left-top' \| 'left' \| 'left-bottom' \| 'right-top' \| 'right' \| 'right-bottom' \| 'bottom-left' \| 'bottom' \| 'bottom-right' | 'top'      | 弹出层位置                                                                                    |
| style              | object                                                                                                                                                                 | 无         | 最外层扩展样式                                                                                |
| trigger            | 'click' \| 'hover'\|[]                                                                                                                                                 | 'hover'    | 触发方式                                                                                      |
| priorityDirection  | string                                                                                                                                                                 | 'vertical' | 弹出位置优先级, 默认为左右优先, 只在未设置 position 时生效, 可选值\['vertical', 'horizontal'] |
| getPopupContainer  | () => HTMLElement                                                                                                                                                      | 无         | 自定义 Popover 容器，覆盖默认渲染在 body 下的行为, () => DOMElement,父节点需要为相对定位      |
| showArrow          | boolean                                                                                                                                                                | true       | 是否展示箭头                                                                                  |
| autoAdjustOverflow | boolean                                                                                                                                                                | true       | 气泡被遮挡时是否自动调整位置                                                                  |

### Popover.Confirm

| 属性        | 类型        | 默认值                              | 说明                                                                         |
| ----------- | ----------- | ----------------------------------- | ---------------------------------------------------------------------------- |
| onOk        | () => void  | 无                                  | 点击确定按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |
| onCancel    | () => void  | 无                                  | 点击取消按钮时触发事件，返回 Promise 时，会在 Promise resolve 后关闭 Tooltip |
| text        | object      | { ok: 'Ok', cancel: 'Cancel' }      | 按钮文字                                                                     |
| type        | string      | _warning_                           | icon 的类型，4 选 1，\[_success_, _info_, _warning_, _danger(error)_]        |
| description | ReactNode   | 无                                  | 确认框的描述                                                                 |
| buttonProps | ButtonProps | {ok:ButtonProps,cancel:ButtonProps} | 按钮 Props                                                                   |

## 注意

请确保 Popover 的子元素能接受 onMouseEnter、onMouseLeave、onFocus、onClick 事件。
