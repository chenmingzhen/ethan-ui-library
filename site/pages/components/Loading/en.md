# Loading

<example />

## API

### Loading

Loading provide a set of methods for global use.It can cooperate with React Suspense fallback for route loading feedback.

Loading.start() // LineLoading start.

Loading.finish() // LineLoading finish.

Loading.go(percent:number) // LineLoading to the specified percentage position.

Loading.setConfig(config:LineLoadingProps) // To configure Loading, such as color or height.Next start function works

### LineLoadingProps

| 属性    | 类型   | 默认值 | 说明        |
| ------- | ------ | ------ | ----------- |
| color   | string | none   | Bar color   |
| height  | number | 4      | Bar height  |
| percent | number | 0      | Bar percent |
