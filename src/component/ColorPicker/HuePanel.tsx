import { colorPickerClass } from '@/styles'
import { getRangeValue } from '@/utils/numbers'
import React, { useCallback, useRef, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import { COLOR_PICKER_DOT_LENGTH, PANEL_CANVAS_WIDTH } from './config'
import { useColorBoardEventPublish } from './context'
import { ColorBoardEventKey, HuePanelProps } from './type'

const HuePanel: React.FC<HuePanelProps> = (props) => {
    const { hue, onChange, isRgbPanelMoving, disabled } = props

    const [position, updatePosition] = useState<number>(0)

    const canvasRef = useRef<HTMLCanvasElement>()

    const ctxRef = useRef<CanvasRenderingContext2D>()

    /** 移动的过程中，使用Local的Hue，不是移动的过程中的时候,如果Prop的Hue为0，则使用Local的,否则使用Prop的 */
    /** 当Prop的Hue为0时候,(算法中:当S和L相同的时候，H会是0)，移动Hue的滑块时候，需要发布LocalHue改变的事件到RGBPanel的，让RGBPanel更新Hue  */
    const [localHue, updateLocalHue] = useState(hue)

    const publish = useColorBoardEventPublish()

    useIsomorphicLayoutEffect(() => {
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

    useIsomorphicLayoutEffect(() => {
        if (isRgbPanelMoving) return

        if (hue) {
            const huePosition = (PANEL_CANVAS_WIDTH * hue) / 360

            updateLocalHue(hue)

            updatePosition(huePosition - COLOR_PICKER_DOT_LENGTH / 2)
        } else {
            const huePosition = (PANEL_CANVAS_WIDTH * localHue) / 360

            updatePosition(huePosition - COLOR_PICKER_DOT_LENGTH / 2)
        }
    }, [hue, localHue])

    useIsomorphicLayoutEffect(() => {
        /** 如果HUE存在，则RGBPanel会自身响应HUE的改变 */
        if (hue) return

        /** 发送事件给RGBPanel，让RGBPanel改变HUE */
        publish(ColorBoardEventKey.OnHuePanelLocalHueChange, localHue)
    }, [hue, localHue])

    const handleMouseMove = useCallback(
        (evt: MouseEvent) => {
            if (disabled) return

            evt.stopPropagation()

            evt.preventDefault()

            const canvas = canvasRef.current

            const { width } = canvas

            const { left } = canvas.getBoundingClientRect()

            const x = getRangeValue({ current: evt.clientX - left, max: width })

            const h = Math.round((x * 360) / width)

            updateLocalHue(h)

            onChange(h)
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
                className={colorPickerClass('hue-panel')}
                width={PANEL_CANVAS_WIDTH}
                height={13}
                onMouseDown={handleMouseDown}
            />

            <span className={colorPickerClass('dot')} style={{ left: position }} data-dot="hue" />
        </>
    )
}

export default React.memo(HuePanel)
