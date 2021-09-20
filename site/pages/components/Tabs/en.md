# Tabs

<example />

## API

### Tabs

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| active | string \| number | 0 | Current active tab id or index |
| align | 'left' \| 'right' \| 'vertical-left' \| 'vertical-right' | none | set the label align |
| background | string | '#fff' | Active background color |
| border | string | '#ddd' | Border color |
| className | string | - | Extend className |
| collapsible | boolean | false | Whether can be collapsed |
| defaultActive | string \| number | 0 | Default active tab id or index |
| inactiveBackground | string | 'transparent' | Inactive background color |
| tabBarExtraContent | string \| ReactNode | - | extra element in tab bar | 
| tabBarStyle | object | - | style in tab bar |
| onChange | (key: any) => void | - | Change callback |
| shape | string | 'card' | Options: \['card', 'line', 'button', 'bordered', 'dash'\]. If shape is not null, the style properties such as background, border will lose effect |
| style | CSSProperties | - | Container element style |
| lazy | boolean | true | lazy load |
| overflowIcon | 'scroll'\|'more' | 'scroll' | Icon when tabs overflow |


### Tabs.Panel

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| className | string | - | Extend className |
| background | string | - | Background color, override the Tab's background |
| border | string | - | Border color, override the Tab's border |
| disabled | boolean | false | Specifies the Panel should be disabled |
| id | string \| number | - | The default is index |
| style | object | - | Content style |
| tab | string \| ReactNode | required | Tab content |
| children | ReactNode | - |  Panel content |
| tabStyle | CSSProperties | - | tab style |
| activeTabStyle | CSSProperties | - | tab active style |
