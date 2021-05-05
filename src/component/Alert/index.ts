import { MemoExoticComponent, ForwardRefExoticComponent, RefAttributes } from 'react'
import Alert, { AlertInstance, AlertProps } from './alert'
import Scroll from './scrollAlert'

interface AlertComponent
  extends MemoExoticComponent<ForwardRefExoticComponent<AlertProps & RefAttributes<AlertInstance>>> {
  Scroll: typeof Scroll
}

Scroll.displayName = 'EthanAlertScroll'
;(Alert as AlertComponent).Scroll = Scroll

Alert.displayName = 'EthanAlert'

export default Alert as AlertComponent
