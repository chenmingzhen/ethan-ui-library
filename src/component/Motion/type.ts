type MotionChildrenFunc = (
    props: { className?: string },
    ref?: React.MutableRefObject<any> | React.RefCallback<any>
) => React.ReactNode

export interface MotionProps {
    destroyAfterLeave?: boolean
    leaveClassName?: string
    children: React.ReactNode | MotionChildrenFunc
    name?: string
    enter?: boolean
    onEnterPrepare?: (element: HTMLElement) => void
    onEnterStart?: (element: HTMLElement) => void
    onEnterActive?: (element: HTMLElement) => void
    onEnterEnd?: (element: HTMLElement) => void
    leave?: boolean
    onLeavePrepare?: (element: HTMLElement) => void
    onLeaveStart?: (element: HTMLElement) => void
    onLeaveActive?: (element: HTMLElement) => void
    onLeaveEnd?: (element: HTMLElement) => void
    visible?: boolean
}

export enum MotionStatus {
    /** 初始或销毁状态 */
    NONE = 'none',
    /** 忽略进入状态 */
    IGNORE_ENTER = 'ignore_enter',
    /** 忽略退出状态 */
    IGNORE_LEAVE = 'ignore_leave',

    APPEAR = 'appear',
    /** 进入状态 */
    ENTER = 'enter',
    /** 退出状态 */
    LEAVE = 'leave',
}

export enum MotionStep {
    NONE = 'none',
    PREPARE = 'prepare',
    START = 'start',
    ACTIVE = 'active',
    END = 'end',
}

type TransitionType = 'fade' | 'collapse' | 'scale-y'

export interface TransitionProps<Tag extends HTMLElement = HTMLDivElement>
    extends React.DetailedHTMLProps<React.HTMLAttributes<Tag>, Tag> {
    visible: boolean
    height?: number
    className?: string
    transitionTypes?: TransitionType[]
    display?: React.CSSProperties['display']
    duration?: 'fast' | 'slow' | 'medium'
    tag?: keyof HTMLElementTagNameMap
    destroyAfterLeave?: MotionProps['destroyAfterLeave']
    hideDisplayAfterLeave?: boolean
}
