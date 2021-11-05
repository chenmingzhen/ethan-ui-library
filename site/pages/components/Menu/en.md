# Menu

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| data | object[] | [] | Menu items data |
| mode | 'inline' \| 'vertical' \| 'horizontal' \| 'vertical-auto' | 'inline' | style of menu |
| renderItem | (data: object) => ReactNode  | none | Custom render Item. |
| defaultOpenKeys | (string\|number)[] | [] | Initial expanded menu |
| defaultActiveKey | string\|number | none | Default active key |
| openKeys | (string\|number)[] | [] | expended menu | 
| onClick | (data: object) => void | null | onClick event |
| style | object | none | Container element style |
| inlineIndent | number | 24 | indent of each level |   
| onOpenChange | (keys: (string\|number)[]) => void | none | menu open change callback |

### MenuBaseData
| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| key | string \| number | none | Data source unique value.Required |
| title | ReactNode | none | Rendering title |
| disabled | boolean | false | disabled |
| linkKey | string | none | Menu item link href |  
| target | string | none | Menu item link open way | 
| children | MenuBaseData | none | Data children | 