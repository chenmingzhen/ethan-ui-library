// @ts-nocheck
import { toPrecision } from '@/utils/numbers'

export function valueToPer(value, scale) {
    const range = scale.length - 1
    let ps = 0
    scale.forEach((s, i) => {
        if (value > s) ps = i
    })

    // end
    if (ps >= range) return 1

    const min = scale[ps]
    const max = scale[ps + 1]

    return (ps + (value - min) / (max - min)) / range
}

/**
 * 百分比 => 真实值
 * @param per 百分比
 * @param scale 范围
 * @param step 步长
 * @returns {*}
 */
export function perToValue(per, scale, step = 1) {
    // ❗❗❗ 范围值数组长度-1
    const range = scale.length - 1

    if (step === 0) return scale[Math.round(per * range)]

    if (per >= 1) return scale[range]

    // 整数百分比值转化成整数值
    const ps = Math.floor(per * range)

    // 下限
    const min = scale[ps]

    // 上限
    const max = scale[ps + 1]
    // max-min之间的数量值
    const count = (max - min) / step
    //  特征值周期
    const sper = (per - ps / range) * range

    return toPrecision(min + Math.round(sper * count) * step)
}
