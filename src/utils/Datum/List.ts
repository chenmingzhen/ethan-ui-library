import { warning } from '../warning'
import { DATUM_LIST_INVALID_VALUES } from '../warning/types'
import { CHANGE_ACTION } from './types'

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

    /** 继承覆写此属性 */
    value?: any

    prediction?(formatValue: FormatResult, raw: Data): boolean

    distinct?: boolean

    disabled?: boolean | ((value: Data) => boolean)

    limit?: number

    control?: boolean
}

/** 不存储Data，只存储Value */
export default class List<T = string> {
    distinct?: boolean

    limit?: number

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

    control = false

    /** InnerValues 内部直接操作的源，不引起更新，由value的变化驱动更新 */
    private $values: any

    /** 暴露给外部获取的values */
    get values() {
        return this.$values
    }

    set values(values) {
        this.$values = values

        this.dispatch(CHANGE_ACTION)

        this.onChange?.(this.getValue())
    }

    constructor(args: DatumListProps<T> = {}) {
        const { format, onChange, value, prediction, distinct, disabled, limit, control } = args

        this.distinct = distinct

        this.limit = limit

        this.onChange = onChange

        this.initFormat(format)

        this.prediction = prediction || ((formatValue, data) => formatValue === this.format(data))

        this.setDisabled(disabled)

        this.$values = this.arrayValue(value)

        this.setValue(value)

        this.control = !!control
    }

    /** 与set不一样的是，此处不执行onChange回调 */
    setValue(values = []) {
        this.$values = this.arrayValue(values)

        this.dispatch(CHANGE_ACTION)
    }

    getValue() {
        let value: any[] = this.$values

        if (this.limit === 1) [value] = this.$values

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

        warning(DATUM_LIST_INVALID_VALUES)

        return []
    }

    // 设置disabled
    private setDisabled(disabled) {
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
    private handleChange(values, ...args) {
        /** @bug  由于此处逻辑发生改变，导致transfer select的渲染响应不正确 */
        if (!this.control) {
            this.$values = values

            this.onChange?.(this.getValue(), ...args)
        } else {
            this.onChange?.(values, ...args)
        }

        /** 执行一次更新的操作 */
        this.dispatch(CHANGE_ACTION)
    }

    add({ data, unshift }: { data: any; unshift?: boolean }) {
        if (data === undefined || data === null) return

        let raws = Array.isArray(data) ? data : [data]

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

        this.add({ data })
    }

    check(data) {
        for (let i = 0; i < this.$values.length; i++) {
            if (this.prediction(this.$values[i], data)) return true
        }

        return false
    }

    getDataByValue(data, value) {
        for (let i = 0; i < data.length; i++) {
            if (this.prediction(value, data[i])) return { data: data[i], index: i }
        }

        return null
    }

    /** 派发事件 */
    private dispatch(name, ...args) {
        const event = this.$events[name]

        if (!event) return

        event.forEach(fn => fn(...args))
    }

    private initFormat(f) {
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

    remove({ data }: { data: any }) {
        if (!data) return

        let raws = Array.isArray(data) ? data : [data]

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

    /** 移除不属于原数据data的value，例如Select创建模式创建的值 */
    removeNotOriginData(afterValues, removedValue) {
        this.handleChange(afterValues, removedValue, false)
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
