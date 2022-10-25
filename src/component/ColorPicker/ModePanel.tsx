import { colorPickerClass } from '@/styles'
import { COLOR_MATCH, hslaArray2RgbaArray, parseColor, rgbaArray2HexFormat, rgbaArray2HslArray } from '@/utils/color'
import React, { useCallback } from 'react'
import Button from '../Button'
import { FontAwesome } from '../Icon'
import Input from '../Input'
import { ModePanelProps } from './type'

const ModePanel: React.FC<ModePanelProps> = function(props) {
    const { mode, onModeChange, onInputValueChange } = props

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

    const btn = (
        <Button size="small" className={colorPickerClass('mode-btn')} onClick={handleModeChange} key="btn">
            <FontAwesome name="exchange" />
        </Button>
    )

    function handleHexInputChange(inputValue: string) {
        inputValue = inputValue.replace('%', '')

        if (!inputValue) return

        let { r, g, b, a, h, s, l } = props

        if (
            !COLOR_MATCH.hex3.test(inputValue) &&
            !COLOR_MATCH.hex4.test(inputValue) &&
            !COLOR_MATCH.hex6.test(inputValue) &&
            !COLOR_MATCH.hex8.test(inputValue)
        ) {
            return
        }

        ;[r, g, b, a] = parseColor(inputValue)
        ;[h, s, l] = rgbaArray2HslArray([r, g, b, a])

        onInputValueChange({ r, g, b, a, h, s, l })
    }

    function handleSingleInputChange(key: string, inputValue: string) {
        inputValue = inputValue.replace('%', '')

        if (!inputValue) return

        let { r, g, b, h, s, l } = props

        const { a } = props

        if (key === 'a') {
            /** 透明度校验 */
            if (!/^\d(.)\d*$/.test(inputValue) || Number(inputValue) > 1) return
        } else if (!/^\d*$/.test(inputValue)) {
            /** r g b h s l 校验 */
            return
        }

        const data = {}

        data[key] = inputValue

        if ('rgb'.indexOf(key) >= 0) {
            ;[h, s, l] = rgbaArray2HslArray([r, g, b])
        } else if ('hsl'.indexOf(key) >= 0) {
            ;[r, g, b] = hslaArray2RgbaArray([h, s, l])
        }

        onInputValueChange({ r, g, b, a, h, s, l, ...data })
    }

    function buildHexInput() {
        const { r, g, b, a } = props

        return (
            <Input
                onChange={handleHexInputChange}
                size="small"
                value={rgbaArray2HexFormat([r, g, b, a])}
                maxLength={9}
                width={200}
            />
        )
    }

    function buildSingleKeyInput(key: string) {
        return (
            <Input
                onChange={handleSingleInputChange.bind(this, key)}
                size="small"
                key={key}
                value={props[key] + ('sl'.indexOf(key) >= 0 ? '%' : '')}
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

    node.push(btn)

    return <div className={colorPickerClass('mode', mode)}>{node}</div>
}

export default React.memo(ModePanel)
