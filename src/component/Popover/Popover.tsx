import React from 'react'
import { Component } from '@/utils/component'
import ReactDOM from 'react-dom'
import { getParent, wrapSpan } from '@/utils/dom/element'
import { getPositionStr, getPosition } from '@/utils/dom/popover'
import { popoverClass } from '@/styles/index'
import isDOMElement from '@/utils/dom/isDOMElement'

export interface IPopoverProps extends PopoverProps {
    isConfirmLoading?: boolean
}

export interface PopoverProps {
    placement?: string

    title?: React.ReactNode

    content?: React.ReactNode | ((hide: (e?: number) => void) => React.ReactNode)

    okText?: string

    cancelText?: string

    onVisibleChange?: (e: boolean) => void

    trigger?: 'click' | 'hover'

    visible?: boolean

    children: React.ReactElement

    style?: React.CSSProperties

    mouseEnterDelay?: number

    mouseLeaveDelay?: number

    defaultVisible?: boolean

    getPopupContainer?: () => HTMLElement

    className?: string
}

interface PopoverState {
    show: boolean
}

class Popover extends Component<IPopoverProps, PopoverState> {
    static defaultProps = {
        trigger: 'hover',

        mouseEnterDelay: 0.1,

        mouseLeaveDelay: 0.1,

        defaultVisible: false,
    }

    element = document.createElement('div')

    placeHolderRef = React.createRef<HTMLElement>()

    container: HTMLElement

    delayTimeout: NodeJS.Timeout

    dismissTimeout: NodeJS.Timeout

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
        if (this.state.show === true || nextState.show === true) return true

        return false
    }

    getSnapshotBeforeUpdate = (prevProps: PopoverProps) => {
        if (prevProps.trigger !== this.props.trigger) {
            this.bindEvents()
        }

        return null
    }

    componentDidMount = () => {
        super.componentDidMount()

        this.bindEvents()

        const { className } = this.props

        if (className) {
            this.element.classList.add(className)
        }

        if (this.state.show) {
            this.handleShow(null, true)
        }
    }

    componentDidUpdate(prevProps, prevState: PopoverState) {
        const { visible } = this.props

        if (typeof visible === 'boolean') {
            const isSame = prevState.show === this.state.show

            if (isSame) return

            if (this.state.show) {
                this.handleShow(null, true)
            } else {
                this.handleHide(0)
            }
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
        const { children, title, content } = this.props

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
                        <div className={popoverClass('arrow')}>
                            <div className={popoverClass('arrow-content')} />
                        </div>

                        <div className={popoverClass('inner')}>
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

            this.element.className = popoverClass('_')
        }
    }

    // 绑定与清除DOM的处理事件
    bindEvents = () => {
        const { trigger, visible } = this.props

        // 受控不添加事件
        if (typeof visible === 'boolean') return

        this.removeTriggerEvent()

        if (trigger === 'hover') {
            this.eventHandlerElement?.addEventListener('mouseenter', this.handleShow)

            this.eventHandlerElement?.addEventListener('mouseleave', this.handleHide)

            this.element.addEventListener('mouseleave', this.handleHide)
        } else {
            this.eventHandlerElement?.addEventListener('click', this.handleShow)
        }
    }

    removeTriggerEvent = () => {
        // remove click handler
        this.eventHandlerElement?.removeEventListener('click', this.handleShow)

        // remove hover handler
        this.element.removeEventListener('mouseleave', this.handleHide)

        this.eventHandlerElement?.removeEventListener('mouseenter', this.handleShow)

        this.eventHandlerElement?.removeEventListener('mouseleave', this.handleHide)
    }

    handlePos = () => {
        const { placement, style } = this.props

        const position = getPositionStr(placement, null, this.placeHolderRef.current?.parentElement, this.container)

        const posStyle = getPosition(position, this.eventHandlerElement, this.container)

        const newStyle = Object.assign({}, style, posStyle)

        Object.keys(newStyle).forEach(k => {
            this.element.style[k] = newStyle[k]
        })

        this.element.setAttribute('data-placement', position)
    }

    // 控制显示 force表示defaultVisible为true，用于强制显示
    handleShow = (_, force?: boolean) => {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout)
        }

        if (this.dismissTimeout) {
            clearTimeout(this.dismissTimeout)
        }

        this.handleInitDOM()

        if (this.state.show && !force) {
            // 处理Click的类型 点击Children收缩
            this.handleHide(0)

            return
        }

        if (typeof this.props.visible !== 'boolean') document.addEventListener('mousedown', this.clickAway)

        window.addEventListener('resize', this.handlePos)

        // 在受控的情况下 可能存在DOM的位置偏差 添加回调使位置正确
        requestAnimationFrame(() => {
            this.handlePos()

            this.setShow(true)
        })
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

        document.removeEventListener('mousedown', this.clickAway)

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
        const { onVisibleChange, mouseEnterDelay, mouseLeaveDelay, trigger } = this.props

        const delay = show ? mouseEnterDelay : mouseLeaveDelay

        this.delayTimeout = setTimeout(
            () => {
                if (onVisibleChange) onVisibleChange(show)

                if (show) {
                    this.element.style.display = 'block'

                    this.element.classList.remove(popoverClass('exit'))

                    this.element.classList.add(popoverClass('enter'))
                } else {
                    this.element.classList.remove(popoverClass('enter'))

                    this.element.classList.add(popoverClass('exit'))

                    this.dismissTimeout = setTimeout(() => {
                        this.element.style.display = 'none'
                    }, 250)
                }

                this.setState({ show })
            },
            trigger === 'hover' ? delay * 1000 : 0
        )
    }
}

export default React.memo(Popover)
