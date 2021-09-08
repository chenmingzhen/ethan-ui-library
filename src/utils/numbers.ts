/** Array.from({length:2},(v,k)=>k+1) */
/** [1,2] */
export function range(end: number, start = 0) {
    return Array.from({ length: end - start }, (v, k) => k + start)
}

export function toPrecision(num: number, precision = 12) {
    return +parseFloat(num.toPrecision(precision))
}
