import { colorPickerClass } from '@/styles'
import { rgbArray2HsvArray } from '@/utils/color'
import { getRangeValue } from '@/utils/numbers'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { COLOR_PICKER_DOT_LENGTH, COLOR_EDGE_OFFSET } from './config'
import { RgbPanelProps } from './type'

export interface RgbPanelInstance {
    setRgbPanelHue(hue: number): void

    rgbToPosition(arr: [number, number, number]): void
}

const RgbPanel: React.ForwardRefRenderFunction<RgbPanelInstance, RgbPanelProps> = function(props, ref) {
    const { onMouseMove, onInit, onMouseUp } = props

    const [dotPosition, updateDotPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })

    const paintElementRef = useRef<HTMLCanvasElement>()

    const ctxRef = useRef<CanvasRenderingContext2D>()

    const handleMouseMove = useCallback((evt: MouseEvent) => {
        evt.stopPropagation()

        evt.preventDefault()

        const canvas = paintElementRef.current

        const { width, height } = canvas

        const rect = canvas.getBoundingClientRect()

        const x = getRangeValue({ current: evt.clientX - rect.left, max: width - COLOR_EDGE_OFFSET })

        const y = getRangeValue({ current: evt.clientY - rect.top, max: height - COLOR_EDGE_OFFSET })

        const ctx = ctxRef.current

        /** 让点的中心落在鼠标的顶部，减去dot自身宽高的一半 */
        const positionX = x - COLOR_PICKER_DOT_LENGTH / 2
        const positionY = y - COLOR_PICKER_DOT_LENGTH / 2

        const color = ctx.getImageData(x, y, 1, 1).data

        onMouseMove(color)

        updateDotPosition({ x: positionX, y: positionY })
    }, [])

    const handleMouseUp = useCallback(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)

        onMouseUp()
    }, [])

    /** 设置色相 */
    const setRgbPanelHue = useCallback((hue: number) => {
        const canvas = paintElementRef.current

        const ctx = ctxRef.current

        const { width, height } = canvas

        addVerticalWhite2BlackLinearGradient()

        /** 添加左右渐变 */
        // const colorGradient = ctx.createLinearGradient(0, 0, width, 0)
        const colorGradient = ctx.createLinearGradient(
            COLOR_EDGE_OFFSET,
            COLOR_EDGE_OFFSET,
            width - COLOR_EDGE_OFFSET,
            COLOR_EDGE_OFFSET
        )

        colorGradient.addColorStop(0, `hsla(${hue},100%,50%,0)`)

        colorGradient.addColorStop(1, `hsla(${hue},100%,50%,1)`)

        ctx.fillStyle = colorGradient

        ctx.globalCompositeOperation = 'multiply'

        ctx.fillRect(0, 0, width, height)

        ctx.globalCompositeOperation = 'source-over'
    }, [])

    const rgbToPosition = useCallback(([r, g, b]) => {
        const canvas = paintElementRef.current

        const { width, height } = canvas

        const [, s, v] = rgbArray2HsvArray([r, g, b])

        const x = s * width

        const y = height - v * height

        if (x >= 0 && y >= 0) {
            const positionX = x - COLOR_PICKER_DOT_LENGTH / 2

            const positionY = y - COLOR_PICKER_DOT_LENGTH / 2

            updateDotPosition({ x: positionX, y: positionY })
        }
    }, [])

    /** @see https://www.jc2182.com/html/html-canvas-createlineargradient-method.html */
    function addVerticalWhite2BlackLinearGradient() {
        const canvas = paintElementRef.current

        const ctx = ctxRef.current

        const { height, width } = canvas

        /** 先添加上下黑白渐变 */
        // const grd = ctx.createLinearGradient(0, 0, 0, height)
        const grd = ctx.createLinearGradient(
            COLOR_EDGE_OFFSET,
            COLOR_EDGE_OFFSET,
            COLOR_EDGE_OFFSET,
            height - COLOR_EDGE_OFFSET
        )

        grd.addColorStop(0, 'white')

        grd.addColorStop(1, 'black')

        ctx.fillStyle = grd

        ctx.fillRect(0, 0, width, height)
    }

    useEffect(() => {
        const canvas = paintElementRef.current

        const ctx = canvas.getContext('2d', { willReadFrequently: true })

        ctxRef.current = ctx

        addVerticalWhite2BlackLinearGradient()

        onInit()
    }, [])

    useImperativeHandle(ref, () => ({ setRgbPanelHue, rgbToPosition }))

    function handleMouseDown(evt) {
        handleMouseMove(evt)

        document.addEventListener('mousemove', handleMouseMove)

        document.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <>
            <canvas
                className={colorPickerClass('rgb-panel')}
                width={255}
                height={136}
                ref={paintElementRef}
                onMouseDown={handleMouseDown}
            />

            <span className={colorPickerClass('dot')} style={{ left: dotPosition.x, top: dotPosition.y }} />
        </>
    )
}

export default React.memo(forwardRef(RgbPanel))
