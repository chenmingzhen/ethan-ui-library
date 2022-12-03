# ClampLines

ClampLines can limit the maximum number of lines of text and omit any extra text.

<example />

## API

### ClampLines

| 属性       | 类型          | 默认值 | 说明                                         |
| ---------- | ------------- | ------ | -------------------------------------------- |
| lines      | number        | 3      | Displays the maximum number of lines of text |
| ellipsis   | string        | '...'  | The ellipsis style                           |
| text       | string        | -      | The text displayed                           |
| showButton | boolean       | true   | Show button or not                           |
| moreText   | ReactNode     | -      | The text of displayed text                   |
| lessText   | ReacrNode     | -      | Folded text                                  |
| className  | string        | -      | Container className                          |
| style      | CSSProperties | -      | Container style                              |
| pop        | boolean       | -      | Whether to display text as a Popover         |
