# Progress

<example />

## API 

| Property | Type | Default | Description | 
| --- | --- | --- | --- | --- |
| background | string | '#e9ecef' | Background color |
| className | string | none | Extend className |
| children | string \| ReactNode | none | Content |
| color | string \| { from: string, to: string} \| { '0%': string, '100%': string} | primary | The foreground color can be set to the object to become a gradient.  | 
| shape | string | 'line' | Options:  \['line', 'circle'] | 
| size | number | 100 | The width and height of 'circle' shape. | 
| strokeWidth | number | 8 | The width of the stroke | 
| style | object | none | Container element style | 
| type | string | none | Built-in color, options: \['success', 'info', 'warning', 'danger'] | 
| value | number | 0 | Percentage, 0 <= value <= 100 | 
| popup | boolean | false | show children with popup | 
