# Dropdown

<example />

## API

### Dropdown

| Property    | Type                                  | Default                   | Description                                                                                                                                                                                   |
| ----------- | ------------------------------------- | ------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| className   | string                                | -                         | Extend className                                                                                                                                                                              |
| columns     | number                                | -                         | Display multiple elements on the page. This property depends on the width attribute. Please set the number of columns and width appropriately.                                                |
| data        | object[]                              | required                  | See the detail in the data of the drop down box.                                                                                                                                              |
| disabled    | boolean                               | false                     | disabled                                                                                                                                                                                      |
| onClick     | (data: object) => void                | -                         | The click event. The parameter is the rendered data. <br /> Note: if the onClick is set in the data, this method will be ignored and data.onclick will be called.                             |
| placeholder | string \| ReactNode                   | required                  | Displayed content of the button                                                                                                                                                               |
| renderItem  | (data: object) => ReactNode \| string | 'content'                 | Set the displayed content. If it is a string, the corresponding value will be displayed. <br />If it is a function, the return value will be displayed and its parameter is the current data. |
| buttonProps | ButtonProps                           | -                         | The same as [Button](/components/Button)                                                                                                                                                      |
| trigger     | 'click' \| 'hover'                    | 'click'                   | Toggle mode, options                                                                                                                                                                          |
| width       | number                                | -                         | The width of the pop-up option layer                                                                                                                                                          |
| animation   | boolean                               | true                      | animation toggle                                                                                                                                                                              |
| position    | string                                | 'auto'                    | position,optional value:'right-top'\|'bottom-left'\|'bottom-right'\|'left-top'\|'right-bottom'\|'top-left'\|'top-right'\|'left-bottom'\|'auto'                                                |
| showCaret   | boolean                               | Whether to display arrows | Whether to display arrows                                                                                                                                                                     |

### DropdownData

| Property | Type              | Default | Description |
| -------- | ----------------- | ------- | ----------- |
| content  | string \| element | -       |             |
| key      | string \| number  | -       | Unique key  |
| disabled | boolean           | false   | Disabled    |
