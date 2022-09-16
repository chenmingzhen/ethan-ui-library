# LazyList _高性能列表_

<example />

## API

| 属性                | 类型                                        | 默认值 | 说明                                                                                |
| ------------------- | ------------------------------------------- | ------ | ----------------------------------------------------------------------------------- |
| data                | any[]                                       | -      | 数据源                                                                              |
| lineHeight          | number                                      | -      | 每一个 Item 的高度                                                                  |
| height              | number                                      | -      | 滚动容器的高度                                                                      |
| renderItem          | (value: any) => ReactNode                   | -      | 渲染 Item                                                                           |
| shouldRecomputed    | (prevData: any[], nextData: any[])=>boolean | -      | 数据源的长度发生变化且数据源长度大于 1 时，传入判断函数是否允许重新计算对应的滚动值 |
| defaultIndex        | number                                      | 0      | 数据源起始的 Index,默认 hover 的位置，视图会滚动到此处                              |
| onScrollStateChange | (params:LazyListState)=>void                | -      | 滚动系数改变时的回调                                                                |
| keyboardControl     | boolean                                     | false  | 是否可以使用键盘进行滚动                                                            |
