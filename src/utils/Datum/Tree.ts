import { CheckboxProps } from '@/component/Checkbox/type'
import React from 'react'

interface TreeDatumOptions {
    /** 数据源 */
    data: any
    /** 当前选中的值 */
    value: any

    keygen: ((data: any, parentKey: string) => string) | string

    mode: number

    disabled: boolean | (() => boolean)

    childrenKey: string
}

export const CheckedMode = {
    // 只返回全选数据，包含父节点和子节点
    Full: 0,

    // 返回全部选择子节点和部分选中的父节点
    Half: 1,

    // 只返回选中子节点
    Child: 2,

    // 如果父节点下所有子节点全部选中，只返回父节点
    Shallow: 3,
}

interface PathMapValue {
    path: React.Key[]

    children: React.Key[]

    isDisabled: boolean

    indexPath: number[]

    index: number
}

export default class {
    keygen: ((data: any, parentKey: string) => string) | string

    mode: number

    valueMap = new Map()

    events = new Map<React.Key, () => void>()

    disabled: boolean | ((data: any, index: number) => boolean)

    childrenKey: string

    value: any

    cachedValue: any

    pathMap: Map<React.Key, PathMapValue> = new Map()

    dataMap: Map<React.Key, any> = new Map()

    data: any

    constructor(options: TreeDatumOptions) {
        const { data, value, keygen, mode, disabled, childrenKey = 'children' } = options || {}

        this.keygen = keygen
        this.mode = mode
        this.valueMap = new Map()
        this.disabled = disabled || (() => false)
        this.childrenKey = childrenKey

        this.setData(data)
        this.setValue(value)
    }

    initValue(ids?: React.Key[], forceCheck?: number) {
        if (!this.data || !this.value) return undefined

        if (!ids) {
            ids = []

            this.pathMap.forEach((val, id) => {
                /** 根节点 */
                if (val.path.length === 0) ids.push(id)
            })
        }

        /** 0:不选中 1:选中 2:indeterminate选中 */
        let checked
        ids.forEach(id => {
            const { children } = this.pathMap.get(id)

            if (forceCheck) {
                this.setValueMap(id, 1)

                this.initValue(children, forceCheck)

                return
            }

            let childChecked = this.value.indexOf(id) >= 0 ? 1 : 0

            /** Half模式下有部分选中的情况，不能force */
            if (childChecked === 1 && this.mode !== CheckedMode.Half) {
                this.initValue(children, 1)
            } else if (children.length > 0) {
                childChecked = this.initValue(children)
            } else {
                childChecked = this.value.indexOf(id) >= 0 ? 1 : 0
            }

            this.setValueMap(id, childChecked)

            if (checked === undefined) checked = childChecked
            else if (checked !== childChecked) checked = 2
        })

        return checked
    }

    initData(data: any[], path, levelDisabled?: boolean, index = []) {
        // 当前层次的ids
        const ids = []

        data.forEach((d, i) => {
            const id = this.getKey(d, path[path.length - 1], i)

            if (this.dataMap.get(id)) {
                console.warn(`There is already a key "${id}" exists. The key must be unique.`)
            }

            this.dataMap.set(id, d)

            /** 上层为disabled则所有子节点为disabled，否则根据函数判断 */
            let isDisabled = levelDisabled

            if (!isDisabled && typeof this.disabled === 'function') {
                isDisabled = this.disabled(d, i)
            }

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

    bind(id: string | number, update: () => void) {
        this.events.set(id, update)
    }

    unbind(id) {
        this.events.delete(id)
    }

    setValue(value) {
        this.value = value

        if (this.value && this.value !== this.cachedValue) {
            this.initValue()
        }
    }

    getValue() {
        const value = []

        /** 子节点为选中状态，parent节点一定为选中或indeterminate */
        const isParentChecked = (id: React.Key) => {
            const { path } = this.pathMap.get(id)

            const parentId = path[path.length - 1]

            if (!parentId) return false

            return this.valueMap.get(parentId) === 1
        }

        this.valueMap.forEach((checked, id) => {
            switch (this.mode) {
                case CheckedMode.Full:
                    if (checked === 1) value.push(id)
                    break
                case CheckedMode.Half:
                    if (checked >= 1) value.push(id)
                    break
                case CheckedMode.Child:
                    if (checked === 1 && this.pathMap.get(id).children.length === 0) value.push(id)
                    break
                case CheckedMode.Shallow:
                    if (checked === 1) {
                        const parentChecked = isParentChecked(id)

                        if (!parentChecked) value.push(id)
                    }
                    break
                default:
            }
        })

        this.cachedValue = value

        return value
    }

    setValueMap(id, checked) {
        this.valueMap.set(id, checked)

        const update = this.events.get(id)

        if (update) update()
    }

    /** asc:向上方向查找 desc:向下方向查找 */
    /** 点击的节点没有direction，会向上和向下操作 */
    set(id: React.Key, checked: number, direction?: 'asc' | 'desc') {
        /** 点击的节点 */
        if (!this.isDisabled(id)) this.setValueMap(id, checked)

        const { path, children } = this.pathMap.get(id)

        if (direction !== 'asc') {
            children.forEach(cid => {
                this.set(cid, checked, 'desc')
            })
        }

        if (direction !== 'desc' && path.length > 0) {
            const parentId = path[path.length - 1]

            let parentChecked = checked

            /** 设置父节点是否为indeterminate */
            this.pathMap.get(parentId).children.forEach(cid => {
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

        let checked: CheckboxProps['checked'] = value === 1

        if (value === 2) checked = 'indeterminate'

        return checked
    }

    getKey(data, id = '', index) {
        if (typeof this.keygen === 'function') return this.keygen(data, id)

        if (this.keygen) return data[this.keygen]

        return id + (id ? ',' : '') + index
    }

    setData(data) {
        if (!data) return

        this.pathMap = new Map()

        this.dataMap = new Map()

        this.data = data

        this.initData(data, [])
    }
}
