import React from 'react'
import { Component } from '@/utils/component'
import ReactDOM from 'react-dom'
import { getParent, wrapSpan } from '@/utils/dom/element'
import { getPositionStr } from '@/utils/dom/popover'
import { popoverClass } from '@/styles/index'
import { getPosition } from './util'

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
}

interface PoptipState {
    show: boolean
}

// TODO 处理受控visible情况
class Poptip extends Component<PoptipProps, PoptipState> {
    static defaultProps = {
        trigger: 'hover',

        mouseEnterDelay: 0.1,

        mouseLeaveDelay: 0.1,
    }

    hasShow = false

    element = document.createElement('div')

    placeHolderRef = React.createRef<HTMLElement>()

    container: HTMLElement

    delayTimeout: NodeJS.Timeout

    dismissTimeout: NodeJS.Timeout

    get parentElement() {
        return this.placeHolderRef.current.nextElementSibling as HTMLElement
    }

    static getDerivedStateFromProps(nextProps: PoptipProps, prevState: PoptipState) {
        return {
            state: nextProps.visible ?? prevState.show,
        }
    }

    constructor(props: PoptipProps) {
        super(props)

        this.state = {
            show: props.visible,
        }
    }

    shouldComponentUpdate = (props, state) => {
        return state.show
    }

    getSnapshotBeforeUpdate = (prevProps: PoptipProps) => {
        if (prevProps.trigger !== this.props.trigger) {
            this.bindEvents()
        }

        return null
    }

    componentDidMount = () => {
        super.componentDidMount()

        this.container = document.body

        this.container.appendChild(this.element)

        this.bindEvents()

        this.element.style.display = 'none'

        this.element.className = popoverClass('_')

        this.forceUpdate()
    }

    componentWillUnmount = () => {
        super.componentWillUnmount()

        document.removeEventListener('mousedown', this.clickAway)

        if (this.element) {
            ReactDOM.unmountComponentAtNode(this.element.parentElement)

            this.container.removeChild(this.element)
        }
    }

    render = () => {
        const { children, title, content } = this.props

        const wrapChildren = typeof children === 'string' ? wrapSpan(children) : children

        if (!this.container && !this.hasShow) {
            return [
                <noscript ref={this.placeHolderRef} key="ns" />,
                React.cloneElement(<>{wrapChildren}</>, { key: children?.props?.key ?? 'children' }),
            ]
        }

        return [
            <noscript ref={this.placeHolderRef} key="ns" />,
            React.cloneElement(<>{wrapChildren}</>, { key: children?.props?.key ?? 'children' }),
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

    bindEvents = () => {
        const { trigger } = this.props

        if (trigger === 'hover') {
            this.parentElement.addEventListener('mouseenter', this.handleShow)
            this.parentElement.addEventListener('mouseleave', this.handleHide)
            this.element.addEventListener('mouseenter', this.handleShow)
            this.element.addEventListener('mouseleave', this.handleHide)

            // remove click handler
            this.parentElement.removeEventListener('click', this.handleShow)
        } else {
            this.parentElement.addEventListener('click', this.handleShow)
            this.parentElement.removeEventListener('mouseenter', this.handleShow)
            this.parentElement.removeEventListener('mouseleave', this.handleHide)

            // remove hover handler
            this.element.removeEventListener('mouseenter', this.handleShow)
            this.element.removeEventListener('mouseleave', this.handleHide)
        }
    }

    handlePos = () => {
        const { placement, style } = this.props

        const position = placement ?? getPositionStr(placement, null, this.parentElement)

        const posStyle = getPosition(position, this.placeHolderRef.current.nextElementSibling)

        const newStyle = Object.assign({}, style, posStyle)

        Object.keys(newStyle).forEach(k => {
            this.element.style[k] = newStyle[k]
        })

        this.element.setAttribute('ethan-placement', position)
    }

    handleShow = () => {
        if (this.delayTimeout) {
            clearTimeout(this.delayTimeout)
        }

        if (this.dismissTimeout) {
            clearTimeout(this.dismissTimeout)
        }

        if (this.state.show) return

        this.hasShow = true

        document.addEventListener('mousedown', this.clickAway)

        this.handlePos()

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
        if (e && getParent(e.relatedTarget, popoverClass('_'))) return
        if (this.delayTimeout) clearTimeout(this.delayTimeout)

        document.removeEventListener('mousedown', this.clickAway)

        this.setShow(false)
    }

    clickAway = e => {
        if (this.parentElement.contains(e.target)) return
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
