// @ts-nocheck
import { memo } from 'react'
import Datum from '@/utils/Datum'
import { compose } from '@/utils/func'
import Transfer from './Transfer'
import inputable from '../Form/inputable'

const exportTransfer = compose(
    inputable,
    Datum.hoc({ bindProps: ['disabled', 'limit', 'format', 'prediction', 'separator'] })
)(Transfer)

exportTransfer.displayName = 'EthanTransfer'

export default memo(exportTransfer)
