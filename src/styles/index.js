import genaration from '@/utils/classnames'

// 注意 这里的引入顺序会影响后面的样式叠加
import alertLess from './alert.less'
import buttonLess from './button.less'
import messageLess from './message.less'
import spinLess from './spin.less'
import iconLess from './icon.less'

export const buttonClass = genaration(buttonLess, 'button')
export const messageClass = genaration(messageLess, 'message')
export const alertClass = genaration(alertLess, 'alert')
export const spinClass = genaration(spinLess, 'spin')
export const iconClass = genaration(iconLess, 'icon')
