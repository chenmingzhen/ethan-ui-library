import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Form from './Form'

const FormComponent = compose(Datum.Hoc({ type: 'form', bindProps: ['removeUndefined', 'error'] }))(Form)
