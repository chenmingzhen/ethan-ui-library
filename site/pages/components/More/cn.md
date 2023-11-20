# More _省略显示_

<example />

## API

### More

| 属性                | 类型                                              | 默认值 | 说明                              |
| ------------------- | ------------------------------------------------- | ------ | --------------------------------- |
| data                | T                                                 | 必填   | 数据源                            |
| compressed          | boolean                                           | false  | 是否压缩显示                      |
| getContainerElement | ()=>HTMLElement                                   | 必填   | 提供 More 组件获取容器 dom 的方法 |
| getMoreText         | (moreNodesLen:number)=>string                     | '...'  | 显示更多时的文本，用于参与计算    |
| renderItem          | (dataItem: T) => ReactNode                        | 必填   | 渲染每个 Item 的函数              |
| renderMore          | (moreNodes: React.ReactNode[]) => React.ReactNode | 必填   | 渲染 More                         |
