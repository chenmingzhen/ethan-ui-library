import React, { useState } from 'react'
import { colorPickerClass } from '@/styles'
import classnames from 'classnames'
import { hslaArray2RgbaArray, rgbaArray2HslArray } from '@/utils/color'
import { isEmpty } from '@/utils/is'
import useRefMethod from '@/hooks/useRefMethod'
import { ColorBoardProps, ColorMode, OnModalPanelInputValueChangeParams } from './type'
import RgbPanel from './RgbPanel'
import HuePanel from './HuePanel'
import { DEFAULT_COLORS } from './config'
import AlphaPanel from './AlphaPanel'
import ModePanel from './ModePanel'
import { ColorBoardEventProvider } from './context'
import useColorValue from './hooks/useColorValue'

const ColorBoard: React.FC<ColorBoardProps> = (props) => {
    const { value, defaultValue, format = 'rgba', onChange, disabled, style, defaultColors = DEFAULT_COLORS } = props

    const [mode, updateMode] = useState<ColorMode>(() => {
        if (props.mode === 'hsla') return 'hsla'
        if (props.mode === 'hex') return 'hex'
        return 'rgba'
    })
    const [isRgbPanelMoving, updateRgbPanelMoving] = useState(false)
    const { colorModel, updateColorByModel, updateColor } = useColorValue({
        value,
        defaultValue,
        format,
        mode,
        onChange,
    })

    const handleRgbValueChange = useRefMethod((model: Uint8ClampedArray) => {
        if (disabled) return

        const [r, g, b] = model
        const [h, s, l] = rgbaArray2HslArray([r, g, b])

        updateColorByModel({
            r,
            g,
            b,
            a: colorModel.a,
            h,
            s,
            l,
        })
    })

    const handleHueValueChange = useRefMethod((h: number) => {
        if (disabled) return

        const { s, l, a } = colorModel
        const [r, g, b] = hslaArray2RgbaArray([h, s, l])

        updateColorByModel({
            r,
            g,
            b,
            a,
            h,
            s,
            l,
        })
    })

    const handleAlphaValueChange = useRefMethod((alpha: number) => {
        if (disabled) return

        updateColorByModel({
            ...colorModel,
            a: alpha,
        })
    })

    const handleModeInputChange = useRefMethod((params: OnModalPanelInputValueChangeParams) => {
        if (disabled) return

        updateColorByModel(params)
    })

    const { r, g, b, a, h, s, l } = colorModel

    const className = classnames(props.className, colorPickerClass('_', 'board'))

    return (
        <ColorBoardEventProvider>
            <div className={className} style={style}>
                <RgbPanel
                    onChange={handleRgbValueChange}
                    hue={h}
                    rgb={[r, g, b]}
                    isRgbPanelMoving={isRgbPanelMoving}
                    onRgbPanelMoveChange={updateRgbPanelMoving}
                    disabled={disabled}
                />

                {mode && (
                    <ModePanel
                        r={r}
                        g={g}
                        b={b}
                        a={a}
                        h={h}
                        s={s}
                        l={l}
                        mode={mode}
                        onModeChange={updateMode}
                        onInputValueChange={handleModeInputChange}
                        disabled={disabled}
                    />
                )}

                <div className={colorPickerClass('box')}>
                    <div className={colorPickerClass('circle')}>
                        <div
                            className={colorPickerClass('avatar')}
                            style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a ?? 1})` }}
                        />
                    </div>

                    <div className={colorPickerClass('panel-area')}>
                        <HuePanel
                            hue={h}
                            disabled={disabled}
                            onChange={handleHueValueChange}
                            isRgbPanelMoving={isRgbPanelMoving}
                        />
                        <AlphaPanel onChange={handleAlphaValueChange} alpha={a} h={h} s={s} l={l} disabled={disabled} />
                    </div>
                </div>

                {isEmpty(defaultColors) ? null : (
                    <div className={colorPickerClass('default-colors-panel')}>
                        {defaultColors.map((color, i) => (
                            <span key={i} style={{ backgroundColor: color }} onClick={() => updateColor(color)} />
                        ))}
                    </div>
                )}
            </div>
        </ColorBoardEventProvider>
    )
}

export default React.memo(ColorBoard)
