import React from 'react'
import { colorPickerClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import classnames from 'classnames'
import { parseColor, rgbaArray2HexFormat, rgbaArray2HslArray } from '@/utils/color'
import { ColorPickerProps, ColorPickerState } from './type'
import Caret from '../icons/Caret'
import AbsoluteList from '../List/AbsoluteList'
import Paint, { PaintInstance } from './Paint'
import AnimationList from '../List'

class ColorPicker extends PureComponent<ColorPickerProps, ColorPickerState> {
    static defaultProps = {
        position: 'left-bottom',
        absolute: true,
    }

    container: HTMLDivElement

    paintInstanceRef = React.createRef<PaintInstance>()

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

    setHex = ([r, g, b, a]: number[]) => {
        const hex = rgbaArray2HexFormat([r, g, b, a])

        this.setState({ currentColor: hex, hex })
    }

    handleColorValueChange = (value: string) => {
        const [r, g, b, a] = parseColor(value as string) || []
        const [h, s, l] = rgbaArray2HslArray([r, g, b, a])

        this.setHex([r, g, b, a])

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
                this.paintInstanceRef.current.setHue(h)
                this.paintInstanceRef.current.rgbToPosition([r, g, b])
            }
        )
    }

    handleRgbValueChange = (value: Uint8ClampedArray) => {
        const [r, g, b] = value as Uint8ClampedArray
        const [h, s, l] = rgbaArray2HslArray([r, g, b])

        this.setHex([r, g, b])

        this.setImmerState(state => {
            state.r = r
            state.g = g
            state.b = b
            state.h = h
            state.s = s
            state.l = l
        })
    }

    handlePaintMouseMove = (x: number, y: number, color: Uint8ClampedArray) => {
        this.handleRgbValueChange(color)
    }

    handlePaintInit = () => {
        this.handleColorValueChange(this.state.currentColor)
    }

    renderPanel = () => {
        const { focus } = this.state

        const { absolute, position } = this.props

        if (!focus && !this.isRender) return null

        this.isRender = true

        return (
            <AbsoluteList absolute={absolute} focus={focus} position={position} getParentElement={() => this.container}>
                <AnimationList
                    lazyDom
                    className={colorPickerClass('panel')}
                    show={focus}
                    animationTypes={['collapse', 'fade']}
                    duration="fast"
                >
                    <Paint
                        onMouseMove={this.handlePaintMouseMove}
                        ref={this.paintInstanceRef}
                        onInit={this.handlePaintInit}
                    />
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
                {this.renderPanel()}
            </div>
        )
    }
}

export default ColorPicker
