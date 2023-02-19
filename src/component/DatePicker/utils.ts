import {
    addDays,
    addMonths,
    addSeconds,
    addYears,
    compareAsc,
    format,
    isSameDay,
    isSameMonth,
    isSameWeek,
    isSameYear,
    isValid,
    parse,
    startOfMonth,
    startOfWeek,
    toDate,
    parseISO,
} from 'date-fns'
import { getLocale } from '@/locale'
import { isString } from '@/utils/is'

const TIME_FORMAT = 'HH:mm:ss'

/** 获取月份的天数 并填充前后至42个 */
function getDaysOfMonth(rawDate: Date): Date[] {
    const date = toDate(rawDate)

    /** 从date中获取月份第一天的Date，再获取第一个Day */
    let current = startOfWeek(startOfMonth(date), {
        weekStartsOn: getLocale('startOfWeek'),
    })

    current.setHours(rawDate.getHours())
    current.setMinutes(rawDate.getMinutes())
    current.setSeconds(rawDate.getSeconds())

    const days = []

    let index = 0

    while (index < 42) {
        days.push(current)

        current = addDays(current, 1)

        index += 1
    }

    return days
}

/** @todo 改造这个方法的判断(目前使用的函数是ES5的，存在很多难以理解的概念) */
function isInvalid(date) {
    /** isNaN() 和Number.isNaN()的用法和区别 */
    /** @see https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/isNaN */
    /** @see https://blog.csdn.net/WJLcomeon/article/details/123681070 */
    // eslint-disable-next-line no-restricted-globals
    return date === null || date === undefined || isNaN(date)
}

/** 默认情况下，推荐value是使用Date或者number存储，如果使用string，必须保证与format的格式相符合 */
function toDateWithFormat(rawDate: string | number | Date, fmt: string) {
    let date: Date

    if (isString(rawDate)) {
        /**
         * Date.parse() 方法解析一个表示某个日期的字符串，并返回从1970-1-1 00:00:00 UTC 到该日期对象（该日期对象的UTC时间）的毫秒数，
         * 如果该字符串无法识别，或者一些情况下，包含了不合法的日期数值（如：2015-02-31），则返回值为NaN。
         */
        // var result = parse('02/11/2014', 'MM/dd/yyyy', new Date())
        //= > Tue Feb 11 2014 00:00:00

        /** eg: format="yyyy年-M月" value="2012年-3月" =》可以对上 */
        /** eg: format="yyyy年-M月" value="1327052443" =》对不上 */
        date = parse(rawDate, fmt, new Date(), {
            weekStartsOn: getLocale('startOfWeek'),
        })
    } else {
        date = toDate(rawDate)
    }

    if (isInvalid(date)) date = undefined

    return date
}

function compareMonth(dateLeft: Date, dateRight: Date, pad = 0) {
    if (!dateLeft || !dateRight) return 0

    const left = new Date(dateLeft.getFullYear(), dateLeft.getMonth(), 1)
    const right = new Date(dateRight.getFullYear(), dateRight.getMonth() + pad, 1)

    return compareAsc(left, right)
}

function setTime(date: Date, old: Date) {
    date.setHours(old.getHours())
    date.setMinutes(old.getMinutes())
    date.setSeconds(old.getSeconds())

    return date
}

function cloneTime(date: Date, old: Date, fmt: string) {
    if (!date) return date

    old = toDateWithFormat(old, fmt)

    if (isInvalid(old)) return date

    return setTime(date, old)
}

/** 清除时分秒 */
function clearHMS(rawDate: Date | number): Date {
    if (!isValid(rawDate)) return rawDate as never

    const date = new Date(rawDate)

    return new Date(new Date(date.toLocaleDateString()).getTime())
}

function compareDateArray(arr1, arr2, type = 'date') {
    if (!arr1 || !arr2 || arr1.length !== arr2.length) return false

    return arr1.every((v, i) => {
        if (!v || !arr2[i]) return false

        if (type === 'week') return format(v, 'RRRR II') === format(arr2[i], 'RRR II')

        return v.getTime() === arr2[i].getTime()
    })
}

interface GetIsDisabledHMSParams {
    scale: number
    panelDate: Date
    mode: 'hour' | 'minute' | 'second'
    min: Date
    max: Date
    disabled: (date: Date) => boolean
}

function getIsDisabledHMS(params: GetIsDisabledHMSParams): [boolean, Date?] {
    const { scale, panelDate, mode, min, max, disabled } = params
    const date = new Date(panelDate.getTime())

    switch (mode) {
        case 'hour':
            date.setHours(scale)
            break
        case 'minute':
            date.setMinutes(scale)
            break
        case 'second':
            date.setSeconds(scale)
            break

        default:
            break
    }

    let isDisabled

    if (disabled) isDisabled = disabled(date)
    if (isDisabled) return [true]
    if (min) {
        if (compareAsc(date, min) < 0) return [true]
    }
    if (!isDisabled && max) {
        if (compareAsc(date, max) > 0) return [true]
    }

    return [false, date]
}

export default {
    clearHMS,
    addDays,
    addMonths,
    addYears,
    addSeconds,
    cloneTime,
    /** 将日期按升序排序。 为此，如果第一个日期在第二个日期之后，则返回1；如果第一个日期在第二个日期之前，则返回-1；如果日期相等，则返回0。 */
    compareAsc,
    compareMonth,
    getDaysOfMonth,
    format,
    isInvalid,
    isSameDay,
    isSameMonth,
    isSameWeek,
    isSameYear,
    isValid,
    setTime,
    toDate,
    toDateWithFormat,
    compareDateArray,
    TIME_FORMAT,
    getIsDisabledHMS,
    parseISO,
}
