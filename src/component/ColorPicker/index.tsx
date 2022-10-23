import React from 'react'
import { colorPickerClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { hslArray2RgbArray, parseColor, rgbaArray2HexFormat, rgbaArray2HslArray } from '@/utils/color'
import { isEmpty } from '@/utils/is'
import { ColorPickerProps, ColorPickerState } from './type'
import Caret from '../icons/Caret'
import AbsoluteList from '../List/AbsoluteList'
import Paint, { RgbPanelInstance } from './RgbPanel'
import AnimationList from '../List'
import HuePanel, { HuePanelInstance } from './HuePanel'
import { DEFAULT_COLORS, PANEL_CANVAS_WIDTH } from './config'
import AlphaPanel, { AlphaPanelInstance } from './AlphaPanel'

class ColorPicker extends PureComponent<ColorPickerProps, ColorPickerState> {
    static defaultProps = {
        position: 'left-bottom',
        absolute: true,
        defaultColors: DEFAULT_COLORS,
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
            currentColor: value ?? defaultValue ?? '#FF0000',
            focus: false,
        }
    }

    bindContainer = (el: HTMLDivElement) => {
        this.container = el
    }

    togglePanel = () => {
        const { disabled, value } = this.props

        const { focus, currentColor } = this.state

        if (disabled) return

        this.setState({ currentColor: value || currentColor, focus: !focus })
    }

    updatePosition = () => {
        const { r, g, b, h, a } = this.state

        const huePosition = (PANEL_CANVAS_WIDTH * h) / 360

        const alphaPosition = PANEL_CANVAS_WIDTH * (a ?? 1)

        this.huePanelInstanceRef.current.setHuePanelPosition(huePosition)

        this.paintInstanceRef.current.rgbToPosition([r, g, b])

        this.alphaPanelInstanceRef.current.setAlphaPanelPosition(alphaPosition)
    }

    setHex = ([r, g, b, a]: number[]) => {
        const hex = rgbaArray2HexFormat([r, g, b, a])

        this.setState({ currentColor: hex, hex })
    }

    handleColorValueChange = (value: string) => {
        const [r, g, b, a] = parseColor(value as string) || []
        const [h, s, l] = rgbaArray2HslArray([r, g, b, a])

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
                this.paintInstanceRef.current.setRgbPanelHue(h)
                this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
                this.setHex([r, g, b, a])
                this.updatePosition()
            }
        )
    }

    handleRgbValueChange = (value: Uint8ClampedArray) => {
        const [r, g, b] = value as Uint8ClampedArray
        const [h, s, l] = rgbaArray2HslArray([r, g, b])

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
                this.setHex([r, g, b])
                this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
            }
        )
    }

    handleHueValueChange = (h: number) => {
        const { s, l } = this.state

        const [r, g, b] = hslArray2RgbArray([h, s, l])

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
                this.setHex([r, g, b])
                this.paintInstanceRef.current.setRgbPanelHue(h)
                this.alphaPanelInstanceRef.current.setAlphaPanelHsl([h, s, l])
            }
        )
    }

    handleAlphaValueChange = (alpha: number) => {
        const { r, g, b } = this.state

        this.setState({ a: alpha })

        this.setHex([r, g, b, alpha])
    }

    handlePaintInit = () => {
        this.handleColorValueChange(this.state.currentColor)
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
                        onClick={this.handleColorValueChange.bind(this, color)}
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
                    <Paint
                        onMouseMove={this.handleRgbValueChange}
                        ref={this.paintInstanceRef}
                        onInit={this.handlePaintInit}
                    />
                    <div className={colorPickerClass('box')}>
                        <div className={colorPickerClass('circle')}>
                            <div
                                className={colorPickerClass('avatar')}
                                style={{ backgroundColor: `rgba(${r}, ${g}, ${b}, ${a ?? 1})` }}
                            />
                        </div>

                        <div className={colorPickerClass('panel-area')}>
                            <HuePanel onMouseMove={this.handleHueValueChange} ref={this.huePanelInstanceRef} />
                            <AlphaPanel onMouseMove={this.handleAlphaValueChange} ref={this.alphaPanelInstanceRef} />
                        </div>
                    </div>

                    {this.renderDefaultColors()}
                </AnimationList>
            </AbsoluteList>
        )
    }

    render() {
        const { style, size, disabled } = this.props

        const { currentColor } = this.state

        const className = classnames(
            this.props.className,
            colorPickerClass('_', size && 'size', disabled && 'disabled')
        )

        return (
            <div className={className} style={style} ref={this.bindContainer}>
                <div className={colorPickerClass('result')} onClick={this.togglePanel}>
                    <div className={colorPickerClass('color')} style={{ backgroundColor: currentColor }} />
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
