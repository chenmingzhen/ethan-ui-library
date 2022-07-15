import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Form from './Form'
import withFormConsumer from './Hoc/withFormConsumer'
import Item from './FormItem'

const FormComponent = compose(Datum.Hoc({ type: 'form', bindProps: ['removeUndefined', 'error', 'defaultValue'] }))(
    Form
)

FormComponent.Item = withFormConsumer([
    'formDatum',
    'labelWidth',
    'labelAlign',
    'labelVerticalAlign',
    'keepErrorHeight',
])(Item)

export default FormComponent
