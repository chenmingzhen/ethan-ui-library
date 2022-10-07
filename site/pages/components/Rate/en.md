# Rate

<example />

## API

### Rate

| Property     | Type             | Default | Description                                                                                |
| ------------ | ---------------- | ------- | ------------------------------------------------------------------------------------------ |
| defaultValue | number           |   -      | Default value                                                                              |
| disabled     | bool             | false   | read-only                                                                                  |
| max          | number           | 5       | The maximum value of the option, integer                                                   |
| onChange     | (value: number) => void      |     -    | The callback function when the value is changing                                           |
| repeat       | bool             | true    | When repeat is true, display item is a copy of the item corresponding to the current value |
| size         | number \| string | 20      | the size of the icon                                                                       |
| value        | number           | 0       |                                                                                            |
| clearable    | bool             | false   | whether to allow clear when click again                                                    |
| allowHalf    | bool             | false   | Whether to allow semi selection                                                            |