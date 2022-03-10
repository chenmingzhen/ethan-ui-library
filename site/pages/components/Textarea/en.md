# Textarea

<example />

## API

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| autoSize | boolean | false | Whether the height changes automatically with the content |
| defaultValue | string \| number | | default value |
| name | string | none | The name that accesses data from Form |
| onChange | (value: string) => void | | The callback function for changing value |
| onEnterPress | (value: string) => void | | The callback function for enter key |
| placeholder | string | | The same as the native placeholder tag. |
| rows | number | 4 | The minimum row height. Same as native textarea rows property. |
| maxHeight | number \| string | - | the maxHeight of the textarea, scroll bars appear after more than | 
| style | object | - | Container element style |
| trim | boolean | false | When trim is true, blank characters are automatically deleted when lose focus。 |
| resize | boolean | false | support resize |
| value | string \| number | | DefaultValue and value can be set at the same time and defaultValue will be overridden by value. <br />In the Form, the value is taken over by the Form and lose efficacy. |
| popoverProps | object | none | Validate popup properties, specific properties refer to Popover component description |
| showCount | boolean | false | Show value length |
