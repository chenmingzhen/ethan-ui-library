import { useMemo } from 'react'

function useFormat(indeterminateFormat: string, type: string) {
    const format = useMemo(() => {
        if (indeterminateFormat) return indeterminateFormat

        switch (type) {
            case 'date-time':
                return 'yyyy-MM-dd HH:mm:ss'
            case 'year':
                return 'yyyy'
            case 'month':
                return 'yyyy-MM'
            case 'time':
                return 'HH:mm:ss'
            case 'week':
                return 'RRRR II'
            default:
                return 'yyyy-MM-dd'
        }
    }, [indeterminateFormat, type])

    return format
}

export default useFormat
