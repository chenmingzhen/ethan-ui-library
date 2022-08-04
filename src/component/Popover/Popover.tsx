import React from 'react'
import classnames from 'classnames'
import { Component } from '@/utils/component'
import ReactDOM from 'react-dom'
import { getParent, wrapSpan } from '@/utils/dom/element'
import { getPositionStr, getPosition } from '@/utils/dom/popover'
import { popoverClass } from '@/styles/index'
import isDOMElement from '@/utils/dom/isDOMElement'
import { parsePxToNumber } from '@/utils/strings'
import { isArray, isEmpty } from '@/utils/is'
import { LiteralUnion } from '@/utils/utilityTypes'

export interface IPopoverProps extends PopoverProps {
    isConfirmLoading?: boolean

    innerAlwaysUpdate?: boolean
}

type Trigger = LiteralUnion<'click' | 'hover', string>

export interface PopoverProps {
    placement?: string

    title?: React.ReactNode

    content?: React.ReactNode | ((hide: (e?: number) => void) => React.ReactNode)

    okText?: string

    cancelText?: string

    onVisibleChange?: (visible: boolean) => void

    trigger?: Trigger | Trigger[]

    visible?: boolean

    children: React.ReactElement

    style?: React.CSSProperties

    mouseEnterDelay?: number

    mouseLeaveDelay?: number

    defaultVisible?: boolean

    getPopupContainer?: () => HTMLElement

    className?: string

    arrowProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

    innerProps?: React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

    showArrow?: boolean

    autoAdjustOverflow?: boolean

    animation?: boolean
}

interface PopoverState {
    show: boolean
}

/**
 * @description
 * 1.handleShow与handleHide处理事件的动作，根据是否受控调用setShow
 * 2.setShow处理动画的变动以及更改state
 */
class Popover extends Component<IPopoverProps, PopoverState> {
    static defaultProps = {
        trigger: 'hover',

        mouseEnterDelay: 0.1,

        mouseLeaveDelay: 0.1,

        defaultVisible: false,

        arrowProps: {},

        innerProps: {},

        showArrow: true,

        autoAdjustOverflow: true,

        animation: true,
    }

    element = document.createElement('div')

    placeHolderRef = React.createRef<HTMLElement>()

    container: HTMLElement

    delayTimeout: NodeJS.Timeout

    animationTimeout: NodeJS.Timeout

    get eventHandlerElement() {
        return this.placeHolderRef.current.nextElementSibling as HTMLElement
    }

    static getDerivedStateFromProps(nextProps: PopoverProps, prevState: PopoverState) {
        return {
            show: nextProps.visible ?? prevState.show,
        }
    }

    constructor(props: PopoverProps) {
        super(props)

        this.state = {
            show: props.defaultVisible || props.visible,
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.state.show === true || nextState.show === true || this.props.innerAlwaysUpdate) return true

        return false
    }

    componentDidMount = () => {
        super.componentDidMount()

        this.bindTriggerEvents()

        if (this.state.show) {
            this.handleDefaultShow()
        }
    }

    componentDidUpdate(prevProps: PopoverProps, prevState: PopoverState) {
        const { visible, showArrow } = this.props

        if (this.props.className !== prevProps.className && this.element) {
            this.element.className = classnames(popoverClass('_', !showArrow && 'hide-arrow'), this.props.className)
        }

        if (!isEmpty(visible)) {
            const isSame = prevState.show === this.state.show

            if (isSame) return

            /** 受控执行动画 */
            this.setShow(this.state.show)
        }
    }

    componentWillUnmount = () => {
        super.componentWillUnmount()

        document.removeEventListener('mousedown', this.clickAway)

        window.removeEventListener('resize', this.handlePos)

        this.removeTriggerEvent()

        if (!this.container || !this.element) return

        if (this.container === document.body) {
            ReactDOM.unmountComponentAtNode(this.element.parentElement)

            this.container.removeChild(this.element)
        } else {
            ReactDOM.unmountComponentAtNode(this.container)

            this.container.parentElement.removeChild(this.container)
        }
    }

    render = () => {
        const { children, title, content, arrowProps, showArrow, innerProps } = this.props

        const wrapChildren = !isDOMElement(children) ? wrapSpan(children) : children

        const wrapContent = typeof content === 'function' ? content(this.handleHide) : content

        const elements = [
            <noscript ref={this.placeHolderRef} key="ns" />,
            React.cloneElement(<>{wrapChildren}</>, { key: children?.key ?? 'children' }),
        ]

        if (this.container) {
            elements.push(
                ReactDOM.createPortal(
                    <>
                        {showArrow && (
                            <div className={popoverClass('arrow')} {...arrowProps}>
                                <div className={popoverClass('arrow-content')} />
                            </div>
                        )}

                        <div className={popoverClass('inner')} {...innerProps}>
                            {title && <div className={popoverClass('title')}>{title}</div>}

                            {wrapChildren && <div className={popoverClass('inner-content')}>{wrapContent}</div>}
                        </div>
                    </>,
                    this.element
                )
            )
        }

        return elements
    }

    hasTrigger = (trigger: Trigger) => {
        return isArray(this.props.trigger) ? this.props.trigger.includes(trigger) : trigger === this.props.trigger
    }

    getContainer = () => {
        const { getPopupContainer } = this.props

        const container = getPopupContainer?.()

        if (container && isDOMElement(container)) {
            // 如果container是body的话 Popover是绝对定位，可以相对body直接定位
            // 需要注意的是 getBoundingClientRect的left top是会计算滚动条的滚动的
            // 如果是自定义的容器 首先 不能保证自定义容器的定位是relative或absolute等
            // 并且如果直接以自定义容器为Parent Parent是根据body（或其他）进行固定的
            // 自定义容器中即使存在滚动条 也不会影响到Children的计算 因为自定义容器在定位上已经是固定了
            // 这时候 需要添加一个额外的absolute容器在自定义容器里
            // 当自定义容器出现滚动时 absolute容器的getBoundingClientRect会发生改变
            // 此时Popover的位置是正确的
            // 配合 getPosition top-right理解
            const child = document.createElement('div')

            child.setAttribute('style', ' position: absolute; top: 0px; left: 0px; width: 100% ')

            // appendChild 返回 child  非container
            return container.appendChild(child)
        }

        return document.body
    }

    // 初始化DOM元素
    handleInitDOM = () => {
        if (!this.container) {
            this.container = this.getContainer()

            this.container.appendChild(this.element)

            this.element.style.display = 'none'

            this.element.className = classnames(
                popoverClass('_', !this.props.showArrow && 'hide-arrow'),
                this.props.className
            )
        }
    }

    // 绑定与清除DOM的处理事件
    bindTriggerEvents = () => {
        this.removeTriggerEvent()

        if (this.hasTrigger('hover')) {
            this.eventHandlerElement?.addEventListener('mouseenter', this.handleShow)

            this.eventHandlerElement?.addEventListener('mouseleave', this.handleHide)

            this.element.addEventListener('mouseleave', this.handleHide)
        }

        if (this.hasTrigger('click')) {
            this.eventHandlerElement?.addEventListener('mousedown', this.handleEventHandlerClick)
        }
    }

    bindDocumentAndWindowEvents = () => {
        document.addEventListener('mousedown', this.clickAway)

        window.addEventListener('resize', this.handlePos)
    }

    removeDocumentAndWindowEvents = () => {
        document.removeEventListener('mousedown', this.clickAway)

        window.removeEventListener('resize', this.handlePos)
    }

    removeTriggerEvent = () => {
        // remove click handler
        this.eventHandlerElement?.removeEventListener('mousedown', this.handleEventHandlerClick)

        // remove hover handler
        this.element.removeEventListener('mouseleave', this.handleHide)

        this.eventHandlerElement?.removeEventListener('mouseenter', this.handleShow)

        this.eventHandlerElement?.removeEventListener('mouseleave', this.handleHide)
    }

    handlePos = () => {
        const { placement, style, autoAdjustOverflow } = this.props

        const position = getPositionStr(placement, null, this.placeHolderRef.current?.parentElement, this.container)

        const posStyle = getPosition(position, this.eventHandlerElement, this.container)

        const newStyle = Object.assign({}, style, posStyle)

        Object.keys(newStyle).forEach(k => {
            this.element.style[k] = newStyle[k]
        })

        this.element.setAttribute('data-placement', position)

        if (autoAdjustOverflow) {
            const { left, right, top, bottom } = this.element.getBoundingClientRect()

            if (left < 0) {
                this.element.style.left = `${parsePxToNumber(this.element.style.left) + Math.abs(left)}px`
            } else if (right < 0) {
                this.element.style.right = `${parsePxToNumber(this.element.style.right) + Math.abs(right)}px`
            }

            if (top < 0) {
                this.element.style.top = `${parsePxToNumber(this.element.style.top) + Math.abs(top)}px`
            } else if (bottom < 0) {
                this.element.style.bottom = `${parsePxToNumber(this.element.style.bottom) + Math.abs(bottom)}px`
            }
        }
    }

    handleEventHandlerClick = () => {
        if (this.state.show) {
            this.handleHide(0)
        } else {
            this.handleShow()
        }
    }

    handleDefaultShow = () => {
        this.handleInitDOM()

        this.bindDocumentAndWindowEvents()

        this.setShow(true)
    }

    handleShow = () => {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout)
        }

        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout)
        }

        this.handleInitDOM()

        this.bindDocumentAndWindowEvents()

        const { onVisibleChange, visible } = this.props

        if (!isEmpty(visible)) {
            if (onVisibleChange) {
                onVisibleChange(true)
            }

            return
        }

        this.setShow(true)
    }

    handleHide = e => {
        // relatedTarget 事件属性返回与事件的目标节点相关的节点。
        //
        // 对于 mouseover 事件来说，该属性是鼠标指针移到目标节点上时所离开的那个节点。
        //
        // 对于 mouseout 事件来说，该属性是离开目标时，鼠标指针进入的节点。
        //
        // 对于其他类型的事件来说，这个属性没有用。

        // 如果离开时的Dom还是在popover中 不处理
        if (e && getParent(e.relatedTarget, `.${popoverClass('_')}`)) return

        if (this.delayTimeout) clearTimeout(this.delayTimeout)

        if (this.animationTimeout) {
            clearTimeout(this.animationTimeout)
        }

        const { onVisibleChange, visible } = this.props

        if (!isEmpty(visible)) {
            if (onVisibleChange) {
                onVisibleChange(false)
            }

            return
        }

        this.removeDocumentAndWindowEvents()

        this.setShow(false)
    }

    clickAway = e => {
        if (this.eventHandlerElement.contains(e.target)) return

        if (this.element.contains(e.target)) return

        if (getParent(e.target, popoverClass('_'))) return

        if (this.props.isConfirmLoading) return

        this.handleHide(0)
    }

    setShow = show => {
        const { mouseEnterDelay, mouseLeaveDelay, trigger, autoAdjustOverflow, animation } = this.props

        const delay = show ? mouseEnterDelay : mouseLeaveDelay

        this.delayTimeout = setTimeout(
            () => {
                if (show) {
                    this.element.style.display = 'block'

                    this.handlePos()

                    if (animation) {
                        this.element.classList.add(popoverClass('enter'))

                        this.element.classList.remove(popoverClass('exit'))

                        this.animationTimeout = setTimeout(() => {
                            autoAdjustOverflow && this.handlePos()
                        }, 250)
                    } else {
                        autoAdjustOverflow && this.handlePos()
                    }
                } else if (animation) {
                    this.element.classList.add(popoverClass('exit'))

                    this.element.classList.remove(popoverClass('enter'))

                    this.animationTimeout = setTimeout(() => {
                        this.element.style.display = 'none'
                    }, 250)
                } else {
                    this.element.style.display = 'none'
                }

                this.setState({ show })
            },
            trigger === 'hover' ? delay * 1000 : 0
        )
    }
}

export default Popover
