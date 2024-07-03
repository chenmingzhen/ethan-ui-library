import useMergedValue from '@/hooks/useMergedValue'
import useRefMethod from '@/hooks/useRefMethod'
import {
    hslArray2HslFormat,
    parseColor,
    rgbaArray2HexFormat,
    rgbaArray2HslArray,
    rgbaArray2RgbFormat,
} from '@/utils/color'
import { useMemo } from 'react'
import { getDefaultColor } from '../util'
import { ColorMode } from '../type'

interface UseColorValueParams {
    value: string
    defaultValue: string
    format: ColorMode
    mode: ColorMode
    onChange: (color: string) => void
}

interface ColorModel {
    r: number
    g: number
    b: number
    a: number
    h: number
    s: number
    l: number
}

const defaultColorModel = {
    r: 0,
    g: 0,
    b: 0,
    a: 1,
    h: 0,
    s: 0,
    l: 0,
}

/** 传入的value是颜色字符串，需要经过反序列化成rgba和hsl的状态，调用onChange时需要将rgba和hsl序列化成颜色字符串 */
const useColorValue = (params: UseColorValueParams) => {
    const { mode, format } = params

    const [color, updateColor] = useMergedValue({
        defaultStateValue: getDefaultColor(format),
        options: {
            value: params.value,
            defaultValue: params.defaultValue,
            onChange: params.onChange,
        },
    })

    const updateColorByModel = useRefMethod((model: ColorModel) => {
        const nextValue = serializer(model)
        console.log('nextValue:', nextValue)
        updateColor(nextValue)
    })

    const deserializer = useRefMethod((colorValue: string) => {
        const rgbaArray = parseColor(colorValue)

        if (!rgbaArray) return defaultColorModel

        const [r, g, b, a = 1] = rgbaArray
        const [h, s, l] = rgbaArray2HslArray([r, g, b, a])

        return {
            r,
            g,
            b,
            a,
            h,
            s,
            l,
        }
    })

    const serializer = (model: ColorModel) => {
        const { r, g, b, a, h, s, l } = model

        let nextColor = ''

        if (!format) {
            if (mode === 'hex') {
                nextColor = rgbaArray2HexFormat([r, g, b, a])
            } else if (mode === 'hsla') {
                nextColor = hslArray2HslFormat([h, s, l, a])
            } else {
                nextColor = rgbaArray2RgbFormat([r, g, b, a])
            }
        } else if (format === 'hex') {
            nextColor = rgbaArray2HexFormat([r, g, b, a])
        } else if (format === 'hsla') {
            nextColor = hslArray2HslFormat([h, s, l, a])
        } else {
            nextColor = rgbaArray2RgbFormat([r, g, b, a])
        }

        return nextColor
    }

    const colorModel = useMemo<ColorModel>(() => {
        if (color) {
            return deserializer(color)
        }

        return defaultColorModel
    }, [color])

    return { colorModel, updateColor, updateColorByModel }
}

export default useColorValue
