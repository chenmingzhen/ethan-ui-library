# ColorPicker

<example />

## API

### ColorPicker

| Property      | Type                                                         | Default       | Description                                      |
| ------------- | ------------------------------------------------------------ | ------------- | ------------------------------------------------ |
| value         | string                                                       | -             | The selected color                               |
| disabled      | boolean                                                      | false         | Whether to disabled                              |
| size          | 'small' \| 'large' \| 'default'                              | 'default'     | Size                                             |
| mode          | 'rgba' \| 'hex' \| 'hsla'                                    | 'rgba'        | Show patterns of color                           |
| defaultColors | string[]                                                     | []            | Customize the color tray                         |
| style         | React.CSSProperties                                          | -             | Input style                                      |
| className     | string                                                       | -             | Input className                                  |
| position      | 'left-bottom' \| 'left-top' \| 'right-bottom' \| 'right-top' | 'left-bottom' | Position where the drop-down box is displayed    |
| absolute      | boolean                                                      | true          | Whether a drop-down box is displayed in the body |
| defaultValue  | string                                                       | -             | The default selected color                       |
| onChange      | (color:string)=>void                                         | -             | Callback when color changes                      |

### ColorPicker.ColorBoard

**_ColorPicker.ColorBoard props consistent with ColorPicker, but does not contain position,size _**
