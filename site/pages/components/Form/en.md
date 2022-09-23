# Form

Form component, providing data management, validation, submission, interaction, etc

<example />

## API

### Form

| Property        | Type                                | Default | Description                                                                                           |
| --------------- | ----------------------------------- | ------- | ----------------------------------------------------------------------------------------------------- |
| className       | string                              | -       | Extend className                                                                                      |
| disabled        | boolean                             | false   | When disabled is true, all the elements in the form are disabled.                                     |
| defaultValue    | any                                 | -       | Form default value                                                                                    |
| inline          | boolean                             | false   | When inline is true, the form is horizontal layout                                                    |
| onError         | (error:Error)=>void                 | -       | Callback when the error happens                                                                       |
| onReset         | ()=>void                            | -       | Reset the form callback event                                                                         |
| onSubmit        | (value:any)=>void                   | -       | Callback events after the form is submitted and data validation is successful                         |
| scrollToError   | boolean                             | -       | Submit failure automatically scrolls to the first error field                                         |
| style           | React.CSSProperties                 | -       | Container element style                                                                               |
| labelAlign      | 'top' \|'right' \|'left'            | -       | Label sort                                                                                            |
| labelWidth      | string \| number                    | '140px' | Label width, invalid if labelAlign is 'top'.                                                          |
| onChange        | (changeValues:any,values:any)=>void | -       | A callback event is triggered when a field is updated                                                 |
| removeUndefined | boolean                             | true    | Whether to delete fields whose value is undefined, the default value is delete                        |
| errors          | Record<string,string\|number>       | -       | Form errors                                                                                           |
| animation       | boolean                             | false   | Whether to animate error                                                                              |
| preserve        | boolean                             | false   | Preserve the field value when the field is deleted                                                    |
| form            | FormInstance                        | -       | The Form control instance created by form.useForm () is automatically created when it is not provided |

### Form.Item

** Form field components for bidirectional data binding, validation, layout, and so on. **

| Property      | Type                                                               | Default | Description                                                                                                                      |
| ------------- | ------------------------------------------------------------------ | ------- | -------------------------------------------------------------------------------------------------------------------------------- |
| className     | string                                                             | -       | Extend className.                                                                                                                |
| defaultValue  | any                                                                | -       | The defaultValue of the Form field, which has a lower priority than the defaultValue of the Form.                                |
| label         | ReactNode                                                          | -       | When undefined, the tag will not render and will not hold space.                                                                 |
| labelAlign    | 'top' \|'right' \|'left'                                           | -       | Label sort                                                                                                                       |
| labelWidth    | string \| number                                                   | -       | Label width, invalid if labelAlign is 'top'.                                                                                     |
| required      | boolean                                                            | false   | Required tag, for display only, does not trigger check                                                                           |
| tip           | ReactNode                                                          | -       | Tip information                                                                                                                  |
| style         | React.CSSProperties                                                | -       | FormItem style                                                                                                                   |
| grid          | number \| { width?: number; offset?: number; responsive?: number } | -       | Configuration of rasters for FormItem                                                                                            |
| rules         | Rule[]                                                             | -       | Rules of verification                                                                                                            |
| name          | string \| string[]                                                 | -       | Field name, support array, support multilevel nested data                                                                        |
| flow          | boolean \| string[]                                                | -       | Subscribe to the update of the corresponding field. If the Flow field is updated, the FormItem is re-rendered                    |
| noStyle       | boolean                                                            | false   | No style, used as a pure field control                                                                                           |
| noErrorInRoot | boolean                                                            | false   | By default, the top-level FormItem collects error displays for all FormItems. FormItem set to true do not collect error messages |
| preserve      | boolean                                                            | false   | Preserve the field value when the field is deleted                                                                               |
| animation     | boolean                                                            | false   | Whether to animate error                                                                                                         |

### Form.FieldSet

** Handle a set(group) data from form by name. **

| Property     | Type                                     | Default  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| ------------ | ---------------------------------------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| children     | (opts: object) => ReactNode \| ReactNode | required | When children type is not function, handle a set data type of object, When children type is function, handle a group of data type of array. options property: <br />list: all data of name <br />value：a single piece of data for the value obtained by name <br />onChange：a callback when the value is changing <br />onRemove：a callback when a child component is removed <br />index：the current index <br />onInsert: Insert a piece of data before the current item <br />onAppend: Insert a piece of data after the current item |
| defaultValue | string \| number                         |          | Default value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| emptyRender  | (onInsert: any) => ReactNode             | -        | Display content when data is empty. (Only valid if children is function)                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| name         | string                                   | required | The name to access data from the Form                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| rules        | any[]                                    | -        | Rules of verification                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| preserve     | boolean                                  | false    | Preserve the field value when the field is deleted 值                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| flow         | boolean \| string[]                      | -        | Subscribe to the update of the corresponding field. If the Flow field is updated, the FormItem is re-rendered                                                                                                                                                                                                                                                                                                                                                                                                                                |
| animation    | boolean                                  | false    | Whether to animate error error                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

### FormInstance

** An instance of the form component that manipulates the Form Store **

| Property     | Type                                                        | Description                                                                   |
| ------------ | ----------------------------------------------------------- | ----------------------------------------------------------------------------- |
| get          | (name:string\|string[])=>any                                | Gets the value of a specific field                                            |
| getValue     | ()=>any                                                     | Returns the values of the form                                                |
| set          | (params:{name:string\|string[],value:any})=>any             | Sets the value of a specific field                                            |
| setValue     | (values:any)=>any                                           | Sets the values of the form                                                   |
| setError     | (params:{name:string\|string[],error:Error \| string})=>any | Sets the value of a specific field error                                      |
| setFormError | (errors:Record<string,string\|Error>>)                      | Sets the errors of the form                                                   |
| validate     | (name:string)=>any                                          | Verifies the form value for a particular field and returns the field value    |
| validateForm | (names?:string[])=>any                                      | Validates the form and returns the corresponding value, which defaults to all |
| reset        | (names?:string[])=>void                                     | Reset the form, which defaults to all fields                                  |

### Hooks

#### Form.useForm

Create Form instance to maintain data store.

```typescript
type Form.useForm = (): [FormInstance]
```

#### Form.useFormValueState

Gets the status of a specific field, the value of which can be manipulated

```typescript
type Form.useFormValueState = (name:string): [value:any,(value: any) => void]
```

#### Form.useFormValueEffect

Subscribe for the value of a particular field and perform a callback when it changes

```typescript
type FormComponent.useFormValueEffect = (callback: (v: any) => void, params: {form: FormInstance,deep: string[]}) => void
```
