import { colorPickerClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { COLOR_PICKER_DOT_LENGTH, PANEL_CANVAS_WIDTH } from './config'
import { HuePanelProps } from './type'

const HuePanel: React.FC<HuePanelProps> = props => {
    const [xPosition, updateXPosition] = useState<number>(0)

    const canvasRef = useRef<HTMLCanvasElement>()

    const ctxRef = useRef<CanvasRenderingContext2D>()

    const { hue, onChange } = props

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

    useEffect(() => {
        const huePosition = (PANEL_CANVAS_WIDTH * hue) / 360

        updateXPosition(huePosition - COLOR_PICKER_DOT_LENGTH / 2)
    }, [hue])

    const handleMouseMove = useCallback((evt: MouseEvent) => {
        evt.stopPropagation()

        evt.preventDefault()

        const canvas = canvasRef.current

        const { width } = canvas

        const { left } = canvas.getBoundingClientRect()

        const x = getRangeValue({ current: evt.clientX - left, max: width })

        const h = Math.round((x * 360) / width)

        onChange(h)
    }, [])

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
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

export default React.memo(HuePanel)
