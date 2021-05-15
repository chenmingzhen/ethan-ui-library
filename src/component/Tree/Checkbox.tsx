// @ts-nocheck
import React from 'react'
import PropTypes from 'prop-types'
import { PureComponent } from '@/utils/component'
import { treeClass } from '@/styles'
import Checkbox from '../Checkbox/Checkbox'

/**
 * Checkbox状态的Tree
 * 通过Datum来管理值
 */
export default class extends PureComponent {
    static propTypes = {
        datum: PropTypes.object.isRequired,
        disabled: PropTypes.bool,
        id: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
    }

    constructor(props) {
        super(props)
        this.handleChange = this.handleChange.bind(this)
        // TODO Find The Place usage
        props.datum.bind(props.id, this.forceUpdate.bind(this))
    }

    componentWillUnmount() {
        super.componentWillUnmount()
        // TODO Find The Place usage
        this.props.datum.unbind(this.props.id)
    }

    checkDisabled() {
        const { datum, id, disabled } = this.props
        if (disabled) return true

        return datum.isDisabled(id)
    }

    handleChange(v, checked) {
        const { datum, id, onChange } = this.props
        datum.set(id, checked ? 1 : 0)
        onChange(datum.getValue(), id)
    }

    render() {
        const { datum, id } = this.props
        const checked = datum.getChecked(id)

        return (
            <Checkbox
                checked={checked}
                disabled={this.checkDisabled()}
                onChange={this.handleChange}
                className={treeClass('checkbox')}
            />
        )
    }
}
