import { colorPickerClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { COLOR_PICKER_DOT_LENGTH, PANEL_CANVAS_WIDTH } from './config'
import { HuePanelProps } from './type'

export interface HuePanelInstance {
    setHuePanelPosition(x: number): void
}

const HuePanel: React.ForwardRefRenderFunction<HuePanelInstance, HuePanelProps> = (props, ref) => {
    const [xPosition, updateXPosition] = useState<number>(0)

    const canvasRef = useRef<HTMLCanvasElement>()

    const ctxRef = useRef<CanvasRenderingContext2D>()

    const { onMouseMove } = props

    useEffect(() => {
        const canvas = canvasRef.current

        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        ctxRef.current = ctx

        const { width, height } = canvas

        const grd = ctx.createLinearGradient(0, 0, width, 0)

        const step = 1 / 360

        for (let i = 0; i <= 1; i += step) {
            grd.addColorStop(i, `hsl(${360 * i},100%,50%)`)
        }

        ctx.fillStyle = grd

        ctx.fillRect(0, 0, width, height)
    }, [])

    const setHuePanelPosition = useCallback((x: number) => {
        updateXPosition(x - COLOR_PICKER_DOT_LENGTH / 2)
    }, [])

    useImperativeHandle(ref, () => ({ setHuePanelPosition }))

    const handleMouseMove = useCallback((evt: MouseEvent) => {
        evt.stopPropagation()

        evt.preventDefault()

        const canvas = canvasRef.current

        const { width } = canvas

        const { left } = canvas.getBoundingClientRect()

        const x = getRangeValue({ current: evt.clientX - left, max: width })

        const hue = Math.round((x * 360) / width)

        updateXPosition(x - COLOR_PICKER_DOT_LENGTH / 2)

        onMouseMove(hue)
    }, [])

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
    }, [])

    function handleMouseDown(evt) {
        handleMouseMove(evt)

        document.addEventListener('mousemove', handleMouseMove)

        document.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <>
            <canvas
                ref={canvasRef}
                className={colorPickerClass('hue-panel')}
                width={PANEL_CANVAS_WIDTH}
                height={13}
                onMouseDown={handleMouseDown}
            />

            <span className={colorPickerClass('dot')} style={{ left: xPosition }} data-dot="hue" />
        </>
    )
}

export default React.memo(forwardRef(HuePanel))
