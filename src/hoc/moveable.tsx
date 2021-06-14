import React from 'react'
import classnames from 'classnames'
import { PureComponent } from '@/utils/component'
import { docSize } from '@/utils/dom/document'
import { moveableClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { curry } from '@/utils/func'

const DIS_LIMIT = 50

interface MoveableProps {
    style?: React.CSSProperties

    className?: string

    moveable?: boolean
}

interface MoveabledState {
    left: number

    top: number

    startPos: {
        x: number

        y: number
    }

    draging: boolean
}

export default curry(
    (handler, Origin) =>
        class Moveable extends PureComponent<MoveableProps, MoveabledState> {
            moveabledId: string = getUidStr()

            el: HTMLElement

            handlerEl: HTMLElement

            handlerPos: DOMRect

            constructor(props) {
                super(props)
                this.state = {
                    left: 0,
                    top: 0,
                    draging: false,
                    startPos: { x: 0, y: 0 },
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

                this.handlerEl = handler ? this.el.querySelector(handler) || this.el : this.el
            }

            handleMouseDown = (e: MouseEvent) => {
                // button 事件属性可返回一个整数，指示当事件被触发时哪个鼠标按键被点击。
                // https://www.w3school.com.cn/jsref/event_button.asp
                if (e.button !== 0 || !this.el) return

                // 拖拽handler才移动 Card的header
                // handler存在且该元素还是handler的子元素时才继续
                if (handler && !(e.target as HTMLElement).matches(handler)) return

                this.setState({ startPos: { x: e.clientX, y: e.clientY } })

                document.addEventListener('mousemove', this.handleMouseMove)
                document.addEventListener('mouseup', this.handleMouseUp)
                document.addEventListener('mouseleave', this.handleMouseUp)

                this.handlerPos = this.handlerEl.getBoundingClientRect()

                this.setState({
                    draging: true,
                })
            }

            // TODO 添加边界限制 优化移动速度 修复开启动画效果
            handleMouseMove = (e: MouseEvent) => {
                const { startPos, left, top } = this.state

                const moveX = e.clientX - startPos.x
                const moveY = e.clientY - startPos.y

                this.setState({
                    left: left + moveX,
                    top: top + moveY,
                    startPos: { x: e.clientX, y: e.clientY },
                })
            }

            handleMouseUp = () => {
                document.removeEventListener('mousemove', this.handleMouseMove)
                document.removeEventListener('mouseup', this.handleMouseUp)
                document.removeEventListener('mouseleave', this.handleMouseUp)

                this.setState({
                    draging: false,
                })
            }

            getStyle = () => {
                const { left, top } = this.state

                return {
                    transform: `translate(${left ?? 0}px, ${top ?? 0}px)`,
                }
            }

            render = () => {
                const { moveable, ...others } = this.props

                if (!moveable) return <Origin {...others} />

                const ms = Object.assign({}, this.props.style, this.getStyle())
                const mc = classnames(
                    this.props.className,
                    moveableClass('_', this.moveabledId, this.state.draging && 'draging')
                )

                return <Origin {...others} style={ms} className={mc} />
            }
        }
)
