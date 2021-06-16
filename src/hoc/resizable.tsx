import React from 'react'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import immer from 'immer'
import { resizableClass } from '@/styles'
import { getUidStr } from '@/utils/uid'
import { curry } from '@/utils/func'

interface ResizableProps {
    style?: React.CSSProperties

    className?: string

    resizable?: boolean

    [rest: string]: any
}

interface ResizableState {
    /* 移动过程的X轴的值 */
    movementX: number
    /* 移动过程的Y轴的值 */
    movementY: number
    /* 起始clientX与clientY */
    startPos: { x: number; y: number }
    /* 拖拽的X轴的总长度 */
    left: number
    /* 拖拽的YY轴的总长度 */
    top: number
}

export default curry(
    Origin =>
        class Resizable extends PureComponent<ResizableProps, ResizableState> {
            resizableId: string = getUidStr()

            appended = false

            active: string | undefined

            size: { width: number; height: number }

            el: HTMLDivElement

            handlers: Map<HTMLDivElement, (dir: any) => void> = new Map()

            constructor(props) {
                super(props)

                this.state = {
                    movementX: 0,
                    movementY: 0,
                    startPos: { x: 0, y: 0 },
                    left: 0,
                    top: 0,
                }
                this.handleMouseUp = this.handleMouseUp.bind(this)
                this.handleMouseMove = this.handleMouseMove.bind(this)
            }

            componentDidMount() {
                this.appendHandler()
            }

            componentDidUpdate() {
                if (this.props.resizable) {
                    this.appendHandler()
                }
            }

            componentWillUnmount() {
                this.handlers?.forEach((action, handler) => handler.removeEventListener('mousedown', action))

                this.handlers.clear()
            }

            getStyle() {
                const { movementX, movementY, left, top } = this.state

                if (!this.size) return undefined

                // 由于Left与Top在移动过程中不更新
                // 所以需要加上当前移动的值
                // 在停止移动后 移动值为0 Left与Top为最新的值
                return {
                    width: this.size.width + movementX + left,
                    height: this.size.height + movementY + top,
                }
            }

            handleMouseUp() {
                this.active = undefined

                const { movementX, movementY, left, top } = this.state

                this.setState({
                    left: movementX + left,
                    top: movementY + top,
                    movementX: 0,
                    movementY: 0,
                })

                document.removeEventListener('mousemove', this.handleMouseMove)
                document.removeEventListener('mouseup', this.handleMouseUp)
                document.removeEventListener('mouseleave', this.handleMouseUp)
            }

            handleMouseMove(e: MouseEvent) {
                if (!this.active) return

                const moveX = e.clientX - this.state.startPos.x
                const moveY = e.clientY - this.state.startPos.y

                this.setState(
                    immer((draft: ResizableState) => {
                        if (this.active.indexOf('e') >= 0) draft.movementX = moveX
                        if (this.active.indexOf('s') >= 0) draft.movementY = moveY
                    })
                )
            }

            handleMouseDown(dir, e) {
                this.active = dir

                this.setState({ startPos: { x: e.clientX, y: e.clientY } })

                document.addEventListener('mousemove', this.handleMouseMove)
                document.addEventListener('mouseup', this.handleMouseUp)
                document.addEventListener('mouseleave', this.handleMouseUp)
            }

            appendHandler() {
                const { resizable } = this.props

                if (!resizable || this.appended) return

                this.appended = true

                this.el = document.querySelector(`.${resizableClass(this.resizableId)}`)

                if (!this.el) return

                this.size = {
                    width: this.el.clientWidth,
                    height: this.el.clientHeight,
                }
                ;['e', 's', 'se'].forEach(dir => {
                    const handler = document.createElement('div')
                    const action = this.handleMouseDown.bind(this, dir)

                    handler.className = resizableClass('handler', `handler-${dir}`)
                    handler.addEventListener('mousedown', action)
                    this.el.appendChild(handler)
                    this.handlers.set(handler, action)
                })
            }

            render() {
                const { resizable, className, style, ...others } = this.props
                if (!resizable) return <Origin {...this.props} />

                // 推拽模式下 只有设置position absolute 宽高才能往左与下延申
                const position: React.CSSProperties = { position: 'absolute' }
                const ms: React.CSSProperties = Object.assign({}, style, this.getStyle(), position)
                const mc = classnames(className, resizableClass('_', this.resizableId, this.active && 'resize'))

                return <Origin {...others} style={ms} className={mc} />
            }
        }
)
