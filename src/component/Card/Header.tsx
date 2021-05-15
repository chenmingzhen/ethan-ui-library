// @ts-nocheck
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { cardClass } from '@/styles'
import icons from '../icons'

export default class extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        align: PropTypes.string,
        children: PropTypes.any,
        className: PropTypes.string,
        collapsed: PropTypes.bool,
        onCollapse: PropTypes.func,
        style: PropTypes.object,
    }

    renderIndicator() {
        const { collapsed } = this.props
        if (collapsed === undefined) return undefined
        const className = cardClass('indicator')
        return <span className={className}>{icons.AngleRight}</span>
    }

    render() {
        const { style, align, className, children, onCollapse, collapsed } = this.props

        const newClassName = classnames(cardClass('header', align), className)
        const onClick = typeof collapsed === 'boolean' ? onCollapse : undefined

        return (
            <div style={style} onClick={onClick} className={newClassName}>
                {this.renderIndicator()}
                {children}
            </div>
        )
    }
}
