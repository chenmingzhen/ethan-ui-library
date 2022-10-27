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
import RgbPanel, { RgbPanelInstance } from './RgbPanel'
import HuePanel, { HuePanelInstance } from './HuePanel'
import { DEFAULT_COLORS, PANEL_CANVAS_WIDTH } from './config'
import AlphaPanel, { AlphaPanelInstance } from './AlphaPanel'
import ModePanel from './ModePanel'

class ColorBoard extends PureComponent<ColorBoardProps, ColorBoardState> {
    static defaultProps = {
        position: 'left-bottom',

        defaultColors: DEFAULT_COLORS,
    }

    rgbPanelInstanceRef = React.createRef<RgbPanelInstance>()

    huePanelInstanceRef = React.createRef<HuePanelInstance>()

    alphaPanelInstanceRef = React.createRef<AlphaPanelInstance>()

    prevPropValue = null

    get hasValue() {
        return 'value' in this.props && this.props.value !== undefined
    }

    constructor(props: ColorBoardProps) {
        super(props)

        const { value, defaultValue, format } = props

        this.state = {
            r: 0,
            g: 0,
            b: 0,
            a: 1,
            h: 0,
            s: 0,
            l: 0,
            currentValue: value ?? defaultValue ?? '#FF0000',
            locking: false,
            mode: format || 'rgba',
        }

        this.prevPropValue = value ?? defaultValue ?? null
    }

    componentDidMount() {
        this.handleColorValueChange(this.state.currentValue)

        if (this.state.currentValue !== this.props.value && this.props.onChange) {
            this.props.onChange(this.state.currentValue)
        }
    }

    componentDidUpdate() {
        /**
         * 下面的情况，不允许props的value改变state中的currentValue
         * 1.面板处于拖动中
         * 2.鼠标点下（未抬起）默认值的时候
         */
        if (!this.state.locking && this.props.value && this.props.value !== this.state.currentValue) {
            this.handleColorValueChange(this.props.value)
        }
    }

    updatePosition = () => {
        const { r, g, b, h, a } = this.state

        const huePosition = (PANEL_CANVAS_WIDTH * h) / 360

        const alphaPosition = PANEL_CANVAS_WIDTH * (a ?? 1)

        this.huePanelInstanceRef.current.setHuePanelPosition(huePosition)

        this.rgbPanelInstanceRef.current.rgbToPosition([r, g, b])

        this.alphaPanelInstanceRef.current.setAlphaPanelPosition(alphaPosition)
    }

    setCurrentValue = ([r, g, b, a]: number[]) => {
        const { format } = this.props

        const { mode } = this.state

        let currentValue = ''

        if (!format) {
            if (mode === 'hex') {
                const hex = rgbaArray2HexFormat([r, g, b, a])

                currentValue = hex
            } else if (mode === 'hsla') {
                currentValue = hslArray2HslFormat(rgbaArray2HslArray([r, g, b, a]))
            } else {
                currentValue = rgbaArray2RgbFormat([r, g, b, a])
            }
        } else if (format === 'hex') {
            const hex = rgbaArray2HexFormat([r, g, b, a])

            currentValue = hex
        } else if (format === 'hsla') {
            currentValue = hslArray2HslFormat(rgbaArray2HslArray([r, g, b, a]))
        } else {
            currentValue = rgbaArray2RgbFormat([r, g, b, a])
        }

        this.setState({ currentValue })
    }

    handleModeChange = (mode: ColorBoardState['mode']) => {
        this.setState({ mode })
    }

    handleColorValueChange = (value: string) => {
        const rgbaArray = parseColor(value as string)

        if (!rgbaArray) return

        const [r, g, b, a = 1] = rgbaArray

        const [h, s, l] = rgbaArray2HslArray([r, g, b, a])

        this.setCurrentValue([r, g, b, a])

        this.setImmerState(
            state => {
                state.r = r
                state.g = g
                state.b = b
                state.a = a
                state.h = h
                state.s = s
                state.l = l
            },
            () => {
                this.rgbPanelInstanceRef.current.setRgbPanelHue(h)
                this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
                this.updatePosition()
            }
        )
    }

    handleRgbValueChange = (value: Uint8ClampedArray) => {
        const [r, g, b] = value as Uint8ClampedArray
        const [h, s, l] = rgbaArray2HslArray([r, g, b])
        const { a } = this.state

        this.setCurrentValue([r, g, b, a])

        this.setImmerState(
            state => {
                state.r = r
                state.g = g
                state.b = b
                state.h = h
                state.s = s
                state.l = l
            },
            () => {
                this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
            }
        )
    }

    handleHueValueChange = (h: number) => {
        const { s, l, a } = this.state

        const [r, g, b] = hslaArray2RgbaArray([h, s, l])

        this.setCurrentValue([r, g, b, a])

        this.setImmerState(
            state => {
                state.r = r
                state.g = g
                state.b = b
                state.h = h
                state.s = s
                state.l = l
            },
            () => {
                this.rgbPanelInstanceRef.current.setRgbPanelHue(h)
                this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
            }
        )
    }

    handleAlphaValueChange = (alpha: number) => {
        const { r, g, b } = this.state

        this.setState({ a: alpha })

        this.setCurrentValue([r, g, b, alpha])
    }

    handlePaintInit = () => {
        this.handleColorValueChange(this.state.currentValue)
    }

    handleRgbPanelMouseMove = (value: Uint8ClampedArray) => {
        this.setState({ locking: true })

        this.handleRgbValueChange(value)
    }

    handleHuePanelMouseMove = (h: number) => {
        this.setState({ locking: true })

        this.handleHueValueChange(h)
    }

    handleAlphaPanelMouseMove = (alpha: number) => {
        this.setState({ locking: true })

        this.handleAlphaValueChange(alpha)
    }

    dispatchPropChange = () => {
        const { format, onChange } = this.props

        const { r, b, g, a, h, s, l, mode } = this.state

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

        if (value !== this.prevPropValue) {
            onChange(value)

            this.prevPropValue = value
        }
    }

    handlePanelMouseUp = () => {
        this.dispatchPropChange()

        this.setState({ locking: false })
    }

    handleDefaultColorSpanMouseDown = (color: string) => {
        this.setState({ locking: true })

        this.handleColorValueChange(color)
    }

    handleDefaultColorSpanMouseUp = () => {
        this.dispatchPropChange()

        this.setState({ locking: false })
    }

    handleModeInputChange = (params: OnModalPanelInputValueChangeParams) => {
        this.setCurrentValue([params.r, params.g, params.b, params.a])

        this.setState({ ...params }, () => {
            const { h, s, l, r, g, b } = this.state

            /** 受控不处理 */
            if (this.hasValue) {
                this.dispatchPropChange()

                return
            }

            this.updatePosition()

            this.rgbPanelInstanceRef.current.setRgbPanelHue(h)

            this.rgbPanelInstanceRef.current.rgbToPosition([r, g, b])

            this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
        })
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
                        onMouseUp={this.handleDefaultColorSpanMouseUp}
                        onMouseDown={this.handleDefaultColorSpanMouseDown.bind(this, color)}
                    />
                ))}
            </div>
        )
    }

    render() {
        const { style, showMode } = this.props

        const { r, g, b, a, h, s, l, mode } = this.state

        const className = classnames(this.props.className)

        return (
            <div className={className} style={style}>
                <RgbPanel
                    onMouseMove={this.handleRgbPanelMouseMove}
                    ref={this.rgbPanelInstanceRef}
                    onInit={this.handlePaintInit}
                    onMouseUp={this.handlePanelMouseUp}
                />

                {showMode && (
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
                            onMouseMove={this.handleHuePanelMouseMove}
                            ref={this.huePanelInstanceRef}
                            onMouseUp={this.handlePanelMouseUp}
                        />
                        <AlphaPanel
                            onMouseMove={this.handleAlphaPanelMouseMove}
                            ref={this.alphaPanelInstanceRef}
                            onMouseUp={this.handlePanelMouseUp}
                        />
                    </div>
                </div>

                {this.renderDefaultColors()}
            </div>
        )
    }
}

export default ColorBoard
