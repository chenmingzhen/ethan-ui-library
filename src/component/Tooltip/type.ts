import { TriggerAction } from '../Trigger/type'

export interface TooltipProps {
    /* 弹出是否使用动画，默认为 true  */
    animation?: boolean
    children: JSX.Element
    className?: string
    /* 弹出层位置 */
    position?: 'left' | 'top' | 'right' | 'bottom'
    /** 弹出位置优先级 */
    priorityDirection?: 'vertical' | 'horizontal'
    /* 最外层扩展样式 */
    style?: React.CSSProperties
    /* 弹出内容 */
    tip: React.ReactNode
    /* 弹出方式 */
    trigger?: TriggerAction | TriggerAction[]
    /* 延迟显示 */
    delay?: number
    /* 受控是否可见 */
    visible?: boolean
    /* 渲染到指定的DOM容器中 不是改变显示的位置 且容器是relative定位才不影响准确的tip的计算 */
    getPopupContainer?: () => HTMLElement
    onVisibleChange?: (visible: boolean) => void
    color?: string
}
