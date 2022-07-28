import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Form from './Form'
import Item from './FormItem'
import FieldSet from './FieldSet'
import useFormDatum from './hooks/useFormDatum'
import useFormValueState from './hooks/useFormValueState'
import useFormValueEffect from './hooks/useFormValueEffect'

const FormComponent = compose(Datum.Hoc({ type: 'form', bindProps: ['removeUndefined', 'error', 'defaultValue'] }))(
    Form
)

FormComponent.Item = Item

FormComponent.FieldSet = FieldSet

FormComponent.useFormDatum = useFormDatum

FormComponent.useFormValueState = useFormValueState

FormComponent.useFormValueEffect = useFormValueEffect

export default FormComponent
