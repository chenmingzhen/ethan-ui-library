# Image *图片*

图片组件用来处理指定尺寸的图片，实现占位，异常处理，拉伸、填充，延时加载等功能。

<example />

## API

### Image

| 属性 | 类型 | 默认值 | 说明 |  
| --- | --- | --- | --- | 
| className | string | - | 扩展className |
| height | string \| number | '100%' | 图片高度(值为百分比时，对比值为图片宽度) | 
| href | string | - | 原始图片地址 | 
| lazy | boolean \| number | false | 是否延迟加载，如果为数字则表示懒加载偏移量 | 
| src | string | 必填 | 图片地址 | 
| style | object | - | 最外层扩展样式 | 
| target | '_modal' \| '_blank' \| '_self' \| '_download' | '_modal' | 图片打开方式 | 
| width | string \| number | '100%' | 图片宽度 | 
| placeholder | ReactNode | '加载中' | 图片加载中占位内容 | 
| container | string | - | 对特定元素进行懒加载判断的选择器, 如: '#id', '.class' |
| error | ReactNode | - | 图片载入错误的文案 |  
| fit | 'fill' \| 'center' \| 'fit' \| 'stretch' | - | 图片适应方式 |  

 
### Image.Group

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| height | string \| number | '100%' | 单个图片高度(值为百分比时，对比值为图片宽度) |
| lazy | boolean | false | 是否延迟加载 |
| pile | boolean | false | 是否堆叠 |
| target | '_modal' \| '_blank' \| '_self' \| '_download' | '_modal' | 图片打开方式 |
| width | string \| number | '100%' | 单个图片宽度 |
