import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Transfer from './Transfer'
import withControl from '../../hoc/withControl'

const TransferComponent = compose(withControl, Datum.Hoc({ bindProps: ['disabled', 'format', 'prediction'] }))(Transfer)

TransferComponent.displayName = 'EthanTransfer'

export default TransferComponent as typeof Transfer
