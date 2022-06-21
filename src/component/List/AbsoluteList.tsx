import React, { isValidElement } from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { listClass } from '@/styles'
import { Component } from '@/utils/component'
import { docScroll, docSize } from '@/utils/dom/document'

export interface AbsoluteListProps {
    focus: boolean

    fixed?: boolean | 'min'

    getParentElement?: () => HTMLElement

    /** AbsoluteList下的List实例，如果传入，则由此组件控制计算溢出屏幕的style */
    getListElement?: () => HTMLElement

    position?: string

    absolute?: boolean

    getScrollElement?: () => HTMLElement

    /** 传送门的类名 */
    rootClass?: string

    style?: React.CSSProperties

    zIndex?: number

    children:
        | ((params: { style: React.CSSProperties; overDoc?: boolean; resetPosition: () => void }) => React.ReactNode)
        | React.ReactNode
}

interface AbsoluteListState {
    // 用于自动适应屏幕位置
    overDoc: boolean
}

let root: HTMLDivElement

const listPosition = ['drop-down', 'drop-up']

const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']

const dropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

const REDUNDANT = 4

function initRoot() {
    root = document.createElement('div')

    root.className = 'ethan-absolute-root'

    document.body.appendChild(root)
}

export default class AbsoluteList extends Component<AbsoluteListProps, AbsoluteListState> {
    adjustDoc = false

    lastStyle: React.CSSProperties = {}

    element: HTMLDivElement

    constructor(props) {
        super(props)

        this.state = {
            overDoc: false,
        }

        if (!props.absolute) return

        if (!root) initRoot()

        this.element = document.createElement('div')

        root.appendChild(this.element)
    }

    get parentElement() {
        return this.props.getParentElement?.()
    }

    get scrollElement() {
        return this.props.getScrollElement?.()
    }

    get listElement() {
        return this.props.getListElement?.()
    }

    get style() {
        const { focus } = this.props

        const { parentElement, scrollElement } = this

        if (!focus) return this.lastStyle

        let style: React.CSSProperties = {}

        if (parentElement) {
            const rect = parentElement.getBoundingClientRect()

            const scrollRect = scrollElement ? scrollElement.getBoundingClientRect() : ({} as DOMRect)

            // parentElement被滚动元素遮挡 不计算位置
            if (
                rect.bottom < scrollRect.top ||
                rect.top > scrollRect.bottom ||
                rect.right < scrollRect.left ||
                rect.left > scrollRect.right
            ) {
                return this.lastStyle
            }

            style = this.getPosition(rect)
        }

        this.lastStyle = style

        return style
    }

    getPosition = (rect: DOMRect) => {
        const { fixed } = this.props

        let { position } = this.props

        const style: React.CSSProperties = {
            position: 'absolute',
        }

        if (fixed) {
            const widthKey = fixed === 'min' ? 'minWidth' : 'width'

            style[widthKey] = rect.width
        }

        if (dropdownPosition.includes(position)) {
            position = position
                .split('-')
                .reverse()
                .join('-')
        }

        if (listPosition.includes(position)) {
            style.left = rect.left + docScroll.left

            if (position === 'drop-down') {
                style.top = rect.top + rect.height + docScroll.top
            } else {
                style.bottom = -(rect.top + docScroll.top)
            }
        } else if (pickerPosition.includes(position)) {
            const [h, v] = position.split('-')

            if (h === 'left') {
                style.left = rect.left + docScroll.left
            } else {
                style.left = rect.right + docScroll.left

                style.transform = 'translateX(-100%)'
            }

            if (v === 'bottom') {
                style.top = rect.bottom + docScroll.top + REDUNDANT
            } else {
                style.top = rect.top + docScroll.top - REDUNDANT

                style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
            }
        }
        return style
    }

    resetPosition = () => {
        const { focus } = this.props

        const { listElement } = this

        if (!focus || !listElement) return

        const pos = listElement.getBoundingClientRect()

        /** @todo 这里考虑使用parentElement的left 参照Cascader的reset */
        const overDoc = Math.abs(pos.left) + pos.width > docSize.width

        if (this.state.overDoc === overDoc) return

        this.setState({ overDoc })
    }

    componentDidUpdate() {
        this.resetPosition()
    }

    componentWillUnmount() {
        if (this.element) {
            root.removeChild(this.element)
        }
    }

    renderChildren = () => {
        const { zIndex, children, absolute } = this.props

        const ms = Object.assign(
            { zIndex },
            this.style,
            this.props.style,
            this.state.overDoc ? { right: 0, left: 'auto' } : undefined
        )

        if (typeof children === 'function') {
            return children({
                style: absolute ? ms : this.props.style,
                overDoc: this.state.overDoc,
                resetPosition: this.resetPosition,
            })
        }

        if (isValidElement(children)) {
            return React.cloneElement(children, { style: absolute ? ms : this.props.style })
        }

        throw new Error('Expect children is a validElement')
    }

    render() {
        const { rootClass, absolute } = this.props

        if (!absolute) {
            return this.renderChildren()
        }

        const className = classnames(listClass('absolute-wrapper'), rootClass)

        this.element.className = className

        return ReactDOM.createPortal(<>{this.renderChildren()}</>, this.element)
    }
}
