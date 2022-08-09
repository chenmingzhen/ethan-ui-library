# Form _表单_

表单组件，提供数据管理，校验，提交，交互等

<example />

## API

### Form

| 属性            | 类型                                | 默认值  | 说明                                                       |
| --------------- | ----------------------------------- | ------- | ---------------------------------------------------------- |
| className       | string                              | -       | 样式名称                                                   |
| disabled        | boolean                             | false   | 是否禁用                                                   |
| defaultValue    | any                                 | -       | 表单默认值，只有初始化以及重置时生效                       |
| inline          | boolean                             | false   | 是否水平布局                                               |
| forwardedRef    | ()=>HTMLFormElement                 | -       | 获取 form 的 Dom                                           |
| onError         | (error:Error)=>void                 | -       | 提交表单且数据验证失败后回调事件                           |
| onReset         | ()=>void                            | -       | 重置表单回调事件                                           |
| onSubmit        | (value:any)=>void                   | -       | 提交表单且数据验证成功后回调事件                           |
| scrollToError   | boolean                             | -       | 提交失败自动滚动到第一个错误字段                           |
| style           | React.CSSProperties                 | -       | 样式                                                       |
| labelAlign      | 'top' \|'right' \|'left'            | -       | Label 的排序方式                                           |
| labelWidth      | string \| number                    | '140px' | 标签宽度，labelAlign 为 'top' 时无效。                     |
| onChange        | (changeValues:any,values:any)=>void | -       | 字段更新时触发回调事件                                     |
| removeUndefined | boolean                             | false   | 是否删除值为 undefined 的字段，默认值为删除                |
| errors          | Record<string,string\|number>       | -       | 表单的错误值                                               |
| animation       | boolean                             | false   | 是否以动画展示 error                                       |
| preserve        | boolean                             | false   | 当字段被删除时保留字段值                                   |
| form            | FormInstance                        | -       | 经 Form.useForm() 创建的 form 控制实例，不提供时会自动创建 |

### Form.Item

** 表单字段组件，用于数据双向绑定、校验、布局等。 **

| 属性          | 类型                                                               | 默认值 | 说明                                                                                               |
| ------------- | ------------------------------------------------------------------ | ------ | -------------------------------------------------------------------------------------------------- |
| className     | string                                                             | -      | 样式名称                                                                                           |
| defaultValue  | any                                                                | -      | 表单字段的默认值，优先级低于 Form 的 defaultValue                                                  |
| label         | ReactNode                                                          | -      | 未定义时，标签不会 render，也不会占位。                                                            |
| labelAlign    | 'top' \|'right' \|'left'                                           | -      | Label 的排序方式                                                                                   |
| labelWidth    | string \| number                                                   | -      | 标签宽度，labelAlign 为 'top' 时无效。                                                             |
| required      | boolean                                                            | false  | 必填标记，纯展示用，不会触发校验                                                                   |
| tip           | ReactNode                                                          | -      | 提示文案                                                                                           |
| style         | React.CSSProperties                                                | -      | 样式                                                                                               |
| grid          | number \| { width?: number; offset?: number; responsive?: number } | -      | 表单字段的栅格配置                                                                                 |
| rules         | Rule[]                                                             | -      | 校验规则                                                                                           |
| name          | string \| string[]                                                 | -      | 字段名，支持数组，支持多级嵌套数据                                                                 |
| flow          | boolean \| string[]                                                | -      | 订阅对应字段的更新,如果 flow 的字段更新，会重新渲染 FormItem                                       |
| noStyle       | boolean                                                            | false  | 不带样式，作为纯字段控件使用                                                                       |
| noErrorInRoot | boolean                                                            | false  | 默认情况下，顶层的 FormItem 会收集所有 FormItem 的错误展示，设置为 true 的 FormItem 不收集错误信息 |
| preserve      | boolean                                                            | false  | 当字段被删除时保留字段值                                                                           |
| animation     | boolean                                                            | false  | 是否以动画展示 error                                                                               |

### Form.FieldSet

** 用来处理 object 类型 字段和数组。 **

| 属性         | 类型                                     | 默认值 | 说明                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------ | ---------------------------------------- | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children     | (opts: object) => ReactNode \| ReactNode | 必填   | children 不为 function，用来处理 object 类型数据，children 内的 name 会拼接 FieldSet name，如 FieldSet name 为 'a', children 元素 name 为 b，children 实际处理的数据为 a.b; <br /> children 为 function 时，用来处理数组数据。options 属性为<br />list: name 下的全部数据<br />value：根据 name 获取的值的单条数据<br />onChange：子组件数据改变回调<br />onRemove：子组件删除回调<br />index：当前项索引<br />onInsert: 在当前项之前插入一条数据<br />onAppend: 在当前项之后附加一条数据 |
| defaultValue | string \| number                         | -      | 默认值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| emptyRender  | (onInsert: any) => ReactNode             | 无     | 数据为空时展示内容。（仅在 children 为 function 时有效）                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| name         | string                                   | 必填   | 从 Form 中存取数据的名称                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| rules        | any[]                                    | 无     | 校验规则                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| preserve     | boolean                                  | false  | 当字段被删除时保留字段值                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| flow         | boolean \| string[]                      | -      | 订阅对应字段的更新,如果 flow 的字段更新，会重新渲染白 FormItem                                                                                                                                                                                                                                                                                                                                                                                                                            |
| animation    | boolean                                  | false  | 是否以动画展示 error                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |

### FormInstance

** 表单组件的实例，用于操作表单 Store **

| 属性         | 类型                                                        | 说明                                 |
| ------------ | ----------------------------------------------------------- | ------------------------------------ |
| get          | (name:string\|string[])=>any                                | 获取特定字段的值                     |
| getValue     | ()=>any                                                     | 获取表单所有的字段值                 |
| set          | (params:{name:string\|string[],value:any})=>any             | 设置特定字段的值                     |
| setValue     | (values:any)=>any                                           | 设置表单的值                         |
| setError     | (params:{name:string\|string[],error:Error \| string})=>any | 设置表单特定字段的错误值             |
| setFormError | (errors:Record<string,string\|Error>>)                      | 设置表单的错误值                     |
| validate     | (name:string)=>any                                          | 校验特定字段的表单值，并且返回字段值 |
| validateForm | (names?:string[])=>any                                      | 校验表单，并返回对应的值，默认为全部 |
| reset        | (names?:string[])=>void                                     | 重置表单，默认为全部字段             |

### Hooks

#### Form.useForm

创建 Form 实例，操作 Form 的 Store。

```typescript
type Form.useForm = (): [FormInstance]
```

#### Form.useFormValueState

获取特定字段的状态，可以操作该字段的值

```typescript
type Form.useFormValueState = (name:string): [value:any,(value: any) => void]
```

#### Form.useFormValueEffect

监听特定字段的值，发生变化时执行回调

```typescript
type FormComponent.useFormValueEffect = (callback: (v: any) => void, params: {form: FormInstance,deep: string[]}) => void
```
