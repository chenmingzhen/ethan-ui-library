import { colorPickerClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { COLOR_PICKER_DOT_LENGTH, PANEL_CANVAS_WIDTH } from './config'
import { AlphaPanelProps } from './type'

export interface AlphaPanelInstance {
    setAlphaPanelHsl(hsl: number[]): void

    setAlphaPanelPosition(x: number): void
}

const AlphaPanel: React.ForwardRefRenderFunction<AlphaPanelInstance, AlphaPanelProps> = (props, ref) => {
    const [xPosition, updateXPosition] = useState<number>(0)

    const canvasRef = useRef<HTMLCanvasElement>()

    const ctxRef = useRef<CanvasRenderingContext2D>()

    const { onMouseMove, onMouseUp } = props

    const setAlphaPanelHsl = useCallback(([h, s, l]) => {
        const canvas = canvasRef.current

        const ctx = ctxRef.current

        const { width, height } = canvas

        const grd = ctx.createLinearGradient(0, 0, width, 0)

        ctx.clearRect(0, 0, width, height)

        grd.addColorStop(0, `hsla(${h},${s}%,${l}%,0)`)

        grd.addColorStop(1, `hsla(${h},${s}%,${l}%,1)`)

        ctx.fillStyle = grd

        ctx.fillRect(0, 0, width, height)
    }, [])

    useEffect(() => {
        const canvas = canvasRef.current

        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        ctxRef.current = ctx
    }, [])

    const handleMouseMove = useCallback((evt: MouseEvent) => {
        evt.stopPropagation()

        evt.preventDefault()

        const canvas = canvasRef.current

        const { width } = canvas

        const { left } = canvas.getBoundingClientRect()

        const x = getRangeValue({ current: evt.clientX - left, max: width })

        const alpha = +(x / width).toFixed(2)

        updateXPosition(x - COLOR_PICKER_DOT_LENGTH / 2)

        onMouseMove(alpha)
    }, [])

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)

        onMouseUp()
    }, [])

    const setAlphaPanelPosition = useCallback((x: number) => {
        updateXPosition(x - COLOR_PICKER_DOT_LENGTH / 2)
    }, [])

    function handleMouseDown(evt) {
        handleMouseMove(evt)

        document.addEventListener('mousemove', handleMouseMove)

        document.addEventListener('mouseup', handleMouseUp)
    }

    useImperativeHandle(ref, () => ({ setAlphaPanelHsl, setAlphaPanelPosition }))

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

export default React.memo(forwardRef(AlphaPanel))
