import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Form from './Form'
import withForm from './Hoc/withForm'
import Item from './Item'

const FormComponent = compose(Datum.Hoc({ type: 'form', bindProps: ['removeUndefined', 'error'] }))(Form)

FormComponent.Item = withForm(['formDatum', 'labelWidth', 'labelAlign', 'labelVerticalAlign', 'keepErrorHeight'])(Item)

export default FormComponent
