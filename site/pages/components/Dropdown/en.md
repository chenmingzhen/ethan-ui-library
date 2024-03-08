# Dropdown

<example />

## API

### Dropdown

| Property        | Type                           | Default | Description                                                                                                                                    |
| --------------- | ------------------------------ | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| className       | string                         | -       | Extend className                                                                                                                               |
| menu            | MenuProps                      | -       | Menu props.                                                                                                                                    |
| disabled        | boolean                        | false   | disabled                                                                                                                                       |
| trigger         | 'click' \| 'hover'             | 'click' | Toggle mode, options                                                                                                                           |
| position        | string                         | 'auto'  | position,optional value:'right-top'\|'bottom-left'\|'bottom-right'\|'left-top'\|'right-bottom'\|'top-left'\|'top-right'\|'left-bottom'\|'auto' |
| visible         | boolean                        | -       | Whether to show                                                                                                                                |
| onVisibleChange | (visible: boolean) => void     | -       | The event of visible change. Not trigger when hidden by click item                                                                             |
| overlay         | (menu: ReactNode) => ReactNode | -       | Custom render popup                                                                                                                            |
