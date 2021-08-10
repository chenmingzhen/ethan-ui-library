import React from 'react'
import { Component } from '@/utils/component'
import ReactDOM from 'react-dom'
import { getParent, wrapSpan } from '@/utils/dom/element'
import { getPositionStr, getPosition } from '@/utils/dom/popover'
import { popoverClass } from '@/styles/index'
import isDOMElement from '@/utils/dom/isDOMElement'

export interface PoptipProps {
    placement?: string

    title?: React.ReactNode

    content?: React.ReactNode

    confirm?: boolean

    dark?: boolean

    color?: string

    width?: number

    okText?: string

    cancelText?: string

    onVisibleChange?: (e: boolean) => void

    trigger?: 'click' | 'hover'

    visible?: boolean

    children: React.ReactElement

    style?: React.CSSProperties

    mouseEnterDelay?: number

    mouseLeaveDelay?: number

    chidlren?: React.ReactElement

    defaultVisible?: boolean

    getPopupContainer?: () => HTMLElement
}

interface PoptipState {
    show: boolean
}

class Poptip extends Component<PoptipProps, PoptipState> {
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

    static getDerivedStateFromProps(nextProps: PoptipProps, prevState: PoptipState) {
        return {
            show: nextProps.visible ?? prevState.show,
        }
    }

    constructor(props: PoptipProps) {
        super(props)

        this.state = {
            show: props.defaultVisible || props.visible,
        }
    }

    shouldComponentUpdate = (nextProps, nextState) => {
        if (this.state.show === true || nextState.show === true) return true

        return false
    }

    getSnapshotBeforeUpdate = (prevProps: PoptipProps) => {
        if (prevProps.trigger !== this.props.trigger) {
            this.bindEvents()
        }

        return null
    }

    componentDidMount = () => {
        super.componentDidMount()

        this.bindEvents()

        if (this.state.show) {
            this.handleShow(null, true)
        }
    }

    componentDidUpdate(prevProps, prevState: PoptipState) {
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

        if (!this.container) {
            return [
                <noscript ref={this.placeHolderRef} key="ns" />,
                React.cloneElement(<>{wrapChildren}</>, { key: children?.key ?? 'children' }),
            ]
        }

        return [
            <noscript ref={this.placeHolderRef} key="ns" />,
            React.cloneElement(<>{wrapChildren}</>, { key: children?.key ?? 'children' }),
            ReactDOM.createPortal(
                <>
                    <div className={popoverClass('arrow')}>
                        <div className={popoverClass('arrow-content')} />
                    </div>

                    <div className={popoverClass('inner')}>
                        <div className={popoverClass('title')}>{title}</div>

                        <div className={popoverClass('inner-content')}>{content}</div>
                    </div>
                </>,
                this.element
            ),
        ]
    }

    getContainer = () => {
        const { getPopupContainer } = this.props

        const container = getPopupContainer?.()

        if (container && isDOMElement(container)) {
            const child = document.createElement('div')
            // TODO
            child.setAttribute('style', ' position: absolute; top: 0px; left: 0px; width: 100% ')

            // appendChild 返回 child  非container
            // TODO 在指定容器中 有时候会计算位置错误
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

        // remove click handler
        this.eventHandlerElement.removeEventListener('click', this.handleShow)

        // remove hover handler
        this.element.removeEventListener('mouseenter', this.handleShow)
        this.element.removeEventListener('mouseleave', this.handleHide)

        // 受控不添加事件
        if (typeof visible === 'boolean') return

        if (trigger === 'hover') {
            this.eventHandlerElement.addEventListener('mouseenter', this.handleShow)
            this.eventHandlerElement.addEventListener('mouseleave', this.handleHide)
            this.element.addEventListener('mouseenter', this.handleShow)
            this.element.addEventListener('mouseleave', this.handleHide)
        } else {
            this.eventHandlerElement.addEventListener('click', this.handleShow)
            this.eventHandlerElement.removeEventListener('mouseenter', this.handleShow)
            this.eventHandlerElement.removeEventListener('mouseleave', this.handleHide)
        }
    }

    handlePos = () => {
        const { placement, style } = this.props

        const position = placement ?? getPositionStr(placement, null, this.placeHolderRef.current.parentElement)

        const posStyle = getPosition(position, this.eventHandlerElement, this.container)

        const newStyle = Object.assign({}, style, posStyle)

        Object.keys(newStyle).forEach(k => {
            this.element.style[k] = newStyle[k]
        })

        this.element.setAttribute('ethan-placement', position)
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

        if (this.state.show && !force) return

        if (typeof this.props.visible !== 'boolean') document.addEventListener('mousedown', this.clickAway)

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
        if (e && getParent(e.relatedTarget, popoverClass('_'))) return
        if (this.delayTimeout) clearTimeout(this.delayTimeout)

        document.removeEventListener('mousedown', this.clickAway)

        this.setShow(false)
    }

    clickAway = e => {
        if (this.eventHandlerElement.contains(e.target)) return
        if (this.element.contains(e.target)) return
        if (getParent(e.target, popoverClass('_'))) return

        this.handleHide(0)
    }

    setShow(show) {
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
                    }, 300)
                }

                this.setState({ show })
            },
            trigger === 'hover' ? delay * 1000 : 0
        )
    }
}

export default Poptip
