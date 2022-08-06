import withListDatum from '@/utils/Datum/withListDatum'
import { compose } from '@/utils/func'
import Transfer from './Transfer'
import withControl from '../../hoc/withControl'

const TransferComponent = compose(
    withControl,
    withListDatum({ bindProps: ['disabled', 'format', 'prediction'] })
)(Transfer)

TransferComponent.displayName = 'EthanTransfer'

export default TransferComponent as typeof Transfer
