import { range } from '@/utils/numbers'
import format from 'date-fns/format'

// 随机数字 包含两位小数
export function pickNumber(max = 65555, min = 0, fixed = 2) {
    if (typeof max === 'string') max = parseInt(max, 10)
    if (typeof min === 'string') min = parseInt(min, 10)

    const num = Math.random() * (max - min) + min
    return parseFloat(num.toFixed(fixed), 0)
}

// 随机整数
export function pickInteger(...args) {
    return Math.round(pickNumber(...args))
}

// 向上取证
export function random(max) {
    return Math.ceil(Math.random() * max)
}

// 时间差日期
export function pickDate(fmt = 'yyyy-MM-dd', offset = 10000000000) {
    const date = Date.now() - random(offset)
    return format(date, fmt)
}

// Array 随机 item
export function one(items) {
    return items[Math.floor(Math.random() * items.length)]
}

// Array 随机 一段
export function pick(items, max = 1, min) {
    let length = max
    if (min) {
        length = pickInteger(max, min)
    }

    const buffer = []
    while (length > 0) {
        buffer.push(one(items))
        length -= 1
    }

    return buffer
}

// Pick范围长度的唯一下标数组
export function pickUnique(items, max = 1, min) {
    let length = max

    // 获取长度
    if (max > items.length) max = items.length
    if (min) length = pickInteger(max, min)

    const nums = range(items.length)
    const buffer = []

    for (let i = 0; i < length; i++) {
        const r = pickInteger(nums.length - 1)
        const j = nums.splice(r, 1)[0]

        buffer.push(items[j])
    }

    return buffer
}

// 变换位置
export function shuffle(deck) {
    const randomizedDeck = []
    // shallow copy
    const array = deck.slice()

    while (array.length !== 0) {
        const rIndex = Math.floor(array.length * Math.random())
        randomizedDeck.push(array[rIndex])
        array.splice(rIndex, 1)
    }
    return randomizedDeck
}
