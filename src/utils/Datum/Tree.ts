// @ts-nocheck
export const CheckedMode = {
    // 只返回全选数据，包含父节点和子节点
    Full: 0,

    // 返回全部选择字节点和部分选中的父节点
    Half: 1,

    // 只返回选中子节点
    Child: 2,

    // 如果父节点下所有子节点全部选中，只返回父节点
    Shallow: 3,
}

export default class {
    constructor(options = {}) {
        const { data, value, keygen, mode, disabled, childrenKey = 'children' } = options

        this.keygen = keygen
        this.mode = mode
        this.valueMap = new Map()
        this.events = {}
        this.disabled = disabled || (() => false)
        this.childrenKey = childrenKey

        // value 当前选中的值
        this.setValue(value)
        // data 数据源
        this.setData(data)
    }

    bind(id, update) {
        this.events[id] = update
    }

    unbind(id) {
        delete this.events[id]
    }

    setValue(value) {
        this.value = value
        if (value && value !== this.cachedValue) {
            this.initValue()
        }
    }

    getValue() {
        const value = []
        this.valueMap.forEach((checked, id) => {
            switch (this.mode) {
                case CheckedMode.Full:
                    if (checked === 1) value.push(id)
                    break
                case CheckedMode.Half:
                    if (checked >= 1) value.push(id)
                    break
                case CheckedMode.Child:
                    // TODO
                    if (checked === 1 && this.pathMap.get(id).children.length === 0) value.push(id)
                    break
                case CheckedMode.Shallow:
                    if (checked === 1) {
                        const parentChecked = (() => {
                            const { path } = this.pathMap.get(id)
                            const pid = path[path.length - 1]
                            if (!pid) return false
                            return this.valueMap.get(pid) === 1
                        })()
                        if (!parentChecked) value.push(id)
                    }
                    break
                default:
            }
        })
        this.cachedValue = value
        return value
    }

    /**
     * 根据id设置当前节点value  是否选中
     * @param id
     * @param checked
     */
    setValueMap(id, checked) {
        this.valueMap.set(id, checked)
        const update = this.events[id]
        // 状态改变的回调 bind中绑定
        if (update) update()
    }

    set(id, checked, direction) {
        // self
        if (!this.isDisabled(id)) this.setValueMap(id, checked)

        const { path, children } = this.pathMap.get(id)

        // asc 上升 desc下降

        // children
        // 或点击根节点
        if (direction !== 'asc') {
            children.forEach(cid => {
                this.set(cid, checked, 'desc')
            })
        }

        // parent
        // 不处理根节点 即第一层
        if (direction !== 'desc' && path.length > 0) {
            const parentId = path[path.length - 1]
            let parentChecked = checked
            // 设置父节点是否为indeterminate
            this.pathMap.get(parentId).children.forEach(cid => {
                // 父节点存在子节点为选择 设为indeterminate
                if (parentChecked !== this.valueMap.get(cid)) {
                    parentChecked = 2
                }
            })
            this.set(parentId, parentChecked, 'asc')
        }
    }

    isDisabled(id) {
        const node = this.pathMap.get(id)
        if (node) return node.isDisabled
        return false
    }

    get(id) {
        return this.valueMap.get(id)
    }

    getDataById(id) {
        return this.dataMap.get(id)
    }

    getPath(id) {
        return this.pathMap.get(id)
    }

    getChecked(id) {
        const value = this.get(id)
        let checked = value === 1
        if (value === 2) checked = 'indeterminate'
        return checked
    }

    /**
     * 为每一个dataItem生成key值
     * @param data
     * @param id
     * @param index
     * @returns {string|*}
     */
    getKey(data, id = '', index) {
        if (typeof this.keygen === 'function') return this.keygen(data, id)
        if (this.keygen) return data[this.keygen]
        return id + (id ? ',' : '') + index
    }

    // 更新最初由这里发起
    initValue(ids, forceCheck) {
        if (!this.data || !this.value) return undefined

        if (!ids) {
            // 第一次进来
            ids = []
            this.pathMap.forEach((val, id) => {
                // 根层次
                if (val.path.length === 0) ids.push(id)
            })
        }

        let checked
        ids.forEach(id => {
            const { children } = this.pathMap.get(id)

            if (forceCheck) {
                this.setValueMap(id, 1)
                this.initValue(children, forceCheck)
                return
            }

            let childChecked = this.value.indexOf(id) >= 0 ? 1 : 0

            if (childChecked === 1 && this.mode !== CheckedMode.Half) {
                this.initValue(children, 1)
            } else if (children.length > 0) {
                childChecked = this.initValue(children)
            } else {
                childChecked = this.value.indexOf(id) >= 0 ? 1 : 0
            }

            this.setValueMap(id, childChecked)

            if (checked === undefined) checked = childChecked
            // 暂无作用
            else if (checked !== childChecked) checked = 2
        })

        return checked
    }

    /**
     * 初始化数据源
     * @param data
     * @param path tree的path，根据id向下 id索引
     * @param disabled
     * @param index
     * @returns {[]} 当前层次的ids
     */
    initData(data, path, disabled, index = []) {
        // 当前层次的ids
        const ids = []

        data.forEach((d, i) => {
            const id = this.getKey(d, path[path.length - 1], i)

            if (this.dataMap.get(id)) {
                // 重复key警告
                console.warn(`There is already a key "${id}" exists. The key must be unique.`)
            }
            this.dataMap.set(id, d)

            let isDisabled = disabled
            if (!isDisabled && typeof this.disabled === 'function') {
                isDisabled = this.disabled(d, i)
            }

            // data的idPath索引
            const indexPath = [...index, i]
            ids.push(id)

            let children = []
            if (Array.isArray(d[this.childrenKey])) {
                children = this.initData(d[this.childrenKey], [...path, id], isDisabled, indexPath)
            }

            this.pathMap.set(id, {
                children,
                path,
                isDisabled,
                indexPath,
                index: i,
            })
        })
        return ids
    }

    setData(data) {
        const prevValue = this.value || []
        this.cachedValue = []
        this.pathMap = new Map()
        // key:id value:dataItem 数据源id映射
        this.dataMap = new Map()
        this.data = data

        if (!data) return

        this.initData(data, [])
        this.initValue()
        this.setValue(prevValue)
    }
}
