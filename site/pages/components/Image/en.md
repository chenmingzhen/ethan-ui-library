# Image

<example />

## API

### Image

| Property | Type | Default | Description | 
| --- | --- | --- | --- | 
| className | string | - | extend className | 
| height | string \| number | '100%' | the height of the image(When the value is percentage, the ratio is the width of the image) | 
| href | string | - | original picture address | 
| lazy | boolean \| number | false | whether to delay loading, number to set lazy offset | 
| src | string | required | the picture address | 
| style | object | - | Container element style | 
| target | '_modal' \| '_blank' \| '_self' \| '_download' | '_modal' | target of image | 
| width | string \| number | '100%' | the width of the image | 
| placeholder | ReactNode | 'loading' | loading image placeholder content | 
| container | string | - | the special element selector witch container the lazy image, such as: '#id', '.class' | 
| error | ReactNode | - | image error placeholder |
| fit | 'fill' \| 'center' \| 'fit' \| 'stretch' | - | Image fit type |  


### Image.Group

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| height | string \| number | '100%' | the height of single image(When the value is percentage, the ratio is the width of the image) |
| lazy | boolean | false | whether to delay loading |
| pile | boolean | false | whether to stack |
| target | '_modal' \| '_blank' \| '_self' \| '_download' | '_modal' | target of image |
| width | string \| number | '100%' | the width of single picture |
