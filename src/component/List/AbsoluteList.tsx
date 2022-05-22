import React from 'react'
import ReactDOM from 'react-dom'
import classnames from 'classnames'
import { listClass } from '@/styles'
import { Component } from '@/utils/component'
import shallowEqual from '@/utils/shallowEqual'
import { docScroll, docSize } from '@/utils/dom/document'
import { InjectComponent } from '@/utils/utilityTypes'
import { ListProps } from '.'

export interface AbsoluteListProps extends Omit<ListProps, 'show'> {
    focus: boolean

    fixed?: boolean | 'min'

    parentElement?: HTMLElement

    position?: string

    absolute?: boolean

    scrollElement?: HTMLElement

    /** 传送门的类名 */
    rootClass?: string

    style?: React.CSSProperties

    autoClass?: string

    zIndex?: number

    /** 传入List的业务Props */
    [pass: string]: any
}

interface AbsoluteListState {
    // 用于自动适应屏幕位置
    overDoc: boolean
}

interface GenerateAbsoluteListProps
    extends Omit<
        AbsoluteListProps,
        'fixed' | 'parentElement' | 'position' | 'absolute' | 'scrollElement' | 'rootClass' | 'autoClass' | 'zIndex'
    > {
    focus: boolean
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

function generateAbsoluteList(ListComponent: InjectComponent<GenerateAbsoluteListProps>) {
    class AbsoluteList extends Component<AbsoluteListProps, AbsoluteListState> {
        lastStyle: React.CSSProperties = {}

        element: HTMLDivElement

        listEl: HTMLDivElement

        adjustDoc = false

        get style() {
            const { parentElement, scrollElement, focus } = this.props

            const lazyResult = { focus, style: this.lastStyle }

            if (!focus) return lazyResult

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
                    return { focus: false, style: this.lastStyle }
                }

                style = this.getPosition(rect)
            }

            if (shallowEqual(style, this.lastStyle)) return lazyResult

            this.lastStyle = style

            return { focus, style }
        }

        constructor(props: AbsoluteListProps) {
            super(props)

            this.state = {
                overDoc: false,
            }

            if (!props.absolute) return

            if (!root) initRoot()

            this.element = document.createElement('div')

            root.appendChild(this.element)
        }

        componentDidUpdate() {
            this.resetPosition()
        }

        componentWillUnmount() {
            if (this.element) {
                root.removeChild(this.element)
            }
        }

        render = () => {
            if (!this.props.absolute) {
                return this.renderList()
            }

            const {
                parentElement,
                rootClass,
                absolute,
                position,
                scrollElement,
                autoClass,
                fixed,
                zIndex,
                ...props
            } = this.props

            const className = classnames(listClass('absolute-wrapper'), rootClass, autoClass)

            const { focus, style } = props.focus ? this.style : { style: this.lastStyle, focus: undefined }

            this.element.className = className

            const mergeStyle = Object.assign(
                { zIndex },
                style,
                props.style,
                this.state.overDoc ? { right: 0, left: 'auto' } : undefined
            )

            return ReactDOM.createPortal(
                <ListComponent getRef={this.bindListRef} {...props} focus={focus} style={mergeStyle} />,
                this.element
            )
        }

        renderList = () => {
            const {
                parentElement,
                absolute,
                focus,
                rootClass,
                position,
                scrollElement,
                style = {},
                zIndex,
                ...props
            } = this.props

            const mergeStyle = Object.assign(
                { zIndex },
                style,
                this.state.overDoc ? { right: 0, left: 'auto' } : undefined
            )

            return <ListComponent getRef={this.bindListRef} {...props} focus={focus} style={mergeStyle} />
        }

        /** 若传入getRef，则不处理AbsoluteList内的List样式，由上层组件自行处理 */
        resetPosition = () => {
            const { focus } = this.props

            if (!focus || !this.listEl) return

            const pos = this.listEl.getBoundingClientRect()

            const overDoc = Math.abs(pos.left) + pos.width > docSize.width

            if (this.state.overDoc === overDoc) return

            this.setState({ overDoc })
        }

        getPosition = (rect: DOMRect): React.CSSProperties => {
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

        bindListRef = listEl => {
            this.listEl = listEl
        }
    }

    return AbsoluteList
}

export default generateAbsoluteList
