import React from 'react'
import { curry } from '@/utils/func'

export interface DraggableProps {
    client?: { x: number; y: number }

    onDragStart?: (start: boolean) => void

    onDrag?: (moveX: number, moveY: number, clientX: number, clientY: number) => void

    onDragEnd?: (start: boolean) => void
}

export default curry(Origin => {
    class Drag extends React.PureComponent<DraggableProps> {
        clientX: number

        clientY: number

        dragging = false

        componentDidMount() {
            const { client, onDragStart } = this.props

            if (client) {
                this.clientX = client.x
                this.clientY = client.y
                this.dragging = true

                this.addEvents()

                onDragStart?.(true)
            }
        }

        componentWillUnmount() {
            this.removeEvents()
        }

        addEvents = () => {
            document.addEventListener('mousemove', this.handleDrag)

            document.addEventListener('mouseup', this.handleDragEnd)
            document.addEventListener('mouseleave', this.handleDragEnd)
        }

        removeEvents = () => {
            document.removeEventListener('mousemove', this.handleDrag)

            document.removeEventListener('mouseup', this.handleDragEnd)
            document.removeEventListener('mouseleave', this.handleDragEnd)
        }

        handleDrag = (e: MouseEvent) => {
            if (!this.dragging) return

            if (e.clientX === 0 && e.clientY === 0) return

            const { onDrag } = this.props
            const mx = e.clientX - this.clientX
            const my = e.clientY - this.clientY

            if (mx === 0 && my === 0) return

            this.clientX = e.clientX
            this.clientY = e.clientY

            onDrag?.(mx, my, e.clientX, e.clientY)
        }

        handleDragStart = (e: React.MouseEvent<HTMLDivElement>) => {
            if (e.button !== 0) return

            const { onDragStart } = this.props

            this.clientX = e.clientX
            this.clientY = e.clientY

            this.dragging = true

            this.addEvents()

            onDragStart?.(true)
        }

        handleDragEnd = () => {
            if (!this.dragging) return

            const { onDragEnd } = this.props

            this.dragging = false

            this.removeEvents()

            onDragEnd?.(false)
        }

        render() {
            return <Origin {...this.props} onDragStart={this.handleDragStart} />
        }
    }

    return Drag
})
