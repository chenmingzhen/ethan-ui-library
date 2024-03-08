# Dropdown _下拉菜单_

<example />

## API

### Dropdown

| 属性            | 类型                           | 默认值  | 说明                                                                                                                                |
| --------------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| className       | string                         | -       | 扩展 className                                                                                                                      |
| columns         | number                         | -       | 页面多元素展示,此属性需要依赖 width 属性,请合理的设置列数和宽度                                                                     |
| menu            | MenuProps                      | -       | menu 属性，详见 menu                                                                                                                |
| disabled        | boolean                        | false   | 禁用                                                                                                                                |
| trigger         | 'click' \| 'hover'             | 'click' | 触发方式                                                                                                                            |
| position        | string                         | 'auto'  | 位置，可选值:'right-top'\|'bottom-left'\|'bottom-right'\|'left-top'\|'right-bottom'\|'top-left'\|'top-right'\|'left-bottom'\|'auto' |
| visible         | boolean                        | -       | 是否显示(受控)                                                                                                                      |
| onVisibleChange | (visible: boolean) => void     | -       | 显示隐藏改变时事件,点击菜单按钮导致的消失不会触发                                                                                   |
| overlay         | (menu: ReactNode) => ReactNode | -       | 自定义渲染浮层内容                                                                                                                  |

### DropdownData

| 属性     | 类型              | 默认值 | 说明                    |
| -------- | ----------------- | ------ | ----------------------- |
| content  | string \| element | -      | 默认从 content 获取内容 |
| key      | string \| number  | -      | 唯一键                  |
| disabled | boolean           | false  | 是否禁用                |
