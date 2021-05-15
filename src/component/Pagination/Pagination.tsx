// @ts-nocheck
import React, { memo } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import { getProps, defaultProps } from '@/utils/proptypes'
import { paginationClass } from '@/styles'
import Links from './Links'
import Jumper from './Jumper'
import Simple from './Simple'
import PageSizeList from './PageSizeList'

const Pagination = props => {
    const { align, layout, size, style } = props

    const className = classnames(paginationClass('_', size, align), props.className)

    return (
        <div className={className} style={style}>
            {layout.map((section, i) => {
                switch (section) {
                    case 'links':
                        return <Links key={section} {...props} />
                    case 'list':
                        return <PageSizeList key={section} {...props} />
                    case 'jumper':
                        return <Jumper key={section} {...props} />
                    case 'simple':
                        return <Simple key={section} {...props} />
                    default:
                        if (typeof section === 'function') {
                            return (
                                <div key={i} className={paginationClass('section')}>
                                    <span>{section(props)}</span>
                                </div>
                            )
                        }
                        return null
                }
            })}
        </div>
    )
}

Pagination.propTypes = {
    ...getProps(PropTypes, 'size', 'type'),
    align: PropTypes.string,
    current: PropTypes.number.isRequired,
    layout: PropTypes.array,
    onChange: PropTypes.func.isRequired,
    pageSize: PropTypes.number.isRequired,
    span: PropTypes.number,
    text: PropTypes.object,
    total: PropTypes.number.isRequired,
}

Pagination.defaultProps = {
    ...defaultProps,
    layout: ['links'],
    span: 5,
    text: {},
}

export default memo(Pagination)
