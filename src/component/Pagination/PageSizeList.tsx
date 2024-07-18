import React from 'react'
import { paginationClass } from '@/styles'
import Select from '../Select'
import paginationContext from './context'
import { PageSizeListProps } from './type'

const PageSizeList: React.FC<PageSizeListProps> = (props) => {
    const { current, onChange, pageSize, text, disabled } = React.useContext(paginationContext)

    const { pageSizeList = [10, 20, 30, 50, 100], size, sizeListProps = {} } = props

    function handleChange(newPageSize) {
        const start = (current - 1) * pageSize + 1

        onChange(Math.ceil(start / newPageSize), newPageSize)
    }

    return (
        <Select
            onChange={handleChange}
            disabled={disabled}
            autoAdapt
            value={pageSize}
            size={size}
            className={paginationClass('section', 'pagesize')}
            data={pageSizeList}
            renderItem={(d) => `${d} ${text.page || ''}`}
            {...sizeListProps}
        />
    )
}

export default React.memo(PageSizeList)
