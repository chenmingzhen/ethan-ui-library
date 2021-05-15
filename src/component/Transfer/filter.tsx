// @ts-nocheck
import React, { useCallback, useState, useMemo } from 'react'
import PropTypes from 'prop-types'

export default Origin => {
    const Filter = props => {
        const [text, setText] = useState('')
        const { onFilter, data, index, onSearch } = props

        // ------------------------method and computed------------------
        const filterData = useMemo(() => {
            if (!onFilter || !text) return data
            return data.filter(d => onFilter(text, d, !index))
        }, [onFilter, data, index, text])

        const handleFilter = useCallback(
            rawText => {
                if (onSearch) onSearch(rawText, !index)
                setText(rawText)
            },
            [onSearch, index]
        )
        // -----------------------render-------------------------

        const filter = onFilter ? handleFilter : undefined
        return <Origin {...props} onFilter={filter} filterText={text} data={filterData} />
    }

    Filter.propTypes = {
        data: PropTypes.array,
        onFilter: PropTypes.func,
        onSearch: PropTypes.func,
        index: PropTypes.number,
    }

    return Filter
}
