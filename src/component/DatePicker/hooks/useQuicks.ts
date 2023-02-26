import { isArray } from '@/utils/is'
import { useMemo } from 'react'
import { QuickSelect } from '../type'
import utils from '../utils'

function useQuicks<Value extends Date | Date[]>(quickSelects: QuickSelect<Value>[], format: string) {
    const quicks = useMemo<QuickSelect<Value>[]>(() => {
        if (!quickSelects) return []

        const results = []

        quickSelects.forEach((quickSelect) => {
            if (isArray(quickSelect.value)) {
                const dates = quickSelect.value
                if (utils.isInvalid(dates[0])) return

                if (dates[1] && utils.isInvalid(dates[1])) return

                results.push({ name: quickSelect.name, value: dates })
            } else {
                const date = quickSelect.value

                if (utils.isInvalid(date)) return

                results.push({ name: quickSelect.name, value: date })
            }
        })

        return results
    }, [quickSelects, format])

    return quicks
}

export default useQuicks
