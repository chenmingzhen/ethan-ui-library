/** Array.from({length:2},(v,k)=>k+1) */

import { isEmpty } from './is'

/** [1,2] */
export function range(end: number, start = 0) {
    return Array.from({ length: end - start }, (v, k) => k + start)
}

export function toPrecision(num: number, precision = 12) {
    return parseFloat(num.toPrecision(precision))
}

export function getRangeValue({ min = 0, max = 1, current }) {
    return Math.min(max, Math.max(min, current))
}

export function toFixed(num: number, digits = 0) {
    if (isEmpty(num)) return num

    return Number(num.toFixed(digits))
}
