# Upload

<example />

## API

### Upload

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| accept | string | - | The type of the upload file, same as the standard,See details [accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept)  |
| action | string\|(file:File)=>string | - | The address for uploading |
| children | ReactNode | required | Upload placeholder |
| className | string | - | Extend className |
| defaultValue | EthanFile[] | -  | default value |
| headers | object | - | Request headers |
| limit | number | 100 | Maximum number of uploaded files |
| disabled | boolean | false | disabled upload action | 
| name | string | - | The key access data in the Form  |
| request | (options: RequestOptions) => void | - | Custom upload method<br /> options: the options of upload |
| onChange | (values: EthanFile[],EthanFile) => void | - | The callback function when the value is changing |
| params | object | - | Additional parameters submitted to the server |
| recoverAble | boolean | true | Whether to recover deleted values. |
| validator | UploadValidator | - | Check file before uploading |
| value | EthanFile[] | \[] | value |
| withCredentials | boolean | false | Whether to take the cookie |
| multiple | boolean | false | Whether multi-select files are supported |
| renderContent | (file:EthanFile) => ReactNode | - | Custom content  | 
| drop | boolean | false | drop to update |
| showUploadList | boolean | true | show upload list |

### Upload.Image

**Upload.Image Add the following Props to the Props of the Upload.**

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| width | number | 80 | image width |
| height | number | 80 | image height |
| validator | UploadImageValidator | - | Check file before uploading |

### Upload.Button

**Upload.Button Adds the following Props to the uploads, but multiple options are not supported.**

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| type | string | primary | options: \['primary', success', 'info', 'warning', 'danger'\] |
| placeholder | ReactNode | - | button default content |
| loading | ReactNode | - | content of uploading, will have spin if a string |


### RequestOptions 

| Property | Type | Default | Description |
| --- | --- | --- | --- |
| file |  File | - |  The file |
| name | string | - | Filename received by the server |
| url | string | - | Requested address |
| onError | (xhr: XMLHttpRequest) => void | -| Upload error event |
| onProgress |  (e: ProgressEvent) => void | - | Upload Progress event |
| onLoad | (xhr: XMLHttpRequest)=> void | - | Uploading successful event |
| params | object | - | Additional parameters for upload |
| headers | object | - | Request header information |
| withCredentials | boolean | false | Whether to take the cookie |

### UploadValidator

| Property | Type | Description |
| --- | --- | --- |
| ext | (ext: string) => Error \| void | Check the suffix name. The parameter passed in is the file suffix. Error is returned if the verification fails |
| size | (size: number) => Error \| void | Check the file size. An Error message is returned if the verification fails |
| customValidator | (file: File) => Error \| void | Custom check |


### UploadImageValidator

**UploadImageValidator Adds the following attributes to UploadValidator**

| Property | Type | Description |
| --- | --- | --- |
| imageSize | (image: HTMLImageElement) => Error \| void | This parameter is valid only for Image. If the Image size is judged, Error is returned if the verification fails |

### EthanFile

| Property | Type | Description |
| --- | --- | --- |
| id | React.Key | Key |
| name | string | File name |
| process | number | Upload progress |
| status | 'UPLOADING' \| 'SUCCESS' \| 'ERROR' \| 'REMOVED' \| 'MANUAL' \| 'PENDING' | File status |
| blob | File | Selected file |
| message | string | The information carried by the file |
| xhr | XMLHttpRequest | - |
| data | string | Additional information for the file, in upload. Image, is the SRC of the Image |
