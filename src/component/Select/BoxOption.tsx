// @ts-nocheck
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { selectClass } from '@/styles'
import Checkbox from '../Checkbox/Checkbox'
import Radio from '../Radio/Radio'

// 多列column下的Option
class BoxOption extends PureComponent {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this)
    }

    // 点击后 回调数据
    handleClick() {
        const { data, onClick, isActive, index, disabled } = this.props

        if (this.locked || disabled) return
        this.locked = true

        onClick(!isActive, data, index)

        setTimeout(() => {
            this.locked = false
        }, 200)
    }

    render() {
        const { data, index, isActive, renderItem, columns, multiple } = this.props

        const className = selectClass('option')
        // 每一列的宽度
        // columns 为-1时 堆 -100%  无效的style
        const width = `${(1 / columns) * 100}%`

        // 根据多选来判断
        const Input = multiple ? Checkbox : Radio

        const result = renderItem(data, index)
        const title = typeof result === 'string' ? result : undefined

        return (
            <Input style={{ width }} checked={isActive} className={className} onChange={this.handleClick}>
                <span title={title}>{result}</span>
            </Input>
        )
    }
}

BoxOption.propTypes = {
    columns: PropTypes.number,
    data: PropTypes.oneOfType([PropTypes.object, PropTypes.string, PropTypes.number]).isRequired,
    disabled: PropTypes.bool,
    index: PropTypes.number,
    isActive: PropTypes.bool,
    multiple: PropTypes.bool,
    onClick: PropTypes.func,
    renderItem: PropTypes.func.isRequired,
}

export default BoxOption
