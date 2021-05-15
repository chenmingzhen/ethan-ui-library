// @ts-nocheck
import shallowEqual from '@/utils/shallowEqual'
import { CHANGE_TOPIC, WITH_OUT_DISPATCH } from './types'

/**
 * 装载一组数据的HOC List
 * 事件派发
 * 值存储
 */
export default class {
    constructor(args = {}) {
        const { format, onChange, separator, value, prediction, distinct, disabled, limit } = args

        this.distinct = distinct
        this.limit = limit
        this.separator = separator
        this.initFormat(format)
        this.$events = {}

        this.$cachedDisabled = {}
        this.$cachedFlatten = new Map()
        this.setDisabled(disabled)

        // 默认使用 format 函数执行的结果来比较是否匹配，在某些情况下（例如返回原始数据的对象，更新数据时，生成了一个值相同，非同一个对象的选项），需要借助 prediction 函数来判断是否匹配
        if (prediction) this.prediction = prediction

        this.setValue(value, WITH_OUT_DISPATCH)
        this.onChange = onChange
    }

    get length() {
        return this.$values.length
    }

    // this.values就是this.$values
    get values() {
        return this.$values
    }

    // 暴露外部设置values
    set values(values) {
        this.$values = values
        this.dispatch(CHANGE_TOPIC)
        if (this.onChange) {
            this.onChange(this.getValue())
        }
    }

    // 设置disabled
    setDisabled(disabled) {
        if (this.$cachedDisabled === disabled) return
        this.$cachedDisabled = disabled

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
        this.dispatch(CHANGE_TOPIC)

        if (this.onChange) {
            // 构造参数的onChange
            this.onChange(this.getValue(), ...args)
        }
    }

    // TODO
    // 扁平化属性Data
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

    // hoc=》setValue=》本类set=》本类add
    add(data, _, childrenKey, unshift) {
        if (data === undefined || data === null) return

        // clear value
        if (this.limit === 1) this.$values = []

        let raws = Array.isArray(data) ? data : [data]
        if (childrenKey && this.limit !== 1) {
            raws = this.flattenTreeData(raws, childrenKey)
        }
        raws = raws.filter(v => {
            // 获取是否disabled
            const disabled = this.disabled(v)
            // 如果为disabled 不做add操作
            if (disabled) return false
            if (this.distinct) return !this.check(v)
            return true
        })

        const values = []
        for (const r of raws) {
            // 获取格式化后的值
            const v = this.format(r)
            if (v !== undefined) values.push(v)
        }

        this.handleChange(unshift ? values.concat(this.values) : this.values.concat(values), data, true)
    }

    set(value) {
        this.$values = []
        this.add(value)
    }

    /**
     * 点击选中 checkbox
     * @param raw
     * @returns {boolean}
     */
    check(raw) {
        if (this.prediction) {
            for (let i = 0, count = this.values.length; i < count; i++) {
                if (this.prediction(this.values[i], raw)) return true
            }
            return false
        }
        return this.values.indexOf(this.format(raw)) >= 0
    }

    getDataByValue(data, value) {
        if (this.prediction) {
            for (let i = 0, count = data.length; i < count; i++) {
                if (this.prediction(value, data[i])) return data[i]
            }
            return null
        }
        return data.find(d => value === this.format(d))
    }

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
                // 获取格式化后的值  如data的item {id:1,color:"red"} datum={{format:"color"}}
                // 获取就是color的值
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

    remove(value, _, childrenKey) {
        if (!value) return

        let raws = Array.isArray(value) ? value : [value]
        if (childrenKey) {
            raws = this.flattenTreeData(raws, childrenKey)
        }
        raws = raws.filter(r => !this.disabled(r))
        const values = []

        const prediction = this.prediction || this.defaultPrediction.bind(this)

        outer: for (const val of this.values) {
            for (let j = 0; j < raws.length; j++) {
                if (raws[j].IS_NOT_MATCHED_VALUE || prediction(val, raws[j])) {
                    raws.splice(j, 1)
                    continue outer
                }
            }
            values.push(val)
        }

        // this.values = values
        this.handleChange(values, value, false)
    }

    /**
     * 订阅事件
     * @param name
     * @param fn
     */
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

    getValue() {
        let value = this.values
        // eslint-disable-next-line
    if (this.limit === 1) value = this.values[0]
        // 分割符进行分割
        else if (this.separator) value = this.values.join(this.separator)
        this.$cachedValue = value
        return value
    }

    resetValue(values, cached) {
        this.$values = values
        if (this.onChange && !cached) {
            this.onChange(this.getValue())
        }
        this.dispatch(CHANGE_TOPIC)
        this.dispatch('set-value')
    }

    /**
     * 格式化数据并返回
     * @param values
     * @returns {*[][]|*[]|*}
     */
    formatValue(values = []) {
        // 限制为1 且value不是数组 返回一个数组
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
                return values.split(this.separator).map(s => s.trim())
            }

            console.warn('Select separator parameter is empty.')
            return [values]
        }

        console.error(new Error('Select values is not valid.'))
        return []
    }

    /**
     * 每次SetValue时需要将值缓存
     * @param values
     * @param type
     */
    setValue(values = [], type) {
        if (type === WITH_OUT_DISPATCH) {
            this.$values = this.formatValue(values)
        } else {
            // TODO 表单时候
            this.resetValue(this.formatValue(values), shallowEqual(this.$cachedValue, values))
        }
        // 将value缓存
        this.$cachedValue = this.getValue()
    }
}
