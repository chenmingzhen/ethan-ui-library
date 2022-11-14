import { MemoExoticComponent, ForwardRefExoticComponent, RefAttributes } from 'react'
import Alert from './alert'
import Scroll from './scrollAlert'
import { AlertProps, AlertInstance } from './type'

export interface AlertComponent
    extends MemoExoticComponent<ForwardRefExoticComponent<AlertProps & RefAttributes<AlertInstance>>> {
    Scroll: typeof Scroll
}

Scroll.displayName = 'EthanAlertScroll'
;(Alert as AlertComponent).Scroll = Scroll

Alert.displayName = 'EthanAlert'

export default Alert as AlertComponent
