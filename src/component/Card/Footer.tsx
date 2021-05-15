// @ts-nocheck
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { cardClass } from '@/styles'

export default class extends PureComponent {
    // eslint-disable-next-line react/static-property-placement
    static propTypes = {
        align: PropTypes.string,
        className: PropTypes.string,
    }

    render() {
        const { align, className, ...props } = this.props
        const newClassName = classnames(cardClass('footer', align), className)

        return <div {...props} className={newClassName} />
    }
}
