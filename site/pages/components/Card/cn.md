# Card *卡片*

<example />

## API

### Card

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| collapsible | boolean \| 'bottom' | false | 是否可折叠，'bottom' 表示从下方点击折叠 |
| collapsed | boolean | 无 | 是否折叠，用于受控状态 |
| defaultCollapsed | boolean | true | 初始折叠状态（仅在 collapsible 为 true 时有效） |
| onCollapse | () => void | 无 | 折叠状态改变时回调事件 |
| shadow | true \| false \| 'hover' | false | 是否显示阴影<br />'hover' - 鼠标移到元素上显示<br />true - 总是显示<br />false - 从不显示 |
| style | object | 无 | 最外层扩展样式 |
| id | any | 无 | 手风琴下控制展开的值 |

<br />

### Card.Header, Card.Body, Card.Footer

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | 无 | 扩展className |
| style | object | 无 | 最外层扩展样式 |

<br />

### Card.Accordion

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| active | any | 无 | 打开的值，全关闭时为 null，用于受控状态。默认为索引，若Card设置id后则为id。 |
| defaultActive | any | 0 | 默认打开的值，用于非受控状态。默认为索引，若Card设置id后则为id。 |
| onChange | () => void | 无 | 面板打开回调 |

<br />

### Card.Submit

同 [Button](/components/Button)
