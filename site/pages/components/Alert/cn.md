# Alert *提示框*

<example />

## API

### Alert

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| children | ReactNode | 无 | 内容，文字或react组件 |
| className | string | 无 | 扩展className |
| icon | ReactNode \| boolean | 无 | 为true时，根据type属性显示状态图标。如果需要显示自定义图标，传入ReactElement。 |
| iconSize | number | 14 | icon 的尺寸 |
| onClose | () => void \| boolean | 无 | 当 onClose 为空时，不显示关闭。如果需要关闭又不需要处理回调，设置为true即可 |
| style | object | 无 | 最外层扩展样式 |
| type | 'success' \| 'info' \| 'warning' \| 'danger' \| 'error' | *warning* |  4 选 1 |

### Alert.ScrollAlert

Alert.ScrollAlert的Api包含Alert所有的属性，但是注意Alert.ScrollAlert的优先级高于Alert，且内部都需要为Alert组件

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| scrollInterval | number | 5000 | 滚动时间的间距 |
| onClose | ()=>void | 无 | 所有节点被关闭的回调 |
| style | object | 无 | 用于统一设置Alert的样式 勿添加Margin 影响计算值 |


