# ProImage _高级图片_

<example />

## API

### ProImage

**_ProImage 包含 [Image](/components/Image) 除 target 全部 Props. _**

| 属性            | 类型      | 默认值 | 说明           |
| --------------- | --------- | ------ | -------------- |
| loadingElement  | ReactNode | -      | 加载中的占位符 |
| errorElement    | ReactNode | -      | 错误的占位符   |
| backdropOpacity | number    | 1      | 遮罩层透明度   |
| defaultIndex    | number    | 0      | 默认打开的索引 |

### ProImage.Group

| 属性            | 类型   | 默认值 | 说明           |
| --------------- | ------ | ------ | -------------- |
| backdropOpacity | number | 1      | 遮罩层透明度   |
| defaultIndex    | number | 0      | 默认打开的索引 |

### ProImage.Slider

| 属性            | 类型                 | 默认值 | 说明               |
| --------------- | -------------------- | ------ | ------------------ |
| backdropOpacity | number               | 1      | 遮罩层透明度       |
| defaultIndex    | number               | 0      | 默认打开的索引     |
| proImageItems   | ProImageItem         | -      | 图片源             |
| currentIndex    | number               | 0      | 目前的索引         |
| visible         | boolean              | false  | 是否打开           |
| esc             | boolean              | true   | 是否支持 Esc 关闭  |
| onClose         | ()=>void             | -      | 关闭 Slider 的回调 |
| onIndexChange   | (index:number)=>void | -      | 索引改变的回调     |
