import React, { useState } from 'react'
import { useUpdateEffect } from 'react-use'
import classnames from 'classnames'
import { paginationClass } from '@/styles'
import { PaginationProps } from './type'
import { PaginationProvider } from './context'
import Links from './Links'
import PageSizeList from './PageSizeList'
import Jumper from './Jumper'
import Simple from './Simple'

const Pagination: React.FC<PaginationProps> = (props) => {
    const { onChange, total, align, layouts, size, style, sizeListProps, pageSizeList, text, disabled } = props

    const [current, updateCurrent] = useState(props.current || props.defaultCurrent)

    const [pageSize, updatePageSize] = useState(props.pageSize)

    useUpdateEffect(() => {
        updateCurrent(props.current)

        updatePageSize(props.pageSize)
    }, [props.current, props.pageSize])

    function handleChange(newCurrent, newPagesize = pageSize) {
        /** 非受控模式下 */
        if (!props.current) {
            updateCurrent(newCurrent)
        }

        updatePageSize(newPagesize)

        onChange?.(newCurrent, newPagesize)
    }

    if (total < 0) {
        return null
    }

    const className = classnames(paginationClass('_', size, align), props.className)

    return (
        <PaginationProvider value={{ current, pageSize, onChange: handleChange, total, text, disabled }}>
            <div className={className} style={style}>
                {layouts.map((layout, i) => {
                    switch (layout) {
                        case 'links':
                            return <Links key={layout} />
                        case 'list':
                            return (
                                <PageSizeList
                                    key={layout}
                                    sizeListProps={sizeListProps}
                                    size={size}
                                    pageSizeList={pageSizeList}
                                />
                            )
                        case 'jumper':
                            return <Jumper key={layout} size={size} />
                        case 'simple':
                            return <Simple key={layout} {...props} />
                        default:
                            if (typeof layout === 'function') {
                                return (
                                    <div key={i} className={paginationClass('section')}>
                                        <span>{layout({ ...props, current, pageSize })}</span>
                                    </div>
                                )
                            }
                            return null
                    }
                })}
            </div>
        </PaginationProvider>
    )
}

Pagination.defaultProps = {
    layouts: ['links'],
    text: {},
    pageSize: 10,
    defaultCurrent: 1,
    total: 0,
}

export default React.memo(Pagination)
