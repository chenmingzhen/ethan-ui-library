# Transfer _穿梭框_

<example />

## API

| 属性                | 类型                                                                 | 默认值   | 说明                                                                                |
| ------------------- | -------------------------------------------------------------------- | -------- | ----------------------------------------------------------------------------------- |
| value               | TransferDataValueType[]                                              | -        | 显示在右侧框数据的值集合                                                            |
| titles              | ReactNode[]                                                          | -        | 两侧的标题, 顺序是从左到右                                                          |
| data                | TransferData[]                                                       | -        | 数据源                                                                              |
| renderItem          | (data: TransferData) => ReactNode                                    | -        | 自定义渲染内容                                                                      |
| footers             | ReactNode[]                                                          | -        | 底部元素, 顺序是从左到右                                                            |
| operations          | ReactNode[]                                                          | -        | 操作元素, 顺序是从上到下                                                            |
| operationIcon       | boolean                                                              | true     | 是否显示操作按钮的图标                                                              |
| className           | string                                                               | -        | 扩展的 class                                                                        |
| style               | object                                                               | -        | 扩展的样式                                                                          |
| listClassName       | string                                                               | -        | 列表扩展的 class                                                                    |
| listStyle           | object                                                               | -        | 列表扩展的样式                                                                      |
| selectedKeys        | TransferDataValueType[]                                              | -        | 被勾选的列表                                                                        |
| defaultSelectedKeys | TransferDataValueType[]                                              | -        | 默认被勾选的列表                                                                    |
| onSelectChange      | (sourceKeys: any[], targetKeys: TransferDataValueType[]) => void     | -        | 勾选触发的方法                                                                      |
| disabled            | (data: TransferData) => boolean \| boolean                           | -        | 如果 disabled 为 true，禁用全部选项，如果 disabled 为函数，根据函数反回结果禁用选项 |
| empty               | ReactNode                                                            | "无数据" | 无内容的展示                                                                        |
| onFilter            | (text: string, dataItem:TransferData , isSource: boolean) => boolean | -        | 筛选函数, 参数为: 输入文本, 数据, 是否为左侧数据                                    |
| loading             | boolean \| boolean[]                                                 | -        | 加载中, 如果需要两侧加载中状态不一致, 需要传入数组                                  |
| onSearch            | (text: string, isSource: boolean) => void                            | -        | 输入框值变化的回调, 参数为: 输入文本, 是否为左侧数据                                |
| listHeight          | number                                                               | 180      | 列表高度                                                                            |
| lineHeight          | number                                                               | 32       | 列表行高                                                                            |
| oneWay              | boolean                                                              | false    | 展示为单向样式                                                                      |
