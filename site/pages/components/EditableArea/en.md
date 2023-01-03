# EditableArea

<example />

## API

| 属性              | 类型                    | 默认值 | 说明                                                                                                        |
| ----------------- | ----------------------- | ------ | ----------------------------------------------------------------------------------------------------------- |
| defaultValue      | string                  | -      | Set initial value                                                                                           |
| value             | string                  | -      | The value passed in when controlled                                                                         |
| className         | string                  | -      | The outermost extension className of a component                                                            |
| onChange          | (value: string) => void | -      | Callback function when the value changes, making the component controlled when set with value               |
| style             | object                  | -      | The outermost extension style of a component                                                                |
| border            | boolean                 | false  | Whether to show the border                                                                                  |
| disabled          | boolean                 | false  | Whether to disable                                                                                          |
| clearable         | boolean                 | true   | Whether to show the clear button                                                                            |
| placeholder       | string                  | -      | The same as the native placeholder tag                                                                      |
| trim              | boolean                 | false  | When trim is true, blank characters are automatically deleted when lose focus                               |
| onBlur            | (e: MouseEvent) => void | -      | blur event                                                                                                  |
| onFocus           | (e: MouseEvent) => void | -      | focus event                                                                                                 |
| maxHeight         | number \| string        | -      | the maxHeight of the textarea, scroll bars appear after more than                                           |
| getPopupContainer | () => HTMLElement       | -      | Custom Popover container, override the default behavior which is rendering under the body, () => DOMElement |
| width             | number \| string        | -      | width of the EditableArea                                                                                   |
