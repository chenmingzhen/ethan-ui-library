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
    x: number

    y: number
}

export default curry(
    Origin =>
        class Resizable extends PureComponent<ResizableProps, ResizableState> {
            resizableId: string = getUidStr()

            appended: boolean = false

            active: string | undefined

            size: { width: number; height: number }

            el: HTMLDivElement

            handlers: Map<HTMLDivElement, (dir: any) => void> = new Map()

            constructor(props) {
                super(props)

                this.state = {
                    x: 0,
                    y: 0,
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
                const { x, y } = this.state

                if (!this.size) return undefined

                return {
                    width: this.size.width + x,
                    height: this.size.height + y,
                }
            }

            handleMouseUp() {
                this.active = undefined
                document.removeEventListener('mousemove', this.handleMouseMove)
                document.removeEventListener('mouseup', this.handleMouseUp)
                document.removeEventListener('mouseleave', this.handleMouseUp)
            }

            handleMouseMove(e: MouseEvent) {
                // 移动的值
                let x = e.movementX
                let y = e.movementY

                if (!this.active) return

                this.setState(
                    immer(draft => {
                        x += draft.x
                        y += draft.y
                        if (this.active.indexOf('e') >= 0) draft.x = x
                        if (this.active.indexOf('s') >= 0) draft.y = y
                    })
                )
            }

            handleMouseDown(dir) {
                this.active = dir

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

                const ms = Object.assign({}, style, this.getStyle())
                const mc = classnames(className, resizableClass('_', this.resizableId))

                return <Origin {...others} style={ms} className={mc} />
            }
        }
)
