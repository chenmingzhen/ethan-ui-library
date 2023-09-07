# menu _菜单_

<example />

## API

### Menu

| 属性             | 类型                                                      | 默认值   | 说明                                                                        |
| ---------------- | --------------------------------------------------------- | -------- | --------------------------------------------------------------------------- |
| data             | object[]                                                  | []       | 需要渲染成菜单的数据                                                        |
| mode             | 'inline' \| 'vertical' \| 'horizontal' \| 'vertical-auto' | 'inline' | 菜单样式                                                                    |
| renderItem       | (data: object) => ReactNode                               | -        | 自定义渲染 Item                                                             |
| defaultOpenKeys  | (string\|number)[]                                        | []       | 初始展开的菜单;如果需要设置此值,则需要设置 keygen,此值为一个包含 key 的数组 |
| defaultActiveKey | string\|number                                            | -        | 默认 active 的 key                                                          |
| openKeys         | (string\|number)[]                                        | []       | 展开的菜单(受控)                                                            |
| onClick          | (data: Data) => void                                      | -        | 点击事件                                                                    |
| style            | object                                                    | -        | 最外层扩展样式                                                              |
| inlineIndent     | number                                                    | 24       | 每一层缩进宽度                                                              |
| onOpenChange     | (keys: (string\|number)[]) => void                        | -        | 菜单展开/收起回调                                                           |
