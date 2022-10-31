import { colorPickerClass } from '@/styles'
import { COLOR_MATCH, hslaArray2RgbaArray, parseColor, rgbaArray2HexFormat, rgbaArray2HslArray } from '@/utils/color'
import React, { useCallback, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'react-use'
import Button from '../Button'
import { FontAwesome } from '../Icon'
import Input from '../Input'
import { ModePanelProps } from './type'

const ModePanel: React.FC<ModePanelProps> = function(props) {
    const { mode, onModeChange, onInputValueChange } = props

    /** ModalModal单独维护hex和alpha */
    const [hex, updateHex] = useState(rgbaArray2HexFormat([props.r, props.g, props.b, props.a]))

    const [alpha, updateAlpha] = useState<string | number>(props.a)

    const [focus, updateFocus] = useState(false)

    useIsomorphicLayoutEffect(() => {
        if (focus) return

        updateHex(rgbaArray2HexFormat([props.r, props.g, props.b, props.a]))

        updateAlpha(props.a)
    }, [focus, props.r, props.g, props.b, props.a])

    const handleFocus = useCallback(() => {
        updateFocus(true)
    }, [])

    const handleModeChange = useCallback(() => {
        let newMode = mode

        if (mode === 'rgba') {
            newMode = 'hex'
        } else if (mode === 'hex') {
            newMode = 'hsla'
        } else {
            newMode = 'rgba'
        }

        onModeChange(newMode)
    }, [mode])

    function handleHexInputChange(inputValue: string) {
        updateHex(inputValue)

        if (!inputValue) return

        const color = parseColor(inputValue)

        if (!color) return

        let { r, g, b, a, h, s, l } = props

        if (
            !COLOR_MATCH.hex3.test(inputValue) &&
            !COLOR_MATCH.hex4.test(inputValue) &&
            !COLOR_MATCH.hex6.test(inputValue) &&
            !COLOR_MATCH.hex8.test(inputValue)
        ) {
            return
        }

        ;[r, g, b, a = 1] = parseColor(inputValue)
        ;[h, s, l] = rgbaArray2HslArray([r, g, b, a])

        onInputValueChange({ r, g, b, a, h, s, l })
    }

    function handleSingleInputChange(key: string, inputValue: string) {
        if (!inputValue) {
            inputValue = ''
        }

        let { r, g, b, h, s, l } = props

        const { a } = props

        const numValue = Number(inputValue)

        if (!/^\d*$/.test(inputValue)) {
            /** r g b h s l 是否为数字校验 */
            return
        }

        if ('sl'.indexOf(key) >= 0) {
            if (numValue > 100 || numValue < 0) return
        } else if (key === 'h') {
            if (numValue > 360 || numValue < 0) return
        } else if ('rgb'.indexOf(key) >= 0) {
            if (numValue > 255 || numValue < 0) return
        }

        const data = {}

        data[key] = numValue || 0

        if (key === 'r') {
            ;[h, s, l] = rgbaArray2HslArray([data[key], g, b])
        } else if (key === 'g') {
            ;[h, s, l] = rgbaArray2HslArray([r, data[key], b])
        } else if (key === 'b') {
            ;[h, s, l] = rgbaArray2HslArray([r, g, data[key]])
        } else if (key === 'h') {
            ;[r, g, b] = hslaArray2RgbaArray([data[key], s, l])
        } else if (key === 's') {
            ;[r, g, b] = hslaArray2RgbaArray([h, data[key], l])
        } else if (key === 'l') {
            ;[r, g, b] = hslaArray2RgbaArray([h, s, data[key]])
        }

        onInputValueChange({ r, g, b, a, h, s, l, ...data })
    }

    function handleAlphaInputChange(inputValue: string) {
        if (!inputValue) {
            inputValue = ''
        }

        const numValue = Number(inputValue)

        updateAlpha(inputValue)

        if ((!/^\d(.)\d*$/.test(inputValue) && inputValue !== '') || numValue > 1 || numValue < 0) return

        const { r, g, b, h, s, l } = props

        onInputValueChange({ r, g, b, h, s, l, a: numValue })
    }

    function handleHexInputBlur() {
        updateFocus(false)

        if (!parseColor(hex)) {
            const { r, g, b, a } = props

            updateHex(rgbaArray2HexFormat([r, g, b, a]))
        }
    }

    function handleAlphaInputBlur() {
        updateFocus(false)

        if (!/^\d(.)\d*$/.test(alpha as string) || Number(alpha) > 1 || Number(alpha) < 0) {
            updateAlpha(props.a)
        }
    }

    function buildHexInput() {
        return (
            <Input
                onChange={handleHexInputChange}
                size="small"
                value={hex}
                maxLength={9}
                width={200}
                onBlur={handleHexInputBlur}
                onFocus={handleFocus}
            />
        )
    }

    function buildSingleKeyInput(key: string) {
        if ('sl'.indexOf(key) >= 0) {
            return (
                <Input.Group width={50} style={{ display: 'inline-flex', marginRight: 4 }} key={key}>
                    <Input
                        onChange={handleSingleInputChange.bind(this, key)}
                        size="small"
                        value={props[key]}
                        className={colorPickerClass('input')}
                    />
                    <b>%</b>
                </Input.Group>
            )
        }

        if (key === 'a') {
            return (
                <Input
                    onChange={handleAlphaInputChange}
                    size="small"
                    key={key}
                    value={alpha}
                    width={50}
                    className={colorPickerClass('input')}
                    onBlur={handleAlphaInputBlur}
                    onFocus={handleFocus}
                    type="number"
                    digits={3}
                />
            )
        }

        return (
            <Input
                onChange={handleSingleInputChange.bind(this, key)}
                size="small"
                key={key}
                value={props[key]}
                maxLength={4}
                width={50}
                className={colorPickerClass('input')}
            />
        )
    }

    const node = []

    if (mode === 'rgba') {
        const keys = ['r', 'g', 'b', 'a']

        node.push(
            <div className={colorPickerClass('value-container')} key="value">
                {keys.map(k => buildSingleKeyInput(k))}
            </div>,
            <div className={colorPickerClass('key-container')} key="key">
                {keys.map(k => (
                    <span key={k}>{k.toUpperCase()}</span>
                ))}
            </div>
        )
    } else if (mode === 'hsla') {
        const keys = ['h', 's', 'l', 'a']

        node.push(
            <div className={colorPickerClass('value-container')} key="value">
                {keys.map(k => buildSingleKeyInput(k))}
            </div>,
            <div className={colorPickerClass('key-container')} key="key">
                {keys.map(k => (
                    <span key={k}>{k.toUpperCase()}</span>
                ))}
            </div>
        )
    } else {
        node.push(
            <div className={colorPickerClass('value-container')} key="value">
                {buildHexInput()}
            </div>,
            <div className={colorPickerClass('key-container')} key="key">
                <span>HEX</span>
            </div>
        )
    }

    node.push(
        <Button size="small" className={colorPickerClass('mode-btn')} onClick={handleModeChange} key="btn">
            <FontAwesome name="exchange" />
        </Button>
    )

    return <div className={colorPickerClass('mode', mode)}>{node}</div>
}

export default React.memo(ModePanel)
