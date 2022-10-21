/**
 * 基本概念
 *  颜色相关:
 *   1.RGBA:代表Red（红色）Green（绿色）Blue（蓝色）和Alpha的色彩空间
 *   2.HSL:色彩模式 Hue(色相), Saturation（饱和度）, Lightness（亮度），
 *   3.HSV:HSV颜色模型  色调（H）、饱和度（S）和明度（V）
 *  其他：
 *   4.hex:十六进制表示颜色 如#fff000
 *   5.色相(Hue):决定了是什么颜色
 */

import { isEmpty } from './is'
import { getRangeValue } from './numbers'

const CSS_INTEGER = '[-\\+]?\\d+%?'
/** @see http://www.w3.org/TR/css3-values/#number-value */
const CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?'
const CSS_UNIT = `(?:${CSS_NUMBER})|(?:${CSS_INTEGER})`
const PERMISSIVE_MATCH3 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`
const PERMISSIVE_MATCH4 = `[\\s|\\(]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})[,|\\s]+(${CSS_UNIT})\\s*\\)?`
const { floor } = Math

// all color RegExp
const MATCH = {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp(`rgb${PERMISSIVE_MATCH3}`),
    rgba: new RegExp(`rgba${PERMISSIVE_MATCH4}`),
    hsl: new RegExp(`hsl${PERMISSIVE_MATCH3}`),
    hsla: new RegExp(`hsla${PERMISSIVE_MATCH4}`),
    hsv: new RegExp(`hsv${PERMISSIVE_MATCH3}`),
    hsva: new RegExp(`hsva${PERMISSIVE_MATCH4}`),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
}

const COLOR_NAMES = {
    aliceblue: '#F0F8FF',
    antiquewhite: '#FAEBD7',
    aqua: '#00FFFF',
    aquamarine: '#7FFFD4',
    azure: '#F0FFFF',
    beige: '#F5F5DC',
    bisque: '#FFE4C4',
    black: '#000000',
    blanchedalmond: '#FFEBCD',
    blue: '#0000FF',
    blueviolet: '#8A2BE2',
    brown: '#A52A2A',
    burlywood: '#DEB887',
    cadetblue: '#5F9EA0',
    chartreuse: '#7FFF00',
    chocolate: '#D2691E',
    coral: '#FF7F50',
    cornflowerblue: '#6495ED',
    cornsilk: '#FFF8DC',
    crimson: '#DC143C',
    cyan: '#00FFFF',
    darkblue: '#00008B',
    darkcyan: '#008B8B',
    darkgoldenrod: '#B8860B',
    darkgray: '#A9A9A9',
    darkgrey: '#A9A9A9',
    darkgreen: '#006400',
    darkkhaki: '#BDB76B',
    darkmagenta: '#8B008B',
    darkolivegreen: '#556B2F',
    darkorange: '#FF8C00',
    darkorchid: '#9932CC',
    darkred: '#8B0000',
    darksalmon: '#E9967A',
    darkseagreen: '#8FBC8F',
    darkslateblue: '#483D8B',
    darkslategray: '#2F4F4F',
    darkslategrey: '#2F4F4F',
    darkturquoise: '#00CED1',
    darkviolet: '#9400D3',
    deeppink: '#FF1493',
    deepskyblue: '#00BFFF',
    dimgray: '#696969',
    dimgrey: '#696969',
    dodgerblue: '#1E90FF',
    firebrick: '#B22222',
    floralwhite: '#FFFAF0',
    forestgreen: '#228B22',
    fuchsia: '#FF00FF',
    gainsboro: '#DCDCDC',
    ghostwhite: '#F8F8FF',
    gold: '#FFD700',
    goldenrod: '#DAA520',
    gray: '#808080',
    grey: '#808080',
    green: '#008000',
    greenyellow: '#ADFF2F',
    honeydew: '#F0FFF0',
    hotpink: '#FF69B4',
    indianred: '#CD5C5C',
    indigo: '#4B0082',
    ivory: '#FFFFF0',
    khaki: '#F0E68C',
    lavender: '#E6E6FA',
    lavenderblush: '#FFF0F5',
    lawngreen: '#7CFC00',
    lemonchiffon: '#FFFACD',
    lightblue: '#ADD8E6',
    lightcoral: '#F08080',
    lightcyan: '#E0FFFF',
    lightgoldenrodyellow: '#FAFAD2',
    lightgray: '#D3D3D3',
    lightgrey: '#D3D3D3',
    lightgreen: '#90EE90',
    lightpink: '#FFB6C1',
    lightsalmon: '#FFA07A',
    lightseagreen: '#20B2AA',
    lightskyblue: '#87CEFA',
    lightslategray: '#778899',
    lightslategrey: '#778899',
    lightsteelblue: '#B0C4DE',
    lightyellow: '#FFFFE0',
    lime: '#00FF00',
    limegreen: '#32CD32',
    linen: '#FAF0E6',
    magenta: '#FF00FF',
    maroon: '#800000',
    mediumaquamarine: '#66CDAA',
    mediumblue: '#0000CD',
    mediumorchid: '#BA55D3',
    mediumpurple: '#9370DB',
    mediumseagreen: '#3CB371',
    mediumslateblue: '#7B68EE',
    mediumspringgreen: '#00FA9A',
    mediumturquoise: '#48D1CC',
    mediumvioletred: '#C71585',
    midnightblue: '#191970',
    mintcream: '#F5FFFA',
    mistyrose: '#FFE4E1',
    moccasin: '#FFE4B5',
    navajowhite: '#FFDEAD',
    navy: '#000080',
    oldlace: '#FDF5E6',
    olive: '#808000',
    olivedrab: '#6B8E23',
    orange: '#FFA500',
    orangered: '#FF4500',
    orchid: '#DA70D6',
    palegoldenrod: '#EEE8AA',
    palegreen: '#98FB98',
    paleturquoise: '#AFEEEE',
    palevioletred: '#DB7093',
    papayawhip: '#FFEFD5',
    peachpuff: '#FFDAB9',
    peru: '#CD853F',
    pink: '#FFC0CB',
    plum: '#DDA0DD',
    powderblue: '#B0E0E6',
    purple: '#800080',
    rebeccapurple: '#663399',
    red: '#FF0000',
    rosybrown: '#BC8F8F',
    royalblue: '#4169E1',
    saddlebrown: '#8B4513',
    salmon: '#FA8072',
    sandybrown: '#F4A460',
    seagreen: '#2E8B57',
    seashell: '#FFF5EE',
    sienna: '#A0522D',
    silver: '#C0C0C0',
    skyblue: '#87CEEB',
    slateblue: '#6A5ACD',
    slategray: '#708090',
    slategrey: '#708090',
    snow: '#FFFAFA',
    springgreen: '#00FF7F',
    steelblue: '#4682B4',
    tan: '#D2B48C',
    teal: '#008080',
    thistle: '#D8BFD8',
    tomato: '#FF6347',
    turquoise: '#40E0D0',
    violet: '#EE82EE',
    wheat: '#F5DEB3',
    white: '#FFFFFF',
    whitesmoke: '#F5F5F5',
    yellow: '#FFFF00',
    yellowgreen: '#9ACD32',
}

/** ----------通用工具---------- */
const decimalConvert16 = (val: string | number) => {
    return parseInt(val as string, 16)
}

const convertHexToDecimal = h => {
    return decimalConvert16(h) / 255
}

const toNumber = (val: string) => {
    return Number(val)
}
/** -------------------------- */

/** ----------解析color字符串成rgba数组---------- */
export function parseColor(color: string): [number, number, number] | [number, number, number, number] | undefined {
    color = color.toLowerCase()

    color = COLOR_NAMES[color] || color

    let match: RegExpExecArray

    if ((match = MATCH.rgb.exec(color))) {
        return [toNumber(match[1]), toNumber(match[2]), toNumber(match[3])]
    }

    if ((match = MATCH.rgba.exec(color))) {
        return [toNumber(match[1]), toNumber(match[2]), toNumber(match[3]), toNumber(match[4])]
    }

    if ((match = MATCH.hex8.exec(color))) {
        return [
            decimalConvert16(match[1]),
            decimalConvert16(match[2]),
            decimalConvert16(match[3]),
            convertHexToDecimal(match[4]),
        ]
    }
    if ((match = MATCH.hex6.exec(color))) {
        return [decimalConvert16(match[1]), decimalConvert16(match[2]), decimalConvert16(match[3])]
    }
    if ((match = MATCH.hex4.exec(color))) {
        return [
            decimalConvert16(`${match[1]}${match[1]}`),
            decimalConvert16(`${match[2]}${match[2]}`),
            decimalConvert16(`${match[3]}${match[3]}`),
            convertHexToDecimal(`${match[4]}${match[4]}`),
        ]
    }
    if ((match = MATCH.hex3.exec(color))) {
        return [
            decimalConvert16(`${match[1]}${match[1]}`),
            decimalConvert16(`${match[2]}${match[2]}`),
            decimalConvert16(`${match[3]}${match[3]}`),
        ]
    }

    return undefined
}
/** ------------------------------------------------------------ */

/** ----------RGB转化成其他格式---------- */
export function rgbaArray2HslArray([r, g, b, a]: number[]) {
    r /= 255
    g /= 255
    b /= 255

    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)

    let h
    let s
    const l = (max + min) / 2

    if (max === min) {
        h = 0
        s = 0
    } else {
        const d = max - min
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
            default:
                break
        }
        h /= 6
    }

    const hslResult = [h * 360, s * 100, l * 100].map(Math.round)

    return a ? [...hslResult, a] : hslResult
}

export function rgbArray2HsvArray([r, g, b]: number[]) {
    ;[r, g, b] = [
        getRangeValue({ current: r, max: 255 }) / 255,
        getRangeValue({ current: g, max: 255 }) / 255,
        getRangeValue({ current: b, max: 255 }) / 255,
    ]

    const max = Math.max(r, g, b)

    const min = Math.min(r, g, b)

    let h

    const v = max
    const d = max - min

    const s = max === 0 ? 0 : d / max
    if (max === min) {
        h = 0
    } else {
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0)
                break
            case g:
                h = (b - r) / d + 2
                break
            case b:
                h = (r - g) / d + 4
                break
            default:
                break
        }

        h /= 6
    }
    return [h, s, v]
}
/** ---------------------------------------- */

/** ----------Hsl转化成其他格式---------- */
export function HslArray2RgbArray([h, s, l]: number[]) {
    let r: number
    let g: number
    let b: number
    ;[h, s, l] = [
        getRangeValue({ current: h, max: 360 }) / 360,
        getRangeValue({ current: s, max: 100 }) / 100,
        getRangeValue({ current: l, max: 100 }) / 100,
    ]

    if (s === 0) {
        r = l
        g = l
        b = l
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1
            if (t > 1) t -= 1
            if (t < 1 / 6) return p + (q - p) * 6 * t
            if (t < 1 / 2) return q
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
            return p
        }

        const q = l < 0.5 ? l * (1 + s) : l + s - l * s
        const p = 2 * l - q

        r = hue2rgb(p, q, h + 1 / 3)
        g = hue2rgb(p, q, h)
        b = hue2rgb(p, q, h - 1 / 3)
    }

    return [r * 255, g * 255, b * 255].map(Math.round)
}
/** ---------------------------------------- */

/** ----------格式化---------- */
export function hslArray2HslFormat(arr: number[]) {
    const [h, s, l, a] = arr

    return a ? `hsla(${h}, ${s}, ${l}, ${a})` : `hsl(${h}, ${s}, ${l})`
}

export function rgbaArray2HexFormat([r, g, b, a]: number[]) {
    const calAlpha = !isEmpty(a)
    let o
    let rr = floor(r).toString(16)
    let gg = floor(g).toString(16)
    let bb = floor(b).toString(16)

    if (rr.length !== 2) rr = `0${rr}`
    if (gg.length !== 2) gg = `0${gg}`
    if (bb.length !== 2) bb = `0${bb}`

    if (calAlpha) o = floor(a * 255).toString(16)

    return calAlpha ? `#${rr}${gg}${bb}${o}` : `#${rr}${gg}${bb}`
}
/** ------------------------------ */
