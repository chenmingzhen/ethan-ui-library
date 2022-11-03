import { colorPickerClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import React, { useCallback, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import { COLOR_PICKER_DOT_LENGTH, PANEL_CANVAS_WIDTH } from './config'
import { AlphaPanelProps } from './type'

const AlphaPanel: React.FC<AlphaPanelProps> = (props) => {
    const [xPosition, updateXPosition] = useState<number>(0)

    const canvasRef = useRef<HTMLCanvasElement>()

    const ctxRef = useRef<CanvasRenderingContext2D>()

    const { onChange, alpha, h, s, l, disabled } = props

    useIsomorphicLayoutEffect(() => {
        const canvas = canvasRef.current

        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        ctxRef.current = ctx
    }, [])

    useIsomorphicLayoutEffect(() => {
        const alphaPosition = PANEL_CANVAS_WIDTH * (alpha ?? 1)

        updateXPosition(alphaPosition - COLOR_PICKER_DOT_LENGTH / 2)
    }, [alpha])

    useIsomorphicLayoutEffect(() => {
        const canvas = canvasRef.current

        const ctx = ctxRef.current

        const { width, height } = canvas

        const grd = ctx.createLinearGradient(0, 0, width, 0)

        ctx.clearRect(0, 0, width, height)

        grd.addColorStop(0, `hsla(${h},${s}%,${l}%,0)`)

        grd.addColorStop(1, `hsla(${h},${s}%,${l}%,1)`)

        ctx.fillStyle = grd

        ctx.fillRect(0, 0, width, height)
    }, [h, s, l])

    const handleMouseMove = useCallback(
        (evt: MouseEvent) => {
            if (disabled) return

            evt.stopPropagation()

            evt.preventDefault()

            const canvas = canvasRef.current

            const { width } = canvas

            const { left } = canvas.getBoundingClientRect()

            const x = getRangeValue({ current: evt.clientX - left, max: width })

            const a = +(x / width).toFixed(2)

            onChange(a)
        },
        [disabled]
    )

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
    }, [handleMouseMove])

    function handleMouseDown(evt) {
        handleMouseMove(evt)

        document.addEventListener('mousemove', handleMouseMove)

        document.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                className={colorPickerClass('alpha-panel')}
                width={PANEL_CANVAS_WIDTH}
                height={13}
                onMouseDown={handleMouseDown}
            />

            <span className={colorPickerClass('dot')} style={{ left: xPosition }} data-dot="alpha" />
        </>
    )
}

export default React.memo(AlphaPanel)
