# Loading

<example />

## API

### Loading

Loading provide a set of methods for global use.It can cooperate with React Suspense fallback for route loading feedback.

Loading.start() // LineLoading start.

Loading.finish() // LineLoading finish.

Loading.upload(percent:number) // LineLoading to the specified percentage position.

Loading.config(config:LineLoadingProps) // To configure Loading, such as color or height.Next start function works

Loading.clear() // reset config.

Loading.fullScreen(config:FullScreenConfig):FullScreenFunction // FullScreenLoading start.

### FullScreenFunction

FullScreenFunction.config(config:FullScreenConfig) // Config FullScreenLoading

FullScreenFunction.destroy() // Destroy FullScreenLoading

### LineLoadingProps

| 属性    | 类型   | 默认值 | 说明        |
| ------- | ------ | ------ | ----------- |
| color   | string | none   | Bar color   |
| height  | number | 4      | Bar height  |
| percent | number | 0      | Bar percent |

### FullScreenProps

| 属性     | 类型      | 默认值              | 说明                                             |
| -------- | --------- | ------------------- | ------------------------------------------------ |
| type     | string    | SpinProps\['name'\] | FullScreenLoading shape, same as Spin name props |
| fallback | ReactNode | 无                  | Fallback in FullScreenLoading                    |
| color    | string    | 无                  | FullScreenLoading pattern color                  |
| size     | number    | 54                  | FullScreen Loading shape size                    |
