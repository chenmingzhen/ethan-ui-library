# Alert _提示框_

<example />

## API

### Alert

| 属性      | 类型                                                    | 默认值    | 说明                                                                                |
| --------- | ------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------- |
| children  | ReactNode                                               | 无        | 内容，文字或 react 组件                                                             |
| className | string                                                  | 无        | 扩展 className                                                                      |
| icon      | ReactNode \| boolean                                    | 无        | 为 true 时，根据 type 属性显示状态图标。如果需要显示自定义图标，传入 ReactElement。 |
| iconSize  | number                                                  | 14        | icon 的尺寸                                                                         |
| onClose   | () => void \| boolean                                   | 无        | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为 true 即可       |
| style     | object                                                  | 无        | 最外层扩展样式                                                                      |
| type      | 'success' \| 'info' \| 'warning' \| 'danger' \| 'error' | _warning_ | 4 选 1                                                                              |

### Alert.ScrollAlert

**_Alert.ScrollAlert 的 Api 包含 Alert 所有的属性，但是注意 Alert.ScrollAlert 的优先级高于 Alert，且内部都需要为 Alert 组件_**

| 属性           | 类型     | 默认值 | 说明                                               |
| -------------- | -------- | ------ | -------------------------------------------------- |
| scrollInterval | number   | 5000   | 滚动时间的间距                                     |
| onClose        | ()=>void | 无     | 所有节点被关闭的回调                               |
| style          | object   | 无     | 用于统一设置 Alert 的样式 勿添加 Margin 影响计算值 |
