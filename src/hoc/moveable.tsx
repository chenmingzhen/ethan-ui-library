import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { docSize } from '@/utils/dom/document'
import { moveableClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { curry } from '@/utils/func'

export interface MoveableProps {
    style?: React.CSSProperties

    className?: string

    moveable?: boolean
}

interface MoveableState {
    x: number

    y: number

    dragging: boolean
}

export default curry(
    (handler, Origin) =>
        class Moveable extends PureComponent<MoveableProps, MoveableState> {
            moveabledId: string = getUidStr()

            el: HTMLElement

            handlerPos: DOMRect

            startPos: { x: number; y: number } = { x: 0, y: 0 }

            constructor(props) {
                super(props)
                this.state = {
                    x: 0,
                    y: 0,
                    dragging: false,
                }
            }

            componentDidMount() {
                this.bindEvent()
            }

            componentWillUnmount() {
                if (this.el) {
                    this.el.removeEventListener('mousedown', this.handleMouseDown)
                }
            }

            bindEvent = () => {
                this.el = document.querySelector(`.${moveableClass(this.moveabledId)}`)

                if (!this.el) return

                this.el.addEventListener('mousedown', this.handleMouseDown)
            }

            handleMouseDown = (e: MouseEvent) => {
                // button 事件属性可返回一个整数，指示当事件被触发时哪个鼠标按键被点击。
                // https://www.w3school.com.cn/jsref/event_button.asp
                if (e.button !== 0 || !this.el) return
                // 拖拽handler才移动 Card的header
                // handler存在且该元素还是handler的子元素时才继续
                if (handler && !(e.target as HTMLElement).matches(handler)) return

                this.startPos = { x: e.clientX, y: e.clientY }

                document.addEventListener('mousemove', this.handleMouseMove)
                document.addEventListener('mouseup', this.handleMouseUp)
                document.addEventListener('mouseleave', this.handleMouseUp)

                if (!this.handlerPos) {
                    this.handlerPos = this.el.getBoundingClientRect()
                }

                this.setState({
                    dragging: true,
                })
            }

            handleMouseMove = (e: MouseEvent) => {
                const { x, y } = this.state

                const moveX = e.clientX - this.startPos.x
                const moveY = e.clientY - this.startPos.y

                this.startPos = { x: e.clientX, y: e.clientY }

                this.setState((prev) => {
                    let finalX = x + moveX
                    let finalY = y + moveY

                    if (
                        prev.x + moveX + this.handlerPos.left + this.handlerPos.width > docSize.width ||
                        prev.x + moveX + this.handlerPos.right - this.handlerPos.width < 0
                    ) {
                        finalX = prev.x
                    }

                    if (
                        prev.y + moveY + this.handlerPos.top + this.handlerPos.height > docSize.height ||
                        prev.y + moveY + this.handlerPos.bottom - this.handlerPos.height < 0
                    ) {
                        finalY = prev.y
                    }

                    return {
                        x: finalX,
                        y: finalY,
                    }
                })
            }

            handleMouseUp = () => {
                document.removeEventListener('mousemove', this.handleMouseMove)
                document.removeEventListener('mouseup', this.handleMouseUp)
                document.removeEventListener('mouseleave', this.handleMouseUp)

                this.setState({
                    dragging: false,
                })
            }

            getStyle = () => {
                const { x, y } = this.state

                if (!x && !y) return {}

                return {
                    transform: `translate(${x}px, ${y}px)`,
                }
            }

            render = () => {
                const { moveable, ...others } = this.props

                if (!moveable) return <Origin {...others} />

                const ms = Object.assign({}, this.props.style, this.getStyle())
                const mc = classnames(
                    this.props.className,
                    moveableClass('_', this.moveabledId, this.state.dragging && 'dragging')
                )

                return <Origin {...others} style={ms} className={mc} />
            }
        }
)
