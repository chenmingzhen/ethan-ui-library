import React from 'react'
import { colorPickerClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import {
    hslArray2HslFormat,
    hslArray2RgbArray,
    parseColor,
    rgbaArray2HexFormat,
    rgbaArray2HslArray,
    rgbaArray2RgbFormat,
} from '@/utils/color'
import { isEmpty } from '@/utils/is'
import { ColorPickerProps, ColorPickerState } from './type'
import Caret from '../icons/Caret'
import AbsoluteList from '../List/AbsoluteList'
import RgbPanel, { RgbPanelInstance } from './RgbPanel'
import AnimationList from '../List'
import HuePanel, { HuePanelInstance } from './HuePanel'
import { DEFAULT_COLORS, PANEL_CANVAS_WIDTH } from './config'
import AlphaPanel, { AlphaPanelInstance } from './AlphaPanel'

class ColorPicker extends PureComponent<ColorPickerProps, ColorPickerState> {
    static defaultProps = {
        position: 'left-bottom',
        absolute: true,
        defaultColors: DEFAULT_COLORS,
        mode: 'rgba',
    }

    container: HTMLDivElement

    paintInstanceRef = React.createRef<RgbPanelInstance>()

    huePanelInstanceRef = React.createRef<HuePanelInstance>()

    alphaPanelInstanceRef = React.createRef<AlphaPanelInstance>()

    isRender = false

    constructor(props: ColorPickerProps) {
        super(props)

        const { value, defaultValue } = props

        this.state = {
            r: 0,
            g: 0,
            b: 0,
            a: undefined,
            h: 0,
            s: 0,
            l: 0,
            hex: '',
            currentValue: value ?? defaultValue ?? '#FF0000',
            focus: false,
            locaking: false,
        }
    }

    componentDidUpdate() {
        /**
         * 下面的情况，不允许props的value改变state中的currentValue
         * 1.面板处于拖动中
         * 2.鼠标点下（未抬起）默认值的时候
         */
        if (!this.state.locaking && this.props.value && this.props.value !== this.state.currentValue) {
            const hexPropValue = rgbaArray2HexFormat(parseColor(this.props.value))

            if (hexPropValue !== this.state.currentValue) {
                this.handleColorValueChange(this.props.value)
            }
        }
    }

    bindContainer = (el: HTMLDivElement) => {
        this.container = el
    }

    togglePanel = () => {
        const { disabled } = this.props

        const { focus } = this.state

        if (disabled) return

        this.setState({ focus: !focus })
    }

    updatePosition = () => {
        const { r, g, b, h, a } = this.state

        const huePosition = (PANEL_CANVAS_WIDTH * h) / 360

        const alphaPosition = PANEL_CANVAS_WIDTH * (a ?? 1)

        this.huePanelInstanceRef.current.setHuePanelPosition(huePosition)

        this.paintInstanceRef.current.rgbToPosition([r, g, b])

        this.alphaPanelInstanceRef.current.setAlphaPanelPosition(alphaPosition)
    }

    setCurrentValueAndHex = ([r, g, b, a]: number[]) => {
        const { mode } = this.props

        const hex = rgbaArray2HexFormat([r, g, b, a])

        let value = ''

        if (mode === 'hex') {
            value = hex
        } else if (mode === 'hsla') {
            value = hslArray2HslFormat(rgbaArray2HslArray([r, g, b, a]))
        } else {
            value = rgbaArray2RgbFormat([r, g, b, a])
        }

        this.setState({ currentValue: value, hex })
    }

    handleColorValueChange = (value: string) => {
        const [r, g, b, a] = parseColor(value as string) || []
        const [h, s, l] = rgbaArray2HslArray([r, g, b, a])

        this.setCurrentValueAndHex([r, g, b, a])

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
                if (this.isRender) {
                    this.paintInstanceRef.current.setRgbPanelHue(h)
                    this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
                    this.updatePosition()
                }
            }
        )
    }

    handleRgbValueChange = (value: Uint8ClampedArray) => {
        const [r, g, b] = value as Uint8ClampedArray
        const [h, s, l] = rgbaArray2HslArray([r, g, b])

        this.setCurrentValueAndHex([r, g, b])

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
                if (this.isRender) {
                    this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
                }
            }
        )
    }

    handleHueValueChange = (h: number) => {
        const { s, l } = this.state

        const [r, g, b] = hslArray2RgbArray([h, s, l])

        this.setCurrentValueAndHex([r, g, b])

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
                if (this.isRender) {
                    this.paintInstanceRef.current.setRgbPanelHue(h)
                    this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
                }
            }
        )
    }

    handleAlphaValueChange = (alpha: number) => {
        const { r, g, b } = this.state

        this.setState({ a: alpha })

        this.setCurrentValueAndHex([r, g, b, alpha])
    }

    handlePaintInit = () => {
        this.handleColorValueChange(this.state.currentValue)
    }

    handleRgbPanelMouseMove = (value: Uint8ClampedArray) => {
        this.setState({ locaking: true })

        this.handleRgbValueChange(value)
    }

    handleHuePanelMouseMove = (h: number) => {
        this.setState({ locaking: true })

        this.handleHueValueChange(h)
    }

    handleAlphaPanelMouseMove = (alpha: number) => {
        this.setState({ locaking: true })

        this.handleAlphaValueChange(alpha)
    }

    dispatchPropChange = () => {
        const { mode, onChange } = this.props

        const { hex, r, b, g, a, h, s, l } = this.state

        if (!onChange) return

        let value = ''

        if (mode === 'hex') {
            value = hex
        } else if (mode === 'hsla') {
            value = hslArray2HslFormat([h, s, l, a])
        } else {
            value = rgbaArray2RgbFormat([r, g, b, a])
        }

        onChange(value)
    }

    handlePanelMouseUp = () => {
        this.dispatchPropChange()

        this.setState({ locaking: false })
    }

    handleDefaultColorSpanMouseDown = (color: string) => {
        this.setState({ locaking: true })

        this.handleColorValueChange(color)
    }

    handleDefaultColorSpanMouseUp = () => {
        this.dispatchPropChange()

        this.setState({ locaking: false })
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

    renderDropDown = () => {
        const { focus, r, g, b, a } = this.state

        const { absolute, position } = this.props

        if (!focus && !this.isRender) return null

        this.isRender = true

        return (
            <AbsoluteList absolute={absolute} focus={focus} position={position} getParentElement={() => this.container}>
                <AnimationList
                    lazyDom
                    className={colorPickerClass('drop-down')}
                    show={focus}
                    animationTypes={['scale-y', 'fade']}
                    duration="fast"
                >
                    <RgbPanel
                        onMouseMove={this.handleRgbPanelMouseMove}
                        ref={this.paintInstanceRef}
                        onInit={this.handlePaintInit}
                        onMouseUp={this.handlePanelMouseUp}
                    />
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
                </AnimationList>
            </AbsoluteList>
        )
    }

    render() {
        const { style, size, disabled } = this.props

        const { currentValue } = this.state

        const className = classnames(
            this.props.className,
            colorPickerClass('_', size && 'size', disabled && 'disabled')
        )

        return (
            <div className={className} style={style} ref={this.bindContainer}>
                <div className={colorPickerClass('result')} onClick={this.togglePanel}>
                    <div className={colorPickerClass('color')} style={{ backgroundColor: currentValue }} />
                </div>
                <span className={colorPickerClass('caret')} onClick={this.togglePanel}>
                    <Caret />
                </span>
                {this.renderDropDown()}
            </div>
        )
    }
}

export default ColorPicker
