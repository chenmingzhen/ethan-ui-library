import React from 'react'
import { paginationClass } from '@/styles'
import Select from '../Select'
import paginationContext from './context'
import { PageSizeListProps } from './type'

const PageSizeList: React.FC<PageSizeListProps> = (props) => {
    const { current, onChange, pageSize, text, disabled } = React.useContext(paginationContext)

    const { pageSizeList, size, sizeListProps } = props

    function handleChange(newPageSize) {
        const start = (current - 1) * pageSize + 1

        onChange(Math.ceil(start / newPageSize), newPageSize)
    }

    return (
        <Select
            onChange={handleChange}
            disabled={disabled}
            absolute
            autoAdapt
            keygen
            value={pageSize}
            size={size}
            className={paginationClass('section', 'pagesize')}
            data={pageSizeList}
            renderItem={(d) => `${d} ${text.page || ''}`}
            {...sizeListProps}
        />
    )
}

PageSizeList.defaultProps = {
    pageSizeList: [10, 20, 30, 50, 100],
    sizeListProps: {},
}

export default React.memo(PageSizeList)
