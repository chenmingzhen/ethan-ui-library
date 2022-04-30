import React from 'react'
import { cascaderClass } from '@/styles'
import { getParent } from '@/utils/dom/element'
import { checkInputClass } from '@/styles'
import { PureComponent } from '@/utils/component'
import Checkbox from '../Checkbox'
import Spin from '../Spin'
import Caret from '../icons/Caret'
import { CascaderNodeProps } from './type'

interface CascaderNodeState {
    loading: boolean
}

export default class Node extends PureComponent<CascaderNodeProps, CascaderNodeState> {
    get isLeaf() {
        const { data, childrenKey, loader } = this.props

        const { loading } = this.state

        const children = data[childrenKey]

        if (children && children.length > 0) return false

        if (Array.isArray(children) || children === null) return true

        if (loading && !children) return false

        if (loader && !loading) return false

        return true
    }

    constructor(props) {
        super(props)

        this.state = {
            loading: false,
        }
    }

    handleClick = () => {
        const {
            onPathChange,
            id,
            data,
            path,
            multiple,
            onChange,
            changeOnSelect,
            loader,
            onItemClick,
            datum,
            childrenKey,
        } = this.props

        const { loading } = this.state

        const children = data[childrenKey]

        onPathChange(id, data, path)

        /** 多选情况：如果是hover模式，由handleSelect中处理，如果为click模式，由Checkbox处理  */
        if (!multiple) {
            if (changeOnSelect || this.isLeaf) {
                onChange([...path, id], datum.getDataById(id))
            }
        }

        if (loader && !loading && children === undefined) {
            this.setState({ loading: true })

            loader(id, data)
        }

        if (onItemClick) {
            onItemClick(data)
        }
    }

    handleChange = (checked: boolean) => {
        const { datum, id, onChange } = this.props

        datum.set(id, checked ? 1 : 0)

        onChange(datum.getValue(), datum.getDataById(id))
    }

    handleSelect = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        if (getParent(e.target, `.${checkInputClass('_')}`)) return

        const { datum, id } = this.props

        const checked = datum.getChecked(id)

        this.handleChange(!checked)
    }

    renderContent = () => {
        const { renderItem, data, active } = this.props

        const render = typeof renderItem === 'function' ? renderItem : d => d[renderItem]

        return render(data, active)
    }

    render() {
        const { data, path, childrenKey, loader, datum, id, active, expandTrigger, multiple, onPathChange } = this.props

        const { loading } = this.state

        const children = data[childrenKey]

        const hasChildren = children?.length > 0

        const mayChildren = loader && !loading && children === undefined

        const disabled = datum.isDisabled(id)

        const className = cascaderClass(
            'node',
            active && 'active',
            disabled && 'disabled',
            hasChildren && 'has-children',
            mayChildren && 'may-be-children'
        )

        const style: React.CSSProperties = {}

        const events = {
            onClick: undefined,
            onMouseEnter: undefined,
        }

        if (!disabled && (expandTrigger !== 'hover-only' || !children || children.length === 0)) {
            events.onClick = this.handleClick
            style.cursor = 'pointer'
        }

        /** hover模式下 靠近Node即改变路径，如果为多选模式，还需要覆盖原本的onClick事件，直接改为选中 */
        if (expandTrigger === 'hover' || expandTrigger === 'hover-only') {
            events.onMouseEnter = () => {
                onPathChange(id, data, path)
            }

            if (multiple) events.onClick = this.handleSelect
        }

        return (
            <div className={className} style={style} {...events}>
                {multiple && (
                    <Checkbox
                        checked={datum.getChecked(id)}
                        disabled={disabled}
                        onChange={this.handleChange}
                        style={{ marginRight: 8, marginTop: -1, verticalAlign: 'top' }}
                    />
                )}
                {this.renderContent()}
                {loading && children === undefined && (
                    <Spin className={cascaderClass('loading')} size={10} name="ring" />
                )}
                {(hasChildren || mayChildren) && (
                    <span className={cascaderClass('caret')}>
                        <Caret />
                    </span>
                )}
            </div>
        )
    }
}
