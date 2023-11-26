# menu

<example />

## API

### Menu

| 属性                  | 类型                                   | 默认值   | 说明                         |
| --------------------- | -------------------------------------- | -------- | ---------------------------- |
| data                  | object[]                               | []       | 需要渲染成菜单的数据         |
| mode                  | 'inline' \| 'vertical' \| 'horizontal' | 'inline' | 菜单样式                     |
| renderItem            | (data: object) => ReactNode            | -        | 自定义渲染 Item              |
| defaultOpenKeys       | (string\|number)[]                     | []       | 默认展开项                   |
| defaultActiveKey      | string\|number                         | -        | 默认 active 的 key           |
| openKeys              | (string\|number)[]                     | []       | 展开的菜单(受控)             |
| onClick               | (data: Data,path:React.key[]) => void  | -        | 点击事件                     |
| onSelect              | (data: Data,path:React.key[]) => void  | -        | 选中事件                     |
| style                 | object                                 | -        | 最外层扩展样式               |
| inlineIndent          | number                                 | 24       | 每一层缩进宽度               |
| onOpenChange          | (keys: (string\|number)[]) => void     | -        | 菜单展开/收起回调            |
| subMenuTriggerActions | 'focus' \| 'mousedown'                 | -        | 非内联模式下子菜单展开的方式 |
