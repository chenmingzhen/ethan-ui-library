import { colorPickerClass } from '@/styles'
import { rgbArray2HsvArray } from '@/utils/color'
import { getRangeValue } from '@/utils/numbers'
import React, { useRef, useState } from 'react'
import { useIsomorphicLayoutEffect, useShallowCompareEffect } from 'react-use'
import useRefMethod from '@/hooks/useRefMethod'
import { COLOR_PICKER_DOT_LENGTH, COLOR_EDGE_OFFSET } from './config'
import { useColorBoardEventSubscribe } from './context'
import { ColorBoardEventKey, RgbPanelProps } from './type'

const RgbPanel: React.FC<RgbPanelProps> = function (props) {
    const { rgb, onChange, hue, isRgbPanelMoving, onRgbPanelMoveChange, disabled } = props
    /** 在移动的过程中，使用自身组件的position，停止移动后，使用prop的rgb计算position(防止由于value的变动导致抖动) */
    const [position, updatePosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
    const paintElementRef = useRef<HTMLCanvasElement>()
    const ctxRef = useRef<CanvasRenderingContext2D>()

    useIsomorphicLayoutEffect(() => {
        const canvas = paintElementRef.current
        const ctx = canvas.getContext('2d', { willReadFrequently: true })
        ctxRef.current = ctx
    }, [])

    useShallowCompareEffect(() => {
        if (isRgbPanelMoving) return

        rgbToPosition(rgb)
    }, [rgb, isRgbPanelMoving])

    useIsomorphicLayoutEffect(() => {
        if (isRgbPanelMoving) return

        setRgbPanelHue(hue)
    }, [hue])

    const handleMouseMove = useRefMethod((evt: MouseEvent) => {
        if (disabled) return

        evt.stopPropagation()
        evt.preventDefault()

        onRgbPanelMoveChange(true)

        const canvas = paintElementRef.current
        const { width, height } = canvas
        const rect = canvas.getBoundingClientRect()
        const x = getRangeValue({ current: evt.clientX - rect.left, max: width - COLOR_EDGE_OFFSET })
        const y = getRangeValue({ current: evt.clientY - rect.top, max: height - COLOR_EDGE_OFFSET })
        const ctx = ctxRef.current
        const color = ctx.getImageData(x, y, 1, 1).data
        const positionX = x - COLOR_PICKER_DOT_LENGTH / 2
        const positionY = y - COLOR_PICKER_DOT_LENGTH / 2

        updatePosition({ x: positionX, y: positionY })

        onChange(color)
    })

    const handleMouseUp = useRefMethod(() => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)

        onRgbPanelMoveChange(false)
    })

    /** 设置色相 */
    const setRgbPanelHue = useRefMethod((h: number) => {
        const canvas = paintElementRef.current
        const ctx = ctxRef.current
        const { width, height } = canvas

        /** 新绘制的内容将绘制在已有内容的上方 */
        ctx.globalCompositeOperation = 'source-over'

        /** 上下黑白渐变 */
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

        // --------------------

        /** 颜色左右渐变 */
        const colorGradient = ctx.createLinearGradient(
            COLOR_EDGE_OFFSET,
            COLOR_EDGE_OFFSET,
            width - COLOR_EDGE_OFFSET,
            COLOR_EDGE_OFFSET
        )

        colorGradient.addColorStop(0, `hsla(${h},100%,50%,0)`)
        colorGradient.addColorStop(1, `hsla(${h},100%,50%,1)`)
        ctx.fillStyle = colorGradient

        /** 将现有像素颜色和新绘制的颜色相乘，这会使颜色变得更深，提供丰富的色彩混合效果。 */
        ctx.globalCompositeOperation = 'multiply'
        ctx.fillRect(0, 0, width, height)
    })

    useColorBoardEventSubscribe(ColorBoardEventKey.OnHuePanelLocalHueChange, setRgbPanelHue)

    const rgbToPosition = useRefMethod(([r, g, b]) => {
        const canvas = paintElementRef.current
        const { width, height } = canvas
        const [, s, v] = rgbArray2HsvArray([r, g, b])
        const x = s * width
        const y = height - v * height

        if (x >= 0 && y >= 0) {
            /** 让点的中心落在鼠标的顶部，减去dot自身宽高的一半 */
            const positionX = x - COLOR_PICKER_DOT_LENGTH / 2

            const positionY = y - COLOR_PICKER_DOT_LENGTH / 2

            updatePosition({ x: positionX, y: positionY })
        }
    })

    function handleMouseDown(evt) {
        handleMouseMove(evt)

        document.addEventListener('mousemove', handleMouseMove)
        document.addEventListener('mouseup', handleMouseUp)
    }

    return (
        <>
            <canvas
                width={255}
                height={136}
                ref={paintElementRef}
                onMouseDown={handleMouseDown}
                className={colorPickerClass('rgb-panel')}
            />

            <span className={colorPickerClass('dot')} style={{ left: position.x, top: position.y }} />
        </>
    )
}

export default React.memo(RgbPanel)
