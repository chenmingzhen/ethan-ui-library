# Input

<example />

## API

### Input

| Property     | Type                                 | Default   | Description                                                                                                                                                                                      |
| ------------ | ------------------------------------ | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| defaultValue | string \| number                     | -         | Default value                                                                                                                                                                                    |
| name         | string                               | -         | The name of Form which access data                                                                                                                                                               |
| onChange     | (value: string) => void              | -         | The callback function when the value is changing                                                                                                                                                 |
| onEnterPress | (value: string) => void              | -         | The callback function for enter key                                                                                                                                                              |
| placeholder  | string                               | -         | Same as the native input tag                                                                                                                                                                     |
| size         | 'large' \| 'default' \| 'small'      | 'default' | size of input                                                                                                                                                                                    |
| style        | object                               | -         | Container element style                                                                                                                                                                          |
| tip          | ReactNode\|(value:string)=>ReactNode | -         | Prompt information                                                                                                                                                                               |
| trim         | boolean                              | false     | When trim is true, blank characters are automatically deleted when lose focus。                                                                                                                  |
| type         | string                               | 'text'    | Same as the type of the native input tag                                                                                                                                                         |
| value        | string \| number                     | -         | The defaultValue and value can be set at the same time and defaultValue will be overridden by value<br />In the Form, the value will be taken over by the form and the value will lose efficacy. |
| clearable    | () => void \| boolean                | false     | Remove content of the input when clicking the clear icon, clear event function                                                                                                                   |
| info         | (value: string) => string \| number  | -         | Infomation                                                                                                                                                                                       |
| popoverProps | object                               | -         | Validate popup properties, specific properties refer to Popover component description                                                                                                            |
| maxLength    | number                               | -         | input max length                                                                                                                                                                                 |
| prefix       | ReactNode                            | -         | The prefix icon for the Input                                                                                                                                                                    |
| suffix       | ReactNode                            | -         | The suffix icon for the Input                                                                                                                                                                    |

### Input.Number

The basic API is the same as the above table, and the specific API is as follows:

| Property  | Type                    | Default | Description                                                |
| --------- | ----------------------- | ------- | ---------------------------------------------------------- |
| max       | number                  | -       | The maximum value                                          |
| min       | number                  | -       | The minimum value                                          |
| step      | number                  | 1       | Change the digital span. It can be decimal.                |
| digits    | number                  | -       | the digits of number                                       |
| allowNull | boolean                 | false   | allow value is null                                        |
| hideArrow | boolean                 | false   | Whether to show increase/decrease buttons                  |
| onChange  | (value: string) => void | -       | The callback function when the value is changing           |
| onInput   | (value: string) => void | -       | The callback function when the input component is changing |
