import React from 'react'
import classnames from 'classnames'
import { paginationClass } from '@/styles'
import useMergedValue from '@/hooks/useMergedValue'
import { PaginationProps } from './type'
import { PaginationProvider } from './context'
import Links from './Links'
import PageSizeList from './PageSizeList'
import Jumper from './Jumper'
import Simple from './Simple'

const Pagination: React.FC<PaginationProps> = (props) => {
    const {
        size,
        align,
        style,
        onChange,
        disabled,
        total = 0,
        text = {},
        pageSizeList,
        sizeListProps,
        layouts = ['links'],
    } = props

    const [current, updateCurrent] = useMergedValue({
        defaultStateValue: 1,
        options: {
            value: props.current,
            defaultValue: props.defaultCurrent,
        },
    })

    const [pageSize, updatePageSize] = useMergedValue({
        defaultStateValue: 10,
        options: {
            value: props.pageSize,
        },
    })

    function handleChange(newCurrent, newPagesize = pageSize) {
        updateCurrent(newCurrent)
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
                                    size={size}
                                    key={layout}
                                    pageSizeList={pageSizeList}
                                    sizeListProps={sizeListProps}
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

export default React.memo(Pagination)
