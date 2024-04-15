import { MemoExoticComponent, ForwardRefExoticComponent } from 'react'
import Alert from './alert'
import Scroll from './scrollAlert'
import { AlertProps } from './type'

export interface AlertComponent
    extends MemoExoticComponent<ForwardRefExoticComponent<AlertProps & React.RefAttributes<HTMLDivElement>>> {
    Scroll: typeof Scroll
}

Scroll.displayName = 'EthanAlertScroll'
;(Alert as AlertComponent).Scroll = Scroll

Alert.displayName = 'EthanAlert'

export default Alert as AlertComponent
