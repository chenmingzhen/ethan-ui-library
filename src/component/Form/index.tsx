import Form from './Form'
import Item from './FormItem'
import FieldSet from './FieldSet'
import useForm from './hooks/useForm'
import useFormValueState from './hooks/useFormValueState'
import useFormValueEffect from './hooks/useFormValueEffect'
import forwardForm from './Hoc/forwardForm'

const FormComponent = forwardForm(Form)

FormComponent.Item = Item

FormComponent.FieldSet = FieldSet

FormComponent.useForm = useForm

FormComponent.useFormValueState = useFormValueState

FormComponent.useFormValueEffect = useFormValueEffect

export default FormComponent
