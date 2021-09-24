import classnames from 'classnames'
import { listClass } from '@/styles'
import { Component } from '@/utils/component'
import shallowEqual from '@/utils/shallowEqual'
import { docScroll } from '@/utils/dom/document'

interface AbsoluteListProps {
    focus?: boolean

    fixed?: boolean | string

    parentElement?: HTMLElement

    position?: string

    absolute?: boolean

    scrollElement?: HTMLElement

    scrollLeft?: number

    scrollTop?: number

    rootClass?: string

    zIndex?: number

    style?: React.CSSProperties

    autoClass?: string

    value?: any
}

interface AbsoluteListState {
    // 用于自动适应屏幕位置
    overDoc: number
}

let root: HTMLDivElement

const listPosition = ['drop-down', 'drop-up']

const pickerPosition = ['left-bottom', 'left-top', 'right-bottom', 'right-top']

const dropdownPosition = ['bottom-left', 'bottom-right', 'top-left', 'top-right']

const PICKER_V_MARGIN = 4

function initRoot() {
    root = document.createElement('div')

    root.classList.add(listClass('root'))

    document.body.appendChild(root)
}

function generateAbsoluteList(List: React.ReactElement) {
    class AbsoluteList extends Component<AbsoluteListProps, AbsoluteListState> {
        lastStyle: React.CSSProperties = {}

        element: HTMLDivElement

        listEl: HTMLDivElement

        adjustDoc = false

        getPosition(rect: DOMRect) {
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
                    style.top = rect.bottom + docScroll.top + PICKER_V_MARGIN
                } else {
                    style.top = rect.top + docScroll.top - PICKER_V_MARGIN
                    style.transform = style.transform ? 'translate(-100%, -100%)' : 'translateY(-100%)'
                }
            }
            return style
        }

        get style() {
            const { parentElement, scrollElement, focus } = this.props

            const lazyResult = { focus, style: this.lastStyle }

            if (!focus) return lazyResult

            let style = {}

            if (parentElement) {
                const rect = parentElement.getBoundingClientRect()

                const scrollRect: DOMRect = scrollElement ? scrollElement.getBoundingClientRect() : {}

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

            if (!props.absolute) return

            if (!root) initRoot()

            this.element = document.createElement('div')

            root.appendChild(this.element)
        }

        componentDidUpdate() {
            this.resetPosition()
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
                scrollLeft,
                scrollTop,
                scrollElement,
                autoClass,
                zIndex,
                value,
                ...props
            } = this.props

            const className = classnames(listClass('absolute-wrapper'), rootClass, autoClass)
        }

        renderList = () => {}

        resetPosition = () => {
            const { focus } = this.props

            if (!focus || !this.listEl || this.adjustDoc) return

            const pos = this.listEl.getBoundingClientRect()

            const overDoc = pos.left + pos.width

            if (this.state.overDoc === overDoc) return

            this.adjustDoc = true

            this.setState({ overDoc })
        }
    }
}

export default generateAbsoluteList
