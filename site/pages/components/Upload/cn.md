# Upload

<example />

## API

### Upload

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| accept | string | - | 上传文件类型, 和标准一致, 详见[accept](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/file#accept) |
| action | string\|(file:File)=>string | - | 上传地址 |
| children | ReactNode | 必填 | 上传占位内容 |
| beforeUpload | (file:File)=>EthanFile | - | 上传前处理 |
| className | string | - | 扩展className |
| defaultValue | EthanFile[] | - | 默认值 |
| headers | object | - | 请求头部信息 |
| limit | number | 100 | 最大上传文件数 |
| disabled | boolean | false | 是否禁用上传行为 | 
| name | string | - | 服务端接收的 filename |
| request | (options: RequestOptions) => void | - | 自定义上传方法<br /> options: 上传的配置 |
| onChange | (values: EthanFile[],EthanFile) => void | - | 值改变回调 |
| params | object | - | 提交到服务端的额外参数 |
| recoverAble | boolean | false | 是否可以恢复已删除的value |
| validator | UploadValidator | - | 上传前文件校验 |
| value | EthanFile[] | \[] | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |
| withCredentials | boolean | false | 是否携带 cookie |
| multiple | boolean | false | 是否支持多选文件 |
| renderContent | (file:EthanFile) => ReactNode | - | 自定义File的内容 |
| drop | boolean | false | 是否开启拖拽上传文件 |
| showUploadList | boolean | true | 是否展示上传列表 |


### Upload.Image

**Upload.Image在Upload的Props上添加下面的Props**

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| width | number | 80 | 图片宽度 |
| height | number | 80 | 图片高度 |
| validator | UploadImageValidator | - | 上传前文件校验 |

### Upload.Button

**Upload.Button在Upload的Props上添加下面的Props,但不支持多选**

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| type | 'primary' \| success' \| 'info' \| 'warning' \| 'danger' | primary | 按钮类型 |
| placeholder | ReactNode | - | 按钮默认内容 |
| loading | ReactNode | - | 上传中按钮的内容，如果是字符串默认会有spin loading |


### RequestOptions 

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| file |  File | - |  传入的文件 |
| name | string | - | 服务端接收的 filename |
| url | string | - | 请求的地址 |
| onError | (xhr: XMLHttpRequest) => void | -| 上传出错事件 |
| onProgress |  (e: ProgressEvent) => void | - | 上传进度事件 |
| onLoad | (xhr: XMLHttpRequest)=> void | - | 上传成功事件 |
| params | object | - | 上传的额外参数 |
| headers | object | - | 请求的头部信息 |
| withCredentials | boolean | false | 是否携带 cookie |


### UploadValidator

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| ext | (ext: string) => Error \| void | 判断后缀名，传入参数为文件后缀，校验失败返回 Error |
| size | (size: number) => Error \| void | 判断文件大小，校验失败返回 Error |
| customValidator | (file: File) => Error \| void | 自定义校验 |


### UploadImageValidator

**UploadImageValidator在UploadValidator上增加以下的属性**

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| imageSize | (image: HTMLImageElement) => Error \| void | 只对 Image 有效，判断图片尺寸，校验失败返回 Error |

### EthanFile

| 属性 | 类型 | 说明 |
| --- | --- | --- |
| id | React.Key | 唯一Key |
| name | string | 文件名 |
| process | number | 上传进度 |
| status | 'UPLOADING' \| 'SUCCESS' \| 'ERROR' \| 'REMOVED' \| 'MANUAL' \| 'PENDING' | 文件的状态 |
| blob | File | 选中的文件 |
| message | string | 文件携带的信息 |
| xhr | XMLHttpRequest | - |
| data | string | 文件的额外信息，在Upload.Image中为图片的src |

