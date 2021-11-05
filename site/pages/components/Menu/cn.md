# menu *菜单*

<example />

## API

### Menu

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| data | object[] | [] | 需要渲染成菜单的数据 |
| mode | 'inline' \| 'vertical' \| 'horizontal' \| 'vertical-auto' | 'inline'| 菜单样式|
| renderItem | (data: object) => ReactNode  | 空 | 自定义渲染Item |
| defaultOpenKeys | (string\|number)[] | [] | 初始展开的菜单;如果需要设置此值,则需要设置keygen,此值为一个包含key的数组 |
| defaultActiveKey | string\|number | 空 | 默认active的key |
| openKeys | (string\|number)[] | [] | 展开的菜单(受控) | 
| onClick | (data: Data) => void | null | 点击事件|
| style | object | 空 | 最外层扩展样式 |
| inlineIndent | number | 24 | 每一层缩进宽度 |
| onOpenChange | (keys: (string\|number)[]) => void | 无 | 菜单展开/收起回调 |

### MenuBaseData
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key | string \| number | 空 | 数据源唯一值，必填 |
| title | ReactNode | 空 | 渲染的title |
| disabled | boolean | false | 是否禁用选项 |
| linkKey | string | 空 | 菜单的链接键值 |  
| target | string | 空 | link的打开方式 | 
| children | MenuBaseData | 空 | Data的子项 | 






