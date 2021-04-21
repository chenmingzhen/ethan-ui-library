// @ts-nocheck 
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
  isValid,
  parse,
  startOfMonth,
  startOfWeek,
  toDate,
} from 'date-fns'
import { getLocale } from '@/locale'

const TIME_FORMAT = 'HH:mm:ss'

// 获取月份的天数 并填充前后至42个
function getDaysOfMonth(dirtyDate) {
  const date = toDate(dirtyDate)

  // 从date中获取月份第一天的Date，再获取第一个Day
  let current = startOfWeek(startOfMonth(date), {
    weekStartsOn: getLocale('startOfWeek'),
  })

  current.setHours(dirtyDate.getHours())
  current.setMinutes(dirtyDate.getMinutes())
  current.setSeconds(dirtyDate.getSeconds())

  const days = []
  let index = 0

  while (index < 42) {
    days.push(current)
    current = addDays(current, 1)
    index += 1
  }

  return days
}

function isInvalid(date) {
  // Date对象 isNaN为false
  // eslint-disable-next-line no-restricted-globals
  return isNaN(date)
}

function toDateWithFormat(dirtyDate, fmt, def) {
  let date
  if (typeof dirtyDate === 'string')
    date = parse(dirtyDate, fmt, new Date(), {
      weekStartsOn: getLocale('startOfWeek'),
    })
  else date = toDate(dirtyDate)

  if (isInvalid(date)) date = toDate(dirtyDate)
  if (isInvalid(date)) date = def

  return date
}

function compareMonth(dateLeft, dateRight, pad = 0) {
  if (!dateLeft || !dateRight) return 0
  const left = new Date(dateLeft.getFullYear(), dateLeft.getMonth(), 1)
  const right = new Date(dateRight.getFullYear(), dateRight.getMonth() + pad, 1)
  return compareAsc(left, right)
}

function newDate(defaultDate) {
  const date = defaultDate ? new Date(defaultDate) : new Date()

  return new Date(date.getFullYear(), date.getMonth(), date.getDate())
}

function setTime(date, old) {
  date.setHours(old.getHours())
  date.setMinutes(old.getMinutes())
  date.setSeconds(old.getSeconds())

  return date
}

function cloneTime(date, old, fmt) {
  if (!date) return date
  old = toDateWithFormat(old, fmt)
  if (isInvalid(old)) return date

  return setTime(date, old)
}

function formatDateWithDefaultTime(date, value, defaultTime, fmt) {
  if (!date) return date
  if (value) return setTime(date, value)
  if (!defaultTime) return date

  const dateHMS = toDateWithFormat(defaultTime, TIME_FORMAT)
  if (isInvalid(dateHMS)) return date

  const nDate = cloneTime(date, defaultTime, TIME_FORMAT)
  return format(nDate, fmt)
}

function clearHMS(date) {
  if (!isValid(date)) return date
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

function judgeTimeByRange(...args) {
  const [target, value, mode, min, max, range, disabled] = args

  const date = new Date(value.getTime())
  switch (mode) {
    case 'H':
      date.setHours(target)
      break
    case 'h':
      if (date.getHours() >= 12) {
        date.setHours(target + 12)
        break
      }
      date.setHours(target)
      break
    case 'm':
    case 'minute':
      date.setMinutes(target)
      break
    case 's':
    case 'second':
      date.setSeconds(target)
      break
    case 'ampm':
      if (target === 0) {
        const hours = date.getHours()
        if (target === 1 && hours < 12) {
          date.setHours(hours + 12)
        } else if (target === 0 && hours >= 12) {
          date.setHours(hours - 12)
        }
      }
      break
    default:
      break
  }

  let isDisabled
  if (disabled) isDisabled = disabled(date)
  if (isDisabled) return [true]
  if (!isDisabled && min) {
    if (compareAsc(date, min) < 0) return [true]
    if (range && compareAsc(date, addSeconds(min, range)) > 0) return [true]
  }
  if (!isDisabled && max) {
    if (compareAsc(date, max) > 0) return [true]
    if (range && compareAsc(date, addSeconds(max, -range)) < 0) return [true]
  }
  return [false, date]
}

function getFormat(fo) {
  let defaultFormat = 'yyyy-MM-dd HH:mm:ss.SSS'
  ;['H', 'm', 's', 'S', 'h'].map(v => {
    if (fo.indexOf(v) <= -1) {
      const reg = new RegExp(`${v}`, 'g')
      defaultFormat = defaultFormat.replace(reg, '0')
    }
    return v
  })
  return defaultFormat
}

function resetTimeByFormat(value, fo) {
  if (!value) return null
  let date = null
  if (typeof value === 'string') {
    date = new Date(value)
  } else {
    date = new Date(value.getTime())
  }
  return new Date(
    format(date, getFormat(fo), {
      weekStartsOn: getLocale('startOfWeek'),
    })
  )
}

export default {
  clearHMS,
  addDays,
  addMonths,
  addYears,
  addSeconds,
  cloneTime,
  // 将日期按升序排序。 为此，如果第一个日期在第二个日期之后，则返回1；如果第一个日期在第二个日期之前，则返回-1；如果日期相等，则返回0。
  compareAsc,
  compareMonth,
  getDaysOfMonth,
  format,
  isInvalid,
  isSameDay,
  isSameMonth,
  isSameWeek,
  isValid,
  newDate,
  setTime,
  toDate,
  toDateWithFormat,
  formatDateWithDefaultTime,
  compareDateArray,
  TIME_FORMAT,
  judgeTimeByRange,
  resetTimeByFormat,
}
