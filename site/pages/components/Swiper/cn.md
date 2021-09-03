# Swiper *轮播2.0(无缝滚动)*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| transitionDuration | number | 450 | 过渡持续时间 |
| className | string | 无 | 扩展className |
| autoPlay | boolean | true | 是否自动播放 |
| autoplayInterval | number | 2000 | 滚动到下一张的时间 |
| dots | boolean | true | 是否显示面板指示点 |
| arrows | boolean | true | 是否显示箭头 |
| style | React.CSSProperties | 无 | Swiper的拓展样式 |
| onChange | (current: number) => void | 无 | 切换面板的回调 |
| renderArrow | (onPrev: (e: React.MouseEvent) => void, onNext: (e: React.MouseEvent) => void) => React.ReactNode | 无 | 自定义箭头的渲染 |

### 方法

** *swiper的ref返回两个切换方法**

| 名称 | 描述 | 
| --- | --- | 
| onPrev | 上一张 | 
| onNext | 下一张 |
