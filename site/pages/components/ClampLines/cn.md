# ClampLines _多行裁剪_

ClampLines 可以限制文本最大行数,多出的部分省略显示。

<example />

## API

### ClampLines

| 属性       | 类型          | 默认值 | 说明                          |
| ---------- | ------------- | ------ | ----------------------------- |
| lines      | number        | 3      | 显示文本的最大行数            |
| ellipsis   | string        | '...'  | 省略符号的样式                |
| text       | string        | -      | 文本                          |
| showButton | boolean       | true   | 是否显示按钮                  |
| moreText   | ReactNode     | -      | 显示更多的文本                |
| lessText   | ReacrNode     | -      | 收起的文本                    |
| className  | string        | -      | 容器样式名                    |
| style      | CSSProperties | -      | 容器样式                      |
| pop        | boolean       | -      | 是否以 Popover 的形式显示文本 |
