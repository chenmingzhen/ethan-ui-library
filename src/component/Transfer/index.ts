import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Transfer from './Transfer'
import inputable from '../Form/inputable'

const TransferComponent = compose(inputable, Datum.Hoc({ bindProps: ['disabled', 'format', 'prediction'] }))(Transfer)

export default TransferComponent as typeof Transfer
