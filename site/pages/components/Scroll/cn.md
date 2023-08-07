# Scroll _滚动_

<example />

## API

| 属性            | 类型                          | 默认值 | 说明                   |
| --------------- | ----------------------------- | ------ | ---------------------- |
| scroll          | 'x'\|'y'\|'both'              | 'x'    | 滚动的方向             |
| scrollLeftRatio | number                        | -      | x 方向滚动的比例值     |
| scrollTopRatio  | number                        | -      | y 方向滚动的比例值     |
| scrollHeight    | number                        | -      | 内容总高度             |
| scrollWidth     | number                        | -      | 内容总宽度             |
| className       | string                        | -      | 样式名称               |
| style           | React.CSSProperties           | -      | 样式                   |
| onScroll        | (evt:ScrollChangeEvent)=>void | -      | 滚动系数改变时的回调   |
| maxHeight       | number                        | -      | 最大高度限制           |
| maxWidth        | number                        | -      | 最大宽度限制           |
| containerHeight | number                        | -      | 容器高度               |
| containerWidth  | number                        | -      | 容器宽度               |
| symbol          | any                           | -      | 容器尺寸发生变化的标记 |
