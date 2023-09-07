# Menu

<example />

## API

| Property         | Type                                                      | Default  | Description               |
| ---------------- | --------------------------------------------------------- | -------- | ------------------------- |
| data             | object[]                                                  | []       | Menu items data           |
| mode             | 'inline' \| 'vertical' \| 'horizontal' \| 'vertical-auto' | 'inline' | style of menu             |
| renderItem       | (data: object) => ReactNode                               | -        | Custom render Item.       |
| defaultOpenKeys  | (string\|number)[]                                        | []       | Initial expanded menu     |
| defaultActiveKey | string\|number                                            | -        | Default active key        |
| openKeys         | (string\|number)[]                                        | []       | expended menu             |
| onClick          | (data: object) => void                                    | -        | onClick event             |
| style            | object                                                    | -        | Container element style   |
| inlineIndent     | number                                                    | 24       | indent of each level      |
| onOpenChange     | (keys: (string\|number)[]) => void                        | -        | menu open change callback |
