import shallowEqual from '@/utils/shallowEqual'
import { warning } from '../warning'
import { DATUM_LIST_INVALID_VALUES } from '../warning/types'
import { CHANGE_ACTION, INIT_ACTION } from './types'

export type FormatInfer<T> = T extends Record<string, any>
    ? keyof T
    : T extends string | number
    ? never
    : (data: T) => string

export type OnChangeItemInfer<D, F> = F extends D ? D : F

export interface DatumListProps<Data = any, FormatResult = Data> {
    format?: FormatInfer<Data>

    /**
     * 部分需要继承复写此属性
     * @param items 当前List的中值
     * @param data  引起变化的值
     * @param unknown
     */
    onChange?(
        items: OnChangeItemInfer<Data, FormatResult>[] | OnChangeItemInfer<Data, FormatResult>,
        data: Data,
        checked: boolean
    ): void

    separator?: string

    /** 继承覆写此属性 */
    value?: any

    prediction?(formatValue: FormatResult, raw: Data): boolean

    distinct?: boolean

    disabled?: boolean | ((value: Data) => boolean)

    limit?: number
}

/**
 * @todo 移除separator
 */

/** 不存储Data，只存储Value */
export default class List<T = string> {
    distinct?: boolean

    limit?: number

    separator?: string

    format: (value) => string

    $events = {}

    $cachedFlatten = new Map()

    /**
     *
     *  默认使用 format 函数执行的结果来比较是否匹配，
     *  在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），
     *  需要借助 prediction 函数来判断是否匹配
     */

    prediction: (value, raw) => any

    onChange: (...args) => void

    disabled: (...args) => boolean

    /** InnerValues 内部直接操作的源，不引起更新，由value的变化驱动更新 */
    private $values: any

    /** 缓存outerValue */
    $cachedValue: any

    /** 暴露给外部获取的values */
    get values() {
        return this.$values
    }

    set values(values) {
        this.$values = values

        this.dispatch(CHANGE_ACTION)

        this.onChange?.(this.getOuterValue())
    }

    constructor(args: DatumListProps<T> = {}) {
        const { format, onChange, separator, value, prediction, distinct, disabled, limit } = args

        this.distinct = distinct

        this.limit = limit

        this.separator = separator

        this.onChange = onChange

        this.initFormat(format)

        this.prediction = prediction || ((formatValue, data) => formatValue === this.format(data))

        this.setDisabled(disabled)

        this.setInnerValue(value, INIT_ACTION)
    }

    setInnerValue(values = [], type) {
        if (type === INIT_ACTION) {
            this.$values = this.arrayValue(values)
        } else {
            // TODO 表单时候
            this.resetValue(this.arrayValue(values), shallowEqual(this.$cachedValue, values))
        }

        this.getOuterValue()
    }

    getOuterValue() {
        let value = this.$values

        if (this.limit === 1) [value] = this.$values
        else if (this.separator) value = this.$values.join(this.separator)

        this.$cachedValue = value

        return value
    }

    /** 将数据转为Array格式 */
    arrayValue(values = []) {
        if (this.limit === 1 && !Array.isArray(values)) {
            return [values]
        }

        // 空数值
        if (!values) return []

        if (Array.isArray(values)) {
            return values
        }

        // values值string类型 判断是否传入分割符  根据分割符来返回values的数组
        if (typeof values === 'string') {
            if (this.separator) {
                return (values as string).split(this.separator).map(s => s.trim())
            }

            console.warn('Select separator parameter is empty.')

            return [values] as string[]
        }

        warning(DATUM_LIST_INVALID_VALUES)

        return []
    }

    resetValue(values, cached) {
        this.$values = values

        if (this.onChange && !cached) {
            this.onChange(this.getOuterValue())
        }

        this.dispatch(CHANGE_ACTION)
    }

    // 设置disabled
    setDisabled(disabled) {
        this.disabled = (...obj) => {
            switch (typeof disabled) {
                case 'boolean':
                    return disabled
                case 'function':
                    return disabled(...obj)
                default:
                    return false
            }
        }
    }

    // 处理Change 并触发事件派发
    handleChange(values, ...args) {
        this.$values = values

        this.dispatch(CHANGE_ACTION)

        this.onChange?.(this.getOuterValue(), ...args)
    }

    // TODO
    flattenTreeData(data, childrenKey) {
        const keys = data.map(v => this.format(v)).filter(v => typeof v !== 'object')
        const key = keys.join()
        if (keys.length !== 0) {
            const cached = this.$cachedFlatten.get(key)
            if (cached) return cached
        }
        const flatten = []
        const deepAdd = items => {
            items.forEach(item => {
                flatten.push(item)
                if (item[childrenKey]) deepAdd(item[childrenKey])
            })
        }
        deepAdd(data)
        if (keys.length) this.$cachedFlatten.set(key, flatten)
        return flatten
    }

    add(data: T | T[], _?: any, childrenKey?: string, unshift?: boolean) {
        if (data === undefined || data === null) return

        if (this.limit === 1) this.$values = []

        let raws = Array.isArray(data) ? data : [data]

        if (childrenKey && this.limit !== 1) {
            raws = this.flattenTreeData(raws, childrenKey)
        }

        raws = raws.filter(v => {
            // 获取是否disabled
            const disabled = this.disabled(v)

            if (disabled) return false

            if (this.distinct) return !this.check(v)

            return true
        })

        const values = []

        for (let i = 0; i < raws.length; i++) {
            const formatDataValue = this.format(raws[i])

            if (formatDataValue !== undefined) {
                values.push(formatDataValue)
            }
        }

        this.handleChange(unshift ? values.concat(this.$values) : this.$values.concat(values), data, true)
    }

    set(data) {
        this.$values = []

        this.add(data)
    }

    check(data) {
        for (let i = 0; i < this.$values.length; i++) {
            if (this.prediction(this.$values[i], data)) return true
        }

        return false
    }

    /** @todo 返回参数已经修改，合并dev-transfer分支时，需适配代码 */
    getDataByValue(data, value) {
        for (let i = 0; i < data.length; i++) {
            if (this.prediction(value, data[i])) return { data: data[i], index: i }
        }

        return null
    }

    /** @todo 暂未用到 考虑移除 */
    clear() {
        this.values = []
    }

    // 派发事件
    dispatch(name, ...args) {
        const event = this.$events[name]

        if (!event) return

        event.forEach(fn => fn(...args))
    }

    initFormat(f) {
        switch (typeof f) {
            case 'string':
                this.format = value => value[f]
                break
            case 'function':
                this.format = value => f(value)
                break
            default:
                this.format = a => a
                break
        }
    }

    defaultPrediction(value, data) {
        return value === this.format(data)
    }

    /** @todo 移除第二个参数 */
    remove(data, _?, childrenKey?) {
        if (!data) return

        let raws = Array.isArray(data) ? data : [data]

        if (childrenKey) {
            raws = this.flattenTreeData(raws, childrenKey)
        }

        raws = raws.filter(r => !this.disabled(r))

        const newValues = []

        outer: for (let i = 0; i < this.$values.length; i++) {
            const value = this.$values[i]

            for (let j = 0; j < raws.length; j++) {
                if (this.prediction(value, raws[j])) {
                    raws.splice(j, 1)

                    continue outer
                }
            }

            newValues.push(value)
        }

        this.handleChange(newValues, data, false)
    }

    subscribe(name, fn) {
        if (!this.$events[name]) this.$events[name] = []

        const events = this.$events[name]

        if (fn in events) return

        events.push(fn)
    }

    unsubscribe(name, fn) {
        if (!this.$events[name]) return

        this.$events[name] = this.$events[name].filter(e => e !== fn)
    }
}
