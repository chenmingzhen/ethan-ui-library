# Textarea *多行文本框*

<example />

## API

| 属性 | 类型 | 默认值 | 说明 |
| --- | --- | --- | --- |
| autoSize | boolean | false | 高度是否随内容自动变化 |
| defaultValue | string \| number | | 默认值 |
| name | string | 无 | Form 存取数据的名称 |
| onChange | (value: string) => void | | 值改变回调函数 |
| onEnterPress | (value: string) => void | | 回车键回调函数 |
| placeholder | string | | 同原生 input 标签的 placeholder |
| rows | number | 4 | 最小行高，同原生 textarea rows 属性 |
| maxHeight | number \| string | 无 | 输入框的最大高度, 超过之后会出现滚动条 | 
| style | object | 无 | 最外层扩展样式 |
| trim | boolean | false | trim 为 true 时，失去焦点时会自动删除空白字符。 |
| resize | boolean | false | 是否可以伸缩高度 |
| value | string \| number | | defaultValue 和 value 可以同时设置，defaultValue 会被value覆盖<br />在Form中，value会被表单接管，value无效 |
| popoverProps | object | 无 | 校验弹框接受的属性，具体属性参考Popover组件说明 |
| showCount | boolean | false | 显示长度 |