# Transfer

<example />

## API

| Property            | Type                                                                 | Default   | Description                                                                                                                  |
| ------------------- | -------------------------------------------------------------------- | --------- | ---------------------------------------------------------------------------------------------------------------------------- |
| value               | TransferDataValueType[]                                              | -         | The set of values ​​displayed in the box data on the right                                                                   |
| titles              | ReactNode[]                                                          | -         | Title on both sides, order from left to right                                                                                |
| data                | TransferData[]                                                       | -         | Data source                                                                                                                  |
| renderItem          | (data: TransferData) => ReactNode                                    | -         | Custom render item                                                                                                           |
| footers             | ReactNode[]                                                          | -         | Bottom element, order from left to right                                                                                     |
| operations          | ReactNode[]                                                          | -         | Operational elements, the order is from top to bottom                                                                        |
| operationIcon       | boolean                                                              | true      | Whether to display the icon of the action                                                                                    |
| className           | string                                                               | -         | Container class name                                                                                                         |
| style               | object                                                               | -         | Container style                                                                                                              |
| listClassName       | string                                                               | -         | List class name                                                                                                              |
| listStyle           | object                                                               | -         | List style                                                                                                                   |
| selectedKeys        | TransferDataValueType[]                                              | -         | A set of keys of selected items                                                                                              |
| defaultSelectedKeys | TransferDataValueType[]                                              | -         | A set of keys of default selected items                                                                                      |
| onSelectChange      | (sourceKeys: any[], targetKeys: TransferDataValueType[]) => void     | -         | A callback function which is executed when selected items are changed                                                        |
| disabled            | (data: TransferData) => boolean \| boolean                           | -         | When the value is true, disabled all checkboxes; When the value is function, disable the checkbox that this function returns |
| empty               | ReactNode                                                            | "no data" | Empty content                                                                                                                |
| onFilter            | (text: string, dataItem:TransferData , isSource: boolean) => boolean | -         | Filter function for search options filtering                                                                                 |
| loading             | boolean \| boolean[]                                                 | -         | List loading                                                                                                                 |
| onSearch            | (text: string, isSource: boolean) => void                            | -         | A callback function which is executed when search field are changed                                                          |
| listHeight          | number                                                               | 180       | List height                                                                                                                  |
| lineHeight          | number                                                               | 32        | Item height                                                                                                                  |
| oneWay              | boolean                                                              | false     | Display as single direction style                                                                                            |
