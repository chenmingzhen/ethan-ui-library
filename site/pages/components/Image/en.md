# Image

<example />

## API

### Image

| Property     | Type                                                     | Default   | Description                                                    |
| ------------ | -------------------------------------------------------- | --------- | -------------------------------------------------------------- |
| className    | string                                                   | -         | Extend className                                               |
| height       | string \| number                                         | -         | The height of the image                                        |
| lazy         | boolean \| number                                        | false     | Whether to delay loading, number to set lazy offset            |
| src          | string                                                   | required  | The picture address                                            |
| style        | object                                                   | -         | Container element style                                        |
| target       | '\_modal' \| '\_blank' \| '\_self' \| '\_download'       | -         | Target of image                                                |
| width        | string \| number                                         | '100%'    | The width of the image                                         |
| placeholder  | ReactNode                                                | 'loading' | Loading image placeholder content                              |
| getContainer | ()=>HTMLElement                                          | -         | TTThe special element selector witch container the lazy image. |
| error        | ReactNode                                                | -         | Image error placeholder                                        |
| fit          | 'fill' \| 'contain' \| 'cover' \| 'none' \| 'scale-down' | -         | Image fit type                                                 |
| thumbnail    | string                                                   | -         | Thumbnail aaaaddress                                           |

### Image.Group

| Property | Type                                               | Default   | Description                 |
| -------- | -------------------------------------------------- | --------- | --------------------------- |
| height   | string \| number                                   | -         | The height of single image  |
| lazy     | boolean                                            | false     | Whether to delay loading    |
| pile     | boolean                                            | false     | Whether to stack            |
| target   | '\_modal' \| '\_blank' \| '\_self' \| '\_download' | '\_modal' | Target of image             |
| width    | string \| number                                   | '100%'    | The width of single picture |
