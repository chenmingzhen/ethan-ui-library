import Form from './Form'
import Item from './FormItem'
import FieldSet from './FieldSet'
import useForm from './hooks/useForm'
import useFormValueState from './hooks/useFormValueState'
import useFormValueEffect from './hooks/useFormValueEffect'
import forwardForm from './Hoc/forwardForm'
import { FormInstance, FormProps } from './type'

export interface FormComponent {
    <Values = any>(
        props: React.PropsWithChildren<FormProps<Values>> & { ref?: React.Ref<FormInstance<Values>> }
    ): React.ReactElement<FormProps<Values>>
    Item: typeof Item
    FieldSet: typeof FieldSet
    useForm: typeof useForm
    useFormValueState: typeof useFormValueState
    useFormValueEffect: typeof useFormValueEffect
}

const ComputedFormComponent = forwardForm(Form) as FormComponent

ComputedFormComponent.Item = Item

ComputedFormComponent.FieldSet = FieldSet

ComputedFormComponent.useForm = useForm

ComputedFormComponent.useFormValueState = useFormValueState

ComputedFormComponent.useFormValueEffect = useFormValueEffect

export default ComputedFormComponent
