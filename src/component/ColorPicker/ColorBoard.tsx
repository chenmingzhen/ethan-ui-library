import React from 'react'
import { colorPickerClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import {
    hslArray2HslFormat,
    hslaArray2RgbaArray,
    parseColor,
    rgbaArray2HexFormat,
    rgbaArray2HslArray,
    rgbaArray2RgbFormat,
} from '@/utils/color'
import { isEmpty } from '@/utils/is'
import { ColorBoardProps, ColorBoardState, OnModalPanelInputValueChangeParams } from './type'
import RgbPanel from './RgbPanel'
import HuePanel from './HuePanel'
import { DEFAULT_COLORS } from './config'
import AlphaPanel from './AlphaPanel'
import ModePanel from './ModePanel'
import { getDefaultColor } from './util'
import { ColorBoardEventProvider } from './context'

class ColorBoard extends PureComponent<ColorBoardProps, ColorBoardState> {
    static defaultProps: ColorBoardProps = {
        defaultColors: DEFAULT_COLORS,

        format: 'rgba',
    }

    prevValue = this.props.value

    /** 是否受控 */
    get hasValue() {
        return 'value' in this.props && this.props.value !== undefined
    }

    constructor(props: ColorBoardProps) {
        super(props)

        let mode

        if (props.mode) {
            if (props.mode === 'hsla') {
                mode = 'hsla'
            } else if (props.mode === 'hex') {
                mode = 'hex'
            } else {
                mode = 'rgba'
            }
        }

        this.state = {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
            h: 0,
            s: 0,
            l: 0,
            mode,
            isRgbPanelMoving: false,
        }
    }

    componentDidMount() {
        const { value, defaultValue, format } = this.props

        this.handleColorValueChange(value || defaultValue || getDefaultColor(format), true)
    }

    componentDidUpdate(prevProps: ColorBoardProps) {
        if (this.props.value !== prevProps.value && this.props.value) {
            this.prevValue = prevProps.value

            this.handleColorValueChange(this.props.value, true)
        }
    }

    handleModeChange = (mode: ColorBoardState['mode']) => {
        this.setState({ mode })
    }

    handleColorValueChange = (value: string, propUpdate?: boolean) => {
        const rgbaArray = parseColor(value as string)

        if (!rgbaArray) return

        const [r, g, b, a = 1] = rgbaArray

        const [h, s, l] = rgbaArray2HslArray([r, g, b, a])

        if (propUpdate || (!this.hasValue && !this.props.disabled)) {
            this.setState({ r, g, b, a, h, s, l })
        }

        if (!propUpdate && !this.props.disabled) {
            this.dispatchPropChange([r, g, b, a, h, s, l])
        }
    }

    handleRgbValueChange = (value: Uint8ClampedArray) => {
        if (this.props.disabled) return

        const [r, g, b] = value as Uint8ClampedArray
        const [h, s, l] = rgbaArray2HslArray([r, g, b])

        if (!this.hasValue) {
            this.setState({ r, g, b, h, s, l })
        }

        this.dispatchPropChange([r, g, b, this.state.a, h, s, l])
    }

    handleHueValueChange = (h: number) => {
        if (this.props.disabled) return

        const { s, l } = this.state

        const [r, g, b] = hslaArray2RgbaArray([h, s, l])

        if (!this.hasValue) {
            this.setState({ r, g, b, h, s, l })
        }

        this.dispatchPropChange([r, g, b, this.state.a, h, s, l])
    }

    handleAlphaValueChange = (alpha: number) => {
        if (this.props.disabled) return

        const { r, g, b, h, s, l } = this.state

        if (!this.hasValue) {
            this.setState({ a: alpha })
        }

        this.dispatchPropChange([r, g, b, alpha, h, s, l])
    }

    dispatchPropChange = ([r, g, b, a, h, s, l]: [number, number, number, number, number, number, number]) => {
        const { format, onChange } = this.props

        const { mode } = this.state

        if (!onChange) return

        let value = ''

        if (!format) {
            if (mode === 'hex') {
                value = rgbaArray2HexFormat([r, g, b, a])
            } else if (mode === 'hsla') {
                value = hslArray2HslFormat([h, s, l, a])
            } else {
                value = rgbaArray2RgbFormat([r, g, b, a])
            }
        } else if (format === 'hex') {
            value = rgbaArray2HexFormat([r, g, b, a])
        } else if (format === 'hsla') {
            value = hslArray2HslFormat([h, s, l, a])
        } else {
            value = rgbaArray2RgbFormat([r, g, b, a])
        }

        if (this.hasValue) {
            if (value !== this.props.value) {
                onChange(value)
            }
        } else if (value !== this.prevValue) {
            this.prevValue = value
            onChange(value)
        }
    }

    handleDefaultColorSpanClick = (color: string) => {
        this.handleColorValueChange(color)
    }

    handleModeInputChange = (params: OnModalPanelInputValueChangeParams) => {
        if (this.props.disabled) return

        const { r, g, b, a, h, s, l } = params

        if (!this.hasValue) {
            this.setState({ ...params })
        }

        this.dispatchPropChange([r, g, b, a, h, s, l])
    }

    handleRgbPanelMoveChange = (isRgbPanelMoving: boolean) => {
        this.setState({ isRgbPanelMoving })
    }

    renderDefaultColors = () => {
        const { defaultColors } = this.props

        if (isEmpty(defaultColors)) return null

        return (
            <div className={colorPickerClass('default-colors-panel')}>
                {defaultColors.map((color, i) => (
                    <span
                        key={i}
                        style={{ backgroundColor: color }}
                        onClick={this.handleDefaultColorSpanClick.bind(this, color)}
                    />
                ))}
            </div>
        )
    }

    render() {
        const { style, disabled } = this.props

        const { r, g, b, a, h, s, l, mode, isRgbPanelMoving } = this.state

        const className = classnames(this.props.className, colorPickerClass('_', 'board'))

        return (
            <ColorBoardEventProvider>
                <div className={className} style={style}>
                    <RgbPanel
                        onChange={this.handleRgbValueChange}
                        hue={h}
                        rgb={[r, g, b]}
                        isRgbPanelMoving={isRgbPanelMoving}
                        onRgbPanelMoveChange={this.handleRgbPanelMoveChange}
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
                            onModeChange={this.handleModeChange}
                            onInputValueChange={this.handleModeInputChange}
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
                                onChange={this.handleHueValueChange}
                                hue={h}
                                isRgbPanelMoving={isRgbPanelMoving}
                                disabled={disabled}
                            />
                            <AlphaPanel
                                onChange={this.handleAlphaValueChange}
                                alpha={a}
                                h={h}
                                s={s}
                                l={l}
                                disabled={disabled}
                            />
                        </div>
                    </div>

                    {this.renderDefaultColors()}
                </div>
            </ColorBoardEventProvider>
        )
    }
}

export default ColorBoard
