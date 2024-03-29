# Tabs *标签*

<example />

## API

### Tabs

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| active | string \| number | 0 | 当前选中标签页（受控） |
| align | 'left' \| 'right' \| 'vertical-left' \| 'vertical-right' | 无 | 设置标签对齐方式 |
| background | string | '#fff' | 选中标签背景色 |
| border | string | '#ddd' | 边框颜色 |
| className | string | - | 扩展className |
| collapsible | boolean | false | 是否可折叠 |
| defaultActive | string \| number | 0 | 默认选中标签页（非受控） |
| tabBarExtraContent | string \| ReactNode | - | tab bar 上额外的元素 | 
| tabBarStyle | object | - | tab bar 的样式对象 |
| onChange | (key: any) => void  | - | 标签选中时触发回调事件 |
| shape | string | 'card' | 可选值为 \['card', 'line', 'button', 'bordered', 'dash'\]，shape 为line或dash时，background 等颜色参数将会无效 |
| style | CSSProperties | - | 最外层扩展样式 |
| lazy | boolean | true | 是否开启懒加载 |
| overflowIcon | 'scroll'\|'more' | 'scroll' | tabs溢出时的图标 |

### Tabs.Panel

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| className | string | - | 扩展className |
| background | string | - | 背景色，会覆盖 Tabs 的background |
| border | string | - | 边框颜色，会覆盖 Tabs 的border |
| disabled | boolean | false | 是否禁用 |
| id | string \| number | - | 选填，默认为 index |
| style | object | - | Panel内容样式 |
| tab |  ReactNode | 必填 | 标签标题内容 |
| children | ReactNode | - |  Panel内容 |
| tabStyle | CSSProperties | - | tab样式 |
| activeTabStyle | CSSProperties | - | tab选中时样式 |

