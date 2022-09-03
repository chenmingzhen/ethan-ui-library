# Alert

<example />

## API

### Alert

| Property  | Type                                                    | Default   | Description                                                                                                                                     |
| --------- | ------------------------------------------------------- | --------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| children  | ReactNode                                               | -         | Content, text or react component                                                                                                                |
| className | string                                                  | -         | Extend className                                                                                                                                |
| icon      | ReactNode \| boolean                                    | -         | When the type is true, the status icon is displayed according to the type property. If you need to display a custom icon, pass in ReactElement. |
| iconSize  | number                                                  | 14        | The size for icon                                                                                                                               |
| onClose   | () => void \| boolean                                   | -         | When onClose is empty, no close is displayed. If you need to close and do not need to handle callbacks, set it true.                            |
| style     | object                                                  | -         | Container element style                                                                                                                         |
| type      | 'success' \| 'info' \| 'warning' \| 'danger' \| 'error' | _warning_ | type of alert                                                                                                                                   |

### Alert.ScrollAlert

**The Alert.ScrollAlert API contains all the properties of Alert, but note that Alert.ScrollAlert takes precedence over Alert and needs to be an Alert component internally**

| Property       | Type     | Default | Description                                                                                    |
| -------------- | -------- | ------- | ---------------------------------------------------------------------------------------------- |
| scrollInterval | number   | 5000    | The spacing of scrolling times                                                                 |
| onClose        | ()=>void | none    | Callback when all nodes are shut down                                                          |
| style          | object   | none    | The style used to uniformly set the Alert should not add Margin to affect the calculated value |
