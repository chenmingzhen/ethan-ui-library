# Switch _开关选择器_

<example />

## API

### Switch

| 属性         | 类型                            | 默认值  | 说明                                   |
| ------------ | ------------------------------- | ------- | -------------------------------------- |
| checked      | boolean                         | -       | 当前选中状态，checked 传入时为受控组件 |
| disabled     | boolean                         | false   | 是否禁用                               |
| onChange     | (checked: boolean) => void      | -       | checked 表示选中状态                   |
| content      | ReactNode[]                     | -       | 选中和未选中时的内容                   |
| size         | 'default' \| 'small' \| 'large' | default | 开关大小                               |
| defaultValue | boolean                         | -       | 初始值                                 |
