# Loading _加载进度条_

<example />

## API

### Loading

Loading 封装一组方法供全局使用，可配合 React 懒加载组件 Suspense 的 fallback 进行路由加载反馈

Loading.start() // 进度条开始加载

Loading.finish() // 进度条结束加载

Loading.upload(percent:number) // 进度条到指定百分比位置

Loading.config(config:LineLoadingProps) // 配置 Loading，如 color，高度，需要下次 start 生效

Loading.fullScreen(config:FullScreenConfig):FullScreenFunction // 开始全屏 Loading

### Loading

| 属性    | 类型   | 默认值 | 说明       |
| ------- | ------ | ------ | ---------- |
| color   | string | 无     | 加载颜色   |
| height  | number | 4      | 进度条高度 |
| percent | number | 0      | 进度       |
