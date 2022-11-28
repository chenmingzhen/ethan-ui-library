# Image _图片_

图片组件用来处理指定尺寸的图片，实现占位，异常处理，拉伸、填充，延时加载等功能。

<example />

## API

### Image

| 属性         | 类型                                                     | 默认值   | 说明                                       |
| ------------ | -------------------------------------------------------- | -------- | ------------------------------------------ |
| className    | string                                                   | -        | 扩展 className                             |
| height       | string \| number                                         | -        | 图片高度                                   |
| lazy         | boolean \| number                                        | false    | 是否延迟加载，如果为数字则表示懒加载偏移量 |
| src          | string                                                   | 必填     | 图片地址                                   |
| style        | object                                                   | -        | 最外层扩展样式                             |
| target       | '\_modal' \| '\_blank' \| '\_self' \| '\_download'       | -        | 图片打开方式                               |
| width        | string \| number                                         | '100%'   | 图片宽度                                   |
| placeholder  | ReactNode                                                | '加载中' | 图片加载中占位内容                         |
| getContainer | ()=>HTMLElement                                          | -        | 对特定元素进行懒加载判断的选择器,          |
| error        | ReactNode                                                | -        | 图片载入错误的文案                         |
| fit          | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | -        | 图片适应方式                               |
| thumbnail    | string                                                   | -        | 缩略图图片地址                             |

### Image.Group

| 属性   | 类型                                               | 默认值    | 说明         |
| ------ | -------------------------------------------------- | --------- | ------------ |
| height | string \| number                                   | '100%'    | 单个图片高度 |
| lazy   | boolean                                            | false     | 是否延迟加载 |
| pile   | boolean                                            | false     | 是否堆叠     |
| target | '\_modal' \| '\_blank' \| '\_self' \| '\_download' | '\_modal' | 图片打开方式 |
| width  | string \| number                                   | '100%'    | 单个图片宽度 |
